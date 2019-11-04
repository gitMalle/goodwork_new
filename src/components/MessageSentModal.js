import React, { Component } from "react";
import styled from "styled-components";
import Colors from "../Colors";
import "../index.css";

const MessageSentModal = ({}) => {
  return (
    <div>
      <h1 style={{ marginTop: 70 }}>
        <b>Message Sent</b>
      </h1>
      <h2 style={{ marginTop: 70 }}>
        Check the Messages requests tab to track your message!
      </h2>
      <MsgBtn>Messages</MsgBtn>
      <Close className="close-button" />
    </div>
  );
};

const MsgBtn = styled.button`
  font-size: 160%;
  border: none;
  border-radius: 50px;
  background: ${Colors.THEME_BLUE};
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
  background-color: ${Colors.THEME_BLUE};
  border-radius: 5px;
`;

export default MessageSentModal;
