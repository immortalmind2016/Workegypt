import React from "react";

export default function CircularLoader({ width = "30%" }) {
  return (
    <div
      className="d-flex justify-content-center align-items-center w-100 h-100"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#FFF",
        top: 0
      }}
    >
      <img src="/images/circularLoader.gif" width={width} alt="Loading..." />
    </div>
  );
}
