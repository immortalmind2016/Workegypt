import AgoraRTC from "agora-rtc-sdk";
const handleErrors = (error) => {
  console.log(error);
};
let localStream = AgoraRTC.createStream({
  video: true,
  audio: true,
});
export const initCall = (
  CHANNEL_NAME,
  localStreamContainerId = "my-stream"
) => {
  const client = AgoraRTC.createClient({
    codec: "vp8",
    mode: "rtc",
  });
  client.init("ca8f7aea7d8a4f279291f0b1beaa06a4");

  client.join(
    null,
    CHANNEL_NAME,
    null,
    (uid) => {
      localStream.init(() => {
        localStream.play(localStreamContainerId);
        client.publish(localStream, handleErrors);
      }, handleErrors);
    },
    handleErrors
  );
  return { client, localStream };
};

export const onStreamAddedEvent = (client, callback = () => {}) => {
  client.on("stream-added", function (evt) {
    client.subscribe(evt.stream, handleErrors);
    callback(evt);
  });
};

export const onStreamSubscribedEvent = (client, callback = () => {}) => {
  client.on("stream-subscribed", function ({ stream }) {
    callback(stream);
  });
};

// Remove the corresponding view when a remote user unpublishes.
export const onStreamRemove = (client, callback = () => {}) => {
  client.on("stream-removed", function (evt) {
    let stream = evt.stream;
    let streamId = stream ? String(stream.getId()) : null;
    stream.close();
    callback(streamId);
  });
};

export const onPeerLeave = (client, callback = () => {}) => {
  client.on("peer-leave", function (evt) {
    let stream = evt.stream;
    let streamId = stream ? String(stream.getId()) : null;
    stream.close();
    callback(streamId);
  });
};
