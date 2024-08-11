import React from "react";

const Notification = ({ message }) => {
  return (
    <div className="toast toast-top toast-center mt-24">
      <div className="alert bg-black/80 text-white">
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Notification;
