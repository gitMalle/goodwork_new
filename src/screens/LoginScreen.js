import React, { Component } from "react";
import styled, { css } from "styled-components";
import Colors from "../Colors";
import { Grid, Row, Col } from "react-bootstrap";
import "../index.css";
import Popup from "reactjs-popup";
import LoginModal from "../components/LoginModal";
import RegisterModal from "../components/RegisterModal";
import RegisterSupplierModal from "../components/RegisterSupplierModal";
import { observer } from "mobx-react";
import stores from "../stores";
import { Line } from "rc-progress";
import Loading from "../components/LoadingIndicator";

const userStore = stores.userStore;

const healthcareIcon = require("../assets/healthcare.png");
const eventIcon = require("../assets/event.png");
const educationIcon = require("../assets/education.png");
const automotiveIcon = require("../assets/automotive.png");
const homeIcon = require("../assets/home.png");
const businessIcon = require("../assets/business.png");

const searchServices = require("../assets/searchservices.png");
const selectOffer = require("../assets/selectoffer.png");
const projectAnnounced = require("../assets/projectann.png");
const postProject = require("../assets/postproj.png");

const logoFile = require("../assets/logo.png");
const whiteLogoFile = require("../assets/logowhite.png");

const Logo = styled.img`
  width: 300px;
  height: 56px;
`;

const IconText = styled.span`
  padding: 10px 0px 10px 0px;
  display: block;
  font-weight: bold;
  text-align: center;
`;

