import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const styles = theme => ({
  footer: {
    width: '100%',
    margin: 'auto 0 0 0',
    alignSelf: 'flex-end',
    backgroundColor: '#333333',
    padding: theme.spacing(4),
  },
  copyright: {
    color: '#FFFFFF'
  }
});

class Footer extends Component {
  render() {
    const { classes } = this.props;

    return (
      <footer className={classes.footer}>
        <Typography className={classes.copyright} variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://material-ui.com/">
            Your Website
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </footer>
    );
  }
}

export default withStyles(styles)(Footer);
