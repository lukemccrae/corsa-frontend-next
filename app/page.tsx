"use client";
import { StravaAuth } from "../pages/StravaAuth.swr";
import { Profile } from "./profile";

const StravaAuthorization = () => {
  const redirectToStrava = () => {
    // Define the Strava authorization URL
    const stravaAuthorizeUrl =
      "https://www.strava.com/oauth/authorize?client_id=69281&redirect_uri=https://8882-190-129-180-114.ngrok-free.app&response_type=code&scope=activity:read";

    // Perform the redirect
    window.location.href = stravaAuthorizeUrl;

    // Alternatively, you can use history.push() to navigate within your app:
    // history.push(stravaAuthorizeUrl);
  };

  return (
    <div>
      {new URLSearchParams(window.location.href).get("code") ? (
        <StravaAuth
          code={new URLSearchParams(window.location.href).get("code")}
        ></StravaAuth>
      ) : null}
      <div>
        {localStorage.getItem("access_token") ? (
          <Profile user={localStorage.getItem("access_token")}></Profile>
        ) : (
          <button onClick={redirectToStrava}>auth with Strava</button>
        )}
      </div>
    </div>
  );
};

export default StravaAuthorization;
