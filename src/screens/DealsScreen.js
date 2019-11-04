import React, { Component } from "react";
import styled from "styled-components";
import Colors from "../Colors";
import { Grid, Row, Col } from "react-bootstrap";
import Popup from "reactjs-popup";
import "../index.css";

import Header from "../components/HeaderBar";
import DealCard from "../components/DealCard";

export default class DealsScreen extends Component {
  constructor(props) {
    super(props);
  }

  renderDeals = () => {
    let rows = [];
    for (let i = 0; i < 3; i++) {
      rows.push(
        <Row>
          <Col md={3}>
            <DealCard />
          </Col>
          <Col md={3}>
            <DealCard />
          </Col>
          <Col md={3}>
            <DealCard />
          </Col>
          <Col md={3}>
            <DealCard />
          </Col>
        </Row>
      );
    }
    return rows;
  };

  render() {
    return (
      <NoMessages>
        <span style={{ fontSize: "25px" }}>No deals available.</span>
      </NoMessages>
    );
  }

  // render() {
  //   return (
  //     <div style={{ paddingBottom: 200 }}>
  //       <Grid style={{ width: "90%" }}>{this.renderDeals()}</Grid>
  //     </div>
  //   );
  // }
}

const NoMessages = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
