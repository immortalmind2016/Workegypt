import React from "react";
import { NavLink } from "react-router-dom";

function AnalysisSidebar() {
  return (
    <nav className="sidebar analysis-sidebar">
      <ul className="list-unstyled">
        <NavLink activeClassName="active" to="/analysis/website">
          <li>
            <i className="fas fa-globe"></i>
            Website
          </li>
        </NavLink>
        <NavLink activeClassName="active" to="/analysis/general">
          <li>
            <i className="fas fa-chart-line"></i>
            Analysis
          </li>
        </NavLink>
        {/* <NavLink activeClassName="active" to="/analysis/events">
          <li>
            <i className="fas fa-calendar-alt"></i>
            Events
          </li>
        </NavLink> */}
        <NavLink activeClassName="active" to="/analysis/payment/1">
          <li>
            <i className="fas fa-money-check-alt"></i>
            Payment
          </li>
        </NavLink>
        <NavLink activeClassName="active" to="/analysis/notification">
          <li>
            <i className="fas fa-bell"></i>
            Notifications
          </li>
        </NavLink>
        <NavLink activeClassName="active" to="/analysis/settings">
          <li>
            <i className="fas fa-cog"></i>
            settings
          </li>
        </NavLink>
      </ul>
    </nav>
  );
}

export default AnalysisSidebar;
