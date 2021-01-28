import React, { Component } from "react";
import { connect } from "react-redux";
import { ApplyJobRoute } from "../../../routes";
import { getJob } from "../../../redux/actions";
import Loader1 from "../../reusable/loaders/Loader_1";
import isEmpty from "../../../utils/isEmpty";

export class JobApply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this.props.getJob(this.props.match.params.jobId);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.loading && this.props.jobLoader === false) {
      this.setState({ ...this.state, loading: false });
    }
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <Loader1 />
        ) : (
          <div className="avoid-navbar pt-5  container">
            {!isEmpty(this.props.job) ? (
              <>
                <h3 className="mb-5 text-secondary"> Job Apply </h3>
                <ApplyJobRoute />
              </>
            ) : (
              <h1 className="text-danger text-center">
                Job May be removed or does not exist
              </h1>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  job: state.job.currentJob,
  jobLoader: state.job.loaders.gettingJob
});

export default connect(mapStateToProps, { getJob })(JobApply);
