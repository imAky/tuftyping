// Use client-side rendering if applicable (for Next.js)
"use client";

import { useEffect, useRef } from "react";
import { Chart } from "chart.js";

// Import necessary components from Chart.js
import {
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
} from "chart.js";

const LineChart = ({ labels, data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Register Chart.js controllers, elements, and scales for line chart
    Chart.register(
      LineController,
      LineElement,
      PointElement,
      LinearScale,
      Title,
      CategoryScale,
      Tooltip
    );

    const myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Wpm",
            data,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",

            pointStyle: "circle",
            pointRadius: 10,
            pointHoverRadius: 15,
          },
        ],
      },
      options: {
        responsive: true,

        plugins: {
          tooltip: {
            // Customize tooltip content and appearance (optional)
            callbacks: {
              label: (context) => {
                // Function to format tooltip content
                const datasetLabel = context.dataset.label;
                const dataPoint = context.parsed.y;
                return `${datasetLabel}: ${dataPoint}`; // Display dataset label and data point
              },
            },
          },
        },
      },
    });

    return () => myChart.destroy(); // Cleanup function
  }, []);

  return <canvas ref={chartRef} style={{ height: "100%" }} />;
};

export default LineChart;
