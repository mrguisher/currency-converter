import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actions';
import './ConvertBar.scss';
import Button from '../../components/Button/Button';
import InputSelect from '../../components/InputSelect/InputSelect';

class ConvertBar extends Component {
  componentDidMount() {
    this.props.onLoadingCurrencies(false);
  }

  inputValidation(event) {
    return isNaN(Number(event.target.value.trim()))
      ? this.props.amountInputValue
      : Number(event.target.value.trim());
  }

  async getConvertedAmount() {
    const convertFrom = this.props.currencyToConvertFrom;
    const convertTo = this.props.currencyToConvertTo;
    const amountToConvert = this.props.amountInputValue;
    const isResultVisible = true;
    let result = Object();
    const currencyConvertEndpoint = `https://api.exchangeratesapi.io/latest?base=${convertFrom}&symbols=${convertTo}`;

    const setLoadingResultsStatus = status =>
      this.props.onLoadingResults(status);
    setLoadingResultsStatus(true);

    await fetch(currencyConvertEndpoint)
      .then(res =>
        res.ok !== false ? res.json() : alert('Base currency unavailable')
      )
      .then(data => (result = data))
      .catch(err => err);

    const amountConverted =
      result !== undefined
        ? (amountToConvert * Object.values(result.rates)).toFixed(2)
        : null;
    const submitResults = () =>
      result !== undefined
        ? this.props.onSubmit({
            amountConverted,
            amountToConvert,
            convertFrom,
            convertTo,
            isResultVisible,
          })
        : null;

    await submitResults();
    setLoadingResultsStatus(false);
  }

  render() {
    return (
      <div className={this.props.className}>
        <div className="convert-bar__left-container">
          <input
            id="standard-name"
            className="input-amount"
            placeholder={'0'}
            value={
              this.props.amountInputValue !== 0
                ? this.props.amountInputValue
                : ''
            }
            onChange={event =>
              this.props.onInputChangeAmount(this.inputValidation(event))
            }
            onKeyPress={event =>
              event.key === 'Enter' && this.getConvertedAmount()
            }
          />
          <InputSelect direction="from"></InputSelect>
          <span className="convert-bar__span">to</span>
          <InputSelect direction="to"></InputSelect>
        </div>

        <Button onClick={() => this.getConvertedAmount()}>Convert</Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    amountInputValue: state.amountToConvert,
    currencyToConvertFrom: state.currencyToConvertFrom,
    currencyToConvertTo: state.currencyToConvertTo,
    isLoadingResults: state.isLoadingResults,
    isLoadingCurrencies: state.isLoadingCurrencies,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onMountFetchCurrencies: currencies =>
      dispatch({ type: actionTypes.FETCH_CURRENCIES, payload: currencies }),
    onInputChangeAmount: value =>
      dispatch({ type: actionTypes.SET_AMOUNT_TO_CONVERT, payload: value }),
    onLoadingResults: status =>
      dispatch({
        type: actionTypes.LOADING_STATUS_RESULTS,
        isLoadingResults: status,
      }),
    onLoadingCurrencies: status =>
      dispatch({
        type: actionTypes.LOADING_STATUS_CURRENCIES,
        isLoadingCurrencies: status,
      }),
    onSubmit: values =>
      dispatch({
        type: actionTypes.SUBMIT_AMOUNT_TO_CONVERT,
        amountConvertedTo: values.amountConverted,
        amountConvertedFrom: values.amountToConvert,
        currencyConvertedTo: values.convertTo,
        currencyConvertedFrom: values.convertFrom,
        isResultVisible: values.isResultVisible,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConvertBar);
