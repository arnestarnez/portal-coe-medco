import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import MoneyIcon from '@material-ui/icons/Money';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import { Icon, InlineIcon } from '@iconify/react';
import counterIcon from '@iconify/icons-mdi/counter';
import PeopleIcon from '@material-ui/icons/People';

const useStyles=makeStyles(theme => ({
  root: {
    height: '100%',

  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.error.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.error.dark
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1)
  }
}));

const Budget=props => {
  const { className, ...rest }=props;

  const classes=useStyles();

  return (
    <>
      <Card
        {...rest}
        className={clsx(classes.root, className)}
        style={{ height: '100%' }}
      >

        <CardContent style={{
          background: '#87ceeb', color: 'white'
        }}>
          <Grid
            container
            justify="space-between"
          >

            <Grid item
              lg={2}
              sm={2}
              xl={3}
              xs={12}
            >
              <LoyaltyIcon className={classes.icon} ></LoyaltyIcon>
            </Grid>
            <Grid item
              lg={9}
              sm={9}
              xl={3}
              xs={12}
            >
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
                variant="body2"
                style={{ color: 'white' }}
              >
                Daily Visitor
            </Typography>
              <Typography variant="h3" style={{ color: 'white' }}>150</Typography>
            </Grid>



          </Grid>
        </CardContent>
        <br />

        <CardContent style={{ background: 'red', color: 'white' }}>
          <Grid
            container
            justify="space-between"
          >



            <Grid item
              lg={3}
              sm={2}
              xl={3}
              xs={12}
              style={{ verticalAlign: '_top' }}
            >
              <Icon icon={counterIcon} style={{ paddingtop: 0, marginTop: '-10px', width: '60%', height: '100%' }} />
            </Grid>
            <Grid item
              lg={9}
              sm={9}
              xl={3}
              xs={12}

            >
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
                variant="body2"
                style={{ color: 'white' }}
              >
                Number Visitor
            </Typography>
              <Typography variant="h3" style={{ color: 'white' }}>500</Typography>
            </Grid>

          </Grid>
        </CardContent>
        <br />
        <CardContent style={{ background: 'blue', color: 'white' }}>
          <Grid
            container
            justify="space-between"
          >

            <Grid item
              lg={3}
              sm={3}
              xl={3}
              xs={12}
              style={{ verticalAlign: '_top' }}
            >
              <PeopleIcon className={classes.icon} />
            </Grid>
            <Grid item
              lg={9}
              sm={9}
              xl={3}
              xs={12}

            >
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
                variant="body1"
                style={{ color: 'white' }}
              >
                User Registration
            </Typography>
              <Typography variant="h3" style={{ color: 'white' }}>44</Typography>
            </Grid>

          </Grid>
        </CardContent>



      </Card>
    </>
  );
};

Budget.propTypes={
  className: PropTypes.string
};

export default Budget;
