import React from "react";
import styled from "styled-components";
import useSWR from "swr";

interface RouteProps {
  token: string;
  user: number;
}

const PageContainer = styled.div`
  background-color: grey;
  margin: 70px 120px; /* Adjust margin as needed */
  padding: 20px;
`;

const Heading = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const ListContainer = styled.div`
  /* Add any additional styles you need */
`;

const mockroutes = [{ name: "name1" }, { name: "name2" }, { name: "name3" }];

const FetchRoutes = (props: RouteProps) => {
  const { data, error, isLoading } = useSWR("Routes", async () => {
    console.log(process.env.X_API_KEY, props, "stuff");
    const query = `
      query MyQuery {
        getPlansByUserId(userId: ${String(props.user)}) {
          id
          mileData {
            elevationGain
            elevationLoss
            pace
          }
          name
          startTime
          userId
        }
      }
    `;
    try {
      const result = await fetch(
        "https://pannrqk3p5hdhkg2ys3k4jevdu.appsync-api.us-east-1.amazonaws.com/graphql",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": `${process.env.X_API_KEY}`,
            // Authorization: `Bearer ${JSON.stringify(token)}`,
          },
          body: JSON.stringify({ query }),
        }
      );
      return await result.json();
    } catch (e) {
      console.log(e, "<< error");
    }
  });
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return <div>{JSON.stringify(data)}</div>;
};

function UserRoutes(props: RouteProps) {
  const { token, user } = props;

  return (
    <PageContainer>
      <ListContainer>
        <Heading style={{ color: "black" }}>My Routes</Heading>
        {mockroutes.map((r) => {
          return (
            <div key={r.name} style={{ color: "black" }}>
              {r.name}
            </div>
          );
        })}
        <FetchRoutes user={user} token={token}></FetchRoutes>
      </ListContainer>
    </PageContainer>
  );
}

export default UserRoutes;
