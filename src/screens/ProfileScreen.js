import React, { Component } from "react";
import styled from "styled-components";
import Colors from "../Colors";
import { Grid, Row, Col } from "react-bootstrap";
import Popup from "reactjs-popup";
import Gallery from "react-grid-gallery";
import "../index.css";

import MessageSent from "../components/MessageSentModal";
import RequestSent from "../components/RequestSentModal";
import SendMessage from "../components/SendMessageModal";
import Header from "../components/HeaderBar";
import store from "../stores";

const NoMessages = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

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

export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendingMsg: false,
      sentMsg: false,
      sendingReq: false
    };
  }

  renderNoMsg() {
    return (
      <NoMessages>
        <span style={{ fontSize: "25px" }}>No jobs available.</span>
      </NoMessages>
    );
  }

  render() {
    const cities = store.userStore.service_cities.map((id, index) => {
      return all_cities[index].name;
    });
    const days = store.userStore.service_days.map((id, index) => {
      return all_days[index].name;
    });
    return (
      <div
        style={{
          background: Colors.THEME_BG,
          paddingBottom: 200,
          paddingTop: 100
        }}
      >
        <Grid style={{ width: "80%" }}>
          <h1>Carpet Cleaning Inc. </h1>
          <Row>
            <Col md={7}>
              <div>
                <div>
                  <img
                    src={
                      store.userStore.user.asset
                        ? store.userStore.user.asset.path
                        : require("../assets/profile_icon.png")
                    }
                    style={{
                      cursor: "pointer",
                      height: "50vmin"
                    }}
                  />
                </div>

                <div style={{ display: "flex" }}>
                  <div style={{ flex: 1 }}>
                    <Gallery
                      images={store.userStore.getGalleryImages}
                      backdropClosesModal
                    />
                  </div>
                </div>
              </div>
            </Col>
            <Col md={5}>
              <ActionBox>
                <h2>Send Message</h2>
                <h4>Send a message to supplier</h4>
                <ActionBtn onClick={() => this.setState({ sendingMsg: true })}>
                  Message
                </ActionBtn>
              </ActionBox>
              <ActionBox style={{ marginTop: 25 }}>
                <h2>Send Request</h2>
                <h4>Send a request for a service</h4>
                <ActionBtn onClick={() => this.setState({ sendingReq: true })}>
                  Send Request
                </ActionBtn>
              </ActionBox>
            </Col>
          </Row>
        </Grid>
        <InfoDiv>
          <h2>
            <b>About</b>
          </h2>
          <h4>
            <b>Cities Covered: {cities.join(", ")}</b>{" "}
          </h4>
          <h4>
            <b>Service Days: {days.join(", ")}</b>
          </h4>
          {
            // <h4>
            //   <b>Rating: 4</b>
            // </h4>
          }
          <h2>
            <b>Description</b>
          </h2>
          <h4>{store.userStore.user.description}</h4>
          <h2>
            <b>Reviews</b>
          </h2>
          <h4>No reviews yet.</h4>
        </InfoDiv>
        <Popup
          open={this.state.sendingMsg}
          onClose={() => {
            this.setState({ sendingMsg: false });
          }}
          contentStyle={{
            borderRadius: 15,
            textAlign: "center",
            width: "90vmin"
          }}
          modal
          closeOnDocumentClick
        >
          <SendMessage />
        </Popup>
        <Popup
          open={this.state.sentMsg}
          onClose={() => {
            this.setState({ sentMsg: false });
          }}
          contentStyle={{
            borderRadius: 15,
            textAlign: "center",
            width: "90vmin"
          }}
          modal
          closeOnDocumentClick
        >
          <MessageSent />
        </Popup>
        <Popup
          open={this.state.sendingReq}
          onClose={() => {
            this.setState({ sendingReq: false });
          }}
          contentStyle={{
            borderRadius: 15,
            textAlign: "center",
            width: "90vmin"
          }}
          modal
          closeOnDocumentClick
        >
          <RequestSent />
        </Popup>
      </div>
    );
  }
}

const SmallPic = styled.div`
  background-color: #d8d8d8;
  height: 12vmin;
  flex: 1;
  margin: 20px 10px;
  border: #979797 1px solid;
`;

const ActionBox = styled.div`
  background-color: white;
  height: 31vh;
  border-radius: 15px;
  box-shadow: 0px 0px 30px 0px rgba(212, 212, 212, 1);
  padding: 20px 0px 50px 0px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const ActionBtn = styled.button`
  font-size: 160%;
  border: none;
  border-radius: 50px;
  background: ${Colors.THEME_BLUE};
  color: white;
  box-shadow: 0px 3px 20px 0px rgba(43, 155, 220, 0.5);
  width: 9em;
  height: 2em;
`;

const InfoDiv = styled.div`
  margin: 0px 50% 0px 11%;
  color: #5d5d5d;

  @media (max-width: 700px) {
    margin: 0 20px;
  }
`;