@observer
export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: false,
      showRegister: false,
      registerProgress: 0,
      loadText: ""
    };
  }

  render() {
    return (
      <div>
        {userStore.loading && <Loading text={this.state.loadText} />}
        <TopBar>
          <div>
            <Logo src={logoFile} />
          </div>
          <div>
            <HeaderBtn
              onClick={() => {
                userStore.isSupplier = true;
                this.setState({
                  showRegister: true,
                  loadText: "Creating your account..."
                });
              }}
            >
              Become A Supplier
            </HeaderBtn>
            <NavBtn>About</NavBtn>
            <NavBtn>FAQ</NavBtn>
            <NavBtn
              onClick={() =>
                this.setState({ showLogin: true, loadText: "Logging in..." })
              }
            >
              Log In
            </NavBtn>
          </div>
        </TopBar>

        <Grid style={{ width: "100%" }}>
          <Row>
            <Col md={6} style={{ height: "90vh", textAlign: "center" }}>
              <div style={{ position: "relative", top: "20%" }}>
                <HeaderText>Empowering Services</HeaderText>
                <Subtext>
                  Subtext goes here "Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit, sed do eiusmod "Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit,
                </Subtext>
                <HeaderBtn
                  onClick={() => this.setState({ showRegister: true })}
                >
                  Sign Up
                </HeaderBtn>
              </div>
            </Col>
            <Col md={6} style={{ height: "90vh", textAlign: "center" }}>
              <div
                style={{
                  position: "relative",
                  top: "20%"
                }}
              >
                <HeaderText>What are you looking for?</HeaderText>
                <Subtext>
                Coming Soon!
                </Subtext>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly"
                  }}
                >
                  <div>
                    <img
                      style={{
                        maxWidth: "20vw",
                        height: "150px",
                        display: "block"
                      }}
                      src={healthcareIcon}
                    />
                    <IconText>Healthcare & Fitness</IconText>
                  </div>
                  <div>
                    <img
                      style={{
                        maxWidth: "20vw",
                        height: "150px",
                        display: "block"
                      }}
                      src={educationIcon}
                    />
                    <IconText>Education & Training</IconText>
                  </div>
                  <div>
                    <img
                      style={{
                        maxWidth: "20vw",
                        height: "150px",
                        display: "block"
                      }}
                      src={homeIcon}
                    />
                    <IconText>Home & Construction</IconText>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly"
                  }}
                >
                  <div>
                    <img
                      style={{
                        maxWidth: "20vw",
                        height: "150px",
                        display: "block"
                      }}
                      src={automotiveIcon}
                    />{" "}
                    <IconText>Automotive Services</IconText>
                  </div>
                  <div>
                    <img
                      style={{
                        maxWidth: "20vw",
                        height: "150px",
                        display: "block"
                      }}
                      src={eventIcon}
                    />{" "}
                    <IconText>Event Services</IconText>
                  </div>
                  <div>
                    <img
                      style={{
                        maxWidth: "20vw",
                        height: "150px",
                        display: "block"
                      }}
                      src={businessIcon}
                    />{" "}
                    <IconText>Business Services</IconText>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Grid>
        {/* ////////////////////////////////////// */}
        <Gradient>
          <h2>How It Works</h2>
          <h3 style={{ marginBottom: "30px" }}>
            Goodwork helps customers hire the best local skilled service
            professionals, and helps entrepreneurs to find new customers to grow
            their businesses.
          </h3>
          <div style={{ marginBottom: "30px" }}>
            <Grid>
              <Row>
                <Col md={3}>
                  <img src={searchServices} />
                </Col>
                <Col md={3}>
                  <img src={projectAnnounced} />
                </Col>
                <Col md={3}>
                  <img src={postProject} />
                </Col>
                <Col md={3}>
                  <img src={selectOffer} />
                </Col>
              </Row>
            </Grid>
          </div>
        </Gradient>
        {
          /* ////////////////////////////////////// */
          // <Grid style={{ width: "80%", marginTop: 50 }}>
          //   <h2>Featured Pros</h2>
          //   <Row style={{ textAlign: "center" }}>
          //     <Col md={3}>
          //       <img src={"http://via.placeholder.com/250x250"} />
          //     </Col>
          //     <Col md={3}>
          //       <img src={"http://via.placeholder.com/250x250"} />
          //     </Col>
          //     <Col md={3}>
          //       <img src={"http://via.placeholder.com/250x250"} />
          //     </Col>
          //     <Col md={3}>
          //       <img src={"http://via.placeholder.com/250x250"} />
          //     </Col>
          //   </Row>
          //   <h2>Top Cleaning Services</h2>
          //   <Row style={{ textAlign: "center" }}>
          //     <Col md={3}>
          //       <img src={"http://via.placeholder.com/250x250"} />
          //     </Col>
          //     <Col md={3}>
          //       <img src={"http://via.placeholder.com/250x250"} />
          //     </Col>
          //     <Col md={3}>
          //       <img src={"http://via.placeholder.com/250x250"} />
          //     </Col>
          //     <Col md={3}>
          //       <img src={"http://via.placeholder.com/250x250"} />
          //     </Col>
          //   </Row>
          // </Grid>
          /* ////////////////////////////////////// */
          // <Gradient
          //   style={{
          //     marginTop: 50
          //   }}
          // >
          //   <h2>As Seen On</h2>
          //   <Grid style={{ width: "90%", paddingBottom: 20 }}>
          //     <Row>
          //       <Col md={3}>
          //         <img src={"http://via.placeholder.com/200x200"} />
          //       </Col>
          //       <Col md={3}>
          //         <img src={"http://via.placeholder.com/200x200"} />
          //       </Col>
          //     </Row>
          //   </Grid>
          // </Gradient>
          /* ////////////////////////////////////// */
          // <div style={{ textAlign: "center" }}>
          //   <HeaderText>Testimonials</HeaderText>
          //   <Grid style={{ width: "90%", marginTop: 50, marginBottom: 50 }}>
          //     <Row>
          //       <Col md={4}>
          //         <Testimonial>
          //           <Subtext style={{ fontSize: "1.3em", textAlign: "left" }}>
          //             I love Servado.Ph, I use it every time i need a service.
          //             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          //             do eiusmod.
          //           </Subtext>
          //           <TestimonialUser>
          //             <img src={"http://via.placeholder.com/75x75"} />
          //             <div>
          //               <h4>John Smith</h4>
          //               <h4>Plumber</h4>
          //             </div>
          //           </TestimonialUser>
          //         </Testimonial>
          //       </Col>
          //       <Col md={4}>
          //         <Testimonial>
          //           <Subtext style={{ fontSize: "1.3em", textAlign: "left" }}>
          //             I love Servado.Ph, I use it every time i need a service.
          //             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          //             do eiusmod.
          //           </Subtext>
          //           <TestimonialUser>
          //             <img src={"http://via.placeholder.com/75x75"} />
          //             <div>
          //               <h4>John Smith</h4>
          //               <h4>Plumber</h4>
          //             </div>
          //           </TestimonialUser>
          //         </Testimonial>
          //       </Col>
          //       <Col md={4}>
          //         <Testimonial>
          //           <Subtext style={{ fontSize: "1.3em", textAlign: "left" }}>
          //             I love Servado.Ph, I use it every time i need a service.
          //             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          //             do eiusmod.
          //           </Subtext>
          //           <TestimonialUser>
          //             <img src={"http://via.placeholder.com/75x75"} />
          //             <div>
          //               <h4>John Smith</h4>
          //               <h4>Plumber</h4>
          //             </div>
          //           </TestimonialUser>
          //         </Testimonial>
          //       </Col>
          //     </Row>
          //   </Grid>
          // </div>
          /* ////////////////////////////////////// */
        }
        <Footer>
          <Grid style={{ width: "100%" }}>
            <Row>
              <Col md={4}>
                <Logo src={whiteLogoFile} />
                <h4 style={{ margin: "30px 10% 30px 10%" }}>
                  Stay up to date with all our news and latest features. Join
                  our newsletter.
                </h4>
                <EmailInput />
                <HeaderBtn style={{ boxShadow: "none", fontSize: "1.3em" }}>
                  Join
                </HeaderBtn>
              </Col>
              <Col md={4}>
                <h1>Sitemap</h1>
              </Col>
            </Row>
          </Grid>
        </Footer>
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
          <LoginModal register={() => this.setState({ showRegister: true })} />
        </Popup>
        <Popup
          open={
            !userStore.isLoggedIn &&
            this.state.showRegister &&
            !userStore.isSupplier
          }
          onClose={() => {
            this.setState({ showRegister: false });
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
          <RegisterModal />
        </Popup>
        <Popup
          open={
            !userStore.isLoggedIn &&
            this.state.showRegister &&
            userStore.isSupplier
          }
          onClose={() => {
            this.setState({ showRegister: false });
          }}
          contentStyle={{
            borderRadius: 15,
            textAlign: "center",
            width: "90vmin"
          }}
          modal
          closeOnDocumentClick
        >
          <RegisterSupplierModal
            progressBar={() =>
              this.setState({
                registerProgress: this.state.registerProgress + 25
              })
            }
          />
          <Line
            percent={this.state.registerProgress}
            strokeWidth={1.5}
            trailWidth={1.5}
            strokeColor={Colors.THEME_BLUE}
            style={{ margin: "30px 5% 0 5%" }}
          />
        </Popup>
      </div>
    );
  }
}

