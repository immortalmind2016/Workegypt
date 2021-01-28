import React, { useState, useCallback, useEffect } from "react";
import FiltrationForm from "./FilterationForm";
import Pagination from "react-paginate";
import { profile } from "../../../utils/fixtures";
import { useDispatch, useSelector } from "react-redux";
import { getSomeProfiles } from "../../../redux/actions";
import isEmpty from "../../../utils/isEmpty";
import UserCard from "./UserCard";
import { Redirect } from "react-router-dom";
function SearchProfiles() {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({
    searchText: "",
    searchBy: "name", //name || job title
    country: "",
    city: "",
    language: "",
    careerLvl: "",
    educationLvl: "",
  });

  const [loading, setLoading] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [currentPaginationIndex, setCurrentPaginationIndex] = useState(0);
  const [queryString, setQueryString] = useState("");
  const profileLoaders = useSelector((state) => state.profile.loaders);
  const subscription = useSelector(
    (state) => state.profile.profileData?.subscribe
  );

  const profileErrors = useSelector((state) => state.profile.errors);
  const someProfiles = useSelector((state) => state.profile.someProfiles);
  const onChangeHandler = useCallback((e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  }, []);
  const onFormSubmitHandler = useCallback((e) => {
    e.preventDefault();
  }, []);

  const resetFilters = useCallback(() => {
    setQueryString("");
    setFilters((prevFilters) => ({
      ...prevFilters,
      searchBy: "name", //name || job title
      country: "",
      city: "",
      language: "",
      careerLvl: "",
      educationLvl: "",
    }));
  }, []);
  const onSetFilters = useCallback(() => {
    // send filters as queries with getSomeProfiles request
    let queryString = "?";
    for (let key in filters) {
      if (!isEmpty(filters[key])) {
        queryString =
          queryString === "?"
            ? queryString + `${key}=${filters[key]}`
            : queryString + `&${key}=${filters[key]}`;
      }
    }
    setQueryString(queryString);
  }, [filters]);

  const onSearch = () => {
    if (!isEmpty(filters.searchText)) {
      setQueryString(
        `?searchText=${filters.searchText}&searchBy=${filters.searchBy}`
      );
    } else {
      setQueryString("");
    }
  };
  // pagination handler
  const onPageChangeHandler = useCallback(({ selected }) => {
    setCurrentPaginationIndex(selected);
  }, []);
  // handle searching and pagination requests
  useEffect(() => {
    setLoading(true);
    dispatch(getSomeProfiles(currentPaginationIndex, queryString));
  }, [queryString, currentPaginationIndex]);
  useEffect(() => {
    setLoading(true);
    // initial fetch
    dispatch(getSomeProfiles(0));
  }, []);

  // handling fetching loaders and errors
  useEffect(() => {
    if (profileLoaders.gettingSomeProfiles === true) {
      setLoading(true);
    } else if (profileLoaders.gettingSomeProfiles === false) {
      setLoading(false);
    } else if (profileErrors.gettingSomeProfiles === true) {
      setLoading(false);
      setFetchError(true);
    }
  }, [profileLoaders?.gettingSomeProfiles, profileErrors?.gettingSomeProfiles]);

  if (subscription?.count <= 0) return <Redirect to="/contact" />;
  return (
    <div className="avoid-navbar pt-3">
      <div className="container" style={{ height: "90vh" }}>
        <div className="d-flex flex-column h-100">
          <FiltrationForm
            onChangeHandler={onChangeHandler}
            onFormSubmitHandler={onFormSubmitHandler}
            resetFilters={resetFilters}
            onSetFilters={onSetFilters}
            onSearch={onSearch}
            filters={filters}
          />

          <main className="d-flex flex-1 flex-column flex-grow-1  h-100">
            <section className="search-results flex-grow-1">
              {loading ? (
                <div className="d-flex justify-content-center align-items-center ">
                  <div
                    className="spinner-border"
                    role="status"
                    aria-hidden="true"
                  ></div>
                </div>
              ) : (
                <div className="row">
                  {someProfiles instanceof Array && someProfiles.length > 0
                    ? someProfiles.map((profile) => (
                        <div
                          className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3"
                          key={profile._id}
                        >
                          <UserCard
                            userId={profile?.user?._id}
                            userImg={profile.image ? profile.image : undefined}
                            username={profile?.user?.name}
                          />
                        </div>
                      ))
                    : "No results found"}
                </div>
              )}
            </section>
            <div className="row mt-3">
              <div className="col-12">
                {!loading && (
                  <div className="d-flex justify-content-center">
                    {someProfiles instanceof Array &&
                      someProfiles.length > 0 && (
                        <Pagination
                          previousLabel={"previous"}
                          nextLabel={"next"}
                          breakLabel={"..."}
                          breakClassName={"pagination_link_box"}
                          pageCount={Math.ceil(someProfiles.length / 25)}
                          pageClassName="pagination_pages"
                          containerClassName="pagination_container"
                          pageLinkClassName="pageLinkClass"
                          activeLinkClassName="pagination_active_link"
                          nextClassName="pagination_next"
                          previousClassName="pagination_prev"
                          nextLinkClassName={"prev_next_link"}
                          previousLinkClassName={"prev_next_link"}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={5}
                          containerClassName={"pagination"}
                          subContainerClassName={"pages pagination"}
                          onPageChange={onPageChangeHandler}
                          activeClassName={""}
                        />
                      )}
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default SearchProfiles;
