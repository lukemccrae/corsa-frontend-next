import { FeatureCollection } from "../types";

interface FetchGeoJsonProps {
  planId: string;
  setGeoJson: Function;
}

export const fetchGeoJson = async (props: FetchGeoJsonProps): Promise<void> => {
  const query = `
          query MyQuery {
              getGeoJsonBySortKey(sortKey: "${props.planId}") {
              features {
                  geometry {
                  coordinates
                  properties {
                      id
                      name
                  }
                  type
                  }
                  type
              }
              type
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

    const geoJson: FeatureCollection = await result.json();
    console.log(geoJson, "<< geoJson");
    props.setGeoJson(geoJson);
  } catch (e) {
    console.log(e, "<< error");
  }
};
