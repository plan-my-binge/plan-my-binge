import React from "react";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import styled from "styled-components";
import {Classes, Colors} from "../utils/Constants";
import ButtonBase from "@material-ui/core/ButtonBase";
import logo from "../images/logo.png";

export const AppHeader = ({history, title}) => {
  return <Header>
    <ButtonBaseStyled>

      <BackLink onClick={() => history.goBack()}>
        <ArrowBackIcon fontSize={"large"}/><span className={Classes.showOnlyInWeb}>Back</span>
      </BackLink>
    </ButtonBaseStyled>
    <LogoContainer className={Classes.showOnlyInMobile}>
      <Logo onClick={() => history.push("/")} src={logo}/>
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

const ButtonBaseStyled = styled(ButtonBase)`
  position: absolute;
  left: 10px;
  margin-left: 10px;
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
  
`;

const Logo = styled.img`
  width: 7rem;
  flex-grow:1;      
  text-align:center;
  margin: auto auto auto auto;
`;
