import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
const StrictApplicantRoute = ({ component: Component, ...rest }) => {
  const type = useSelector(state => state.user.userData.type);

  return (
    <Route
      {...rest}
      render={props =>
        !!localStorage.getItem("token") && type === false ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              location: "/",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default StrictApplicantRoute;
