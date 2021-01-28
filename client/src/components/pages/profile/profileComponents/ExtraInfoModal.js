import React from "react";

import { profile } from "../../../../utils/fixtures";

const ExtraInfoModal = ({
  age,
  graduated,
  live_in_country,
  live_in_state,
  onChangeHandler,
  onSave,
  errors,
  /* newly added */
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
  phoneNumberError,
  socialLinksError,
  incompleteDataError,
  loading,
}) => {
  return (
    <div
      className="modal fade avoid-navbar exp-modal"
      id="ExtraInfoModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="ExtraInfoModalTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog  " role="document">
        <div className="modal-content " style={{ marginBottom: 100 }}>
          <div className="modal-header">
            <h3 className="modal-title" id="ExtraInfoModalTitle">
              Add basic info
            </h3>
          </div>
          <div className="modal-body" style={{ padding: 0 }}>
            <div className="my-4">
              <span className="text-danger">*</span>
              please note that all inputs are required except for social links
            </div>
            {errors && (
              <p className="text-danger mb-2">missing required fields!</p>
            )}

            <input
              className="exp-input"
              type="text"
              name="age"
              placeholder="age.."
              value={age}
              maxLength="3"
              onChange={onChangeHandler}
            />
            <input
              className="exp-input"
              name="graduated"
              placeholder="graduation year.."
              value={graduated}
              onChange={onChangeHandler}
              maxLength="4"
            />

            <div className="d-flex select-container">
              <input
                className="w-50 mr-1 exp-input"
                name="live_in_country"
                placeholder="country.."
                value={live_in_country}
                onChange={onChangeHandler}
                list="extra_info_countries"
              />

              <datalist id="extra_info_countries">
                {profile.countries.map(country => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </datalist>

              <input
                className="w-50 ml-1 exp-input"
                name="live_in_state"
                placeholder="state.."
                value={live_in_state}
                onChange={onChangeHandler}
                list="states_extrainfo"
              />
              <datalist id="states_extrainfo">
                {profile.states.map(st => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </datalist>
            </div>
            <div className="select-container">
              <hr />
            </div>
            {/* row start */}
            <div className="d-flex select-container">
              <div className="form-group  w-50">
                <label className="text-secondary" htmlFor="gender">
                  Gender:
                </label>

                <select
                  className="w-100  mr-1 exp-input form-control py-1"
                  name="gender"
                  placeholder="Gender.."
                  value={gender}
                  onChange={onChangeHandler}
                  id="gender"
                >
                  <option value="male">male</option>
                  <option value="female">female</option>
                </select>
              </div>
              <div className="form-group  w-50">
                <label className="text-secondary" htmlFor="gender">
                  Marital Status:
                </label>

                <select
                  className="w-100 ml-2 exp-input form-control py-1"
                  name="maritalStatus"
                  placeholder="Marital Status.."
                  value={maritalStatus}
                  onChange={onChangeHandler}
                  id="maritalStatus"
                >
                  <option value="Unspecified">Unspecified</option>
                  <option value="Married">Married</option>
                  <option value="single">single</option>
                </select>
              </div>
            </div>
            {/* row end */}
            {/* row start */}
            <div className="d-flex select-container align-items-center">
              <div className="form-group  w-50">
                <label className="text-secondary" htmlFor="gender">
                  Military Status:
                </label>

                <select
                  className="w-100  mr-1 exp-input form-control py-1"
                  name="militaryStatus"
                  placeholder="Military Status.."
                  value={militaryStatus}
                  onChange={onChangeHandler}
                  id="militaryStatus"
                >
                  <option value="Temporal Exemption">Temporal Exemption</option>
                  <option value="Eternal Exemption">Eternal Exemption</option>
                  <option value="Not Finished">Not Finished</option>
                </select>
              </div>
              <div className="form-group mt-3 w-50">
                <div className="from-group form-check w-100 ml-4">
                  <input
                    className="form-check-input"
                    name="haveLicence"
                    placeholder="have licence ?"
                    checked={haveLicence}
                    onChange={onChangeHandler}
                    id="haveLicence"
                    type="checkbox"
                  />
                  <label
                    className="form-check-label ml-3"
                    htmlFor="haveLicence"
                  >
                    I have Driving Licence
                  </label>
                </div>
              </div>
            </div>
            {/* row end */}

            {/* row start */}
            <div className="d-flex select-container">
              <input
                className="w-100 exp-input form-control py-1"
                name="numOfDep"
                placeholder="Number Of Dependents.."
                value={numOfDep}
                onChange={e => onChangeHandler(e, true)}
                id="numOfDep"
                type="text"
              />
            </div>
            {/* row end */}
            <div className="select-container">
              <hr />
            </div>

            {/* row start */}
            <div className="select-container text-secondary mb-2">
              Your Contact Info— Hint: Companies will be contacting you on this
              number
            </div>

            <div className="d-flex select-container">
              <input
                className="w-50  exp-input form-control py-1"
                name="contactInfo_mobileNumber"
                placeholder="Mobile Number*.."
                value={contactInfo_mobileNumber}
                onChange={e => onChangeHandler(e, true)}
                id="contactInfo_mobileNumber"
                type="text"
                maxLength={11}
              />
              <input
                className="w-50 ml-2 exp-input form-control py-1"
                name="contactInfo_altMobileNumber"
                placeholder="Alternative Number.."
                value={contactInfo_altMobileNumber}
                onChange={e => onChangeHandler(e, true)}
                maxLength={11}
                id="contactInfo_altMobileNumber"
                type="text"
              />
              {/* row end */}
            </div>
            {phoneNumberError && (
              <span className="text-danger">{phoneNumberError}</span>
            )}

            <div className="select-container">
              <hr />
            </div>

            {/* row start */}
            <div className="select-container text-secondary mb-2">
              What salary you would accept?— Add a net salary {"("}i.e., final
              amount you want after taxes and insurance{")"}
            </div>

            <div className="d-flex select-container align-items-center">
              <input
                className="w-50  exp-input form-control py-1"
                name="minimumSalary"
                placeholder="Enter Salary In Dollars $.."
                value={minimumSalary}
                onChange={e => onChangeHandler(e, true)}
                id="minimumSalary"
                type="text"
              />

              <div className="from-group form-check w-50 ml-4">
                <input
                  className="form-check-input"
                  name="hideSalary"
                  placeholder="Enter Salary In Dollars $.."
                  checked={hideSalary}
                  onChange={onChangeHandler}
                  id="hideSalary"
                  type="checkbox"
                />
                <label className="form-check-label ml-3" htmlFor="hideSalary">
                  Hide Salary
                </label>
              </div>
            </div>
            {/* row end */}
            <div className="select-container">
              <hr />
            </div>
            {/* row start */}
            <div className="d-flex select-container">
              <div className="form-group  w-50">
                <label className="text-secondary" htmlFor="gender">
                  Current Education Level:
                </label>

                <select
                  className="w-100  mr-1 exp-input form-control py-1"
                  name="currentEducationLevel"
                  placeholder="Education Level.."
                  value={currentEducationLevel}
                  onChange={onChangeHandler}
                  id="currentEducationLevel"
                >
                  <option value="Bachelor degree">Bachelor degree</option>
                  <option value="Master's degree">Master's degree</option>
                  <option value="Doctoral degree">Doctoral degree</option>
                  <option value="High school">High school</option>
                  <option value="Diploma">Diploma</option>
                </select>
              </div>
              <div className="form-group  w-50">
                <label className="text-secondary" htmlFor="gender">
                  Current Career Level:
                </label>
                <select
                  className="w-100 ml-2 exp-input form-control py-1"
                  name="currentCareerLevel"
                  placeholder="Current Career Level.."
                  value={currentCareerLevel}
                  onChange={onChangeHandler}
                  id="currentCareerLevel"
                >
                  <option value="Student">Student</option>
                  <option value="Entry level">Entry level</option>
                  <option value="Experienced (non manger)">
                    Experienced {"("}non manger{")"}
                  </option>
                  <option value="Manager">Manager</option>
                  <option value="Senior management">Senior management</option>
                </select>
              </div>
            </div>
            {/* row end */}

            {/* row start */}
            <div className="select-container text-secondary mb-2">
              Please Enter 5 Cities separated by a comma after each city ex:
              Nasr city , Masr El Gdeeda , 6th of October ..etc
            </div>
            <small className="select-container text-secondary mb-4">
              Please Note That Only First Five Cities will Be Stored
            </small>
            <div className="d-flex select-container">
              <textarea
                className="w-100 exp-input form-control py-1"
                name="whereToWork"
                placeholder="Where Would You Like To Work.."
                value={whereToWork}
                onChange={onChangeHandler}
                id="whereToWork"
                type="text"
                style={{ resize: "none", height: 100 }}
              />
            </div>
            {/* row end */}
            <div className="select-container">
              <hr />
            </div>
            {/* row start */}
            <div className="select-container">
              <h6>Social Links</h6>
            </div>

            <div className="d-flex flex-column select-container align-items-center">
              <input
                className="w-100  exp-input form-control py-1"
                name="facebook"
                placeholder="Facebook Link.."
                value={facebook}
                onChange={onChangeHandler}
                id="facebook"
                type="text"
              />

              <input
                className="w-100  exp-input form-control py-1"
                name="twitter"
                placeholder="Twitter Link.."
                value={twitter}
                onChange={onChangeHandler}
                id="twitter"
                type="text"
              />
              <input
                className="w-100  exp-input form-control py-1"
                name="insta"
                placeholder="Instagram Link.."
                value={insta}
                onChange={onChangeHandler}
                id="insta"
                type="text"
              />
              <input
                className="w-100  exp-input form-control py-1"
                name="linkedin"
                placeholder="Linkedin Link.."
                value={linkedin}
                onChange={onChangeHandler}
                id="linkedin"
                type="text"
              />
              <input
                className="w-100  exp-input form-control py-1"
                name="behance"
                placeholder="Behance Link.."
                value={behance}
                onChange={onChangeHandler}
                id="behance"
                type="text"
              />
              <input
                className="w-100  exp-input form-control py-1"
                name="github"
                placeholder="Github Link.."
                value={github}
                onChange={onChangeHandler}
                id="github"
                type="text"
              />
              <input
                className="w-100  exp-input form-control py-1"
                name="stack_over_flow"
                placeholder="Stack Over Flow Link.."
                value={stack_over_flow}
                onChange={onChangeHandler}
                id="stack_over_flow"
                type="text"
              />
              <input
                className="w-100  exp-input form-control py-1"
                name="youtube"
                placeholder="Youtube Link.."
                value={youtube}
                onChange={onChangeHandler}
                id="youtube"
                type="text"
              />
              <input
                className="w-100  exp-input form-control py-1"
                name="blog"
                placeholder="Blog Link.."
                value={blog}
                onChange={onChangeHandler}
                id="blog"
                type="text"
              />
              <input
                className="w-100  exp-input form-control py-1"
                name="other"
                placeholder="Other Link.."
                value={other}
                onChange={onChangeHandler}
                id="other"
                type="text"
              />
            </div>
            {/* row end */}
            {socialLinksError && (
              <span className="text-danger">{socialLinksError}</span>
            )}
            {incompleteDataError && (
              <span className="text-danger">{incompleteDataError}</span>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>

            <button
              disabled={loading}
              onClick={onSave}
              type="button"
              className="btn btn-primary"
            >
              {loading ? "Loading..." : "Save changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ExtraInfoModal;
