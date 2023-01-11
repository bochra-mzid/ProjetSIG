/*!

=========================================================
* Paper Dashboard React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "layouts/Admin.js";
import TouristLayout from "layouts/Tourist.js";

import Login from "views/Login";
import TouristLogin from "views/TouristLogin";
import Home from "views/Home"

import 'mapbox-gl/dist/mapbox-gl.css';
import TouristRegistration from "views/TouristRegistration";
import AgencyRegistration from "views/AgencyRegistration";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/agency-registration" component={AgencyRegistration} />
        <Route exact path="/tourist-login" component={TouristLogin} />
        <Route exact path="/tourist-registration" component={TouristRegistration} />
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Route path="/tourist" render={(props) => <TouristLayout {...props} />} />
        <Redirect to="/" />
      </Switch>
    </div>
  </BrowserRouter>
);
