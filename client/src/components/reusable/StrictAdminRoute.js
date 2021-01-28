import React from "react";
import { Route, Redirect } from "react-router-dom";
const StrictAdminRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        !!localStorage.getItem("admToken") ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              location: "/",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default StrictAdminRoute;
