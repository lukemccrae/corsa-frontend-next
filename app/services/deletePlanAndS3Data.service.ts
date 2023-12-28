import { Plan } from "../types";
import { fetchPlans } from "./fetchPlans.service";

export const deletePlanAndS3Data = async (
  bucketKey: string,
  userId: number,
  setExpanded: Function,
  setPlans: Function,
  plans: Plan[]
) => {
  const query = `
    mutation MyMutation {
      deletePlanById(bucketKey: "${bucketKey}", userId: ${userId}) {
        success
      }
    }
  `;

  console.log(query, "<< query");

  try {
    const request = await fetch(
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
    const result: { data: { deletePlanById: { success: boolean } } } =
      await request.json();
    if (result.data.deletePlanById.success) {
      const updatedPlans = [...plans].filter((plan) => plan.id !== bucketKey);

      console.log(updatedPlans, "<< updatedPlans");

      setPlans(updatedPlans);
      setExpanded(false);
    } else {
    }
  } catch (e) {
    console.log(e, "<< error");
  }
};
