import React from "react";
import { profile } from "../../../utils/fixtures";
import { useState } from "react";
import { useCallback } from "react";

function FiltrationForm({
  onFormSubmitHandler = () => {},
  resetFilters = () => {},
  onSetFilters = () => {},
  onSearch = () => {},
  onChangeHandler = () => {},
  filters = {},
}) {
  const [filtersShown, setFiltersShown] = useState(false);
  const toggleFilters = useCallback(() => {
    setFiltersShown(!filtersShown);
  }, [filtersShown]);
  return (
    <form className="form-row" onSubmit={onFormSubmitHandler}>
      <div className="col-12 col-md-5 pl-0 pr-md-5">
        <div className="input-group">
          <input
            name="searchText"
            placeholder="Search for profiles"
            value={filters.searchText}
            onChange={onChangeHandler}
            className="form-control"
            style={{ height: 35 }}
          />
          <div className="input-group-append">
            <button
              className="btn btn-primary"
              type="submit"
              onClick={onSearch}
            >
              Search
            </button>
          </div>
          <p className="mt-3 text-secondary">
            Search is set to applicant name by default, if you want other
            criteria please select other filters.
          </p>
        </div>
        <div className="d-flex align-items-center">
          <div className="form-group w-50 pr-2">
            <select
              name="searchBy"
              value={filters.searchBy}
              onChange={onChangeHandler}
              className="custom-select form-control"
            >
              <option value="name">Applicant name</option>
              <option value="jobTitle">Job title</option>
            </select>
          </div>
          <div className="form-group w-50 pl-2">
            <a
              onClick={toggleFilters}
              style={{ cursor: "pointer", textDecoration: "underline" }}
              className="hover-opacity"
            >
              {filtersShown ? "Hide" : "Show"} other filters
              <i
                className={`fas fa-${filtersShown ? "eye-slash" : "eye"} ml-2`}
                style={{ fontSize: 12 }}
              />
            </a>
          </div>
        </div>

        <hr />
        {/* filters */}
      </div>
      <div className="col-12 col-md-7">
        {filtersShown && (
          <>
            <div className="d-flex">
              <div
                className="form-group pr-2"
                style={{ width: "calc(100% / 3.2)" }}
              >
                <select
                  name="educationLvl"
                  value={filters.educationLvl}
                  onChange={onChangeHandler}
                  className="custom-select form-control"
                  id="filter_Edu_lvl"
                >
                  <option value="">Select Education Level</option>
                  <option value="Bachelor degree">Bachelor degree</option>
                  <option value="Master's degree">Master's degree</option>
                  <option value="Doctoral degree">Doctoral degree</option>
                  <option value="High school">High school</option>
                  <option value="Diploma">Diploma</option>
                </select>
              </div>
              <div
                className="form-group pl-2 "
                style={{ width: "calc(100% / 3.2)" }}
              >
                <select
                  name="language"
                  id="language"
                  value={filters.language}
                  onChange={onChangeHandler}
                  className="custom-select form-control"
                >
                  <option value="">Select Language</option>
                  {profile.languages.map((lang) => (
                    <>
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    </>
                  ))}
                </select>
              </div>
              <div className="form-group pl-2">
                <select
                  name="careerLvl"
                  value={filters.careerLvl}
                  onChange={onChangeHandler}
                  className="custom-select form-control"
                  id="filter_careerLvl"
                >
                  <option value="">Select Career Level</option>
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
            <div className="d-flex">
              <div
                className="form-group pr-2"
                style={{ width: "calc(100% / 3.2)" }}
              >
                <select
                  name="country"
                  value={filters.country}
                  onChange={onChangeHandler}
                  className="custom-select form-control"
                  id="filter_country"
                >
                  <option value="">Select Country</option>
                  {profile.countries.map((country) => (
                    <option value={country}>{country}</option>
                  ))}
                </select>
              </div>

              <div
                className="form-group pl-2"
                style={{ width: "calc(100% / 3.2)" }}
              >
                <select
                  disabled={filters.country !== "Egypt"}
                  name="city"
                  value={filters.city}
                  onChange={onChangeHandler}
                  className="custom-select form-control"
                  id="filter_city"
                >
                  <option value="">Select City</option>
                  {profile.states.map((st) => (
                    <option value={st}>{st}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="d-flex">
              <button
                onClick={resetFilters}
                type="button"
                className="btn btn-secondary col my-3 mr-2"
                style={{ maxWidth: 100 }}
              >
                Reset filters
              </button>
              <button
                onClick={onSetFilters}
                type="button"
                className="btn btn-primary col my-3 ml-2"
                style={{ maxWidth: 100 }}
              >
                Set filters
              </button>
            </div>
          </>
        )}
      </div>
    </form>
  );
}

export default FiltrationForm;
