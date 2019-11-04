import React, { Component } from "react";
import styled from "styled-components";
import Colors from "../Colors";
import { Grid, Row, Col } from "react-bootstrap";
import "../index.css";
import { observer } from "mobx-react";
import Select from "react-select";
import "react-select/dist/react-select.css";
import history from "../history";
import store from "../stores";

const userStore = store.userStore;

@observer
export default class RegisterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAreas: [],
      selectedDays: [],
      step: 1,
      error: 0
    };
  }

  signUp = () => {
    console.log(userStore.registerInfo);
    userStore.register(this.nextStep);
  };

  checkInputs = () => {
    if (userStore.registerInfo.registerName.trim() === "") {
      this.setState({ error: 1 });
      return false;
    }
    if (
      /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(
        userStore.registerInfo.registerEmailOrPhone
      ) === false &&
      /^09[0-9]+$/.test(userStore.registerInfo.registerEmailOrPhone) === false
    ) {
      this.setState({ error: 2 });
      return false;
    }
    if (userStore.registerInfo.registerPassword.trim() === "") {
      this.setState({ error: 3 });
      return false;
    }

    this.setState({ error: 0 });

    return true;
  };

  registerFailed = () => {
    this.setState({ step: 1 });
  };

  nextStep = () => {
    if (this.checkInputs()) {
      this.setState({ step: this.state.step + 1 });
      this.props.progressBar();
    }
  };

  saveFile = ev => {
    let file = ev.target.files[0];
    console.log(file);
    if (file.type.startsWith("image")) {
      userStore.registerInfo.document = file;
      this.signUp();
    }
  };

  render() {
    switch (this.state.step) {
      case 1:
        return (
          <div>
            <h2 style={{ marginBottom: 50 }}>
              <b>Register</b>
            </h2>
            <div
              style={{ paddingTop: 20, paddingBottom: 10, textAlign: "left" }}
            >
              <Label>Full name or Business name</Label>
            </div>
            <Input
              value={userStore.registerInfo.registerName}
              onChange={ev =>
                (userStore.registerInfo.registerName = ev.target.value)
              }
              error={this.state.error === 1}
            />
            <div
              style={{ paddingTop: 20, paddingBottom: 10, textAlign: "left" }}
            >
              <Label>Email or Phone Number</Label>
            </div>
            <Input
              value={userStore.registerInfo.registerEmailOrPhone}
              onChange={ev =>
                (userStore.registerInfo.registerEmailOrPhone = ev.target.value)
              }
              error={this.state.error === 2}
            />
            <div
              style={{ paddingTop: 20, paddingBottom: 10, textAlign: "left" }}
            >
              <Label>Password</Label>
            </div>
            <Input
              type="password"
              value={userStore.registerInfo.registerPassword}
              onChange={ev =>
                (userStore.registerInfo.registerPassword = ev.target.value)
              }
              style={{ marginBottom: 30 }}
              error={this.state.error === 3}
            />
            {store.userStore.registerError && (
              <div>
                <span style={{ color: "#DB2626", fontSize: "14px" }}>
                  {store.userStore.registerErrorText}
                </span>
              </div>
            )}
            <div>
              <LoginButton
                style={{ backgroundColor: Colors.THEME_BLUE }}
                onClick={this.nextStep}
              >
                Sign Up
              </LoginButton>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 style={{ marginBottom: 50 }}>
              <b>Just a few things before we get started</b>
            </h2>
            <h4>Are you a</h4>
            <LoginButton
              style={{ marginTop: 20 }}
              onClick={() => {
                userStore.registerInfo.registerType = "business";
                this.nextStep();
              }}
            >
              Business
            </LoginButton>
            <h4>or</h4>
            <LoginButton
              style={{ marginTop: 0 }}
              onClick={() => {
                userStore.registerInfo.registerType = "individual";
                this.nextStep();
              }}
            >
              Individual
            </LoginButton>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 style={{ marginBottom: 50 }}>
              <b>Just a few things before we get started</b>
            </h2>
            <div>
              <div>
                <h4>What areas do you service?</h4>
                <Select
                  placeholder=""
                  style={{
                    borderRadius: 20,
                    height: "3em",
                    paddingLeft: 10,
                    verticalAlign: "middle",
                    marginBottom: 30
                  }}
                  wrapperStyle={{ width: "50%", margin: "0 auto" }}
                  value={userStore.registerInfo.registerAreas.slice()}
                  onChange={selected =>
                    userStore.registerInfo.registerAreas.replace(selected)
                  }
                  options={[
                    { value: 1, label: "Makati" },
                    { value: 2, label: "Taguig" },
                    { value: 3, label: "BGC" },
                    { value: 4, label: "Pasay" },
                    { value: 5, label: "Paranaque" },
                    { value: 6, label: "Pasig" },
                    { value: 7, label: "Quezon City" }
                  ]}
                  multi
                />
                <h4>What Days of the week are you free?</h4>
                <Select
                  placeholder=""
                  style={{
                    borderRadius: 20,
                    height: "3em",
                    paddingLeft: 10,
                    verticalAlign: "middle",
                    marginBottom: 30
                  }}
                  wrapperStyle={{ width: "50%", margin: "0 auto" }}
                  value={userStore.registerInfo.registerDays.slice()}
                  onChange={selected =>
                    userStore.registerInfo.registerDays.replace(selected)
                  }
                  options={[
                    { value: 2, label: "Monday" },
                    { value: 3, label: "Tuesday" },
                    { value: 4, label: "Wednesday" },
                    { value: 5, label: "Thursday" },
                    { value: 6, label: "Friday" },
                    { value: 7, label: "Saturday" },
                    { value: 1, label: "Sunday" }
                  ]}
                  multi
                />
              </div>
              <Label style={{ margin: 0 }}>
                Don’t Worry! These are all editable in the profile.
              </Label>
            </div>
            <div>
              <LoginButton
                style={{ backgroundColor: Colors.THEME_BLUE }}
                onClick={() =>
                  userStore.register(
                    () => history.push("/confirm"),
                    this.registerFailed
                  )
                }
              >
                Next
              </LoginButton>
            </div>
          </div>
        );
      // case 4:
      //   return (
      //     <div>
      //       <h2 style={{ marginBottom: 50 }}>
      //         <b>Just a few things before we get started</b>
      //       </h2>
      //       <UploadFile>
      //         Business
      //         <UploadFileInput
      //           type="file"
      //           onChange={ev => {
      //             userStore.registerInfo.registerType = "business";
      //             this.saveFile(ev);
      //           }}
      //         />
      //       </UploadFile>
      //       <Label style={{ margin: 0 }}>
      //         1. Submit photo of Business Certificate to finish sign-up
      //       </Label>
      //       <Label style={{ margin: 0 }}>
      //         2. We will communicate with your primarily with email
      //       </Label>
      //       <UploadFile>
      //         Individual
      //         <UploadFileInput
      //           type="file"
      //           onChange={ev => {
      //             userStore.registerInfo.registerType = "individual";
      //             this.saveFile(ev);
      //           }}
      //         />
      //       </UploadFile>
      //       <Label style={{ margin: 0 }}>
      //         1. Submit photo of a Government ID and a selfie to finish sign-up
      //       </Label>
      //       <Label style={{ margin: 0, marginBottom: 50 }}>
      //         2. We will communicate with your primarily with SMS
      //       </Label>
      //     </div>
      //   );
    }
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

  ${({ error }) =>
    error &&
    `
    border-color: red;
  background: rgba(255,0,0,0.3);
    `};
`;

const LoginButton = styled.button`
  width: 30%;
  height: 2em;
  border-radius: 5px;
  border: none;
  margin-top: 50px;
  color: white;
  font-weight: bold;
  font-size: 1.5em;
  padding: 0px;
  background-color: ${Colors.THEME_BLUE};

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
