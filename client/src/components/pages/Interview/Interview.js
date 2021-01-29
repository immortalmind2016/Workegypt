import React, { Component } from "react";
import io from "socket.io-client";
import SimplePeer from "simple-peer";
import { socket } from "../../../index";
import $ from "jquery";
import { connect } from "react-redux";
import queryString from "query-string";
import { withRouter } from "react-router-dom";
class Interview extends Component {
  state = {
    client: {},
    companyId: this.props.match.params.company,
    applicantId: this.props.match.params.applicant,
    streamMode: false,
    mode: "Connecting",
    loader: true,
    user: this.props.user.userData,
    stream: "",
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.loading && this.props.applicantsLoading === false) {
      this.setState({ ...this.state, loading: false });
    }
    if (this.props.user != prevProps.user) {
      console.log("UPDATREEEDD");
      this.setState({ ...this.state, user: this.props.user });
    }
  }
  startStreaming(stream) {
    const video = document.getElementById("my-video");
    video.srcObject = stream;
    video.play();

    //user see himself
    let user = this.props.user.userData;

    //get video Stream
    if (user.type) {
      //  socket.emit("CreatePeer",{userId:user._id,applicantId:this.state.applicantId})
    }
  }
  CreateVideo = ({ stream, companyId, applicantId }) => {
    console.log("STREAM MODE ", this.state.streamMode);
    if (!this.state.streamMode) {
      console.log("VIDDDEO ", stream);
      let video = document.createElement("video");
      video.id = "peerVideo";
      video.srcObject = stream;
      video.class = "video";
      document
        .querySelector("#interview__another-person-video")
        .appendChild(video);
      video.play();

      this.setState({ streamMode: true });
    }
  };
  InitPeer = type => {
    let peer = new SimplePeer({
      initiator: type == "init" ? true : false,
      stream: this.state.stream,
      trickle: false,
    });

    //get stream from other user
    peer.on("stream", stream => {
      console.log("STREAMING");
      this.setState({ loader: false });
      this.CreateVideo({
        stream,
        companyId: this.state.companyId,
        applicantId: this.state.applicantId,
      });
    });
    peer.on("close", function () {
      console.log("CLOSED");
      document.getElementById("peerVideo").remove();
      peer.destroy();
    });

    return peer;
  };
  //for peer of type init
  MakePeer = applicantId => {
    console.log("MAKE PEER", this.state.user);

    this.setState({ client: { ...this.state.client, gotAnswer: false } });
    let peer = this.InitPeer("init");

    peer.on("signal", data => {
      if (!this.state.client.gotAnswer) {
        console.log("SEND OFFER ", this.state);
        socket.emit("Offer", {
          offer: data,
          userId: this.state.companyId,
          applicantId: this.state.applicantId,
        });
      }
    });

    this.setState({ client: { ...this.state.client, peer: peer } });
  };
  //used when get an offer from client
  //for peer type not init
  FrontAnswer = ({ offer, userid, applicantId }) => {
    console.log("RECIEVE OFFER", offer);
    let peer = this.InitPeer("notInit");
    peer.on("signal", data => {
      console.log("FRONT ANSWER", this.state);
      socket.emit("Answer", {
        answer: data,
        userId: this.state.companyId,
        applicantId: this.state.applicantId,
      });
    });
    peer.signal(offer);
  };

  SignalAnswer = ({ answer, companyId, applicantId }) => {
    this.state.client.gotAnswer = true;
    let peer = this.state.client.peer;
    console.log("Signal ANSWER", peer);
    peer.signal(answer);
  };

  SessionActive = ({ steam, companyId, applicantId }) => {
    if (
      this.state.companyId == companyId &&
      this.state.applicantId == applicantId
    ) {
      document.write("Session Active. please come back later");
    }
  };

  componentDidMount() {
    //console.log("MOUNT ",this.props)
    if (localStorage.getItem("#$import") != "#$im") {
      window.top.close();

      window.location = "/jobs";

      this.setState({ ring: false });
    } else {
      localStorage.removeItem("#$import");
    }
    socket.on("CreatePeer", this.MakePeer);
    socket.on("BackOffer", this.FrontAnswer);

    socket.on("BackAnswer", this.SignalAnswer);
    socket.on("SessionActive", this.SessionActive);

    let user = this.props.user.userData;
    let profile = this.props.profile;
    socket.on("rejected", ({ companyId }) => {
      // $("#ring").pause()
      localStorage.removeItem("#$import", "#$im");

      this.setState({ mode: "Busy" });
    });
    socket.on("accepted", ({ companyId }) => {
      // $("#ring").pause()
      localStorage.removeItem("#$import", "#$im");

      socket.emit("CreatePeer", {
        userId: user._id,
        applicantId: this.state.applicantId,
      });
      this.setState({ mode: "Starting video call" });
    });
    const values = queryString.parse(this.props.location.search);
    if (values.type) {
      this.setState({ mode: "Starting video call" });
    }

    if (!values.type)
      socket.on("UserConnected", applicantId => {
        console.log("USSSSSSSSSSSSSSSSSSSSSSSER connected");

        socket.emit("CallUser", {
          applicantId,
          companyName: user.name,
          companyId: user._id,
          companyImg: profile.image,
        });
        this.setState({ mode: "Ring" });
      });

    const video = document.getElementById("my-video");
    let companyId = this.state.companyId;
    let applicantId = this.state.applicantId;
    socket.emit("CheckOnline", { applicantId, companyId });

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true }) // get browser perm
      .then(stream => {
        this.setState({ stream });
        this.startStreaming(stream);

        console.log(stream);
        const values = queryString.parse(this.props.location.search);
        if (values.type) {
          socket.emit("accept", { companyId: this.state.companyId });

          console.log("MOUNTTTTTTTTTTTTTTTT ", values);
        }
      })
      .catch(e => {
        console.log("EERRRRORR ", e);
      });
  }

  cancel = () => {
    window.top.close();
    socket.emit("cancel", { applicantId: this.state.applicantId });
  };

  render() {
    return (
      <section className="interview">
        {this.state.mode == "Ring" && (
          <audio id="ring" autoPlay loop>
            <source
              src="/audio/sms-alert-3-daniel_simon.mp3"
              type="audio/mpeg"
            />
          </audio>
        )}

        <div className="container">
          {this.state.loader && (
            <div style={{ zIndex: 9999 }} className="interview-overlay">
              {this.state.mode == "Busy" ? (
                <React.Fragment>
                  <p>Busy</p>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <img className="" src="/images/Eclipse-loader.gif"></img>
                  <p>{this.state.mode}...</p>
                  {this.state.user.type && (
                    <button onClick={this.cancel} className="btn btn-danger">
                      cancel
                    </button>
                  )}
                </React.Fragment>
              )}
            </div>
          )}
          <div className="row">
            <div className="col-md-3 col-sm-12">
              <div className="interview__my-video bounded-video">
                <video className="video" id="my-video" muted></video>
              </div>
            </div>
            <div className="col-md-9 col-sm-12">
              <div
                id="interview__another-person-video"
                className="interview__another-person-video bounded-video"
              ></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state, props) => ({
  isAuth: state.auth.isAuth,
  auth: state.auth,
  user: state.user,
  profile: state.profile.profileData,
});

export default connect(mapStateToProps, undefined)(withRouter(Interview));
