"use client";
import { useEffect, useState } from "react";
import {
  UserResponse,
  stravaRegister,
  stravaUserDetails,
} from "./services/stravaAuth.service";
import { Profile } from "./profile";
import { User } from "./types";
import { LoadingSpinner } from "./spinner";
const connectwithstrava = "/btn_strava_connectwith_light.png";

const redirectToStrava = () => {
  window.location.href =
    "https://www.strava.com/oauth/authorize?client_id=69281&redirect_uri=https://corsa-frontend-next.vercel.app/&response_type=code&scope=activity:read";
};

export const StravaAuthorization = () => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      const getUserResource = async () => {
        const userResponse = (await stravaUserDetails(
          localUser
        )) as unknown as UserResponse;
        setUser(userResponse);
      };
      getUserResource();
    }

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
        ("https://corsa-frontend-next.vercel.app/");
        localStorage.setItem("user", JSON.stringify(userResponse));
        setUser(userResponse);
      };
      getRegisterResource();
    } else {
      // they need to click the button
    }
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
