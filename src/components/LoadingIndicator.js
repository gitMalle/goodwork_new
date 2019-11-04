import React, { Component } from "react";
import styled from "styled-components";
import Colors from "../Colors";
import { observer } from "mobx-react";
import Spinner from "react-spinkit";


const LoadingIndicator = ({text}) => {
    return (
        <Background>
           <Spinner name="double-bounce" color={Colors.THEME_BLUE} fadeIn="none" style={{ height: 150, width: 150, margin: "0 auto" }} />
           <h1>{text}</h1>
        </Background>
    )
}

const Background = styled.div`
    background-color: rgba(212, 212, 212, 0.5);
    height: 100vh;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
`;

export default observer(LoadingIndicator);