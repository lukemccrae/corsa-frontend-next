export const gpxToGeoJson = async (gpx: string) => {
  try {
    const result = await fetch(
      "https://xnu0gs14wl.execute-api.us-east-1.amazonaws.com/prod/gpx-geojson",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/xml",
        },
        body: gpx,
      }
    );
    return await result.json();
  } catch (e) {
    console.log(e, "<< error");
  }
};
