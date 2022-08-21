import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import {
  Main as MainLayout,
  Minimal as MinimalLayout,
  MinimalUser as MinimalUserLayout,
} from './layouts';

import {
  Team as TeamView,
  ContactUs as ContactUsView,
  Portfolio as PortfolioView,
  Services as ServicesView,
  AboutUs as AboutUsView,
  //Dashboard as DashboardView,
  Home as HomeView,
  MiaCluster as MiaClusterView,
  MiaSubmittion as MiaSubmittionView,   
  MiaReviewing as MiaReviewingView, 
  MiaJudging as MiaJudgingView,
  MiaAward as MiaAwardView,
  MiaDashboard as MiaDashboardView,

  KabKotaList as KabKotaListView,
  ProductList as ProductListView,
  GroupList as GroupListView,
  Typography as TypographyView,
  Icons as IconsView,
  VisitorUser as VisitorUsers,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  Signout as SignoutView,
  NotFound as NotFoundView,
  KelurahanList as KelurahanListView,
  KabupatenList as KabupatenListView,
  LaporanKabupaten as LaporanKabupatenView,
  KecamatanList as KecamatanListView,
  ProvinsiList as ProvinsiListView,
  RtList as RtListView,
  RwList as RwListView,


  Profile as ProfileView,



} from './views';
//import {Technology as DashboardView} from './views/Pages/Dashboard/solution';
//import {Solution} from './views/Pages/Prework/solution';
const PreworkSolution = React.lazy(() => import('./views/Pages/Prework/solution'));
const RegistrationSolution = React.lazy(() => import('./views/Pages/Registration/solution'));
const DashboardSolution = React.lazy(() => import('./views/Pages/Dashboard/solution'));
const EvaluationSolution = React.lazy(() => import('./views/Pages/Evaluation/solution'));
const Execution = React.lazy(() => import('./views/Pages/Execution'));
const TrackSolution = React.lazy(() => import('./views/Pages/Track/solution'));

const Routes = () => {
  
//alert(localStorage.getItem("Username"))
  return (
    <Switch>
      {/* <Redirect
        exact
        from="/"
        to="/beranda"
      /> */}

      {localStorage.getItem("username")/*1===1/**/ ? <Redirect
        exact
        from="/"
        to="/home"
      /> : <Redirect
        exact
        from="/"
        to="/login"
      />}


<RouteWithLayout
        component={HomeView}
        exact
        layout={MainLayout}
        path="/home"
      />





      <RouteWithLayout
        component={MiaClusterView}
        exact
        layout={MainLayout}
        path="/mia/clustering"
      />
      <RouteWithLayout
        component={MiaSubmittionView}
        exact
        layout={MainLayout}
        path="/mia/submission"
      />
      <RouteWithLayout
        component={MiaReviewingView}
        exact
        layout={MainLayout}
        path="/mia/reviewing"
      />

      <RouteWithLayout
        component={MiaDashboardView}
        exact
        layout={MainLayout}
        path="/mia/dashboard"
      />


      <RouteWithLayout
        component={MiaJudgingView}
        exact
        layout={MainLayout}
        path="/mia/judging"
      />

    <RouteWithLayout
        component={MiaAwardView}
        exact
        layout={MainLayout}
        path="/mia/award"
      />

<RouteWithLayout
        component={DashboardSolution}
        exact
        layout={MainLayout}
        path="/dashboardTechnology"
      />

<RouteWithLayout
        component={PreworkSolution}
        exact
        layout={MainLayout}
        path="/prework"
      />     

      
<RouteWithLayout
        component={RegistrationSolution}
        exact
        layout={MainLayout}
        path="/registration"
      />
 
 <RouteWithLayout
        component={EvaluationSolution}
        exact
        layout={MainLayout}
        path="/qualification"
      />

<RouteWithLayout
        component={Execution}
        exact
        layout={MainLayout}
        path="/execution"
      />

<RouteWithLayout
        component={TrackSolution}
        exact
        layout={MainLayout}
        path="/tracking"
      />

      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/login"
      />

      {/* Ending */}

      {/* <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/login"
      />
      <RouteWithLayout
        component={UserSignInView}
        exact
        layout={MinimalUserLayout}
        path="/login-user"
      /> */}
      <RouteWithLayout
        component={SignoutView}
        exact
        layout={MinimalLayout}
        path="/logout"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>

  );
};

export default Routes;