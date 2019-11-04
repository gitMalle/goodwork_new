import React, { Component } from "react";
import styled from "styled-components";
import Colors from "../Colors";
import { Grid, Row, Col } from "react-bootstrap";
import "../index.css";

const SentToAllModal = ({}) => {
    return (
        <div>
            <h2 style={{ color: "#636363", margin: "50px 0px 80px 0px" }}>Send to all popup</h2>
            <img src={"http://via.placeholder.com/350x350"} />
            <h3 style={{ color: "#636363", margin: "50px 0px 30px 0px" }}>We have sent your job request to 21 different service providers! </h3>
            <CloseBtn><b>Close</b></CloseBtn>
        </div>
    )
}

const CloseBtn = styled.button`
  font-size: 160%;
  border: none;
  border-radius: 50px;
  background: ${Colors.THEME_BLUE};
  color: white;
  box-shadow: 0px 3px 20px 0px rgba(43, 155, 220, 0.5);
  width: 16em;
  height: 2.5em;
  margin: 50px 0;
`;

export default SentToAllModal;