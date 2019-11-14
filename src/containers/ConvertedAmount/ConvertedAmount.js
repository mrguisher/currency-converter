import React from 'react';
import { connect } from 'react-redux';

import './ConvertedAmount.scss';

const ConvertedAmount = props => {
  return (
    <div className="converted-amount">
      <p className="converted-amount__results">
        <span className="converted-amount__results--value">
          {props.amountConvertedFrom}
        </span>
        <span className="converted-amount__results--currency">
          {props.currencyConvertedFrom}
        </span>
        <span className="converted-amount__results__equal">=</span>
        <span className="converted-amount__results--value">
          {props.amountConvertedTo}
        </span>
        <span className="converted-amount__results--currency">
          {props.currencyConvertedTo}
        </span>
      </p>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    amountConvertedFrom: state.amountConvertedFrom,
    amountConvertedTo: state.amountConvertedTo,
    currencyConvertedTo: state.currencyConvertedTo,
    currencyConvertedFrom: state.currencyConvertedFrom,
  };
};

export default connect(
  mapStateToProps,
  null
)(ConvertedAmount);
