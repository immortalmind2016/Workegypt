import React, { useState, useEffect } from "react";
import $ from "jquery";
import validatePostJob from "../../../../utils/validation/validatePostJob";
import { profile } from "../../../../utils/fixtures";
const PostJobModal = ({
  title,
  desc,
  requirements,
  experience,
  level,
  language,
  type,
  open,
  location,
  city,
  Area,
  salary_from,
  salary_range,
  salary_to,
  number_of_vacancies,
  job_role,
  job_type,
  hide_salary,
  _id,
  isEditProcess,
  jobLoaders,
  createJob,
  editJob
}) => {
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(null);
  const [job, setJob] = useState({
    title: "",
    desc: "",
    requirements: "",
    experience: "",
    level: "",
    language: "",
    type: "",
    open: true,
    hide_salary: false,
    location: "",
    city: "",
    Area: "",
    salary_from: "",
    salary_to: "",
    number_of_vacancies: "",
    job_role: "",
    job_type: ""
  });
  useEffect(() => {
    if (isEditProcess) {
      setJob({
        title,
        desc,
        requirements,
        experience,
        level,
        language,
        type,
        open,
        location,
        city,
        Area,
        salary_from: salary_range?.from,
        salary_to: salary_range?.to,
        number_of_vacancies,
        job_role,
        job_type,
        hide_salary
      });
    }
  }, [
    title,
    desc,
    requirements,
    experience,
    level,
    language,
    type,
    open,
    location,
    city,
    Area,
    salary_from,
    salary_to,
    number_of_vacancies,
    job_role,
    job_type,
    hide_salary,
    isEditProcess,
    salary_range
  ]);

  //loaders effect
  useEffect(() => {
    if (isEditProcess) {
      if (isLoading && jobLoaders.editingJob === false) {
        $(`#${_id}`).modal("hide");
      }
    } else {
      if (isLoading && jobLoaders.creatingJob === false) {
        $("#PostJobModal").modal("hide");
      }
    }
  }, [jobLoaders, jobLoaders.creatingJob, isLoading, isEditProcess, _id]);
  useEffect(() => {
    return () => $("#PostJobModal").modal("hide");
  }, [isEditProcess]);

  const onChangeHandler = (e, isNum) => {
    const target = e.target;
    const value = target.type === "checkbox" ? !target.checked : target.value;
    const name = target.name;
    if (isNum && /^[0-9]*$/gm.test(value) === false) {
      setJob(prevState => ({
        ...prevState,
        [name]: ""
      }));
    } else {
      setJob(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const onSave = (isDrafted = false) => {
    const {
      title,
      desc,
      requirements,
      experience,
      level,
      language,
      type,
      open,
      location,
      city,
      Area,
      salary_from,
      salary_to,
      number_of_vacancies,
      job_role,
      job_type,
      hide_salary
    } = job;
    // should validate here
    const { isValid } = validatePostJob({
      title,
      desc,
      level,
      language,
      type,
      location,
      salary_from,
      salary_to,
      number_of_vacancies,
      job_role,
      job_type
    });
    if (!isValid) {
      setError(true);
      return;
    }
    setError(false);
    setLoading(true);

    const newJob = {
      title,
      desc,
      requirements,
      experience,
      level,
      language,
      type,
      open,
      hide_salary,
      location,
      city,
      Area,
      salary_range: {
        from: salary_from,
        to: salary_to
      },
      number_of_vacancies,
      job_role,
      job_type
    };
    if (isEditProcess) {
      editJob(_id, newJob);
    } else {
      createJob(newJob);
      setJob({
        title: "",
        desc: "",
        requirements: "",
        experience: "",
        level: "",
        language: "",
        type: "",
        open: true,
        hide_salary: false,
        location: "",
        city: "",
        Area: "",
        salary_from: "",
        salary_to: "",
        number_of_vacancies: "",
        job_role: "",
        job_type: ""
      });
    }
  };

  return (
    <div
      className="modal fade job-modal"
      id={isEditProcess ? _id : `PostJobModal`}
      tabIndex="-1"
      role="dialog"
      aria-labelledby="PostJobModalTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content avoid-navbar">
          <div className="modal-header">
            <h5 className="modal-title" id="PostJobModalTitle">
              Create Job
            </h5>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              {error && (
                <p className="text-center text-danger">
                  missing required data denoted with ' * '
                </p>
              )}
              <form>
                <div className="row mb-3">
                  <div className="col">
                    <input
                      onChange={onChangeHandler}
                      type="text"
                      className="form-control  input-required"
                      placeholder="Title*"
                      name="title"
                      value={job.title}
                    />
                    <span className="star">*</span>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <textarea
                      style={{ resize: "none", height: 100 }}
                      onChange={onChangeHandler}
                      type="text"
                      className="form-control input-required"
                      placeholder="Description*"
                      name="desc"
                      value={job.desc}
                    />
                    <span className="star">*</span>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col">
                    <select
                      onChange={onChangeHandler}
                      className="form-control input-required"
                      name="location"
                      value={job.location}
                    >
                      <option className="disabled" value="">
                        Select Country
                      </option>
                      {profile.countries.map(country => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                    <span className="star">*</span>
                  </div>

                  {typeof job.location === "string" &&
                    job.location.trim() === "Egypt" && (
                      <div className="col">
                        <select
                          onChange={onChangeHandler}
                          className="form-control"
                          name="city"
                          value={job.city}
                        >
                          <option value="" className="disabled">
                            Select city
                          </option>
                          {profile.states.map(state => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                </div>
                {typeof job.location === "string" &&
                  job.location.trim() === "Egypt" && (
                    <div className="row mb-3">
                      <div className="col">
                        <input
                          onChange={onChangeHandler}
                          type="text"
                          className="form-control"
                          placeholder="Area"
                          name="Area"
                          value={job.Area}
                        />
                      </div>
                    </div>
                  )}
                <div className="row mb-3">
                  <div className="col">
                    <input
                      onChange={onChangeHandler}
                      type="text"
                      className="form-control input-required"
                      placeholder="Minimum Salary In Dollars"
                      name="salary_from"
                      value={job.salary_from}
                    />
                    <span className="star">*</span>
                  </div>
                  <div className="col">
                    <input
                      onChange={onChangeHandler}
                      type="text"
                      className="form-control input-required"
                      placeholder="Maximum Salary In Dollars"
                      name="salary_to"
                      value={job.salary_to}
                    />
                    <span className="star">*</span>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <input
                      onChange={onChangeHandler}
                      type="text"
                      className="form-control input-required"
                      placeholder="Job Role(s) (customer service – accounting – marketing – HR  - ….etc)"
                      name="job_role"
                      value={job.job_role}
                    />
                    <span className="star">*</span>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <input
                      onChange={e => onChangeHandler(e, true)}
                      type="text"
                      className="form-control input-required"
                      placeholder="Number Of Vacancies"
                      name="number_of_vacancies"
                      value={job.number_of_vacancies}
                    />
                    <span className="star">*</span>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col">
                    <select
                      onChange={onChangeHandler}
                      className="form-control input-required"
                      name="job_type"
                      value={job.job_type}
                    >
                      <option className="disabled" value="">
                        Select Job Type
                      </option>
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Work from Home">Work from Home</option>
                      <option value="Freelancer/Project">
                        Freelancer/Project
                      </option>
                      <option value="Shift Based">Shift Based</option>
                      <option value="Volunteering">Volunteering</option>
                    </select>
                    <span className="star">*</span>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <select
                      onChange={onChangeHandler}
                      type="text"
                      className="form-control input-required"
                      placeholder="Language"
                      name="language"
                      value={job.language}
                    >
                      <option className="disabled" value="">
                        Select Language
                      </option>
                      {profile.languages.map((lang, index) => (
                        <option key={lang + index} value={lang}>
                          {lang}
                        </option>
                      ))}
                    </select>
                    <span className="star">*</span>
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col">
                    <select
                      onChange={onChangeHandler}
                      type="text"
                      className="form-control input-required"
                      placeholder="Level"
                      name="level"
                      value={job.level}
                    >
                      <option className="disabled" value="">
                        Select career Level
                      </option>
                      <option className="disabled" value="Entry Level">
                        Entry Level
                      </option>
                      <option
                        className="disabled"
                        value="Experienced Non Manager"
                      >
                        Experienced Non Manager
                      </option>
                      <option className="disabled" value="Manager">
                        Manager
                      </option>
                      <option className="disabled" value="Senior Manager">
                        Senior Manager
                      </option>
                    </select>
                    <span className="star">*</span>
                  </div>
                  <div className="col">
                    <select
                      onChange={onChangeHandler}
                      type="text"
                      className="form-control input-required"
                      placeholder="Type"
                      name="type"
                      value={job.type}
                    >
                      <option className="disabled" value="">
                        Select Job Nature
                      </option>
                      <option value="Job">Job</option>
                      <option value="Internship">Internship</option>
                    </select>
                    <span className="star">*</span>
                  </div>
                </div>

                <hr />
                <div className="row mb-3">
                  <div className="col font-weight-bold">Optional Fields</div>
                </div>
                <div className="row mb-2">
                  <div className="col">
                    <textarea
                      style={{ resize: "none" }}
                      onChange={onChangeHandler}
                      type="text"
                      className="form-control"
                      placeholder="Requirements"
                      name="requirements"
                      value={job.requirements}
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col">
                    <input
                      onChange={onChangeHandler}
                      type="text"
                      className="form-control"
                      placeholder="Experience Years"
                      name="experience"
                      value={job.experience}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-6">
                    <div className="form-group form-check d-flex align-items-center">
                      <input
                        onChange={onChangeHandler}
                        type="checkbox"
                        className="form-check-input "
                        id={isEditProcess ? _id + "isOpened" : "isOpened"}
                        name="open"
                        checked={!job.open}
                      />
                      <label
                        className="form-check-label ml-3"
                        htmlFor={isEditProcess ? _id + "isOpened" : "isOpened"}
                      >
                        Hide Job
                      </label>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="form-group form-check d-flex align-items-center">
                      <input
                        onChange={onChangeHandler}
                        type="checkbox"
                        className="form-check-input"
                        id={isEditProcess ? _id + "isHidden" : "isHidden"}
                        name="hide_salary"
                        checked={job.hide_salary}
                      />
                      <label
                        className="form-check-label ml-3"
                        htmlFor={isEditProcess ? _id + "isHidden" : "isHidden"}
                      >
                        Hide Salary
                      </label>
                    </div>
                  </div>

                  <div className="col-12">
                    <h6 className="">Note:</h6>
                    <p
                      className="text-secondary"
                      style={{ textTransform: "capitalize" }}
                    >
                      you can create job quiz later after creating the job
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-info" data-dismiss="modal">
              Close
            </button>
            {/*        <button
              onClick={() => onSave(true)}
              type="button"
              className="btn btn-secondary"
            >
              Draft Job
            </button> */}
            <button onClick={onSave} type="button" className="btn btn-primary">
              {isEditProcess ? "Save Edits" : "Post Job"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostJobModal;
