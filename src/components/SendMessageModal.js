import React, { Component } from "react";
import styled from "styled-components";
import Colors from "../Colors";
import { Grid, Row, Col } from "react-bootstrap";
import Popup from "reactjs-popup";
import "../index.css";

const SendMessageModal = ({}) => {
  return (
    <div>
      <h1 style={{ marginTop: 70 }}>
        <b>Send Message</b>
      </h1>
      <h3 style={{ marginTop: 20 }}>Send a Message to this Supplier</h3>
      <Input placeholder="Type something" />
      <ActionBtn>Send</ActionBtn>
      <ActionBtn style={{ backgroundColor: "white", color: "#555", boxShadow: "0px 3px 20px 0px rgba(85, 85, 85, 0.5)" }}>Cancel</ActionBtn>
      <Close className="close-button" />
    </div>
  );
};

const ActionBtn = styled.button`
  font-size: 160%;
  border: none;
  border-radius: 50px;
  background: #ff686b;
  color: white;
  box-shadow: 0px 3px 20px 0px rgba(255, 104, 107, 0.5);
  width: 8em;
  height: 2.5em;
  margin: 10px;
`;

const Input = styled.textarea`
  width: 80%;
  height: 12em;
  margin-top: 20px;
  background-color: #f4f7f9;
  border: #a5a5a5 1px solid;
  padding: 20px;
  font-size: 1.5em;
  border-radius: 5px;
  resize: none;
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

export default SendMessageModal;
