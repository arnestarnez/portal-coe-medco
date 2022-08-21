import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UserSignIn } from 'views';
import validate from 'validate.js';
import '../../assets/css_swal/cssSwal.css';
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

import dataUser from '../../common/datajson/user.json';

//import UsersByDevice from 'views/Dashboard/components/UsersByDevice';
import axios from 'axios';

class MiaDashboard extends React.Component {
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


    this.state.formState.errors=errorsVar    ;

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

   } 
    
  };

    render() {

  
      return (
        <>


        <section class="content-header">
          <h1>&nbsp;</h1>
          <ol class="breadcrumb">
            <li><a href="home.html"><i class="fa fa-home"></i> Home</a></li>
            <li><a href="#">MIA</a></li>
            <li class="active">Dashboard</li>
          </ol>
        </section>

              {/*<!-- Main content -->*/}
        <section class="content">
          <div class="box box-default">
            <div class="box-header with-border">
              <h3 class="box-title"><i class="fa fa-pie-chart"></i> Dashboard</h3>
            </div>
            <div class="clearfix">
              &nbsp;
            </div>

            <div class="box-body">
                <div class="row">
                  <div class="col-lg-3 col-xs-6">
                    {/*<!-- small box -->*/}
                    <div class="small-box bg-aqua">
                      <div class="inner">
                        <h3>50</h3>
                        <p>Submitters</p>
                      </div>
                      <div class="icon">
                        <i class="ion ion-person"></i>
                      </div>
                      <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
                    </div>
                  </div>{/*<!-- ./col -->*/}
                  <div class="col-lg-3 col-xs-6">
                    {/*<!-- small box -->*/}
                    <div class="small-box bg-green">
                      <div class="inner">
                        <h3>43<sup style={{fontSize: '20px'}}>%</sup></h3>
                        <p>Reviewed</p>
                      </div>
                      <div class="icon">
                        <i class="ion ion-pie-graph"></i>
                      </div>
                      <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
                    </div>
                  </div>{/*<!-- ./col -->*/}
                  <div class="col-lg-3 col-xs-6">
                    {/*<!-- small box -->*/}
                    <div class="small-box bg-yellow">
                      <div class="inner">
                        <h3>40</h3>
                        <p>Jugded</p>
                      </div>
                      <div class="icon">
                        <i class="ion ion-document-text-online"></i>
                      </div>
                      <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
                    </div>
                  </div>{/*<!-- ./col -->*/}
                  <div class="col-lg-3 col-xs-6">{/*<!-- small box -->*/}
                    <div class="small-box bg-red">
                      <div class="inner">
                        <h3>8</h3>
                        <p>Award</p>
                      </div>
                      <div class="icon">
                        <i class="ion ion-person-add"></i>
                      </div>
                      <a href="#" class="small-box-footer">More info <i class="fa fa-arrow-circle-right"></i></a>
                    </div>
                  </div>{/*<!-- ./col -->*/}
                </div>
              </div> {/*<!-- ./box -->*/}
          </div>{/*<!-- ./col -->*/}
          
          
        </section>


        </>
 
        ) 
    }
};


export default MiaDashboard