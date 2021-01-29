import React from "react";
function CompanyFiltersForm({
  onSearch = () => {},
  setSearchPlan = () => {},
  setSearchText = () => {},
  setSearchBy = () => {},
  resetUrl = () => {},
  searchBy = "name",
  searchText = "",
  searchPlan = "",
}) {
  return (
    <form className="mb-4" onSubmit={onSearch}>
      <div className="row">
        <div className=" col-12 col-md-8 mb-2">
          {searchBy === "name" ? (
            <input
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              type="text"
              className="form-control"
              placeholder="Enter search text.."
            />
          ) : (
            <select
              onChange={(e) => setSearchPlan(e.target.value)}
              value={searchPlan}
              className="custom-select form-control"
            >
              <option value="">Select Plan</option>
              <option value="plat">platinum</option>
              <option value="gold">gold</option>
              <option value="silver">silver</option>
              <option value="none">none</option>
            </select>
          )}
        </div>
        <div className=" col-12 col-md-4 mb-2">
          <select
            onChange={(e) => setSearchBy(e.target.value)}
            className="custom-select form-control"
            value={searchBy}
          >
            <option value="name">By name</option>
            <option value="plan">By plan</option>
          </select>
        </div>
      </div>
      <div className="row ">
        <div className="col-12 col-md-8">
          <button type="submit" className="btn btn-dark mb-2 w-100">
            Search
          </button>
        </div>
        <div className="col-12 col-md-4">
          <button className="btn btn-link" onClick={resetUrl}>
            clear
          </button>
        </div>
      </div>
    </form>
  );
}

export default CompanyFiltersForm;
