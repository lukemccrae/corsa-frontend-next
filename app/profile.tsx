import jwt_decode from "jwt-decode";
import { TokenResponse } from "./types";
import React from "react";
import StatusBar from "./statusBar";
import Routes from "./routes";

export const Profile = (props: { user: string | null }) => {
  if (props.user) {
    const decoded: TokenResponse = jwt_decode(props.user);
    // return <div>{JSON.stringify(decoded, null, 2)}</div>;
    return (
      <div>
        <StatusBar
          picture={decoded.athlete.profile}
          first={decoded.athlete.firstname}
          last={decoded.athlete.lastname}
        ></StatusBar>
        <Routes token={decoded.access_token} user={decoded.athlete.id}></Routes>
      </div>
    );
  }
};
