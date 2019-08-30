import {Colors, NavOptions} from "../utils/Constants";
import * as R from "ramda";
import React from "react";
import styled from "styled-components";
import {Col} from "react-bootstrap";

export function BottomNavBar(props: Props) {
  return <BottomBar className={"d-block d-lg-none"}>

    <BarContainer>
      {NavOptions.map(option => {
        let selectionClassName = R.ifElse(R.equals, () => "selection", () => "")(option, props.selection);
        return <NavItem key={option.name}
                        onClick={() => props.onNavChange(option)}
                        className={selectionClassName}
        >{option.name}</NavItem>;
      })}
    </BarContainer>
  </BottomBar>;
}

const BottomBar = styled(Col)`
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 999;
  padding: 0px;
  font-size: calc(2.5vw + 1vh + .5vmin);
  max-height: 100px
`;

const BarContainer = styled.div`
  border-top: solid 3px black;
  width: 100%;
  display: flex;
  margin: auto;
`;

const NavItem = styled.div`
  border-right: solid 3px black;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  flex: 1;
  padding-bottom: 10px;
  &.selection {
    background-color: ${Colors.black};
    color: ${Colors.white};
  }
  cursor: pointer;
  
  :last-of-type {
    border-right: none;
  }
  
  background-color: ${Colors.white};
  color: ${Colors.black};
`;


type Props = {
  onNavChange: (navOption: string) => void,

};
