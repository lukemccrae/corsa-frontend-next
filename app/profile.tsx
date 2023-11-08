import { Plan, TokenResponse } from "./types";
import React, { useEffect, useState } from "react";
import StatusBar from "./statusBar";
import Plans from "./plans";
import { fetchPlans } from "./services/fetchPlans.service";
import { updatePlan } from "./services/updatePlan";

export const Profile = (props: { user: TokenResponse }) => {
  const [plans, setPlans] = useState<Plan[]>([]);

  const adjustPace = (id: string, amount: number, i: number) => {
    const plansToEdit = [...plans];
    const index = plansToEdit.findIndex((obj) => obj.id === id);

    plansToEdit[index].mileData[i].pace += amount;
    updatePlan(plansToEdit[index]);
    setPlans(plansToEdit);
  };

  useEffect(() => {
    const userId = props.user.athlete.id;
    fetchPlans({ userId, setPlans });
  }, [props.user.athlete.id]);

  return (
    <div>
      <StatusBar
        picture={props.user.athlete.profile}
        first={props.user.athlete.firstname}
        last={props.user.athlete.lastname}
      ></StatusBar>
      {plans ? (
        <Plans
          plans={plans}
          adjustPace={adjustPace}
          user={props.user.athlete.id}
          token={props.user.access_token}
          setPlans={setPlans}
        ></Plans>
      ) : (
        <div></div>
      )}
    </div>
  );
};
