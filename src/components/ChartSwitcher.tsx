import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-luxon";
import OptionChain from "./OptionChain";
import TradingTools from "./TradingTools";
import ResearchMarketUpdates from "./ResearchMarketUpdates";
import FIIActivity from "./FIIActivity";
import FOBanList from "./FOBanList";

Chart.register(...registerables);

interface Candle {
  x: Date;
  o: number;
  h: number;
  l: number;
  c: number;
}

const ChartSwitcher: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart>();
  const [isCandlestick, setIsCandlestick] = useState(false);
  const [candleData, setCandleData] = useState<Candle[]>([]);
  const [lineData, setLineData] = useState<{ labels: string[]; data: number[] }>({
    labels: [],
    data: []
  });

  const generateCandle = (basePrice: number): Candle => {
    const open = basePrice;
    const close = open + (Math.random() * 40 - 20);
    const high = Math.max(open, close) + Math.random() * 20;
    const low = Math.min(open, close) - Math.random() * 20;
    return { x: new Date(), o: open, h: high, l: low, c: close };
  };

  // Initialize data
  useEffect(() => {
    // Initialize with some sample data
    const initialCandles = Array.from({ length: 10 }, (_, i) => {
      const basePrice = 14500 + (i * 10);
      return generateCandle(basePrice);
    });
    setCandleData(initialCandles);

    const initialLineData = Array.from({ length: 10 }, (_, i) => {
      const time = new Date(Date.now() - (9 - i) * 5000).toLocaleTimeString();
      const price = 14200 + Math.floor(Math.random() * 400);
      return { time, price };
    });
    setLineData({
      labels: initialLineData.map(d => d.time),
      data: initialLineData.map(d => d.price)
    });
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    if (isCandlestick) {
      // Create candlestick chart
      chartRef.current = new Chart(canvasRef.current, {
        type: "bar",
        data: { 
          datasets: [
            {
              label: "Open",
              data: candleData.map(d => ({ x: d.x.getTime(), y: d.o })),
              backgroundColor: candleData.map(d => d.c >= d.o ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'),
              borderColor: candleData.map(d => d.c >= d.o ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)'),
              borderWidth: 1,
              order: 3
            },
            {
              label: "High",
              data: candleData.map(d => ({ x: d.x.getTime(), y: d.h })),
              backgroundColor: 'rgba(100, 116, 139, 0.4)',
              borderColor: 'rgb(100, 116, 139)',
              borderWidth: 2,
              order: 1
            },
            {
              label: "Low",
              data: candleData.map(d => ({ x: d.x.getTime(), y: d.l })),
              backgroundColor: 'rgba(100, 116, 139, 0.4)',
              borderColor: 'rgb(100, 116, 139)',
              borderWidth: 2,
              order: 2
            },
            {
              label: "Close",
              data: candleData.map(d => ({ x: d.x.getTime(), y: d.c })),
              backgroundColor: candleData.map(d => d.c >= d.o ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'),
              borderColor: candleData.map(d => d.c >= d.o ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)'),
              borderWidth: 1,
              order: 4
            }
          ] 
        },
        options: { 
          responsive: true,
          maintainAspectRatio: false,
          scales: { 
            x: { 
              type: "time", 
              time: { unit: "second" },
              grid: {
                color: 'rgba(100, 116, 139, 0.2)'
              },
              ticks: {
                color: 'rgba(100, 116, 139, 0.8)'
              }
            },
            y: {
              beginAtZero: false,
              grid: {
                color: 'rgba(100, 116, 139, 0.2)'
              },
              ticks: {
                color: 'rgba(100, 116, 139, 0.8)'
              }
            }
          },
          plugins: {
            legend: {
              display: false
            }
          }
        },
      });
    } else {
      // Create line chart
      chartRef.current = new Chart(canvasRef.current, {
        type: "line",
        data: { 
          labels: lineData.labels, 
          datasets: [{ 
            label: "NIFTY", 
            data: lineData.data, 
            borderColor: "rgb(14, 165, 233)", 
            backgroundColor: "rgba(14, 165, 233, 0.1)",
            borderWidth: 2,
            fill: true,
            tension: 0.4
          }] 
        },
        options: { 
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: {
                color: 'rgba(100, 116, 139, 0.2)'
              },
              ticks: {
                color: 'rgba(100, 116, 139, 0.8)'
              }
            },
            y: {
              grid: {
                color: 'rgba(100, 116, 139, 0.2)'
              },
              ticks: {
                color: 'rgba(100, 116, 139, 0.8)'
              }
            }
          },
          plugins: {
            legend: {
              display: false
            }
          }
        },
      });
    }
  }, [isCandlestick, candleData, lineData]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!chartRef.current) return;

      if (!isCandlestick) {
        // Update line chart
        const newPrice = 14200 + Math.floor(Math.random() * 400);
        const now = new Date().toLocaleTimeString();
        
        setLineData(prev => {
          const newLabels = [...prev.labels, now];
          const newData = [...prev.data, newPrice];
          
          if (newLabels.length > 10) {
            newLabels.shift();
            newData.shift();
          }
          
          return { labels: newLabels, data: newData };
        });
      } else {
        // Update candlestick chart
        const lastClose = candleData.length ? candleData[candleData.length - 1].c : 14500;
        const newCandle = generateCandle(lastClose);
        
        setCandleData(prev => {
          const newData = [...prev, newCandle];
          if (newData.length > 10) {
            newData.shift();
          }
          return newData;
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isCandlestick, candleData]);

  return (
    <section 
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white h-full flex flex-col"
      aria-label="Chart switcher and trading dashboard"
      role="region"
    >
      <header className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">DesiTrend</h2>
        <button
          onClick={() => setIsCandlestick(!isCandlestick)}
          className="px-4 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors font-medium text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label={`Switch to ${isCandlestick ? 'line chart' : 'candlestick chart'}`}
          aria-pressed={isCandlestick}
        >
          {isCandlestick ? "Switch to Line Chart" : "Switch to Candlestick"}
        </button>
      </header>
      
      <div className="flex-1 relative min-h-[400px]" aria-label={`${isCandlestick ? 'Candlestick' : 'Line'} chart showing NIFTY data`}>
        <canvas 
          ref={canvasRef} 
          className="w-full h-full"
          role="img"
          aria-label={`${isCandlestick ? 'Candlestick' : 'Line'} chart displaying real-time NIFTY price data`}
        ></canvas>
      </div>
      
      {/* New F&O Dashboard Components */}
      <div className="mt-6 space-y-6" aria-label="Trading tools and market information">
        <OptionChain />
        <TradingTools />
        <ResearchMarketUpdates />
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FIIActivity />
          <FOBanList />
        </div> */}
      </div>
    </section>
  );
};

export default ChartSwitcher;