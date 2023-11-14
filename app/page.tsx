"use client";
import { useEffect, useState } from "react";
import { TokenResponse, stravaAuth } from "./services/stravaAuth.service";
import { Profile } from "./profile";
import { User } from "./types";
import jwtDecode from "jwt-decode";
import { useLocation } from "react-router-dom";
const connectwithstrava = "/btn_strava_connectwith_light.png";

const redirectToStrava = () => {
  window.location.href =
    "https://www.strava.com/oauth/authorize?client_id=69281&redirect_uri=https://corsa-run.web.app/&response_type=code&scope=activity:read";
};

const StravaAuthorization = () => {
  const location = useLocation();

  return (
    <div>
      {/* {user && user.athlete ? (
        <Profile user={user}></Profile>
      ) : ( */}
      <button
        style={{
          backgroundImage: `url(${connectwithstrava})`,
          backgroundSize: "cover",
          width: "200px",
          height: "50px",
        }}
        onClick={redirectToStrava}
      ></button>
      {/* // )} */}
    </div>
  );
};

export default StravaAuthorization;

// const redirectToStrava = async () => {
//   // Define the Strava authorization URL
//   const stravaAuthorizeUrl =
//     "https://www.strava.com/oauth/authorize?client_id=69281&redirect_uri=https://corsa-run.web.app/&response_type=code&scope=activity:read";

//   // Perform the redirect
//   if (typeof window !== "undefined")
//     window.location.href = stravaAuthorizeUrl;
// };

// // grab search params from URL
// let code;
// let user;
// if (typeof window !== "undefined")
//   code = new URLSearchParams(window.location.href).get("code");
// if (code && !localStorage.getItem("access_token")) {
//   const authResponse = stravaAuth(code) as unknown as TokenResponse; //double cast because its not
//   localStorage.setItem("access_token", authResponse.access_token);
// }

// if (typeof localStorage !== "undefined") {
//   //if token exists but user not set, set user (close tab and reopen case)
//   if (localStorage.getItem("access_token")) {
//     user = jwtDecode(
//       localStorage.getItem("access_token") as string
//     ) as unknown as User;
//   }
// }

// console.log(user, "<< user");

// //if token is expired remove it
// if (user && Date.now() / 1000 > user.expires_at)
//   localStorage.removeItem("access_token");
