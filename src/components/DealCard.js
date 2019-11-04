import React, { Component } from "react";
import styled from "styled-components";
import Colors from "../Colors";
import { Grid, Row, Col } from "react-bootstrap";
import "../index.css";

const DealCard = ({}) => {
  return (
    <DealBox>
      <div style={{ alignItems: "center" }}>
        <DealImg src={"http://via.placeholder.com/150x150"} />
      </div>
      <h5 style={{ color: "#6f6f6f", width: "80%", marginLeft: "9%" }}>1000 Points to Get 5% Off on your next purchase</h5>
      <PurchaseBtn>Purchase</PurchaseBtn>
    </DealBox>
  );
};

const DealBox = styled.div`
  background-color: #f4f7f9;
  height: 32em;
  margin: 20px 3% 20px 3%;
  border-radius: 15px;
  box-shadow: 0px 0px 30px 0px rgba(212, 212, 212, 1);
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 20px;

  @media (max-width: 700px) {
    height: 24em;
  }
`;

const DealImg = styled.img`
  border-radius: 50%;
  width: 150px;
`;

const PurchaseBtn = styled.button`
  height: 7em;
  background-color: white;
  border: none;
  border-radius: 0 0 15px 15px;
  color: ${Colors.THEME_BLUE};
  font-weight: bold;
  font-size: 1.2em;
`;

export default DealCard;
