import React from "react";
import WebsiteAnalysis from "../components/pages/analysis/WebsiteAnalysis";
import GeneralAnalysis from "../components/pages/analysis/GeneralAnalysis";
import EventsAnalysis from "../components/pages/analysis/EventsAnalysis";
import PaymentsAnalysis from "../components/pages/analysis/PaymentsAnalysis";
import AdminNotifications from "../components/pages/analysis/AdminNotifications";
import AdminSettings from "../components/pages/analysis/AdminSettings";
import StrictAdminRoute from "../components/reusable/StrictAdminRoute";
function AnalysisRoutes() {
  return (
    <>
      <StrictAdminRoute
        path={"/analysis/website"}
        component={WebsiteAnalysis}
      />
      <StrictAdminRoute
        path={"/analysis/general"}
        component={GeneralAnalysis}
      />
      {/* <StrictAdminRoute path={"/analysis/events"} component={EventsAnalysis} /> */}
      <StrictAdminRoute
        path={"/analysis/payment/:pageNumber"}
        component={PaymentsAnalysis}
      />
      <StrictAdminRoute
        path={"/analysis/notification"}
        component={AdminNotifications}
      />
      <StrictAdminRoute path={"/analysis/settings"} component={AdminSettings} />
    </>
  );
}

export default AnalysisRoutes;
