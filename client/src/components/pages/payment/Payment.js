import React, { Component } from "react";
import PlanCard from "./PlanCard";
class Payment extends Component {
  state = {
    header: ["450", "750", "800"],
    bg: ["gold", "light-blue", "gray"],
  };
  render() {
    return (
      <div className="payment">
        <div className="container">
          <div className="row">
            <div className="col-lg-7">
              <div className="payment-settings">
                <h2>Payment Settings</h2>
                <input
                  className="general-input"
                  type="text"
                  placeholder="First name.."
                />
                <input
                  className="general-input"
                  type="text"
                  placeholder="Last name..."
                />
                <input
                  className="general-input"
                  type="text"
                  placeholder="Apartment number..."
                />
                <input
                  className="general-input"
                  type="text"
                  placeholder="Building..."
                />
                <input
                  className="general-input"
                  type="text"
                  placeholder="Floor number..."
                />
                <input
                  className="general-input"
                  type="text"
                  placeholder="Phone number..."
                />
                <input
                  className="general-input"
                  type="text"
                  placeholder="Street..."
                />
                <input
                  className="general-input"
                  type="text"
                  placeholder="Postal card..."
                />
                <input
                  className="general-input"
                  type="text"
                  placeholder="city..."
                />
                <input
                  className="general-input"
                  type="text"
                  placeholder="country..."
                />

                <button className="green-btn">Save</button>
              </div>
              <div className="account-settings">
                <h2>Account Settings</h2>
                <input
                  className="general-input"
                  type="email"
                  placeholder="email.."
                />
                <input
                  className="general-input"
                  type="password"
                  placeholder="password..."
                />
                <input
                  className="general-input"
                  type="password"
                  placeholder="confirm password..."
                />

                <button className="green-btn d-block">Update</button>
              </div>
            </div>
            <div className="col-lg-5 pr-0">
              <h2> Supported Planes</h2>
              <PlanCard
                header={this.state.header[0]}
                bgColor={this.state.bg[0]}
              />
              <PlanCard
                header={this.state.header[1]}
                bgColor={this.state.bg[1]}
              />
              <PlanCard
                header={this.state.header[2]}
                bgColor={this.state.bg[2]}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Payment;
