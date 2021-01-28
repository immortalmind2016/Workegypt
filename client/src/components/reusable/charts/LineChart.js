import React from "react";
import { Line } from "react-chartjs-2";
const CHART_CONTAINER_STYLE = {
  backgroundColor: "#FFF",
  borderRadius: 20,
  padding: 20,
};
function LineChart({ values }) {
  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "website users Analysis",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: values || [],
        showLines: false,
      },
    ],
  };
  return (
    <div style={CHART_CONTAINER_STYLE}>
      <Line data={data} width={700} height={500} />
    </div>
  );
}

export default LineChart;
