import { styled } from "styled-components";
import { GraphQLFeatureCollection, MileData, Plan } from "./types";
import { MileProfile } from "./mileProfile";
import { useEffect, useState } from "react";
import { fetchMileProfile } from "./services/fetchMileProfile";

const Point = styled.div`
  width: 1px;
  height: 1px;
  margin-right: 2px;
  background-color: black;
`;

export const ArrowLeft = styled.div`
  border: solid white;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 5px;
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
`;

export const ArrowRight = styled.div`
  border: solid white;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 5px;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
`;

const DataTable = styled.div`
  display: flex;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
`;

const MileTableHead = styled.th`
  text-align: left;
`;

export const TableData = styled.td`
  width: 50px;
`;

const MileBox = styled.tr`
  border-bottom: 1px solid #d3d3d3;
`;

const toHHMMSS = (secs: number) => {
  var hours = Math.floor(secs / 3600);
  var minutes = Math.floor(secs / 60) % 60;
  var seconds = secs % 60;

  return [hours, minutes, seconds]
    .map((v) => (v < 10 ? "0" + v : v))
    .filter((v, i) => v !== "00" || i > 0)
    .join(":");
};

export const averagePaces = (md: MileData[]) => {
  const sum = md.reduce(
    (accumulator, currentValue) => accumulator + currentValue.pace,
    0
  );

  const result = toHHMMSS(Math.round(sum / md.length));
  return result;
};

export const calcTime = (md: MileData[], start: number) => {
  const sum = md.reduce(
    (accumulator, currentValue) => accumulator + currentValue.pace,
    0
  );
  return toHHMMSS(sum + start);
};

interface MileDataProps {
  mileProfilePoints: number[][];
  user: number;
  startTime: number;
  plan: Plan;
  adjustPace: Function;
}

export const MileDataTable = (props: MileDataProps) => {
  const [profile, setProfile] = useState();
  const user = props.user;

  useEffect(() => {
    fetchMileProfile({ user, setProfile });
  }, [props.user]);

  return (
    <table
      style={{
        tableLayout: "fixed",
        width: "250px",
        margin: "30px auto 30px auto",
      }}
    >
      <thead>
        <tr>
          <MileTableHead style={{ width: "50px" }}>Mile</MileTableHead>
          <MileTableHead style={{ width: "90px" }}>Pace</MileTableHead>
          <MileTableHead style={{ width: "80px" }}>Profile</MileTableHead>
          <MileTableHead style={{ width: "70px" }}>Avg.</MileTableHead>
          <MileTableHead style={{ width: "50px" }}>Gain</MileTableHead>
          <MileTableHead style={{ width: "70px" }}>Loss</MileTableHead>
          {/* TODO: make start time editable */}
          <MileTableHead style={{ width: "70px", display: "none" }}>
            Time
          </MileTableHead>
        </tr>
      </thead>
      <tbody>
        {props.plan.mileData.map((m, i) => {
          return (
            <MileBox key={i}>
              <TableData>{i + 1}</TableData>
              <TableData>
                <ArrowLeft
                  onClick={() => props.adjustPace(props.plan.id, -5, i)}
                ></ArrowLeft>
                {toHHMMSS(m.pace)}
                <ArrowRight
                  onClick={() => props.adjustPace(props.plan.id, 5, i)}
                ></ArrowRight>
              </TableData>
              <TableData>
                {profile && profile[i] ? (
                  <MileProfile profile={profile[i]}></MileProfile>
                ) : (
                  <div></div>
                )}
              </TableData>
              <TableData>
                {averagePaces(props.plan.mileData.slice(0, i + 1))}
              </TableData>
              <TableData>{m.elevationGain}</TableData>
              <TableData>{m.elevationLoss}</TableData>
              {/* TODO: make start time editable */}
              <TableData style={{ display: "none" }}>
                {calcTime(props.plan.mileData.slice(0, i + 1), props.startTime)}
              </TableData>
            </MileBox>
          );
        })}
      </tbody>
    </table>
  );
};
