/**
 * @todo
 * rating stars hover effect
 */
import React from "react";
import uuid from "uuid";
import BarLoader from "../../../reusable/loaders/BarLoader";
import $ from "jquery";
const starMouseDown = ({ target }) => {
  target.classList.add("tempActive");
  $(target).prevAll(".fa-star").addClass("tempActive");
};
const starMouseLeave = () => {
  $(".fa-star").removeClass("tempActive");
};
const Lang = ({ index, title, Score, _editProfileField }) => (
  <div className="rating-box">
    <h6 className="lang-name text-center">{title}</h6>

    <div className="relative-container">
      <div className="stars-box">
        <i
          className={`fas fa-star ${parseInt(Score) - 1 >= 0 && "active"}`}
          data-rating="1"
          onClick={() =>
            _editProfileField("languages", index, { title, Score: "1" })
          }
          onMouseEnter={starMouseDown}
          onMouseLeave={starMouseLeave}
        />
        <i
          className={`fas fa-star ${parseInt(Score) - 2 >= 0 && "active"}`}
          data-rating="2"
          onClick={() =>
            _editProfileField("languages", index, { title, Score: "2" })
          }
          onMouseEnter={starMouseDown}
          onMouseLeave={starMouseLeave}
        />
        <i
          className={`fas fa-star ${parseInt(Score) - 3 >= 0 && "active"}`}
          data-rating="3"
          onClick={() =>
            _editProfileField("languages", index, { title, Score: "3" })
          }
          onMouseEnter={starMouseDown}
          onMouseLeave={starMouseLeave}
        />
        <i
          className={`fas fa-star ${parseInt(Score) - 4 >= 0 && "active"}`}
          data-rating="4"
          onClick={() =>
            _editProfileField("languages", index, { title, Score: "4" })
          }
          onMouseEnter={starMouseDown}
          onMouseLeave={starMouseLeave}
        />
        <i
          className={`fas fa-star ${parseInt(Score) - 5 === 0 && "active"}`}
          data-rating="5"
          onClick={() =>
            _editProfileField("languages", index, { title, Score: "5" })
          }
          onMouseEnter={starMouseDown}
          onMouseLeave={starMouseLeave}
        />
      </div>
      <span
        style={{
          position: "absolute",
          right: "-4rem",
          top: "0.5rem",
          fontSize: "1.1rem",
        }}
        className="text-muted"
      >
        {Score} of 5
      </span>
    </div>
  </div>
);
const LangPreview = ({ title, Score }) => (
  <div className="rating-box">
    <h6 className="lang-name text-center">{title}</h6>

    <div className="relative-container">
      <div className="stars-box">
        <i
          className={`fas fa-star ${parseInt(Score) - 1 >= 0 && "active"}`}
          data-rating="1"
        />
        <i
          className={`fas fa-star ${parseInt(Score) - 2 >= 0 && "active"}`}
          data-rating="2"
        />
        <i
          className={`fas fa-star ${parseInt(Score) - 3 >= 0 && "active"}`}
          data-rating="3"
        />
        <i
          className={`fas fa-star ${parseInt(Score) - 4 >= 0 && "active"}`}
          data-rating="4"
        />
        <i
          className={`fas fa-star ${parseInt(Score) - 5 === 0 && "active"}`}
          data-rating="5"
        />
      </div>
      <span
        style={{
          position: "absolute",
          right: "-4rem",
          top: "0.5rem",
          fontSize: "1.1rem",
        }}
        className="text-muted"
      >
        {Score} of 5
      </span>
    </div>
  </div>
);
export default function LanguagesRating({
  languages = [],
  _editProfileField,
  isPreviewing,
}) {
  if (languages !== null) {
    return (
      <div className="profile__languages-rating main-card-layout">
        <h4 className="mb-4">Rate your language level</h4>
        {!isPreviewing ? (
          <>
            {languages.length > 0
              ? languages.map((lang, i) => (
                  <Lang
                    key={uuid()}
                    title={lang.title}
                    Score={lang.Score}
                    index={i}
                    _editProfileField={_editProfileField}
                  />
                ))
              : "No Languages Added"}
          </>
        ) : (
          <>
            {languages.length > 0
              ? languages.map((lang, i) => (
                  <LangPreview
                    key={uuid()}
                    title={lang.title}
                    Score={lang.Score}
                    index={i}
                    _editProfileField={_editProfileField}
                  />
                ))
              : "No Languages Added"}
          </>
        )}
      </div>
    );
  } else {
    return (
      <div className="profile__languages-rating main-card-layout relative-container">
        <BarLoader />
      </div>
    );
  }
}
