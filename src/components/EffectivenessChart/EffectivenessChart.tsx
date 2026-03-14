import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import "./EffectivenessChart.scss";

interface EffectivenessChartProps {
  total: number;
  finalizados: number;
  target?: number;
}

export const EffectivenessChart: React.FC<EffectivenessChartProps> = ({
  total,
  finalizados,
  target = 80,
}) => {
  const percent = total > 0 ? Math.min(100, (finalizados / total) * 100) : 0;

  const data = [
    {
      name: "Efectividad",
      value: Math.round(percent),
      color: "#27ae60",
    },
    {
      name: "Meta",
      value: target,
      color: "#3498db",
    },
  ];

  return (
    <div className="effectiveness-chart">
      <h3 className="effectiveness-chart__title">Efectividad del proceso</h3>
      <p className="effectiveness-chart__subtitle">
        Porcentaje de trámites finalizados respecto al total (meta {target}%).
      </p>

      <div className="effectiveness-chart__container">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.25} />
            <XAxis dataKey="name" tick={{ fill: "#4B5563" }} />
            <YAxis tick={{ fill: "#4B5563" }} domain={[0, 100]} />
            <Tooltip formatter={(value: any) => `${value}%`} />
            <Legend />
            <Bar dataKey="value" name="Porcentaje" maxBarSize={36}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="effectiveness-chart__footer">
        <span className="effectiveness-chart__label">
          Actual: <strong>{Math.round(percent)}%</strong>
        </span>
        <span className="effectiveness-chart__label">
          Objetivo: <strong>{target}%</strong>
        </span>
      </div>
    </div>
  );
};
