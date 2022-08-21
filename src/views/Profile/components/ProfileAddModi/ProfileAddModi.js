import React, { createRef, useState, useEffect } from 'react';
import { useParams } from 'react-router';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';
import L from 'leaflet';
import axios from 'axios';
import { urlAddProv, urlEditProv, urlU, urlUbahPassword } from '../../../../kumpulanUrl';
//import { Map, TileLayer, Marker, Popup, Tooltip } from 'components/LeafletComponent'
import validate from 'validate.js';
import { isArrayLiteralExpression, createTypeAliasDeclaration } from 'typescript';
import Swal from 'sweetalert2';
const schema={
  KodeDepdagri: {
    presence: { allowEmpty: false, message: 'harus diisi' },
    //email: true,
    length: {
      maximum: 200
    }
  },
  nama_provinsi: {
    presence: { allowEmpty: false, message: 'harus diisi' },
    //email: true,
    length: {
      maximum: 200
    }
  },
  IsActive: {
    presence: { allowEmpty: false, message: 'harus diisi' },
    //email: true,
    /* length: {
       maximum: 1
     }*/
  },
  /**/

};

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

const ProfileAddModi=props => {
  const { className, setData, getDataBackend,getMockData, setRowSelect, rowSelect, title, ...rest }=props;

  const classes=useStyles();

  const [values, setValues]=useState({});
  const [getStatus, setStatus]=useState([]);
  const [getKeyId, setKeyId]=useState([]);

  const status=[
    {
      value: '1',
      label: 'Active'
    },
    {
      value: '0',
      label: 'Inactive'
    }


  ];
  const [formState, setFormState]=useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });


  ///  const mapRef=createRef();

  useEffect(() => {
    /*
    if (rowSelect.IsActive==='1') {
      rowSelect.status='Active'
    } else if (rowSelect.status==='0') {
      rowSelect.status='Non Activw'
    }*/
    const errors=validate(rowSelect, schema);

    setFormState(formState => ({
      ...rowSelect,
      isValid: errors? false:true,
      errors: errors||{}
    }));
    // console.log("formState", formState)


    //   alert(setOpen)
  }, [rowSelect]); // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour


  const handleChange=event => {

    //    event.persist();

    const errors=validate(rowSelect, schema);

    setFormState(formState => ({
      ...rowSelect,
      isValid: errors? false:true,
      errors: errors||{}
    }));


    setRowSelect({
      ...rowSelect,
      [event.target.name]: event.target.value
    });
  }

  const handleClose=() => {
    getDataBackend();
  }

  const handleSave=(event) => {
    const userName=localStorage.getItem('username');
    let varJson = {
      "Password": rowSelect.Password,
      "confirmPassword": rowSelect.confirmPassword,
      "id": rowSelect.id,
      "NamaLengkap": rowSelect.NamaLengkap,
      "Alamat": rowSelect.Alamat,
    }
    let url=urlUbahPassword;
    // alert(url)
    varJson.LastModifiedBy = userName;

    //console.log(body);



    const requestOptions={
      method: 'POST',
      mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        varJson,
      )
    };


    ///let urlGetData=urlPostLogin
    // alert(url);
    const response=fetch(url, requestOptions)
      .then(tester => {

        return tester.json();
      })/**/
      .then(
        localStorage.setItem("NamaLengkap",rowSelect.NamaLengkap),
        localStorage.setItem("Alamat",rowSelect.Alamat),
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Sukses Memperbarui Data',
          showConfirmButton: false,
          timer: 1000
        })
      ).then(window.location.reload())
      .catch((e) => {

        // alert(e)
        // swal("Gagal Login!", "Gagal Login", "error",  )

        return false;


      });

  }




  //  const position=[currentLocation.lat, currentLocation.lng]
  const hasError=field => {
    return formState&&formState.errors&&formState.errors[field]? true:false;
  }


  const [open, setOpen]=React.useState(false);
const handleTutup = () => {
  setOpen(false)
}
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >

      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          subheader=""

        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
             <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Alamat"
                margin="dense"
                name="Alamat"
                onChange={handleChange}
                helperText={
                  hasError('Alamat')? formState.errors.Alamat[0]:null
                }

                error={hasError('Alamat')}
                defaultValue={rowSelect&&rowSelect.Alamat? rowSelect.Alamat:''}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="NamaLengkap"
                margin="dense"
                name="NamaLengkap"
                onChange={handleChange}
                helperText={
                  hasError('NamaLengkap')? formState.errors.NamaLengkap[0]:null
                }

                error={hasError('NamaLengkap')}
                defaultValue={rowSelect&&rowSelect.NamaLengkap? rowSelect.NamaLengkap:''}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Password"
                type="password"
                margin="dense"
                name="Password"
                onChange={handleChange}
                helperText={
                  hasError('Password')? formState.errors.Password[0]:null
                }

                error={hasError('Password')}
                defaultValue={rowSelect&&rowSelect.Password? rowSelect.Password:''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Confirm Password"
                margin="dense"
                type="password"
                name="confirmPassword"
                onChange={handleChange}
                // helperText={
                //   hasError('nama_provinsi')? formState.errors.nama_provinsi[0]:null
                // }

                // error={hasError('nama_provinsi')}

                defaultValue={rowSelect&&rowSelect.confirmPassword? rowSelect.confirmPassword:''}
                variant="outlined"
              />
            </Grid>

          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            className={classes.buttonSuccess}
            variant="contained"
            onClick={handleSave}
            disabled={rowSelect.Password != rowSelect.confirmPassword}

          >
            Simpan
          </Button>

        </CardActions>
      </form>
    </Card>
  );
};

ProfileAddModi.propTypes={
  className: PropTypes.string,
};

export default ProfileAddModi;