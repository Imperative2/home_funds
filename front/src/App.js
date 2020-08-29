import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./Layout/Layout/Layout";

import TitlePage from "../src/Components/Pages/TitlePage/TitlePage";
import LoginPage from "../src/Components/Pages/LoginPage/LoginPage";
import RegistrationPage from "../src/Components/Pages/RegistrationPage/RegistrationPage";
import HouseholdsPage from "./Components/Pages/HouseholdsPage/HouseholdsPage";
import UserSettingsPage from "./Components/Pages/UserSettingsPage/UserSettingsPage";
import NewsPage from "./Components/Pages/NewsPage/NewsPage";
import UsersPage from "./Components/Pages/UsersPage/UsersPage";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegistrationPage} />
            <Route exact path="/households" component={HouseholdsPage} />
            <Route exact path="/user/settings" component={UserSettingsPage} />
            <Route exact path="/news" component={NewsPage} />
            <Route exact path="/users" component={UsersPage} />
            <Route path="/" component={TitlePage} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
