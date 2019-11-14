import * as actionTypes from './actions';

const initialState = {
  amountToConvert: 0,
  currencies: Object(),
  currencyToConvertFrom: 'EUR',
  currencyToConvertTo: 'PLN',
  isResultVisible: false,
  isLoadingResults: false,
  isLoadingCurrencies: true,
  initialHistoricalDate: '2015-03-26',
  closingHistoricalDate: '2017-06-13',
  historicalRateChange: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_AMOUNT_TO_CONVERT:
      return {
        ...state,
        amountToConvert: action.payload,
      };
    case actionTypes.FETCH_CURRENCIES:
      return {
        ...state,
        currencies: action.payload,
      };
    case actionTypes.LOADING_STATUS_RESULTS:
      return {
        ...state,
        isLoadingResults: action.isLoadingResults,
      };
    case actionTypes.LOADING_STATUS_CURRENCIES:
      return {
        ...state,
        isLoadingCurrencies: action.isLoadingCurrencies,
      };
    case actionTypes.GET_CURRENCY_TO_CONVERT_FROM:
      return {
        ...state,
        currencyToConvertFrom: action.payload,
      };
    case actionTypes.GET_CURRENCY_TO_CONVERT_TO:
      return {
        ...state,
        currencyToConvertTo: action.payload,
      };

    case actionTypes.SUBMIT_AMOUNT_TO_CONVERT:
      return {
        ...state,

        amountConvertedFrom: action.amountConvertedFrom,
        amountConvertedTo: action.amountConvertedTo,
        currencyConvertedTo: action.currencyConvertedTo,
        currencyConvertedFrom: action.currencyConvertedFrom,
        isResultVisible: action.isResultVisible,
      };
    case actionTypes.SUBMIT_HISTORICAL_DATE_RATE:
      return {
        ...state,
        historicalRateChange: action.historicalRateChange,
        closingHistoricalDate: action.closingHistoricalDate,
        initialHistoricalDate: action.initialHistoricalDate,
      };
  }
  return state;
};

export default reducer;
