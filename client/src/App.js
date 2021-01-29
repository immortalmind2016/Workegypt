import $ from "jquery";
import React, { Component } from "react";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { NavbarAdmin, NavbarGuest, NavbarUser } from "./components/reusable";
import Loader1 from "./components/reusable/loaders/Loader_1";
import { socket } from "./index";
import { fetchProfile, fetchUserData, logout } from "./redux/actions";
import { MainPagesRoutes } from "./routes";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appIsLoading: props.profile === null ? true : false,
      companyId: "",
      companyName: "",
      companyImg: "",
      userData: {},
      ring: false,
    };
  }

  componentDidMount() {
    if (this.props.isAuth) {
      this.props.fetchUserData();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.user.userData !== this.props.user.userData &&
      this.props.user.userData
    ) {
      this.setState({ userData: this.props.user.userData });

      socket.emit("NewClient", {
        userid: this.props.user.userData._id,
        type: this.props.user.userData.type,
      });
    }
    if (
      this.state.appIsLoading &&
      this.props.profileIsLoading === false &&
      this.props.userIsLoading === false
    ) {
      this.setState({ ...this.state, appIsLoading: false });
    }
    if (
      prevProps.auth.isLogging === true &&
      this.props.auth.isLogging === false &&
      !this.props.auth.error.login_err
    ) {
      if (localStorage.regData) {
        localStorage.removeItem("regData");
      }
      window.location.pathname = "/profile";
      if (localStorage.forgotPassword) {
        window.location.pathname = "/settings";
      }
    }
  }

  render() {
    const { isAuth, user, profile: prof, loginName } = this.props;
    const { userData = undefined } = user;

    const job_title = prof && prof.job_title;
    const image = prof && prof.image;
    const type = userData && userData.type;

    return (
      <div className="App">
        {this.state.ring && (
          <audio id="ring" autoPlay loop>
            <source src="/audio/incoming-call.mp3" type="audio/mpeg" />
          </audio>
        )}
        {(this.state.appIsLoading && isAuth) ||
        this.props.isLoggingOut === true ? (
          <Loader1 />
        ) : (
          <Router>
            <>
              {isAuth ? (
                <React.Fragment>
                  <div className="popup-call">
                    <div
                      className="modal fade"
                      id="incoming-call"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalLabel"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog" role="document">
                        <div className="modal-content">
                          <div className="modal-body text-center">
                            <img
                              className="incoming-call__img"
                              src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg"
                            ></img>
                            {this.state.companyName} calling you
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-danger"
                              onClick={this.reject}
                              data-dismiss="modal"
                            >
                              reject
                            </button>
                            <button
                              type="button"
                              className="btn btn-success"
                              onClick={this.accept}
                              data-dismiss="modal"
                            >
                              response
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <NavbarUser
                    name={(userData && userData.name) || loginName || undefined}
                    profession={job_title || "Job"}
                    img={image || "https://placehold.it/50/ddd"}
                    type={type}
                    _logout={(history) => this.props.logout(history)}
                  />
                </React.Fragment>
              ) : (
                <>
                  {!localStorage.admToken ? <NavbarGuest /> : <NavbarAdmin />}
                </>
              )}

              <div className="main-content">
                <MainPagesRoutes />
              </div>
            </>
          </Router>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  isAuth: state.auth.isAuth,
  auth: state.auth,
  isLoggingOut: state.auth.isLoggingOut,
  loginName: state.auth.name,
  user: state.user,
  profile: state.profile.profileData,
  profileIsLoading: state.profile.loaders.profileFetching,
  userIsLoading: state.user.userDataLoading,
  admLoaders: state.admin.loaders,
});

export default connect(mapStateToProps, {
  logout,
  fetchUserData,
  fetchProfile,
})(App);
