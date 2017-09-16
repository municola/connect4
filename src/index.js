import thunkMiddleware from 'redux-thunk';
import promise from 'redux-promise-middleware';import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './pages/App';
import reducer from './reducers';
import Lobby from './containers/Lobby';
import { attachStore } from './actions/socketio.js';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(
    thunkMiddleware,
    // loggerMiddleware,
    promise(),
  ),
);

attachStore(store);

const root = document.createElement('div');
document.body.style.margin = '0px';
document.body.style.minHeight = '100vh';
root.style.minHeight = '100vh';
document.body.appendChild(root);

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Lobby} />
      </Route>
    </Router>
  </Provider>,
  root
);
