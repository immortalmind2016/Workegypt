import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { removeInterviewCode } from "../../../redux/actions/index.js";
import {
  initCall,
  onPeerLeave,
  onStreamAddedEvent,
  onStreamRemove,
  onStreamSubscribedEvent,
} from "../../../utils/aograUtils.js";
import "./room.css";
const InterviewRoom = () => {
  const [localStream, setLocalStream] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const [remoteStream, setRemoteStream] = useState(null);
  const code = useSelector((state) => state.interview.interviewCode);

  const _handleEndCall = () => {
    setRemoteStream(null);
    localStream.close();
    dispatch(removeInterviewCode());
  };

  /* note channel name,token is all what it takes to call some user(it can be the two users ids) */

  useEffect(() => {
    if (code) {
      // Subscribe to the remote stream when it is published
      const { client, localStream } = initCall(code);
      setLocalStream(localStream);
      onStreamAddedEvent(client, (evt) => {
        // console.log("stream added event", evt);
      });
      // Play the remote stream when it is subsribed
      onStreamSubscribedEvent(client, (stream) => {
        let streamId = String(stream.getId());
        setRemoteStream(streamId);
        stream.play(streamId);
      });
      onStreamRemove(client, () => {
        setRemoteStream(null);
        localStream.close();
        // history.replace("/interview/join");
      });
      onPeerLeave(client, () => {
        setRemoteStream(null);
        localStream.close();
        // history.replace("/interview/join");
      });
    }
    if (!code) {
      window.location.replace("/interview/join");
    }
  }, [code]);

  if (!code) return null;
  return (
    <div>
      <div id="my-stream"></div>
      {remoteStream && (
        <div className="remote-stream" id={remoteStream}>
          <div className="actions">
            <button
              className="btn btn-danger text-light"
              onClick={_handleEndCall}
            >
              End Call
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewRoom;
