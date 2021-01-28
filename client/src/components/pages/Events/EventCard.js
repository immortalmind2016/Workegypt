import React, { useEffect, useState } from "react";
import Speaker from "./Speaker";
import uuid from "uuid";
import EventPostModal from "./EventPostModal";
import { setGoing } from "../../../redux/actions";
import $ from "jquery";
import { useDispatch, useSelector } from "react-redux";

const EventCard = ({
  eventId,

  title = "WorkEgypt Event",
  desc,
  image_link = "http://placehold.it/100/ddd",
  going_counter,
  created_date = "1 min ago",
  time,
  speakers = [],
  agenda = [],
}) => {
  const [goingLoader, setGoingLoader] = useState(undefined);
  const [registered, setRegistered] = useState(false);
  const dispatch = useDispatch();

  const { settingGoing } = useSelector((state) => state.event.loaders);
  const { settingGoing: settingGoingErr } = useSelector(
    (state) => state.event.errors
  );
  const _handleRegister = () => {
    setGoingLoader(true);
    dispatch(setGoing(eventId));
  };
  useEffect(() => {
    const localEvents = localStorage.registeredEvents
      ? JSON.parse(localStorage.registeredEvents)
      : [];
    const didRegister = localEvents.includes(eventId);
    if (didRegister) {
      setRegistered(true);
    }
  }, []);

  useEffect(() => {
    if (goingLoader && settingGoing === false) {
      setGoingLoader(false);

      const localEvents = localStorage.registeredEvents
        ? JSON.parse(localStorage.registeredEvents)
        : [];
      const newEvents = [...localEvents, eventId];
      localStorage.setItem("registeredEvents", JSON.stringify(newEvents));
      setRegistered(true);
    }
    if (goingLoader && settingGoing === undefined) setGoingLoader(undefined);
  }, [goingLoader, setGoingLoader, settingGoing]);

  return (
    <div className="relative-container">
      {localStorage.admToken && (
        <>
          <i
            className="fas fa-pen"
            onClick={() => $("#EventPostModal" + eventId).modal("show")}
            title="Edit Event"
            style={{
              cursor: "pointer",
              position: "absolute",
              right: 20,
              top: 20,
            }}
          />

          <EventPostModal
            eventId={eventId}
            isEditProcess={true}
            title={title}
            desc={desc}
            eventImageUrl={image_link}
            timeFrom={time?.timeFrom?.split("#")[0] || ""}
            timeTo={time?.timeTo?.split("#")[0] || ""}
            hour_from={time?.timeTo?.split("#")[1]?.split(" ")[0] || ""}
            minutes_from={time?.timeTo?.split("#")[1]?.split(" ")[1] || ""}
            gmt_from={time?.timeTo?.split("#")[1]?.split(" ")[2] || ""}
            hour_to={time?.timeFrom?.split("#")[1]?.split(" ")[0] || ""}
            minutes_to={time?.timeFrom?.split("#")[1]?.split(" ")[1] || ""}
            gmt_to={time?.timeFrom?.split("#")[1]?.split(" ")[2] || ""}
            eventSpeakers={speakers || []}
            eventAgenda={agenda || []}
          />
        </>
      )}
      <div className="eventCard row">
        <div className="event-agenda col-lg-6">
          <div className="event-agenda__header d-flex">
            <img
              src="/images/Logo.svg"
              alt="Logo"
              width={50}
              height={50}
              className="mr-2 mb-3 rounded-circle"
            />
            <div className="event-agenda__header__text ">
              <h4 className="mb-0">WorkEgypt</h4>
              <p className="mb-0">Telecom and communication company</p>
              <small>{created_date}</small>
            </div>
          </div>
          <h2 className="mb-4">{title}</h2>
          <p>{desc}</p>
          {image_link && (
            <div className="responsive_img_container">
              <img className="event-agenda__img" src={image_link} alt="" />
            </div>
          )}

          {agenda.map((agenda) => (
            <div className="agenda" key={uuid()}>
              <h1 className="mb-3 mt-5">{agenda.title}</h1>
              {agenda.desc && <p className="">{agenda.desc}</p>}
            </div>
          ))}
        </div>
        <div className="event-speaker col-lg-6">
          {speakers?.length > 0 && (
            <>
              <h2 className="text-center mb-5">Speakers</h2>
              <div className="row">
                {speakers.map((speaker) => (
                  <div key={uuid()} className="col-12 col-md-6">
                    <Speaker
                      speakerName={speaker.speakerName}
                      speakerInfo={speaker.speakerInfo}
                      speakerImgUrl={speaker.speakerImgUrl}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
          {!registered && (
            <button
              className="green-btn remove-outline"
              type="button"
              onClick={_handleRegister}
            >
              {goingLoader === true ? (
                <span className="spinner-border text-light" />
              ) : (
                "Register Now"
              )}
            </button>
          )}
          {goingLoader === undefined && settingGoingErr === true && (
            <div className="alert alert-danger">
              Failed To Register, Please Try Again.
            </div>
          )}
          {goingLoader === false && (
            <div className="alert alert-success">Registered successfully.</div>
          )}
          <h2 className="ml-4 mb-5">Time</h2>

          <span className="d-block ml-5 mb-2">
            From: {time.timeFrom?.replace(" ", ":").replace("#", " At ")}
          </span>
          <span className="d-block ml-5">
            To: {time.timeTo?.replace(" ", ":").replace("#", " At ")}
          </span>
          {!!localStorage.admToken && (
            <h2 className="ml-4 my-5">
              Going
              <small className="badge badge-primary ml-3">
                {going_counter}
              </small>
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
