import React from "react";
import ShowItemContainer from "../containers/ShowItemContainer";

export const ShowList = ({shows}) => {
  return <>
    {shows.map(show =>
      <ShowItemContainer
        key={show.pmbId}
        detail={show}/>)}
  </>;
};