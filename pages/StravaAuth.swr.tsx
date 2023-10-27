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
          Origin:
            "https://0500-2001-1388-49ea-8ea6-7954-f709-5d9d-782.ngrok-free.app",
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
  return <div>hello {JSON.stringify(data)}</div>;
};

export default StravaAuth;
