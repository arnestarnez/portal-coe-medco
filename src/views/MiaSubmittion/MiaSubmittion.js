
import React from 'react';
// import { Link as RouterLink, withRouter } from 'react-router-dom';
//import writeFileP from 'write-file-p');

import PropTypes from 'prop-types';
import { UserSignIn } from 'views';
import validate from 'validate.js';
import '../../assets/css_swal/cssSwal.css';
import Slider from 'react-slick/lib/slider';
// import { bg_login } from '../../assets/img_master_backup/index'
import dataClustering from '../../common/datajson/clustering.json';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';
import { makeStyles, ThemeProvider } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { connect} from 'react-redux';
//import UsersByDevice from 'views/Dashboard/components/UsersByDevice';
import axios from 'axios';

class MiaSubmittion extends React.Component {
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
      },
      lbhKecil:'<',
      lbhBesar:'>',
      datas:dataClustering,
      pesan:true,
      pesanImprove:true,
      orgData:[],
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
    this.handleSubmit = this.handleSubmit.bind(this);
    //this.inputHandlerCKE=this.inputHandlerCKE.bind(this)
    //this.logEvent=this.logEvent.bind(this);
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
    if(name==="typeNovelty" && value==="New") 
    {this.state.pesan=!this.state.pesan;this.state.pesanImprove=true}
    if(name==="typeNovelty" && value==="Improve Existing") 
    {
      this.state.pesanImprove=!this.state.pesanImprove
      this.state.pesan=true
    }

 
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
  

    render() {

  
      return (
        <>
            
          <section class="content-header">
          <h1>&nbsp;

          </h1>
          <ol class="breadcrumb">
            <li><a href="home.html"><i class="fa fa-home"></i> Home</a></li>
            <li><a href="#">MIA</a></li>
            <li class="active"> Submission</li>
          </ol>
        </section>

        {/*<!-- Main content -->*/}
        <section class="content">

          <div class="box box-default">
            <div class="box-header with-border">
              <h3 class="box-title"><i class="fa fa-share"></i> SUBMISSION</h3>
            </div>
            <div class="box-body">
              <div class="row">
                <div class="col-md-12">
                  <form class="form-horizontal" onSubmit={this.handleSubmit}>
                    <div class="box-header with-border">
                      <h4 class="box-title">Fill Your Personal Data</h4>
                    </div>
                    <div class="box-body">
                      <div class="form-group">
                        <label class="col-sm-2 control-label">Full Name</label>
                        <div class="col-sm-10">
                          <input type="text" name="fullname" class="form-control" id="inputName" 
                          placeholder="Full Name" onChange={this.handleChange}/>
                        </div>
                      </div>
                      <div class="form-group">
                        <label  class="col-sm-2 control-label">Employee ID</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" name="empId" id="empId" placeholder="Employee ID"
                          onChange={this.handleChange}/>
                        </div>
                      </div>
                      <div class="form-group">
                        <label /*for="inputFunction"*/ class="col-sm-2 control-label">Function</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="inputFunction" name="function"  onChange={this.handleChange} 
                          placeholder="Function"  />
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="inputDiscipline" class="col-sm-2 control-label">Discipline</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="inputEmployee" name="discipline"
                          onChange={this.handleChange} placeholder="Discipline"/>
                        </div>
                      </div>
                      {/*} 
                      
                      <!-- <div class="form-group">
                          <div class="col-sm-offset-2 col-sm-10">
                            <div class="checkbox">
                              <label>
                                <input type="checkbox"> Remember me
                              </label>
                            </div>
                          </div>
                        </div> -->      {*/}

                    </div>{/*<!-- /.box-body -->*/}

                    <div class="box-header with-bordesr">
                      <h4 class="box-title">Enter Your Abstraction</h4>
                    </div>
                    <div class="box-body">
                      <div class="form-group">
 
                        <label for="inputTitle" class="col-sm-2 control-label">Title</label>
                        <div class="col-sm-10">
                          <input type="text" onChange={this.handleChange} class="form-control" 
                          id="inputTitle" 
                          placeholder="Title" name="tittle"/>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="inputDescription" class="col-sm-2 control-label">Description</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="inputDescription" 
                          placeholder="Description" name='desc'
                          onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="inputFunction" class="col-sm-2 control-label">Abstract</label>
                        <div class="col-sm-10">
                          <div class="pull-right box-tools">
                            {/*}
                            <!-- <button class="btn btn-default btn-sm" data-widget="collapse" data-toggle="tooltip" title="Collapse"><i class="fa fa-minus"></i></button>
                                <button class="btn btn-default btn-sm" data-widget="remove" data-toggle="tooltip" title="Remove"><i class="fa fa-times"></i></button> -->
                            {*/}
                          </div>
                          <div class="box-body pad" style={{
                            
                              "& .ck-editor__main > .ck-editor__editable": {
                                minHeight: "100px"
                              }
                          
                          }}>
                              
                  <CKEditor
                  height="100%"
                  name="abstraction"
                  id="abstraction"

                  config={{
                    simpleUpload: {
                      uploadUrl: 'https://myserver.herokuapp.com/image-upload'
                    },
                    toolbar: ['heading', '|', 'bold', 'italic', 'blockQuote', 'link', 'numberedList', 'bulletedList', 'imageUpload', 'insertTable',
                      'tableColumn', 'tableRow', 'mergeTableCells', 'mediaEmbed', '|', 'undo', 'redo']
                  }}
                  editor={ClassicEditor}
                  onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    this.valueFrom(data,"abstraction")
                  } }

               
                             />
              


                          </div>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="inputDiscipline" class="col-sm-2 control-label">&nbsp;</label>
                        <div class="col-sm-10">
                          <input type="file" id="exampleInputFile"/>
                          <p class="help-block">Example block-level help text here.</p>
                        </div>
                      </div>
                    </div>{/*<!-- /.box-body -->*/}

                    <div class="box-header with-border">
                      <h4 class="box-title">Novelty</h4>
                    </div>
                    <div class="box-body">
                      <div class="form-group">
                        <label for="inputType" class="col-sm-2 control-label">Type</label>
                        <div class="col-sm-10">
                          <div class="radio">
                            <label>
                              <input type="radio" name="typeNovelty" 
                              id="typeNovelty" value="New" onChange={this.handleChange} />
                              New <br /> 
                              <span style={{fontStyle: 'italic', fontSize: 'small', color: 'brown'}}>
                                Relative no evidence or never be found anywhere in Medco Organization ideas, process, system, part, equipment or devices at any kind or form of modification, installation or usage partly or entirely whether small or big magnitude in Medco Organization</span></label>
                          </div>
                          <input type="text" class="form-control" id="inputTitle" placeholder="Reason" disabled={this.state.pesan}/> <br />
                          <input type="file" id="exampleInputFile" disabled={this.state.pesan}/>
                          <div class="radio">
                            <label>
                              <input type="radio" name="typeNovelty" id="optionsRadios2" 
                              value="Improve Existing" onChange={this.handleChange}/>
                              Improve Existing <br /> 
                              <span style={{fontStyle: 'italic', fontSize: 'small', color: 'brown'}}>
                                Ideas, process, system, part, equipment or devices at any kind or form of modification, installation or usage partly or entirely whether small or big magnitude but there is at least one evidence that it has connection, interference or interface to the existing entity (could be systems, process, etc in Medco Organization
                                </span></label>
                          </div>
                          <input type="text" class="form-control" id="inputTitle" placeholder="Reason" disabled={this.state.pesanImprove}/> <br />
                          <input type="file" id="exampleInputFile" disabled={this.state.pesanImprove}/>

                        </div>
                      </div>
                    </div>

                    <div class="box-header with-border">
                      <h4 class="box-title">Impact Value</h4>
                    </div>
                    <div class="box-body">
                      <div class="form-group">
                        <label for="inputType" class="col-sm-2 control-label">ROI</label>
                        <div class="col-sm-10">
                          <div class="radio">
                            <label>
                              <input type="radio" name="roi" id="roi1" 
                              value="Very High" onChange={this.handleChange} />
                              Very High | <span style={{fontStyle: 'italic', fontSize: 'small', color: 'brown'}}>{this.state.lbhBesar}20%</span>
                            </label>
                          </div>
                          <div class="radio">
                            <label>
                              <input type="radio" name="roi" id="roi2" value="High"
                              onChange={this.handleChange} />
                              High | <span style={{fontStyle: 'italic', fontSize: 'small', 
                              color: 'brown'}}>15-20%</span>
                            </label>
                          </div>
                          <input type="file" id="exampleInputFile" />

                          <div class="radio">
                            <label>
                            <input type="radio" name="roi" id="roi3" value="Medium"
                               />
                              Medium | <span style={{fontStyle: 'italic', fontSize: 'small', color: 'brown'}}>10-15%</span>
                            </label>
                          </div>
                          <input type="file" id="exampleInputFile" />

                          <div class="radio">
                            <label>
                              <input type="radio" name="roi" id="roi4" value="Moderate"
                              onChange={this.handleChange} />
                              
                              Moderate | <span style={{fontStyle: 'italic', fontSize: 'small', color: 'brown'}}
                              >{this.state.lbhKecil}10%</span>
                            </label>
                          </div>
                          <input type="file" id="exampleInputFile" />

                        </div>
                      </div>
                    </div>
                    <div class="box-body">
                      <div class="form-group">
                        <label for="inputType" class="col-sm-2 control-label">Cost Saving</label>
                        <div class="col-sm-10">
                          <div class="radio">
                            <label>
                              <input type="radio" name="cost" id="cost1" 
                              value="Extremely High Impact"  onChange={this.handleChange} />
                              
                              Extremely High Impact | <span style={{fontStyle: 'italic', fontSize: 'small', fontSize: 'small', 
                              color: 'brown'}}>{this.state.lbhBesar} 1 MM USD</span>
                            </label>
                          </div>
                          <div class="radio">
                            <label>
                              <input type="radio" name="cost" id="cost2" 
                              value="Very High Impact"  onChange={this.handleChange}/>
                              Very High Impact | <span style={{fontStyle: 'italic', fontSize: 'small', color: 'brown'}}>500 - 1 MM USD</span>
                            </label>
                          </div>
                          <div class="radio">
                            <label>
                              <input type="radio" name="cost" id="cos3" value="Moderate High Impact"   onChange={this.handleChange}/>
                              Moderate High Impact | <span style={{fontStyle: 'italic', fontSize: 'small', color: 'brown'}}>100 - 500 K USD</span>
                            </label>
                          </div>
                          <div class="radio">
                            <label>
                              <input type="radio" name="cost" id="cos4" value="Moderate"  onChange={this.handleChange}/>
                              Moderate Impact | <span style={{fontStyle: 'italic', fontSize: 'small', color: 'brown'}}>50 K - 100 K USD</span>
                            </label>
                          </div>
                          <div class="radio">
                            <label>
                              <input type="radio" name="cost" id="cos5" value="Low Impact"  onChange={this.handleChange}/>
                              Low Impact | <span style={{fontStyle: 'italic', fontSize: 'small', color: 'brown'}}>{this.state.lbhKecil} 50 K USD</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="box-body">
                      <div class="form-group">
                        <label for="inputType" class="col-sm-2 control-label">HSE</label>
                        <div class="col-sm-10">
                          <div class="radio">
                            <label>
                              <input type="radio" name="HSE" id="HSE1" value="Remove Hazard"  onChange={this.handleChange}/>
                              Remove Hazard 
                            </label>
                          </div>
                          <div class="radio">
                            <label>
                              <input type="radio" name="HSE" id="oHSE2" value="Minimize Hazard"  onChange={this.handleChange}/>
                              Minimize Hazard 
                            </label>
                          </div>
                          <div class="radio">
                            <label>
                              <input type="radio" name="HSE" id="HSE3" value="Contain Hazard"  onChange={this.handleChange}/>
                              Contain Hazard 
                            </label>
                          </div>
                          <div class="radio">
                            <label>
                              <input type="radio" name="HSE" id="HSE4" value="Protect Hazard"  onChange={this.handleChange}/>
                              Protect Hazard
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="box-header with-border">
                      <h4 class="box-title">Application Boundary</h4>
                    </div>
                    <div class="box-body">
                      <div class="form-group">
                        <label for="inputType" class="col-sm-2 control-label">Asset Hierarchy Level</label>
                        <div class="col-sm-10">
                          <div class="radio">
                            
                            <label>
                              <input type="radio" name="hsl" id="hsl1" value="Facility" onChange={this.handleChange}/>
                              Facility | <span style={{fontStyle: 'italic', fontSize: 'small', color: 'brown'}}
                              >Train A</span>
                            </label>
                          </div>
                          <div class="radio">
                            <label>
                              <input type="radio" name="hsl" id="hsl2" value="System" onChange={this.handleChange}/>
                              System | <span style={{fontStyle: 'italic', fontSize: 'small', color: 'brown'}}>Compressor Train A</span>
                            </label>
                          </div>
                          <div class="radio">
                            <label>
                              <input type="radio" name="hsl" id="hsl3" value="Sub System" onChange={this.handleChange}/>
                              Sub System | <span style={{fontStyle: 'italic', fontSize: 'small', color: 'brown'}}>Compressor</span>
                            </label>
                          </div>
                          <div class="radio">
                            <label>
                              <input type="radio" name="hsl" id="hsl4" value="Equipment" onChange={this.handleChange}/>
                              Equipment | <span style={{fontStyle: 'italic', fontSize: 'small', color: 'brown'}}>Turbo Compressor Package Train A</span>
                            </label>
                          </div>
                          <div class="radio">
                            <label>
                              <input type="radio" name="hsl" id="hsl5" value="Sub Equipment" onChange={this.handleChange}/>
                              Sub Equipment | <span style={{fonStyle: 'italic', fontSize: 'small',  color: 'brown'}}>Train A LP Compressor</span>
                            </label>
                          </div>
                          <div class="radio">
                            <label>
                              <input type="radio" name="hsl" id="hsl6" value="Component" onChange={this.handleChange}/>
                              Component | <span style={{fontStyle: 'italic', fontSize: 'small', color: 'brown'}}>Flow Glass - From NDE Journal Bearing C-2720 TO Gas Turbinelube Oil Train A</span>
                            </label>
                          </div>
                          <div class="radio">
                            <label>
                              <input type="radio" name="hsl" id="hsl7" value="Part" onChange={this.handleChange}/>
                              Part | <span style={{fontStyle: 'italic', fontSize: 'small', color: 'brown'}}>Proximity Probe - NDE Bearing Vibration (X) LP Compressor Train A</span>
                            </label>
                          </div>
                          <div class="radio">
                            <label>
                              <input type="radio" name="hsl5" id="hsl58" value="Other" onChange={this.handleChange}/>
                              Other | <span style={{fontStyle: 'italic', fontSize: 'small', color: 'brown'}}>Logistic</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="box-header with-border">
                      <h4 class="box-title">Change Level</h4>
                    </div>
                    <div class="box-body">
                      <div class="form-group">
                        <label for="inputType" class="col-sm-2 control-label">Level</label>
                        <div class="col-sm-10">
                          <div class="radio">
                            <label>
                              <input type="radio" name="level" id="level1" value="Low" onChange={this.handleChange}/>
                              Low | <span style={{fontStyle: 'italic', fontSize: 'small', color: 'brown'}}>Applied Change to Existing Procewss or Introduce New Change - less than or at least 2 Steps/Processes</span>
                            </label>
                          </div>
                          <div class="radio">
                            <label>
                              <input type="radio" name="level" id="level2" value="Medium" onChange={this.handleChange}/>
                              Medium | <span style={{fontStyle: 'italic', fontSize: 'small', color: 'brown'}}>Applied Change to Existing Procewss or Introduce New Change - less than or at least 5 Steps/Processes</span>
                            </label>
                          </div>
                          <div class="radio">
                            <label>
                              <input type="radio" name="level" id="level3" value="High/Radical" onChange={this.handleChange}/>
                              High/Radical | <span style={{fontStyle: 'italic', fontSize: 'small', color: 'brown'}}>Applied Change to Existing Procewss or Introduce New Change - more than  Steps/Process</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="box-footer">
                    <button type="submit" 
                  className="btn btn-primary btn-block btn-flat"
                  /*disabled={!this.state.formState.isValid}*/
                  ><i class="fa fa-share"></i> Submit</button>     
						<a href="" type="button" class="btn btn-success btn-sm" ><button ><i class="fa fa-save"></i> Save</button></a>
<a href="" type="button" class="btn btn-warning btn-sm"><button type="submit" 
                                  disabled={!this.state.formState.isValid}><i class="fa fa-edit"></i> Edit</button></a>
						<a href="" type="button" class="btn btn-danger btn-sm" type="button">
              <button onClick={this.handleClose}><i class="fa fa-close"></i> Cancel</button></a> 
					  
						  <a href="" type="button" class="btn btn-default btn-sm"><button type="submit"><i class="fa fa-download"></i> Download</button></a>
                    </div>{/*<!-- /.box-footer -->*/}
                  </form>{/*<!-- /.box-body --><!-- /.box -->*/}
                </div>
              </div>
            </div>
          </div>
        </section>{/*<!-- /.content -->*/}



        </>
 
        ) 
    }
};

const mapStateToProps = (state) =>
{
    return{
      dataOrg: state.orgData
    
    }
}
const mapDispactToProps=(dispatch)=>
{
    return{
        dispatchOrg:(Orgs)=>
        {dispatch({type:'UBAH_DATA',newValue:Orgs})
        }
    }
}

export default MiaSubmittion