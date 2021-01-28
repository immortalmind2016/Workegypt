import React, { Component } from "react";
import { connect } from "react-redux";
import { editApplicantStatus, getApplicants } from "../../../redux/actions";
import DotsGroup from "../../reusable/loaders/DotsGroup";
import JobApplicantCard from "./JobApplicantCard";
import { socket } from "../../../index";
export class ShowJobApplicants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  popupCenter = ({ url, title, w, h }) => {
    // Fixes dual-screen position                             Most browsers      Firefox
    const dualScreenLeft =
      window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop =
      window.screenTop !== undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth
      ? window.innerWidth
      : document.documentElement.clientWidth
      ? document.documentElement.clientWidth
      : window.screen.width;
    const height = window.innerHeight
      ? window.innerHeight
      : document.documentElement.clientHeight
      ? document.documentElement.clientHeight
      : window.screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft;
    const top = (height - h) / 2 / systemZoom + dualScreenTop;
    const newWindow = window.open(
      url,
      title,
      `
      scrollbars=yes,
      width=${w / systemZoom}, 
      height=${h / systemZoom}, 
      top=${top}, 
      left=${left}
      `
    );

    if (window.focus) newWindow.focus();
  };
  //this.popupCenter({url:`${window.location.origin}/interview/${companyId}/${applicantId}`,title:"workegypt",w:"900",h:"900"})

  createPeer(applicantId) {
    // to insure that open popup from interview button
    localStorage.setItem("#$import", "#$im");
    //Check online or not

    const companyId = this.props.user.userData._id;
    this.popupCenter({
      url: `${window.location.origin}/interview/${companyId}/${applicantId}`,
      title: "workegypt",
      w: "900",
      h: "900",
    });
    //socket.emit("CheckOnline",{applicantId,companyId})
  }

  componentDidMount() {
    const { jobId } = this.props.match.params;
    this.props.getApplicants(jobId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.loading && this.props.applicantsLoading === false) {
      this.setState({ ...this.state, loading: false });
    }
  }

  render() {
    const { jobId } = this.props.match.params;
    const { applicants } = this.props;
    return (
      <div className="avoid-navbar container">
        <div className="show-job-applicants pt-5">
          <h3 className="mb-4">Job Applicants</h3>
          {this.state.loading === false ? (
            <div className="row">
              {applicants?.length > 0 ? (
                <>
                  {applicants.map((ap) => (
                    <JobApplicantCard
                      key={ap._id}
                      userName={ap.applicant.user.name}
                      profileImg={ap.applicant.image}
                      status={ap.status}
                      quizScore={ap.quiz_score + "/10"}
                      applicantId={ap.applicant._id}
                      applicantProfileId={ap.applicant.user._id}
                      jobId={jobId}
                      createPeer={this.createPeer.bind(this)}
                      editApplicantStatus={this.props.editApplicantStatus}
                    />
                  ))}
                </>
              ) : (
                <span>No Applicants Applied Yet</span>
              )}
            </div>
          ) : (
            <DotsGroup isCentered={true} />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  applicants: state.job.jobApplicants,
  applicantsLoading: state.job.loaders.gettingApplicants,
  user: state.user,
});

export default connect(mapStateToProps, { editApplicantStatus, getApplicants })(
  ShowJobApplicants
);
