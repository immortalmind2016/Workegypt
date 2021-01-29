import $ from "jquery";
import React, { Component } from "react";
import { connect } from "react-redux";
import validator from "validator";

import isEmpty from "../../../../utils/isEmpty";
import ExtraInfoModal from "./ExtraInfoModal";

class ExtraInfo extends Component {
  constructor(props) {
    super(props);

    const {
      basic_info,
      gender,
      marital_status,
      number_of_dependents,
      military_status,
      driving_license,
      your_contact_info,
      minimum_salary,
      hide_salary,
      current_career_level,
      current_education_level,
      what_would_like_to_work,
      social_links: sl,
    } = props.profile;

    const { live_in, age, graduated } = basic_info || {
      live_in: "",
      age: "",
      graduated: "",
    };
    const lvArr = live_in.split(",");
    this.state = {
      age: age || "", //number not string
      graduated: graduated || "",
      live_in_country: lvArr[0] || "",
      live_in_state: lvArr[1] || "",
      gender: gender || "male",
      maritalStatus: marital_status || "Unspecified",
      numOfDep: number_of_dependents || "",
      militaryStatus: military_status || "Temporal Exemption",
      haveLicence: driving_license || false,
      contactInfo_mobileNumber: your_contact_info?.mobile_number || "",
      contactInfo_altMobileNumber: your_contact_info?.alternative || "",
      minimumSalary: minimum_salary || "",
      hideSalary: hide_salary || false,
      currentCareerLevel: current_career_level || "Entry level",
      currentEducationLevel: current_education_level || "Bachelor degree",
      whereToWork: what_would_like_to_work?.join() || "",

      facebook: sl?.facebook || "",
      twitter: sl?.twitter || "",
      insta: sl?.insta || "",
      linkedin: sl?.linkedin || "",
      behance: sl?.behance || "",
      github: sl?.github || "",
      stack_over_flow: sl?.stack_over_flow || "",
      youtube: sl?.youtube || "",
      blog: sl?.blog || "",
      other: sl?.other || "",
      phoneNumberError: "",
      socialLinksError: "",
      incompleteDataError: "",
      loading: false, //indicator for profile editing loader
    };
  }

  onChangeHandler = (e, number = false) => {
    if (number && /^[0-9]*$/gm.test(e.target.value) === false) {
      e.preventDefault();
      return;
    }

    if (
      (e.target.name === "age" || e.target.name === "graduated") &&
      (isNaN(e.target.value) ||
        (e.target.value.length === 1 && e.target.value === "0"))
    )
      return;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;
    this.setState({ ...this.state, [name]: value });
  };
  onSave = () => {
    const {
      age,
      graduated,
      live_in_country,
      live_in_state,
      gender,
      maritalStatus,
      numOfDep,
      militaryStatus,
      haveLicence,
      contactInfo_mobileNumber,
      contactInfo_altMobileNumber,
      minimumSalary,
      hideSalary,
      currentCareerLevel,
      currentEducationLevel,
      whereToWork,
      facebook,
      twitter,
      insta,
      linkedin,
      behance,
      github,
      stack_over_flow,
      youtube,
      blog,
      other,
    } = this.state;
    // phone number validation
    if (
      ![
        age,
        graduated,
        live_in_country,
        live_in_state,
        gender,
        maritalStatus,
        numOfDep,
        militaryStatus,
        haveLicence,
        contactInfo_mobileNumber,
        contactInfo_altMobileNumber,
        minimumSalary,
        hideSalary,
        currentCareerLevel,
        currentEducationLevel,
        whereToWork,
      ].every(ele => !isEmpty(ele))
    ) {
      this.setState({
        ...this.state,
        incompleteDataError: "Please fill out all the required fields fields! except for social links",
      });

      return;
    } else {
      this.setState({
        ...this.state,
        incompleteDataError: "",
      });
    }

    if (
      (contactInfo_mobileNumber &&
        /01[0-9]{9}$/.test(contactInfo_mobileNumber) === false) ||
      (contactInfo_altMobileNumber &&
        /01[0-9]{9}$/.test(contactInfo_altMobileNumber) === false)
    ) {
      this.setState({
        ...this.state,
        phoneNumberError:
          "phone number has to start with 01 and to has the length of 11 digits",
      });
      return;
    } else {
      this.setState({ ...this.state, phoneNumberError: "" });
    }

    // social links validation
    if (
      (facebook && !validator.isURL(facebook)) ||
      (twitter && !validator.isURL(twitter)) ||
      (insta && !validator.isURL(insta)) ||
      (linkedin && !validator.isURL(linkedin)) ||
      (behance && !validator.isURL(behance)) ||
      (github && !validator.isURL(github)) ||
      (stack_over_flow && !validator.isURL(stack_over_flow)) ||
      (youtube && !validator.isURL(youtube)) ||
      (blog && !validator.isURL(blog)) ||
      (other && !validator.isURL(other))
    ) {
      this.setState({
        ...this.state,
        socialLinksError: "Please enter valid links",
      });
      return;
    }
    this.setState({
      ...this.state,
      socialLinksError: "",
    });
    const data = {
      basic_info: {
        age: parseInt(age),
        graduated: graduated,
        live_in: `${live_in_country}, ${live_in_state}`,
      },

      gender,
      marital_status: maritalStatus,
      number_of_dependents: numOfDep,
      military_status: militaryStatus,

      driving_license: haveLicence,
      your_contact_info: {
        mobile_number: contactInfo_mobileNumber,
        alternative: contactInfo_altMobileNumber,
      },

      minimum_salary: minimumSalary,
      hide_salary: hideSalary,
      current_career_level: currentCareerLevel,
      current_education_level: currentEducationLevel,
      social_links: {
        facebook,
        twitter,
        insta,
        linkedin,
        behance,
        github,
        stack_over_flow,
        youtube,
        blog,
        other,
      },
      what_would_like_to_work: whereToWork
        .trim()
        .split(",")
        .map(w => w.trim())
        .filter(w => w !== "")
        .slice(0, 5),
    };
    //edit
    this.setProfileLoading(true);
    this.props._editProfile({ ...data });
  };

