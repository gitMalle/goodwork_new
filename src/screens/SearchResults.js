import React, { Component } from "react";
import styled from "styled-components";
import Colors from "../Colors";
import { Grid, Row, Col } from "react-bootstrap";
import Popup from "reactjs-popup";
import "../index.css";
import { observer } from "mobx-react";
import stores from "../stores";

import ResultCard from "../components/ResultCard";
import LoginModal from "../components/LoginModal";
import SentAll from "../components/SentToAllModal";
import Header from "../components/HeaderBar";

const userStore = stores.userStore;

@observer
export default class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: false,
      showSentAll: false
    };
  }

  renderResults = () => {
    return mockData.map(res => {
      return (
        <Row>
          <Col md={3}>
            <ResultCard
              company={res.company}
              rate={res.rate}
              rating={res.rating}
              modalfnc={() => this.setState({ showLogin: true })}
            />
          </Col>
          <Col md={3}>
            <ResultCard
              company={res.company}
              rate={res.rate}
              rating={res.rating}
              modalfnc={() => this.setState({ showLogin: true })}
            />
          </Col>
          <Col md={3}>
            <ResultCard
              company={res.company}
              rate={res.rate}
              rating={res.rating}
              modalfnc={() => this.setState({ showLogin: true })}
            />
          </Col>
          <Col md={3}>
            <ResultCard
              company={res.company}
              rate={res.rate}
              rating={res.rating}
              modalfnc={() => this.setState({ showLogin: true })}
            />
          </Col>
        </Row>
      );
    });
  };

  render() {
    return (
      <div
        style={{
          background: Colors.THEME_BG,
          paddingBottom: 200
        }}
      >
        <Header login={() => this.setState({ showLogin: true })} />
        <RequestBox>
          <h3>
            <b>Send a Request to All Suppliers</b>
          </h3>
          <RequestButton
            onClick={() => {
              this.setState({ showSentAll: true });
            }}
          >
            Submit
          </RequestButton>
        </RequestBox>
        <Grid style={{ width: "90%" }} className="show-grid">
          <Row>
            <Col md={6}>
              <h2>
                <b>Search Results</b>
              </h2>
            </Col>
            <Col md={4}>
              <LocationPicker>
                <option value="" disabled selected hidden>
                  Location
                </option>
                <option>Makati</option>
                <option>Taguig</option>
                <option>BGC</option>
                <option>Pasay</option>
              </LocationPicker>
            </Col>
            <Col md={2}>
              <DatePicker>
                <h2>March 22</h2>
              </DatePicker>
            </Col>
          </Row>
          {this.renderResults()}
        </Grid>
        <PageCount>
          <h1>1</h1>
        </PageCount>
        <Popup
          open={!userStore.isLoggedIn && this.state.showLogin}
          onClose={() => {
            this.setState({ showLogin: false });
          }}
          contentStyle={{
            borderRadius: 15,
            textAlign: "center",
            width: "90vmin"
          }}
          modal
          closeOnDocumentClick
          lockScroll
        >
          <LoginModal />
        </Popup>
        <Popup
          open={this.state.showSentAll}
          onClose={() => {
            this.setState({ showSentAll: false });
          }}
          contentStyle={{
            borderRadius: 15,
            textAlign: "center",
            width: "90vmin"
          }}
          modal
          closeOnDocumentClick
          lockScroll
        >
          <SentAll />
        </Popup>
      </div>
    );
  }
}

const RequestBox = styled.div`
  background-color: white;
  text-align: center;
  margin: 50px 0px 50px 0px;
  width: 75%;
  margin-left: 12.5%;
  border: #d4d4d4 solid 1px;
  border-radius: 10px;
`;

const RequestButton = styled.button`
  font-size: 2em;
  border: none;
  border-radius: 50px;
  background: ${Colors.THEME_BLUE};
  color: white;
  box-shadow: 0px 4px 20px 0px rgba(43, 155, 220, 0.5);
  width: 25vh;
  height: 2em;
  margin: 30px;
`;

const LocationPicker = styled.select`
  width: 80%;
  height: 3em;
  border: none;
  border-radius: 50px;
  padding-left: 20px;
  color: grey;
`;

const DatePicker = styled.div`
  border: #d4d4d4 solid 1px;
  height: 4em;
  width: 12em;
  background: white;
  border-radius: 5px;
  font-weight: bold;
  color: #d4d4d4;
  text-align: center;
`;

const PageCount = styled.div`
  border: #d4d4d4 solid 1px;
  height: 5em;
  width: 5em;
  background: white;
  border-radius: 5px;
  font-weight: bold;
  text-align: center;
  position: absolute;
  right: 9%;
`;

let mockData = [
  {
    company: "Cleaners Inc.",
    rate: "95%",
    rating: "4.5"
  },
  {
    company: "Cleaners Inc.",
    rate: "95%",
    rating: "4.5"
  },
  {
    company: "Cleaners Inc.",
    rate: "95%",
    rating: "4.5"
  },
  {
    company: "Cleaners Inc.",
    rate: "95%",
    rating: "4.5"
  }
];
