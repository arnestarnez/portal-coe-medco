import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UserSignIn } from 'views';
import validate from 'validate.js';
import '../../assets/css_swal/cssSwal.css';
import Slider from 'react-slick/lib/slider';
// import { bg_login } from '../../assets/img_master_backup/index'
import Swal from 'sweetalert2';
import dataClustering from '../../common/datajson/clustering.json';
import Pagination from '../../../src/components/Pagination';
import { connect} from 'react-redux';

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


//import UsersByDevice from 'views/Dashboard/components/UsersByDevice';
import axios from 'axios';
import { slidesOnRight } from 'react-slick/lib/utils/innerSliderUtils';
import data from '@iconify/icons-mdi/counter';

class MiaCluster extends React.Component {
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
      isCost:false,
      isRoi:false,
      //cluster:'A',
      checkedValue:false,
      
      isHse:false,
      lbhKecil:'<',
      lbhBesar:'>',

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
    this.handleInputChange=this.handleInputChange.bind(this)
  }
  setChecked=(e)=>
  {
    //alert(this.state.datas.length);
    let togger=e.target.checked
    for (let loopDatas  = 0; loopDatas < this.state.datas.length; loopDatas++) {
      cb_empId[loopDatas].checked=togger
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
  handleInputChange = (e, index) => {
    //setDisable(false);
    const { name, value } = e.target;
    this.state.resultSearch = [...this.state.datas];
    //alert(e.target.checked)//=true
    alert(":sasasa")
    if(name!=="cb_empId")
    {
      alert(cb_empId[index].checked)
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
  //onClick={handleSave}
  handleSearch(event)
  {
    
    //alert(this.state.formState.valuesSearch.impactValue)
      //this.handleChangeSearch typeNovelt isRoi Cost ,hse level impactValue
      let dataSearch=[]
      //alert("SSASASA")
      //alert(impactValue)

/*
      typeNovelty
      impactValue
      roi
      cost
      hse
      appBoundry

*/
let cekNull=true;

//let impactValue=this.state.formState.valuesSearch.impactValue
//e   
  if(this.state.formState.valuesSearch.impactValue === undefined || 
  this.state.formState.valuesSearch.impactValue === null)
    {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Pilih Filter Pencarian  ',
        showConfirmButton: false,
        timer: 1200
      })
    }else{
      cekNull=false;
    }
//alert(cekNull)
     
//let cekNull=(impactValue?true:false )
      let impactValue=this.state.formState.valuesSearch.impactValue
      let roi=this.state.formState.valuesSearch.roi
      let typeNovelty=this.state.formState.valuesSearch.typeNovelty
      let cost =this.state.formState.valuesSearch.cost;
      let hse=this.state.formState.valuesSearch.hse
      let hsl=this.state.formState.valuesSearch.hsl
      let level=this.state.formState.valuesSearch.level
      //alert(cekNull)
      if(cekNull===false && impactValue==="ROI")
      {
  //      alert(hsl)
        cekNull=typeNovelty && roi && hsl && level ?false : true;
           
      }else if(cekNull===false && impactValue==="Cost Saving")
      {
        cekNull=typeNovelty && cost && hsl && level ?false: true
      }else if(cekNull===false && impactValue==="HSE")
      {
        cekNull=typeNovelty && hse && hsl && level ?false: true
      } 
      impactValue=this.state.formState.valuesSearch.impactValue
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
        if(this.state.formState.valuesSearch.impactValue==="ROI")
        { 
          //console.log("this.state.cadData",this.state.cadData)
          dataSearch=this.state.cadData.filter((data => data.typeNovelty === 
            this.state.formState.valuesSearch.typeNovelty
            && data.roi===this.state.formState.valuesSearch.roi 
            && data.level===this.state.formState.valuesSearch.level
            && data.hsl===this.state.formState.valuesSearch.hsl));
            
        }else if(impactValue==="Cost Saving")
        {
          dataSearch=this.state.cadData.filter((data => data.typeNovelty === this.state.formState.valuesSearch.typeNovelty
            && data.cost===this.state.formState.valuesSearch.cost 
            && data.level==this.state.formState.valuesSearch.level
            && data.hsl===this.state.formState.valuesSearchhsl));
        }else if(impactValue==="HSE")
        {
          dataSearch=this.state.cadData.filter((data => data.typeNovelty === this.state.formState.valuesSearch.typeNovelty
            && data.hse===this.state.formState.valuesSearch.hse
            && data.level===this.state.formState.valuesSearch.level
            && data.hsl===this.state.formState.valuesSearch.hsl))
        }
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
       

/*
      (this.state.formState.valuesSearch.impactValue &&  
      this.state.formState.valuesSearch.impactValue==="ROI"
      ?this.state.formState.valuesSearch.roi && $this.state.formState.valuesSearch.level)
*/
       //}
  
  componentWillMount() {

     //const errorsVar = validate(this.state.formState.values, this.state.schema);
    /*if(!this.state.datas)
    {*/
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
        "Submission"))
      this.state.cadData=[... this.state.datas]


  }
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
  handleImpactValue= event => {
    event.persist();
    let name=event.target.name;
    let value=event.target.value;
    this.handleChangeSearch(event);
    if(value==="ROI")
    {
      this.setState({isRoi: true});
      this.setState({isHse: false});
      this.setState({isCost: false});
   
    
    }else if(value==="Cost Saving")
    {
    this.setState({isRoi: false});
    this.setState({isHse: false});
    this.setState({isCost: true});
 
    }else if(value==="HSE")
    {
    this.setState({isRoi: false});
    this.setState({isHse: true});
    this.setState({isCost: false});
 
    }
  }
  handleSave = () => {
//    setEdit(!isEdit);
    //setRows(rows);
    let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  for (let loopsave=0;loopsave<=this.state.resultSearch.length-1;loopsave++)
  {
    this.state.resultSearch[loopsave].step="Clustering";

    //this.state.resultSearch[loopsave].submissiondate=date
  }
  
  //this.state.resultSearch.step="Cluster";
  
    this.setState({datas: this.state.resultSearch});
    this.setState({cadData:this.state.datas});
    localStorage.setItem('data', JSON.stringify(this.state.cadData)); 

    const { history }=this.props;
    //alert("dds") 
      history.push("/mia/reviewing");
      Swal.fire({
        position: 'center',
        icon: 'Success',
        title: 'Data have been Clustering proceess   ',
        showConfirmButton: false,
        timer: 1000
      })

    
    //this.state.resultSearch
    //console.log("saved : ", rows);
    //setDisable(true);
    //setOpen(true);
};
/*
  handleInputChange = (e, index) => {
    setDisable(false);
    const { name, value } = e.target;
    const list = [...rows];
    list[index][name] = value;
    setRows(list);
};
*/
  handleChange = event => {
    event.persist();

    let value=event.target.value;
        let name=event.target.name;
 //       alert(name+" "+value)
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
  


  handleChangeSearch = event => {
    //alert("DSDSDS")
    //event.persist();


        //alert(name+" "+value)valuesEdit


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
            
            <form  >
            <div class="clearfix">&nbsp;</div>
            <div class="row">
              <div class="col-md-12" style={{padding: '2px 0', backgroundColor: '#f0f0f0'}}>
                <div class="col-md-1">Filter:</div>
                <div class="col-md-1"><span class="form-group">
                    <select name="typeNovelty"  class="form-control" 
                    style={{height:'24px', padding:0}}
                    onChange={this.handleChangeSearch}>
                      <option selected>Novelty</option>
                      <option>New</option>
                      <option>Improve Existing</option>
                    </select>
                  </span>
                </div>
                

                <div class="col-md-2"><span class="form-group">
                    <select name="impactValue" 
                    onChange={this.handleImpactValue}
                    class="form-control" style={{height:'24px', padding:0}}>
                      <option selected>Impact Value</option>
                      <option>ROI</option>
                      <option>Cost Saving</option>
                      <option>HSE</option>
                    </select>
                  </span>
                </div>
                
                <div class="col-md-2" hidden={!this.state.isRoi}><span class="form-group" >
                    <select name="roi" onChange={this.handleChangeSearch } class="form-control" style={{height:'24px', padding:0}}>
                      <option selected>ROI</option>
                      <option value="Very High">Very High | {this.state.lbhBesar}20% </option>
                      <option value="High">High | 15-20% </option>
                      <option value="Medium">Medium | 10-15%</option>
                      <option value="Moderate">Moderate | {this.state.lbhKecil}10%</option>
                     
                    </select>
                  </span>
                </div>
 
                
                <div class="col-md-2" hidden={!this.state.isCost}><span class="form-group" >
                    <select name="cost" 
                    onChange={this.handleChangeSearch}
                    class="form-control" style={{height:'24px', padding:0}}>
                      <option selected>Cost Saving</option>
                      <option value="Extremely High Impact">Extremely High Impact |  {this.state.lbhBesar} 1 MM USD </option>
                      <option value="Very High Impact">Very High Impact | 500 - 1 MM USD </option>
                      <option value="Moderate High Impact">Moderate High Impact | 100 - 500 K USD </option>
                      <option value="Moderate">Moderate Impact | 50 K - 100 K USD</option>
                      <option value="Low Impact">Low Impact | | {this.state.lbhKecils} 50 K USD</option>
                     
                    </select>
                  </span>
                  
                </div>
                
                <div class="col-md-2" hidden={!this.state.isHse}><span class="form-group">
                    <select name="hse" 
                     onChange={this.handleChangeSearch}
                    class="form-control" style={{height:'24px', padding:0}}>
                      <option selected>HSE</option>
                      <option value="Remove Hazard">Remove Hazard </option>
                      <option value="Minimize Hazard "> Minimize Hazard  </option>
                      <option value="Contain Hazard">Contain Hazard</option>
                      <option value="Protect Hazard">Protect Hazard</option>
                     
                    </select>
                  </span>
                </div>
                
                

                <div class="col-md-3"><span class="form-group">
                    <select name="hsl" onChange={this.handleChangeSearch} class="form-control" style={{height:'24px', padding:0}}>
                      <option selected>Application Boundary</option>s
                      <option value="Facility">Facility</option>
                      <option value="System">System</option>
                      <option value="Sub System">Sub System</option>
                      <option value="Equipment">Equipment</option>
                      <option value="Sub Equipment">Sub Equipment</option>
                      <option value="Component">Component</option>
                      <option value="Part">Part</option>
                      <option value="Other">Other</option>
                    </select>
                  </span>
                </div>
                <div class="col-md-2"><span class="form-group">
                    <select name="level" onChange={this.handleChangeSearch} class="form-control" style={{height:'24px', padding:0}}>
                      <option selected>Change Level</option>
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High/Radical</option>
                    </select>
                  </span>
                </div>
                
                <div class="col-md-1"><span class="form-group">
                    <select name="cluster"
                     onChange={this.handleChangeSearch}
                    class="form-control" style={{height:'24px', padding:0}}>
                      <option selected>Cluster</option>
                      <option>A</option>
                      <option>B</option>
                      <option>C</option>
                    </select>
                  </span>
                </div>
                <div class="col-md-1"><span class="form-group">
                    <button type="button" class="btn btn-success btn-xs" 
                    onClick={this.handleSearch}>GO </button></span>
                </div>
              </div>
            </div>
            </form>
            <div class="box-body table-responsive no-padding">

              <table class="table table-striped">
                <tr>
                  <th width="21" style={{width: '10px'}}>
                    <input type="checkbox" name="checkbox" onChange= {(e) => this.setChecked(e)}  id="checkbox"/>
                    <label for="checkbox"> </label></th>
                  <th width="30" style={{width: '10px'}}>ID</th>
                  <th width="137">Full Name</th>
                  <th width="446">Title</th>
                  <th width="49">Cluster</th>
                  <th width="80">Gate 1</th>
                  <th width="69" style={{width: '40px'}}>Assign Reviewer</th>
                  <th width="72" style={{width: '40px'}}>Assign Criteria</th>
                </tr>
                {/*console.log("this.state.datas1",this.state.datas)*/}
                { 
                  this.state.datas!==undefined?
                this.setData().map((el,i) =>
                {
                  return(

                    <tr>
                    <td><span style={{width: '10px'}}>
                      <input type="checkbox"  name="cb_empId"    
                      onChange={(e) => this.handleInputChange(e, i)}  id="cb_empId"/>
                     

                    </span></td>
                    <td>{el.empId}</td>
                    <td>{el.fullname}</td>
                    <td>{el.tittle}</td>
                    <td>{el.cluster}&nbsp;</td>
                    <td><span class="form-group">
                        <select name="gate1"  onChange={(e) => this.handleInputChange(e, i)} class="form-control" style={{height:'24px', fontSize: 'small',padding:0}}>
                          <option value='' selected>Gate 1</option>
                          <option value='Passed'>Passed</option>
                          <option value='Retained'>Retained</option>
                        </select>
                      </span></td>
                    <td><span class="form-group">
                        <select name="team" class="form-control"  onChange={(e) => this.handleInputChange(e, i)} style={{height:'24px', fontSize: 'small', padding:0}}>
                          <option selected>Team</option>
                          <option>Team 1</option>
                          <option>Team 2</option>
                        </select>
                      </span><span class="form-group">
                        <select name="head" class="form-control"  onChange={(e) => this.handleInputChange(e, i)} style={{height:'24px', fontSize: 'small', padding:0}}>
                          <option selected>Head</option>
                          <option>Didik</option>
                          <option>Alief</option>
                          <option>Gugun</option>
                          <option>Faisal</option>
                        </select>
                      </span><span class="form-group">
                        <select name="member" class="form-control" onChange={(e) => this.handleInputChange(e, i)} style={{height:'24px', fontSize: 'small', padding:0}}>
                          <option selected>Member</option>
                          <option>Didik</option>
                          <option>Alief</option>
                          <option>Gugun</option>
                          <option>Faisal</option>
                        </select>
                      </span></td>
                    <td><span class="form-group">
                        <select name="criteria" class="form-conritrol"  onChange={(e) => this.handleInputChange(e, i)} style={{height:'24px', fontSize: 'small', padding:0}}>
                          <option selected>Criteria</option>
                          <option>A</option>
                          <option>B</option>
                          <option>C</option>
                        </select>
                      </span></td>
                  </tr>
  




                    
                  )

                }):null
                }
                
              </table>
            </div>
            {/*<!-- /.box-body -->*/}
            
           { (this.state.datas!==undefined)?(
            <div class="box-footer clearfix">
              <button onClick={this.handleSave} class="btn btn-primary"><i class="fa fa-hourglass-start"></i> Process</button>
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
        </section>



        </>
 
        ) 
    }
};


export default MiaCluster