import React from "react";
import AnalysisDataCard from "./AnalysisDataCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { adminGetAnalysis } from "../../../redux/actions";
import DotsLoader from "../../reusable/loaders/DotsGroup";
export default function GeneralAnalysis() {
  // state
  const [loading, setLoading] = useState(true);
  // selectors
  const analysis = useSelector((state) => state.admin.analysis);
  const loaders = useSelector((state) => state.admin.loaders);
  const dispatch = useDispatch();
  useEffect(() => {
    if (analysis == null) dispatch(adminGetAnalysis());
  }, [dispatch, analysis]);

  useEffect(() => {
    if (loading && loaders.getAnalysis === false) setLoading(false);
  }, [loaders.getAnalysis]);

  return (
    <div className="avoid-navbar general-analysis">
      {loading ? (
        <div
          className="d-flex justify-content-center flex-column algin-items-center"
          style={{ height: "90vh" }}
        >
          <DotsLoader isCentered />
        </div>
      ) : (
        <>
          <section>
            <h6 className="text-secondary title">main analysis</h6>
            <div className="row">
              <AnalysisDataCard
                info={analysis?.companies}
                title="companies"
                src="/images/company.svg"
              />
              <AnalysisDataCard
                info={analysis?.applicants}
                title="applicants"
                src="/images/employee_1.svg"
              />
              <AnalysisDataCard
                info={analysis?.jobs?.total}
                title="jobs"
                src={"/images/jobs.png"}
              />
              <AnalysisDataCard
                info={analysis?.jobs?.applicantsNo}
                title="applied"
                src={"/images/applied.png"}
              />
            </div>
          </section>
          <section>
            <h6 className="text-secondary title">jobs analysis</h6>
            <div className="row">
              <AnalysisDataCard
                info={analysis?.jobs?.accepted}
                title="accepted"
                src={"/images/accepted.png"}
              />
              <AnalysisDataCard
                info={analysis?.jobs?.rejected}
                title="rejected"
                src={"/images/rejected (4).svg"}
              />
            </div>
            <div className="row">
              <AnalysisDataCard
                info={analysis?.jobs?.shortlisted}
                title="shortlisted"
                src={"/images/shortlisted.png"}
              />
              <AnalysisDataCard
                info={analysis?.jobs?.oncontact}
                title="on contact"
                src={"/images/oncontact.png"}
              />
            </div>
          </section>

          <section>
            <h6 className="text-secondary title">Blog</h6>
            <div className="row">
              <AnalysisDataCard
                info={analysis?.posts}
                title="posts"
                src={"/images/blog.png"}
              />
            </div>
          </section>

          <section>
            <h6 className="text-secondary title">Events</h6>
            <div className="row">
              <AnalysisDataCard
                DataCard
                info={analysis?.events}
                title="active events"
                src={"/images/event-active.png"}
              />
              {/* <AnalysisDataCard
                info="100"
                title="closed"
                src={"/images/event-close.png"}
              /> */}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
