import React from "react";

const Overlay = ({ position, size, color }) => {
  return <div className={`absolute ${position} ${size} ${color} z-[10]`}></div>;
};

export default Overlay;
