import $ from "jquery";
/**
 * Note:
 * in case you want to add more fields to company form..
 * ..just use formShown state to control the shown data
 */
import React, { Component } from "react";

import validateAuth from "../../../../utils/validation/validateAuth";

class RegisterModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formShown: "applicant",
      loading: false,
      name: "",
      email: "",
      password: "",
      password2: "",
      registeredSuccessfully: null,
      errors: {},
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.formShown !== this.props.formShown) {
      this.setState({ ...this.state, formShown: this.props.formShown });
    }
    if (this.state.loading === true && this.props.isRegistering === false) {
      this.setState({ ...this.state, loading: false });
    }

    //login has finished successfully
    if (
      prevState.loading === true &&
      this.state.loading === false &&
      this.props.registerError === false
    ) {
      //hiding modal
      this.setState({ ...this.state, registeredSuccessfully: true }, () =>
        setTimeout(() => {
          $("#registerModal").modal("hide");
          $("#loginModal").modal("show");
        }, 2000)
      );
    }
  }

  setFormShown = (isApplicant = true) => {
    this.setState({
      ...this.state,
      formShown: isApplicant ? "applicant" : "company",
    });
  };
  onChangeHandler = ({ target }) =>
    this.setState({
      ...this.state,
      [target.name]: target.value,
    });

  __register = () => {
    const { name, email, password, password2, formShown } = this.state;
    const { isValid, errors } = validateAuth(
      name,
      email,
      password,
      password2,
      true
    );
    if (!isValid) {
      this.setState({
        ...this.state,
        errors,
      });
      return;
    }
    //clearing data
    this.setState({
      loading: true,
      errors: {},
    });
    const type = formShown === "applicant" ? false : true;
    //storing data in localstorage
    localStorage.setItem("regData", JSON.stringify({ email, password }));
    //sending request
    this.props._register(name, email, password, type);
  };

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      //enter is pressed
      this.__register();
    }
  };

  render() {
    const { name, email, password, password2, formShown, errors } = this.state;

    return (
      <div
        className="modal fade auth-modal"
        id="registerModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="registerModalLabel"
        aria-hidden="true"
        onKeyDown={this.handleKeyDown}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <div
                className={`applicant text-center ${
                  formShown === "applicant" && "active-register"
                }`}
                onClick={() => this.setFormShown(true)}
              >
                <img className="" src="images/employee_1.svg" alt="" />
                <span className="">Applicant</span>
              </div>
              <div
                className={`company text-center ${
                  formShown === "company" && "active-register"
                }`}
                onClick={() => this.setFormShown(false)}
              >
                <img className="" src="images/company.svg" alt="" />
                <span className="">Company</span>
              </div>
            </div>
            <div className="modal-body">
              <div className="modal-body__applicant">
                <div className="validation-input-wrapper">
                  <input
                    type="text"
                    placeholder={`${this.state.formShown} name`}
                    name="name"
                    onChange={this.onChangeHandler}
                    value={name}
                    className={`${errors.name && "not-valid"}`}
                  />
                  {errors.name && (
                    <span className="text-danger">{errors.name}</span>
                  )}
                </div>
                <div className="validation-input-wrapper">
                  <input
                    type="email"
                    placeholder="email address"
                    name="email"
                    onChange={this.onChangeHandler}
                    value={email}
                    className={`${errors.email && "not-valid"}`}
                  />
                  {errors.email && (
                    <span className="text-danger">{errors.email}</span>
                  )}
                </div>
                <div className="validation-input-wrapper">
                  <input
                    type="password"
                    placeholder="password"
                    name="password"
                    onChange={this.onChangeHandler}
                    value={password}
                    className={`${errors.password && "not-valid"}`}
                  />
                  {errors.password && (
                    <span className="text-danger">{errors.password}</span>
                  )}
                </div>
                <div className="validation-input-wrapper">
                  <input
                    type="password"
                    placeholder="confirm password"
                    name="password2"
                    onChange={this.onChangeHandler}
                    value={password2}
                    className={`${errors.password2 && "not-valid"}`}
                  />
                  {errors.password2 && (
                    <span className="text-danger">{errors.password2}</span>
                  )}
                </div>
                {/*                 <div className="input-checkbox">
                  <input type="checkbox" />
                  <span>
                    ras sit amet nibh libero, in gravida nulla. Nulla vel
                    metusscelerisque ante sollicitudin Nulla vel metus
                    scelerisque ante sollicitudin Cras sit amet nibh libero, in
                    gravida nulla.
                  </span>
                </div> */}
              </div>
            </div>
            {this.props.registerError && (
              <div className="alert alert-danger mx-5 text-center">
                Register failed! email or name is already registered, or there
                is an error, please try again
              </div>
            )}
            {this.state.registeredSuccessfully && (
              <div className="alert alert-success mx-5 text-center">
                You registered successfully
              </div>
            )}
            <div className="modal-footer">
              <button
                onClick={this.__register}
                type="button"
                className="general-btn"
              >
                {this.state.loading ? (
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default RegisterModal;
