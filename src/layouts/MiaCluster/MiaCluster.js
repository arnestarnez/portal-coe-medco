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

class MiaCluster extends React.Component {
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
          <h1>&nbsp; </h1>
          <ol class="breadcrumb">
            <li><a href="home.html"><i class="fa fa-home"></i> Home</a></li>
            <li><a href="#">MIA</a></li>
            <li class="active"> Clustering</li>
          </ol>
        </section>

        {/*<!-- Main content -->*/}
        <section class="content">
          <div class="box box-default">
            <div class="box-header with-border">
              <h3 class="box-title"><i class="fa fa-spinner"></i> CLUSTERING</h3>
            </div>
            <div class="clearfix">&nbsp;</div>
            <div class="row">
              <div class="col-md-12" style={{padding: '2px 0', backgroundColor: '#f0f0f0'}}>
                <div class="col-md-1">Filter:</div>
                <div class="col-md-1"><span class="form-group">
                    <select name="select13" class="form-control" style={{height:'24px', padding:0}}>
                      <option selected>Novelty</option>
                      <option>New</option>
                      <option>Improve Existing</option>
                    </select>
                  </span>
                </div>
                <div class="col-md-2"><span class="form-group">
                    <select name="select13" class="form-control" style={{height:'24px', padding:0}}>
                      <option selected>Impact Value</option>
                      <option>ROI</option>
                      <option>Cost Saving</option>
                      <option>HSE</option>
                    </select>
                  </span>
                </div>
                <div class="col-md-3"><span class="form-group">
                    <select name="select13" class="form-control" style={{height:'24px', padding:0}}>
                      <option selected>Application Boundary</option>
                      <option>Facility</option>
                      <option>System</option>
                      <option>Sub System</option>
                      <option>Equipment</option>
                      <option>Sub Equipment</option>
                      <option>Component</option>
                      <option>Part</option>
                      <option>Other</option>
                    </select>
                  </span>
                </div>
                <div class="col-md-2"><span class="form-group">
                    <select name="select13" class="form-control" style={{height:'24px', padding:0}}>
                      <option selected>Change Level</option>
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High/Radical</option>
                    </select>
                  </span>
                </div>
                <div class="col-md-1"><span class="form-group">
                    <select name="select13" class="form-control" style={{height:'24px', padding:0}}>
                      <option selected>Cluster</option>
                      <option>A</option>
                      <option>B</option>
                      <option>C</option>
                    </select>
                  </span>
                </div>
                <div class="col-md-1"><span class="form-group">
                    <button type="submit" class="btn btn-success btn-xs">GO </button></span>
                </div>
              </div>
            </div>

