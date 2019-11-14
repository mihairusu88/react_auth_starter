import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetpassword } from '../actions/userActions';
import { clearMessages } from '../actions/messageActions';
import { compose } from 'recompose';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class ForgotPassword extends Component {
  state = {
    email: '',
    msg: null,
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool,
    message: PropTypes.object.isRequired,
    clearMessages: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { message } = this.props;

    if (message !== prevProps.message) {
      // Check for login error
      if (message.id === 'LOGIN_FAIL') {
        this.setState({ msg: message.msg.msg });
      } else {
        this.setState({ msg: null });
      }
    }
  }

  // On change input value set it to state
  handleInputChange = (e) => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  }

  // Submit form
  submitForm = (e) => {
    e.preventDefault();

    const { email } = this.state;

    const user = {
      email,
    };

    // Attempt to reset password
    this.props.resetpassword(user);
  }

  render() {
    const { classes, isAuthenticated, isLoading } = this.props;
    const LinkLogin = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

    if (isLoading) {
      return null;
    } else {
      if (isAuthenticated) {
        return (<Redirect to="/" />);
      } else {
        return (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <VpnKeyIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Forgot Password
              </Typography>
              <form className={classes.form} noValidate onSubmit={this.submitForm}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Reset Password
                </Button>
                <Grid container justify="center">
                  <Grid item>
                    <Link variant="body2" component={LinkLogin} to="/login">
                      Back to login.
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
        );
      }
    }
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  isLoading: state.user.isLoading,
  message: state.message
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { resetpassword, clearMessages }
  )
)(ForgotPassword);
