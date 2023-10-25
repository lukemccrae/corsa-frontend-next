import { useEffect, useState } from "react";
import useSWR from "swr";

export const StravaAuth = (props: { code: any }) => {
  const { code } = props;

  const { data, error, isLoading } = useSWR("Profile", async () => {
    const result = await fetch(
      "https://hju6ibc7fk.execute-api.us-east-1.amazonaws.com/prod/corsa-auth",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Origin: "https://8882-190-129-180-114.ngrok-free.app",
        },
        body: JSON.stringify({
          service: "strava",
          authCode: code,
        }),
      }
    );
    return await result.json();
  });

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return <div>hello {JSON.stringify(data)}</div>;
};

export default StravaAuth;
