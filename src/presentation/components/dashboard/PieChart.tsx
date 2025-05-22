import { Pie } from "react-chartjs-2";
import { type ChartOptions } from "chart.js";

interface IPieChartProps {
  data: { [keyof: string]: number };
  chartTitle?: string;
  backgroundColor?: string[];
  borderColor?: string[];
  borderWidth?: number;
}

export const PieChart = (props: IPieChartProps) => {
  const { data, borderWidth = 1, chartTitle } = props;

  let { backgroundColor, borderColor } = props;
  backgroundColor ??= [
    "rgba(255, 99, 132, 0.5)",
    "rgba(54, 162, 235, 0.5)",
    "rgba(255, 206, 86, 0.5)",
    "rgba(75, 192, 192, 0.5)",
    "rgba(153, 102, 255, 0.5)",
    "rgba(255, 159, 64, 0.5)",
  ];
  borderColor ??= [
    "rgba(255, 99, 132, 1)",
    "rgba(54, 162, 235, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
  ];

  if (!data || data.length === 0) return <div>No hay datos disponibles</div>;

  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor,
        borderColor,
        borderWidth,
      },
    ],
  };

  const pieOptions: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: !!chartTitle,
        text: chartTitle,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow w-full h-[40vh] flex items-center justify-center">
      <Pie data={chartData} options={pieOptions} />
    </div>
  );
};
