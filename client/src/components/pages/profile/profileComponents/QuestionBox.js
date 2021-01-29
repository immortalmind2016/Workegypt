import React, { Component } from "react";
import Axios from "axios";
import { uris } from "../../../../config";

const Question = ({
  uploadVideo,
  videoLink,
  videoIsLoading,
  title,
  index,
  isPreviewing
}) => {
  return (
    <div className="question main-card-layout">
      <div className="d-flex align-items-center justify-content-between">
        <h5 className="mb-5 mt-2">{title}</h5>
        {!isPreviewing && (
          <div className="form-group image-uploader">
            <input
              hidden
              id={`chooseProfileVideo_${index}`}
              type="file"
              name="image"
              accept="video/*"
              onChange={uploadVideo}
            />
            <label
              htmlFor={`chooseProfileVideo_${index}`}
              style={{
                color: "#333",
                cursor: "pointer"
              }}
              data-toggle="tooltip"
              data-placement="top"
              title="Upload Answer Video"
            >
              <i className="fas fa-upload" />
            </label>
          </div>
        )}
      </div>

      {videoIsLoading ? (
        <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
          <img
            className="rounded-circle"
            src={"/images/circularLoader.gif"}
            alt=""
          />
        </div>
      ) : (
        videoLink && (
          <video
            style={{ borderRadius: 10, background: "#000" }}
            height={400}
            width={"100%"}
            controls
            src={videoLink}
            className="remove-outline"
          />
        )
      )}
    </div>
  );
};
export default class QuestionBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoLink: props.videoLink || "",
      videoIsLoading: false
    };
  }
  uploadVideo = e => {
    const data = new FormData();
    data.append("video", e.target.files[0]);

    this.setState({ ...this.state, videoIsLoading: true });
    Axios.post(uris.profile.uploadApplicantVideo, data, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then(({ data }) => {
        this.setState({ videoLink: data.link, videoIsLoading: false });
        this.props._editProfileField(
          "questions",
          this.props.index,
          {
            title: this.props.title,
            link: data.link
          },
          true
        );
      })
      .catch(e => console.error("video uploading has failed!", e));
  };

  render() {
    const { videoLink, videoIsLoading } = this.state;
    const { title, isPreviewing } = this.props;
    return (
      <div className="question-box mb-2">
        <Question
          index={this.props.index}
          uploadVideo={this.uploadVideo}
          videoLink={videoLink}
          videoIsLoading={videoIsLoading}
          title={title}
          isPreviewing={isPreviewing}
        />
      </div>
    );
  }
}
