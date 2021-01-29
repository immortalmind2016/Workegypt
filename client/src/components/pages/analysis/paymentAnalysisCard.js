import React, { useRef, useState } from "react";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { changeCompanyPlan } from "../../../redux/actions";
import ReactConfirmAlert from "../../reusable/ReactConfirmAlert";
const planToColor = {
  gold: "#B5A900",
  silver: "#949494",
  plat: "#31B4C9",
  none: "#FF6600",
};
export default ({
  imgSrc = "http://placehold.it/100/ddd",
  companyName = "company name",
  paymentPlan = "none",
  companyProfileId,
  companyUserId,
}) => {
  const dispatch = useDispatch();
  const loaders = useSelector((state) => state.admin.loaders);
  const [loading, setLoading] = useState(false);
  // effects
  const [currentPayPlan, setPayPlan] = useState("none");
  const prevPlan = useRef();
  useEffect(() => {
    setPayPlan(paymentPlan);
  }, []);

  const handlePlanSelect = (plan) => {
    if (paymentPlan !== plan) {
      ReactConfirmAlert({
        title: "Change Company Plan!",
        message: "Are you sure you want to subscribe to this plan?",
        onYes: () => {
          dispatch(changeCompanyPlan(plan, companyProfileId));
          setLoading(true);
          prevPlan.current = currentPayPlan;
          setPayPlan(plan);
        },
      });
    }
  };

  useEffect(() => {
    if (loading && loaders.subscribingToPlan === false) setLoading(false);
    if (loading && loaders.subscribingToPlan === undefined) {
      setPayPlan(prevPlan.current);
      setLoading(undefined);
    }
  }, [loaders.subscribingToPlan]);

  return (
    <div
      className="payment-analysis-card main-card-layout px-0"
      style={{
        border: "none",
        boxShadow: "0 0 .2rem rgba(0,0,0,0.3)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {loading && (
        <div className="full-loader white">
          <span className="spinner-border text-primary"></span>
        </div>
      )}
      {loading === undefined && (
        <div
          class="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          please try again!
          <button
            type="button"
            class="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
      <div
        className="responsive_img_container"
        style={{ width: 50, height: 50, borderRadius: "50%" }}
      >
        <img src={imgSrc} alt="company image" style={{ border: "50%" }} />
      </div>
      <p className="my-3">{companyName}</p>
      <div
        className="plan-rectangle w-100 flex-centered py-2"
        style={{ backgroundColor: planToColor[currentPayPlan] }}
      >
        <p style={{ color: "#FFF" }}>
          current plan {currentPayPlan === "plat" ? "platinum" : currentPayPlan}
        </p>
      </div>

      <p style={{ fontWeight: "bold", fontSize: 14 }} className="my-3">
        change plan
      </p>
      <button
        className="input--blank d-flex justify-content-between align-items-center px-5 w-100"
        style={{ background: "transparent" }}
        onClick={() => handlePlanSelect("plat")}
      >
        <span style={{ color: planToColor["plat"] }}>platinum</span>
        <div
          style={{
            width: 15,
            height: 15,
            borderRadius: "50%",
            border: "1px solid #DDD",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {currentPayPlan === "plat" && (
            <i
              className="fas fa-check"
              style={{ fontSize: 10, color: "#333" }}
            />
          )}
        </div>
      </button>
      <button
        className="input--blank d-flex justify-content-between align-items-center px-5 w-100"
        style={{ background: "transparent" }}
        onClick={() => handlePlanSelect("gold")}
      >
        <span style={{ color: planToColor["gold"] }}>gold</span>
        <div
          style={{
            width: 15,
            height: 15,
            borderRadius: "50%",
            border: "1px solid #DDD",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {currentPayPlan === "gold" && (
            <i
              className="fas fa-check"
              style={{ fontSize: 10, color: "#333" }}
            />
          )}
        </div>
      </button>
      <button
        className="input--blank d-flex justify-content-between align-items-center px-5 w-100"
        style={{ background: "transparent" }}
        onClick={() => handlePlanSelect("silver")}
      >
        <span style={{ color: planToColor["silver"] }}>silver</span>
        <div
          style={{
            width: 15,
            height: 15,
            borderRadius: "50%",
            border: "1px solid #DDD",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {currentPayPlan === "silver" && (
            <i
              className="fas fa-check"
              style={{ fontSize: 10, color: "#333" }}
            />
          )}
        </div>
      </button>

      <button
        className="input--blank d-flex justify-content-between align-items-center px-5 w-100"
        style={{ background: "transparent" }}
        onClick={() => handlePlanSelect("none")}
      >
        <span style={{ color: planToColor["none"] }}>none</span>
        <div
          style={{
            width: 15,
            height: 15,
            borderRadius: "50%",
            border: "1px solid #DDD",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {currentPayPlan === "none" && (
            <i
              className="fas fa-check"
              style={{ fontSize: 10, color: "#333" }}
            />
          )}
        </div>
      </button>

      <NavLink
        className="btn btn-outline-secondary mt-5"
        style={{ borderRadius: 20 }}
        to={`/profile/${companyProfileId}/${companyUserId}`}
      >
        Show Company Profile
      </NavLink>
    </div>
  );
};
