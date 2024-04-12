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

const LineChart = ({ labels, datasets }) => {
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
        datasets: datasets.map((dataset) => ({
          label: dataset.label,
          data: dataset.data,
          backgroundColor: dataset.color,
          borderColor: dataset.color,
          pointStyle: "circle",
          pointRadius: 5,
          pointHoverRadius: 8,
        })),
      },
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            callbacks: {
              label: (context) => {
                const datasetLabel = context.dataset.label;
                const dataPoint = context.parsed.y;
                const date = labels[context.dataIndex];
                const timeOfTypingTest =
                  datasets[context.datasetIndex].timeOfTypingTest[
                    context.dataIndex
                  ];
                const tooltipText = [
                  `${datasetLabel}: ${dataPoint}`,
                  `Duration: ${timeOfTypingTest}`,
                ];

                return tooltipText;
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
