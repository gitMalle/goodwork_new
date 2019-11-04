import React, { Component } from "react";
import styled from "styled-components";
import Colors from "../Colors";
import { Grid, Row, Col } from "react-bootstrap";
import Popup from "reactjs-popup";
import { observer } from "mobx-react";
import "../index.css";
import Header from "../components/HeaderBar";
import AuthApi from "../api/user";
import Loading from "../components/LoadingIndicator";
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody
} from "react-accessible-accordion";
// Demo styles, see 'Styles' section below for some notes on use.
import "react-accessible-accordion/dist/fancy-example.css";

import stores from "../stores";
const userStore = stores.userStore;

const all_days = [
  {
    id: 1,
    name: "Sunday"
  },
  {
    id: 2,
    name: "Monday"
  },
  {
    id: 3,
    name: "Tuesday"
  },
  {
    id: 4,
    name: "Wednesday"
  },
  {
    id: 5,
    name: "Thursday"
  },
  {
    id: 6,
    name: "Friday"
  },
  {
    id: 7,
    name: "Saturday"
  }
];

const all_cities = [
  {
    id: 1,
    name: "Makati"
  },
  {
    id: 2,
    name: "Taguig"
  },
  {
    id: 3,
    name: "BGC"
  },
  {
    id: 4,
    name: "Pasay"
  },
  {
    id: 5,
    name: "Paranaque"
  },
  {
    id: 6,
    name: "Pasig"
  },
  {
    id: 7,
    name: "Quezon City"
  }
];

