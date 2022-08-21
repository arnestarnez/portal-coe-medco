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
import { urlAddSetting, urlEditSetting,urlGetKelompokData,urlShowKelompokData } from '../../../../kumpulanUrl';
//import { Map, TileLayer, Marker, Popup, Tooltip } from 'components/LeafletComponent'
import validate from 'validate.js';
import { isArrayLiteralExpression, createTypeAliasDeclaration } from 'typescript';
import Swal from 'sweetalert2';
const schema={
  nama: {
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

const SettingAddModi=props => {
  const { className, setData, getDataBackend,getMockData, setRowSelect, rowSelect, title, ...rest }=props;

  const classes=useStyles();

  const [values, setValues]=useState({});
  const [getStatus, setStatus]=useState([]);
  const [getKeyId, setKeyId]=useState([]);
  const [kelompokData,setKelompokData]=useState([]);

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

  async function getKelData() {
    /* */
    const requestOptions={
      method: 'get',
      //mode: "cors",
      headers: { 'Content-Type': 'application/json' },
    };

    let url=urlGetKelompokData
    // eslint-disable-next-line no-useless-concat
    const response=await fetch(url, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data=resJson;
        setKelompokData(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        // alert("Nextwork Error");
        setKelompokData([]);
        //this.setState({ ...this.state, isFetching: false });
      });
  }

  ///  const mapRef=createRef();

  useEffect(() => {
    getKelData()
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
      "nama": rowSelect.nama,
      "value_setting": rowSelect.value_setting,
      "id_setting":rowSelect.id_setting,
      "Id_kelompok_data": rowSelect.Id_kelompok_data,
    }
    let url=urlAddSetting;
    if (rowSelect.id_setting===undefined) {
      url=urlAddSetting;
      varJson.CreatedBy = userName
      varJson.LastModifiedBy = userName
    } else {
      url=urlEditSetting;
      // console.log("ide =",rowSelect.id_setting)

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
        // alert('berhasil')
     handleClose();
        return tester.json();
      }
     
    })/**/

    .then(tester => {
      // console.log(tester)
      // alert(tester)
      getDataBackend();
      if (url == urlAddSetting) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Sukses Menambah Data',
          showConfirmButton: false,
          timer: 1000
        })
      }if(url == urlEditSetting){
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

      // alert(e)
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
                label="Nama"
                margin="dense"
                name="nama"
                onChange={handleChange}
                helperText={
                  hasError('nama')? formState.errors.nama[0]:null
                }

                error={hasError('nama')}
                defaultValue={rowSelect&&rowSelect.nama? rowSelect.nama:''}
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
                label="Value Setting"
                margin="dense"
                name="value_setting"
                onChange={handleChange}
                helperText={
                  hasError('value_setting')? formState.errors.value_setting[0]:null
                }
                error={hasError('value_setting')}
                defaultValue={rowSelect&&rowSelect.value_setting? rowSelect.value_setting:''}
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
                label="Pilih Kelompok"
                margin="dense"
                name="Id_kelompok_data"
                onChange={handleChange}
                //required
                select
                // eslint-disable-next-line react/jsx-sort-props
                //SelectProps={{ native: true }}

                //defaultValue={rowSelect.IsActive}
                value={rowSelect.Id_kelompok_data}
                variant="outlined"
              >
                {kelompokData.map(option =>(
                  <option value={option.Id_kelompok_data}>
                    {option.nama_kelompok_data}
                  </option>
                ))}
              </TextField>
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

SettingAddModi.propTypes={
  className: PropTypes.string,
};

export default SettingAddModi;