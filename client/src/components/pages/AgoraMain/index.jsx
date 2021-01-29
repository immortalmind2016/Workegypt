import * as Cookies from "js-cookie";
import React from "react";
import { withRouter } from "react-router-dom";
import "../../../assets/fonts/css/icons.css";
import Validator from "../../../utils/Validator";
import { connect } from "react-redux";
import { setInterviewCode } from "../../../redux/actions";
// import "bulma/css/bulma.css";
import "./index.css";
import { validateCode } from "../../../services/interviews";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      joinBtn: false,
      channel: "",
      baseMode: "avc",
      transcode: "interop",
      attendeeMode: "video",
      videoProfile: "480p_4",
      codeError: false,
      validating: null,
    };
  }

  componentDidMount() {
    window.addEventListener("keypress", (e) => {
      e.keyCode === 13 && this.handleJoin();
    });
  }

  /**
   *
   * @param {String} val 0-9 a-z A-Z _ only
   * @param {Boolean} state
   */
  handleChannel = (val, state) => {
    this.setState({
      channel: val,
      joinBtn: state,
    });
  };

  handleJoin = async () => {
    if (!this.state.joinBtn) return;
    this.setState({ ...this.state, validating: true });
    try {
      const res = await validateCode(this.state.channel);
      this.setState({ ...this.state, codeError: true, validating: false });
      this.props.setInterviewCode(this.state.channel);
      Cookies.set("channel", this.state.channel);
      Cookies.set("baseMode", this.state.baseMode);
      Cookies.set("transcode", this.state.transcode);
      Cookies.set("attendeeMode", this.state.attendeeMode);
      Cookies.set("videoProfile", this.state.videoProfile);
      this.props.history.push("/interview/room");
    } catch (error) {
      this.setState({ ...this.state, codeError: true, validating: undefined });
    }
  };

  render() {
    return (
      <div className="ag-full">
        <div className="wrapper index">
          <div className="ag-header"></div>
          <div className="ag-main">
            <section className="login-wrapper">
              <div className="login-header">
                <img
                  src={require("../../../assets/images/ag-logo.png")}
                  alt=""
                />
                <p className="login-title">WorkEgypt</p>
                <p className="login-subtitle">Real-Time Communications</p>
              </div>
              <div className="login-body">
                <div className="row">
                  <div className="col-12">
                    <InputChannel
                      onChange={this.handleChannel}
                      placeholder="Enter meeting code.."
                    ></InputChannel>
                  </div>
                  <div className="col-12 mb-5">
                    <BaseOptions
                      onChange={(val) => this.setState({ baseMode: val })}
                    ></BaseOptions>
                  </div>
                </div>

                <div className="row">
                  <div className="column">
                    <div id="attendeeMode" className="control">
                      <label className="radio">
                        <input
                          onChange={(e) =>
                            this.setState({ attendeeMode: e.target.value })
                          }
                          value="video"
                          type="radio"
                          name="attendee"
                          defaultChecked
                        />
                        <span className="radio-btn"></span>
                        <span className="radio-img video"></span>
                        <span className="radio-msg">
                          Video Call : join with video call
                        </span>
                      </label>
                      <br />
                      <label className="radio">
                        <input
                          onChange={(e) =>
                            this.setState({ attendeeMode: e.target.value })
                          }
                          value="audio-only"
                          type="radio"
                          name="attendee"
                        />
                        <span className="radio-btn"></span>
                        <span className="radio-img audio"></span>
                        <span className="radio-msg">
                          Audio-only : join with audio call
                        </span>
                      </label>
                      <br />
                      <label className="radio">
                        <input
                          onChange={(e) =>
                            this.setState({ attendeeMode: e.target.value })
                          }
                          value="audience"
                          type="radio"
                          name="attendee"
                        />
                        <span className="radio-btn"></span>
                        <span className="radio-img audience"></span>
                        <span className="radio-msg">
                          Audience : join as an audience
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              {this.state.codeError && (
                <p className="text-danger">
                  Sorry, this code is not valid. please generate a new one.
                </p>
              )}

              <div className="login-footer">
                <button
                  type="button"
                  id="joinBtn"
                  onClick={this.handleJoin}
                  disabled={!this.state.joinBtn}
                  className={`btn btn-info  ${
                    !this.state.joinBtn && "disabled"
                  }`}
                >
                  {!this.state.validating ? (
                    "Join"
                  ) : (
                    <span className="spinner-border" />
                  )}
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

class InputChannel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMsg: "",
      state: "",
    };
  }

  validate = (val) => {
    this.setState({
      state: "",
      errorMsg: "",
    });
    if (Validator.isNonEmpty(val.trim())) {
      this.setState({
        errorMsg: "Cannot be empty!",
        state: "is-danger",
      });
      return false;
    } else if (Validator.minLength(val.trim(), 9)) {
      this.setState({
        errorMsg: "Code is invalid",
        state: "is-danger",
      });
      return false;
    } else if (Validator.maxLength(val.trim(), 9)) {
      this.setState({
        errorMsg: "Code is invalid",
        state: "is-danger",
      });
      return false;
    } else if (Validator.validChar(val.trim())) {
      this.setState({
        state: "is-danger",
        errorMsg:
          'Only capital or lower-case letter, number and "_" are permitted!',
      });
      return false;
    } else {
      this.setState({
        state: "is-success",
      });
      return true;
    }
  };

  handleChange = (e) => {
    let state = this.validate(e.target.value);
    this.props.onChange(e.target.value, state);
  };

  render() {
    let validateIcon = "";
    switch (this.state.state) {
      default:
      case "":
        validateIcon = "";
        break;
      case "is-success":
        validateIcon = <i className="ag-icon ag-icon-valid"></i>;
        break;
      case "is-danger":
        validateIcon = <i className="ag-icon ag-icon-invalid"></i>;
        break;
    }

    return (
      <div className="channel-wrapper control has-icons-left">
        <input
          onInput={this.handleChange}
          id="channel"
          className={"ag-rounded form-control " + this.state.state}
          type="text"
          placeholder={this.props.placeholder}
        />
        <span className="icon is-small is-left">
          <img src={require("../../../assets/images/ag-login.png")} alt="" />
        </span>
        <span className="validate-icon">{validateIcon}</span>
        <div className="validate-msg">{this.state.errorMsg}</div>
      </div>
    );
  }
}

