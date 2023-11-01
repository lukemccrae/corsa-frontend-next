import { Line } from "react-chartjs-2";
import styled from "styled-components";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { MileData } from "./types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ElevationProfileProps {
  chartProfilePoints: number[];
  mileData: MileData[];
}

const ChartWrapper = styled.div`
  display: flex;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  width: 75%;
  height: 300px;
`;

export const ElevationProfile = (props: ElevationProfileProps) => {
  if (!props.chartProfilePoints) {
    return <div>Loading</div>;
  }

  console.log(props.chartProfilePoints);

  const labels = Array.from(
    {
      length: props.mileData.length + 2,
    },
    (_, index) => index
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: props.chartProfilePoints,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        fill: true,
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };
  return (
    <ChartWrapper>
      <Line options={chartOptions} data={data}></Line>
    </ChartWrapper>
  );
};
