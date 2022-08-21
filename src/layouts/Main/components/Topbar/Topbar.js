import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';

const useStyles=makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  name: {
    marginTop: theme.spacing(0),
    color: '#fff',
  }
}));

const isClient=typeof window==='object';

function getSize() {
  return {
    width: isClient? window.innerWidth:undefined,
    height: isClient? window.innerHeight:undefined
  };

}
const Topbar=props => {
  const { className, onSidebarOpen, ...rest }=props;
  const [windowSize, setWindowSize]=useState(getSize);

  const classes=useStyles();
  function handleResize() {
    setWindowSize(getSize());
  }

  const [notifications]=useState([]);
  window.addEventListener('resize', handleResize);
  const history=useHistory();
  const handleExit=(event) => {

    //alert("sasasa")
    history.push("/logout");
    //return <Redirect to='/logout' />

  };


  return (
    <section id="topbar" className="d-none d-lg-block">
      <div className="container clearfix">

        <div className="logo float-left">
          <h1 className="text-light"><a href="index.html"><span>Mamba1</span></a></h1>
          {/*}<!-- Uncomment below if you prefer to use an image logo -->
        <!-- <a href="index.html"><img src="assets/img/logo.png" alt="" className="img-fluid"></a>-->{*/}
        </div>

        <div className="social-links float-right">
          <a href="#" className="twitter"><i className="icofont-twitter"></i></a>
          <a href="#" className="facebook"><i className="icofont-facebook"></i></a>
          <a href="#" className="instagram"><i className="icofont-instagram"></i></a>
          <a href="#" className="skype"><i className="icofont-skype"></i></a>
          <a href="#" className="linkedin"><i className="icofont-linkedin"></i></a>
        </div>
      </div>
    </section>


  );
};

Topbar.propTypes={
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
