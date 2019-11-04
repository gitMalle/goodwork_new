import React, { Component } from "react";
import styled from "styled-components";
import Colors from "../Colors";
import { Grid, Row, Col } from "react-bootstrap";
import Popup from "reactjs-popup";
import "../index.css";

const RequestSentModal = ({}) => {
  return (
    <div>
      <h1 style={{ marginTop: 70 }}>
        <b>Request Sent</b>
      </h1>
      <h2 style={{ marginTop: 70 }}>
        Check the Job requests tab to track your request!
      </h2>
      <MsgBtn>Jobs</MsgBtn>
      <Close className="close-button" />
    </div>
  );
};

const MsgBtn = styled.button`
  font-size: 160%;
  border: none;
  border-radius: 50px;
  background: #ff686b;
  color: white;
  box-shadow: 0px 3px 20px 0px rgba(43, 155, 220, 0.5);
  width: 9em;
  height: 2em;
  margin: 50px 0;
`;

const Close = styled.div`
  position: absolute;
  right: 30px;
  top: 30px;
  height: 30px;
  width: 30px;
  background-color: #ff686b;
  border-radius: 5px;
`;

export default RequestSentModal;
