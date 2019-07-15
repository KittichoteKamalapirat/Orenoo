import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Words from './components/Words';

// Redux
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Words />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
