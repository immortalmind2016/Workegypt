/* 
get conversations returns a shape different than get one conversation
get one conversations does not return conversation id
*/
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { socket } from "../../../index";
import Contact from "./Contact";
import Mymessage from "./Mymessage";
import Reply from "./Reply";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import messageSentSound from "../../../assets/message_sent.mp3";
import messageReceivedSound from "../../../assets/message_sound.mp3";
import uuid from "uuid";
import {
  fetchConversations,
  getConversation,
  addNewMsg,
} from "../../../redux/actions";
import moment from "moment";
import { checkAddNewConv } from "../../../redux/actions";
const Chat = () => {
  const params = useParams();
  const { remoteUserID } = params || {};
  const dispatch = useDispatch();
  const inputRef = useRef();
  // selectors
  const user = useSelector((state) => state.user.userData);
  const profile = useSelector((state) => state.profile.profileData);
  const { conversations } = useSelector((state) => state.chat);
  const { currentConversation } = useSelector((state) => state.chat);
  const { fetchingConversations, gettingConversation } = useSelector(
    (state) => state.chat.loaders
  );
  // states
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [messages, setMessages] = useState([]);
  const [messageSent, setMessageSend] = useState(false);
  const [messageReceived, setMessageReceived] = useState(false);
  if (!!document.getElementById("messages_container")) {
    document.getElementById(
      "messages_container"
    ).scrollTop = document.getElementById("messages_container").scrollHeight;
  }
  useEffect(() => {
    socket.on("NewMessage", ({ message = {}, conversation = {} }) => {
      if (message?.info?.to === user?._id) {
        setMessageReceived(true);
      }
      if (message?.info?.from !== user?._id) {
        // add new messages if it is not my own message
        dispatch(addNewMsg(message));
      }
      dispatch(checkAddNewConv(conversation));
    });

    /* sending get conversation request */
    dispatch(fetchConversations());
  }, []);

  const sendMessage = async (text) => {
    try {
      setMessageSend(true);
      socket.emit("message", {
        text,
        from: user._id,
        to: remoteUserID,
        type: user.type,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleInputKeyDown = ({ target, keyCode }) => {
    if (keyCode === 13) {
      const value = inputRef.current.value;
      if (value.trim() === "") {
        inputRef.current.value = "";
      } else {
        sendMessage(value);
        const msg = {
          _id: uuid(),
          temp: true,
          info: { from: user._id, to: remoteUserID },
          text: inputRef.current.value,
          created_date: Date.now(),
        };
        dispatch(addNewMsg(msg));
        inputRef.current.value = "";
        inputRef.current.focus();
      }
    }
  };

  /* fetching message on url id change */
  useEffect(() => {
    if (!!remoteUserID && fetchingConversations === false)
      dispatch(getConversation(remoteUserID));
  }, [remoteUserID, fetchingConversations]);

  // handling loaders
  useEffect(() => {
    if (isLoading && fetchingConversations === false) {
      //  success
      setIsLoading(false);
    } else if (isLoading && fetchingConversations === undefined) {
      //  error
      setIsLoading(false);
      setErrors({ ...errors, fetch: true });
    }
  }, [fetchingConversations]);
  useEffect(() => {
    if (
      gettingConversation === false &&
      !!document.getElementById("messages_container")
    ) {
      document.getElementById(
        "messages_container"
      ).scrollTop = document.getElementById("messages_container").scrollHeight;
    }
  }, [gettingConversation]);

  return (
    <>
      {messageSent && (
        <audio
          src={messageSentSound}
          autoPlay
          onEnded={() => setMessageSend(false)}
        />
      )}
      {messageReceived && (
        <audio
          src={messageReceivedSound}
          autoPlay
          onEnded={() => setMessageReceived(false)}
        />
      )}
      <div className="container avoid-navbar py-3 relative-container">
        {isLoading === true || gettingConversation === true ? (
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              background: "#fff",
              zIndex: 100,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100vw",
              height: "100vh",
            }}
          >
            <span
              className="spinner spinner-border text-primary"
              style={{ width: "6rem", height: "6rem" }}
            />
          </div>
        ) : (
          <div className="chat">
            <div className="chat__header row">
              <div className="col-3">
                <h2 className="text-center pt-5">Messages</h2>
              </div>
              <div className="col-9 p-0">
                {remoteUserID && (
                  <div className="chat__header-name align-items-center">
                    <div
                      className="responsive_img_container"
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        border: "1px solid #DDD",
                        padding: 1,
                      }}
                    >
                      <img
                        src={
                          currentConversation?.user_profile?.image ||
                          "http://placehold.it/100/ddd"
                        }
                        alt="Logo"
                        className="mr-2 mb-3 rounded-circle"
                      />
                    </div>
                    <p className="ml-4 text-secondary" style={{ fontSize: 14 }}>
                      {currentConversation.user_profile?.user?.name ||
                        "user name"}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="chat__content row ">
              <div className="all-contacts col-3">
                {conversations instanceof Array && conversations.length > 0 ? (
                  <>
                    {conversations.map((conv) => (
                      <>
                        <Contact
                          key={conv?._id}
                          remoteUserID={conv?.user?._id}
                          remoteUserName={conv?.user?.name}
                          remoteUserImg={conv?.user_profile?.image}
                        />
                      </>
                    ))}
                  </>
                ) : (
                  <p className="text-center text-secondary my-3">
                    No Conversations Available
                  </p>
                )}
              </div>
              <div className="col-9 p-0">
                {!remoteUserID && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      zIndex: 100,
                      background: "#DDD",
                    }}
                  />
                )}
                <div id="messages_container" className="messages">
                  {currentConversation?.messages?.length > 0 ? (
                    <>
                      {currentConversation?.messages?.map((msg, key) => {
                        return msg.info.from === user._id ? (
                          <Mymessage
                            imgSrc={profile?.image}
                            key={msg._id + key}
                            text={msg.text}
                            time={moment(msg.created_date).fromNow(true)}
                          />
                        ) : (
                          <Reply
                            imgSrc={currentConversation?.user_profile?.image}
                            key={msg._id + key}
                            text={msg.text}
                            time={moment(msg.created_date).fromNow(true)}
                          />
                        );
                      })}
                    </>
                  ) : (
                    <p>start chatting with remote user name</p>
                  )}
                </div>
                <input
                  type="text"
                  size=""
                  ref={inputRef}
                  placeholder="Write your message..."
                  onKeyDown={handleInputKeyDown}
                  autoFocus
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Chat;
