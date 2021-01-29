import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
const StrictCompanyRoute = ({ component: Component, ...rest }) => {
  const type = useSelector((state) => state.user?.userData?.type);

  return (
    <Route
      {...rest}
      render={(props) =>
        !!localStorage.getItem("token") && type === true ? (
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

export default StrictCompanyRoute;
