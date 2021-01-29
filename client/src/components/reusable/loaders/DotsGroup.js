import React from "react";

function DotsGroup({ isCentered = false, bootstrapColorClass = "primary" }) {
  return (
    <div>
      <div className="row">
        <div className={`col-12 ${isCentered && "text-center"}`}>
          <div
            className={`spinner-grow text-${bootstrapColorClass}`}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
          <div
            className={`spinner-grow text-${bootstrapColorClass}`}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
          <div
            className={`spinner-grow text-${bootstrapColorClass}`}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
          <div
            className={`spinner-grow text-${bootstrapColorClass}`}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DotsGroup;
