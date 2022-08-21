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
import dataClustering from '../../common/datajson/clustering.json';
import Pagination from '../../../src/components/Pagination';

import dataUser from '../../common/datajson/user.json';

//import UsersByDevice from 'views/Dashboard/components/UsersByDevice';
import axios from 'axios';

class MiaReviewing extends React.Component {
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
      currentPage:1,
      pageSize:15,

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
  
  componentWillMount() {
    if(localStorage.getItem('data'))
    {
      //alert("dsds")
      //alert(localStorage.getItem('data'))
      
      this.state.dataMia= JSON.parse(localStorage.getItem('data')) 
      console.log("dataMia",JSON.parse(localStorage.getItem('data')))

    }else{
      localStorage.setItem('data',  JSON.stringify(this.state.dataMia) );
    }
    
    this.state.datas=this.state.dataMia.filter((data => data.step == 
      "Judging"))
      
      console.log("this.state.datas",this.state.datas)


      this.state.cadData=[... this.state.datas]
      console.log("this.state.dataMia",this.state.dataMia)


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
  setData(dataTable)  {
    const firstPageIndex = (this.state.currentPage - 1) * this.state.pageSize;
    const lastPageIndex = firstPageIndex + this.state.pageSize;
    
   if(dataTable.length!==undefined) 
    {
      
      return dataTable.slice(firstPageIndex, lastPageIndex);
    }else 
    {
      return dataTable
    }
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

   } 
    
  };

    render() {

  
      return (
        <>

{/*<!-- Content Header (Page header) -->*/}
<section class="content-header">
          <h1>&nbsp;</h1>
          <ol class="breadcrumb">
            <li><a href="home.html"><i class="fa fa-home"></i> Home</a></li>
            <li><a href="#">MIA</a></li>
            <li class="active"><i class="fa fa-graduation-cap"></i> Award</li>
          </ol>
        </section>

        {/*<!-- Main content -->*/}
        <section class="content">
          <div class="box box-default">
            <div class="box-header with-border">
              <h3 class="box-title"><i class="fa fa-graduation-cap"></i> Award</h3>
            </div>
            <div class="clearfix">&nbsp;</div>

            <div class="box-body table-responsive no-padding">
              <table class="table with-border">
                <tr>
                  <th width="30" style={{width: '10px'}}>ID</th>
                  <th width="323">Title</th>
                  <th width="127">Submitter</th>
                  <th width="293">A Glance of Innovation</th>
                  <th width="72">Award Winner</th>
                  <th width="67">Awarding</th>
                </tr>
                { 
                  this.state.datas!==undefined?
                this.setData(this.state.datas).map((el,i) =>
                {
                  return(

                <tr>
                  <td>{el.empId}</td>
                  <td>{el.tittle}</td>
                  <td>{el.fullname}</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                  <td>&nbsp;</td>
                </tr>
                                )

                              }):null
                              }
                
              </table>
            </div>{/*<!-- /.box-body -->*/}
            <div class="box-footer clearfix">
              <ul class="pagination pagination-sm no-margin pull-right">
                <li><a href="#">&laquo;</a></li>
                <li><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
                <li><a href="#">&raquo;</a></li>
              </ul>
            </div>

          </div>{/*<!-- /.box -->*/}
        </section>{/*<!-- /.content -->*/}





        </>
 
        ) 
    }
};


export default MiaReviewing