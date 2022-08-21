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
import { urlAddKelompokData, urlEditKelompokData } from '../../../../kumpulanUrl';
//import { Map, TileLayer, Marker, Popup, Tooltip } from 'components/LeafletComponent'
import validate from 'validate.js';
import { isArrayLiteralExpression, createTypeAliasDeclaration } from 'typescript';
import Swal from 'sweetalert2'
const schema={
  nama_kelompok_data: {
    presence: { allowEmpty: false, message: 'harus diisi' },
    //email: true,
    length: {
      maximum: 200
    }
  },
  /**/

};
// const Swal = require('sweetalert2')

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

const KelompokDataAddModi=props => {
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
    const userName=localStorage.getItem('username');
    let varJson = {
      "nama_kelompok_data":rowSelect.nama_kelompok_data,
      "Id_kelompok_data":rowSelect.Id_kelompok_data,
    }
    let url=urlAddKelompokData;
    if (title=='Tambah Kelompok Data') {
      url=urlAddKelompokData;
      varJson.CreatedBy = userName
      varJson.LastModifiedBy = userName
    } else {
      url=urlEditKelompokData;
      // console.log("ide =",rowSelect.id_rt)

      varJson.LastModifiedBy = userName
    }

    // console.log("var json =",varJson);



    const requestOptions={
      method: 'POST',
      mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        varJson
      )
    };


    ///let urlGetData=urlPostLogin
    // alert(url);
    // console.log(url)
    const response=fetch(url, requestOptions)
      .then(tester => {
        if (tester.status === 200) {  
       handleClose();
          return tester.json();
        }
       
      })/**/

      .then(tester => {
        // console.log(tester)
        // alert(tester)
      getDataBackend();if (url == urlAddKelompokData) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Sukses Menambah Data',
          showConfirmButton: false,
          timer: 1000
        })
      }if(url == urlEditKelompokData){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Sukses Memperbarui Data',
          showConfirmButton: false,
          timer: 1000
        })
      }

        // alert("Sukses")
        const data=tester;
      })
      .catch((e) => {
        alert(e)
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
        title={title}
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
                label="Nama Kelompok Data"
                margin="dense"
                name="nama_kelompok_data"
                onChange={handleChange}
                helperText={
                  hasError('nama_kelompok_data')? formState.errors.nama_kelompok_data[0]:null
                }

                error={hasError('nama_kelompok_data')}

                defaultValue={rowSelect&&rowSelect.nama_kelompok_data? rowSelect.nama_kelompok_data:''}
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

KelompokDataAddModi.propTypes={
  className: PropTypes.string,
};

export default KelompokDataAddModi;