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
  background-color: ${Colors.gray};
  padding: 10px;
  z-index: 999;
  font-size: calc(2vw + 1vh + .5vmin);
`;

const BarContainer = styled.div`
  border: solid 3px black;
  width: fit-content;
  display: flex;
  margin: auto;
`;

const NavItem = styled.div`
  border-right: solid 3px black;
  padding: 10px;
  
  display: flex;
  justify-content: center;
  flex-direction: column;
  
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
