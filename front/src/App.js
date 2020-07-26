import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./Layout/Layout/Layout";

import TitlePage from "../src/Components/Pages/TitlePage/TitlePage";
import LoginPage from "../src/Components/Pages/LoginPage/LoginPage";
import RegistrationPage from "../src/Components/Pages/RegistrationPage/RegistrationPage";
import HouseholdPage from "./Components/Pages/HouseholdPage/HouseholdPage";
import UserSettingsPage from "./Components/Pages/UserSettingsPage/UserSettingsPage";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegistrationPage} />
            <Route exact path="/households" component={HouseholdPage} />
            <Route exact path="/user/settings" component={UserSettingsPage} />
            <Route path="/" component={TitlePage} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
