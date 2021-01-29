import $ from "jquery";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { login, logout, register } from "../../../redux/actions";
import Footer from "../../reusable/Footer";
import LoginModal from "./auth/LoginModal";
import RegisterModal from "./auth/RegisterModal";
import BrandingVideoModal from "./BrandingVideoModal";
import ServicesCard from "./ServicesCard";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardImg: [
        "images/card1.svg",
        "images/card2.svg",
        "images/card3.svg",
        "images/card4.svg",
      ],
      cardHeader: ["Analysis", "Secure", "be connected", "easy to use"],
      servicesCardIcon: [
        "fas fa-language",
        "far fa-address-card",
        "fas fa-clipboard",
      ],
      servicesCardHeader: [
        "Our Recruitment Services",
        "Train to Hire Program",
        "Event Organizer",
      ],
      servicesCardContent: [
        "We can provide you with any of the language profiles you need: Spanish - German - Italian - French - English - Dutch - Portuguese - Japanese - Chinese.",
        "Upskill your employee or your candidates to fit the job",
        "Linking between employers and Job seekers and facilitate the hiring process experience",
      ],

      loading: null,
      formSown: "applicant",
    };
  }

  //lifecycle hooks
  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.isRegistering !== false &&
      this.props.isRegistering === false &&
      !this.props.authErrors.register_err
    ) {
      $("#registerModal").modal("hide");
    }
    if (
      prevProps.isLogging !== false &&
      this.props.isLogging === false &&
      !this.props.authErrors.login_err
    ) {
      this.setState({ ...this.state, loading: true });
    }

    if (this.state.loading && this.props.userLoading === false) {
      this.setState({ loading: false });
      this.props.history.push("/profile");
    }
  }

  //methods

  _login = (email, password, confirmationCode) => {
    //valid
    this.props.login(email, password, confirmationCode);
  };
  _register = (name, email, password, type) => {
    //valid
    this.props.register(name, email, password, type);
  };
  componentWillUnmount() {
    $("#registerModal").modal("hide");
    $("#loginModal").modal("hide");
  }

  setFormShown = (type = "applicant") => {
    this.setState({
      ...this.state,
      formSown: type,
    });
  };
  render() {
    return (
      <>
        <div className="home">
          <>
            <RegisterModal
              registerError={this.props.authErrors.register_err}
              _register={this._register}
              isRegistering={this.props.isRegistering}
              formShown={this.state.formShown}
            />

            <LoginModal
              loginError={this.props.authErrors.login_err}
              _login={this._login}
              history={this.props.history}
              isLogging={this.props.isLogging}
            />
          </>

          <div className="getStarted row">
            <div className="col-md-5  order-md-1 order-2">
              <div className="getStarted__about ">
                <h1>About WorkEgypt</h1>
                <p className="mb-2">
                  WorkEgypt.net is created and managed by WorkEgypt, a
                  recruitment and training consultancy company specialized in
                  designing Innovative Online Recruitment Solutions and
                  recruitment and training consultancy We're helping employers
                  and job seekers to find their right match through our
                  intelligent real-time recommendations and around the clock
                  support.
                </p>

                <button
                  type="button"
                  className="general-btn mt-2"
                  data-toggle="modal"
                  data-target="#getStartedModal"
                >
                  Get Started
                </button>
                <BrandingVideoModal />
              </div>
            </div>
            <div className="col-md-7 order-md-2 order-1 p-0">
              <div className="getStarted__images-container">
                <img
                  className="getStarted__curve"
                  src="images/3.png"
                  alt="brokekkkeen"
                />

                <img
                  className="getStarted__img"
                  src="images/Home-1_0.svg"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="container">
            <div className="applicant-benefits row">
              <div className="applicant-benefits__text col-lg-6">
                <h1>Looking for a job?</h1>
                <p className="">
                  If you are searching for a new career opportunity, you
                  can search open vacancies and jobs. You can also signup
                  here to be alerted of new jobs by email.
                </p>
                {this.props.isAuth && this.props.user?.type === false && (
                  <Link to={"/jobs"} className="btn btn-primary mt-3">
                    Find a Job Now
                  </Link>
                )}
                {!this.props.isAuth && (
                  <button
                    onClick={() => {
                      this.setState({ ...this.state, formShown: "applicant" });
                      $("#registerModal").modal("show");
                    }}
                    className="btn btn-primary mt-3"
                  >
                    Find a Job Now
                  </button>
                )}
              </div>
              <div className="applicant-benefits__img col-lg-6">
                <img src="images/Group.svg" alt="" />
              </div>
            </div>
          </div>

          <div className="container">
            <div className="our-services row">
              <div className="our-services__text col-lg-4">
                <h1>Explore Our Services</h1>
                <p className="">
                  Seeking to simplify hiring process, linking candidates with
                  employers.
                </p>
                <button type="button" className="btn btn-primary">
                  Read More <i className="fas fa-chevron-circle-right"></i>
                </button>
              </div>
              <div className="d-flex flex-lg-row flex-column col-lg-8">
                <ServicesCard
                  header={this.state.servicesCardHeader[0]}
                  content={this.state.servicesCardContent[0]}
                  icon={this.state.servicesCardIcon[0]}
                />
                <ServicesCard
                  header={this.state.servicesCardHeader[1]}
                  content={this.state.servicesCardContent[1]}
                  icon={this.state.servicesCardIcon[1]}
                />
                <ServicesCard
                  header={this.state.servicesCardHeader[2]}
                  content={this.state.servicesCardContent[2]}
                  icon={this.state.servicesCardIcon[2]}
                />
              </div>
            </div>
          </div>

          <div className="companies-benefits">
            <img
              className="companies-benefits__img"
              src="images/dsds.svg"
              alt=""
            />
            <div className="companies-benefits__text ">
              <h1>Are you a recruiter or employer?</h1>
              <p className="">
                If you are currently hiring, and would like to advertise your
                jobs on WorkEgypt .net, please signup for an employer
                account and post your jobs right away.
              </p>
              {this.props.isAuth && this.props.user?.type === true && (
                <Link to={"/profile"} className="btn btn-primary mt-3">
                  Start Hiring Now
                </Link>
              )}
              {!this.props.isAuth && (
                <button
                  onClick={() => {
                    this.setState({ ...this.state, formShown: "company" });
                    $("#registerModal").modal("show");
                  }}
                  className="btn btn-primary mt-3"
                >
                  Start Hiring Now
                </button>
              )}
            </div>
          </div>
          <Footer
            isAuth={this.props.isAuth}
            userType={this.props.user?.type}
            setFormShown={this.setFormShown}
          />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  authErrors: state.auth.error,
  isAuth: state.auth.isAuth,
  isLogging: state.auth.isLogging,
  isRegistering: state.auth.isRegistering,
  userLoading: state.user.userDataLoading,
  user: state.user.userData,
});

export default connect(mapStateToProps, { login, logout, register })(Home);
