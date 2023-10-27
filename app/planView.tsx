import { MileData, Plan } from "./types";

import React, { useState } from "react";
import styled from "styled-components";

interface PlanViewProps {
  plan: Plan;
  key: string;
  setExpandedItem: Function;
  expandedItem: string;
  id: string;
}

const PlanContainer = styled.div`
  display: flex;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
`;

const Avatar = styled.div`
  width: 60px;
  height: 60px;
`;

const AvatarBox = styled.div`
  width: 60px;
  height: 60px;
  background-color: #007bff;
`;

const PlanContent = styled.div`
  margin-left: 10px;
`;

const PlanTitle = styled.h3`
  font-size: 16px;
  margin: 0;
`;

const ExpandButton = styled.button`
  cursor: pointer;
  top: 0; /* Stick to the top */
  right: 0; /* Stick to the right */
`;

const ButtonParent = styled.div`
  position: relative; /* position this element relative to its parent */
  margin: 0 0 0 auto; /* auto left margin pushes element to the right */
`;

const PlanGain = styled.div``;
const PlanLoss = styled.div``;

export const PlanView = (props: PlanViewProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = (id: string) => {
    setExpanded(!expanded);
    if (props.expandedItem) {
      props.setExpandedItem("");
    } else {
      props.setExpandedItem(id);
    }
  };

  const evaluateExpandedItem = () => {
    if (props.expandedItem !== "") {
      if (props.expandedItem === props.id) return "flex";
      return "none";
    } else {
      return "flex";
    }
  };
  return (
    <PlanContainer style={{ display: evaluateExpandedItem() }}>
      <Avatar>
        <AvatarBox />
      </Avatar>
      <PlanContent>
        <PlanTitle>{props.plan.name}</PlanTitle>
        <PlanGain>
          Total gain:{" "}
          {props.plan.mileData.reduce((accumulator, currentObject) => {
            return accumulator + currentObject.elevationGain;
          }, 0)}
          ft.
        </PlanGain>
        <PlanLoss>
          Total gain:{" "}
          {props.plan.mileData.reduce((accumulator, currentObject) => {
            return accumulator + currentObject.elevationLoss;
          }, 0)}{" "}
          ft.
        </PlanLoss>
      </PlanContent>
      <ButtonParent>
        <ExpandButton onClick={() => toggleExpand(props.id)}>
          {expanded ? "▼" : "▲"}
        </ExpandButton>
      </ButtonParent>
    </PlanContainer>
  );
};
