import React, { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Words from './components/Words';
import Decks from './components/decks/Decks';
import Deck from './components/decks/Deck';
import CombinedDeck from './components/decks/CombinedDeck';
import Navbar from './components/layout/Navbar';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Landing from './components/Landing';
import Contact from './components/Contact';
import PrivateRoute from './components/routing/PrivateRoute';

import EditProfile from './components/profile/EditProfile';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <div className='container'>
            <Switch>
              <PrivateRoute exact path='/' component={Landing} />
              {/* <PrivateRoute exact path='/' component={Words} /> */}
              <PrivateRoute exact path='/decks' component={Decks} />

              {/* <PrivateRoute exact path='/myprofile' component={Profile} /> */}
              <PrivateRoute
                exact
                path='/edit-profile'
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path='/decks/combined'
                component={CombinedDeck}
              />
              <PrivateRoute exact path='/decks/:id' component={Deck} />

              <Route exact path='/landing' component={Landing} />
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/contact' component={Contact} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
