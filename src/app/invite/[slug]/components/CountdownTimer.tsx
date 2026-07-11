"use client";

import { useEffect, useState } from "react";

function getTimeLeft(target: Date) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownTimer({ targetDate }: { targetDate: Date }) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate));

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: "дней", value: timeLeft.days },
    { label: "часов", value: timeLeft.hours },
    { label: "минут", value: timeLeft.minutes },
    { label: "секунд", value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center justify-center gap-4 sm:gap-6">
      {units.map((u) => (
        <div key={u.label} className="flex flex-col items-center">
          <span className="text-2xl sm:text-3xl font-serif text-[#8b263e]">
            {u.value.toString().padStart(2, "0")}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-[#a18c7e]">{u.label}</span>
        </div>
      ))}
    </div>
  );
}