import React, { useEffect, useState } from "react";

import LineChart from "../../reusable/charts/LineChart";
import AnalysisDataCard from "./AnalysisDataCard";
import { useSelector, useDispatch } from "react-redux";
import { adminGetWebsiteAnalysis } from "../../../redux/actions";
import DotsLoader from "../../reusable/loaders/DotsGroup";
import { setMaintenanceMode } from "../../../services/admin";
function WebsiteAnalysis() {
  const [websiteMode, setWebsiteMode] = useState("off");
  const [modeProcessing, setModeProcessing] = useState(false);
  const toggleWebsiteMode = async () => {
    const mode = websiteMode === "on" ? "off" : "on";
    setModeProcessing(true);
    try {
      await setMaintenanceMode(mode);
      setModeProcessing(false);
      setWebsiteMode(mode);
    } catch (error) {
      setModeProcessing(null);
    }
  };

  // state
  const [loading, setLoading] = useState(true);
  // selectors
  const analysis = useSelector((state) => state.admin.websiteAnalysis);
  const loaders = useSelector((state) => state.admin.loaders);
  const dispatch = useDispatch();
  let usersPerMonth = Array(12).fill(0);
  if (analysis) {
    analysis.per_month.forEach((item) => {
      usersPerMonth[item._id - 1] = item.count;
    });
  }

  useEffect(() => {
    if (analysis === null) dispatch(adminGetWebsiteAnalysis());
  }, [dispatch, analysis]);

  useEffect(() => {
    if (loading && loaders.getWebsiteAnalysis === false) setLoading(false);
  }, [loaders.getWebsiteAnalysis]);

  return (
    <div className="avoid-navbar website-analysis pt-5">
      {loading ? (
        <div
          className="d-flex justify-content-center flex-column algin-items-center"
          style={{ height: "90vh" }}
        >
          <DotsLoader isCentered />
        </div>
      ) : (
        <>
          <div className="row">
            <AnalysisDataCard
              info={analysis?.views}
              title="views"
              src={"/images/views.png"}
            />
            <AnalysisDataCard
              info={analysis?.total}
              title="users"
              src={"/images/users.png"}
            />
            <div className="main-card-layout website-mode-card">
              <span>
                Maintenance Mode:
                <span className="font-weight-bold">{websiteMode}</span>
              </span>
              {modeProcessing === null && (
                <span className="text-danger">Failed!</span>
              )}
              {modeProcessing ? (
                <span className="spinner spinner-border" />
              ) : (
                <div
                  className="toggle-website-mode"
                  onClick={toggleWebsiteMode}
                >
                  <span className={`circle ${websiteMode}`} />
                </div>
              )}
            </div>
          </div>
          <div className="row mt-5">
            <LineChart values={usersPerMonth} />
          </div>
        </>
      )}
    </div>
  );
}

export default WebsiteAnalysis;
