import React from "react";

const Loading = () => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <span className="loading loading-dots w-48"></span>
      <h3 className="text-3xl text-center">Loading</h3>
    </div>
  );
};

export default Loading;
