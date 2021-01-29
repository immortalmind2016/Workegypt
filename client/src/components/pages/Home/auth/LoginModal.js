import React, { Component } from "react";
import validateAuth from "../../../../utils/validation/validateAuth";
import $ from "jquery";

import { resendConfirmation, forgotPassword } from "../../../../redux/actions";
import isEmpty from "../../../../utils/isEmpty";
class LoginModal extends Component {
  //lifecycle methods
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmationCode: undefined,
      errors: {},
      loading: false,
      codeResent: null,
      passwordSent: null,
      forgotPassword: null
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.loading === true && this.props.isLogging === false) {
      this.setState({ ...this.state, loading: false });
    }
  }

  onModalOpen = () => {
    if (localStorage.getItem("regData")) {
      const { email, password } = JSON.parse(localStorage.regData);
      this.setState({ ...this.state, email, password }, () => {
        this.__login();
      });
    }
  };

  onModalHide = () => {
    if (localStorage.getItem("regData")) {
      localStorage.removeItem("regData");
    }
  };
  componentDidMount() {
    $("#loginModal").on("show.bs.modal", this.onModalOpen);
    $("#loginModal").on("hide.bs.modal", this.onModalHide);
  }

  componentWillUnmount() {
    if (this.props.isLogging === false && this.props.loginError === false) {
      $("#loginModal").modal("hide");
    }
    $("#loginModal").off("show.bs.modal");
    $("#loginModal").off("hide.bs.modal");
    if (localStorage.regData) {
      localStorage.removeItem("regData");
    }
  }

  //class methods
  onChangeHandler = ({ target }) =>
    this.setState({ [target.name]: target.value });

  __login = () => {
    const { email, password, confirmationCode } = this.state;
    const { isValid, errors } = validateAuth("", email, password, "");
    if (!isValid) {
      this.setState({
        ...this.state,
        errors
      });
      return;
    }
    //clearing errors and setting loader
    this.setState({ errors: {}, loading: true });

    //sending request
    this.props._login(email, password, confirmationCode);
  };
  handleKeyDown = e => {
    if (e.keyCode === 13) {
      //enter is pressed
      this.__login();
    }
  };
  _resendConfirmation = () => {
    const { errors } = validateAuth(
      "",
      this.state.email,
      this.state.password,
      ""
    );
    if (errors.email) {
      this.setState({
        ...this.state,
        errors: { ...this.state.errors, email: errors.email }
      });
      return;
    }
    resendConfirmation(this.state.email);
    this.setState(
      {
        ...this.state,
        codeResent: true
      },
      () => {
        setTimeout(() => {
          this.setState({
            ...this.state,
            codeResent: false
          });
        }, 3000);
      }
    );
  };

  onForgotPasswordClick = () => {
    if (isEmpty(this.state.email)) {
      this.setState({
        ...this.state,
        error: { ...this.state.errors, email: "email is required" }
      });
      return;
    }

    forgotPassword(this.state.email);
    this.setState({ ...this.state, passwordSent: true }, () => {
    localStorage.setItem("forgotPassword", JSON.stringify(true));
      setTimeout(() => {
        this.setState({ ...this.state, passwordSent: false });
      }, 3000);
    });
  };
  render() {
    const { email, password, confirmationCode, errors } = this.state;
    return (
      <div
        className="modal fade auth-modal "
        id="loginModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="loginModal"
        aria-hidden="true"
        onKeyDown={this.handleKeyDown}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div
              className="modal-header"
              style={{ backgroundColor: "#00326f", justifyContent: "center" }}
            >
              <img src="/images/Logo.svg" width={40} alt="" />
            </div>
            <div className="modal-body">
              <div className="modal-body__applicant">
                <div className="validation-input-wrapper">
                  <input
                    type="email"
                    name="email"
                    onChange={this.onChangeHandler}
                    placeholder="email address"
                    value={email}
                    className={`${errors.email && "not-valid"}`}
                  />
                  {errors.email && (
                    <span className="text-danger"> {errors.email}</span>
                  )}
                </div>
                {this.state.forgotPassword === null && (
                  <div className="validation-input-wrapper">
                    <input
                      type="password"
                      name="password"
                      onChange={this.onChangeHandler}
                      placeholder="password"
                      value={password}
                      className={`${errors.password && "not-valid"}`}
                    />
                    {errors.password && (
                      <span className="text-danger">{errors.password}</span>
                    )}
                  </div>
                )}
                {(this.props.loginError.code === "#0" ||
                  this.props.loginError.code === "#1") && (
                  <div className="validation-input-wrapper">
                    <input
                      type="text"
                      name="confirmationCode"
                      onChange={this.onChangeHandler}
                      placeholder="type your confirmation code.."
                      value={confirmationCode}
                      autoComplete="off"
                      className={`border border-primary ${errors.confirmation &&
                        "not-valid"}`}
                    />

                    <button
                      className="btn btn-info mt-3"
                      onClick={this._resendConfirmation}
                    >
                      Resend code
                      {this.state.codeResent === true && (
                        <div className="spinner-border ml-3" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      )}
                    </button>
                  </div>
                )}

                {this.props.loginError.code === "#0" && (
                  <p className=" mx-5 mt-3">
                    a confirmation code has been sent to your email, please type
                    it in the field above
                  </p>
                )}
                <div className="d-flex flex-centered">
                  {this.state.forgotPassword === true ? (
                    <div className="forgot-password mt-4 text-center">
                      <button
                        className="btn btn-link"
                        onClick={() =>
                          this.setState({ ...this.state, forgotPassword: null })
                        }
                      >
                        back to login
                      </button>
                    </div>
                  ) : (
                    <div className="forgot-password mt-4 text-center">
                      <button
                        className="btn btn-link"
                        onClick={() =>
                          this.setState({ ...this.state, forgotPassword: true })
                        }
                      >
                        forgot password ?
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {this.props.loginError.code === "#2" && (
              <div className="alert alert-danger mx-5 text-center">
                Login failed! incorrect email or password.
              </div>
            )}
            {this.props.loginError.code === "#1" && (
              <div className="alert alert-danger mx-5 text-center">
                Wrong confirmation code
              </div>
            )}

            {this.state.codeResent === false ||
              (this.state.passwordSent === false && (
                <div className="alert alert-success mx-5 text-center">
                  sent successfully
                </div>
              ))}

            <div className="modal-footer">
              {!this.state.forgotPassword && (
                <button
                  onClick={this.__login}
                  type="button"
                  className="general-btn"
                  disabled={this.state.loading}
                >
                  {this.state.loading ? (
                    <div className="spinner-border text-primary" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    "Login"
                  )}
                </button>
              )}

              {this.state.forgotPassword === true && (
                <div className="forgot-password mt-4 text-center">
                  <button
                    className=" general-btn"
                    onClick={this.onForgotPasswordClick}
                  >
                    send password
                    {this.state.passwordSent === true && (
                      <div className="spinner-border ml-3" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default LoginModal;
