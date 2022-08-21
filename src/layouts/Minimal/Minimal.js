import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { ImportScript } from '../Main/components';
/*import '../../../src/assets/vendor/bootstrap/css/bootstrap.min.css';
import '../../../src/assets/vendor/dist/font-awesome-4.1.0/css/font-awesome.css';
import '../../../src/assets/vendor/dist/css/AdminLTE.min.css';
import '../../../src/assets/vendor/plugins/iCheck/square/blue.css';
import '../../../src/assets/vendor/dist/css/custom.css';
*/// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import '../../../src/plugins/iCheck/square/blue.css';
import { Carousel } from 'react-responsive-carousel';
import Slider from "react-slick";
import { MinimalUser } from 'layouts';
//import { bg_login } from 'assets/img_master_backup';
// import "animate.css"
import {Animated} from "react-animated-css";

const useStyles=makeStyles(() => ({
  root: {
    //    paddingTop: 64,
    //    height: '100%'
  },
  content: {
    height: '100%'
  }
}));

const Minimal=props => {
  const { children }=props;

  const classes=useStyles();
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
  return (
    <Animated    animationIn="fadeInUp" animationOut="fadeOut" isVisible={true}>

<div className="login-box"   >
      <div className="login-logo"
      >
        <img src="/assets/img/logo-5.png" style={{marginLeft:'40%'}}/>
        
               <a href="index.html"><b>Medco</b> Center of Excellence</a>
      </div>
      
      {/* <!-- /.login-logo -->*/}

      <main >
          {children}
        </main>

      { ImportScript("/assets/js/changebodyMin.js")
      }

      {ImportScript("/plugins/iCheck/icheck.min.js")}

      {
        ImportScript("/assets/js/inputChecked.js")
      }
      
    </div>

    </Animated>


  );
};

Minimal.propTypes={
  children: PropTypes.node,
  className: PropTypes.string
};

export default Minimal;
