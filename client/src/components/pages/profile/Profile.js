/**
 * @TODO
 *CHANGE EDIT PROFILE METHODS SENT IN PROPS OF EACH COMPONENT
 *
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchProfile, editProfile } from "../../../redux/actions";
import Loader1 from "../../reusable/loaders/Loader_1";
import {
  Brief,
  Skills,
  Education,
  Experience,
  QuestionBox,
  LanguagesRating,
  ExtraInfo,
  Languages,
  Certificate,
  Training
} from "./profileComponents";
import moment from "moment";
import { availableLanguages, langNameConverter } from "../../../utils/fixtures";
import uuid from "uuid";
import { Link } from "react-router-dom";
import { uris } from "../../../config";
import Axios from "axios";

import $ from "jquery";
export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false, //should strt with true
      chosenLang: "en",
      cvLoading: null
    };
  }
  copyToClipboard = str => {
    const el = document.createElement("textarea");
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };
  componentDidMount() {
    $(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }
  componentWillUnmount() {
    $('[data-toggle="tooltip"]').tooltip("dispose");
  }

  //methods

  _editProfile = profileData => {
    if (this.props.userData) {
      this.props.editProfile({ ...profileData }, this.props.userData.userType);
    }
  };
  _editProfileField = (fieldKey, fieldIndex, newField, lang = false) => {
    /* edits profile arrays */
    if (lang) {
      let profileData = { ...this.props.profileData };
      profileData[fieldKey][this.state.chosenLang][fieldIndex] = newField;
      if (this.props.userData) {
        this.props.editProfile(profileData, this.props.userData.userType);
      }
    } else {
      let profileData = { ...this.props.profileData };
      profileData[fieldKey][fieldIndex] = newField;
      if (this.props.userData) {
        this.props.editProfile(profileData, this.props.userData.userType);
      }
    }
  };
  _deleteProfileField = (fieldKey, fieldIndex) => {
    /* edits profile arrays */
    let profileData = { ...this.props.profileData };
    profileData[fieldKey].splice(fieldIndex, 1);
    if (this.props.userData) {
      this.props.editProfile(profileData, this.props.userData.userType);
    }
  };

  setChosenLang = ({ currentTarget }) => {
    this.setState({ ...this.state, chosenLang: currentTarget.value });
  };

  //CV UPLOAD
  readURL = e => {
    if (e.target.files && e.target.files[0]) {
      //set loaders to be true
      this.setState({ ...this.state, cvLoading: true });

      //create multipart form
      const formData = new FormData();
      formData.append("cv", e.target.files[0]);

      //uploading CV
      Axios.post(uris.profile.uploadCv, formData, {
        headers: {
          "content-type": "multipart/form-data"
        }
      })
        .then(({ data }) => {
          //profile photo
          this.setState({
            ...this.state,
            cvLink: data.link,
            cvLoading: false
          });
          //editing profile image
          this.props.editProfile(
            {
              cv_url: data.link
            },
            false
          );
        })
        .catch(e => this.setState({ ...this.state, cvLoading: undefined }));
    }
  };

  render() {
    const { isLoading, chosenLang, cvLoading } = this.state;
    if (isLoading) {
      return <Loader1 />;
    } else {
      const { profileData: pd, userData: ud, loaders } = this.props;

      //profile data
      const image = pd && pd.image;
      const job_title = pd && pd.job_title;
      const skills = pd && pd.skills;
      const experience = pd && pd.experience;
      const education = pd && pd.education;
      const training = pd && pd.training_courses;
      const languages = pd && pd.languages;
      const certifications = pd && pd.certifications;
      const questions = pd && pd.questions && pd.questions[chosenLang];
      //user data
      const name = ud && ud.name;
      const last_update = pd?.last_update;
      if (pd === null) {
        return "loading..";
      }
      return (
        <div className="profile">
          <div className="container">
            <aside className="profile__left-widget">
              <div className="profile__left-widget__wrapper">
                <Brief
                  img={!image ? "http://placehold.it/100/ddd" : image}
                  profession={job_title || "Job Title"}
                  name={name || "user name"}
                  lastUpdated={
                    last_update
                      ? moment(last_update).fromNow()
                      : "No Updates Made"
                  }
                  _editProfile={this._editProfile}
                  profileEditing={loaders.profileEditing}
                />

                <Languages
                  languages={languages || []}
                  _editProfile={this._editProfile}
                  _deleteProfileField={this._deleteProfileField}
                />
                <Skills
                  skills={skills || []}
                  _editProfile={this._editProfile}
                  profileEditing={loaders.profileEditing}
                  _editProfileField={this._editProfileField}
                  _deleteProfileField={this._deleteProfileField}
                />
              </div>
            </aside>
            <div className="non-fixed-container">
              <main className="profile__main">
                <ExtraInfo profile={pd} _editProfile={this._editProfile} />

                <Experience
                  experiences={experience || []}
                  _editProfile={this._editProfile}
                  _deleteProfileField={this._deleteProfileField}
                />

                <Education
                  educations={education || []}
                  _editProfile={this._editProfile}
                  _deleteProfileField={this._deleteProfileField}
                />
                <Training
                  training={training || []}
                  _editProfile={this._editProfile}
                  _deleteProfileField={this._deleteProfileField}
                />
                <Certificate
                  certification={certifications || []}
                  _editProfile={this._editProfile}
                  _deleteProfileField={this._deleteProfileField}
                />

                <h6
                  style={{ borderRadius: "0" }}
                  className="main-card-layout text-secondary text-center question-answer"
                >
                  Questions Answers
                </h6>
                <label className="font-weight-bold">
                  Show the world your language skills throughout our interview
                  recorded videos
                </label>

                <ol>
                  <li>Choose the language you can speak from below list</li>
                  <li>Read the questions</li>
                  <li>Prepare your answers</li>
                  <li>Start video your answer</li>
                  <li>Upload your video answer</li>
                </ol>
                <select
                  value={this.state.chosenLang}
                  style={{ borderRadius: "0" }}
                  className="flex-grow-1 w-100 mb-4 mr-2 btn border select-language main-card-layout"
                  onChange={this.setChosenLang}
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Select A Language"
                >
                  {availableLanguages
                    .filter(lang => lang.value !== "br")
                    .map(lang => (
                      <option key={uuid()} value={lang.value}>
                        {lang.name}
                      </option>
                    ))}
                </select>
                {questions &&
                  (questions?.length > 0 ? (
                    <>
                      {questions.map((q, index) => {
                        return (
                          <QuestionBox
                            key={uuid()}
                            index={index}
                            _editProfile={this._editProfile}
                            _editProfileField={this._editProfileField}
                            videoLink={q.link}
                            title={q.title}
                          />
                        );
                      })}
                    </>
                  ) : (
                    false
                  ))}
              </main>

              <aside className="profile__right-widget">
                <LanguagesRating
                  languages={languages}
                  _editProfile={this._editProfile}
                  _editProfileField={this._editProfileField}
                />
                {pd?.score &&
                  Object.keys(pd.score).find(key => pd.score[key] !== "") && (
                    <div className="main-card-layout mb-3">
                      {pd?.score &&
                        Object.keys(pd.score).map((key, index) => (
                          <div
                            key={key + index}
                            className="d-flex justify-content-around align-items-center"
                          >
                            {!!pd?.score[key] && (
                              <>
                                <span>{langNameConverter[key]}</span>
                                <span className="text-secondary">
                                  {pd.score[key]}
                                </span>
                              </>
                            )}
                          </div>
                        ))}
                    </div>
                  )}
                <div className="profile__cv-actions">
                  <a
                    href={pd?.cv_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn btn-outline-success ${!pd?.cv_url &&
                      "disabled"}`}
                  >
                    Download cv
                  </a>
                  <label
                    htmlFor={cvLoading === true ? "" : "cv_upload"}
                    className="btn btn-outline-primary"
                  >
                    {cvLoading === true ? (
                      <span className="spinner-border" role="status" />
                    ) : (
                      "Upload CV"
                    )}
                  </label>

                  <input
                    type="file"
                    className="d-none"
                    id="cv_upload"
                    onChange={this.readURL}
                    accept=".pdf"
                  />
                </div>
                {cvLoading === false && (
                  <div
                    className="alert alert-success text-center alert-dismissible fade show"
                    role="alert"
                  >
                    CV Uploaded Successfully <i className="fas fa-check ml-3" />
                    <button
                      type="button"
                      className="close"
                      data-dismiss="alert"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                )}
                {cvLoading === undefined && (
                  <div
                    className="alert alert-danger text-center  alert-dismissible fade show"
                    role="alert"
                  >
                    Error Uploading The CV !
                    <button
                      type="button"
                      className="close"
                      data-dismiss="alert"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                )}
                <Link to="/complete-registration" className="btn btn-info">
                  Take Exam
                </Link>
              </aside>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    profileData: state.profile.profileData,
    userData: state.user.userData,
    loaders: { ...state.profile.loaders }
  };
};

export default connect(mapStateToProps, {
  fetchProfile,
  editProfile
})(Profile);
