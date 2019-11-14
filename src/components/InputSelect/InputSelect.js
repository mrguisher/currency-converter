import React from 'react';

import './InputSelect.scss';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

const InputSelect = props => {
  return (
    <input
      type="text"
      className="input-select"
      placeholder={
        props.direction === 'from'
          ? props.currencyToConvertFrom
          : props.currencyToConvertTo
      }
      value={
        props.direction === 'from'
          ? props.currencyToConvertFrom
          : props.currencyToConvertTo
      }
      onChange={event =>
        props.direction === 'from'
          ? props.onChangeGetCurrencyToConvertFrom(
              event.target.value.toUpperCase()
            )
          : props.onChangeGetCurrencyToConvertTo(
              event.target.value.toUpperCase()
            )
      }
    />
  );
};

const mapStateToProps = state => {
  return {
    amountInputValue: state.amountToConvert,
    currencyToConvertFrom: state.currencyToConvertFrom,
    currencyToConvertTo: state.currencyToConvertTo,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeGetCurrencyToConvertFrom: symbol =>
      dispatch({
        type: actionTypes.GET_CURRENCY_TO_CONVERT_FROM,
        payload: symbol,
      }),
    onChangeGetCurrencyToConvertTo: symbol =>
      dispatch({
        type: actionTypes.GET_CURRENCY_TO_CONVERT_TO,
        payload: symbol,
      }),
    onLoadingCurrencies: status =>
      dispatch({
        type: actionTypes.LOADING_STATUS_CURRENCIES,
        isLoadingCurrencies: status,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputSelect);
