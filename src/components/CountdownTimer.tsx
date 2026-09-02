import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Seminar date: September 19, 2026, 14:00:00 JST (UTC+9)
    const targetTime = new Date('2026-09-19T14:00:00+09:00').getTime();

    const calculate = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#083331] border border-[#165a55] rounded-3xl p-4 sm:p-6 shadow-xl text-white">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left header */}
        <div className="flex items-center gap-3 text-center md:text-left">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#e62b32] shrink-0 shadow-md">
            <Clock className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="text-xs uppercase font-extrabold tracking-widest text-[#79ded7]">
              Seminar Countdown
            </div>
            <div className="font-headline text-xs sm:text-lg lg:text-xl font-extrabold uppercase tracking-wide text-white whitespace-nowrap">
              Saturday, September 19, 2026 • 14:00 JST
            </div>
          </div>
        </div>

        {/* Counter Blocks */}
        <div className="flex items-center gap-2 sm:gap-3">
          {[
            { label: 'DAYS', value: timeLeft.days },
            { label: 'HOURS', value: timeLeft.hours },
            { label: 'MINUTES', value: timeLeft.minutes },
            { label: 'SECONDS', value: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center w-16 sm:w-20 py-2 rounded-2xl bg-[#0d4643] border border-[#1b6b66] shadow-xs"
            >
              <span className="font-headline text-xl sm:text-3xl font-black text-white leading-none">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold text-[#bce7e4] mt-1 tracking-wider">
                {item.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
