import React, { createRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { urlGetSetting, urlShowKab, urlshowKKPerprov, urlShowTargetKk, urlShowTargetKkPerProv } from '../../../../kumpulanUrl'
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
import { LapPeriode } from 'components';

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


const LaporanTargetSearch = props => {
  const { className, textfind, onChange, style, rowSelect, setRowSelect, getDataBackend, ...rest } = props;
  const classes = useStyles();
  const schema = {
    id_kabupaten: {
      presence: { allowEmpty: false, message: 'harus diisi' },
    },
  };

  const [kab, setKab] = useState([])
  const [prov, setProv] = useState([])
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  async function showTargetKkPerProv(Periode_Sensus) {
    /* */
    const requestOptions = {
      method: 'POST',
      mode: "cors",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "Periode_Sensus": Periode_Sensus,
      })
    };

    let urlShow = urlshowKKPerprov
    // eslint-disable-next-line no-useless-concat
    const response = await fetch(urlShow, requestOptions)
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
        //return false;
      })
      .catch(e => {
        //console.log(e);
        setKab([]);
        //this.setState({ ...this.state, isFetching: false });
      });
  }


  useEffect(() => {
    const errors = validate(rowSelect, schema);

    setFormState(formState => ({
      ...rowSelect,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
    // console.log("formState", formState)


    //   alert(setOpen)
  }, [rowSelect]);

  const handleSave = () => {
    getDataBackend(rowSelect)
    // console.log(rowSelect.Periode_Sensus)
  }

  const hasError = field => {
    return formState && formState.errors && formState.errors[field] ? true : false;
  }

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

    let nama = event.target.name.replace("id", "nama")
    if (event.target.name == "id_kabupaten") {
      setRowSelect({
        ...rowSelect,
        [nama]: pencarian(kab, event.target.value),
        [event.target.name]: event.target.value,
      });
      // console.log("Ket kecamatan =", kecamatan)
    }
  }

  const handleChange2 = event => {
    handleChange(event)
    showTargetKkPerProv(event.target.value)
  }

  const handleChange3 = event => {
    handleChange(event)
    showKab(event.target.value)
  }

  const pencarian = (paramKab, id_kab) => {
    let value = id_kab
    let result = [];
    // alert(value)
    result = paramKab.filter((entry) => {
      return entry && entry.id_kabupaten && (entry.id_kabupaten === value)
    });
    // console.log("result =", result[0].nama_kabupaten)
    // alert("result = " + result[0].nama_kecamatan)
    return result[0].nama_kabupaten
  }

  const handling = () => {
    {
      var tmp = [];
      // alert(tmp) 
      // alert( localStorage.getItem("Periode Sensus") - 5 )
      var periode_sensus = localStorage.getItem("Periode Sensus");
      for (var option = periode_sensus; option >= periode_sensus - 5; option--) { tmp.push({ "option": option }); }
      console.log('temp =', tmp)
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
          title="Search Laporan Sensus"
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
              <LapPeriode
                onChange={handleChange2}
                rowSelect={rowSelect} />


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
                onChange={handleChange3}
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
                {kab.map(option => (
                  <option
                    key={option.id_kabupaten}
                    value={option.id_kabupaten}
                  >
                    {option.nama_kabupaten}
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
            Search
          </Button>

        </CardActions>
      </form>
    </Card>
  );
};

LaporanTargetSearch.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object
};

export default LaporanTargetSearch;