class BaseOptions extends React.Component {
  constructor(props) {
    super(props);
    this._options = [
      {
        label: "Agora Video Call",
        value: "avc",
        content: "One to one and group calls",
      },
      {
        label: "Agora Live",
        value: "al",
        content:
          "Enabling real-time interactions between the host and the audience",
      },
    ];
    this.state = {
      active: false,
      message: "Agora Video Call",
    };
  }

  handleSelect = (item) => {
    let msg = item.label;
    let val = item.value;
    this.setState({
      message: msg,
      active: false,
    });
    this.props.onChange(val);
  };

  render() {
    const options = this._options.map((item, index) => {
      return (
        <div
          className="dropdown-item"
          key={index}
          onClick={(e) => this.handleSelect(item, e)}
        >
          <p>{item.label}</p>
          <hr />
          <p>{item.content}</p>
        </div>
      );
    });

    return (
      <div className="dropdown">
        <div
          className="dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          // onClick={() => this.setState({ active: !this.state.active })}
        >
          <a
            id="baseMode"
            className="ag-rounded button"
            aria-haspopup="true"
            aria-controls="baseModeOptions"
          >
            <span id="baseOptionLabel">{this.state.message}</span>
          </a>
        </div>
        <div className="dropdown-menu" id="baseModeOptions" role="menu">
          <div className="dropdown-content">{options}</div>
        </div>
      </div>
    );
  }
}

const IndexWithRouter = withRouter(Index);
export default connect(null, { setInterviewCode })(IndexWithRouter);
