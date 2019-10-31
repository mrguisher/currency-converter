import React from 'react';
import './App.scss';
import { connect } from 'react-redux';

import ConvertBar from '../containers/ConvertBar/ConvertBar';
import ConvertedAmount from '../containers/ConvertedAmount/ConvertedAmount';
import HistoricalRate from '../containers/HistoricalRate/HistoricalRate';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

function App(props) {
  return (
    <div className="App">
      {props.isLoadingCurrencies === true && <LoadingSpinner></LoadingSpinner>}

      <ConvertBar
        className={`${
          props.isLoadingCurrencies === true
            ? 'convert-bar visibility-hidden'
            : 'convert-bar visibility-visible'
        }`}
      ></ConvertBar>

      {props.isResultVisible === true && (
        <div className="lower-container">
          <ConvertedAmount></ConvertedAmount>
          <HistoricalRate></HistoricalRate>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isLoadingResults: state.isLoadingResults,
    isLoadingCurrencies: state.isLoadingCurrencies,
    isResultVisible: state.isResultVisible,
  };
};

export default connect(
  mapStateToProps,
  null
)(App);
