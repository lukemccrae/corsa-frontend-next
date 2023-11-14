import { CreatePlanFromActivity, CreatePlanFromGpx } from "../types";
import { fetchPlans } from "./fetchPlans.service";

export const createPlanFromGeoJson = async (geoJsonData: string) => {
  const query = `
      mutation MyMutation {
        createPlanFromGpx(gpx: "${geoJsonData}") {
          success
        }
      }
    `;

  try {
    const response = await fetch(
      "http://localhost:8008/graphql",
      // "https://pannrqk3p5hdhkg2ys3k4jevdu.appsync-api.us-east-1.amazonaws.com/graphql",
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
    const result: CreatePlanFromGpx = await response.json();
    if (result.data) {
      if (result.data.createPlanFromGpx.success) {
        console.log("yayayaya");
      }
    }
    console.log(result, "<< result");
  } catch (e) {
    console.log(e, "<< error");
  }

  console.log(query, "<< query");
};

export const createPlanFromActivity = async (
  activityId: string,
  planName: string,
  token: string,
  userId: number,
  setCreatePlanOpen: Function,
  setPlans: Function,
  setPlanCreating: Function,
  setPlanCreateFailed: Function
) => {
  setPlanCreating(true);
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
      } else {
        setPlanCreateFailed(true);
      }
      setPlanCreating(false);
    }
    console.log(result, "<< result");
  } catch (e) {
    console.log(e, "<< error");
  }
};
