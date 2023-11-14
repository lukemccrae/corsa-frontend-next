import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createPlanFromGeoJson } from "./services/createPlan.service";
import { gpxToGeoJson } from "./services/gpxToGeoJson.service";

interface DatePickProps {
  getActivitiesFromDate: Function;
}

export const DatePick = (props: DatePickProps) => {
  const [gpxData, setGpxData] = useState("");

  const handleAddButtonClick = async () => {
    const geoJson = await gpxToGeoJson(gpxData);
    // await createPlanFromGeoJson(geoJson);
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
    </div>
  );
};
