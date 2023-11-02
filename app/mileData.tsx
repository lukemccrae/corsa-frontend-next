import { styled } from "styled-components";
import { GraphQLFeatureCollection, MileData } from "./types";
import { MileProfile } from "./mileProfile";
import { useEffect, useState } from "react";
import { fetchMileProfile } from "./services/fetchMileProfile";

const Point = styled.div`
  width: 1px;
  height: 1px;
  margin-right: 2px;
  background-color: black;
`;

const DataTable = styled.div`
  display: flex;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
`;

const MileTableHead = styled.th`
  width: 60px;
`;

export const TableData = styled.td`
  width: 50px;
`;

const MileBox = styled.tr`
  border-bottom: 1px solid #d3d3d3;
`;

interface MileDataProps {
  mileData: MileData[];
  geoJson: any;
  mileProfilePoints: number[][];
  user: number;
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
        marginLeft: "auto",
        marginRight: "auto",
        tableLayout: "fixed",
        width: "250px",
      }}
    >
      <thead>
        <tr>
          <MileTableHead>Mile</MileTableHead>
          <MileTableHead>Pace</MileTableHead>
          <MileTableHead>Profile</MileTableHead>
          <MileTableHead>Avg.</MileTableHead>
          <MileTableHead>Gain</MileTableHead>
          <MileTableHead>Loss</MileTableHead>
          <MileTableHead>Time</MileTableHead>
        </tr>
      </thead>
      <tbody>
        {props.mileData.map((m, i) => {
          return (
            <MileBox key={i}>
              <TableData>{i + 1}</TableData>
              <TableData>Pace</TableData>
              <TableData>
                {profile ? (
                  <MileProfile profile={profile[i]}></MileProfile>
                ) : (
                  <div></div>
                )}
              </TableData>
              <TableData>avg paces</TableData>
              <TableData>{m.elevationGain}</TableData>
              <TableData>{m.elevationLoss}</TableData>
              <TableData>time of day</TableData>
            </MileBox>
          );
        })}
      </tbody>
    </table>
  );
};
