import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import "./StatusChart.scss";

interface StatusChartProps {
  data: {
    finalizados: number;
    pendientes: number;
    enProceso: number;
  };
}

const COLORS = ["#27ae60", "#3498db", "#f59e0b"];

export const StatusChart: React.FC<StatusChartProps> = ({ data }) => {
  const chartData = [
    { name: "Finalizados", value: data.finalizados, color: COLORS[0] },
    { name: "En Proceso", value: data.enProceso, color: COLORS[1] },
    { name: "Pendientes", value: data.pendientes, color: COLORS[2] },
  ];

  return (
    <div className="status-chart">
      <h3 className="status-chart__title">Distribución de Estados</h3>
      <div className="status-chart__container">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
