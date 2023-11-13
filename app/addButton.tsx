import { useState } from "react";
import { Activity } from "./types";
import { LoadingSpinner } from "./spinner";

interface AddButtonProps {
  createPlan: Function;
  activity: Activity;
  setPlanCreateFailed: Function;
}

export const AddButton = (props: AddButtonProps) => {
  const [planCreating, setPlanCreating] = useState(false);
  return planCreating ? (
    <LoadingSpinner></LoadingSpinner>
  ) : (
    <button
      onClick={() =>
        props.createPlan(
          props.activity,
          setPlanCreating,
          props.setPlanCreateFailed
        )
      }
      style={{
        margin: "5px 20px 5px 5px",
        border: "1px solid white",
        padding: "3px",
      }}
    >
      Add
    </button>
  );
};
