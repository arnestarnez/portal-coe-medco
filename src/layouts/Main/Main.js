import React, { useState, useEffect,Suspense } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { Avatar, useMediaQuery } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { urlProv,urlKab,urlKec,urlKel,urlRw,urlRt,urlGetVuser } from 'kumpulanUrl';
import { Sidebar, Topbar, Footer, ImportScript } from './components';
import  '../../../src/assets/vendor/bootstrap/css/bootstrap.min.css';

/*
import '../../../src/assets/vendor/bootstrap/css/bootstrap.min.css';
import '../../../src/assets/vendor/dist/font-awesome-4.1.0/css/font-awesome.css';
import '../../../src/assets/vendor/dist/css/AdminLTE.min.css';
import '../../../src/assets/vendor/dist/css/skins/_all-skins.min.css';
import '../../../src/assets/vendor/dist/css/custom.css';
import { select } from 'underscore';
*/import AccountCircleIcon from '@material-ui/icons/AccountCircle';

/**/
const useStyles=makeStyles(theme => ({


  root: {
    //paddingTop: 100,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      //paddingTop: 64
    }
  },
  shiftContent: {
    paddingLeft: 240
  }/*,
  content: {
    height: '100%'
  }*/
}));
const loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
const Main=props => {
  const { children,rowSelect }=props;

  const classes=useStyles();
  const theme=useTheme();
  const isDesktop=useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });


  const [openSidebar, setOpenSidebar]=useState(false);

  const handleSidebarOpen=() => {
    setOpenSidebar(true);
  };

  const handleSidebarcClose=() => {
    setOpenSidebar(false);
  };
  /**/
  const shouldOpenSidebar=isDesktop? true:openSidebar;
  return (
    <>
<div className="wrapper" >

<header className="main-header" style={{marginTop:0}}>
        <nav className="navbar navbar-static-top">
          <div className="container">

          <div className="navbar-header">
              <a href="#" className="navbar-brand"><img src="/assets/img/logo-5-sm.png" style={{width:'32px', float: 'left', 'padding-right': '5px'}} className="img-responsive"/> 
              <span style={{color:'#2280c1'}}><b>Medco</b> Center of Excellence</span></a>
              <button type="button" className="navbar-toggle collapsed" 
              data-toggle="collapse" data-target="#navbar-collapse">
                <i class="fa fa-bars"></i>
              </button>
            </div>



             {
              /*
              <!-- Collect the nav links, forms, and other content for toggling -->
               */
             } 
            
            <div className="row">
				        <div class="collapse navbar-collapse pull-left" id="navbar-collapse">
                <Sidebar />
            </div>
          </div> 
            {/*
            <!-- /.navbar-collapse -->
            <!-- Navbar Right Menu -->
            */
            }
            
              <div className="navbar-custom-menu">
                <ul className="nav navbar-nav">
                  {/*
                    <!-- Messages: style can be found in dropdown.less-->
                  

                    <!-- Notifications Menu -->  
                  */
                  }
                  
                  
                  
                  <li class="dropdown user user-menu">
                    {/*<!-- Menu Toggle Button --> */}
                    
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                      {/*<!-- The user image in the navbar--> */}
                      <img src="assets/img/user2-160x160.jpg" class="user-image" alt="User Image"/>
                      {
                        /*
                        <!-- hidden-xs hides the username on small devices so only the image appears. -->
                        */  
                      }
                      
                      <span class="hidden-xs">Bayu</span>
                    </a>
                    <ul class="dropdown-menu">
                      {
                        /*
                       {
                      
                        <!-- The user image in the menu -->
                      
                      
                      <!-- Menu Footer-->>
                          
                      
                        */  
                      }
                      
                      <li class="user-footer">
                        <div class="pull-left">
                          <a href="#" class="btn btn-default btn-flat">Profile</a>
                        </div>
                        <div class="pull-right">
                          <a href="index.html" class="btn btn-default btn-flat">Sign out</a>
                        </div>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              {/*<!-- /.navbar-custom-menu -->*/}
          </div>
          {/*<!-- /.container-fluid --> */}
        </nav>
      </header>
      <div class="content-wrapper">
        <div class="container">
          <main id="main">
          {console.log(children.props.location.pathname,"children")}
          <Suspense fallback={loading()}>
           {children}
           </Suspense>

          </main>
        </div>
        </div>              
        <footer class="main-footer">
        <div class="container">
          
          Copyright &copy; 2022 Medco.
        </div>{/*<!-- /.container -->*/}
      </footer>

</div>{/*<!-- ./wrapper -->*/}








      {/* <!-- ======= Hero Section ======= -->*/}
      {/*
      <Sidebar />
      <main id="main">
        {children}

      </main>
      */}
      {/*<!-- End #main -->

    <!--======= Footer======= -->*/}
      {/*<!-- End Footer -->*/}
      {/*ImportScript("/assets/plugins/jQuery/jQuery-2.1.4.min.js")}
      {ImportScript("/assets/bootstrap/js/bootstrap.min.js")}

      {ImportScript("/assets/plugins/slimScroll/jquery.slimscroll.min.js")}
      {ImportScript("/assets/plugins/fastclick/fastclick.min.js")}
      {ImportScript("/assets/jquery-sticky/jquery.sticky.js")}
      {ImportScript("/assets/dist/js/app.min.js")}
      {ImportScript("/assets/dist/js/demo.js")}
      {
        ImportScript("/assets/dist/js/changebodyMain.js")*/
      }
      {
        ImportScript("/assets/js/changebodyMain.js")
      }

      {/*<!-- Vendor JS Files -->*/}

    </>

  );
};

Main.propTypes={
  children: PropTypes.node
};

export default Main;
