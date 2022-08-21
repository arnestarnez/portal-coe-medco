import React from 'react';
import { Doughnut, Pie, Bar } from 'react-chartjs-2';

import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Divider,
  Typography
} from '@material-ui/core';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import RefreshIcon from '@material-ui/icons/Refresh';
import TabletMacIcon from '@material-ui/icons/TabletMac';
import RoundedCornerIcon from '@material-ui/icons/RoundedCorner';
const useStyles=makeStyles(theme => ({
  root: {
    height: '100%',

  },
  chartContainer: {
    position: 'relative',
    height: '100%',
    //width: '900%'
  },
  stats: {
    marginTop: theme.spacing(2),
    //display: 'flex',
    justifyContent: 'center'
  },
  device: {
    textAlign: 'left ',
    padding: theme.spacing(1)
  },
  deviceIcon: {
    color: theme.palette.icon
  },
  title: {
    color: 'white',
  }
}));

const UsersByDevice=props => {
  const { className, ...rest }=props;

  const classes=useStyles();
  const theme=useTheme();

  const data={
    datasets: [
      {
        data: [23, 16, 13, 26, 23],
        backgroundColor: [

          'red',
          'blue',
          'yellow',
          'green',
          'black'
        ],
        borderWidth: 8,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white
      }
    ],
    labels: ['Berita', 'Anggaran', 'Postur', 'Komentar', "Carian Anggaran"]
  };

  const options={
    legend: {
      display: false,
      reverse: true,
      labels: {
        fontColor: 'red'
      }
    },
    responsive: false,
    maintainAspectRatio: true,
    animation: true,
    cutoutPercentage: 50,
    rotation: 0,
    layout: { padding: 0 },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: true,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.white,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary
    }
  };

  const devices=[
    {
      title: 'Berita',
      value: '23',
      color: 'red'
    },
    {
      title: 'Anggaran',
      value: '16',
      color: 'blue'
    },
    {

      title: 'Postur APBN',
      value: '13',
      color: 'yellow'
    },
    {

      title: 'Komentar',
      value: '26',
      color: 'green'
    },
    {
      title: 'Carian Anggaran',
      value: '23',
      color: 'black'
    }
  ];

  return (
    <Card
      {...rest}
      //className={clsx(classes.root, className)}
      style={{ color: 'red', bodyFontColor: 'red' }}
    >
      <CardHeader
        title="Access Menu"
        style={{ backgroundColor: 'blue', color: 'red', bodyFontColor: 'red' }}
        classes={{
          title: classes.title,
        }}
      />
      <Divider />
      <CardContent>


        <Pie
          data={data}
          option={options}
        //styles={{ width: '900%' }}
        />

        <div className={classes.stats}>
          {devices.map(device => (
            <div
              className={classes.device}
              key={device.title}
            >
              <Typography variant="body1">
                <RoundedCornerIcon style={{ background: device.color, color: 'white' }} />

                <span className={classes.deviceIcon}
                  style={{
                    color: 'device.color', paddingTop: '0', marginTop: '0%',
                    paddingBottom: '0px'
                  }}>
                  &nbsp;{device.title} {device.value}%
                    </span>

              </Typography>


            </div>
          ))}
        </div>


      </CardContent>
    </Card>
  );
};

UsersByDevice.propTypes={
  className: PropTypes.string
};

export default UsersByDevice;
