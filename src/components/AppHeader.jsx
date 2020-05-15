import React from "react";
import styled from "styled-components";
import {Classes, Colors} from "../utils/Constants";
import AppLogo from "../icons/Logo";
import {ArrowBackIcon} from "../icons/ArrowBackIcon";

export const AppHeader = ({history, title}) => {
  return <Header>

      <BackLink onClick={() => history.goBack()}>
        <ArrowBackIcon fontSize={"large"}/><span className={Classes.showFlexInLargeScreen}>Back</span>
      </BackLink>
    <LogoContainer className={Classes.showFlexInSmallerScreen}>
      <div style={{ width: "8rem"}} onClick={() => history.push("/")}>
        <AppLogo/>
      </div>
    </LogoContainer>
  </Header>
};

const Header = styled.div`
  border-bottom: 1px solid ${Colors.darkGray};
  padding-top: 10px;
  padding-bottom: 10px;
  position: sticky;
  top: 0;
  right: 0;
  left: auto;
  height: 60px;
  z-index: 999;
  background-color: ${Colors.gray};
  display:flex;
  justify-content: space-between;
  align-items:center;;
`;


const BackLink = styled.a`
  display: flex;
  position: absolute;
  left: 10px;
  color: ${Colors.black};
  font-size: 1.5rem;
  
  
  &:hover {
    color: ${Colors.gray};
    text-decoration: none;
    border-radius: 10px;
  }
`;

const LogoContainer = styled.div`
  flex-grow:1;      
  text-align:center;
  margin: auto;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

