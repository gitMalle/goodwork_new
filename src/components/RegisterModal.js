import React, { Component } from "react";
import styled from "styled-components";
import Colors from "../Colors";
import { Grid, Row, Col } from "react-bootstrap";
import "../index.css";
import { observer } from "mobx-react";
import Select from "react-select";
import "react-select/dist/react-select.css";

import store from "../stores";
const userStore = store.userStore;

@observer
export default class RegisterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAreas: [],
      selectedDays: []
    };
  }

  signUp = () => {
    console.log(userStore.registerInfo);
    userStore.register(() => {});
  };

  render() {
    return (
      <div>
        <h2>
          <b>Register</b>
        </h2>
        <div style={{ textAlign: "left" }}>
          <Label>
            Username
          </Label>
        </div>
        <Input
          value={userStore.registerInfo.registerName}
          onChange={ev =>
            (userStore.registerInfo.registerName = ev.target.value)
          }
        />
        <div style={{ textAlign: "left" }}>
          <Label>Email or Phone Number</Label>
        </div>
        <Input
          value={userStore.registerInfo.registerEmailOrPhone}
          onChange={ev =>
            (userStore.registerInfo.registerEmailOrPhone = ev.target.value)
          }
        />
        <div style={{ textAlign: "left" }}>
          <Label>Password</Label>
        </div>
        <Input
          type="password"
          value={userStore.registerInfo.registerPassword}
          onChange={ev =>
            (userStore.registerInfo.registerPassword = ev.target.value)
          }
          style={{ marginBottom: 30 }}
        />
        <div>
          <LoginButton
            style={{ backgroundColor: Colors.THEME_BLUE }}
            onClick={this.signUp}
          >
            Register
          </LoginButton>
        </div>
      </div>
    );
  }
}

const Label = styled.p`
  color: #afafaf;
  margin: 0;
  margin-left: 27%;

  @media (max-width: 700px) {
    margin-left: 10%;
  }
`;

const Input = styled.input`
  width: 50%;
  height: 3em;
  border: #d4d4d4 solid 1px;
  border-radius: 50px;
  padding-left: 20px;
  outline: none;

  @media (max-width: 700px) {
    width: 90%;
  }
`;

const LoginButton = styled.button`
  width: 30%;
  height: 2em;
  border-radius: 5px;
  border: none;
  margin-top: 20px;
  color: white;
  font-weight: bold;
  font-size: 1.5em;
  padding: 0px;

  @media (max-width: 700px) {
    width: 80%;
  }
`;

const RadioBtn = styled.input`
  background: red;
  width: 2em;
  height: 2em;
`;
