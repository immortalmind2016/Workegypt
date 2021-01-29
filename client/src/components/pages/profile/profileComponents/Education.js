import React, { Component } from "react";
import uuid from "uuid";
import { educationValidator } from "../../../../utils/validation/validateProfile";
import $ from "jquery";
import BarLoader from "../../../reusable/loaders/BarLoader";
import moment from "moment";
import { profile, yearsToPick, monthsToPick } from "../../../../utils/fixtures";

const EduModal = ({
  title,
  at,
  schoolCountry,
  schoolState,
  onChangeHandler,
  onSave,
  dateError,
  from,
  to,
  fromMonth,
  toMonth,
  errors,
}) => (
  <div
    className="modal fade avoid-navbar exp-modal"
    id="EduModal"
    tabIndex="-1"
    role="dialog"
    aria-labelledby="experienceModalTitle"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-dialog-scrollable" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title" id="experienceModalTitle">
            Add Education
          </h2>
        </div>
        <div className="modal-body">
          {errors && (
            <p className="text-danger mb-2">missing required fields!</p>
          )}
          <input
            className="exp-input"
            name="title"
            placeholder="study title.."
            value={title}
            onChange={onChangeHandler}
          />
          <input
            className="exp-input"
            name="at"
            placeholder="study place name.."
            value={at}
            onChange={onChangeHandler}
          />

          <div className="d-flex select-container">
            <input
              className="w-50 mr-1 exp-input"
              name="schoolCountry"
              placeholder="country.."
              value={schoolCountry}
              onChange={onChangeHandler}
              list="edu_countries"
            />
            <datalist id="edu_countries">
              {profile.countries.map(country => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </datalist>
            {typeof schoolCountry === "string" &&
              schoolCountry.trim().toLocaleLowerCase() === "egypt" && (
                <>
                  <input
                    className="w-50 ml-1 exp-input"
                    name="schoolState"
                    placeholder="state.."
                    value={schoolState}
                    onChange={onChangeHandler}
                    list="governs_edu"
                  />
                  <datalist id="governs_edu">
                    {profile.states.map(st => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </datalist>
                </>
              )}
          </div>

          <div className="d-flex select-container">
            <div className="d-flex flex-column flex-grow-1 pr-2">
              <span>from</span>
              <select
                defaultValue={fromMonth}
                name="fromMonth"
                onChange={onChangeHandler}
                className="form-control  w-100"
              >
                {monthsToPick.map(month => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                defaultValue={from}
                name="startDate"
                onChange={onChangeHandler}
                className="form-control  w-100"
              >
                {yearsToPick.map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            <div className="d-flex flex-column flex-grow-1 pl-2">
              <span>To</span>
              <select
                name="toMonth"
                defaultValue={toMonth}
                onChange={onChangeHandler}
                className="form-control flex-grow-1 w-100"
              >
                {monthsToPick.map(month => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                name="endDate"
                defaultValue={to}
                onChange={onChangeHandler}
                className="form-control flex-grow-1 w-100"
              >
                {yearsToPick.map(year => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {dateError && (
            <p className="alert alert-danger text-center w-75 mt-5">
              {dateError}
            </p>
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
          <button onClick={onSave} type="button" className="btn btn-primary">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
);

const Edu = ({
  title,
  at,
  location,
  from,
  to,
  index,
  _deleteProfileField,
  isPreviewing,
}) => (
  <div className="education">
    <div className="d-flex w-100 justify-content-between deletion-container">
      <h6 className="education__title">{title}</h6>
      {!isPreviewing && (
        <i
          className="fas fa-times btn--danger-delete mr-5"
          onClick={() => {
            _deleteProfileField("education", index);
          }}
        />
      )}
    </div>
    <h6 className="education__subtitle">{at}</h6>
    <small className="text-muted">{location}</small>
    <small className="education__date text-muted">
      {from} - {to}
    </small>
  </div>
);

export class Education extends Component {
  constructor(props) {
    super(props);
    const { title, at, schoolState } = props;
    this.state = {
      title: title || "",
      at: at || "",
      schoolCountry: "",
      schoolState: schoolState || "",
      startDate: moment().get("year"),
      endDate: moment().get("year"),
      fromMonth: "Jan",
      toMonth: "Feb",
      errors: false,
    };
  }
  clearState = () =>
    this.setState({
      title: "",
      schoolCountry: "",
      at: "",
      schoolState: "",
      startDate: moment().get("year"),
      endDate: moment().get("year"),
      errors: false,
    });

  componentDidMount() {
    const that = this;
    $("#EduModal").on("hidden.bs.modal", () => {
      that.clearState();
    });
  }

  onChangeHandler = ({ target }) => {
    this.setState({ ...this.state, [target.name]: target.value });
  };

  getDateStateFromDatePicker = (startDate = undefined, endDate = undefined) =>
    this.setState({ ...this.state, startDate, endDate });

  onSave = () => {
    const { isValid } = educationValidator(this.state);
    if (!isValid) {
      this.setState({ ...this.state, errors: true });
      return;
    }

    if (this.state.startDate > this.state.endDate) {
      this.setState({
        ...this.state,
        dateError: "start date cannot be greater than end date!",
      });
      return;
    }
    const data = {
      title: this.state.title,
      at: this.state.at,
      location: `${this.state.schoolCountry} , ${this.state.schoolState}`,
      from: this.state.fromMonth + " " + this.state.startDate,
      to: this.state.toMonth + " " + this.state.endDate,
    };
    //edit
    this.props._editProfile({ education: [...this.props.educations, data] });
    $("#EduModal").modal("hide");
  };

  render() {
    const { educations = [], isPreviewing = false } = this.props;
    const { errors } = this.state;
    return (
      <div className="profile__education main-card-layout relative-container">
        <h6 className="main-card-layout__title">Education</h6>
        {!isPreviewing && (
          <>
            <button
              className="btn--add-plus btn btn-primary rounded-circle"
              type="button"
              data-toggle="modal"
              data-target="#EduModal"
            >
              <i
                className="fas fa-plus text-light"
                data-toggle="tooltip"
                data-placement="top"
                title="Add New Education"
              />
            </button>
            <EduModal
              {...this.state}
              onChangeHandler={this.onChangeHandler}
              getDateStateFromDatePicker={this.getDateStateFromDatePicker}
              onSave={this.onSave}
              errors={errors}
            />
          </>
        )}
        {educations === null ? (
          <BarLoader />
        ) : educations.length > 0 ? (
          educations.map((edu, index) => (
            <React.Fragment key={uuid()}>
              {index !== 0 && <hr />}
              <Edu
                _deleteProfileField={this.props._deleteProfileField}
                {...edu}
                index={index}
                isPreviewing={isPreviewing}
              />
            </React.Fragment>
          ))
        ) : (
          "No education added"
        )}
      </div>
    );
  }
}
export default Education;
