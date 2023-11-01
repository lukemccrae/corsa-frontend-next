import { GraphQLFeatureCollection, MileData, Plan } from "./types";

import React, { useState } from "react";
import styled from "styled-components";
import { MapLoading } from "./mapLoading";
import Alert from "./alert";
import { ElevationProfile } from "./elevationProfile";
import { geoJSON } from "leaflet";
import { MileDataTable } from "./mileData";
import {
  amIExpanded,
  evaluateExpandedItem,
  toggleExpand,
} from "./helpers/display.helpers";

interface PlanViewProps {
  plan: Plan;
  key: string;
  setExpandedItem: Function;
  expandedItem: string;
  id: string;
}

export const PlanContainer = styled.div`
  display: flex;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  flex-wrap: wrap;
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

const ExpandedInfo = styled.div`
  margin: 0 0 500px 0;
  flex-basis: 100%;
`;

const Map = styled.div`
  display: flex;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
`;

const PlanGain = styled.div``;
const PlanLoss = styled.div``;

export const PlanView = (props: PlanViewProps) => {
  const [expanded, setExpanded] = useState(false);
  const [alert, setAlert] = useState();
  const [geoJson, setGeoJson] = useState();

  let chartProfilePoints: number[] = [];
  let mileProfilePoints: number[][] = [];

  if (geoJson) {
    const typedGeoJson: GraphQLFeatureCollection =
      geoJson as unknown as GraphQLFeatureCollection;

    console.log(typedGeoJson, "<< typedGeoJson");

    const milePoints =
      typedGeoJson.data.getGeoJsonBySortKey.features[0].geometry.coordinates;

    chartProfilePoints = milePoints
      .filter((c, i) => c[2] && i % 20 === 0)
      .map((c) => Math.round(c[2]));

    typedGeoJson.data.getGeoJsonBySortKey.features[0].properties.mileData.forEach(
      (md: MileData, mi) => {
        let percent = 0.01;
        const length = md.index;
        let profilePoints = [];
        for (let i = 0; i < 21; i++) {
          profilePoints.push(milePoints[percent * length]);
          percent += 0.05;
        }
        mileProfilePoints.push(profilePoints);
      }
    );
  }

  console.log(chartProfilePoints, "<< vertProfilePoints");

  return (
    <PlanContainer style={{ display: evaluateExpandedItem(props) }}>
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
          Total loss:{" "}
          {props.plan.mileData.reduce((accumulator, currentObject) => {
            return accumulator + currentObject.elevationLoss;
          }, 0)}{" "}
          ft.
        </PlanLoss>
      </PlanContent>
      <ButtonParent>
        <ExpandButton
          onClick={() => toggleExpand(props.id, setExpanded, expanded, props)}
        >
          {expanded ? "▲" : "▼"}
        </ExpandButton>
      </ButtonParent>
      {amIExpanded(props) ? (
        <ExpandedInfo>
          <Alert message={String(alert)}></Alert>{" "}
          <MapLoading // TODO: bad name
            geoJson={geoJson}
            setGeoJson={setGeoJson}
            setAlert={setAlert}
            id={props.id}
          ></MapLoading>
          <ElevationProfile
            chartProfilePoints={chartProfilePoints}
            mileData={props.plan.mileData}
          ></ElevationProfile>
          <MileDataTable
            geoJson={geoJson}
            mileData={props.plan.mileData}
            mileProfilePoints={mileProfilePoints}
          ></MileDataTable>
        </ExpandedInfo>
      ) : (
        <div></div>
      )}
    </PlanContainer>
  );
};
