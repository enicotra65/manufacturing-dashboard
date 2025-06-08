import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import CountUp from "react-countup";
import {
  BarChart as BarChartIcon,
  Gauge,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

import dashboardData from "../data/dashboardData.json";
const chartData = dashboardData.chartData;

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

const ICONS = {
  BarChart: BarChartIcon,
  Gauge,
  ArrowUpRight,
  ArrowDownRight,
};

function StatItem({ icon, label, value }) {
  const Icon = ICONS[icon];
  return (
    <div className="flex items-center gap-3">
      <Icon className="w-5 h-5 text-primary dark:text-blue-400 shrink-0" />
      <div>
        <p className="text-xs text-muted-foreground dark:text-gray-400">{label}</p>
        <p className="text-base font-semibold text-foreground dark:text-white">
          <CountUp end={value} duration={1.5} separator="," />
        </p>
      </div>
    </div>
  );
}

function TabbedStatsPanel() {
  const [activeTab, setActiveTab] = useState("production");

  const total = chartData.reduce((acc, val) => acc + val.output, 0);
  const avg = Math.round(total / chartData.length);
  const highest = chartData.reduce((max, val) => (val.output > max.output ? val : max));
  const lowest = chartData.reduce((min, val) => (val.output < min.output ? val : min));

  const TABS = {
    production: [
      { icon: "BarChart", label: "Total Output", value: total },
      { icon: "Gauge", label: "Avg Daily Output", value: avg },
    ],
    shifts: [
      { icon: "ArrowUpRight", label: `Peak (${highest.name})`, value: highest.output },
      { icon: "ArrowDownRight", label: `Low (${lowest.name})`, value: lowest.output },
    ],
    errors: [
      { icon: "Gauge", label: "Error Rate", value: 2.1 },
      { icon: "BarChart", label: "Resolved Issues", value: 13 },
    ],
  };

  return (
    <div className="rounded-xl bg-muted dark:bg-gray-800 p-4 shadow mt-6 md:mt-0 w-full max-w-sm mx-auto md:mx-0">
      <div className="flex gap-2 mb-4 justify-center md:justify-start">
        {Object.keys(TABS).map((tab) => (
          <button
            key={tab}
            className={`px-3 py-1 rounded-full text-sm capitalize transition ${
              activeTab === tab
                ? "bg-primary text-white"
                : "bg-gray-300 text-muted-foreground dark:bg-gray-700 dark:text-gray-300"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid gap-4 text-sm text-foreground dark:text-white">
        {TABS[activeTab].map((item, i) => (
          <StatItem key={i} icon={item.icon} label={item.label} value={item.value} />
        ))}
      </div>
    </div>
  );
}

export default function ChartPanel() {
  const [selectedChart, setSelectedChart] = useState("line");

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-background dark:bg-gray-900 rounded-xl shadow overflow-hidden transition-colors duration-300">
      <h2 className="text-2xl font-bold text-primary dark:text-blue-400 mb-4 text-center">
        Production Metrics
      </h2>
        <div className="flex justify-center gap-4 mb-6">
            {["line", "bar", "pie"].map((type) => (
                <button
                    key={type}
                    onClick={() => setSelectedChart(type)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                        selectedChart === type
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
            ))}
        </div>

      {selectedChart === "pie" ? (
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="w-full flex justify-center">
            <PieChart width={350} height={300}>
              <Tooltip />
              <Pie
                data={chartData}
                dataKey="output"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </div>
          <TabbedStatsPanel />
        </div>
      ) : (
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            {selectedChart === "bar" ? (
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip contentStyle={{ backgroundColor: "#1f2937", color: "#fff" }} />
                <Bar dataKey="output" fill="#3B82F6" />
              </BarChart>
            ) : (
              <LineChart data={chartData}>
                <XAxis dataKey="name" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip contentStyle={{ backgroundColor: "#1f2937", color: "#fff" }} />
                <Line type="monotone" dataKey="output" stroke="#3B82F6" strokeWidth={2} />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
