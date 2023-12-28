import { GetPlansByUserId } from "../types";

interface FetchPlanProps {
  userId: number;
  setPlans: Function;
}

export const fetchPlans = async (props: FetchPlanProps) => {
  const query = `
        query MyQuery {
          getPlansByUserId(userId: ${String(props.userId)}) {
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
  console.log(query, "<< query");
  try {
    const result = await fetch(
      "https://trbethutebbqlkwv7nogfcdaka.appsync-api.us-east-1.amazonaws.com/graphql",
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
    const plans: GetPlansByUserId = await result.json();
    console.log(plans, "<< plans");
    props.setPlans(plans.data.getPlansByUserId);
  } catch (e) {
    console.log(e, "<< error");
  }
};
