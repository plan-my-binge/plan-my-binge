import React from "react";

export const ArrowBackIcon = ({fontSize, style}) => {
  let svgStyle = fontSize === "large" ? {...baseStyle, ...style, fontSize: "2.1875rem"} : {...baseStyle, ...style};
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={svgStyle} viewBox={"0 0 24 24"}>
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
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