import { Line, Doughnut, Bar } from "react-chartjs-2";
import {
  ArcElement,
  CategoryScale,
  Chart,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
  BarElement,
} from "chart.js";
import { useCourseName } from "../../hooks/useCourseName";
import { useGetData } from "../../hooks/useGetData";
import { Box } from "@mui/material";
Chart.register(
  Tooltip,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  BarElement,
  Filler,
  ArcElement,
  Legend
);

const LineChart = (prop) => {
  const Linedata = {
    labels: prop.labels,
    datasets: [
      {
        data: prop.value,
        label: "Students",
        // fill: true,
        backgroundColor: "white",
        borderColor: "green",
      },
    ],
  };

  return (
    <div>
      <Line data={Linedata} height={"100%"} />
    </div>
  );
};
const DonutChart = (prop) => {
  const donutData = {
    labels: ["Girls", "Boys"],
    datasets: [
      {
        data: prop?.value,
        label: "Girls and Boys",
        backgroundColor: ["green", "blue"],
        borderColor: "green",
        offset: "20",
      },
    ],
  };

  return (
    <Box
      sx={{
        width: prop.width,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Doughnut data={donutData} />
    </Box>
  );
};

const StudentChart = () => {
  const [course] = useCourseName();
  const [count] = useGetData("api/v1/course/getCount");
  console.log(count);

  const data = {
    labels: course?.courses,
    datasets: [
      {
        label: "Number of Students",
        data: count?.courses,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Student Distribution by Course",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
        max: 50,
      },
    },
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Bar data={data} options={options} />;
    </Box>
  );
};

export default StudentChart;

export { LineChart, DonutChart, StudentChart };
