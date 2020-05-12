import logo from "../images/logo.png";
import {Colors, NavOptions} from "../utils/Constants";
import * as R from "ramda";
import React from "react";
import styled from "styled-components";
import {Col} from "react-bootstrap";
import {withRouter, useHistory} from "react-router-dom";

const SideNavBar = (props: Props) => {

  const history = useHistory();

  return <SideBar lg={3} className={"d-none d-lg-block"}>
    <Logo src={logo}/>

    {NavOptions.map(option => {
      let selectionClassName = R.ifElse(R.equals, () => "selection", () => "")(option, props.selection);
      return (
        <NavItem key={option.name}
                 className={selectionClassName}
                 onClick={() => {
                   history.push(option.link)
                   return props.onNavChange(option);
                 }}>
          <NavHeader>
            {option.name.toUpperCase()}
          </NavHeader>
          <NavHint>{option.hint}</NavHint>
        </NavItem>);
    })}
  </SideBar>;
};

export const SideNavBarWithRouter = withRouter(SideNavBar);

const SideBar = styled(Col)`
  border-right: solid 1px black;
  padding: 0px;
  height: 100%;
  position: fixed;
  
`;

const Logo = styled.img`
  max-width: 100%;
  padding: 20px
`;

const NavHeader = styled.div`
  font-weight: 700;
`;

const NavHint = styled.div`
  font-weight: 300;
  font-style: italic;
  font-size: medium;
  color: ${Colors.darkGray};
`;

const NavItem = styled.div`
  padding: 20px;
  cursor: pointer;
  :first-of-type {
    border-top: solid 1px black;
  }
  
  &.selection {
    background-color: ${Colors.gray};
    border-right: solid 10px black;
    padding-right: 0px;

  }
  :hover {
    background-color: ${Colors.gray};
  }
`;

type Props = {
  onNavChange: (navOption: string) => void,

};
