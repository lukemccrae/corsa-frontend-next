import {
  Item,
  ListBox,
  PlanContentItem,
  PlanContentList,
  Detail,
  PlanContainer,
  PlanContentItemNoBorder,
} from "./planView";

import { fetchActivities } from "./services/fetchActivities.service";
import { createPlanFromActivity } from "./services/createPlan.service";
import { AddButton } from "./addButton";

import { useEffect, useState } from "react";
import { Activity } from "./types";
import { DatePick } from "./datePicker";

interface CreatePlanProps {
  user: number;
  token: string;
  setCreatePlanOpen: Function;
  setPlans: Function;
}

export const CreatePlan = (props: CreatePlanProps) => {
  const [planCreateFailed, setPlanCreateFailed] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);

  var currentDate = new Date();

  // Calculate the date 5 days ago
  var fiveDaysAgo = new Date(currentDate);
  fiveDaysAgo.setDate(currentDate.getDate() - 5);

  const createPlan = (
    act: Activity,
    setPlanCreating: Function,
    setPlanCreateFailed: Function
  ) => {
    createPlanFromActivity(
      act.id,
      act.name,
      props.token,
      props.user,
      props.setCreatePlanOpen,
      props.setPlans,
      setPlanCreating,
      setPlanCreateFailed
    );
  };

  const getActivitiesFromDate = async (date: Date) => {
    const oneDay = new Date(date);
    oneDay.setDate(date.getDate() + 1);

    await fetchActivities(
      date.getTime() / 1000,
      oneDay.getTime() / 1000,
      30,
      1,
      props.token,
      props.user,
      setActivities
    );
  };

  return (
    <div>
      {planCreateFailed ? (
        <div>Adding this plan failed, try again</div>
      ) : (
        <div></div>
      )}
      <DatePick
        getActivitiesFromDate={getActivitiesFromDate}
        userId={props.user}
      ></DatePick>

      {activities.map((act) => {
        return (
          <PlanContainer key={act.id}>
            <AddButton
              setPlanCreateFailed={setPlanCreateFailed}
              activity={act}
              createPlan={createPlan}
            ></AddButton>
            <ListBox>
              <PlanContentList>
                <PlanContentItem>
                  <Item>
                    <span>Name</span>
                    <Detail>
                      {act.name.length > 30
                        ? act.name.slice(0, 30) + "..."
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
