import React, { createRef, useState, useEffect } from 'react';
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
import { urlAddKel, urlEditKel, urlKab, urlKec, urlProv, urlShowKab,urlShowKec } from '../../../../kumpulanUrl';
//import { Map, TileLayer, Marker, Popup, Tooltip } from 'components/LeafletComponent'
import validate, { async } from 'validate.js';
import { isArrayLiteralExpression, createTypeAliasDeclaration } from 'typescript';
const schema = {
  KodeDepdagri: {
    presence: { allowEmpty: false, message: 'harus diisi' },
    //email: true,
    length: {
      maximum: 200
    }
  },
  nama_kelurahan: {
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

const useStyles = makeStyles(theme => ({
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

const KelurahanAddModi = props => {
  const { className, setData, getDataBackend, setRowSelect, rowSelect, title, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({});
  const [getStatus, setStatus] = useState([]);
  const [kabupaten, setKabupaten] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [provinsi, setProvinsi] = useState([]);
  const [getKeyId, setKeyId] = useState([]);

  const status = [
    {
      value: '1',
      label: 'Active'
    },
    {
      value: '0',
      label: 'Inactive'
    }


  ];
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const handleChangeProvinsi=event=> {
    handleChange(event)
    showKab(event.target.value)
  } 
   const handleChangeKabupaten=event=> {
    handleChange(event)
    showKecamatan(event.target.value)
  }
async function showKab(id_provinsi) {
    /* */
    const requestOptions={
      method: 'POST',
      //mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "id_provinsi": id_provinsi,
      })
    };

    let urlShow=urlShowKab
    // eslint-disable-next-line no-useless-concat
    const response=await fetch(urlShow, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data=resJson;
        console.log('kabupaten =',data.data)
        setKabupaten(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        setKabupaten([]);
        //this.setState({ ...this.state, isFetching: false });
      });
  }

  async function showKecamatan(id_kabupaten) {
    /* */
    const requestOptions = {
      method: 'POST',
      //mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "id_kabupaten": id_kabupaten,
      })
    };

    let urlShow = urlShowKec
    // eslint-disable-next-line no-useless-concat
    const response = await fetch(urlShow, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data = resJson;
        console.log('kecamatan =', data.data)
        setKecamatan(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        setKecamatan([]);
        //this.setState({ ...this.state, isFetching: false });
      });
  }

  async function getKec() {
    /* */
    const requestOptions={
      method: 'get',
      //mode: "cors",
      headers: { 'Content-Type': 'application/json' },
    };

    let urlGetKecAll=urlKec
    // eslint-disable-next-line no-useless-concat
    const response=await fetch(urlGetKecAll, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data=resJson;
        setKecamatan(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        alert("Nextwork Error");
        setKecamatan([]);
        //this.setState({ ...this.state, isFetching: false });
      });
  }


  async function getKab() {
    /* */
    const requestOptions={
      method: 'get',
      //mode: "cors",
      headers: { 'Content-Type': 'application/json' },
    };

    let urlGetKabAll=urlKab
    // eslint-disable-next-line no-useless-concat
    const response=await fetch(urlGetKabAll, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data=resJson;
        setKabupaten(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        alert("Nextwork Error");
        setKabupaten([]);
        //this.setState({ ...this.state, isFetching: false });
      });
  }

  async function getProv() {
    /* */
    const requestOptions = {
      method: 'get',
      //mode: "cors",
      headers: { 'Content-Type': 'application/json' },
    };

    let urlGetProv = urlProv
    // eslint-disable-next-line no-useless-concat
    const response = await fetch(urlGetProv, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data = resJson;
        setProvinsi(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        alert("Nextwork Error");
        setProvinsi([]);
        //this.setState({ ...this.state, isFetching: false });
      });
  }






  ///  const mapRef=createRef();

  useEffect(() => {
    getProv()
    showKecamatan(rowSelect.id_kabupaten)
    showKab(rowSelect.id_provinsi)
    // getKec()

    /*
    if (rowSelect.IsActive==='1') {
      rowSelect.status='Active'
    } else if (rowSelect.status==='0') {
      rowSelect.status='Non Activw'
    }*/
    const errors = validate(rowSelect, schema);
    console.log(errors)
    console.log("rowSelect", rowSelect)
    console.log("schema", schema)

    setFormState(formState => ({
      ...rowSelect,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
    console.log("formState", formState)


    //   alert(setOpen)
  }, [rowSelect]); // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour


  const handleChange = event => {

    //    event.persist();

    const errors = validate(rowSelect, schema);

    setFormState(formState => ({
      ...rowSelect,
      isValid: errors ? false : true,
      errors: errors || {}
    }));


    setRowSelect({
      ...rowSelect,
      [event.target.name]: event.target.value
    });
  }

  const handleClose = () => {
    getDataBackend();
  }

  const handleSave = (event) => {
    const userId = localStorage.getItem('user_id');
    let url = urlAddKel;
    if (rowSelect.id_kelurahan === undefined) {
      url = urlAddKel;
    } else {
      url = urlEditKel;
    }

    //console.log(body);




    const requestOptions = {
      method: 'POST',
      mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "KodeDepdagri": rowSelect.KodeDepdagri,
        "id_kelurahan": rowSelect.id_kelurahan,
        "id_kecamatan": rowSelect.id_kecamatan,
        "nama_kelurahan": rowSelect.nama_kelurahan,
        "IsActive": rowSelect.IsActive,
      })
    };


    ///let urlGetData=urlPostLogin

    alert(url)
    const response = fetch(url, requestOptions)
      .then(res => {
        return res.json();
      })/**/

      .then(res => {
        //console.log(res)
        //console.log(res.data)
        alert(res.message)

        handleClose();
        getDataBackend();
        alert("Sukses")
        const data = res;
      })
      .catch((e) => {

        swal("Gagal Login!", "Gagal Login", "error", null, '200x200')

        return false;


      });


  }




  //  const position=[currentLocation.lat, currentLocation.lng]
  const hasError = field => {
    return formState && formState.errors && formState.errors[field] ? true : false;
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
          title={rowSelect.id_kelurahan== undefined ? "Tambah Kelurahan" : "Ubah Kelurahan"}
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
                label="Kode Depdagri"
                margin="dense"
                name="KodeDepdagri"
                onChange={handleChange}
                helperText={
                  hasError('KodeDepdagri') ? formState.errors.KodeDepdagri[0] : null
                }

                error={hasError('KodeDepdagri')}
                defaultValue={rowSelect && rowSelect.KodeDepdagri ? rowSelect.KodeDepdagri : ''}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <Grid
            >
              <TextField
                fullWidth
                label="Pilih Provinsi"
                margin="dense"
                name="id_provinsi"
                onChange={handleChangeProvinsi}
                //required
                select
                // eslint-disable-next-line react/jsx-sort-props
                //SelectProps={{ native: true }}

                //defaultValue={rowSelect.IsActive}
                value={rowSelect.id_provinsi}
                variant="outlined"
              >
                {provinsi.map(option => (
                  <option
                    key={option.id_provinsi}
                    value={option.id_provinsi}
                  >
                    {option.nama_provinsi}
                  </option>
                ))}

              </TextField>

            </Grid>
            
            <Grid
            >
              <TextField
                fullWidth
                label="Pilih Kabupaten"
                margin="dense"
                name="id_kabupaten"
                onChange={handleChangeKabupaten}
                //required
                select
                // eslint-disable-next-line react/jsx-sort-props
                //SelectProps={{ native: true }}

                //defaultValue={rowSelect.IsActive}
                value={rowSelect.id_kabupaten}
                variant="outlined"
              >
                {kabupaten.map(option => (
                  <option
                    key={option.id_kabupaten}
                    value={option.id_kabupaten}
                  >
                    {option.nama_kabupaten}
                  </option>
                ))}

              </TextField>

            </Grid>


              <TextField
                fullWidth
                label="Pilih Kecamatan"
                margin="dense"
                select
                name="id_kecamatan"
                onChange={handleChange}
                value={rowSelect.id_kecamatan}
                variant="outlined"
              >
                {kecamatan.map(option => (
                  <option
                    key={option.id_kecamatan}
                    value={option.id_kecamatan}
                  >
                    {option.nama_kecamatan}
                  </option>
                ))}
              </TextField>
              
             
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Nama Kelurahan"
                margin="dense"
                name="nama_kelurahan"
                onChange={handleChange}
                helperText={
                  hasError('nama_kelurahan') ? formState.errors.nama_kelurahan[0] : null
                }

                error={hasError('nama_kelurahan')}

                defaultValue={rowSelect && rowSelect.nama_kelurahan ? rowSelect.nama_kelurahan : ''}
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
                label="Select aktiv"
                margin="dense"
                name="IsActive"
                onChange={handleChange}
                //required
                select
                // eslint-disable-next-line react/jsx-sort-props
                //SelectProps={{ native: true }}

                //defaultValue={rowSelect.IsActive}
                value={rowSelect && rowSelect.IsActive ? rowSelect.IsActive : ''}
                variant="outlined"
              >
                {status.map(option => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}

              </TextField>

            </Grid>

          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
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

KelurahanAddModi.propTypes = {
  className: PropTypes.string,
};

export default KelurahanAddModi;