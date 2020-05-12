import {ShowItem} from "./ShowItem.jsx";
import {BingeDetailModel} from "../data/BingeDetailModel";
import React from "react";

export const ShowList = ({shows}) => {
  return <>
    {shows.map(show =>
      <ShowItem
        key={show.pmbId}
        detail={show}/>)}
  </>;
};