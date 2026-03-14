import React, { useState, useEffect } from "react";
import "./DateDisplay.scss";

export const DateDisplay: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const currentDate = currentTime.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const currentTimeString = currentTime.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="date-display">
      <p className="date-display__date">{currentDate}</p>
      <p className="date-display__time">{currentTimeString}</p>
    </div>
  );
};
