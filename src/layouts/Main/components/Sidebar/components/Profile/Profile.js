import React, { useState } from 'react';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography, Hidden } from '@material-ui/core';

const useStyles=makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1),
    color: '#fff',
  }
}));

const Profile=props => {
  const { className, ...rest }=props;
  const { history }=props;
  const classes=useStyles();

  /*
    const [user, setUser]=
      useState(
        localStorage.getItem('userInLocalStorage')||null
      );
    )
  if (user) alert("userInLocalStorage"); else alert("Error")
  console.log(
    localStorage.getItem('userInLocalStorage')
  
  );
  */
  //  if (!localStorage.getItem('user_id')) alert("dsdsd")
  //alert(!localStorage.getItem('user_id'))
  if (!localStorage.getItem('user_id')) return <Redirect to='/login' />;
  if (!localStorage.getItem('accessId')) return <Redirect to='/login' />;

  var user={
    name: localStorage.getItem('firstName'),
    //avatar: localStorage.getItem('avatar')
    //bio: 'Brain Director'
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Typography
        className={classes.name}
        variant="h4"

      >

        {user.name}
      </Typography>


      {/*}
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={user.avatar}
        to="/settings"
      />
        
      <Typography
        className={classes.name}
        variant="h4"

      >

        {user.name}
      </Typography>
  <Typography variant="body2">{/*user.bio*/}{/*}</Typography>
    {*/}
    </div>
  );
};

Profile.propTypes={
  className: PropTypes.string,
  history: PropTypes.object
};

export default Profile;
