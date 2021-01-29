import React from "react";
import AnalysisRoutes from "../../../routes/AnalysisRoutes";
import AnalysisSidebar from "./AnalysisSidebar";
function AdminAnalysis() {
  return (
    <div className="admin-analysis">
      <AnalysisSidebar />
      <main className="content  avoid-sidebar--left">
        <div className="container avoid-sidebar--left">
          <AnalysisRoutes />
          {window.location.pathname === "/analysis" && (
            <div
              className="d-flex flex-column algin-items-center justify-content-center"
              style={{ height: "100vh" }}
            >
              <h1
                className="display-3 text-center"
                style={{ maxWidth: 500, margin: "auto" }}
              >
                Welcome to <span className="text-primary">WorkEgypt</span> Admin
                Dashboard
              </h1>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminAnalysis;
