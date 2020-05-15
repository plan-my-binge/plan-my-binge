import React from "react";

export const StarFilledIcon = ({fontSize, style}) => {
  let svgStyle = fontSize === "large" ? {...baseStyle, ...style, fontSize: "2.1875rem"} : {...baseStyle, ...style};
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={svgStyle} viewBox={"0 0 24 24"}>
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
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