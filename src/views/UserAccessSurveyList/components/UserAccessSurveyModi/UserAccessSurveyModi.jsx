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
import {  
  urlAddUserAccessSurvey, 
  urlEditKab, 
  urlEditUserAccessSurvey, 
  urlGetVuser, 
  urlProv, 
  urlShowRt,
  urlShowKab,
  urlShowKec,
  urlShowKel,
  urlShowRw
 } from '../../../../kumpulanUrl';
//import { Map, TileLayer, Marker, Popup, Tooltip } from 'components/LeafletComponent'
import validate from 'validate.js';
import { isArrayLiteralExpression, createTypeAliasDeclaration } from 'typescript';
const schema={
  id_rt: {
    presence: { allowEmpty: false, message: 'harus diisi' },
  },
  Periode_Sensus: {
    presence: { allowEmpty: false, message: 'harus diisi' },
  },
  id_user: {
    presence: { allowEmpty: false, message: 'harus diisi' },
  },
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

const UserAccessSurveyModi=props => {
  const { className, setData, getDataBackend, setRowSelect, rowSelect, title, ...rest }=props;

  const classes=useStyles();

  const [values, setValues]=useState({});
  const [getKeyId, setKeyId]=useState([]);
  const [getProv, setProv]=useState([]);
  const [getKab, setKab]=useState([]);
  const [getKec, setKec]=useState([]);
  const [getKel, setKel]=useState([]);
  const [getRw, setRw]=useState([]);
  const [getRt, setRt]=useState([]);
  const [getUser, setUser]=useState([]);

  const [formState, setFormState]=useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

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
        // console.log('kabupaten =',data.data)
        setKab(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        //
        setKab([]);
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
        // console.log('kecamatan =', data.data)
        setKec(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        //
        setKec([]);
        //this.setState({ ...this.state, isFetching: false });
      });
  }

  async function showKel(id_kecamatan) {
    /* */
    const requestOptions={
      method: 'POST',
      //mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "id_kecamatan": id_kecamatan,
      })
    };

    let urlShow=urlShowKel

    // eslint-disable-next-line no-useless-concat
    const response=await fetch(urlShow, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data=resJson;
        // console.log('kelurahan =',data.data)
        setKel(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        //
        setKel([]);
        //this.setState({ ...this.state, isFetching: false });
      });
  }

  async function showRw(id_kelurahan) {
    /* */
    const requestOptions={
      method: 'POST',
      //mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "id_kelurahan": id_kelurahan,
      })
    };

    let urlShow=urlShowRw
    // eslint-disable-next-line no-useless-concat
    const response=await fetch(urlShow, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data=resJson;
        // console.log('Rw =',data.data)
        setRw(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        //
        setRw([]);
        //this.setState({ ...this.state, isFetching: false });
      });
  }

  async function showRt(id_rw) {
    /* */
    const requestOptions={
      method: 'POST',
      //mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "id_rw": id_rw,
      })
    };

    let urlShow=urlShowRt
    // eslint-disable-next-line no-useless-concat
    const response=await fetch(urlShow, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data=resJson;
        // console.log('Rw =',data.data)
        setRt(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        //
        setRt([]);
        //this.setState({ ...this.state, isFetching: false });
      });
  }

  async function getProvinsi() {
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
        setProv(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
      
        setProv([]);
        //this.setState({ ...this.state, isFetching: false });
      });
  }

  async function getVuser() {
    /* */
    const requestOptions = {
      method: 'get',
      //mode: "cors",
      headers: { 'Content-Type': 'application/json' },
    };

    let url = urlGetVuser
    // eslint-disable-next-line no-useless-concat
    const response = await fetch(url, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data = resJson;
        setUser(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
      
        setUser([]);
        //this.setState({ ...this.state, isFetching: false });
      });
  }



  ///  const mapRef=createRef();

  useEffect(() => {
    getProvinsi()
    getVuser()
    showKab(rowSelect.id_provinsi);
    showKecamatan(rowSelect.id_kabupaten);
    showKel(rowSelect.id_kecamatan);
    showRw(rowSelect.id_kelurahan);
    showRt(rowSelect.id_rw);
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

  const handleChangeProvinsi=event=> {
    handleChange(event)
    showKab(event.target.value)
  } 

  const handleChangeKabupaten=event=> {
    handleChange(event)
    showKecamatan(event.target.value)
  }

  const handleChangeKecamatan=event=> {
    handleChange(event)
    showKel(event.target.value)
  }

  const handleChangeKelurahan=event=> {
    handleChange(event)
    showRw(event.target.value)
  }

  const handleChangeRw=event=> {
    handleChange(event)
    showRt(event.target.value)
  }

  const handleClose=() => {
    getDataBackend();
  }

  const handleSave=() => {
    const userName=localStorage.getItem('username');
    let url;
    let varJson = {
      "id": rowSelect.id,
      "id_user": rowSelect.id_user,
      "id_provinsi": rowSelect.id_provinsi,
      "id_kabupaten": rowSelect.id_kabupaten,
      "id_kecamatan": rowSelect.id_kecamatan,
      "id_kelurahan": rowSelect.id_kelurahan,
      "id_rw": rowSelect.id_rw,
      "id_rt": rowSelect.id_rt,
      "Periode_Sensus": rowSelect.Periode_Sensus,
    }
    if (rowSelect.id===undefined) {
      url=urlAddUserAccessSurvey;
      varJson.CreatedBy = userName
      varJson.LastModifiedBy = userName
    } else {
      url=urlEditUserAccessSurvey;
      varJson.LastModifiedBy = userName
    }

    //console.log(body);

    const requestOptions={
      method: 'POST',
      mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        varJson
      )
    }
  
    ///let urlGetData=urlPostLogin
    // alert(url);
    const response=fetch(url, requestOptions)
      .then(res => {
        return res.json();
      })/**/

      .then(res => {
        //console.log(res)
        //console.log(res.data)
        // alert(res.message)

        swal("Berhasil Tambah data", "berhasil", "success").then(
          handleClose()
          )
        getDataBackend();
        //alert("Sukses")
        const data=res;
      })
      .catch((e) => {

        // swal("Gagal Login!", "Gagal Login", "error", null, '200x200')

        return false;


      });
    }

    

  //  const position=[currentLocation.lat, currentLocation.lng]
  const hasError=field => {
    return formState&&formState.errors&&formState.errors[field]? true:false;
  }

  const handling = () => {
    {
      var tmp = [];
      // alert(tmp) 
      // alert( localStorage.getItem("Periode Sensus") - 5 )
      var periode_sensus = localStorage.getItem("Periode Sensus");
      for (var option = periode_sensus; option >= periode_sensus - 5; option--) { tmp.push({ "option": option }); }
      // console.log('temp =', tmp)
      return tmp.map(option => (
        <option value={option.option}>
          {option.option}
        </option>

      ))
    }
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
          title={rowSelect.id == undefined ? "Tambah User Access Survey" : "Ubah User Access Survey"}
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
                label="Pilih User"
                margin="dense"
                name="id_user"
                onChange={handleChange}
                select

                value={rowSelect.id_user}
                variant="outlined"
              >
                {getUser.map((option)=> (
                  <option
                    key={option.id}
                    value={option.id}
                  >
                    {option.NamaLengkap}
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
                label="Pilih Provinsi"
                margin="dense"
                name="id_provinsi"
                onChange={handleChangeProvinsi}
                select

                value={rowSelect.id_provinsi}
                variant="outlined"
              >
                {getProv.map((option)=> (
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
              item
              md={6}
              xs={12}
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
                {getKab.map(option => (
                  <option
                    key={option.id_kabupaten}
                    value={option.id_kabupaten}
                  >
                    {option.nama_kabupaten}
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
                label="Pilih kecamatan"
                margin="dense"
                select
                name="id_kecamatan"
                onChange={handleChangeKecamatan}
                value={rowSelect.id_kecamatan}
                variant="outlined"
              >
                {getKec.map(option => (
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
                label="Pilih Kelurahan"
                margin="dense"
                name="id_kelurahan"
                onChange={handleChangeKelurahan}
                select

                value={rowSelect.id_kelurahan}
                variant="outlined"
              >
                {getKel.map((option)=> (
                  <option
                    key={option.id_kelurahan}
                    value={option.id_kelurahan}
                  >
                    {option.nama_kelurahan}
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
                label="Pilih Rw"
                margin="dense"
                name="id_rw"
                onChange={handleChangeRw}
                select

                value={rowSelect.id_rw}
                variant="outlined"
              >
                {getRw.map((option)=> (
                  <option
                    key={option.id_rw}
                    value={option.id_rw}
                  >
                    {option.nama_rw}
                  </option>
                ))}

              </TextField>

            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >

            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >

              <TextField
                fullWidth
                label="Pilih Rt"
                margin="dense"
                name="id_rt"
                onChange={handleChange}
                select

                value={rowSelect.id_rt}
                variant="outlined"
              >
                {getRt.map((option)=> (
                  <option
                    key={option.id_rt}
                    value={option.id_rt}
                  >
                    {option.nama_rt}
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
                label="Pilih Periode Sensus"
                margin="dense"
                name="Periode_Sensus"
                onChange={handleChange}
                select

                value={rowSelect.Periode_Sensus}
                variant="outlined"
              >
               {handling()}

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

UserAccessSurveyModi.propTypes={
  className: PropTypes.string
};

export default UserAccessSurveyModi;