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
import { urlLaporanPerProv, urlLaporanProv, urlProv  } from '../../../../kumpulanUrl';
//import { Map, TileLayer, Marker, Popup, Tooltip } from 'components/LeafletComponent'
import validate, { async } from 'validate.js';
import { isArrayLiteralExpression, createTypeAliasDeclaration } from 'typescript';

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

const ComboProv = props => {
    const { className, setData, getDataBackend, setRowSelect, rowSelect, title, ...rest } = props;

    const classes = useStyles();

    const [values, setValues] = useState({});
    const [getStatus, setStatus] = useState([]);
    const [kabupaten, setKabupaten] = useState([]);
    const [prov, setProv] = useState([]);
    const [getKeyId, setKeyId] = useState([]);

    const [formState, setFormState] = useState({
        isValid: false,
        values: {},
        touched: {},
        errors: {}
    });
    ///  const mapRef=createRef();
    async function getProv() {
        /* */
        const requestOptions={
          method: 'get',
          //mode: "cors",
          headers: { 'Content-Type': 'application/json' },
        };
    
        let url=urlProv
        // eslint-disable-next-line no-useless-concat
        const response=await fetch(url, requestOptions)
          .then(res => {
            return res.json();
          })
    
          .then(resJson => {
            const data=resJson;
            setProv(data.data);
            //return false;
          })
          .catch(e => {
            //console.log(e);
            alert("Nextwork Error");
            setProv([]);
            //this.setState({ ...this.state, isFetching: false });
          });
      }

    // async function showKab(id_provinsi) {
    //     /* */
    //     const requestOptions={
    //       method: 'POST',
    //     //   mode: "cors",
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({
    //           'id_provinsi': id_provinsi
    //       })
    //     };
    
    //     let url=urlLaporanPerProv
    //     // eslint-disable-next-line no-useless-concat
    //     const response=await fetch(url, requestOptions)
    //       .then(res => {
    //         return res.json();
    //       })
    
    //       .then(resJson => {
    //         const data=resJson;
    //         setKabupaten(data.data);
    //         //return false;
    //       })
    //       .catch(e => {
    //         //console.log(e);
    //         alert("Nextwork Error");
    //         setKabupaten([]);
    //         //this.setState({ ...this.state, isFetching: false });
    //       });
    //   }


    useEffect(() => {
        getProv()
        const errors = validate(rowSelect);
        // console.log(errors)
        // console.log("rowSelect", rowSelect)

        setFormState(formState => ({
            ...rowSelect,
            isValid: errors ? false : true,
            errors: errors || {}
        }));
        // console.log("formState", formState)


        //   alert(setOpen)
    }, [rowSelect]); // passing an empty array as second argument triggers the callback in useEffect only after the initial render thus replicating `componentDidMount` lifecycle behaviour


    const handleChange = event => {

        //    event.persist();

        const errors = validate(rowSelect);

        setFormState(formState => ({
            ...rowSelect,
            isValid: errors ? false : true,
            errors: errors || {}
        }));


        setRowSelect({
            ...rowSelect,
            [event.target.name]: event.target.value
        });

        let nama = event.target.name.replace("id","nama")
        if (event.target.name == "id_provinsi") {
          setRowSelect({
            ...rowSelect,
             [nama]:pencarian(prov,event.target.value),
             [event.target.name]: event.target.value,
          });
        //   console.log("Ket Provinsi =", prov)
        }
    }

    // const handleChangeProvinsi=(event)=> {
    //     handleChange(event)
    //     showKab(event.target.value)
    // }

    const handleCari = () => {   
        getDataBackend(rowSelect)
        // console.log('rs',rowSelect)
    }

    //  const position=[currentLocation.lat, currentLocation.lng]
    const hasError = field => {
        return formState && formState.errors && formState.errors[field] ? true : false;
    }

    const pencarian = (paramKab, id_prov) => {
        let value = id_prov
        let result = [];
        result = paramKab.filter((entry) => {
          return entry&&entry.id_provinsi &&(entry.id_provinsi === value) 
        });
        // console.log("result =",result[0].nama_provinsi)
        return result[0].nama_provinsi
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
                    title="Pilih Provinsi"
                />
                <Divider />
                <CardContent>

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
                                onChange={handleChange}
                                //required
                                select
                                // eslint-disable-next-line react/jsx-sort-props
                                //SelectProps={{ native: true }}

                                //defaultValue={rowSelect.IsActive}
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

                    </Grid>
                </CardContent>
                <Divider />
                <CardActions>
                    {!formState.isValid}
                    <Button
                        color="primary"
                        className={classes.buttonSuccess}
                        variant="contained"
                        onClick={handleCari}
                        disabled={!formState.isValid}

                    >
                        Search
                    </Button>
                </CardActions>
            </form>
        </Card>
    );
};

ComboProv.propTypes = {
    className: PropTypes.string,
};

export default ComboProv;