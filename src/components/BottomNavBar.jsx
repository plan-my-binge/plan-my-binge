import {Colors, NavOptions} from "../utils/Constants";
import * as R from "ramda";
import React from "react";
import styled from "styled-components";
import {Col} from "react-bootstrap";
import {withRouter, useHistory} from "react-router-dom";

function BottomNavBar(props: Props) {
  const history = useHistory();
  return <BottomBar className={"d-block d-lg-none"}>

    {!props.inputFocused && <BarContainer>
      {NavOptions.map(option => {
        let selectionClassName = R.ifElse(R.equals, () => "selection", () => "")(option, props.selection);
        return <NavItem key={option.name}
                        onClick={() => {
                          history.push(option.link);
                          return props.onNavChange(option);
                        }}
                        className={selectionClassName}
        >{<option.icon fontSize={"1rem"}/>}{option.name}</NavItem>;
      })}
    </BarContainer>}
  </BottomBar>;
}

export const BottomNavBarWithRouter = withRouter(BottomNavBar);

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
  border-top: solid 1px ${Colors.gray};
  width: 100%;
  display: flex;
  margin: auto;
`;

const NavItem = styled.div`
  border-right: solid 1px ${Colors.gray};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  flex: 1;
  padding-top: 5px;
  padding-bottom: 10px;
  cursor: pointer;
  font-size: 0.9rem;
  background-color: ${Colors.white};
  color: ${Colors.darkGray};
  
  &.selection {
    background-color: ${Colors.darkGray};
    color: ${Colors.white};
  }
  
  :last-of-type {
    border-right: none;
  }
  
`;


type Props = {
  onNavChange: (navOption: string) => void,

};
