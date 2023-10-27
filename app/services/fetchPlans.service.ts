import { GetPlansByUserId } from "../types";

interface FetchPlanProps {
  user: number;
  setPlans: Function;
}

export const fetchPlans = async (props: FetchPlanProps) => {
  // const { data, error, isLoading } = useSWR("Plan", async () => {
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
          "x-api-key": `${process.env.NEXT_PUBLIC_X_API_KEY}`,
          // Authorization: `Bearer ${JSON.stringify(token)}`,
        },
        body: JSON.stringify({ query }),
      }
    );
    const plans: GetPlansByUserId = await result.json();
    console.log(plans, "<< plans");
    props.setPlans(plans);
  } catch (e) {
    console.log(e, "<< error");
  }
};
