import React from "react";
import {Colors} from "../utils/Constants";

const MinusIcon = ({onClick, disable}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20px"
    height="20px"
    viewBox="0 0 512 512"
    onClick={onClick}
    style={{margin: 8}}
    cursor={disable ? "not-allowed" : "pointer"}
  >
    <path
      fill={disable ? Colors.darkGray : Colors.black}
      d="M256 512C114.836 512 0 397.164 0 256S114.836 0 256 0s256 114.836 256 256-114.836 256-256 256zm0-480C132.48 32 32 132.48 32 256s100.48 224 224 224 224-100.48 224-224S379.52 32 256 32zm0 0"/>
    <path
      fill={disable ? Colors.darkGray : Colors.black}
      d="M368 272H144c-8.832 0-16-7.168-16-16s7.168-16 16-16h224c8.832 0 16 7.168 16 16s-7.168 16-16 16zm0 0"/>
  </svg>
);

export default MinusIcon;
