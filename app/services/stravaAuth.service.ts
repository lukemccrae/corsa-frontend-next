export type TokenResponse = {
  access_token: string;
};

export type UserResponse = {
  access_token: string;
  userId: number;
  expires_at: number;
  profile: string;
};

export const stravaRegister = async (code: string) => {
  const result = await fetch(
    "https://jfrptflgek.execute-api.us-east-1.amazonaws.com/prod/corsa-auth",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "https://corsa-run.web.app",
      },
      body: JSON.stringify({
        service: "strava-register",
        authCode: code,
      }),
    }
  );

  const authResponse: TokenResponse = await result.json();
  return authResponse;
};

export const stravaUserDetails = async (
  access_token: string,
  userId: number
) => {
  const result = await fetch(
    "https://jfrptflgek.execute-api.us-east-1.amazonaws.com/prod/corsa-auth",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "https://corsa-run.web.app",
      },
      body: JSON.stringify({
        service: "strava-user-details",
        access_token,
        userId,
      }),
    }
  );
  const userResponse: UserResponse = await result.json();
  return userResponse;
};

// if (access_token) {
//   user = decodeToken(access_token as string);
//   // TODO: refresh token not working, so im removing token and forcing reauth
// }

// const access_token = localStorage.getItem("access_token");