const TopBar = styled.div`
  height: 10vh;
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  padding-right: 5%;
  padding-left: 3%;

  @media (max-width: 700px) {
    display: initial;
  }
`;

const HeaderBtn = styled.button`
  font-size: 110%;
  border: none;
  border-radius: 50px;
  padding: 5px 10px 5px 10px;
  background: ${Colors.THEME_BLUE};
  color: white;
  box-shadow: 0px 4px 20px 0px rgba(43, 155, 220, 0.5);
  width: 12em;
  height: 2.3em;

  @media (max-width: 700px) {
    display: block;
    margin: auto;
  }
`;

const NavBtn = styled.button`
  color: black;
  font-size: 1em;
  background: none;
  border: none;
  border-radius: 50px;
  margin-left: 15px;
  margin-right: 15px;

  // &:hover {
  //   background: ${Colors.THEME_BLUE};
  //   color: white;
  // }
`;

const HeaderText = styled.h1`
  font-size: 2.5em;
  font-weight: bold;
  margin-bottom: 30px;
`;

const Subtext = styled.p`
  color: ${Colors.THEME_GREY_TWO};
  font-size: 1.8em;
  padding: 0px 10% 0px 10%;
`;

const Testimonial = styled.div`
  margin: 20px 5% 0px 5%;
  height: 25vh;
  border-radius: 15px;
  box-shadow: 0px 0px 30px 0px rgba(212, 212, 212, 1);
  justify-content: center;
  padding-top: 30px;
  border-top: 15px solid ${Colors.THEME_BLUE};

  @media (max-width: 700px) {
    height: 40vh;
  }
`;

const TestimonialUser = styled.div`
  textalign: left;
  display: flex;
  padding: 0px 0px 0px 10%;
  position: absolute;
  bottom: 30px;
`;

const Footer = styled.div`
  background-color: #395066;
  // margin-top: 200px;
  color: white;
  text-align: center;
  padding: 50px 0px 50px 0px;
`;

const EmailInput = styled.input`
  width: 80%;
  height: 3em;
  border: none;
  border-radius: 50px;
  margin: 0px 0px 20px 0px;
  color: black;
  padding-left: 25px;
`;

const Gradient = styled.div`
  color: white;
  background: linear-gradient(to right, #0094e8, #00c6f5);
  text-align: center;
  padding: 1px;
`;
