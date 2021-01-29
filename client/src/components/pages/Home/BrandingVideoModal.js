import React from "react";
const BrandingVideoModal = props => {
  return (
    <div
      className=" modal fade branding-video "
      id="getStartedModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content ">
          <iframe
            title="branding video modal"
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/iL_Qu5S_458"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default BrandingVideoModal;
