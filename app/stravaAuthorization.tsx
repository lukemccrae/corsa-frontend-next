"use client";
import { useEffect, useState } from "react";
import {
  UserResponse,
  stravaRegister,
  stravaUserDetails,
} from "./services/stravaAuth.service";
import { Profile } from "./profile";
import { User } from "./types";
const connectwithstrava = "/btn_strava_connectwith_light.png";

const redirectToStrava = () => {
  window.location.href =
    "https://www.strava.com/oauth/authorize?client_id=69281&redirect_uri=https://corsa-frontend-next.vercel.app/&response_type=code&scope=activity:read";
};

export const StravaAuthorization = () => {
  const [user, setUser] = useState<User>();
  // const [token, setToken] = useState<string>();
  useEffect(() => {
    // const storedToken = localStorage.getItem("access_token");
    // if (storedToken) setToken(storedToken as string);

    const localUser = localStorage.getItem("user");
    console.log(user, "<< user");
    if (localUser) {
      console.log(localUser, "<< localUser");
      // user is in local storage
      const parsedUser = JSON.parse(localUser);
      const getUserResource = async () => {
        const userResponse = (await stravaUserDetails(
          parsedUser.access_token,
          parsedUser.userId
        )) as unknown as UserResponse;
        console.log(userResponse, "<< userResponse");
        localStorage.setItem(JSON.stringify(userResponse), "user");
        setUser(userResponse);
      };
      getUserResource();
    } else {
      // user is not in local storage
      const getCodeFromURL = () => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get("code");
      };
      const code = getCodeFromURL();
      if (code) {
        // they clicked the button
        const getRegisterResource = async () => {
          const userResponse = (await stravaRegister(
            code
          )) as unknown as UserResponse;
          localStorage.setItem(JSON.stringify(userResponse), "user");
          setUser(userResponse);
        };
        getRegisterResource();
      } else {
        // they need to click the button
      }
    }

    // three cases
    // if (token && !user) {
    //   console.log(storedToken, "<< storedToken");
    //   // token, no user
    //   const decodedUser = jwtDecode(token as string) as User;

    //   // //if token is expired remove it
    //   if (Date.now() / 1000 > decodedUser.expires_at) {
    //     localStorage.removeItem("access_token");
    //     setToken("");
    //   }

    //   console.log(decodedUser, "<< decodedUser");
    //   setUser(decodedUser as User);
    //   // if (user) {
    //   // token, user
    //   // do nothing
    //   // }
    //   console.log(decodedUser, "<< decodedUser");
    // } else {
    //   // no token, no user
    //   const getCodeFromURL = () => {
    //     const urlParams = new URLSearchParams(window.location.search);
    //     return urlParams.get("code");
    //   };
    //   const code = getCodeFromURL();
    //   console.log(code, "<< code");
    //   if (code) {
    //     const getResource = async () => {
    //       const resource = (await stravaAuth(code)) as unknown as TokenResponse;
    //       console.log(resource, "<< resource");
    //       setToken(resource.access_token);
    //     };
    //     getResource();
    //   }
    //   // if (code) {
    //   //   console.log(code, "<< code");
    //   //   if (window && document) {
    //   //     window.history.replaceState({}, document.title, "/");

    //   //     console.log(resource, "resource");
    //   //     localStorage.setItem("acess_token", resource.access_token);
    //   //   }
    //   // }
    // }
  }, []);

  return (
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
  );
};

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
