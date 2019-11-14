import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import HomeComponent from '../Home';
import CardsComponent from '../Cards';
import ProtectedContent from '../utils/ProtectedContent';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/userActions';
import { clearMessages } from '../../actions/messageActions';

class Main extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    message: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearMessages: PropTypes.func.isRequired
  };

  render() {
    return (
      <Container maxWidth="xl">
        <HomeComponent>
          <ProtectedContent>
            <CardsComponent></CardsComponent>
          </ProtectedContent>
        </HomeComponent>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  message: state.message
});

export default
  connect(
    mapStateToProps,
    { login, clearMessages }
  )(Main);
