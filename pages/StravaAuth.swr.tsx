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
          Origin: "https://58f8-70-59-19-22.ngrok-free.app",
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
  localStorage.setItem("access_token", data.access_token);
  console.log(data.access_token, "<< data.access_token");
};

export default StravaAuth;
