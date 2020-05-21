import {Classes, Colors, NavOptions, TrackingCategory} from "../utils/Constants";
import React from "react";
import styled from "styled-components";
import {Col} from "react-bootstrap";
import {useHistory, useLocation, withRouter} from "react-router-dom";
import AppLogo from "../icons/Logo";
import ReactGA from 'react-ga';
import {ga} from "../utils/apiUtils";

const SideNavBar = (props: Props) => {

  const history = useHistory();
  const {pathname} = useLocation();

  let onLogoClick = () => {
    ReactGA.event(ga(TrackingCategory.AppLogoClick, 'Clicked app logo', 'SideBarAppLogo'));
    return history.push("/");
  };

  const navItemOnClick = option => {
    ReactGA.event(ga(TrackingCategory.SideNavBarItemClick, 'Clicked sidebar menu item', option.name));
    history.push(option.link);
    return props.onNavChange(option);
  };

  return <SideBar lg={3} className={Classes.showInLargeScreen}>
    <AppLogoContainer onClick={onLogoClick}>
      <AppLogo/>
    </AppLogoContainer>
    {NavOptions.map(option => {
      let className = pathname === option.link ? "selection" : "";
      return (
        <NavItemContainer key={option.name} data-nosnippet>
          <NavItem className={className}
                   onClick={() => navItemOnClick(option)}>
            <NavHeader>
              <option.icon style={{color: Colors.black, marginRight: 10}}/>
              {option.name.toUpperCase()}
            </NavHeader>
            <NavHint>{option.hint}</NavHint>
          </NavItem>
        </NavItemContainer>);
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
  padding: 20px;
  cursor: pointer;
  border-bottom: 1px solid black;
  &:hover {
    filter: drop-shadow(2px 2px 2px ${Colors.darkGray});
  }
`;

const NavHeader = styled.div`
  display: flex;
  align-items: center;
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
  width: 100%;
  
  &.selection {
    background-color: ${Colors.gray};
    border-right: solid 10px black;
    padding-right: 0px;

  }
  :hover {
    background-color: ${Colors.gray};
  }
`;

const NavItemContainer = styled.div`
  cursor: pointer !important;
  width: 100%;
  text-align: left;
  border: none;
`;
type Props = {
  onNavChange: (navOption: string) => void,

};

const AppLogoContainer = styled.div`
  border-bottom: 1px solid ${Colors.darkGray};
  padding: 10px;
  cursor: pointer;
`;
