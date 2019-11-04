import React, { Component } from "react";
import styled, { css } from "styled-components";
import Colors from "../Colors";
import { Grid, Row, Col } from "react-bootstrap";
import "../index.css";
import { observer } from "mobx-react";
import history from "../history";
import stores from "../stores";

const userStore = stores.userStore;

const Logo = styled.img`
  margin-left: 3%;
  max-width: 10%;

  @media (max-width: 700px) {
    max-width: 30%;
  }
`;

@observer
export default class HeaderBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TopBar>
        <Logo src={require("../assets/logowhite.png")} />
        <div
          style={{
            marginRight: "10%",
            display: "flex",
            alignItems: "center",
            cursor: "pointer"
          }}
          onClick={() => {
            history.push("/profile");
          }}
        >
          <img
            style={{ height: "40px" }}
            src={
              userStore.user.asset
                ? userStore.user.asset.path
                : require("../assets/profile_icon_white.png")
            }
          />
          <span
            style={{ color: "white", marginLeft: "10px", fontSize: "15px" }}
          >
            {!userStore.isLoggedIn ? "Login" : userStore.user.name}
          </span>
        </div>
      </TopBar>
    );
  }
}

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${Colors.THEME_BLUE};
  height: 8vh;
  align-items: center;
`;
