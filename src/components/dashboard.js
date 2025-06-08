import React, { forwardRef } from "react";
import data from "../data/dashboardData.json";
import ChartPanel from "./chartPanel";

const Dashboard = forwardRef((props, ref) => {
  return (
    <div
      ref={ref}
      className="bg-background text-foreground min-h-screen pt-16 pb-12 px-4 sm:px-6 lg:px-12 space-y-10 transition-colors duration-300"
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.kpiCards.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow text-center flex flex-col justify-center transition-colors"
          >
            <p className="text-sm text-gray-500 dark:text-gray-300">{item.label}</p>
            <h2 className="text-2xl font-bold text-blue-700 dark:text-white">{item.value}</h2>
          </div>
        ))}
      </div>

      {/* Charts */}
      <ChartPanel />

      {/* Status Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow overflow-x-auto transition-colors">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Line Status</h3>
        <table className="min-w-full text-left text-sm text-gray-800 dark:text-gray-200">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="py-2 pr-4">Line</th>
              <th className="pr-4">Status</th>
              <th className="pr-4">Output</th>
              <th className="pr-4">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {data.statusTable.map((row, i) => (
              <tr
                key={i}
                className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <td className="py-2 pr-4">{row.line}</td>
                <td className="pr-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      row.status === "Running"
                        ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                        : row.status === "Paused"
                        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                        : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="pr-4">{row.output}</td>
                <td className="pr-4">{row.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default Dashboard;

