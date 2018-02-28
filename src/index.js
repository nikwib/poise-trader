
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
 import App from './App';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

injectTapEventPlugin();

let store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__());

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
  
registerServiceWorker();
