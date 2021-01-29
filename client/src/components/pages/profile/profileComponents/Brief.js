import React, { Component } from "react";
/**
 * @todo
 * LOADERS ON IMAGE UPLOADING
 *
 */

import $ from "jquery";
import isEmpty from "../../../../utils/isEmpty";
import { uris } from "../../../../config";
import axios from "axios";
const BriefModal = ({
  userName,
  jobTitle,
  profileImg,
  onChangeHandler,
  onSave,
  onImgLoad,
  errors,
  imageIsLoading
}) => (
  <div
    className="modal fade avoid-navbar exp-modal"
    id="BriefModal"
    tabIndex="-1"
    role="dialog"
    aria-labelledby="BriefModalTitle"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-dialog-scrollable" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title" id="BriefModalTitle">
            Edit your information
          </h2>
        </div>
        <div className="modal-body">
          <div className="img-preview">
            <img
              className="rounded-circle"
              src={imageIsLoading ? "/images/circularLoader.gif" : profileImg}
              alt=""
            />
          </div>

          <div className="form-group image-uploader">
            <input
              hidden
              id="chooseProfileImg"
              type="file"
              name="image"
              accept=".png , .jpg"
              onChange={onImgLoad}
            />
            <label
              htmlFor="chooseProfileImg"
              style={{
                color: "#333",
                cursor: "pointer"
              }}
            >
              <i className="fas fa-upload" />
            </label>
          </div>
          {errors && (
            <p className="text-danger mb-2">missing required fields!</p>
          )}

          <input
            className="exp-input"
            name="jobTitle"
            placeholder="jop title.."
            value={jobTitle}
            onChange={onChangeHandler}
          />
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
          >
            Close
          </button>
          <button onClick={onSave} type="button" className="btn btn-primary">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
);
export default class Brief extends Component {
  constructor(props) {
    super(props);
    const { img, profession, lastUpdated, name } = props;

    this.state = {
      imgFile: null,
      profileImg: img || "",
      userName: name || "",
      jobTitle: profession || "",
      lastUpdated: lastUpdated,
      errors: false,
      imageIsLoading: false,
      loading: false
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.profession !== this.props.profession ||
      this.props.img !== prevProps.img ||
      this.props.userName !== prevProps.userName
    ) {
      this.setState({
        ...this.state,
        profileImg: this.props.img,
        jobTitle: this.props.profession,
        userName: this.props.userName
      });
    }
    if (!prevState.loading && this.state.loading && this.props.profileEditing) {
      this.setState({ ...this.state, loading: false });
    }
  }

  onChangeHandler = ({ target }) =>
    this.setState({
      ...this.state,
      [target.name]: target.value
    });

  readURL = input => {
    if (input.files && input.files[0]) {
      if (input.files[0].size > 1024 * 1024 * 5) {
        alert("image size is too big maximum image size is 5 Mb");
        return;
      }
      this.setState({ ...this.state, imgFile: input.files[0] });
      let reader = new FileReader();

      reader.onload = e => {
        this.setState({ ...this.state, profileImg: e.target.result });
      };

      reader.readAsDataURL(input.files[0]);
    }
  };

  onImgLoad = ({ target }) => this.readURL(target);

  onSave = () => {
    this.setState({ ...this.state, loading: true });
    const { jobTitle, imgFile } = this.state;

    //only edit title if no image provided
    if (!isEmpty(jobTitle)) {
      this.props._editProfile({ job_title: jobTitle });

      if (!imgFile) {
        $("#BriefModal").modal("hide");
        return;
      }
    }
    if (!!imgFile) {
      this.setState({ ...this.state, errors: false, imageIsLoading: true });
      const formData = new FormData();
      formData.append("image", imgFile);
      //uploading image
      axios
        .post(uris.profile.uploadApplicantImg, formData, {
          headers: {
            "content-type": "multipart/form-data"
          }
        })
        .then(({ data }) => {
          this.setState({
            ...this.state,
            imageIsLoading: false,
            profileImg: data.link
          });
          //editing profile
          this.props._editProfile({ image: data.link, job_title: jobTitle });
          $("#BriefModal").modal("hide");
        });
    }
  };

  render() {
    const {
      img,
      name,
      profession,
      lastUpdated,
      isPreviewing = false
    } = this.props;
    const { loading, imageIsLoading } = this.state;
    return (
      <div className="profile__brief main-card-layout relative-container">
        {loading ? (
          "Loading..."
        ) : (
          <>
            {!isPreviewing && (
              <>
                <button
                  className="btn--add-plus btn btn-primary rounded-circle"
                  data-toggle="modal"
                  data-target="#BriefModal"
                  style={{ zIndex: 10 }}
                >
                  <i
                    className="fas fa-pen text-light"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Edit Information"
                  />
                </button>

                <BriefModal
                  {...this.state}
                  onChangeHandler={this.onChangeHandler}
                  onImgLoad={this.onImgLoad}
                  onSave={this.onSave}
                  imageIsLoading={imageIsLoading}
                />
              </>
            )}
            <div className="d-flex flex-column justify-content-center align-items-center mb-2">
              <div
                className="img-preview"
                style={{
                  width: "8rem",
                  height: "8rem"
                }}
              >
                <img className="rounded-circle" src={img} alt="" />
              </div>
              <h6>{name}</h6>
              <span className="text--secondary">{profession}</span>
            </div>
            <span className="hr-line" />
            <div className="d-flex justify-content-center align-items-center py-2 w-100 px-2">
              <span className="text-dark mr-3">Last Update</span>
              <small className="text-muted">{lastUpdated}</small>
            </div>
          </>
        )}
      </div>
    );
  }
}
