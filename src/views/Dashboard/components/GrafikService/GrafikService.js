import React, { useState } from 'react';
import { defaults, Doughnut, Pie, Bar } from 'react-chartjs-2';


import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import useWindowSize from "./get-window-side-hot-refresh";

import { makeStyles, useTheme } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Divider,
  Typography
} from '@material-ui/core';
/*import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import RefreshIcon from '@material-ui/icons/Refresh';
import TabletMacIcon from '@material-ui/icons/TabletMac';
*/
import RoundedCornerIcon from '@material-ui/icons/RoundedCorner';
const isClient=typeof window==='object';
defaults.global.legend.display=false;

function getSize() {
  return {
    width: isClient? window.innerWidth:undefined,
    height: isClient? window.innerHeight:undefined
  };
}
function getPie(dataPrm, optionsPrm, windowSizePrm) {
  return (

    <Pie
      data={dataPrm}
      option={optionsPrm}
      width="50%"

      height={windowSizePrm.width<=780? 75:15+"%"}
    />

  )
}




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

    color: 'black',
  }
}));
//const size=useWindowSize();
const GrafikService=props => {
  const { className, listAccessMenuMobile, ...rest }=props;

  const classes=useStyles();
  const theme=useTheme();
  const [windowSize, setWindowSize]=useState(getSize);

  function handleResize() {
    setWindowSize(getSize());
    getPie(data, options, windowSize)
  }
  //console.log(listAccessMenuMobile);

  const data={
    datasets: [
      {
        //data: [23, 16, 13, 26, 23],
        data: [],
        backgroundColor: [

          '#C62828',//red
          '#1565c0',//blue
          '#EF6C00',//yellow
          '#2E7D32',//green
          '#00838F'//black
        ],
        borderWidth: 8,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white
      }
    ],
    labels: []
    //labels: ['Berita', 'Anggaran', 'Postur', 'Komentar', "Cari Anggaran"]
  };

  //console.log("listAccessMenuMobile", listAccessMenuMobile)
  const options={
    legend: {
      display: false,
      reverse: false,
      labels: {
        fontColor: 'red'
      }
    },
    responsive: false,
    maintainAspectRatio: false,
    animation: true,
    cutoutPercentage: 100,
    rotation: 0,
    layout: { padding: 0 },
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: true,
      borderWidth: 0,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.white,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary
    }
  };

  const devices=[];
  //alert(data.labels[0])
  /**/
  /* */
  let total=0;
  for (var i=0; i<listAccessMenuMobile.length/*data.datasets[0].data.length*//**/; i++) {
    total=total+listAccessMenuMobile[i].totalAccessMenu
  }


  for (var i=0; i<listAccessMenuMobile.length/*data.datasets[0].data.length*//**/; i++) {
    //alert(data.datasets[0].backgroundColor[i])
    //text+=cars[i]+"<br>";
    ///    alert(data.labels[i])
    /* */
    //console.log("data.datasets.data", data.datasets[0].data)
    data.datasets[0].data.push(listAccessMenuMobile[i].totalAccessMenu)
    data.labels.push(listAccessMenuMobile[i].accessMenu)

    devices.push(
      {
        'title': listAccessMenuMobile[i].accessMenu,//data.labels[i],
        'value': (listAccessMenuMobile[i].totalAccessMenu/total*100).toFixed(2),//data.datasets[0].data[i],
        'color': data.datasets[0].backgroundColor[i],

      }

    )
  }/**/
  /**/
  /*
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
      title: 'Cari Anggaran',
      value: '23',
      color: 'black'
    }
  ];*/

  window.addEventListener('resize', handleResize);
  //var wid=windowSize.width

  return (
    <Card
      {...rest}
      //className={clsx(classes.root, className)}
      style={{ color: 'red', bodyFontColor: 'red' }
      }
    >
      <CardHeader
        title="Akses Menu"
        style={{ backgroundColor: 'white', color: 'red', bodyFontColor: 'red' }}
        classes={{
          title: classes.title,
        }}
      />
      {getPie(data, options, windowSize)}
      <Divider />
      <CardContent>


        <div className={classes.stats}>
          <div
            className={classes.device}
          //key={device.title}
          >

            <Grid
              container
              spacing={3}
            >

              {devices.map((device, i) => (
                <Grid
                  item
                  md={6}
                  xs={6}
                >

                  <Typography variant="body1">
                    <RoundedCornerIcon style={{ background: device.color, color: 'white' }} />

                    <span className={classes.deviceIcon}
                      style={{
                        color: 'device.color', paddingTop: '-10', marginTop: '0%',
                        paddingBottom: '0px',// fontWeight: 'bold'
                      }}>
                      &nbsp;{device.title} {device.value}%
                    </span>

                  </Typography>

                </Grid>





              ))}
            </Grid>
          </div>
        </div>


      </CardContent>
    </Card>
  );
};

GrafikService.propTypes={
  className: PropTypes.string
};

export default GrafikService;
