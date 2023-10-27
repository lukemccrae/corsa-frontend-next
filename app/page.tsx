"use client";
import { StravaAuth } from "../pages/StravaAuth.swr";
import { Profile } from "./profile";
import { TokenResponse } from "./types";
import jwtDecode from "jwt-decode";

const StravaAuthorization = () => {
  const redirectToStrava = () => {
    // Define the Strava authorization URL
    const stravaAuthorizeUrl =
      "https://www.strava.com/oauth/authorize?client_id=69281&redirect_uri=https://0500-2001-1388-49ea-8ea6-7954-f709-5d9d-782.ngrok-free.app&response_type=code&scope=activity:read";

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

  const user = access_token ? decodeToken(access_token) : null;

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
          <button onClick={redirectToStrava}>auth with Strava</button>
        )}
      </div>
    </div>
  );
};

export default StravaAuthorization;
