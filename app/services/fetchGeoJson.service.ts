import { FeatureCollection, GraphQLFeatureCollection } from "../types";
import { Alert } from "../alert";

interface FetchGeoJsonProps {
  planId: string;
  setGeoJson: Function;
  setAlert: Function;
  setLastMileLength: Function;
}

export const fetchGeoJson = async (props: FetchGeoJsonProps): Promise<void> => {
  const query = `
                  query MyQuery {
                    getGeoJsonBySortKey(sortKey: "${props.planId}") {
                      features {
                        properties {
                          mileData {
                            index
                          }
                          lastMileDistance
                        }
                        geometry {
                          coordinates
                        }
                      }
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

    const geoJson: GraphQLFeatureCollection = await result.json();
    console.log(geoJson, "<< geoJson");

    if (
      geoJson.data.getGeoJsonBySortKey.features[0].geometry.coordinates.length >
      0
    ) {
      props.setGeoJson(geoJson);
      props.setLastMileLength(
        geoJson.data.getGeoJsonBySortKey.features[0].properties.lastMileDistance
      );
    } else {
      console.log(geoJson, "<< geoJson.data.getGeoJsonBySortKey.features[0]");
      throw new Error(
        "There was something wrong with the retrieval of the associated GPX file."
      );
    }
  } catch (e) {
    console.log(e, "<< error");
    props.setAlert("The associated GPX file is invalid");
  }
};
