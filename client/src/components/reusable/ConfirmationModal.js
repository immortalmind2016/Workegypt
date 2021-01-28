import React from "react";
import $ from "jquery";
const ConfirmationModal = ({
  modalId,
  title,
  message,
  actionButtonBootstrapClass,
  doActionButtonTitle,
  action
}) => {
  return (
    <React.Fragment>
      <div
        tabIndex={-1}
        className="modal fade"
        id={modalId}
        role="dialog"
        aria-hidden="true"
        aria-labelledby="exampleModalLabel"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {title}
              </h5>
              <button
                className="close"
                aria-label="Close"
                type="button"
                data-dismiss="modal"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">{message}</div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                type="button"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                className={`btn btn-${actionButtonBootstrapClass}`}
                type="button"
                onClick={e => {
                  action(e);
                  $(`#${modalId}`).modal("hide");
                }}
              >
                {doActionButtonTitle}
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default ConfirmationModal;
