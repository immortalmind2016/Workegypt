import React, { Component } from "react";
import uuid from "uuid";
import { experienceValidator } from "../../../../utils/validation/validateProfile";
import $ from "jquery";
import BarLoader from "../../../reusable/loaders/BarLoader";
import moment from "moment";
import { profile, yearsToPick, monthsToPick } from "../../../../utils/fixtures";

const ExpModal = ({
  title,
  at,
  companyCountry,
  companyState,
  onChangeHandler,
  handleCheck,
  onExperienceSave,
  errors,
  dateError,
  from,
  fromMonth,
  toMonth,
  to,
  tillnow,
}) => (
  <div
    className="modal fade avoid-navbar exp-modal"
    id="ExpModal"
    tabIndex="-1"
    role="dialog"
    aria-labelledby="experienceModalTitle"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-dialog-scrollable" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title" id="experienceModalTitle">
            Add Experience
          </h2>
        </div>
        <div className="modal-body">
          {errors && (
            <p className="text-danger mb-2">missing required fields!</p>
          )}
          <input
            className="exp-input"
            name="title"
            placeholder="job title.."
            value={title}
            onChange={onChangeHandler}
          />
          <input
            className="exp-input"
            name="at"
            placeholder="company name.."
            value={at}
            onChange={onChangeHandler}
          />

          <div className="d-flex select-container">
            <input
              className="w-50 mr-1 exp-input"
              name="companyCountry"
              placeholder="country.."
              value={companyCountry}
              onChange={onChangeHandler}
              list="exp_countries"
            />
            <datalist id="exp_countries">
              {profile.countries.map(country => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </datalist>
            {typeof companyCountry === "string" &&
              companyCountry.trim().toLocaleLowerCase() === "egypt" && (
                <>
                  <input
                    className="w-50 ml-1 exp-input"
                    name="companyState"
                    placeholder="state.."
                    value={companyState}
                    onChange={onChangeHandler}
                    list="governs__"
                  />
                  <datalist id="governs__">
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
            {/* {
             typeof tillnow === false && (
               tillnow == true ? */}
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
               {/* )
               :
                " test"
                }  */}
              </div>     
              <div className="d-flex flex-column flex-grow-1 pl-2">
              <input
                    className="form-check-input"
                    name="tillnow"
                    type="checkbox"
                    //  checked={tillnow}
                    onClick={handleCheck}
                  />
                  <label
                    className="form-check-label ml-3"
                    >
                    Till now
                    </label>
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
          <button
            onClick={onExperienceSave}
            type="button"
            className="btn btn-primary"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
);
const Exp = ({
  title,
  at,
  location,
  from,
  to,
  _deleteProfileField,
  index,
  isPreviewing,
}) => (
  <div className="experience ">
    <div className="d-flex w-100 justify-content-between deletion-container">
      <h6 className="experience__title">{title}</h6>
      {!isPreviewing && (
        <i
          className="fas fa-times btn--danger-delete mr-5"
          onClick={() => {
            _deleteProfileField("experience", index);
          }}
        />
      )}
    </div>
    <h6 className="experience__subtitle">{at}</h6>
    <span className="experience__place text-muted">{location}</span>
    <span className="experience__date text-muted">
      {from} - {to}
    </span>
  </div>
);

class Experience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      at: "",
      companyCountry: "",
      companyState: "",
      startDate: moment().get("year"),
      endDate: moment().get("year"),
      fromMonth: "Jan",
      toMonth: "Feb",
      // tillnow: "",
      tillnow: true,
      errors: false,
      dateError: false,
    };
    //this.handleCheck = this.handleCheck.bind(this);
  }

  //lifecycle

  componentDidMount() {
    const that = this;
    $("#ExpModal").on("hidden.bs.modal", () => {
      that.clearState();
    });
  }

  clearState = () =>
    this.setState({
      title: "",
      companyCountry: "",
      at: "",
      companyState: "",
      startDate: moment().get("year"),
      endDate: moment().get("year"),
       tillnow: false,
      errors: false,
    });

  onChangeHandler = ({ target }) => {
    this.setState({ ...this.state, [target.name]: target.value });
  };

  handleCheck(e){
    this.setState({
       ...this.state,
     tillnow: e.target.tillnow,
      //tillnow: true
    })
  }

  /* getDateStateFromDatePicker = (startDate = undefined, endDate = undefined) =>
    this.setState({ ...this.state, startDate, endDate }); */

  onExperienceSave = () => {
    const { isValid } = experienceValidator(this.state);
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

       if(this.state.tillnow=false){
    const data = {
      title: this.state.title,
      at: this.state.at,
      location: `${this.state.companyCountry} , ${this.state.companyState}`,
      from: this.state.fromMonth + " " + this.state.startDate,
      to: this.state.toMonth + " " + this.state.endDate,
      //to: "till now",
      tillnow: `${this.state.tillnow}`
    };
    console.log(this.state.tillnow);
   
    //edit
    this.props._editProfile({ experience: [...this.props.experiences, data] });
    $("#ExpModal").modal("hide");
  }else{
    const data = {
      title: this.state.title,
      at: this.state.at,
      location: `${this.state.companyCountry} , ${this.state.companyState}`,
      from: this.state.fromMonth + " " + this.state.startDate,
      to: "till now",
      tillnow: `${this.state.tillnow}`
    };
    console.log(this.state.tillnow);
    //edit
    this.props._editProfile({ experience: [...this.props.experiences, data] });
    $("#ExpModal").modal("hide");
  }
     }
  render() {
    const { experiences, isPreviewing = false } = this.props;
    const { errors } = this.state;
    return (
      <div className="profile__experiences main-card-layout relative-container">
        <h6 className="main-card-layout__title">Experience</h6>
        {!isPreviewing && (
          <button
            className="btn--add-plus btn btn-primary rounded-circle"
            type="button"
            data-toggle="modal"
            data-target="#ExpModal"
          >
            <i
              className="fas fa-plus text-light"
              data-toggle="tooltip"
              data-placement="top"
              title="Add New Experience"
            />
          </button>
        )}
        {experiences === null ? (
          <BarLoader />
        ) : experiences.length > 0 ? (
          experiences.map((exp, index) => (
            <React.Fragment key={uuid()}>
              {index !== 0 && <hr />}
              <Exp
                {...exp}
                _deleteProfileField={this.props._deleteProfileField}
                index={index}
                isPreviewing={isPreviewing}
              />
            </React.Fragment>
          ))
        ) : (
          "No experiences added"
        )}
        {!isPreviewing && (
          <ExpModal
            {...this.state}
            onChangeHandler={this.onChangeHandler}
            getDateStateFromDatePicker={this.getDateStateFromDatePicker}
            onExperienceSave={this.onExperienceSave}
            errors={errors}
          />
        )}
      </div>
    );
  }
}
export default Experience;
