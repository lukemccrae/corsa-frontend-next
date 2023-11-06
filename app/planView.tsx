import { GraphQLFeatureCollection, MileData, Plan } from "./types";

import React, { useState } from "react";
import styled from "styled-components";
import { MapLoading } from "./mapLoading";
import Alert from "./alert";
import { ElevationProfile } from "./elevationProfile";
import { geoJSON } from "leaflet";
import { MileDataTable, averagePaces, calcTime } from "./mileData";
import {
  amIExpanded,
  evaluateExpandedItem,
  toggleExpand,
} from "./helpers/display.helpers";
import { equalizePercents } from "./helpers/elevation.helper";

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

export const ListBox = styled.div`
  -webkit-box-flex: 1;
  color: #2b2b2b;
  -ms-flex: 1 1;
  flex: 1 1;
  display: flex;
  position: relative;
`;

export const PlanContentList = styled.ul`
  color: #2b2b2b;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.2;
  margin-bottom: 0;
  margin-top: 0;
  display: flex;
  color: white;
`;

export const PlanContentItem = styled.li`
  border-right: 1px solid #f3f2ed;
  margin-left: 0;
  margin-right: 16px;
  padding-right: 16px;
`;

const PlanContentItemNoBorder = styled.li`
  margin-left: 0;
  margin-right: 16px;
  padding-right: 16px;
`;

const PlanTitle = styled.h1`
  margin: 0;
  font-size: 24px;
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
  margin: 0 0 auto 0;
  flex-basis: 100%;
`;

const Map = styled.div`
  display: flex;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
`;
export const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export const Detail = styled.div`
  font-size: 20px;
  line-height: 25px;
  white-space: nowrap;
`;

interface PlanViewProps {
  plan: Plan;
  adjustPace: Function;
  key: string;
  setExpandedItem: Function;
  expandedItem: string;
  id: string;
  user: number;
}

export const PlanView = (props: PlanViewProps) => {
  const [expanded, setExpanded] = useState(false);
  const [alert, setAlert] = useState();
  const [geoJson, setGeoJson] = useState();

  let chartProfilePoints: number[] = [];
  let mileProfilePoints: number[][] = [];

  if (geoJson) {
    const typedGeoJson: GraphQLFeatureCollection =
      geoJson as unknown as GraphQLFeatureCollection;

    const milePoints =
      typedGeoJson.data.getGeoJsonBySortKey.features[0].geometry.coordinates;

    chartProfilePoints = milePoints
      .filter((c, i) => c[2] && i % 10 === 0)
      .map((c) => Math.round(c[2]));
  }

  return (
    <PlanContainer style={{ display: evaluateExpandedItem(props) }}>
      {/* Idea for this is a server-rendered image of the activity */}
      {/* <Avatar>
        <AvatarBox />
      </Avatar> */}
      <div style={{ margin: "0 0 0 12px" }}>
        <PlanTitle>{props.plan.name}</PlanTitle>
        <ListBox>
          <PlanContentList>
            <PlanContentItem>
              <Item>
                <span>Total gain: </span>
                <Detail>
                  {props.plan.mileData.reduce((accumulator, currentObject) => {
                    return accumulator + currentObject.elevationGain;
                  }, 0)}
                  {" ft."}
                </Detail>
              </Item>
            </PlanContentItem>
            <PlanContentItem>
              <Item>
                <span>Total loss: </span>
                <Detail>
                  {props.plan.mileData.reduce((accumulator, currentObject) => {
                    return accumulator + currentObject.elevationLoss;
                  }, 0)}
                  {" ft."}
                </Detail>
              </Item>
            </PlanContentItem>
            <PlanContentItem>
              <Item>
                <span>Distance</span>
                <Detail>
                  {props.plan.mileData.length}
                  {" mi."}
                </Detail>
              </Item>
            </PlanContentItem>
            <PlanContentItem>
              <Item>
                <span>Average pace</span>
                <Detail>
                  {averagePaces(props.plan.mileData)}
                  {" /mi."}
                </Detail>
              </Item>
            </PlanContentItem>
            <PlanContentItemNoBorder>
              <Item>
                <span>Total time</span>
                <Detail>
                  {calcTime(props.plan.mileData, 0)}
                  {""}
                </Detail>
              </Item>
            </PlanContentItemNoBorder>
          </PlanContentList>
        </ListBox>
      </div>
      <ButtonParent>
        <ExpandButton
          onClick={() => toggleExpand(props.id, setExpanded, expanded, props)}
        >
          {expanded ? "▲" : "▼"}
        </ExpandButton>
      </ButtonParent>
      {amIExpanded(props) ? (
        <ExpandedInfo>
          {alert ? <Alert message={String(alert)}></Alert> : <div></div>}
          <MileDataTable
            plan={props.plan}
            adjustPace={props.adjustPace}
            mileProfilePoints={mileProfilePoints}
            user={props.user}
            startTime={props.plan.startTime}
          ></MileDataTable>
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
        </ExpandedInfo>
      ) : (
        <div></div>
      )}
    </PlanContainer>
  );
};
