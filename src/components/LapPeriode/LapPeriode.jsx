import React, { createRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { urlGetSetting, urlShowTargetKk } from '../../kumpulanUrl'
import { makeStyles } from '@material-ui/styles';
import SearchIcon from '@material-ui/icons/Search';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  Paper
} from '@material-ui/core';
import L from 'leaflet';
import axios from 'axios';
// import { urlGetKelompokData, urlGetSetting, urlShowKelompokData, urlShowSetting } from '../../../../kumpulanUrl';
//import { Map, TileLayer, Marker, Popup, Tooltip } from 'components/LeafletComponent'
import validate from 'validate.js';
import { isArrayLiteralExpression, createTypeAliasDeclaration } from 'typescript';

const useStyles=makeStyles(theme => ({
    root: {},
    buttonSuccess: {
      color: theme.palette.white,
      backgroundColor: theme.palette.green,
      '&:hover': {
        backgroundColor: '#4caf50',
        borderColor: '#66bb6a',
        boxShadow: 'none',
      },
      marginTop: '10px',
      marginBottom: '10px',
    },
    buttonCancel: {
      color: theme.palette.white,
      backgroundColor: theme.palette.red,
      '&:hover': {
        backgroundColor: '#f44336',
        borderColor: '#ef5350',
        boxShadow: 'none',
      },
    },
  }));


const LapPeriode=props => {
  const { className, textfind, onChange, style, rowSelect, setRowSelect, getDataBackend, ...rest }=props;
  const classes=useStyles();
  const schema = {
    // Periode_Sensus: {
    //   presence: { allowEmpty: false, message: 'harus diisi' },
    // },
  };

  const [formState, setFormState]=useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });


  useEffect(() => {
    // rowSelect.Periode_Sensus = localStorage.getItem("Periode Sensus")
    /*
    if (rowSelect.IsActive==='1') {
      rowSelect.status='Active'
    } else if (rowSelect.status==='0') {
      rowSelect.status='Non Activw'
    }*/
    // alert('ini pro')
    const errors=validate(rowSelect,schema);

    setFormState(formState => ({
      ...rowSelect,
      isValid: errors? false:true,
      errors: errors||{}
    }));
    console.log("formState", formState)


    //   alert(setOpen)
  }, [rowSelect]); 

//   const handleChange=event => {
    
//     const errors=validate(rowSelect, schema);

//     setFormState(formState => ({
//       ...rowSelect,
//       isValid: errors? false:true,
//       errors: errors||{}
//     }));
    
//     setRowSelect({
//       ...rowSelect,
//       [event.target.name]: event.target.value
//     });
//   }

  const handling =()=>{
    {
      var tmp = [];
      // alert(tmp) 
      // alert( localStorage.getItem("Periode Sensus") - 5 )
      var periode_sensus = localStorage.getItem("Periode Sensus");
      for (var option = periode_sensus; option >= periode_sensus - 5; option--)
       {tmp.push({"option" : option});}
      console.log('temp =',tmp)
      return tmp.map(option => (
          <option value={option.option}>
            {option.option}
          </option>
                   
           ))}
  }

  return (

               <TextField
                fullWidth
                label="Periode Sensus"
                margin="dense"
                name="Periode_Sensus"
                onChange={onChange}
                select
                variant="outlined"
                value={rowSelect.Periode_Sensus}
              >
                {handling()}
              </TextField>
     
  );
};

LapPeriode.propTypes={
  className: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object
};

export default LapPeriode;
