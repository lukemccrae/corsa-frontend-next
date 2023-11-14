"use client";
import { useEffect, useState } from "react";
import { stravaAuth } from "./services/stravaAuth.service";
import { Profile } from "./profile";
import { TokenResponse } from "./types";
import jwtDecode from "jwt-decode";
const connectwithstrava = "/btn_strava_connectwith_light.png";

const StravaAuthorization = () => {
  const [user, setUser] = useState<TokenResponse>();

  const redirectToStrava = async () => {
    console.log("happening1");
    // Define the Strava authorization URL
    const stravaAuthorizeUrl =
      "https://www.strava.com/oauth/authorize?client_id=69281&redirect_uri=https://corsa-run.web.app/&response_type=code&scope=activity:read";

    // Perform the redirect
    window.location.href = stravaAuthorizeUrl;
    console.log("happening2");
    await stravaAuth(setUser);
    console.log("happening3");
  };

  if (user && Date.now() / 1000 > user.expires_at)
    localStorage.removeItem("access_token");

  return (
    <div>
      {user && user.athlete ? (
        <Profile user={user}></Profile>
      ) : (
        <button
          style={{
            backgroundImage: `url(${connectwithstrava})`,
            backgroundSize: "cover",
            width: "200px",
            height: "50px",
          }}
          onClick={redirectToStrava}
        ></button>
      )}
    </div>
  );
};

export default StravaAuthorization;
