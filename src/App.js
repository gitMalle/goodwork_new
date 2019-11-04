import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import LoginScreen from "./screens/LoginScreen";
import SearchResults from "./screens/SearchResults";
import ServiceScreen from "./screens/ServiceScreen";
import DealsScreen from "./screens/DealsScreen";
import ChatScreen from "./screens/ChatScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ConfirmScreen from "./screens/ConfirmScreen";
import Dashboard from "./screens/Dashboard";
import history from "./history";

import { Router, Route } from "react-router-dom";
import stores from "./stores";
import { observer } from "mobx-react";

const userStore = stores.userStore;

@observer
class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div>
          {!userStore.isLoggedIn ? (
            <div>
              <Route path="/" component={LoginScreen} exact />
              <Route path="/confirm" component={ConfirmScreen} />
            </div>
          ) : (
            <Route path="/" component={Dashboard} />
          )}
        </div>
      </Router>
    );
  }
}

export default App;
