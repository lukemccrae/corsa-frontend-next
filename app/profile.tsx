import jwt_decode from "jwt-decode";
import { TokenResponse } from "./types";
import React, { useEffect, useState } from "react";
import StatusBar from "./statusBar";
import Plans from "./plans";
import { fetchPlans } from "./services/fetchPlans.service";

export const Profile = (props: { user: TokenResponse }) => {
  const [plans, setPlans] = useState();

  useEffect(() => {
    const user = props.user.athlete.id;
    fetchPlans({ user, setPlans });
  }, [props.user.athlete.id]);

  return (
    <div>
      <StatusBar
        picture={props.user.athlete.profile}
        first={props.user.athlete.firstname}
        last={props.user.athlete.lastname}
      ></StatusBar>
      {plans ? (
        <Plans
          plans={plans}
          setPlans={setPlans}
          user={props.user.athlete.id}
        ></Plans>
      ) : (
        <div></div>
      )}
    </div>
  );
};
