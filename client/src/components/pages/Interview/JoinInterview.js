import React, { useEffect, useRef, useState } from "react";
import jwt from "jsonwebtoken";
import { useDispatch } from "react-redux";
import { setInterviewCode } from "../../../redux/actions";
import { useHistory } from "react-router-dom";
const JoinInterview = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const textareaRef = useRef();
  const [valid, setValid] = useState(null);
  const [validating, setValidating] = useState(false);
  const _handleJoinClick = async () => {
    setValidating(true);
    setValid(null);
    try {
      const token = textareaRef.current.value;
      if (token.length !== 9) throw new Error();
      dispatch(setInterviewCode(token));
      setValid(true);
    } catch (error) {
      setValid(false);
    }
  };

  useEffect(() => {
    if (validating && valid) {
      //   success
      setValidating(false);
      history.replace("/interview/room");
    }
    if (validating && valid === false) {
      setValidating(undefined);
    }
  }, [validating, valid, setValid]);
  return (
    <div
      className="container w-100  flex-centered flex-column"
      style={{ height: "100vh" }}
    >
      {valid === false && (
        <div className="alert alert-danger">Error, this code is not valid</div>
      )}

      <div
        className="card"
        style={{ width: "50vw", height: "auto", minWidth: 300, minHeight: 200 }}
      >
        <div className="card-body">
          <div className="flex-centered flex-column w-100 h-100">
            <div className="flex-grow-1 w-100">
              <h2 className="mb-4">Please enter interview code</h2>
              <textarea
                ref={textareaRef}
                placeholder="interview code"
                className="w-100 form-control"
                style={{ resize: "none", border: "1px solid #DDD" }}
              />
            </div>
            <button
              type="button"
              onClick={_handleJoinClick}
              className="btn btn-primary  btn-block "
            >
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinInterview;
