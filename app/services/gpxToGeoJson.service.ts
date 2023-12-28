export const gpxToGeoJsonString = async (gpx: string) => {
  try {
    const result = await fetch(
      "https://dr4vf0yztc.execute-api.us-east-1.amazonaws.com/prod/gpx-geojson",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/xml",
        },
        body: gpx,
      }
    );
    const geoJson = await result.json();

    // escape doible quotes to pass as string
    return JSON.stringify(geoJson).replace(/"/g, '\\"');
  } catch (e) {
    console.log(e, "<< error");
  }
};
