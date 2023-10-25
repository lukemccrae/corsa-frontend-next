"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import HandleAuth from "../pages/auth";
import { BrowserRouter as Router, useFetcher } from "react-router-dom";

const StravaAuthorization = () => {
  const redirectToStrava = () => {
    // Define the Strava authorization URL
    const stravaAuthorizeUrl =
      "https://www.strava.com/oauth/authorize?client_id=69281&redirect_uri=https://5af1-190-129-181-170.ngrok-free.app&response_type=code&scope=activity:read";

    // Perform the redirect
    window.location.href = stravaAuthorizeUrl;

    // Alternatively, you can use history.push() to navigate within your app:
    // history.push(stravaAuthorizeUrl);
  };

  return (
    <div>
      <button onClick={redirectToStrava}>auth with Strava</button>
      {new URLSearchParams(window.location.href).get("code") ? (
        <HandleAuth
          data={[]}
          code={new URLSearchParams(window.location.href).get("code")}
        ></HandleAuth>
      ) : null}
    </div>
  );
};

export default StravaAuthorization;
