import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import App from './Pages/App';
import reducer from './reducers';
import Main from './containers/Main';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__()
  );

const root = document.createElement('div');
document.body.style.margin = '0px';
document.body.style.minHeight = '100vh';
root.style.minHeight = '100vh';
document.body.appendChild(root);

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Main} />
        <Route path="/onlineChecker" component={Main} />
      </Route>
    </Router>
  </Provider>,
  root
);
