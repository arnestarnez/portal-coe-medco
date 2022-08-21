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
  TextField,

} from '@material-ui/core';
import L from 'leaflet';
import axios from 'axios';
import { urlAddKec, urlEditKec, urlKab, urlProv, urlShowKab, urlLaporanPerKab } from '../../../../kumpulanUrl';
//import { Map, TileLayer, Marker, Popup, Tooltip } from 'components/LeafletComponent'
import validate from 'validate.js';
import { isArrayLiteralExpression, createTypeAliasDeclaration } from 'typescript';
const schema = {


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

const PerKabupatenSearchModi = props => {
  const { className, setData, getDataBackend, setRowSelect, rowSelect, title, setKab, ...rest } = props;

  const classes = useStyles();

  const [values, setValues] = useState({});
  const [getStatus, setStatus] = useState([]);
  const [getKeyId, setKeyId] = useState([]);
  const [perKabupaten, setPerKabupaten] = useState([]);
  const [kabupaten, setKabupaten] = useState([]);
  const [prov, setProv] = useState([]);

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

  async function showKab(id_provinsi) {
    /* */
    const requestOptions = {
      method: 'POST',
      //mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "id_provinsi": id_provinsi,
      })
    };
// Menggunakan ShowKab Biasa
    let urlShow = urlShowKab
    // eslint-disable-next-line no-useless-concat
    const response = await fetch(urlShow, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data = resJson;
        // console.log('kabupaten =', data.data)
        setKab(data.data);
        setKabupaten(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        // alert("err");
        setKab([]);
        setKabupaten([]);
        //this.setState({ ...this.state, isFetching: false });
      });
  }

  async function showPerKab(id_kabupaten) {
    /* */
    const requestOptions = {
      method: 'POST',
      //mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "id_kabupaten": id_kabupaten,
      })
    };

    let urlShow = urlLaporanPerKab
    // eslint-disable-next-line no-useless-concat
    const response = await fetch(urlShow, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data = resJson;
        // console.log('kabupaten =', data.data)
        setPerKabupaten(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        // alert("err");
        setPerKabupaten([]);
        //this.setState({ ...this.state, isFetching: false });
      });
  }

  async function getKab() {
    /* */
    const requestOptions = {
      method: 'get',
      //mode: "cors",
      headers: { 'Content-Type': 'application/json' },
    };

    let urlGetKabAll = urlKab
    // eslint-disable-next-line no-useless-concat
    const response = await fetch(urlGetKabAll, requestOptions)
      .then(res => {
        return res.json();
      })

      .then(resJson => {
        const data = resJson;
        setPerKabupaten(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        // alert("Nextwork Error");
        setPerKabupaten([]);
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
        setProv(data.data);
        //return false;
      })
      .catch(e => {
        //console.log(e);
        // alert("Nextwork Error");
        setProv([]);
        //this.setState({ ...this.state, isFetching: false });
      });
  }


  ///  const mapRef=createRef();

  useEffect(() => {
    // getKab()  
    getProv()
    /*
    if (rowSelect.IsActive==='1') {
      rowSelect.status='Active'
    } else if (rowSelect.status==='0') {
      rowSelect.status='Non Activw'
    }*/
    const errors = validate(rowSelect, schema);

    setFormState(formState => ({
      ...rowSelect,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
    // console.log("formState", formState)


    //   alert(setOpen)
  }, [rowSelect]); // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour

  const handleChangeProvinsi = event => {
    handleChange(event)
    showKab(event.target.value)
  }

  const handleChange = event => {

    //    event.persist();

    // const errors=validate(rowSelect, schema);


    setFormState(formState => ({
      ...rowSelect,
      // isValid: errors? false:true,
      // errors: errors||{}
    }));
    setRowSelect({
      ...rowSelect,
      [event.target.name]: event.target.value
    });
    let nama = event.target.name.replace("id","nama")
    if (event.target.name == "id_kabupaten") {
      setRowSelect({
        ...rowSelect,
         [nama]:pencarian(kabupaten,event.target.value),
         [event.target.name]: event.target.value,
      });
      // console.log("Ket Kabupaten =", kabupaten)
    }
  }


  const handleClose = () => {
    getDataBackend();
  }

  const handleSave = (event) => {
    getDataBackend(rowSelect)
  }


  const pencarian = (paramKab, id_kab) => {
    let value = id_kab
    let result = [];
    // alert(value)
    result = paramKab.filter((entry) => {
      return entry&&entry.id_kabupaten &&(entry.id_kabupaten === value) 
    });
    // console.log("result =",result[0].nama_kabupaten)
    // alert("result = " + result[0].nama_kabupaten)
    return result[0].nama_kabupaten
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
          title="Search Wilayah"
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
                select
                value={rowSelect.id_provinsi}
                variant="outlined"
              >
                {prov.map(option => (
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
                onChange={handleChange}
                select
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
            Search
          </Button>

        </CardActions>
      </form>
    </Card>
  );
};

PerKabupatenSearchModi.propTypes = {
  className: PropTypes.string
};

export default PerKabupatenSearchModi;
