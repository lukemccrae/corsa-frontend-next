export const getServerSideProps = async (code: string) => {
  const result = await fetch(
    "https://hju6ibc7fk.execute-api.us-east-1.amazonaws.com/prod/corsa-auth",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service: "strava",
        authCode: code,
      }),
      redirect: "follow",
    }
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
  console.log(result, "<< result");
};

export const Profile = (props) => {};
