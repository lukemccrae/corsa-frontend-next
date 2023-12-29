import { FeatureCollection, GraphQLFeatureCollection } from "../types";
import { Alert } from "../alert";

interface FetchMileProfileProps {
  user: string;
  setProfile: Function;
  planIndex: number;
}

export const fetchMileProfile = async (
  props: FetchMileProfileProps
): Promise<void> => {
  const query = `
            query MyQuery {
            getPlansByUserId(userId: "${props.user}") {
                mileData {
                mileVertProfile
                }
            }
            }
    `;

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

    const mileProfile = await result.json();
    props.setProfile(
      mileProfile.data.getPlansByUserId[props.planIndex].mileData
    );
  } catch (e) {
    console.log(e, "<< error");
  }
};
