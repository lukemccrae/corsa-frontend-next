import { CreatePlanFromActivity } from "../types";
import { fetchPlans } from "./fetchPlans.service";

export const createPlanFromActivity = async (
  activityId: string,
  planName: string,
  token: string,
  userId: number,
  setCreatePlanOpen: Function,
  setPlans: Function
) => {
  const query = `
  mutation MyMutation {
    createPlanFromActivity(
        activityId: ${activityId},
        planName: "${planName}",
        token: "${token}",
        userId: "${userId}"
    ) {
      success
    }
  }
    `;

  console.log(query, "<< query");

  try {
    const response = await fetch(
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
    const result: CreatePlanFromActivity = await response.json();
    if (result.data) {
      if (result.data.createPlanFromActivity.success) {
        fetchPlans({ userId, setPlans });
        setCreatePlanOpen(false);
      }
    }
    console.log(result, "<< result");
  } catch (e) {
    console.log(e, "<< error");
  }
};
