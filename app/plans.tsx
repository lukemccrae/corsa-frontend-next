import React, { useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import { Plan, PlanProps } from "./types";
import { PlanView } from "./planView";

const PageContainer = styled.div`
  background-color: grey;
  margin: 70px 120px; /* Adjust margin as needed */
  padding: 20px;
`;

const Heading = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const ListContainer = styled.div`
  /* Add any additional styles you need */
`;

function ExpandedPlan(plan: Plan | undefined) {
  if (!plan) {
    return null;
  }
  return <h1>{plan.name}</h1>;
}

function UserPlans(props: PlanProps) {
  const [expandedItem, setExpandedItem] = useState("");
  return (
    <PageContainer>
      <ListContainer>
        <Heading style={{ color: "black" }}>My Plans</Heading>
        {props.plans.data.getPlansByUserId.map((plan: Plan) => {
          return (
            <div>
              <PlanView
                expandedItem={expandedItem}
                setExpandedItem={setExpandedItem}
                key={plan.id}
                plan={plan}
                id={plan.id}
              ></PlanView>
            </div>
          );
        })}
      </ListContainer>
    </PageContainer>
  );
}

export default UserPlans;
