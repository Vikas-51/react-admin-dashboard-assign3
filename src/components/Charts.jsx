import React, { useRef, useEffect } from 'react';
import { Chart } from 'chart.js/auto';
import { motion } from 'framer-motion';

const chartVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const Charts = () => {
  const barRef = useRef(null);
  const lineRef = useRef(null);
  const doughnutRef = useRef(null);

  useEffect(() => {
    const charts = [];

    if (barRef.current) {
      const ctx = barRef.current.getContext('2d');
      charts.push(new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: 'Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(239, 68, 68, 0.7)',
              'rgba(59, 130, 246, 0.7)',
              'rgba(234, 179, 8, 0.7)',
              'rgba(34, 197, 94, 0.7)',
              'rgba(139, 92, 246, 0.7)',
              'rgba(251, 191, 36, 0.7)',
            ],
            borderRadius: 8,
            borderSkipped: false,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true }
          }
        }
      }));
    }

    if (lineRef.current) {
      const ctx = lineRef.current.getContext('2d');
      charts.push(new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr'],
          datasets: [{
            label: 'Revenue',
            data: [4000, 3000, 5000, 7000],
            fill: false,
            borderColor: 'rgba(59, 130, 246, 1)',
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      }));
    }

    if (doughnutRef.current) {
      const ctx = doughnutRef.current.getContext('2d');
      charts.push(new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Engineering', 'Marketing', 'Sales'],
          datasets: [{
            label: 'Departments',
            data: [300, 200, 150],
            backgroundColor: [
              'rgba(34, 197, 94, 0.7)',
              'rgba(234, 179, 8, 0.7)',
              'rgba(239, 68, 68, 0.7)'
            ],
            hoverOffset: 8
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      }));
    }

    return () => charts.forEach(chart => chart.destroy());
  }, []);

  return (
    <section className="flex flex-wrap justify-center gap-8 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      {[{
        title: 'Bar Chart',
        ref: barRef
      }, {
        title: 'Line Chart',
        ref: lineRef
      }, {
        title: 'Doughnut Chart',
        ref: doughnutRef
      }].map(({ title, ref }, idx) => (
        <motion.div
          key={title}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 w-[490px] h-[500px] flex flex-col"
          variants={chartVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-xl font-semibold mb-4 text-purple-600 dark:text-teal-400">{title}</h2>
          <canvas ref={ref} className="flex-1" />
        </motion.div>
      ))}
    </section>
  );
};

export default Charts;
