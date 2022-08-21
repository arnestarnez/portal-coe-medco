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
import { urlAddRt, urlEditRt, urlRt, urlRw, urlKel, urlKec, urlKab, urlProv, urlShowKab, urlShowKec, urlShowKel, urlShowRw } from '../../../../kumpulanUrl';
//import { Map, TileLayer, Marker, Popup, Tooltip } from 'components/LeafletComponent'
import validate from 'validate.js';
import { isArrayLiteralExpression, createTypeAliasDeclaration } from 'typescript';
import Swal from 'sweetalert2'

const schema={
  KodeRT: {
    presence: { allowEmpty: false, message: 'harus diisi' },
    //email: true,
    length: {
      maximum: 200
    }
  },
  nama_rt: {
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

const RtAddModi=props => {
  const { className, setData, getDataBackend, setRowSelect, rowSelect, title, ...rest }=props;

  const classes=useStyles();

  const [values, setValues]=useState({});
  const [getStatus, setStatus]=useState([]);
  const [getKeyId, setKeyId]=useState([]);
  const [rw, setRw]=useState([]);
  const [kabupaten, setKabupaten] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [provinsi, setProvinsi] = useState([]);
  const [kel, setKel]=useState([]);

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
        setKabupaten(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        //
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
        // console.log('kecamatan =', data.data)
        setKecamatan(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        //
        setKecamatan([]);
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
      
        setProvinsi([]);
        //this.setState({ ...this.state, isFetching: false });
      });
  }

  async function getRw() {
    /* */
    const requestOptions={
      method: 'get',
      //mode: "cors",
      headers: { 'Content-Type': 'application/json' },
    };

    let url=urlRw
    // eslint-disable-next-line no-useless-concat
    const response=await fetch(url, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data=resJson;
        setRw(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);

        setRw([]);
        //this.setState({ ...this.state, isFetching: false });
      });
  }
  ///  const mapRef=createRef();

  useEffect(() => {
    getProv();
    showKab(rowSelect.id_provinsi);
    showKecamatan(rowSelect.id_kabupaten);
    showKel(rowSelect.id_kecamatan);
    showRw(rowSelect.id_kelurahan);

    const errors=validate(rowSelect, schema);
    // console.log(errors)
    // console.log("rowSelect", rowSelect)
    // console.log("schema", schema)

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
    let url=urlAddRt;
    let varJson = {
      "KodeRT": rowSelect.KodeRT,
      "id_rt": rowSelect.id_rt,
      "nama_rt": rowSelect.nama_rt,
      "id_rw": rowSelect.id_rw,
      "id_kelurahan": rowSelect.id_kelurahan,
      "id_kecamatan": rowSelect.id_kecamatan,
      "id_kabupaten": rowSelect.id_kabupaten,
      "id_provinsi": rowSelect.id_provinsi,
      "IsActive": rowSelect.IsActive,

    }
    if (rowSelect.id_rt===undefined) {
      url=urlAddRt;
      varJson.CreatedBy = userName
      varJson.LastModifiedBy = userName
    } else {
      url=urlEditRt;
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
    };

    const response=fetch(url, requestOptions)
    .then(tester => {
      return tester.json();
    })/**/

    .then(tester => {
      // console.log(tester)
      // alert(tester.message)
      getDataBackend();
      if (url == urlAddRt) {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Sukses Menambah Data',
          showConfirmButton: false,
          timer: 1000
        })
      }if(url == urlEditRt){
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Sukses Memperbarui Data',
          showConfirmButton: false,
          timer: 1000
        })
      }
      then(
        handleClose()
        )
      // alert("Sukses")
      const data=tester;
    })
      .catch((e) => {

        swal("Gagal Login!", "Gagal Login", "error", null, '200x200')

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
          title={rowSelect.id_rt == undefined ? "Tambah Rt" : "Ubah Rt"}
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
                label="Pilih Kelurahan"
                margin="dense"
                name="id_kelurahan"
                onChange={handleChangeKelurahan}
                select

                value={rowSelect.id_kelurahan}
                variant="outlined"
              >
                {kel.map((option)=> (
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
                onChange={handleChange}
                select

                value={rowSelect.id_rw}
                variant="outlined"
              >
                {rw.map((option)=> (
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
                value={rowSelect&&rowSelect.IsActive? rowSelect.IsActive:''}
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

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Kode RT"
                margin="dense"
                name="KodeRT"
                onChange={handleChange}
                helperText={
                  hasError('KodeRT')? formState.errors.KodeRT[0]:null
                }

                error={hasError('KodeRT')}
                defaultValue={rowSelect&&rowSelect.KodeRT? rowSelect.KodeRT:''}
                variant="outlined"
                type="number"
              />
            </Grid>
            

            <Grid
              item
              md={6}
              xs={12}
            >

              <TextField
                fullWidth
                label="Nama RT"
                margin="dense"
                name="nama_rt"
                onChange={handleChange}
                helperText={
                  hasError('nama_rt')? formState.errors.nama_rt[0]:null
                }

                error={hasError('nama_rt')}

                defaultValue={rowSelect&&rowSelect.nama_rt? rowSelect.nama_rt:''}
                variant="outlined"
              />
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

RtAddModi.propTypes={
  className: PropTypes.string
};

export default RtAddModi;
