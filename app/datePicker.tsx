import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createPlanFromGeoJson } from "./services/createPlan.service";
import { gpxToGeoJsonString } from "./services/gpxToGeoJson.service";
import { LoadingSpinner } from "./spinner";
import { fetchPlans } from "./services/fetchPlans.service";

interface DatePickProps {
  getActivitiesFromDate: Function;
  userId: string;
  setCreatePlanOpen: Function;
  setPlans: Function;
}

export const DatePick = (props: DatePickProps) => {
  const [gpxData, setGpxData] = useState("");
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<Boolean>(false);

  const handleAddButtonClick = async () => {
    setLoading(true);
    try {
      const geoJsonString = await gpxToGeoJsonString(gpxData);
      if (typeof geoJsonString !== "string")
        throw new Error("translating gpx to geoJson has failed");
      await createPlanFromGeoJson(geoJsonString, String(props.userId));
      const userId = props.userId;
      const setPlans = props.setPlans;
      fetchPlans({ userId, setPlans });
      props.setCreatePlanOpen();
    } catch (e) {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div>
      Click the box to select an activity from your Strava{" "}
      <DatePicker onChange={(date) => props.getActivitiesFromDate(date)} />
      <div style={{ margin: "50px 0 0 0" }}>
        Or paste a GPX file here (time and altitude data required)
      </div>
      <div>
        <textarea
          value={gpxData}
          onChange={(e) => setGpxData(e.target.value)}
          style={{ color: "black" }}
        ></textarea>
      </div>
      {loading ? (
        <LoadingSpinner></LoadingSpinner>
      ) : (
        <button
          style={{
            margin: "5px 20px 5px 5px",
            border: "1px solid white",
            padding: "3px",
          }}
          onClick={handleAddButtonClick}
        >
          Add
        </button>
      )}
      <div style={{ display: error ? "flex" : "none" }}>
        There was an error processing this GPX file. Files must contain both
        elevation and timestamp information.{" "}
      </div>
    </div>
  );
};
