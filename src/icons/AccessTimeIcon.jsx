import React from "react";

export const AccessTimeIcon = ({fontSize, style}) => {
  let svgFontSize;
  switch (fontSize) {
    case "small": svgFontSize = "1.25rem"; break;
    case "large": svgFontSize = "2.1875rem"; break;
    default: svgFontSize = "1.5rem";
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{...baseStyle, ...style, fontSize: svgFontSize}} viewBox={"0 0 24 24"}>
      <path
        d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
      <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
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