import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/userActions';
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

class Login extends Component {
  state = {
    email: '',
    password: '',
    msg: null,
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool,
    message: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
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

    const { email, password } = this.state;

    const user = {
      email,
      password
    };

    // Attempt to login
    this.props.login(user);
  }

  render() {
    const { classes, isAuthenticated, isLoading } = this.props;
    const LinkForgotPassword = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);
    const LinkRegister = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

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
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
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
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link variant="body2" component={LinkForgotPassword} to="/forgot-password">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link variant="body2" component={LinkRegister} to="/register">
                      {"Don't have an account? Sign Up"}
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
    { login, clearMessages }
  )
)(Login);
