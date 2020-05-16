import React from "react";

export const PrevIcon = ({fontSize, style}) => {
  let svgStyle = fontSize === "large" ? {...baseStyle, ...style, fontSize: "2.1875rem"} : {...baseStyle, ...style};
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={svgStyle} viewBox={"0 0 24 24"}>
      <path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z" />
    </svg>

  )
};

const baseStyle = {
  fill: "currentColor",
  width: "1em",
  height: "1em",
  display: "inline-block",
  fontSize: "1.5rem",
  transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  flexShrink: "0",
  userSelect: "none"
};