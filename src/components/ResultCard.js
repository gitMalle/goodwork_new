import React, { Component } from "react";
import styled from "styled-components";
import Colors from "../Colors";
import { Grid, Row, Col } from "react-bootstrap";
import "../index.css";

const ResultCard = ({ company, rate, rating, modalfnc }) => {
  return (
    <ResultBox>
      <div style={{ height: "20em" }} />
      <h4>
        <b>{company}</b>
      </h4>
      <InfoText>Job Completion Rate: {rate}</InfoText>
      <InfoText>Rating: {rating}</InfoText>
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <RequestButton onClick={modalfnc}>Send Request</RequestButton>
      </div>
    </ResultBox>
  );
};

const ResultBox = styled.div`
  background-color: white;
  height: 32em;
  margin: 20px 3% 20px 3%;
  border-radius: 15px;
  box-shadow: 0px 0px 30px 0px rgba(212, 212, 212, 1);
  padding: 0px 30px 0px 30px;
`;

const RequestButton = styled.button`
  font-size: 150%;
  border: none;
  border-radius: 50px;
  background: ${Colors.THEME_BLUE};
  color: white;
  box-shadow: 0px 3px 20px 0px rgba(43, 155, 220, 0.5);
  width: 9em;
  height: 2em;
`;

const InfoText = styled.p`
  color: #afafaf;
  margin: 0;
  font-weight: bold;
`;

export default ResultCard;
