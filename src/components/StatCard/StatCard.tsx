import React from "react";
import type { LucideIcon } from "lucide-react";
import "./StatCard.scss";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
}) => {
  return (
    <div className="stat-card">
      <div className="stat-card__icon">
        <Icon size={24} />
      </div>
      <div className="stat-card__content">
        <h3 className="stat-card__title">{title}</h3>
        <p className="stat-card__value">{value}</p>
      </div>
    </div>
  );
};
