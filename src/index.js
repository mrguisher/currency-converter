import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import throttle from 'lodash.throttle';

import './index.scss';
import App from './App/App';
import reducer from './store/reducer';
import * as serviceWorker from './serviceWorker';
// import { loadState, saveState } from './store/localStorage'

let store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
