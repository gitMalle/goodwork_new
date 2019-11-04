import React, { Component } from "react";
import styled from "styled-components";
import Colors from "../Colors";
import { Grid, Row, Col } from "react-bootstrap";
import Popup from "reactjs-popup";
import "../index.css";

import MessageSent from "../components/MessageSentModal";
import RequestSent from "../components/RequestSentModal";
import SendMessage from "../components/SendMessageModal";
import Header from "../components/HeaderBar";

const NoMessages = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export default class ServiceScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendingMsg: false,
      sentMsg: false,
      sendingReq: false
    };
  }

  render() {
    return (
      <NoMessages>
        <span style={{ fontSize: "25px" }}>No jobs available.</span>
      </NoMessages>
    );
  }

  // render() {
  //   return (
  //     <div
  //       style={{
  //         background: Colors.THEME_BG,
  //         paddingBottom: 200,
  //         paddingTop: 100
  //       }}
  //     >
  //       <Grid style={{ width: "80%" }}>
  //         <h1>Carpet Cleaning Inc. </h1>
  //         <Row>
  //           <Col md={7}>
  //             <div>
  //               <div
  //                 style={{
  //                   backgroundColor: "#d8d8d8",
  //                   border: "#979797 1px solid",
  //                   height: "50vmin"
  //                 }}
  //               />
  //               <div
  //                 style={{
  //                   display: "flex",
  //                   flexWrap: "wrap",
  //                   margin: "0 -10px"
  //                 }}
  //               >
  //                 <SmallPic />
  //                 <SmallPic />
  //                 <SmallPic />
  //                 <SmallPic />
  //               </div>
  //             </div>
  //           </Col>
  //           <Col md={5}>
  //             <ActionBox>
  //               <h2>Send Message</h2>
  //               <h4>Send a message to supplier</h4>
  //               <ActionBtn onClick={() => this.setState({ sendingMsg: true })}>
  //                 Message
  //               </ActionBtn>
  //             </ActionBox>
  //             <ActionBox style={{ marginTop: 25 }}>
  //               <h2>Send Request</h2>
  //               <h4>Send a request for a service</h4>
  //               <ActionBtn onClick={() => this.setState({ sendingReq: true })}>
  //                 Send Request
  //               </ActionBtn>
  //             </ActionBox>
  //           </Col>
  //         </Row>
  //       </Grid>
  //       <InfoDiv>
  //         <h2>
  //           <b>About</b>
  //         </h2>
  //         <h4>
  //           <b>Cities Covered: Taguig, Makati, Pasay</b>{" "}
  //         </h4>
  //         <h4>
  //           <b>Service Days: Monday, Wednesday, Friday</b>
  //         </h4>
  //         <h4>
  //           <b>Rating: 4</b>
  //         </h4>
  //         <h4>
  //           "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  //           eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
  //           ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
  //           aliquip ex ea commodo consequat. Duis aute irure dolor in
  //           reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
  //           pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
  //           culpa qui officia deserunt mollit anim id est laborum."
  //         </h4>
  //         <h2>
  //           <b>Reviews</b>
  //         </h2>
  //         <h4>
  //           "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  //           eiusmod tempor incididunt ut labore et dolore magna aliqua. - Nitesh
  //           Purswani
  //         </h4>
  //         <h4>
  //           "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  //           eiusmod tempor incididunt ut labore et dolore magna aliqua. - Nitesh
  //           Purswani
  //         </h4>
  //       </InfoDiv>
  //       <Popup
  //         open={this.state.sendingMsg}
  //         onClose={() => {
  //           this.setState({ sendingMsg: false });
  //         }}
  //         contentStyle={{
  //           borderRadius: 15,
  //           textAlign: "center",
  //           width: "90vmin"
  //         }}
  //         modal
  //         closeOnDocumentClick
  //       >
  //         <SendMessage />
  //       </Popup>
  //       <Popup
  //         open={this.state.sentMsg}
  //         onClose={() => {
  //           this.setState({ sentMsg: false });
  //         }}
  //         contentStyle={{
  //           borderRadius: 15,
  //           textAlign: "center",
  //           width: "90vmin"
  //         }}
  //         modal
  //         closeOnDocumentClick
  //       >
  //         <MessageSent />
  //       </Popup>
  //       <Popup
  //         open={this.state.sendingReq}
  //         onClose={() => {
  //           this.setState({ sendingReq: false });
  //         }}
  //         contentStyle={{
  //           borderRadius: 15,
  //           textAlign: "center",
  //           width: "90vmin"
  //         }}
  //         modal
  //         closeOnDocumentClick
  //       >
  //         <RequestSent />
  //       </Popup>
  //     </div>
  //   );
  // }
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
