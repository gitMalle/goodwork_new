import React, { Component } from "react";
import styled from "styled-components";
import Colors from "../Colors";
import { Grid, Row, Col } from "react-bootstrap";
import "../index.css";

const ChatMessage = ({ msg }) => {
  return (
    <div style={{ width: "100%", overflow: "auto" }}>
      <MsgBox>
        <p style={{ color: "white" }}>{msg}</p>
      </MsgBox>
    </div>
  );
};

const MsgBox = styled.div`
  background-color: ${Colors.THEME_BLUE};
  padding: 20px;
  width: 40%;
  margin: 10px 20px;
  float: right;
  overflow: hidden;
  word-wrap: break-word;
  border-radius: 20px;

  @media (max-width: 700px) {
    width: 80%;
  }
`;

export default ChatMessage;
