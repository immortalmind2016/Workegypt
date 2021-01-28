import React from "react";
import EventCard from "./EventCard";
import EventPostModal from "./EventPostModal";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import DotsGroup from "../../reusable/loaders/DotsGroup";
import { fetchEvents, loadMoreEvents } from "../../../redux/actions";
import moment from "moment";
const Events = () => {
  const dispatch = useDispatch();

  // states
  const [fetching, setFetching] = useState(true);
  const [getMoreCounter, setGetMoreCounter] = useState(0);
  const [moreLoading, setMoreLoading] = useState(null);

  //selectors
  const events = useSelector(state => state.event.events);
  const { fetchingEvents, loadingMoreEvents, settingGoing } = useSelector(
    state => state.event.loaders
  );
  const {
    fetchingEvents: fetchingEventsErr,
    settingGoing: settingGoingErr,
  } = useSelector(state => state.event.errors);

  // EFFECTS

  //mounting event
  useEffect(() => {
    dispatch(fetchEvents());
  }, []);
  useEffect(() => {
    if (fetching && fetchingEvents === false) {
      //success case
      setFetching(false);
    } else if (fetching && fetchingEventsErr === true) {
      // error case
      setFetching(null);
    }
    if (moreLoading && loadingMoreEvents === false) setMoreLoading(false);
  }, [fetchingEvents, fetchingEventsErr, loadingMoreEvents, moreLoading]);
  return (
    <div className="events">
      <div className="container">
        {localStorage.admToken && (
          <div className="events__header">
            <img
              src="/images/Logo.svg"
              alt="Logo"
              width={50}
              height={50}
              className="mr-2 rounded-circle "
            />
            <input
              className="events__header__input general-input"
              data-toggle="modal"
              data-target="#EventPostModal"
              type="text"
              placeholder="Upload your event...."
            />
            <EventPostModal />
          </div>
        )}
        {fetching === true && <DotsGroup isCentered={true} />}
        {fetching === null && (
          <div className="alert alert-danger alert-dismissible fade show">
            <button
              type="button"
              className="remove-outline close"
              data-dismiss="alert"
            >
              <span>&times;</span>
            </button>
            An error occurred while loading events, please try refreshing the
            page or check your internet connection
          </div>
        )}
        {fetching === false && (
          <>
            {events instanceof Array && events.length > 0 ? (
              <>
                {events.map(event => (
                  <EventCard
                    key={event._id}
                    eventId={event._id}
                    created_date={moment(event.created_date).fromNow()}
                    title={event.title}
                    desc={event.desc}
                    image_link={event.image_link}
                    agenda={event.agenda}
                    speakers={event.speakers}
                    going_counter={event.going_counter}
                    time={event.time}
                  />
                ))}

                <div
                  style={{
                    background: "rgb(250,250,250)",
                    borderRadius: 20,
                    width: "100%",
                    height: 40,
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    border: "1px solid #DDD",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    dispatch(loadMoreEvents((getMoreCounter + 1) * 5));
                    setMoreLoading(true);
                    setGetMoreCounter(getMoreCounter + 1);
                  }}
                >
                  {moreLoading === true ? (
                    <span className="spinner-border text-secondary" />
                  ) : (
                    <span>Load more</span>
                  )}
                </div>
              </>
            ) : (
              <span>No Events Added!</span>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default Events;
