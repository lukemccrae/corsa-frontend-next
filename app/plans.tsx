import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Activity, Plan } from "./types";
import {
  Item,
  ListBox,
  PlanContentItem,
  PlanContentList,
  PlanView,
  Detail,
  PlanContainer,
  PlanContentItemNoBorder,
} from "./planView";
import { fetchActivities } from "./services/fetchActivities.service";
import { createPlanFromActivity } from "./services/createPlan.service";

const PageContainer = styled.div`
  background-color: grey;
  margin: 20px 20vw; /* Adjust margin as needed */
  padding: 20px;
`;

const Heading = styled.h1`
  font-size: 24px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  margin-right: 20px;
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

interface CreatePlanProps {
  user: number;
  token: string;
  setActivities: Function;
  activities: Activity[];
  setCreatePlanOpen: Function;
  setPlans: Function;
}

const CreatePlan = (props: CreatePlanProps) => {
  var currentDate = new Date();

  // Calculate the date 5 days ago
  var fiveDaysAgo = new Date(currentDate);
  fiveDaysAgo.setDate(currentDate.getDate() - 5);

  const createPlan = (act: Activity) => {
    createPlanFromActivity(
      act.id,
      act.name,
      props.token,
      props.user,
      props.setCreatePlanOpen,
      props.setPlans
    );
  };

  useEffect(() => {
    if (props.activities.length === 0) {
      fetchActivities(
        Math.round(fiveDaysAgo.getTime() / 1000),
        Math.round(new Date().getTime() / 1000),
        30,
        1,
        props.token,
        props.user,
        props.setActivities
      );
    }
  }, [props.user]);

  return (
    <div>
      {props.activities.map((act) => {
        return (
          <PlanContainer key={act.id}>
            <button
              onClick={() => createPlan(act)}
              style={{
                margin: "10px 30px 10px 5px",
                border: "1px solid white",
                padding: "3px",
              }}
            >
              Add
            </button>
            <ListBox>
              <PlanContentList>
                <PlanContentItem>
                  <Item>
                    <span>Name</span>
                    <Detail>
                      {act.name.length > 40
                        ? act.name.slice(0, 40) + "..."
                        : act.name}
                    </Detail>
                  </Item>
                </PlanContentItem>
                <PlanContentItem>
                  <Item>
                    <span>Distance</span>
                    <Detail>
                      {
                        // weird math for rounding to two decimal
                        (
                          Math.round((act.distance * 100) / 1609.34) / 100
                        ).toFixed(2)
                      }
                    </Detail>
                  </Item>
                </PlanContentItem>
                <PlanContentItemNoBorder>
                  <Item>
                    <span>Date</span>
                    <Detail>
                      {new Date(act.start_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </Detail>
                  </Item>
                </PlanContentItemNoBorder>
              </PlanContentList>
            </ListBox>
          </PlanContainer>
        );
      })}
    </div>
  );
};

function UserPlans(props: PlanProps) {
  const [expandedItem, setExpandedItem] = useState("");
  const [createPlanOpen, setCreatePlanOpen] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);

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
            activities={activities}
            setActivities={setActivities}
            token={props.token}
            user={props.user}
            setCreatePlanOpen={setCreatePlanOpen}
            setPlans={props.setPlans}
          ></CreatePlan>
        ) : (
          <div>
            {props.plans.map((plan: Plan, i) => {
              return (
                <div>
                  <PlanView
                    expandedItem={expandedItem}
                    setExpandedItem={setExpandedItem}
                    key={plan.id}
                    plan={plan}
                    adjustPace={props.adjustPace}
                    id={plan.id}
                    user={props.user}
                    planIndex={i}
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
