import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

const styles = theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
});

class Home extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool
  };

  render() {
    const { classes } = this.props;

    return (
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Homepage
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Below will be displayed some protected content based on auth service.
            </Typography>
          </Container>
        </div>
        {/* Here will be displayed children components */}
        {this.props.children}
      </main>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    null
  )
)(Home);
