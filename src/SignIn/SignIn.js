import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UserSignIn } from 'views';
import validate from 'validate.js';
//import mockDataUser from '../UserList/datauser';
//import md5 from 'md5'
//import swal from '@sweetalert/with-react';
import '../../assets/css_swal/cssSwal.css';
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Slider from 'react-slick/lib/slider';
// import { bg_login } from '../../assets/img_master_backup/index'
import Swal from 'sweetalert2';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { Facebook as FacebookIcon, Google as GoogleIcon } from 'icons';
import { urlPostLogin } from '../../kumpulanUrl'
import dataUser from '../../common/datajson/user.json';

//import UsersByDevice from 'views/Dashboard/components/UsersByDevice';
import axios from 'axios';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: '',
      alamat: '',
      formState:{
        isValid: false,
        values: {},
        touched: {},
        errors: {},
        users:dataUser
      },
      schema : {
        user_name: {
          presence: { allowEmpty: false, message: 'is required' },
          //email: true,
          length: {
            maximum: 64
          }
        },
        password: {
          presence: { allowEmpty: false, message: 'is required' },
          length: {
            maximum: 128
          }
        }
      }
  
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);

  }
  
  componentDidMount() {
    const errorsVar = validate(this.state.formState.values, this.state.schema);


    this.state.formState.errors=errorsVar
  }
 
  


  handleChange = event => {
    event.persist();

    let value=event.target.value;
        let name=event.target.name;
    this.setState
    (prevState => ({
      formState:
      {
        ...prevState.formState, 
        values:
        {
          ...prevState.formState.values,
          [name]: value 
        },
        touched:
        {
          ...prevState.formState.touched,
          [event.target.name]: true
        },
        

  
     }

      
     
       
    }),()=>{
      const errorsVar = validate(this.state.formState.values, this.state.schema);
      this.setState
      (prevState => ({
        formState:
        {
          ...prevState.formState, 
          errors:
          {
            ...prevState.formState.errors,
            'errors': errorsVar 
          }, 
          isValid:
          {
            ...prevState.formState.isValid,
            'isValid': errorsVar ? false : true, 
          }
          
          
        }
      }))

      //alert("hhhh");
    });


  };
  settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }

  handleSignIn = event => {
    //event.preventDefault();
    //
    event.preventDefault();
    let users4 = this.state.formState.users.find(user => user.user === this.state.formState.values.user_name
      && user.password === this.state.formState.values.password);
   //console.log("users4",users4)
   if(!users4) 
   {
    const errorsVar = validate(this.state.formState.values, this.state.schema);

    this.setState
    (prevState => ({
      formState:
      {
        ...prevState.formState, 
        values:
        {
          ...prevState.formState.values,
          user_name: '',
          password: '' 
        },
        errors:
        {
          ...prevState.formState.errors,
          'errors': {} 
        }, 
        isValid:
        {
          ...prevState.formState.isValid,
          'isValid':  false, 
        }
  
      }
    }))
   Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Login Tidak Sesuai  ',
      showConfirmButton: false,
      timer: 1000
    })

   }
    else 
   {
    //localStorage.setItem('Alat Kontrasepsi', JSON.stringify(data.alatKB));
    //swindow.location = '/beranda';
    const history  = this.props.history;

    localStorage.setItem('token', users4.user + users4.password);
    localStorage.setItem('level', users4.level);
    localStorage.setItem('username', users4.username);
    localStorage.setItem('job', users4.job);
    localStorage.setItem('dept', users4.dept);
    localStorage.setItem('name', users4.name);
    this.props.history.push('/home');


    history.push('/home');

   } 
    
  };

    render() {

  
      return (
        <>
        <div className="login-box-body">
        <p className="login-box-msg">Sign in to start your session</p>
        <form
    //    className={classes.form}
        onSubmit={this.handleSignIn}
      >

             <div className="form-group has-feedback">
                <input name="user_name" type="text" className="form-control" placeholder="Username"
                onChange={ this.handleChange}
                value={this.state.formState.values.user_name}
                />
                <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
              </div>
              <div className="form-group has-feedback">
                <input name="password" type="password" className="form-control" 
                value={this.state.formState.values.password}
                placeholder="Password"
                onChange={ this.handleChange}/>
                <span className="glyphicon glyphicon-lock form-control-feedback"></span>
              </div>
              <div className="row">
                <div className="col-xs-8">
                  <div className="checkbox icheck">
                    <label>
                      <input type="checkbox"/> Remember Me
                    </label>
                  </div>
                </div>{
                  /*<!-- /.col -->*/
                  }
                <div className="col-xs-4">
                  <button type="submit" 
                  className="btn btn-primary btn-block btn-flat"
                  disabled={!this.state.formState.isValid}
                  >Sign In</button>
                </div>
                
          </div>



        </form>
        </div>


        </>
 
        ) 
    }
};


export default SignIn