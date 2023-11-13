import { useState } from "react";
import { deletePlanAndS3Data } from "./services/deletePlanAndS3Data.service";
import { Plan } from "./types";
import { styled } from "styled-components";

interface DeleteButtonProps {
  userId: number;
  bucketKey: string;
  plans: Plan[];
  setPlans: Function;
  setExpanded: Function;
}

const Button = styled.button`
  margin: 10px 30px 10px 5px;
  border: 1px solid white;
  padding: 3px;
`;

export const DeleteButton = (props: DeleteButtonProps) => {
  const [reallyDelete, setReallyDelete] = useState(false);
  const showRealDeleteButton = () => {
    setReallyDelete(true);
  };
  return reallyDelete ? (
    <div>
      Are you sure?{" "}
      <Button
        onClick={() =>
          deletePlanAndS3Data(
            props.bucketKey,
            props.userId,
            props.setExpanded,
            props.setPlans,
            props.plans
          )
        }
      >
        really delete
      </Button>
    </div>
  ) : (
    <Button onClick={() => showRealDeleteButton()}>Delete</Button>
  );
};
