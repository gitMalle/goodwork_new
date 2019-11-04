import React, { Component } from "react";
import LoginScreen from "./LoginScreen";
import SearchResults from "./SearchResults";
import ServiceScreen from "./ServiceScreen";
import DealsScreen from "./DealsScreen";
import ChatScreen from "./ChatScreen";
import SettingsScreen from "./SettingsScreen";
import ProfileScreen from "./ProfileScreen";
import SideBar from "react-sidebar";
import history from "../history";
import styled from "styled-components";
import { Router, Route } from "react-router-dom";
import Header from "../components/HeaderBar";
import store from "../stores";

const jobsIcon = require("../assets/jobs.png");
const dealsIcon = require("../assets/deals.png");
const settingsIcon = require("../assets/settings.png");
const speechIcon = require("../assets/speech.png");

const mql = window.matchMedia(`(min-width: 800px)`);

const Menu = styled.div`
  height: 92vh;
  width: 20vw;
  background-color: #f4f7f9;
  border-right: #979797 solid 1px;

  @media (max-width: 700px) {
    width: 80vw;
  }
`;

const MenuPoint = styled.div`
  background-color: #f4f7f9;
  padding: 10px;
  &:hover {
    background-color: #dee5e9;
  }
`;

class Dashboard extends Component {
  state = {
    sidebarOpen: true,
    sidebarDocked: true
  };

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
    this.setState({ mql: mql, sidebarDocked: mql.matches });
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  mediaQueryChanged = () => {
    this.setState({ sidebarDocked: mql.matches });
  };

  componentDidMount() {
    store.userStore.getUserDetails();
    store.userStore.getCategories();
    store.userStore.getDays();
    store.userStore.getCities();
  }

  render() {
    return (
      <div>
        <Header />
        <SideBar
          sidebar={this.renderSideBar()}
          open={this.state.sidebarOpen}
          docked={this.state.sidebarDocked}
          onSetOpen={open => this.setState({ sidebarOpen: open })}
          styles={{
            overlay: { backgroundColor: "rgba(0, 0, 0, 0)" },
            root: { top: "8vh" }
          }}
          shadow={false}
        >
          {!mql.matches && (
            <div
              id="toggle"
              onClick={() => this.setState({ sidebarOpen: true })}
            >
              <div class="one" />
              <div class="two" />
              <div class="three" />
            </div>
          )}
          <Route path="/settings" component={SettingsScreen} />
          <Route path="/deals" component={DealsScreen} />
          <Route path="/chat" component={ChatScreen} />
          <Route path="/jobs" component={ServiceScreen} />
          <Route path="/profile" component={ProfileScreen} />
        </SideBar>
      </div>
    );
  }

  showPage = nav => {
    history.push(nav);
  };

  renderSideBar = () => {
    return (
      <div>
        <Menu>{this.renderMenuElements()}</Menu>
      </div>
    );
  };

  renderMenuElements = () => {
    let elems = [];
    let menuPoints = [
      { name: "Jobs", nav: "/jobs", asset: jobsIcon },
      { name: "Messages", nav: "/chat", asset: speechIcon },
      { name: "Deals", nav: "/deals", asset: dealsIcon },
      { name: "Settings", nav: "/settings", asset: settingsIcon }
    ];

    menuPoints.forEach(elem => {
      elems.push(
        <MenuPoint onClick={() => this.showPage(elem.nav)}>
          <img
            style={{
              marginRight: "15px",
              marginLeft: "10px",
              height: "35px"
            }}
            src={elem.asset}
          />
          <span>{elem.name}</span>
        </MenuPoint>
      );
    });

    elems.push(
      <MenuPoint
        onClick={() => {
          history.push("/");
          store.userStore.logout();
        }}
      >
        <img
          style={{
            marginRight: "15px",
            marginLeft: "10px",
            height: "35px"
          }}
          src={require("../assets/logout.png")}
        />
        <span>Logout</span>
      </MenuPoint>
    );

    console.log(elems);

    return elems;
  };
}

export default Dashboard;
