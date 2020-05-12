import React from 'react';
import {SideNavBarWithRouter} from "./SideNavBar";
import BottomNavContainer from "../containers/BottomNavBarContainer";


export function NavigationMenus(props: Props) {

  return (
      <div>
        <SideNavBarWithRouter onNavChange={props.onNavChange} selection={props.selection}/>
        <BottomNavContainer onNavChange={props.onNavChange} selection={props.selection}/>
      </div>
  )
}

type Props = {
  onNavChange: (navOption: string) => void,

};
