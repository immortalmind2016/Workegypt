import React, { Component } from "react";
import uuid from "uuid";
import $ from "jquery";
import BarLoader from "../../../reusable/loaders/BarLoader";
import moment from "moment";
import { yearsToPick, monthsToPick } from "../../../../utils/fixtures";
import isEmpty from "../../../../utils/isEmpty";

const TrainingModal = ({
  topic,
  additional,
  orgName,
  onChangeHandler,
  onSave,
  dateError,
  from,
  to,
  fromMonth,
  toMonth,
  errors
}) => (
  <div
    className="modal fade avoid-navbar exp-modal"
    id="TrainingModal"
    tabIndex="-1"
    role="dialog"
    aria-labelledby="experienceModalTitle"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-dialog-scrollable" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title" id="experienceModalTitle">
            Add Training
          </h2>
        </div>
        <div className="modal-body">
          {errors && (
            <p className="text-danger mb-2">missing required fields!</p>
          )}
          <input
            className="exp-input"
            name="topic"
            placeholder="Training Topic.. (required *)"
            value={topic}
            onChange={onChangeHandler}
          />
          {/* course date should be two select boxes from to */}

          <div className=" select-container">
            <input
              className="w-100  exp-input"
              name="orgName"
              placeholder="Organization/institution Name.. (required *)"
              value={orgName}
              onChange={onChangeHandler}
            />

            <textarea
              className="w-100  exp-input"
              name="additional"
              placeholder="Additional Info.."
              value={additional}
              onChange={onChangeHandler}
              style={{ height: 100, resize: "none" }}
            />
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

const Train = ({
  topic,
  additional,
  organization,
  from,
  to,
  index,
  _deleteProfileField,
  isPreviewing
}) => (
  <div className="education">
    <div className="d-flex w-100 justify-content-between deletion-container">
      <h6 className="education__title">{topic}</h6>
      {!isPreviewing && (
        <i
          className="fas fa-times btn--danger-delete mr-5"
          onClick={() => {
            _deleteProfileField("training_courses", index);
          }}
        />
      )}
    </div>
    <p className="text-muted"> At: {organization}</p>
    <small className="text-muted">{additional}</small>

    <small className="education__date text-muted">
      {from} - {to}
    </small>
  </div>
);

export class Training extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: "",
      additional: "",
      orgName: "",
      startDate: moment().get("year"),
      endDate: moment().get("year"),
      fromMonth: "Jan",
      toMonth: "Feb",
      errors: false
    };
  }
  clearState = () =>
    this.setState({
      topic: "",
      additional: "",
      orgName: "",
      startDate: moment().get("year"),
      endDate: moment().get("year"),
      errors: false
    });

  componentDidMount() {
    const that = this;
    $("#TrainingModal").on("hidden.bs.modal", () => {
      that.clearState();
    });
  }

  onChangeHandler = ({ target }) => {
    this.setState({ ...this.state, [target.name]: target.value });
  };

  getDateStateFromDatePicker = (startDate = undefined, endDate = undefined) =>
    this.setState({ ...this.state, startDate, endDate });

  onSave = () => {
    if (isEmpty(this.state.orgName) || isEmpty(this.state.topic)) {
      this.setState({ ...this.state, errors: true });
      return;
    }

    if (this.state.startDate > this.state.endDate) {
      this.setState({
        ...this.state,
        dateError: "start date cannot be greater than end date!"
      });
      return;
    }
    const data = {
      topic: this.state.topic,
      organization: this.state.orgName,
      additional: this.state.additional,
      from: this.state.fromMonth + " " + this.state.startDate,
      to: this.state.toMonth + " " + this.state.endDate
    };
    //edit
    this.props._editProfile({
      training_courses: [...this.props.training, data]
    });
    $("#TrainingModal").modal("hide");
  };

  render() {
    const { training = [], isPreviewing = false } = this.props;
    const { errors } = this.state;
    return (
      <div className="profile__education main-card-layout relative-container">
        <h6 className="main-card-layout__title">Training</h6>
        {!isPreviewing && (
          <>
            <button
              className="btn--add-plus btn btn-primary rounded-circle"
              type="button"
              data-toggle="modal"
              data-target="#TrainingModal"
            >
              <i
                className="fas fa-plus text-light"
                data-toggle="tooltip"
                data-placement="top"
                title="Add New Training"
              />
            </button>
            <TrainingModal
              {...this.state}
              onChangeHandler={this.onChangeHandler}
              getDateStateFromDatePicker={this.getDateStateFromDatePicker}
              onSave={this.onSave}
              errors={errors}
            />
          </>
        )}
        {training === null ? (
          <BarLoader />
        ) : training.length > 0 ? (
          training.map((edu, index) => (
            <React.Fragment key={uuid()}>
              {index !== 0 && <hr />}
              <Train
                _deleteProfileField={this.props._deleteProfileField}
                key={uuid()}
                {...edu}
                index={index}
                isPreviewing={isPreviewing}
              />
            </React.Fragment>
          ))
        ) : (
          "No Training added"
        )}
      </div>
    );
  }
}
export default Training;
