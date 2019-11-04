import React, { Component } from "react";
import styled from "styled-components";
import Colors from "../Colors";
import { Grid, Row, Col } from "react-bootstrap";
import "../index.css";
import { observer } from "mobx-react";

import store from "../stores";
const userStore = store.userStore;

@observer
export default class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailphone: "",
      password: ""
    };
  }

  signUp = () => {
    this.props.register();
  };

  login = () => {
    userStore.login(this.state.emailphone, this.state.password);
  };

  render() {
    return (
      <div>
        <h2>
          <b>Login</b>
        </h2>
        <div style={{ textAlign: "left", paddingTop:20, paddingBottom:10}}>
          <Label>Email or Phone Number</Label>
        </div>
        <Input
          value={this.state.emailphone}
          onChange={ev => this.setState({ emailphone: ev.target.value })}
        />
        <div style={{ textAlign: "left", paddingTop:20, paddingBottom:10 }}>
          <Label>Password</Label>
        </div>
        <Input
          type="password"
          value={this.state.password}
          onChange={ev => this.setState({ password: ev.target.value })}
        />
        <div style={{paddingTop:10 }}>
          <a href="#">Forgot Password?</a>
        </div>
        {store.userStore.error && (
          <div style={{ marginTop: "20px" }}>
            <span style={{ color: "#DB2626", fontSize: "14px" }}>
              {store.userStore.errorText}
            </span>
          </div>
        )}
        <div>
          <LoginButton
            style={{ backgroundColor: Colors.THEME_BLUE }}
            onClick={this.login}
          >
            Login
          </LoginButton>
        </div>
        <div>
          <LoginButton style={{ backgroundColor: "#3974d7" }}>
            Login with Facebook
          </LoginButton>
        </div>
        <div style={{ paddingTop: 100 }}>
          <h4>
            <b>Don’t Have an Account?</b>
          </h4>
        </div>
        <div>
          <LoginButton
            style={{ backgroundColor: Colors.THEME_BLUE, marginBottom: 20, fontSize: "1.2em" }}
            onClick={this.signUp}
          >
            Sign Up
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
