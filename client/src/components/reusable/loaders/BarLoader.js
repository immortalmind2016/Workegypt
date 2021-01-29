import React from "react";

export default function BarLoader({ width = "30%" }) {
  return (
    <div
      className="d-flex justify-content-center align-items-center w-100 h-100"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        top: 0
      }}
    >
      <img src="/images/bar-loader.gif" width={width} alt="Loading..." />
    </div>
  );
}
