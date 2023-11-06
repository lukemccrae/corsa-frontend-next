import { Plan, UpdatePlanById } from "../types";

export const updatePlan = async (plan: Plan) => {
  const query = `
    mutation MyMutation {
        updatePlanById(planInput: {
            paces: [${plan.mileData.map((md) => md.pace)}], 
            planName: "${plan.name}", 
            sortKey: "${plan.id}", 
            startTime: ${plan.startTime}, 
            userId: "${plan.userId}"
        }) {
          success
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
    const success: UpdatePlanById = await result.json();
    if (!success.data.updatePlanById.success) throw new Error("update failed");
  } catch (e) {
    console.log(e, "<< error");
  }
};
