import React, { Component } from "react";
import { connect } from "react-redux";
import FakeExtraData from "./profileComponents/FakeExtraData";

import {
  fetchProfile,
  createConversation,
  openContact,
} from "../../../redux/actions";
import Loader1 from "../../reusable/loaders/Loader_1";
import {
  Brief,
  Skills,
  Education,
  Experience,
  QuestionBox,
  LanguagesRating,
  Certificate,
  ExtraInfo,
  Languages,
  Training,
} from "./profileComponents";
import moment from "moment";
import { availableLanguages, langNameConverter } from "../../../utils/fixtures";
import uuid from "uuid";
import { Link } from "react-router-dom";
import Axios from "axios";
import { uris } from "../../../config";
import { withRouter } from "react-router-dom";
export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true, //should strt with true
      chosenLang: "en",
      isOpened: null,
      openContactIndicator: false,
    };
  }

  // open contact information
  openContact = () => {
    if (this.state.isOpened !== true) {
      this.setState({ ...this.state, openContactIndicator: true });
      this.props.openContact(this.props.shownProfile?._id);
    }
  };
  componentDidMount() {
    const { applicantId } = this.props.match.params;
    if (applicantId) {
      this.props.fetchProfile(false, applicantId, true);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.isLoading === true &&
      this.props.loaders.shownProfileFetching === false
    ) {
      Axios.get(uris?.company?.checkContact + this.props.shownProfile?._id)
        .then(({ status }) => {
          this.setState({ ...this.state, isOpened: true, isLoading: false });
        })
        .catch((e) =>
          this.setState({ ...this.state, isOpened: false, isLoading: false })
        );
    }
    if (
      this.state.openContactIndicator === true &&
      this.props.contactOpeningLoader === false &&
      this.props.contactOpeningError === false
    ) {
      this.setState({
        ...this.state,
        isOpened: true,
        openContactIndicator: false,
      });
    }
  }

  //methods
  setChosenLang = ({ currentTarget }) => {
    this.setState({ ...this.state, chosenLang: currentTarget?.value });
  };
  render() {
    if (this.state.isLoading) {
      return <Loader1 />;
    } else {
      const { shownProfile: spd, profileData: pd } = this.props;
      const { user: ud } = spd;
      const { chosenLang } = this.state;
      //shown profile data
      const image = spd && spd.image;
      const job_title = spd && spd.job_title;
      const skills = spd && spd.skills;
      const experience = spd && spd.experience;
      const education = spd && spd.education;
      const languages = spd && spd.languages;
      const certifications = spd && spd.certifications;
      const training = spd && spd.training_courses;
      const questions = spd && spd.questions && spd.questions[chosenLang];
      //user data
      const name = ud && ud.name;
      const last_update = spd && spd.last_update;
      const subscribeCount = pd?.subscribe?.count || 0;
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
                      : moment().format("hh:mm a")
                  }
                  isPreviewing={true}
                />
                <Languages languages={languages || []} isPreviewing={true} />

                <Skills skills={skills || null} isPreviewing={true} />
              </div>
            </aside>
            <div className="non-fixed-container">
              <main className="profile__main">
                {this.state.isOpened === true ? (
                  <ExtraInfo profile={spd} isPreviewing={true} />
                ) : (
                  <FakeExtraData
                    openContact={
                      subscribeCount > 0
                        ? this.openContact
                        : () => this.props.history.push("/contact")
                    }
                    contactOpeningLoader={this.props.contactOpeningLoader}
                    contactOpeningError={this.props.contactOpeningError}
                  />
                )}

                <Experience
                  experiences={experience || []}
                  _deleteProfileField={this._deleteProfileField}
                  isPreviewing={true}
                />

                <Education
                  educations={education || []}
                  _deleteProfileField={this._deleteProfileField}
                  isPreviewing={true}
                />

                <Certificate
                  isPreviewing={true}
                  certification={certifications || []}
                />
                <Training training={training || []} isPreviewing={true} />
                <h6
                  style={{ borderRadius: "0" }}
                  className="main-card-layout text-secondary text-center"
                >
                  Questions Answers
                </h6>
                <select
                  value={this.state.chosenLang}
                  style={{ borderRadius: "0" }}
                  className="flex-grow-1 w-100 mb-4 mr-2 btn border select-language main-card-layout"
                  onChange={this.setChosenLang}
                >
                  {availableLanguages
                    .filter((lang) => lang.value !== "br")
                    .map((lang) => (
                      <option key={uuid()} value={lang.value}>
                        {lang.name}
                      </option>
                    ))}
                </select>

                {questions?.length > 0 ? (
                  <>
                    {questions.map((q, index) => {
                      return (
                        <QuestionBox
                          key={uuid()}
                          index={index}
                          videoLink={q.link}
                          title={q.title}
                          isPreviewing={true}
                        />
                      );
                    })}
                  </>
                ) : (
                  <p className="text-center">no avail questions</p>
                )}
              </main>

              <aside className="profile__right-widget">
                <LanguagesRating languages={languages} isPreviewing={true} />
                {spd?.score &&
                  Object.keys(spd.score).find(
                    (key) => spd.score[key] !== ""
                  ) && (
                    <div className="main-card-layout mb-3">
                      {spd?.score &&
                        Object.keys(spd.score).map((key, index) => (
                          <div
                            key={key + index}
                            className="d-flex justify-content-around align-items-center"
                          >
                            {!!spd?.score[key] && (
                              <>
                                <span>{langNameConverter[key]}</span>
                                <span className="text-secondary">
                                  {spd.score[key]}
                                </span>
                              </>
                            )}
                          </div>
                        ))}
                    </div>
                  )}

                <a
                  href={this.state.isOpened !== true ? "#/" : spd?.cv_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn btn-outline-success ${
                    (!spd?.cv_url || this.state.isOpened !== true) && "disabled"
                  }`}
                >
                  Download cv
                </a>
                {this.state.isLoading === false && this.state.isOpened && (
                  <div className="flex-centered my-3">
                    <Link
                      to={`/chat/${this.props.match?.params?.applicantId}`}
                      className="btn btn-dark"
                      onClick={() => {
                        this.props.createConversation(
                          this.props.match?.params?.applicantId
                        );
                      }}
                    >
                      Message {ud?.name?.split(" ")[0]}
                      <i className="fab fa-facebook-messenger ml-3" />
                    </Link>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    shownProfile: state.profile.currentShownProfile,
    profileData: state.profile.profileData,
    userData: state.user.userData,
    contactOpeningLoader: state.user.contactOpeningLoader,
    contactOpeningError: state.user.errors.contactOpening,
    loaders: { ...state.profile.loaders },
  };
};

export default connect(mapStateToProps, {
  fetchProfile,
  createConversation,
  openContact,
})(withRouter(Profile));
