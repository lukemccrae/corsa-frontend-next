import { FetchActivities } from "../types";

export const fetchActivities = async (
  dateFrom: number,
  dateTo: number,
  limit: number,
  offset: number,
  token: string,
  userId: number,
  setActivities: Function
) => {
  const query = `
    query MyQuery {
        getActivities(
            dateFrom: ${dateFrom},
            dateTo: ${dateTo},
            limit: ${limit},
            offset: ${offset},
            token: "${token}",
            userId: "${userId}") {
                distance
                id
                start_date
                name
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
          "x-api-key": `${process.env.NEXT_PUBLIC_X_API_KEY}`,
          // Authorization: `Bearer ${JSON.stringify(token)}`,
        },
        body: JSON.stringify({ query }),
      }
    );
    const activities: FetchActivities = await result.json();
    setActivities(activities.data.getActivities);
  } catch (e) {
    console.log(e, "<< error");
  }
};
