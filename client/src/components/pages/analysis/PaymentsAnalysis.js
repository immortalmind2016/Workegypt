import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaymentAnalysisCard from "./paymentAnalysisCard";
import { getCompanies } from "../../../redux/actions";
import DotsLoader from "../../reusable/loaders/DotsGroup";
import { useState } from "react";
import Pagination from "react-paginate";
import { Redirect, useHistory, useLocation, useParams } from "react-router-dom";
import qs from "query-string";
import CompanyFiltersForm from "./CompanyFiltersForm";
import { useCallback } from "react";
function PaymentsAnalysis() {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const params = useParams();
  const admin = useSelector((state) => state.admin);
  const companies = admin?.companies;
  const loaders = admin?.loaders;
  const [loading, setLoading] = useState(true);

  const [currentPaginationIndex, setCurrentPaginationIndex] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [searchPlan, setSearchPlan] = useState("");
  const [searchBy, setSearchBy] = useState("name");

  // handlers
  const onSearch = (e) => {
    e.preventDefault();
    setCurrentPaginationIndex(1);
    history.push({
      pathname: `/analysis/payment/1`,
      search: `?searchBy=${searchBy}&searchText=${searchText}&searchPlan=${searchPlan}`,
    });
  };
  const resetUrl = useCallback(() => {
    setCurrentPaginationIndex(1);
    setSearchBy("name");
    setSearchPlan("");
    setSearchText("");
    history.push("/analysis/payment/1");
  }, []);

  // effects

  // loading effects
  useEffect(() => {
    if (loading && loaders.fetchCompanies === false) setLoading(false);
    if (loading && loaders.fetchCompanies === undefined) setLoading(undefined);
  }, [loaders.fetchCompanies]);

  // pagination change handler
  const onPageChangeHandler = ({ selected }) => {
    if (selected !== currentPaginationIndex - 1) {
      setCurrentPaginationIndex(selected + 1);

      const currentQs = qs.parse(location.search);
      const { searchBy = "name", searchText = "", searchPlan = "" } = currentQs;
      const search = `?searchBy=${searchBy}&searchText=${searchText}&searchPlan=${searchPlan}`;
      history.push({
        pathname: `/analysis/payment/${selected + 1}`,
        search,
      });
    }
  };

  // url change handler
  useEffect(() => {
    const text = searchBy === "plan" ? searchPlan : searchText;
    dispatch(getCompanies(currentPaginationIndex - 1, searchBy, text));
    setLoading(true);
    const queries = qs.parse(location.search);
    setSearchBy(queries.searchBy || "name");
    setSearchText(queries.searchText || "");
    setSearchPlan(queries.searchPlan || "");
  }, [location.search, params?.pageNumber]);

  if (params.pageNumber === "0") return <Redirect to="/analysis/payment/1" />;
  return (
    <div className="avoid-navbar">
      {loading === true && (
        <div
          className="d-flex justify-content-center flex-column algin-items-center"
          style={{ height: "90vh" }}
        >
          <DotsLoader isCentered />
        </div>
      )}
      {loading === false && (
        <>
          <CompanyFiltersForm
            onSearch={onSearch}
            resetUrl={resetUrl}
            setSearchText={setSearchText}
            setSearchPlan={setSearchPlan}
            setSearchBy={setSearchBy}
            searchBy={searchBy}
            searchText={searchText}
            searchPlan={searchPlan}
          />
          <div className="row">
            {companies?.profiles.map((company) => (
              <div
                className="col-xl-3 col-lg-4 col-md-6 col-12 mb-3"
                key={company._id}
              >
                <PaymentAnalysisCard
                  imgSrc={company?.image ? company.image : undefined}
                  companyName={company?.user?.name}
                  paymentPlan={
                    company?.subscribe?.type ? company?.subscribe?.type : "none"
                  }
                  companyProfileId={company._id}
                  companyUserId={company.user._id}
                />
              </div>
            ))}
          </div>
          <div className="row ">
            <div className="col-12">
              <div className="flex-centered">
                <Pagination
                  previousLabel={"previous"}
                  nextLabel={"next"}
                  breakLabel={"..."}
                  breakClassName={"pagination_link_box"}
                  pageCount={Math.ceil(companies.totalResults / companies.size)}
                  pageClassName="pagination_pages"
                  containerClassName="pagination_container"
                  pageLinkClassName="pageLinkClass"
                  activeLinkClassName="pagination_active_link"
                  nextClassName="pagination_next"
                  previousClassName="pagination_prev"
                  nextLinkClassName={"prev_next_link"}
                  previousLinkClassName={"prev_next_link"}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  onPageChange={onPageChangeHandler}
                  activeClassName={""}
                  initialPage={currentPaginationIndex - 1}
                />
              </div>
            </div>
          </div>
        </>
      )}
      {typeof loading === "undefined" && (
        <div
          className="d-flex justify-content-center flex-column algin-items-center"
          style={{ height: "90vh" }}
        >
          <h3 className="alert alert-danger text-center">
            Oops, something went wrong!
          </h3>
        </div>
      )}
    </div>
  );
}

export default PaymentsAnalysis;
