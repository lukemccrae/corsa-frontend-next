import { styled } from "styled-components";
import { GraphQLFeatureCollection, MileData } from "./types";

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
}

// const Point = styled.div`
//   width: 1px;
//   height: 1px;
//   padding-bottom: ${(props) => props.vert + "px"};
//   margin-right: 2px;
//   background-color: black;
// `;

// const ProfileBox = styled.div`
//   display: inline-flex;
//   align-items: baseline;
// `;

const secondsToMinutesAndSeconds = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const minutesString = String(minutes).padStart(2, "0"); // Ensure two digits for minutes
  const secondsString = String(remainingSeconds).padStart(2, "0"); // Ensure two digits for seconds

  return `${minutesString}:${secondsString}`;
};

export const MileDataTable = (props: MileDataProps) => {
  console.log(props.mileProfilePoints, "<< mileProfilePoints");
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
              <TableData>{i}</TableData>
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