@observer
export default class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      description: ""
    };
  }

  checkDay = ev => {
    let id = ev.target.id - 0;
    if (!this.days.includes(id)) {
      userStore.service_days.push(id);
    } else {
      userStore.service_days.splice(this.days.indexOf(id), 1);
    }
    console.log(userStore.service_days.slice());
  };

  checkCity = ev => {
    let id = ev.target.id - 7;
    if (!userStore.service_cities.includes(id)) {
      userStore.service_cities.push(id);
    } else {
      userStore.service_cities.splice(userStore.service_cities.indexOf(id), 1);
    }
  };

  renderDays = () => {
    return all_days.map(day => {
      return (
        <div className="checkbox">
          <input
            type="checkbox"
            id={day.id}
            defaultChecked={userStore.service_days.includes(day.id)}
            onChange={this.checkDay}
          />
          <label htmlFor={day.id} />
          <Label style={{ paddingTop: 10, paddingLeft: 30 }}>{day.name}</Label>
        </div>
      );
    });
  };

  renderCities = () => {
    return all_cities.map(city => {
      return (
        <div className="checkbox">
          <input
            type="checkbox"
            id={city.id + 7}
            defaultChecked={userStore.service_cities.includes(city.id)}
            onChange={this.checkCity}
          />
          <label for={city.id + 7} />
          <Label style={{ paddingTop: 10, paddingLeft: 30 }}>{city.name}</Label>
        </div>
      );
    });
  };

  send = async () => {
    console.log("here");
    userStore.updateDays();
    userStore.updateAreas();
    if (this.state.name !== userStore.user.name) {
      userStore.updateName(this.state.name);
    }
    if (this.state.email !== userStore.user.email) {
      userStore.updateEmail(this.state.email);
    }
    if (this.state.description.length > 0) {
      userStore.updateDescription(this.state.description);
    }
    if (userStore.getCheckedCats.length > 0) {
      userStore.updateServices();
    }
  };

  saveProfilePic = ev => {
    let file = ev.target.files[0];
    console.log(file);
    if (file.type.startsWith("image")) {
      userStore.updateProfilePic(file);
    }
  };

  uploadPortfolioItem = ev => {
    let file = ev.target.files[0];
    console.log(file);
    console.log("here");
    if (file.type.startsWith("image")) {
      userStore.uploadPortfolioItem(file);
    }
  };

  uploadDocuments = ev => {
    let file = ev.target.files[0];
    console.log(file);
    console.log("here");
    if (file.type.startsWith("image")) {
      userStore.uploadDocumentsTwo(file);
    }
  };

  componentDidMount() {
    this.days = userStore.service_days.slice();
    userStore.getDays();
    userStore.getCities();
    this.setState({
      name: userStore.user.name,
      email: userStore.user.email,
      description: userStore.user.description
    });
  }

  renderCategories() {
    return (
      <Accordion>
        {userStore.categories.map((cat, i) => {
          return (
            <AccordionItem>
              <AccordionItemTitle>{cat.name}</AccordionItemTitle>
              {cat.children.map((cat2, o) => {
                return (
                  <AccordionItemBody
                    onClick={() => {
                      userStore.checkCat(i, o);
                      this.forceUpdate();
                    }}
                  >
                    <p>
                      {cat2.name}{" "}
                      {cat2.checked && (
                        <img
                          style={{ height: "20px" }}
                          src={require("../assets/checkmark.png")}
                        />
                      )}
                    </p>
                  </AccordionItemBody>
                );
              })}
            </AccordionItem>
          );
        })}
      </Accordion>
    );
  }

  onChangeDescription = e => {
    this.setState({ description: e.target.value });
  };

  render() {
    return (
      <div style={{ backgroundColor: Colors.THEME_BG, minHeight: "92vh" }}>
        {userStore.loading && <Loading />}
        <Grid>
          <Row style={{ marginTop: 30, textAlign: "center" }}>
            <Col md={2}>
              <input
                id="profilepic"
                type="file"
                ref={ref => (this.profilepic = ref)}
                style={{ display: "none" }}
                onChange={this.saveProfilePic}
              />
              <img
                src={
                  userStore.user.asset
                    ? userStore.user.asset.path
                    : require("../assets/profile_icon.png")
                }
                onClick={() => this.profilepic.click()}
                style={{ cursor: "pointer", width: 70, height: 70 }}
              />
            </Col>
            <Col md={8}>
              <div style={{ textAlign: "left" }}>
                <Label>Business name</Label>
              </div>
              <Input
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
              />
              <div style={{ textAlign: "left" }}>
                <Label>Email</Label>
              </div>
              <Input
                value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: 30 }}>
            <Col md={6}>
              <Label>Days available:</Label>
              <div>{this.renderDays()}</div>
            </Col>
            <Col md={6}>
              <Label>Cities available:</Label>
              <div>{this.renderCities()}</div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Description
                placeholder="Add a description..."
                value={this.state.description}
                onChange={this.onChangeDescription}
              />
            </Col>
          </Row>
          <Row>
            <h1>Change Services</h1>
            <Col md={12}>{this.renderCategories()}</Col>
          </Row>
          <Row>
            <h1>Upload Documents</h1>
            <p>Choose Document Pictures</p>
            <p>Documents uploaded: {`${userStore.getDocuments.length}`}</p>
            <input onChange={this.uploadDocuments} type={"file"} />
          </Row>
          <Row>
            <h1>Upload Works</h1>
            <p>Choose Portfolio To Upload</p>
            <p>Images uploaded: {`${userStore.getGalleryImages.length}`}</p>
            <input onChange={this.uploadPortfolioItem} type={"file"} />
          </Row>
        </Grid>
        <div style={{ textAlign: "center" }}>
          <SendButton onClick={this.send}>Save changes</SendButton>
        </div>
      </div>
    );
  }
}

const Label = styled.p`
  color: #afafaf;
  margin: 0;
  margin-left: 5%;
`;

const UploadFileInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const Input = styled.input`
  width: 100%;
  height: 3em;
  border: #d4d4d4 solid 1px;
  border-radius: 50px;
  padding-left: 20px;
  outline: none;

  @media (max-width: 700px) {
    width: 90%;
  }
`;

const SendButton = styled.button`
  width: 30%;
  height: 2em;
  border-radius: 5px;
  border: none;
  margin-top: 20px;
  color: white;
  font-weight: bold;
  font-size: 1.5em;
  padding: 0px;
  background-color: ${Colors.THEME_BLUE};

  @media (max-width: 700px) {
    width: 80%;
  }
`;

const Description = styled.textarea`
  width: 100%;
  height: 12em;
  margin-top: 20px;
  background-color: white;
  border: #d4d4d4 1px solid;
  padding: 20px;
  font-size: 1.5em;
  border-radius: 5px;
  resize: none;
  outline: none;
`;
