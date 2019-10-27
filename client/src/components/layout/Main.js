import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import HomeComponent from '../Home';
import CardsComponent from '../Cards';
import ProtectedContent from '../utils/ProtectedContent';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class Main extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  render() {
    return (
      <Container maxWidth="xl">
        <HomeComponent>
          <ProtectedContent isAuth={this.props.isAuthenticated} isLoading={this.props.isLoading}>
            <CardsComponent></CardsComponent>
          </ProtectedContent>
        </HomeComponent>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default
  connect(
    mapStateToProps,
    { login, clearErrors }
  )(Main);
