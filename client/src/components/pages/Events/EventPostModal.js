import React from "react";
import { uploadEvent, deleteEvent, editEvent } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { uris } from "../../../config";
import uuid from "uuid";
import { useEffect } from "react";
import $ from "jquery";

let hoursArray = [];
let minutesArray = [];
for (let i = 1; i <= 12; i++) {
  hoursArray.push(i.toString());
}
for (let i = 0; i <= 59; i++) {
  if (i < 10) {
    minutesArray.push("0" + i.toString());
  } else {
    minutesArray.push(i.toString());
  }
}
const EventPostModal = ({
  eventId,
  isEditProcess,
  title = "",
  desc = "",
  eventImageUrl = "",
  timeFrom = "",
  timeTo = "",
  hour_from = "",
  minutes_from = "",
  gmt_from = "",
  hour_to = "",
  minutes_to = "",
  gmt_to = "",
  eventSpeakers = [],
  eventAgenda = []
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(undefined);
  const [deleteLoading, setDeleteLoading] = useState(undefined);
  const [uploadSuccess, setUploadSuccess] = useState();
  const [imageUploading, setImageUploading] = useState();

  const [event, setEvent] = useState({
    title: "",
    desc: "",
    eventImageUrl: "",
    timeFrom: "",
    timeTo: "",
    hour_from: "",
    minutes_from: "",
    gmt_from: "",
    hour_to: "",
    minutes_to: "",
    gmt_to: ""
  });
  const [agenda, setAgenda] = useState([]);
  const [speakers, setSpeakers] = useState([]); // speakerName,speakerInfo,speakerImage
  const [agendaError, setAgendaError] = useState([]);
  const [speakerError, setSpeakerError] = useState([]);

  /* selectors */

  const { uploadingEvent, editingEvent, deletingEvent } =
    useSelector(state => state.event.loaders) || {};
  const {
    uploadingEvent: uploadingEventErr,
    editingEvent: editingEventErr,
    deletingEventErr
  } = useSelector(state => state.event.errors) || {};
  /* handlers */
  const onChangeHandler = e => {
    const { name, value } = e.target;
    setEvent(prevEvent => ({ ...prevEvent, [name]: value }));
  };
  const onAgendaChange = (e, index) => {
    const { name, value } = e.target;
    let prevAgenda = [...agenda];
    let currentAgenda = { ...prevAgenda[index] };
    prevAgenda[index] = { ...currentAgenda, [name]: value };
    setAgenda([...prevAgenda]);
  };
  const onSpeakerChange = (e, index) => {
    const { name, value } = e.target;
    let prevSpeakers = [...speakers];
    let currentSpeaker = { ...prevSpeakers[index] };
    prevSpeakers[index] = { ...currentSpeaker, [name]: value };
    setSpeakers([...prevSpeakers]);
  };
  const uploadImage = (e, index) => {
    setUploadSuccess(undefined);
    if (!(e.target.files && e.target.files[0])) return;
    let formData = new FormData();
    formData.append("image", e.target.files[0]);
    setImageUploading(true);
    axios
      .post(uris.profile.uploadCompanyImg, formData, {
        headers: {
          "content-type": "multipart/form-data"
        }
      })
      .then(({ data }) => {
        if (data?.error) return setUploadSuccess(false);
        setImageUploading(false);
        setUploadSuccess(true);
        if (typeof index === "number") {
          let newSpeaks = [...speakers];
          newSpeaks[index].speakerImgUrl = data.link;
          return setSpeakers([...newSpeaks]);
        } else {
          setEvent(prevEvent => ({ ...prevEvent, eventImageUrl: data?.link }));
        }
      })
      .catch(() => setUploadSuccess(false));
  };

  const onPost = e => {
    e.preventDefault();
    const data = {
      title: event.title,
      desc: event.desc,
      image_link: event.eventImageUrl,
      time: {
        timeFrom: `${event.timeFrom}#${event.hour_from} ${event.minutes_from} ${event.gmt_from}`,
        timeTo: `${event.timeTo}#${event.hour_to} ${event.minutes_to} ${event.gmt_to}`
      },

      speakers: speakers.map(sp => ({
        speakerName: sp.speakerName,
        speakerInfo: sp.speakerInfo,
        speakerImgUrl: sp.speakerImgUrl
      })),
      agenda: agenda.map(ag => ({ title: ag.title, desc: ag.desc }))
    };
    setLoading(true);
    if (isEditProcess) {
      dispatch(editEvent(eventId, data));
    } else {
      dispatch(uploadEvent(data));
    }
  };

  const clearState = () => {
    setEvent({
      title: "",
      desc: "",
      eventImageUrl: "",
      timeFrom: "",
      timeTo: "",
      hour_from: "",
      minutes_from: "",
      gmt_from: "",
      hour_to: "",
      minutes_to: "",
      gmt_to: ""
    });
    setSpeakers([]);
    setAgenda([]);
  };

  // EFFECTS
  // -------------
  /* handling edit process */
  useEffect(() => {
    if (isEditProcess) {
      setEvent({
        title,
        desc,
        eventImageUrl,
        timeFrom,
        timeTo,
        hour_from,
        minutes_from,
        gmt_from,
        hour_to,
        minutes_to,
        gmt_to
      });
      setSpeakers(eventSpeakers);
      setAgenda(eventAgenda);
    }
  }, []);
  const modal = isEditProcess ? "#EventPostModal" + eventId : "#EventPostModal";
  $(modal).on("hidden.bs.modal", function() {
    if (!isEditProcess) clearState();
    $(this).modal("dispose");
  });
  /* handling loaders and errors */
  useEffect(() => {
    if (
      (loading && uploadingEvent === false) ||
      (loading && editingEvent === false) ||
      (deleteLoading && deletingEvent === false)
    ) {
      setLoading(false);

      const modal = isEditProcess
        ? "#EventPostModal" + eventId
        : "#EventPostModal";
      $(modal).modal("hide");
    }
    if (
      (loading && uploadingEventErr === true) ||
      (loading && editingEventErr === true)
    )
      setLoading(null);
  }, [
    uploadingEvent,
    uploadingEventErr,
    editingEvent,
    editingEventErr,
    deletingEvent
  ]);

  return (
    <div
      className="modal fade"
      id={
        isEditProcess === true ? "EventPostModal" + eventId : "EventPostModal"
      }
      tabIndex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content postModal">
          <form onSubmit={onPost}>
            <input
              className="general-input d-block full-width"
              type="text"
              placeholder="Title...."
              name="title"
              value={event.title}
              required
              onChange={onChangeHandler}
            />
            <textarea
              className="general-input full-width"
              placeholder="Description...."
              name="desc"
              value={event.desc}
              onChange={onChangeHandler}
              rows="5"
            ></textarea>
            <input
              type="file"
              hidden
              id={
                isEditProcess
                  ? "event_image_upload" + eventId
                  : "event_image_upload"
              }
              accept=".png,.jpg"
              onChange={e => uploadImage(e)}
            />
            {event.eventImageUrl && (
              <div
                className="responsive_img_container mb-3"
                style={{
                  width: "80%",
                  margin: "auto",
                  border: "1px solid #DDD",
                  padding: 3,
                  height: 200,
                  borderRadius: 10
                }}
              >
                <img
                  style={{ borderRadius: 10 }}
                  src={event.eventImageUrl || "http://placehold.it/100/100"}
                />
              </div>
            )}
            <label
              style={{ cursor: "pointer" }}
              className="general-input white-bg remove-outline w-100 text-center mb-3"
              htmlFor={
                isEditProcess
                  ? "event_image_upload" + eventId
                  : "event_image_upload"
              }
            >
              Upload Event Image
              <i className="fas fa-upload ml-3" />
            </label>
            <div className="row">
              <div className="col-6">From</div>
              <div className="col-6">To</div>
              <div className="col">
                <input
                  className="general-input w-100"
                  type="date"
                  value={event.timeFrom}
                  name="timeFrom"
                  onChange={onChangeHandler}
                  required
                />
              </div>
              <div className="col">
                <input
                  className="general-input  w-100"
                  type="date"
                  value={event.timeTo}
                  name="timeTo"
                  onChange={onChangeHandler}
                  required
                />
              </div>
              <div className="col-6">
                <select
                  className="general-input full-width mb-2"
                  name="hour_from"
                  onChange={onChangeHandler}
                  value={event.hour_from}
                >
                  <option value="">Select Hour</option>
                  {hoursArray.map(hr => (
                    <option key={hr} value={hr}>
                      {hr}
                    </option>
                  ))}
                </select>

                <select
                  className="general-input full-width mb-2"
                  name="minutes_from"
                  onChange={onChangeHandler}
                  value={event.minutes_from}
                >
                  <option value="">Select minute</option>
                  {minutesArray.map(min => (
                    <option key={min} value={min}>
                      {min}
                    </option>
                  ))}
                </select>
                <select
                  className="general-input full-width mb-2"
                  name="gmt_from"
                  onChange={onChangeHandler}
                  value={event.gmt_from}
                >
                  <option>AM</option>
                  <option>PM</option>
                </select>
              </div>
              <div className="col-6">
                <select
                  className="general-input full-width mb-2"
                  name="hour_to"
                  onChange={onChangeHandler}
                  value={event.hour_to}
                >
                  <option value="">Select Hour</option>
                  {hoursArray.map(hr => (
                    <option key={hr} value={hr}>
                      {hr}
                    </option>
                  ))}
                </select>

                <select
                  className="general-input full-width mb-2"
                  name="minutes_to"
                  onChange={onChangeHandler}
                  value={event.minutes_to}
                >
                  <option value="">Select minute</option>
                  {minutesArray.map(min => (
                    <option key={min} value={min}>
                      {min}
                    </option>
                  ))}
                </select>
                <select
                  className="general-input full-width mb-2"
                  name="gmt_to"
                  onChange={onChangeHandler}
                  value={event.gmt_to}
                >
                  <option>AM</option>
                  <option>PM</option>
                </select>
              </div>
            </div>
            <hr className="mb-5" />
            {/* speakers */}
            <h6 className="mb-3">Event Speakers</h6>
            {speakers.map((speaker, index) => (
              <React.Fragment key={speaker.id}>
                {index !== 0 && (
                  <div className="d-flex align-items-center justify-content-center mb-3">
                    <div
                      className="bg-info"
                      style={{ width: "30%", height: 1 }}
                    />
                  </div>
                )}
                {speaker.speakerImgUrl && (
                  <div
                    className="responsive_img_container mb-3"
                    style={{
                      width: 100,
                      margin: "auto",
                      height: 100,
                      borderRadius: "50%"
                    }}
                  >
                    <img
                      style={{ borderRadius: "50%" }}
                      src={
                        speaker.speakerImgUrl || "http://placehold.it/100/100"
                      }
                    />
                  </div>
                )}
                <div className="d-flex justify-content-between">
                  <input
                    className="general-input d-block flex-grow-1"
                    type="text"
                    placeholder="Speaker Name...."
                    value={speaker.speakerName}
                    name="speakerName"
                    onChange={e => onSpeakerChange(e, index)}
                  />
                  <button
                    type="button"
                    className="btn btn-danger ml-3"
                    style={{ width: 40, height: 40 }}
                    title="Delete Speaker"
                    onClick={() => {
                      let newSpeaks = [...speakers];
                      newSpeaks.splice(index, 1);
                      setSpeakers([...newSpeaks]);
                    }}
                  >
                    <i className="fas fa-times" style={{ color: "#FFF" }} />
                  </button>
                </div>

                <textarea
                  className="general-input d-block full-width"
                  type="text"
                  placeholder="Extra Info...."
                  value={speaker.speakerInfo}
                  name="speakerInfo"
                  rows={5}
                  onChange={e => onSpeakerChange(e, index)}
                />

                <input
                  type="file"
                  hidden
                  accept=".png,.jpg"
                  onChange={e => uploadImage(e, index)}
                  id={speaker.id + "speaker"}
                />
                <label
                  style={{ cursor: "pointer" }}
                  className=" general-input white-bg remove-outline w-100 text-center mb-3"
                  htmlFor={speaker.id + "speaker"}
                >
                  Upload Speaker Image
                  <i className="ml-3 fas fa-upload" />
                </label>
              </React.Fragment>
            ))}
            {speakerError && (
              <div className="row text-center text-danger mb-3">
                {speakerError}
              </div>
            )}
            Add New Speaker
            <button
              className="plus-btn ml-3"
              type="button"
              onClick={() => {
                if (
                  speakers.length > 0 &&
                  speakers[speakers.length - 1].speakerName?.trim() === ""
                )
                  return setSpeakerError(
                    "Please fill out speaker name to be able to add others"
                  );

                //success case

                setSpeakerError("");
                setSpeakers(prevSpeakers => [
                  ...prevSpeakers,
                  {
                    id: uuid(),
                    speakerName: "",
                    speakerInfo: "",
                    speakerImgUrl: ""
                  }
                ]);
              }}
            >
              +
            </button>
            <hr className="mb-5" />
            <h6 className="mb-3">Event Agendas</h6>
            {/* agendas adding */}
            {agenda.map((ag, index) => {
              return (
                <React.Fragment key={ag.id}>
                  {index !== 0 && (
                    <div className="d-flex align-items-center justify-content-center mb-3">
                      <div
                        className="bg-info"
                        style={{ width: "30%", height: 1 }}
                      />
                    </div>
                  )}
                  <div className="d-flex justify-content-between">
                    <input
                      className="general-input d-block flex-grow-1"
                      type="text"
                      placeholder="Agenda-1 Title...."
                      name="title"
                      onChange={e => onAgendaChange(e, index)}
                      value={ag.title || ""}
                    />
                    <button
                      type="button"
                      className="btn btn-danger ml-3"
                      style={{ width: 40, height: 40 }}
                      title="Delete Agenda Element"
                      onClick={() => {
                        let newAgenda = [...agenda];
                        newAgenda.splice(index, 1);
                        console.log(newAgenda);
                        setAgenda([...newAgenda]);
                      }}
                    >
                      <i className="fas fa-times" style={{ color: "#FFF" }} />
                    </button>
                  </div>

                  <textarea
                    className="general-input d-block full-width"
                    placeholder="Agenda-1 Description...."
                    onChange={e => onAgendaChange(e, index)}
                    name="desc"
                    rows="5"
                    value={ag.desc || ""}
                  />
                </React.Fragment>
              );
            })}
            {agendaError && (
              <div className="row text-center text-danger mb-3">
                {agendaError}
              </div>
            )}
            Add New Agenda
            <button
              className="plus-btn remove-outline ml-3"
              onClick={() => {
                if (
                  agenda.length > 0 &&
                  agenda[agenda.length - 1].title?.trim() === ""
                )
                  return setAgendaError(
                    "Please fill out agenda title to be able to add others"
                  );

                //success case

                setAgendaError("");
                setAgenda(prevAgenda => [
                  ...prevAgenda,
                  { id: uuid(), title: "", desc: "" }
                ]);
              }}
              type="button"
            >
              +
            </button>
            <br />
            {deletingEventErr === true && (
              <div className="alert alert-danger alert-dismissible remove-outline">
                <button className="close" type="button" data-dismiss="alert">
                  <span>&times;</span>
                </button>
              </div>
            )}
            {loading === null && (
              <p className="alert alert-danger alert-sm my-2">
                Could not upload event, please try again!
              </p>
            )}
            <div className="d-flex">
              <button
                type="submit"
                className="post-btn green-btn remove-outline"
              >
                {loading ? (
                  <span className="spinner-border text-light" role="status" />
                ) : (
                  <>
                    {isEditProcess ? (
                      <span>Save Edits</span>
                    ) : (
                      <span>Post</span>
                    )}
                  </>
                )}
              </button>
              {isEditProcess && (
                <button
                  type="button"
                  className="btn btn-danger ml-auto"
                  title="Delete Event"
                  onClick={() => {
                    setDeleteLoading(true);
                    dispatch(deleteEvent(eventId));
                    $(
                      isEditProcess === true
                        ? "#EventPostModal" + eventId
                        : "#EventPostModal"
                    ).modal("hide");
                  }}
                >
                  {deletingEvent === true ? (
                    <span
                      className="spinner spinner-border text-light"
                      role="status"
                    />
                  ) : (
                    "Delete"
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EventPostModal;
