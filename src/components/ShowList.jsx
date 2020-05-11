import {ShowItem} from "./ShowItem.jsx";
import {BingeDetailModel} from "../data/BingeDetailModel";
import React from "react";

export const ShowList = ({shows}) => {
  return <>
    {shows.map(show =>
      <ShowItem
        key={show._source.pmb_id}
        detail={new BingeDetailModel(show._source)}/>)}
  </>;
};