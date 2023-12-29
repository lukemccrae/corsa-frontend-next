export type registerResponse = {
  userId: string;
};

export type UserResponse = {
  userId: string;
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

  const registerResponse: registerResponse = await result.json();
  return registerResponse;
};

export const stravaUserDetails = async (userId: string) => {
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
        userId,
      }),
    }
  );
  const userResponse: UserResponse = await result.json();
  return userResponse;
};
