import React from 'react';
import {SideNavBar} from "./SideNavBar.jsx";
import {BottomNavBar} from "./BottomNavBar.jsx";


export function NavigationMenus(props: Props) {

  return (
      <div>
        <SideNavBar onNavChange={props.onNavChange} selection={props.selection}/>
        <BottomNavBar onNavChange={props.onNavChange} selection={props.selection}/>
      </div>
  )
}

type Props = {
  onNavChange: (navOption: string) => void,

};
