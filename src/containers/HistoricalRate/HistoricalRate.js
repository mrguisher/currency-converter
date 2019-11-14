import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions';
import './HistoricalRate.scss';
import DatePicker from '../../components/DatePicker/DatePicker';

const months = {
  Jan: '01',
  Feb: '02',
  Mar: '03',
  Apr: '04',
  May: '05',
  Jun: '06',
  Jul: '07',
  Aug: '08',
  Sep: '09',
  Oct: '10',
  Nov: '11',
  Dec: '12',
};

class HistoricalRate extends Component {
  
  async getHistoricalRate(direction, event) {
    const convertTo = this.props.currencyConvertedTo;
    const convertFrom = this.props.currencyConvertedFrom;

    let dateTo = this.props.closingHistoricalDate;
    let dateFrom = this.props.initialHistoricalDate;
    let initialRate;
    let closingRate;
    let rateChange;

    // time format convertions
    const time = event.toString().split(' ');
    const [dayName, monthToConvert, day, year] = time;

    const month = Object.entries(months).find(
      el => el[0] === monthToConvert
    )[1];
    const result = `${year}-${month}-${day}`;

    direction === 'to' && (dateTo = result);
    direction === 'from' && (dateFrom = result);

    // fetch API
    const initialHistoricalRateEndpoint = `https://api.exchangeratesapi.io/${dateFrom}?base=${convertFrom}&symbols=${convertTo}`;
    const closingHistoricalRateEndpoint = `https://api.exchangeratesapi.io/${dateTo}?base=${convertFrom}&symbols=${convertTo}`;

    const setLoadingStatus = status => this.props.onLoadingResults(status);
    setLoadingStatus(true);

    const alertMessage = 'Base currency unavailable';

    const getHistoricalRateEndpoint = (endpoint, type = 'initialRate') => {
      fetch(endpoint)
      .then(res => (res.ok === true ? res.json() : alert(alertMessage)))
      .then(data => (type === 'initialRate' ? (initialRate = Object.values(data.rates)[0]) : (closingRate = Object.values(data.rates)[0])))
      .catch(err => err);
    }
    await getHistoricalRateEndpoint(initialHistoricalRateEndpoint, 'initialRate');
    await getHistoricalRateEndpoint(closingHistoricalRateEndpoint, 'closingRate');
    
    const rateChangeCalculate = (initialRate, closingRate) => {
      let difference = closingRate - initialRate;
      let ratio = (difference / closingRate) * 100;
      Math.max(initialRate, closingRate) === closingRate
        ? (rateChange = `+${ratio.toFixed(2)} %`)
        : (rateChange = `${ratio.toFixed(2)} %`);
    };
    rateChangeCalculate(initialRate, closingRate);

    const submitResults = () =>
      this.props.onSubmitHistoricalRate({ rateChange, dateFrom, dateTo });

    submitResults();
    setLoadingStatus(false);
  }

  render() {
    return (
      <div className="historical-rate">
        <div className="date-container">
          <DatePicker
            label="from"
            value={this.props.initialHistoricalDate}
            onChange={event => this.getHistoricalRate('from', event)}
          ></DatePicker>
          <DatePicker
            label="to"
            value={this.props.closingHistoricalDate}
            onChange={event => this.getHistoricalRate('to', event)}
          ></DatePicker>
        </div>

        {this.props.historicalRateChange !== 0 ? (
          <p className="historical-rate__result">
            {this.props.historicalRateChange}
          </p>
        ) : (
          <p className="historical-rate__desc">
            Pick any date to display rate difference
          </p>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currencyConvertedTo: state.currencyConvertedTo,
    currencyConvertedFrom: state.currencyConvertedFrom,
    isLoadingResults: state.isLoadingResults,
    initialHistoricalDate: state.initialHistoricalDate,
    closingHistoricalDate: state.closingHistoricalDate,
    historicalRateChange: state.historicalRateChange,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadingResults: status =>
      dispatch({
        type: actionTypes.LOADING_STATUS_RESULTS,
        isLoadingResults: status,
      }),
    onSubmitHistoricalRate: values =>
      dispatch({
        type: actionTypes.SUBMIT_HISTORICAL_DATE_RATE,
        historicalRateChange: values.rateChange,
        closingHistoricalDate: values.dateTo,
        initialHistoricalDate: values.dateFrom,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoricalRate);
