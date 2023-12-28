import React, { useState } from "react";
import styled from "styled-components";
import { Plan } from "./types";
import { PlanView } from "./planView";
import { CreatePlan } from "./CreatePlan";

const PageContainer = styled.div`
  @media (min-width: 1047px) {
    background-color: grey;
    margin: 20px 20vw; /* Adjust margin as needed */
    padding: 20px;
  }

  /* Media query for screens between 769px and 1024px */
  @media (min-width: 631px) and (max-width: 1046px) {
    background-color: grey;
    padding: 20px;
  }

  /* Media query for screens between 769px and 1024px */
  @media (max-width: 630px) {
    background-color: grey;
    font-size: 0.8em;
  }
`;

const Heading = styled.h1`
  font-size: 24px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  margin-right: 20px;
  padding: 0 0 0 20px;
`;

const ListContainer = styled.div`
  /* Add any additional styles you need */
`;

interface PlanProps {
  user: number;
  adjustPace: Function;
  plans: Plan[];
  token: string;
  setPlans: Function;
}

function UserPlans(props: PlanProps) {
  const [expandedItem, setExpandedItem] = useState("");
  const [createPlanOpen, setCreatePlanOpen] = useState(false);

  const toggleAddPlan = () => {
    setCreatePlanOpen(!createPlanOpen);
  };

  return (
    <PageContainer>
      <ListContainer>
        <Heading style={{ color: "black" }}>
          <h1>{createPlanOpen ? "My Activities" : "My Plans"}</h1>
          <h1>
            <button onClick={() => toggleAddPlan()}>＋</button>
          </h1>
        </Heading>
        {createPlanOpen ? (
          <CreatePlan
            token={props.token}
            user={props.user}
            setCreatePlanOpen={setCreatePlanOpen}
            setPlans={props.setPlans}
          ></CreatePlan>
        ) : (
          <div>
            {props.plans.map((plan: Plan, i) => {
              return (
                <div key={i}>
                  <PlanView
                    plans={props.plans}
                    expandedItem={expandedItem}
                    setExpandedItem={setExpandedItem}
                    key={plan.id}
                    plan={plan}
                    adjustPace={props.adjustPace}
                    id={plan.id}
                    user={props.user}
                    planIndex={i}
                    setPlans={props.setPlans}
                  ></PlanView>
                </div>
              );
            })}
          </div>
        )}
      </ListContainer>
    </PageContainer>
  );
}

export default UserPlans;
