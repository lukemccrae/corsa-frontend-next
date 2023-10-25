import jwt_decode from "jwt-decode";
import { TokenResponse } from "./types";
import React from "react";

export const Profile = (props: { user: string | null }) => {
  if (props.user) {
    const decoded: TokenResponse = jwt_decode(props.user);
    // return <div>{JSON.stringify(decoded, null, 2)}</div>;
    return (
      <div className="profile-banner">
        <img
          src={decoded.athlete.profile}
          alt={`${decoded.athlete.firstname} ${decoded.athlete.lastname}'s profile`}
        />
        <div className="profile-info">
          <h1>
            {decoded.athlete.firstname} {decoded.athlete.lastname}
          </h1>
          <p>Additional user information can go here</p>
        </div>
      </div>
    );
  }
};
