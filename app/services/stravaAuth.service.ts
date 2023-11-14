export const stravaAuth = async (setUser: Function) => {
  // grab search params from URL
  const code = new URLSearchParams(window.location.href).get("code");

  // store code value
  console.log(code, "<< code");

  const result = await fetch(
    "https://hju6ibc7fk.execute-api.us-east-1.amazonaws.com/prod/corsa-auth",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: "https://58f8-70-59-19-22.ngrok-free.app",
      },
      body: JSON.stringify({
        service: "strava",
        authCode: code,
      }),
    }
  );

  const authResponse = await result.json();
  console.log(authResponse, "<< authResponse");
  setUser(authResponse);
  localStorage.setItem("access_token", authResponse);
};

// if (access_token) {
//   user = decodeToken(access_token as string);
//   // TODO: refresh token not working, so im removing token and forcing reauth
// }

// const decodeToken = (token: string) => {
//   const decoded = jwtDecode(token);
//   if (decoded) return decoded as unknown as TokenResponse; // Seem to need the cast here since TS doesn't know what im getting back
//   throw new Error("Invalid token");
// };

// const access_token = localStorage.getItem("access_token");
