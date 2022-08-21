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
import { urlAddVuser, urlEditVuser } from '../../../../kumpulanUrl';
//import { Map, TileLayer, Marker, Popup, Tooltip } from 'components/LeafletComponent'
import validate from 'validate.js';
import { isArrayLiteralExpression, createTypeAliasDeclaration } from 'typescript';
import Swal from 'sweetalert2';
const schema={
  UserName: {
    presence: { allowEmpty: false, message: 'harus diisi' },
    //email: true,
    length: {
      maximum: 200
    }
  },
  NamaLengkap: {
    presence: { allowEmpty: false, message: 'harus diisi' },
    //email: true,
    length: {
      maximum: 200
    }
  },
  Jabatan: {
    presence: { allowEmpty: false, message: 'harus diisi' },
    //email: true,
    length: {
      maximum: 200
    }
  },
  Password: {
    presence: { allowEmpty: false, message: 'harus diisi' },
    //email: true,
    length: {
      maximum: 200
    }
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

const VuserAddModi=props => {
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
    if (rowSelect.Password==='1') {
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
    const userId=localStorage.getItem('user_id');
    let url=urlAddVuser;
    if (rowSelect.id===undefined) {
      url=urlAddVuser;
    } else {
      url=urlEditVuser;
    }

    //console.log(body);



    const requestOptions={
      method: 'POST',
      mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "UserName": rowSelect.UserName,
        "id": rowSelect.id,
        "NamaLengkap": rowSelect.NamaLengkap,
        "NIK": rowSelect.NIK,
        "Alamat": rowSelect.Alamat,
        "Jabatan": rowSelect.Jabatan,
        "Password": rowSelect.Password,
        "Email": rowSelect.Email,
        "Title Email": localStorage.getItem('Title Email'),
        "body": localStorage.getItem('body'),
        "url": localStorage.getItem('url'),
      })
    };


    ///let urlGetData=urlPostLogin
    // alert(url);
    const response=fetch(url, requestOptions)
      .then(res => {
        if (res.status === 200) {
       handleClose();
          return res.json();
        }
       
      })/**/

      .then(res => {
        // console.log(res)
        getDataBackend();
        if (url == urlAddVuser) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Sukses Menambah Data',
            showConfirmButton: false,
            timer: 1000
          })
        }if(url == urlEditVuser){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Sukses Memperbarui Data',
            showConfirmButton: false,
            timer: 1000
          })
        }


        const data=res;
      })
      .catch((e) => {

    
        // swal("Gagal Login!", "Gagal Login", "error",  )

        return false;


      });


  }




  //  const position=[currentLocation.lat, currentLocation.lng]
  const hasError=field => {
    return formState&&formState.errors&&formState.errors[field]? true:false;
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
          title= {title}
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
                label="Nama Pengguna"
                margin="dense"
                name="UserName"
                onChange={handleChange}
                helperText={
                  hasError('UserName')? formState.errors.UserName[0]:null
                }

                error={hasError('UserName')}
                defaultValue={rowSelect&&rowSelect.UserName? rowSelect.UserName:''}
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
                label="Nomor Induk"
                margin="dense"
                name="NIK"
                onChange={handleChange}
                // helperText={
                //   hasError('UserName')? formState.errors.UserName[0]:null
                // }

                // error={hasError('UserName')}
                defaultValue={rowSelect&&rowSelect.NIK? rowSelect.NIK:''}
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
                label="Alamat"
                margin="dense"
                name="Alamat"
                onChange={handleChange}
                // helperText={
                //   hasError('UserName')? formState.errors.UserName[0]:null
                // }

                // error={hasError('UserName')}
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
                label="Nama Lengkap"
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
                label="Jabatan"
                margin="dense"
                name="Jabatan"
                onChange={handleChange}
                helperText={
                  hasError('Jabatan')? formState.errors.Jabatan[0]:null
                }

                error={hasError('Jabatan')}

                defaultValue={rowSelect&&rowSelect.Jabatan? rowSelect.Jabatan:''}
                variant="outlined"
              />
            </Grid>

            <Grid
             item
             md={6}
             xs={12}>
              <TextField
                fullWidth
                label="Email"
                margin="dense"
                name="Email"
                onChange={handleChange}
                helperText={
                  hasError('Email')? formState.errors.Email[0]:null
                }
                error={hasError('Email')}
                defaultValue={rowSelect&&rowSelect.Email? rowSelect.Email:''}
                variant="outlined"
              />
            </Grid>
                         
            <Grid
             item
             md={6}
             xs={12}>
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
              disabled={title == 'Ubah Vuser'}
                error={hasError('Password')}
                defaultValue={rowSelect&&rowSelect.Password? rowSelect.Password:''}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          {!formState.isValid}
         {!formState.isValid}
          <Button
            color="primary"
            className={classes.buttonSuccess}
            variant="contained"
            onClick={handleSave}
            disabled={!formState.isValid}

          >
            Simpan
          </Button>

          <Button color="primary"
            className={classes.buttonCancel}
            variant="contained"
            onClick={handleClose} >Batal</Button>

        </CardActions>
      </form>
    </Card>
  );
};

VuserAddModi.propTypes={
  className: PropTypes.string,
};

export default VuserAddModi;