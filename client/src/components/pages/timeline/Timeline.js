import moment from "moment";
import React, { Component } from "react";
import Pagination from "react-paginate";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchJobs } from "../../../redux/actions";
import jobsSearchFilter from "../../../utils/selectors/jobsSearchFilter";
import truncate_text from "../../../utils/truncate_text";
import DotsGroup from "../../reusable/loaders/DotsGroup";
import InfoCard from "../timeline/InfoCard";
import Post from "../timeline/Post";
import qs from "query-string";
// const textFilter = useSelector(state => state.filters.text);
class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      pageNumber: 0,
    };
  }

  componentDidMount() {
    this.props.fetchJobs(this.state.pageNumber);
    const search = qs.parse(this.props.history.location.search);
    if (!search?.page || search?.page <= 0) {
      this.setState({ ...this.state, pageNumber: 0 });
      this.props.history.push({
        search: qs.stringify({ ...search, page: 1 }),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.loading && this.props.jobLoaders.fetchingJobs === false) {
      this.setState({ ...this.state, loading: false });
    }
    if (this.props.filters.text !== prevProps.filters.text) {
      // whenever user hits search with new text reset page number
      // this.setState({ ...this.state, pageNumber: 0 });
    }
    if (
      prevState.pageNumber !== this.state.pageNumber ||
      this.props.filters.text !== prevProps.filters.text
    ) {
      // fetching jobs whenever page number changes || user hit search button
      const { text = "" } = this.props.filters || {};
      const query = text.trim() === "" ? "" : `?searchText=${text}`;
      this.props.fetchJobs(this.state.pageNumber, query);
    }
  }
  onPageChangeHandler = ({ selected }) => {
    this.setState({
      ...this.state,
      pageNumber: selected,
    });
    const search = qs.stringify({ page: selected + 1 });
    this.props.history.push({
      search,
    });
  };
  render() {
    const { userData: ud, profile: pd, isAuth } = this.props;
    const name = (ud && ud.name) || "user name";
    const profession = (pd && pd?.job_title) || "your profession";
    const img = (pd && pd?.image) || "https://placehold.it/100/ddd";
    const { jobs = [] } = this.props.job || {};
    // const searchResult = jobsSearchFilter(this.props.job.jobs, {
    //   text: this.props.filters.text || "",
    //   sortBy: this.props.filters.sortBy,
    //   startDate: this.props.filters.startDate,
    //   endDate: this.props.filters.endDate,
    // });

    return (
      <div className="timeline avoid-navbar">
        <div className="container">
          <div className="row justify-content-center">
            {isAuth ? (
              <div className=" col-12 col-md-9 col-lg-3 order-1 order-lg-1">
                <div className="profile__brief main-card-layout relative-container">
                  <div className="d-flex flex-column justify-content-center align-items-center mb-2">
                    <Link to="/profile">
                      <div
                        className="img-preview"
                        style={{
                          width: "8rem",
                          height: "8rem",
                        }}
                      >
                        <img className="rounded-circle" src={img} alt="" />
                      </div>
                    </Link>
                    <div className="d-flex justify-content-center align-items-center flex-column">
                      <h6>{name}</h6>

                      <p className="text--secondary w-100 text-center">
                        {ud && ud.type === false
                          ? profession
                          : pd?.company_about &&
                            truncate_text(pd?.company_about, 100)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <h6 className="main-card-layout col-12 text-center">
                Recent Jobs
              </h6>
            )}
            <div className="col-lg-6 order-3 order-lg-2">
              {this.state.loading || this.props?.jobLoaders?.fetchingJobs ? (
                <DotsGroup isCentered={true} />
              ) : (
                <main
                  className="d-flex flex-column align-items-center "
                  style={{ height: "87vh" }}
                >
                  {jobs instanceof Array && jobs.length > 0 ? (
                    <>
                      <div className="w-100">
                        {jobs.map((job) => (
                          <Post
                            key={job._id}
                            _id={job._id}
                            userName={job.company.user.name}
                            open={job.open}
                            about={job.desc} //should come from job
                            jobTitle={job.title}
                            profileImg={
                              job.company.image || "http://placehold.it/100/ddd"
                            }
                            postingTime={moment(job.created_date).fromNow(
                              false
                            )}
                            isBelonging={isAuth && job.company._id === pd?._id}
                            isAuth={isAuth}
                            userId={job.company.user._id}
                            companyId={job.company._id}
                          />
                        ))}
                      </div>

                      <Pagination
                        previousLabel={"previous"}
                        forcePage={this.state.pageNumber}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        breakClassName={"pagination_link_box"}
                        pageCount={Math.ceil(this.props.job?.totalResults / 25)}
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
                        onPageChange={this.onPageChangeHandler}
                        activeClassName={""}
                      />
                    </>
                  ) : (
                    "No Results Found"
                  )}
                </main>
              )}
            </div>
            <div className="col-lg-3 col-12 order-2 order-lg-3">
              <h4 className="right-widget__title">Today's Analysis</h4>
              <div className="row info-card-row">
                <div className="col-12 col-sm-6 col-lg-12">
                  <InfoCard
                    title="Posts"
                    info={this.props.job.jobs.length}
                    src="/images/writing.svg"
                    loading={this.state.loading}
                  />
                </div>
                <div className="col-12 col-sm-6 col-lg-12">
                  <InfoCard
                    title={"Jobs"}
                    info={this.props.job.jobs.length}
                    src="/images/suitcase.svg"
                    loading={this.state.loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userData: state.user.userData,
  isAuth: state.auth.isAuth,
  job: state.job,
  profile: state.profile.profileData,
  jobLoaders: state.job.loaders,
  profileLoaders: state.profile.loaders,
  userDataLoading: state.user.userDataLoading,
  filters: state.filters,
});
export default connect(mapStateToProps, { fetchJobs })(Timeline);
