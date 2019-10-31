import * as actionTypes from './actions';

const initialState = {
  amountToConvert: 0,
  currencies: Object(),
  currencyToConvertFrom: 'EUR',
  currencyToConvertTo: 'PLN',
  isResultVisible: false,
  isLoadingResults: false,
  isLoadingCurrencies: true,

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
   
  }
  return state;
};

export default reducer;