  setProfileLoading = (loading = false) => {
    this.setState({ ...this.state, loading });
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.basic_info &&
      this.props.basic_info !== prevProps.basic_info
    ) {
      const { live_in, age, graduated } = this.props.basic_info;
      const lvArr = live_in.split(",");
      this.setState({
        ...this.state,
        age,
        graduated,
        live_in_country: lvArr[0],
        live_in_state: lvArr[1],
      });
    }
    if (this.state.loading && this.props.profileEditing === false) {
      this.setProfileLoading(false);
      $("#ExtraInfoModal").modal("hide");
    }
  }

  render() {
    const { profile: prof, isPreviewing = false } = this.props;

    const {
      gender,
      marital_status,
      number_of_dependents,
      military_status,
      driving_license,
      your_contact_info,
      minimum_salary,
      hide_salary,
      current_career_level,
      current_education_level,
      what_would_like_to_work,
      basic_info,
      social_links: sl,
    } = prof;
    if (basic_info) {
      const {
        age = 0,
        graduated = "not selected",
        live_in = "not selected",
      } = basic_info;
      return (
        <div className="profile__extra-info main-card-layout relative-container">
          <div className="d-flex  w-100">
            <h6
              className="main-card-layout__title font-weight-bold"
              style={{ maxWidth: 300 }}
            >
              Basic Information
            </h6>
          </div>

          {!isPreviewing && (
            <button
              className="btn--add-plus btn btn-primary rounded-circle"
              type="button"
              data-toggle="modal"
              data-target="#ExtraInfoModal"
              style={{ zIndex: 10 }}
            >
              <i
                className="fas fa-pen text-light"
                data-toggle="tooltip"
                data-placement="top"
                title="Edit Profile Information"
              />
            </button>
          )}

          <ExtraInfoModal
            onSave={this.onSave}
            {...this.state}
            onChangeHandler={this.onChangeHandler}
            phoneNumberError={this.state.phoneNumberError}
            socialLinksError={this.state.socialLinksError}
            incompleteDataError={this.state.incompleteDataError}
            loading={this.state.loading}
          />

          <div className="info">
            <div className="d-flex flex-grow-1 align-items-center w-100">
              <div className="content">
                <div className="d-flex justify-content-center align-items-center">
                  <img src="/images/age.svg" alt="" />
                  <h6 className="info__title ml-2">Age</h6>
                </div>
                {age ? (
                  <span className="text-muted text-center">{age} years</span>
                ) : (
                  <span className="text-muted text-center">__</span>
                )}
              </div>
            </div>

            <div className="d-flex flex-grow-1 align-items-center w-100">
              <div className="content">
                <div className="d-flex justify-content-center align-items-center">
                  <img className="  " src="/images/students-cap.svg" alt="" />
                  <h6 className="info__title ml-2">Graduation Year</h6>
                </div>

                <span className="text-muted text-center">
                  {graduated || "__"}
                </span>
              </div>
            </div>
          </div>

          <div className="info">
            <div className="d-flex flex-grow-1 align-items-center w-100">
              <div className="content">
                <div className="d-flex justify-content-center align-items-center">
                  <i className="fas fa-map" />
                  <h6 className="info__title ml-2">live in</h6>
                </div>
                <span className="text-muted">{live_in || "__"}</span>
              </div>
            </div>
            <div className="d-flex flex-grow-1 align-items-center w-100">
              <div className="content">
                <div className="d-flex justify-content-center align-items-center">
                  <i className="fab fa-gratipay " />
                  <h6 className="info__title ml-2">Marital Status</h6>
                </div>
                <span className="text-muted">{marital_status || "__"}</span>
              </div>
            </div>
          </div>

          <div className="info">
            <div className="d-flex flex-grow-1 align-items-center w-100">
              <div className="content">
                <div className="d-flex justify-content-center align-items-center">
                  <i className="fas fa-baby "></i>
                  <h6 className="info__title ml-2">Number Of Dependents</h6>
                </div>
                <span className="text-muted">
                  {number_of_dependents || "__"}
                </span>
              </div>
            </div>
            <div className="d-flex flex-grow-1 align-items-center w-100">
              <div className="content">
                <div className="d-flex justify-content-center align-items-center">
                  <i className="fas fa-hard-hat" />
                  <h6 className="info__title ml-2">Military Status</h6>
                </div>
                <span className="text-muted">{military_status || "__"}</span>
              </div>
            </div>
          </div>

          <div className="info">
            <div className="d-flex flex-grow-1 align-items-center w-100">
              <div className="content">
                <div className="d-flex justify-content-center align-items-center">
                  <i className="fas fa-biking "></i>
                  <h6 className="info__title ml-2">Have Driving Licence ?</h6>
                </div>
                <span className="text-muted">
                  {driving_license ? "Yes" : "No"}
                </span>
              </div>
            </div>
            <div className="d-flex flex-grow-1 align-items-center w-100">
              <div className="content">
                <div className="d-flex justify-content-center align-items-center">
                  <i className="fas fa-venus-mars" />
                  <h6 className="info__title ml-2">Gender</h6>
                </div>
                <span className="text-muted">{gender || "__"}</span>
              </div>
            </div>
          </div>

          <div className="info">
            <div className="d-flex flex-grow-1 align-items-center w-100">
              <div className="content">
                <div className="d-flex justify-content-center align-items-center">
                  <i className="fas fa-phone-square-alt "></i>
                  <h6 className="info__title ml-2">Phone Number</h6>
                </div>
                <span className="text-muted">
                  {your_contact_info.mobile_number || "__"}
                </span>
              </div>
            </div>
            <div className="d-flex flex-grow-1 align-items-center w-100">
              <div className="content">
                <div className="d-flex justify-content-center align-items-center">
                  <i className="fas fa-phone " style={{ color: "#666" }} />
                  <h6 className="info__title ml-2" style={{ color: "#666" }}>
                    Alternative Number
                  </h6>
                </div>
                <span className="text-muted">
                  {your_contact_info.alternative || "__"}
                </span>
              </div>
            </div>
          </div>

          <div className="info">
            <div className="d-flex flex-grow-1 align-items-center w-100">
              <div className="content">
                <div className="d-flex justify-content-center align-items-center">
                  <i className="fas fa-suitcase"></i>
                  <h6 className="info__title ml-2">Career Level</h6>
                </div>
                <span className="text-muted">
                  {current_career_level || "__"}
                </span>
              </div>
            </div>
            <div className="d-flex flex-grow-1 align-items-center w-100">
              <div className="content">
                <div className="d-flex justify-content-center align-items-center">
                  <i className="fas fa-university" />
                  <h6 className="info__title ml-2">Education Level</h6>
                </div>
                <span className="text-muted">
                  {current_education_level || "__"}
                </span>
              </div>
            </div>
          </div>

          <div className="info">
            <div className="d-flex flex-grow-1 align-items-center w-100">
              <div className="content">
                <div className="d-flex justify-content-center align-items-center">
                  <i className="fas fa-map-marker-alt"></i>
                  <h6 className="info__title ml-2">
                    Where Would You Like To Work
                  </h6>
                </div>
                <span className="text-muted">
                  {what_would_like_to_work.join() || "__"}
                </span>
              </div>
            </div>
          </div>
          {hide_salary && (
            <div className="info">
              <div className="d-flex flex-grow-1 align-items-center w-100">
                <div className="content">
                  <div className="d-flex justify-content-center align-items-center">
                    <i className="fas fa-dollar-sign"></i>
                    <h6 className="info__title ml-2">Expected Salary</h6>
                  </div>
                  <span className="text-muted">{minimum_salary} Dollars</span>
                </div>
              </div>
            </div>
          )}
          {Object.values(sl).filter(val => val.trim() !== "")?.length > 0 && (
            <div className="info">
              <div className="d-flex flex-grow-1 align-items-center w-100">
                <div className="content">
                  <div className="d-flex justify-content-center align-items-center mb-3">
                    <i className="fas fa-paperclip"></i>
                    <h6 className="info__title ml-2">Social Links</h6>
                  </div>

                  <div className="d-flex justify-content-center">
                    {sl.facebook && (
                      <a
                        target="_blank"
                        className="mr-2"
                        rel="noopener noreferrer"
                        href={sl.facebook}
                      >
                        <i className="fab fa-facebook-square fa-2x" />
                      </a>
                    )}
                    {sl.twitter && (
                      <a
                        target="_blank"
                        className="mr-2"
                        rel="noopener noreferrer"
                        href={sl.twitter}
                      >
                        <i className="fab fa-twitter-square fa-2x" />
                      </a>
                    )}
                    {sl.insta && (
                      <a
                        target="_blank"
                        className="mr-2"
                        rel="noopener noreferrer"
                        href={sl.insta}
                      >
                        <i className="fab fa-instagram-square fa-2x" />
                      </a>
                    )}
                    {sl.linkedin && (
                      <a
                        target="_blank"
                        className="mr-2"
                        rel="noopener noreferrer"
                        href={sl.linkedin}
                      >
                        <i className="fab fa-linkedin fa-2x" />
                      </a>
                    )}
                    {sl.behance && (
                      <a
                        target="_blank"
                        className="mr-2"
                        rel="noopener noreferrer"
                        href={sl.behance}
                      >
                        <i className="fab fa-behance-square fa-2x" />
                      </a>
                    )}
                    {sl.github && (
                      <a
                        target="_blank"
                        className="mr-2"
                        rel="noopener noreferrer"
                        href={sl.github}
                      >
                        <i className="fab fa-github-square fa-2x" />
                      </a>
                    )}
                    {sl.stack_over_flow && (
                      <a
                        target="_blank"
                        className="mr-2"
                        rel="noopener noreferrer"
                        href={sl.stack_over_flow}
                      >
                        <i className="fab fa-stack-overflow fa-2x" />
                      </a>
                    )}
                    {sl.youtube && (
                      <a
                        target="_blank"
                        className="mr-2"
                        rel="noopener noreferrer"
                        href={sl.youtube}
                      >
                        <i className="fab fa-youtube fa-2x" />
                      </a>
                    )}
                    {sl.blog && (
                      <a
                        target="_blank"
                        className="mr-2"
                        rel="noopener noreferrer"
                        href={sl.blog}
                      >
                        <i className="fab fa-blogger fa-2x" />
                      </a>
                    )}
                    {sl.other && (
                      <a
                        target="_blank"
                        className="mr-2"
                        rel="noopener noreferrer"
                        href={sl.other}
                      >
                        <i className="fas fa-anchor fa-2x mr-2" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <>
          <div className="profile__extra-info main-card-layout relative-container">
            {!isPreviewing ? (
              <>
                <button
                  className="btn--add-plus btn btn-primary rounded-circle"
                  type="button"
                  data-toggle="modal"
                  data-target="#ExtraInfoModal"
                  style={{ zIndex: 10 }}
                >
                  <i
                    className="fas fa-plus text-light"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Add Profile Information"
                  />
                </button>
                <p className="mt-5 font-weight-bold">
                  please press plus button to add your basic info
                </p>
              </>
            ) : (
              <span>Applicant Did Not Provide His Data Yet</span>
            )}
          </div>
          <ExtraInfoModal
            onSave={this.onSave}
            {...this.state}
            onChangeHandler={this.onChangeHandler}
          />
        </>
      );
    }
  }
}

const mapStateToProps = state => ({
  profileEditing: state.profile.loaders.profileEditing,
});

export default connect(mapStateToProps)(ExtraInfo);
