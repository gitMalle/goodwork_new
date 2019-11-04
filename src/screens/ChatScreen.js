import React, { Component } from "react";
import styled from "styled-components";
import Colors from "../Colors";
import { Grid, Row, Col } from "react-bootstrap";
import Popup from "reactjs-popup";
import "../index.css";
import Sidebar from "react-sidebar";
import io from "socket.io-client";
import Header from "../components/HeaderBar";

import ChatMessage from "../components/ChatMessage";

const mql = window.matchMedia(`(min-width: 800px)`);

export default class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true,
      sidebarDocked: true,
      user: "Dani",
      msg: "",
      messages: []
    };

    this.socket = io("localhost:8080");
    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);

    this.socket.on("RECEIVE_MESSAGE", function(data) {
      addMessage(data);
    });

    const addMessage = data => {
      console.log(data);
      this.setState({ messages: [...this.state.messages, data] });
      console.log(this.state.messages);
    };
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
    this.setState({ mql: mql, sidebarDocked: mql.matches });
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches });
  }

  renderChats = () => {
    let chats = [];
    for (let i = 0; i < 4; i++) {
      chats.push(
        <ChatDiv onClick={() => console.log("asas")}>
          <div style={{ flex: "1", textAlign: "center" }}>
            <img
              style={{ borderRadius: "50%" }}
              src={"http://via.placeholder.com/50x50"}
            />
          </div>
          <div style={{ flex: "3" }}>
            <h4>First Last</h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempo…
            </p>
          </div>
        </ChatDiv>
      );
    }
    return chats;
  };

  renderSideBar = () => {
    return (
      <div>
        <Chats>{this.renderChats()}</Chats>
      </div>
    );
  };

  sendMsg = () => {
    console.log(this.state.msg);
    this.socket.emit("SEND_MESSAGE", {
      user: this.state.user,
      message: this.state.msg
    });
    this.setState({ msg: "" });
  };

  renderMessages = () => {
    return this.state.messages.map(msg => {
      return <ChatMessage msg={msg.user + ": " + msg.message} />;
    });
  };

  // render() {
  //   return (
  //     <div>
  //       <Sidebar
  //         sidebar={this.renderSideBar()}
  //         open={this.state.sidebarOpen}
  //         docked={this.state.sidebarDocked}
  //         onSetOpen={open => this.setState({ sidebarOpen: open })}
  //         styles={{ overlay: { backgroundColor: "rgba(0, 0, 0, 0)" } }}
  //         shadow={false}
  //       >
  //         <div
  //           style={{
  //             backgroundColor: "#f4f7f9",
  //             position: "absolute",
  //             top: "8vh",
  //             bottom: "50px",
  //             width: "100%",
  //             overflow: "auto"
  //           }}
  //         >
  //           {!mql.matches && (
  //             <div
  //               id="toggle"
  //               onClick={() => this.setState({ sidebarOpen: true })}
  //             >
  //               <div class="one" />
  //               <div class="two" />
  //               <div class="three" />
  //             </div>
  //           )}
  //           {this.renderMessages()}
  //         </div>
  //
  //         <ChatBar>
  //           <ChatInput
  //             value={this.state.msg}
  //             onChange={ev => this.setState({ msg: ev.target.value })}
  //             onKeyPress={ev => {
  //               if (ev.key === "Enter") this.sendMsg();
  //             }}
  //           />
  //         </ChatBar>
  //       </Sidebar>
  //     </div>
  //   );
  // }

  render() {
    return (
      <NoMessages>
        <span style={{ fontSize: "25px" }}>No chats available.</span>
      </NoMessages>
    );
  }
}

const NoMessages = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Chats = styled.div`
  height: 92vh;
  width: 20vw;
  background-color: #f4f7f9;
  border-right: #979797 solid 1px;
  margin-top: 8vh;

  @media (max-width: 700px) {
    width: 80vw;
  }
`;

const ChatDiv = styled.div`
  height: 12vh;
  background-color: #f4f7f9;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #dee5e9;
  }
`;

const ChatBar = styled.div`
  height: 50px;
  background-color: white;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  border-top: #979797 solid 1px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ChatInput = styled.input`
  width: 98%;
  height: 40px;
  background-color: #f4f7f9;
  border: #979797 solid 1px;
  border-radius: 50px;
  padding: 0 20px;
  font-size: 1.2em;
  outline: none;
`;
