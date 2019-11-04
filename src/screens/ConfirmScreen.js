import React, { Component } from "react";
import styled from "styled-components";
import Colors from "../Colors";
import { Grid, Row, Col } from "react-bootstrap";
import Popup from "reactjs-popup";
import "../index.css";
import { observer } from "mobx-react";
import history from "../history";
import { Line } from "rc-progress";
import store from "../stores";
import Loading from "../components/LoadingIndicator";

const userStore = store.userStore;

@observer
export default class ConfirmScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 3
    };
  }

  saveFile = ev => {
    let file = ev.target.files[0];
    console.log(file);
    if (file.type.startsWith("image")) {
      userStore.registerInfo.document = file;
      userStore.uploadDocuments();
      history.push("/");
    }
  };

  renderContent = () => {
    switch (this.state.step) {
      case 3:
        return (
          <div>
            <h1>We sent you an email! Please check and verify your account.</h1>
            <Button
              style={{ backgroundColor: Colors.THEME_BLUE }}
              onClick={() =>
                userStore.loginPostRegister(() =>
                  this.setState({ step: this.state.step + 1 })
                )
              }
            >
              I confirmed my email
            </Button>
            <Label
              style={{ margin: "30px 0", cursor: "pointer" }}
              onClick={() => userStore.resendEmailToken()}
            >
              Resend the code
            </Label>
          </div>
        );
      case 4:
        return (
          <div>
            <h1>Upload Documents</h1>
            <UploadFile>
              Choose File
              <UploadFileInput
                type="file"
                onChange={ev => {
                  this.saveFile(ev);
                }}
              />
            </UploadFile>
            <Label style={{ margin: 0 }}>
              {userStore.registerInfo.registerType === "business"
                ? "1. Submit photo of Business Certificate to finish sign-up"
                : "1. Submit photo of a Government ID and a selfie to finish sign-up"}
            </Label>
            <Label style={{ margin: 0 }}>
            {userStore.registerInfo.registerType === "business"
                ? "2. We will communicate with your primarily with email"
                : "2. We will communicate with your primarily with SMS"}
            </Label>
            <Label
              style={{ margin: "30px 0", cursor: "pointer" }}
              onClick={() => history.push("/")}
            >
              Skip this step
            </Label>
          </div>
        );
    }
  };

  render() {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: Colors.THEME_BG,
          textAlign: "center",
          display: "table"
        }}
      >
        <div style={{ display: "table-cell", verticalAlign: "middle" }}>
          {this.renderContent()}
          <Line
            percent={this.state.step * 25}
            strokeWidth={1.5}
            trailWidth={1.5}
            strokeColor={Colors.THEME_BLUE}
            style={{ margin: "30px 5% 0 5%" }}
          />
        </div>
        {userStore.loading && <Loading text="Checking..." />}
      </div>
    );
  }
}

const Label = styled.p`
  color: #afafaf;
  margin: 0;
`;

const Button = styled.button`
  width: 30%;
  height: 2em;
  border-radius: 5px;
  border: none;
  margin-top: 50px;
  color: white;
  font-weight: bold;
  font-size: 1.5em;
  padding: 0px;

  @media (max-width: 700px) {
    width: 80%;
  }
`;

const UploadFileInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const UploadFile = styled.label`
  width: 30%;
  line-height: 2em;
  border-radius: 5px;
  border: none;
  margin-top: 50px;
  color: white;
  font-weight: bold;
  font-size: 1.5em;
  padding: 0px;
  background-color: ${Colors.THEME_BLUE};
  cursor: pointer;

  @media (max-width: 700px) {
    width: 80%;
  }
`;
