"use client";

import React, { useState, useEffect } from "react";

export function PerformanceMetricsChart() {
  const [timeframe, setTimeframe] = useState<number>(7);
  
  // 1. Initialize with a static array so Server and Client initially match perfectly
  const [chartData, setChartData] = useState<number[]>(Array(7).fill(20));

  // 2. Generate the random data ONLY on the client after the component mounts
  useEffect(() => {
    setChartData(
      Array.from({ length: timeframe }, () => Math.floor(Math.random() * 65) + 20)
    );
  }, [timeframe]);

  const gapClass = timeframe === 7 ? "gap-3" : timeframe === 30 ? "gap-1" : "gap-[1px]";

  return (
    <div className="lg:col-span-2 bg-surface-dark rounded-xl border border-border-dark shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-white">Performance Metrics</h3>
          <p className="text-sm text-slate-400">Call volume vs Error rates over time</p>
        </div>
        <select 
          value={timeframe}
          onChange={(e) => setTimeframe(Number(e.target.value))}
          className="bg-[#111813] border border-border-dark text-white text-sm rounded-lg focus:ring-primary focus:border-primary block p-2.5 outline-none cursor-pointer"
        >
          <option value={7}>Last 7 days</option>
          <option value={30}>Last 30 days</option>
          <option value={90}>Last 90 days</option>
        </select>
      </div>
      
      <div className="relative h-64 w-full">
        {/* Grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between text-xs text-slate-500">
          <div className="flex items-center w-full border-b border-border-dark/50 pb-2"><span>500</span></div>
          <div className="flex items-center w-full border-b border-border-dark/50 pb-2"><span>400</span></div>
          <div className="flex items-center w-full border-b border-border-dark/50 pb-2"><span>300</span></div>
          <div className="flex items-center w-full border-b border-border-dark/50 pb-2"><span>200</span></div>
          <div className="flex items-center w-full border-b border-border-dark/50 pb-2"><span>100</span></div>
          <div className="flex items-center w-full"><span>0</span></div>
        </div>
        
        {/* Chart Content */}
        <div className="absolute inset-0 ml-8 flex items-end justify-between px-2 pt-4">
          <div className={`w-full h-full flex items-end ${gapClass}`}>
            {chartData.map((height, index) => (
              <div 
                key={index}
                style={{ height: `${height}%` }}
                className="flex-1 bg-linear-to-t bg-green-500 rounded-t-sm relative group transition-all duration-500 ease-in-out"
              >
                {/* Top highlight cap */}
                <div className="absolute top-0 w-full h-1 bg-primary rounded-full"></div>
                
                {/* Tooltip on hover */}
                <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs py-1 px-2 rounded pointer-events-none transition-opacity z-10 whitespace-nowrap">
                  Day {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-primary"></span>
          <span className="text-xs text-slate-400">Total Calls</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-slate-600"></span>
          <span className="text-xs text-slate-400">Avg Duration</span>
        </div>
      </div>
    </div>
  );
}