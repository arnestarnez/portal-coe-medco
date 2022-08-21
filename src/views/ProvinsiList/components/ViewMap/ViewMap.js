import React, { useState } from 'react';
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
import { Map, TileLayer, Marker, Popup, Tooltip } from 'components/LeafletComponent'
const useStyles=makeStyles(() => ({
  root: {}
}));

export const pointerIcon=new L.Icon({
  iconUrl: '/assets/mapmarker.svg',
  iconRetinaUrl: '/assets/mapmarker.svg',
  iconAnchor: [5, 15],
  //popupAnchor: [10, 10],
  iconSize: [28, 28],
  //shadowUrl: '/assets/marker-icon-2x.png',
  //shadowSize: [68, 45],
  //shadowAnchor: [20, 42],
})
const ViewMap=props => {
  const { className, datas2, handleClose, rowSelect, title, ...rest }=props;

  const classes=useStyles();

  const [values, setValues]=useState({
    firstName: 'Shen',
    lastName: 'Zhi',
    email: 'shen.zhi@devias.io',
    phone: '',
    state: 'Alabama',
    country: 'USA'
  });


  const [map, setMap]=useState({});
  const [currentLocation, setCurrentLocation]=useState({
    lat: 1.6406296,
    lng: 116.419389,
    zoom: 5,
  });

  /*
    const handleChange=event => {
      setValues({
        ...values,
        [event.target.name]: event.target.value
      });
    };
  */
  const handleMapLoad=map => {
    setMap(map)
  }

  const status=[
    {
      value: 'A',
      label: 'Active'
    },
    {
      value: 'I',
      label: 'Inactive'
    }


  ];

  const position=[currentLocation.lat, currentLocation.lng]
  return (
    <>

      <Card
        {...rest}
        className={clsx(classes.root, className)}
        style={{ height: '100%', width: '100%' }}
      >
        <CardHeader
          subheader=""
          title={title}
        />

        <CardContent className={classes.content} style={{ height: '100%', width: '100%', marginTop: '-1%' }}
        >
          <Map center={position} zoom={currentLocation.zoom}
            style={{ height: '80%' }} >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {datas2.map((headCell) => (
              headCell.latitude!=null? (

                <Marker position={[headCell.latitude, headCell.longitude]} icon={pointerIcon}>
                  <Popup>
                    Propinsi {headCell.nmProvinsi}
                  </Popup>
                  <Tooltip>Propinsi {headCell.nmProvinsi}</Tooltip>
                </Marker>
              ):''
            ))}
          </Map>
          <br />
          <Button color="primary"
            variant="contained"
            onClick={handleClose} >Close</Button>


        </CardContent>
      </Card>
    </>


  );
};

ViewMap.propTypes={
  className: PropTypes.string
};

export default ViewMap;
