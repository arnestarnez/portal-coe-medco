import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles=makeStyles(theme => ({
  root: {
    //padding: theme.spacing(4),
    //        backgroundColor: '#ffF8ffF8',
    transparent: true,
    backgroundColor: '#fff',
    width: '100%',
    //height: '600px'
  }
}));

const Dashboard=props => {
  const { history }=props;
/*
  if (!localStorage.getItem("NamaLengkap")) {
    history.push('/logout');

  }*/

  return (
    <>
      {/*}<!-- End Contact Us Section -->{*/}
    </>
  );
};

export default Dashboard;
