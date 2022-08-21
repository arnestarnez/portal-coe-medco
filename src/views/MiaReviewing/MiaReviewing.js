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
import dataClustering from '../../common/datajson/clustering.json';
import Pagination from '../../../src/components/Pagination';

//import UsersByDevice from 'views/Dashboard/components/UsersByDevice';
import axios from 'axios';

class MiaReviewing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: '',
      alamat: '',
      formState:{
        isfaValid: false,
        values: {},
        valuesSearch: {},
        valuesEdit :[],
        
        touched: {},
        errors: {}
      },
      currentPage:1,
      pageSize:15,
      datas:[],
      dataMia:dataClustering,

      resultSearch:[],
      cadData:[],
      loading:0,
      //cluster:'A',
      checkedValue:false,
      
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
    this.handleSearch=this.handleSearch.bind(this)  
    this.handleChange = this.handleChange.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);

  }
  setChecked=(e)=>
  {
    //alert(this.state.datas.length);
    let togger=e.target.checked
    alert(this.state.datas.length)
    for (let loopDatas  = 0; loopDatas < this.state.datas.length; loopDatas++) {
      
      if(this.state.datas.length===1)cb_empId.checked=togger;else cb_empId[loopDatas].checked=togger
      //alert(loopDatas)
    }
    
  
    /*
    for (let loopDatas  = 0; loopDatas < this.state.datas.length; loopDatas++) {
      //console.log(cb_empId);
      
      if(this.state.pageSize!==loopDatas)
      {
        alert(loopDatas)

        cb_empId[loopDatas].checked=togger
  
      }
      // more statements
    }*/
    
       
    //this.state.checkedValue=true//e.target.checked
  }
  valueFrom=(value,name)=>{
 
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
          [name]: true
        },
        
  
  
     }
  
      
     
       
    }),()=>{
      const errorsVar = validate(this.state.formState.values, this.state.schema);
      console.log("formState",this.state.formState)
  
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
  
    
   }
   handleClose=()=>{
    const { history }=this.props;
   
    history.push("/mia/clustering");
   
  }
    
  handleChange = event => {
      event.persist();
      let name=event.target.name
      
      let value=event.target.value
      if(name==="typeNovelty" && value==="New") this.state.pesan=!this.state.pesan
   
      this.valueFrom(value,name)
      
  
    };
    handleSubmit = event => {
    if(localStorage.getItem('data'))
    {
      //alert("Dsdsdss")
      this.state.datas=JSON.parse( localStorage.getItem('data') ) // parse to object if necessary
      
    }else{
      this.state.datas=dataClustering
    }
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    this.state.formState.values.submissiondate=date;
    this.state.formState.values.step="Submission";
    this.state.formState.values.id=dataClustering.length+1//this.state.datas.length+1
    this.state.datas.push(  this.state.formState.values)
    dataClustering.push( this.state.formState.values)
    localStorage.setItem('data', JSON.stringify(this.state.datas) /* JSON.stringify(dataClustering)*/ );
  
    
  
   //  let fileContent = 'I can write';
  ///  fs.writeFileSync('../../common/datajson/clustering.json', JSON.stringify(this.state.datas));
     
  
     //const writeFileP = require("write-file-p");
   
     /*
     const saveFile= (saveLocation,data,encoding='utf8')=> {
       let dataString = JSON.stringify(data,null,2)
    }*/
    const { history }=this.props;
  //alert("dds") 
    history.push("/mia/clustering");
    Swal.fire({
      position: 'center',
      icon: 'Success',
      title: 'Data have been submited  ',
      showConfirmButton: false,
      timer: 1000
    })
  
      //Write a text file
     //writeFileP('../../common/datajson/clustering.json', JSON.stringify(this.state.datas), (err, data) => {
         //console.log(err || data);
     //});
     
  
     //writeJsonFile.writeJsonFile('../../common/datajson/clustering.json', JSON.stringify(this.state.datas), (err) => {
      //if (err) console.log('Error writing file:', err);
  
     /*
     this.setState
      (prevState => ({
        datas:
        {
          ...prevState.datas, 
          datas:this.state.value
          
        }
      }))
    
      */
  
    }
    handleInputChange = (e, index) => {
      //setDisable(false);
      const { name, value } = e.target;
      this.state.resultSearch = [...this.state.datas];
      //alert(e.target.checked)//=true
      if(name!=="cb_empId")
      {
        if(cb_empId[index].checked===false)
        {
          e.target.value=''
        }else
        {
          this.state.resultSearch[index][name] = value;
    
        }
          
      }
      
      //alert(value);
      //alert(list[index][name])
      //if(this.state.datas[0]['cb_empId'])alert(this.state.datas[0]['cb_empId'] )
      //setRows(list);
      /* */
      //console.log("this.state.datas1",this.state.datas);
      //console.log("list",list);
      /*this.setState
      (prevState => ({
        datas:list
        
  
        
       
         
      }),()=>{
        console.log("this.state.datas2",this.state.datas);
  
      }
      /*,()=>{
        console.log(this.state.formState.valuesSearch,"this.state.formState.valuesSearch")
        const errorsVar = validate(this.state.formState.valuesSearch, this.state.schema);
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
      });*/
  
    };
    handleSearch(event)
    {
      
      //alert(this.state.formState.valuesSearch.impactValue)
        //this.handleChangeSearch typeNovelt isRoi Cost ,hse level impactValue
        let dataSearch=[]
   let cekNull=true;
  
  //let impactValue=this.state.formState.valuesSearch.impactValue
  //e   

  //alert(cekNull)
       
  //let cekNull=(impactValue?true:false )
  /*team
  criteria
  cluster*/
        let team=this.state.formState.valuesSearch.team
        let criteria=this.state.formState.valuesSearch.criteria
        let cluster =this.state.formState.valuesSearch.cluster;
        alert(this.state.formState.valuesSearch.team)
        cekNull=team && criteria && cluster ?false: true
        if(cekNull===true) 
         {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Pilih Filter Pencarian  ',
            showConfirmButton: false,
            timer: 1000
          })
         }else{
            dataSearch=this.state.cadData.filter((data => data.team === 
            this.state.formState.valuesSearch.team
            && data.criteria===this.state.formState.valuesSearch.criteria
            && data.cluster===this.state.formState.valuesSearch.cluster));

          console.log(dataSearch,"dataSearch33333")
          dataSearch=!Array.isArray(dataSearch)?(dataSearch?[dataSearch]:dataSearch):dataSearch;
          //this.state.cluster='B'
          if(Array.isArray(dataSearch))
          {
            for(let loopCluster=0;loopCluster<=dataSearch.length-1;loopCluster++)
            {
              dataSearch[loopCluster]['cluster']=this.state.formState.valuesSearch.cluster;
            }
          }
          //this.state.datas=dataSearch;
          //alert("DSDS")
          console.log(dataSearch,"dataSearch33333")
          //this.state.cadData=[... dataSearch]
          /* */
          this.setState({datas: dataSearch})
          /**/
         /* this.setState
      (prevState => ({
        datas:
        {
          ...prevState.datas, 
          datas:dataSearch
          
    
       }
       */
      
      //console.log("dataSearch baru",dataSearch)
       
         
          }/**/
          //localStorage.setItem("data",JSON.stringify(dataSearch))
          //alert(this.state.formState.valuesSearch.impactValue)
    
         }//
         handleSave = () => {
          //    setEdit(!isEdit);
              //setRows(rows);
              let today = new Date();
            let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            for (let loopsave=0;loopsave<=this.state.resultSearch.length-1;loopsave++)
            {
              this.state.resultSearch[loopsave].step="Reviewing";
          
              //this.state.resultSearch[loopsave].submissiondate=date
            }
            
            //this.state.resultSearch.step="Cluster";
            
              //this.setState({datas: this.state.resultSearch});
              //this.setState({cadData:this.state.datas});
                            //this.setState({datas: this.state.resultSearch});
              //this.setState({cadData:this.state.datas});
              this.setState
              (prevState => ({
                cadData:
                this.state.resultSearch

            
                
               
                 
              }),()=>{
                alert("sasa")
                this.setState({datas:this.state.resultSearch})
                localStorage.setItem('data', JSON.stringify(this.state.cadData));
                const { history }=this.props;
                //alert("dds") 
                  history.push("/mia/judging");
                  Swal.fire({
                    position: 'center',
                    icon: 'Success',
                    title: 'Data have been Reviewig proceess   ',
                    showConfirmButton: false,
                    timer: 1000
                  })
  
              });
            
               
          
          
              
              //this.state.resultSearch
              //console.log("saved : ", rows);
              //setDisable(true);
              //setOpen(true);
          };
          handleChangeSearch = event => {
            let value=event.target.value;
                let name=event.target.name;
                //alert(name)
            this.setState
            (prevState => ({
              formState:
              {
                ...prevState.formState, 
                valuesSearch:
                {
                  ...prevState.formState.valuesSearch,
                  [name]: value 
                }/*,
                touched:
                {
                  ...prevState.formState.touched,
                  [event.target.name]: true
                },*/
        
          
             }
        
               
            })
            /*,()=>{
              console.log(this.state.formState.valuesSearch,"this.state.formState.valuesSearch")
              const errorsVar = validate(this.state.formState.valuesSearch, this.state.schema);
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
            }*/);
        
            
        
          };
        
             
    setData()  {
      //alert("data="+this.state.datas.length)
      const firstPageIndex = (this.state.currentPage - 1) * this.state.pageSize;
      const lastPageIndex = firstPageIndex + this.state.pageSize;
      
     //console.log("this.state.datas hasil search=",this.state.datas)
      if(this.state.datas.length!==undefined) 
      {
        
        //alert("DDDD")
        return this.state.datas.slice(firstPageIndex, lastPageIndex);
      }else 
      {console.log("this.state.datas",this.state.datas)
        return this.state.datas
      }
    }
    setCurrentPage(pageVar)
    {
      this.setState({currentPage: pageVar});
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
      "Clustering"))
    this.state.cadData=[... this.state.datas]

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
            <li class="active"> Reviewing</li>
          </ol>
        </section>

        {/*<!-- Main content -->*/}
        <section class="content">
          <div class="box box-default">
            <div class="box-header with-border">
              <h3 class="box-title"><i class="fa fa-eye"></i> REVIEWING</h3>
            </div>
            <div class="clearfix">&nbsp;</div>
            <div class="row">
              <div class="col-md-12" style={{padding: '2px 0', backgroundColor: '#f0f0f0'}}>
                <div class="col-md-1">Filter:</div>
				  <div class="col-md-1">
                  <span class="form-group">
                    <select name="team" id="team" class="form-control" onChange={this.handleChangeSearch} 
                    style={{height:'24px', padding:0}}>
                      <option selected>Team</option>
                      <option>Team 1</option>
                      <option>Team 2</option>
                    </select>
                  </span>
                </div>
				  <div class="col-md-1">
          
                  <span class="form-group">
                    <select name="criteria" id="criteria" class="form-control" onChange={this.handleChangeSearch} 
                    style={{height:'24px', padding:'0'}}>
                      <option selected>Criteria</option>
                      <option>A</option>
                      <option>B</option>
                      <option>C</option>
                    </select>
                  </span>
                </div>
                <div class="col-md-1">
                  <span class="form-group">
                    <select name="cluster" id="cluster" class="form-control"  onChange={this.handleChangeSearch} 
                    style={{height:'24px', padding:'0'}}>
                      <option selected>Cluster</option>
                      <option>A</option>
                      <option>B</option>
                      <option>C</option>
                    </select>
                  </span>
                </div>
                <div class="col-md-1"><span class="form-group">
                    <button type="submit" onClick={this.handleSearch} class="btn btn-success btn-block btn-xs">GO </button>
                    </span>

                </div>
              </div>
            </div>
            <div class="box-body table-responsive no-padding">
              <table class="table with-border">
                <tr>
                  <th width="30" style={{width: '10px'}}>
                    <input type="checkbox" name="checkbox" onChange= {(e) => this.setChecked(e)}  id="checkbox"/>
                  <label for="checkbox"> </label></th>
                  <th width="30" style={{width: '10px'}}>ID</th>
                  <th width="119">Full Name</th>
                  <th width="399">Title</th>
                  <th width="141">Assigned Cluster</th>
                  <th width="73">Cluster</th>
                  <th width="86">Score</th>
                  <th width="86">Gate 2</th>
                </tr>
                {/*console.log("this.state.datas1",this.state.datas)*/}
                { 
                  this.state.datas!==undefined?
                this.setData().map((el,i) =>
                {
                  return(
                <tr>
                  <td><span style={{width: '10px'}}>
                    <input type="checkbox" name="cb_empId" onChange={(e) => this.handleInputChange(e, i)}  id="cb_empId"/>
                  </span></td>
                  <td>{el.empId}</td>
                  <td>{el.fullname}</td>
                  <td>{el.tittle}</td>
                  <td>{el.team}, Criteria {el.criteria}</td>
                  <td>Cluster {el.cluster}</td>
                  <td>{el.score}</td>
                  <td><span class="form-group">
                      <select name="gate2" onChange={(e) => this.handleInputChange(e, i)} class="form-control" 
                      style={{height:'24px', padding:'0'}}>
                        <option selected>Gate 2</option>
                        <option>Passed</option>
                        <option>Retained</option>
                      </select>
                    </span></td>
                </tr>
              )

            }):null
            }
            
              </table>
            </div>{/*<!-- /.box-body -->*/}
            { (this.state.datas!==undefined)?(
            <div class="box-footer clearfix">
              <button type="submit" onClick={this.handleSave} class="btn btn-success btn-xs"><i class="fa fa-thumbs-up"></i> Process</button>
              <Pagination
        className="pagination pagination-sm no-margin pull-right"
        currentPage={this.state.currentPage}
        totalCount={this.state.datas.length}
        pageSize={this.state.pageSize}
        onPageChange={page => this.setCurrentPage(page)}
      />
              
            </div>
            ):null}


          </div>{/*<!-- /.box -->*/}
        </section>{/*<!-- /.content -->*/}






        </>
 
        ) 
    }
};


export default MiaReviewing