            <div class="box-body table-responsive no-padding">
              <table class="table table-striped">
                <tr>
                  <th width="21" style={{width: '10px'}}><input type="checkbox" name="checkbox" id="checkbox"/>
                    <label for="checkbox"> </label></th>
                  <th width="30" style={{width: '10px'}}>ID</th>
                  <th width="137">Full Name</th>
                  <th width="446">Title</th>
                  <th width="49">Cluster</th>
                  <th width="80">Gate 1</th>
                  <th width="69" style={{width: '40px'}}>Assign Reviewer</th>
                  <th width="72" style={{width: '40px'}}>Assign Criteria</th>
                </tr>
                <tr>
                  <td><span style={{width: '10px'}}>
                    <input type="checkbox" name="checkbox2" id="checkbox2"/>
                  </span></td>
                  <td>0001</td>
                  <td>Agus Pambudi</td>
                  <td>Pemanfaatan Batubara Menjadi Karbon Aktif Dengan Proses Karbonisasi dan Aktivais Menggunakan
                    Reagen Asam Fosfat (H3PO4) dan Ammonium Bikarbonat</td>
                  <td>&nbsp;</td>
                  <td><span class="form-group">
                      <select name="select" class="form-control" style={{height:'24px', fontSize: 'small',padding:0}}>
                        <option selected>Gate 1</option>
                        <option>Passed</option>
                        <option>Retained</option>
                      </select>
                    </span></td>
                  <td><span class="form-group">
                      <select name="select2" class="form-control" style={{height:'24px', fontSize: 'small', padding:0}}>
                        <option selected>Team</option>
                        <option>Team 1</option>
                        <option>Team 2</option>
                      </select>
                    </span><span class="form-group">
                      <select name="select3" class="form-control" style={{height:'24px', fontSize: 'small', padding:0}}>
                        <option selected>Head</option>
                        <option>Didik</option>
                        <option>Alief</option>
                        <option>Gugun</option>
                        <option>Faisal</option>
                      </select>
                    </span><span class="form-group">
                      <select name="select3" class="form-control" style={{height:'24px', fontSize: 'small', padding:0}}>
                        <option selected>Member</option>
                        <option>Didik</option>
                        <option>Alief</option>
                        <option>Gugun</option>
                        <option>Faisal</option>
                      </select>
                    </span></td>
                  <td><span class="form-group">
                      <select name="select4" class="form-control" style={{height:'24px', fontSize: 'small', padding:0}}>
                        <option selected>Criteria</option>
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                      </select>
                    </span></td>
                </tr>
                <tr>
                  <td><span style={{width: '10px'}}>
                    <input type="checkbox" name="checkbox3" id="checkbox3"/>
                  </span></td>
                  <td>0002</td>
                  <td>Budi Rachmat</td>
                  <td>Prospek Penggunaan Teknologi Benih untuk Pembangkit Listrik dengan Bahan Bakar Batubara di
                    Indonesia</td>
                  <td>&nbsp;</td>
                  <td><span class="form-group">
                      <select name="select" class="form-control" style={{height:'24px', fontSize: 'small', padding:0}}>
                        <option selected>Gate 1</option>
                        <option>Passed</option>
                        <option>Retained</option>
                      </select>
                    </span></td>
                  <td><span class="form-group">
                      <select name="select5" class="form-control" style={{height:'24px', 
                      fontSize: 'small', padding:0}}>
                        <option selected>Team</option>
                        <option>Team 1</option>
                        <option>Team 2</option>
                      </select>
                    </span><span class="form-group">
                      <select name="select5" class="form-control" style={{height:'24px', fontSize: 'small', 
                      padding:0}}>
                        <option selected>Head</option>
                        <option>Didik</option>
                        <option>Alief</option>
                        <option>Gugun</option>
                        <option>Faisal</option>
                      </select>
                    </span><span class="form-group">
                      <select name="select5" class="form-control" style={{height:'24px', fontSize: 'small', 
                      padding:0}}>
                        <option selected>Member</option>
                        <option>Didik</option>
                        <option>Alief</option>
                        <option>Gugun</option>
                        <option>Faisal</option>
                      </select>
                    </span></td>
                  <td><span class="form-group">
                      <select name="select6" class="form-control" style={{height:'24px', fontSize: 'small', 
                      padding:0}}>
                        <option selected>Criteria</option>
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                      </select>
                    </span></td>
                </tr>
                <tr>
                  <td><span style={{width: '10p'}}>
                    <input type="checkbox" name="checkbox4" id="checkbox4"/>
                  </span></td>
                  <td>0003</td>
                  <td>Ahmad Munthohar</td>
                  <td>Menyongsong Transformasi Digital dalam Menghadapi Era Industri 4.0</td>
                  <td>&nbsp;</td>
                  <td><span class="form-group">
                      <select name="select9" class="form-control" style={{height:'24px', fontSize: 'small',padding:0}}>
                        <option selected>Gate 1</option>
                        <option>Passed</option>
                        <option>Retained</option>
                      </select>
                    </span></td>
                  <td><span class="form-group">
                      <select name="select8" class="form-control" style={{height:'24px', fontSize: 'small', padding:0}}>
                        <option selected>Team</option>
                        <option>Team 1</option>
                        <option>Team 2</option>
                      </select>
                    </span><span class="form-group">
                      <select name="select8" class="form-control" style={{height:'24px', fontSize: 'small', padding:0}}>
                        <option selected>Head</option>
                        <option>Didik</option>
                        <option>Alief</option>
                        <option>Gugun</option>
                        <option>Faisal</option>
                      </select>
                    </span><span class="form-group">
                      <select name="select8" class="form-control" style={{height:'24px', fontSize: 'small', padding:0}}>
                        <option selected>Member</option>
                        <option>Didik</option>
                        <option>Alief</option>
                        <option>Gugun</option>
                        <option>Faisal</option>
                      </select>
                    </span></td>
                  <td><span class="form-group">
                      <select name="select7" class="form-control" style={{height:'24px',fontSize: 'small', 
                      padding:0}}>
                        <option selected>Criteria</option>
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                      </select>
                    </span></td>
                </tr>
                <tr>
                  <td><span style={{width: '10px'}}>
                    <input type="checkbox" name="checkbox5" id="checkbox5"/>
                  </span></td>
                  <td>0004</td>
                  <td>Faisal Kurniawan</td>
                  <td>Strategi Manajemen Perubahan Perusahaan di Era Transformasi Digital</td>
                  <td>&nbsp;</td>
                  <td><span class="form-group">
                      <select name="select10" class="form-control" style={{height:'24px', fontSize: 'small',padding:0}}>
                        <option selected>Gate 1</option>
                        <option>Passed</option>
                        <option>Retained</option>
                      </select>
                    </span></td>
                  <td><span class="form-group">
                      <select name="select11" class="form-control" style={{height:'24px', fontSize: 'small', padding:0}}>
                        <option selected>Team</option>
                        <option>Team 1</option>
                        <option>Team 2</option>
                      </select>
                    </span><span class="form-group">
                      <select name="select11" class="form-control" style={{height:'24px', fontSize: 'small', padding:0}}>
                        <option selected>Head</option>
                        <option>Didik</option>
                        <option>Alief</option>
                        <option>Gugun</option>
                        <option>Faisal</option>
                      </select>
                    </span><span class="form-group">
                      <select name="select11" class="form-control" style={{height:'24px', fontSize: 'small', padding:0}}>
                        <option selected>Member</option>
                        <option>Didik</option>
                        <option>Alief</option>
                        <option>Gugun</option>
                        <option>Faisal</option>
                      </select>
                    </span></td>
                  <td><span class="form-group">
                      <select name="select12" class="form-control" style={{height:'24px', 'fontSize': 'small', padding:0}}>
                        <option selected>Criteria</option>
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                      </select>
                    </span></td>
                </tr>
              </table>
            </div>{/*<!-- /.box-body -->*/}
            <div class="box-footer clearfix">
              <button type="submit" class="btn btn-primary"><i class="fa fa-hourglass-start"></i> Process</button>
              <ul class="pagination pagination-sm no-margin pull-right">
                <li><a href="#">&laquo;</a></li>
                <li><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">&raquo;</a></li>
              </ul>
            </div>

          </div>{/*<!-- /.box -->*/}
        </section>



        </>
 
        ) 
    }
};


export default MiaCluster