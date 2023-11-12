"use client";
import { useEffect } from "react";
import { StravaAuth } from "../pages/StravaAuth.swr";
import { Profile } from "./profile";
import { TokenResponse } from "./types";
import jwtDecode from "jwt-decode";
const connectwithstrava = "/btn_strava_connectwith_light.png";

const StravaAuthorization = () => {
  const redirectToStrava = () => {
    console.log("hello3");
    // Define the Strava authorization URL
    const stravaAuthorizeUrl =
      "https://www.strava.com/oauth/authorize?client_id=69281&redirect_uri=https://58f8-70-59-19-22.ngrok-free.app&response_type=code&scope=activity:read";

    // Perform the redirect
    window.location.href = stravaAuthorizeUrl;

    // Alternatively, you can use history.push() to navigate within your app:
    // history.push(stravaAuthorizeUrl);
  };

  const decodeToken = (token: string) => {
    const decoded = jwtDecode(token);
    if (decoded) return decoded as unknown as TokenResponse; // Seem to need the cast here since TS doesn't know what im getting back
    throw new Error("Invalid token");
  };

  const access_token = localStorage.getItem("access_token");

  let user;

  if (access_token) {
    console.log("toknennnn");
    user = decodeToken(access_token as string);
    // TODO: refresh token not working, so im removing token and forcing reauth
    if (Date.now() / 1000 > user.expires_at)
      localStorage.removeItem("access_token");
  }

  return (
    <div>
      {new URLSearchParams(window.location.href).get("code") ? (
        <StravaAuth
          code={new URLSearchParams(window.location.href).get("code")}
        ></StravaAuth>
      ) : null}
      <div>
        {user ? (
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
    </div>
  );
};

export default StravaAuthorization;
