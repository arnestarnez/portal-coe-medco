import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1)
  },
  content: {
    paddingTop: 0,
    textAlign: 'center'
  },
  image: {
    marginTop: 0,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  }
}));

const NotFound = () => {
  const classes = useStyles();

  return (
    <div className="login-box-body">
    <div className={classes.root}>
      <Grid
        container
        justify="center"
        spacing={0}
      >
        <Grid
          item
          lg={12}
          xs={12}
        >
          <div className={classes.content}>
            <Typography variant="h8">
              404: The page you are looking for isn’t here
            </Typography>
            <Typography variant="subtitle2">
              You either tried some shady route or you came here by mistake.
              Whichever it is, try using the navigation
            </Typography>
            <img
              alt="Under development"
              className={classes.image}
              src="/images/undraw_page_not_found_su7k.svg"
            />
          </div>
        </Grid>
      </Grid>
    </div>

    </div>
    );
};

export default NotFound;
