import { useEffect, useState } from "react";

export const getServerSideProps = async (context: { query: { code: any } }) => {
  const code = context.query.code;
  console.log(code, "<< code");

  try {
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
    );
    const data = await result.text();
    console.log(data, "<< data");
    return {
      props: {
        code,
        data,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      error: String(e),
    };
  }
};

const HandleAuth = ({ code, data }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
    console.log(data, "<< data");
  }, [data]);
  return (
    <div>
      <div>{isLoading}</div>
      {JSON.stringify(data)}
      {code}
    </div>
  );
};

export default HandleAuth;
