/**
 * @todo
 * fix edit job modal loader
 */
import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteJob, editJob, fetchUserJobs } from "../../../redux/actions";
import OurJobsCard from "./OurJobCard";
import DotsGroup from "../../reusable/loaders/DotsGroup";
import moment from "moment";

class OurJobs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jobsLoading: true,
    };
  }
  componentDidMount() {
    if (this.props.profile.profileData?._id) {
      this.props.fetchUserJobs(this.props.profile.profileData?._id);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.jobsLoading &&
      this.props.jobLoaders.fetchingUserJobs === false
    ) {
      this.setState({ ...this.state, jobsLoading: false });
    }
  }
  onDeleteHandler = _id => {
    this.props.deleteJob(_id);
  };
  onToggleHandler = (_id, isOpened) => {
    this.props.editJob(_id, { open: isOpened });
  };
  editJobHandler = (_id, newJob) => {
    this.props.editJob(_id, newJob);
  };
  render() {
    const { jobsLoading } = this.state;
    const { userJobs } = this.props.job
      ? this.props.job
      : { userJobs: undefined };
    const { user, profile } = this.props;

    return (
      <div className="our-jobs avoid-navbar container">
        <div className="row ">
          <div className="col-12 col-sm-6 col-md-4">
            <h6 className="text-secondary mb-4">Our Jobs</h6>
          </div>
          <div className="offset-8"></div>
          {jobsLoading ? (
            <DotsGroup />
          ) : (
            <>
              {userJobs.length > 0 ? (
                userJobs.map(job => (
                  <OurJobsCard
                    key={job._id}
                    _id={job._id}
                    title={job.title}
                    desc={job.desc}
                    open={job.open}
                    onDeleteHandler={this.onDeleteHandler}
                    onToggleHandler={this.onToggleHandler}
                    editJobHandler={this.editJobHandler}
                    job={job}
                    postingTime={moment(job.created_date).fromNow()}
                    companyName={user && user.name}
                    companyAbout={
                      profile &&
                      profile.profileData &&
                      profile.profileData?.company_about
                    }
                    src={
                      profile &&
                      profile.profileData &&
                      profile.profileData?.image
                    }
                    jobLoaders={this.props.jobLoaders}
                  />
                ))
              ) : (
                <p>No Jobs Added Yet..</p>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  job: state.job,
  user: state.user && state.user.userData,
  profile: state.profile,
  userDataLoading: state.user.userDataLoading,
  jobLoaders: state.job.loaders,
  profileLoader: state.profile.loaders.profileFetching,
});

export default connect(mapStateToProps, { fetchUserJobs, deleteJob, editJob })(
  OurJobs
);
