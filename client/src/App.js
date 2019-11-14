import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import LoginComponent from './components/Login';
import RegisterComponent from './components/Register';
import ForgotPasswordComponent from './components/ForgotPassword';
import HeaderComponent from './components/layout/Header';
import FooterComponent from './components/layout/Footer';
import MainComponent from './components/layout/Main';
import DisplayMessageComponent from './components/utils/DisplayMessage';
import ProtectedRoute from './components/utils/ProtectedRoute';
import { withStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/userActions';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  }
});

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    const { classes } = this.props;
    const classNames = `App ${classes.root}`;

    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <Router>
            <div className={classNames}>
              <DisplayMessageComponent></DisplayMessageComponent>
              <Switch>
                <Route exact path="/">
                  <HeaderComponent></HeaderComponent>
                  <MainComponent></MainComponent>
                  <FooterComponent></FooterComponent>
                </Route>
                <ProtectedRoute exact path="/login" component={LoginComponent} />
                <ProtectedRoute exact path="/register" component={RegisterComponent} />
                <ProtectedRoute exact path="/forgot-password" component={ForgotPasswordComponent} />
              </Switch>
            </div>
          </Router>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

// export default App;

export default withStyles(styles)(App);
