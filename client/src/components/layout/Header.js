import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { logout } from '../../actions/userActions';
import PropTypes from 'prop-types';
import ProtectedContent from '../utils/ProtectedContent';
import PublicContent from '../utils/PublicContent';

const styles = theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  toolbarTitle: {
    marginRight: 'auto',
  },
  toolbarButton: {
    margin: theme.spacing(1),
  },
});

class Header extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool,
    message: PropTypes.object.isRequired,
  };

  render() {
    const { classes } = this.props;
    const LinkLogin = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);
    const LinkRegister = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);
    const LinkLogout = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

    return (
      <AppBar position="relative">
        <Toolbar>
          <CameraIcon className={classes.icon} />
          <Typography className={classes.toolbarTitle} variant="h6" color="inherit" noWrap>
            Album layout
          </Typography>
          <PublicContent>
            <Button className={classes.toolbarButton} variant="contained" color="secondary" component={LinkLogin} to="/login">
              Login
            </Button>
            <Button className={classes.toolbarButton} variant="outlined" color="inherit" component={LinkRegister} to="/register">
              Register
            </Button>
          </PublicContent>
          <ProtectedContent>
            <Button className={classes.toolbarButton} variant="contained" color="secondary" component={LinkLogout} to="#" onClick={this.props.logout}>
              Logout
            </Button>
          </ProtectedContent>
        </Toolbar>
      </AppBar>
    );
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
    mapStateToProps, { logout }
  )
)(Header);
