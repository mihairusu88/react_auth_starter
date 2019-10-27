import React, { Component } from 'react';
import LoginComponent from './components/Login';
import RegisterComponent from './components/Register';
import HeaderComponent from './components/layout/Header';
import FooterComponent from './components/layout/Footer';
import MainComponent from './components/layout/Main';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import ProtectedRoute from './components/utils/ProtectedRoute';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    const isAuthenticated = store.getState().auth.isAuthenticated;

    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/">
                <HeaderComponent></HeaderComponent>
                <MainComponent></MainComponent>
                <FooterComponent></FooterComponent>
              </Route>
              <ProtectedRoute exact path="/login" component={LoginComponent} isAuth={isAuthenticated} />
              <ProtectedRoute exact path="/register" component={RegisterComponent} isAuth={isAuthenticated} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
