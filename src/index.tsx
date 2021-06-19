import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { createStore, applyMiddleware, compose } from 'redux';

import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import { HashRouter, Route, Switch } from 'react-router-dom';

import { rootReducer } from './models';

import Home from './components/Home';
import Tracks from './components/Tracks';
import Playlists from './components/Playlists';

export const serverUrl = 'http://localhost:8888';

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  rootReducer, /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunkMiddleware)
  ));

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/tracks' component={Tracks} />
        <Route exact path='/playlists' component={Playlists} />
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById('content')
);
