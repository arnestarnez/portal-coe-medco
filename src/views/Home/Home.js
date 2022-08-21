import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles=makeStyles(theme => ({
  root: {
    //padding: theme.spacing(4),
    //        backgroundColor: '#ffF8ffF8',
    transparent: true,
    backgroundColor: '#fff',
    width: '100%',
    //height: '600px'
  }
}));

const Home=props => {
  const { history }=props;
/** */
  if (!localStorage.getItem("username")) {
    history.push('/logout');

  }/**/

  return (
    <>
    {/*<!-- Content Header (Page header) -->*/ }
    
    <section className="content-header">
      <h1>&nbsp;
      </h1>
      <ol className="breadcrumb">
        <li className="active"><i class="fa fa-home"></i>  Home</li>
      </ol>
    </section>
    {/* <!-- Main content --> */}
    
    <section class="content">
      
      <div class="box box-default">
        <div class="box-header with-border">
          <h3 class="box-title">About Center of Excellence</h3>
        </div>
        <div class="box-body">
          <div class="row">
            <div class="col-md-6">
              <p>The printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
              <p> It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
            <div class="col-md-6"><img src="assets/img/medco-logo.png" class="img-responsive"/></div>
          </div>
          
        </div>{/*<!-- /.box-body -->*/}
      </div>{/*<!-- /.box -->*/}
    </section>{/*<!-- /.content -->*/}
    </>
  );
};

export default Home;
