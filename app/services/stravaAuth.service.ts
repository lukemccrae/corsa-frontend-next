export type TokenResponse = {
  access_token: string;
};

export const stravaAuth = async (code: string) => {
  const result = await fetch(
    "https://hju6ibc7fk.execute-api.us-east-1.amazonaws.com/prod/corsa-auth",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "https://corsa-run.web.app",
      },
      body: JSON.stringify({
        service: "strava",
        authCode: code,
      }),
    }
  );

  const authResponse: TokenResponse = await result.json();
  return authResponse;
};

// if (access_token) {
//   user = decodeToken(access_token as string);
//   // TODO: refresh token not working, so im removing token and forcing reauth
// }

// const access_token = localStorage.getItem("access_token");
