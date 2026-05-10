import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';
import { AnalysisData } from '../App';
import { PieChart, BarChart } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export default function VisualAnalytics({ data, theme }: { data: AnalysisData, theme: 'light' | 'dark' }) {
  const textColor = theme === 'dark' ? '#cbd5e1' : '#475569';
  const gridColor = theme === 'dark' ? '#334155' : '#e2e8f0';

  // Pie Chart: Pass / Fail / Promoted
  const pieData = {
    labels: ['Pass', 'Promoted', 'Fail'],
    datasets: [
      {
        data: [data.summary.totalPass, data.summary.totalPromoted, data.summary.totalFail],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)', // Emerald
          'rgba(245, 158, 11, 0.8)', // Amber
          'rgba(244, 63, 94, 0.8)'   // Rose
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(244, 63, 94, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  // Extract just the code from "Subject Name (Code)"
  const getSubjectCode = (fullStr: string) => {
    const match = fullStr.match(/\((.*?)\)/);
    return match ? match[1] : fullStr;
  };

  // Bar Chart: Subject-wise Pass %
  const barData = {
    labels: data.subjectWiseAnalysis.map(s => getSubjectCode(s.subjectCode)),
    datasets: [
      {
        label: 'Passing %',
        data: data.subjectWiseAnalysis.map(s => parseFloat(s.passingPercentage)),
        backgroundColor: 'rgba(59, 130, 246, 0.8)', // Blue
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        borderRadius: 4
      }
    ]
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          title: (tooltipItems: any) => {
            const index = tooltipItems[0].dataIndex;
            return data.subjectWiseAnalysis[index].subjectCode;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: { color: gridColor },
        ticks: { color: textColor }
      },
      x: {
        grid: { display: false },
        ticks: { color: textColor, maxRotation: 45, minRotation: 45 }
      }
    }
  };

  // Histogram: SGPA Distribution
  const sgpaBins = { '9-10': 0, '8-9': 0, '7-8': 0, '6-7': 0, '5-6': 0, '<5': 0 };
  data.students.forEach(s => {
    if (s.sgpa >= 9) sgpaBins['9-10']++;
    else if (s.sgpa >= 8) sgpaBins['8-9']++;
    else if (s.sgpa >= 7) sgpaBins['7-8']++;
    else if (s.sgpa >= 6) sgpaBins['6-7']++;
    else if (s.sgpa >= 5) sgpaBins['5-6']++;
    else sgpaBins['<5']++;
  });

  const histData = {
    labels: Object.keys(sgpaBins),
    datasets: [
      {
        label: 'Number of Students',
        data: Object.values(sgpaBins),
        backgroundColor: 'rgba(139, 92, 246, 0.8)', // Violet
        borderColor: 'rgba(139, 92, 246, 1)',
        borderWidth: 1,
        borderRadius: 4,
        barPercentage: 1.0,
        categoryPercentage: 1.0
      }
    ]
  };

  const histOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: gridColor },
        ticks: { color: textColor, stepSize: 1 }
      },
      x: {
        grid: { display: false },
        ticks: { color: textColor }
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-darkCard border-slate-700' : 'bg-white border-slate-200'} shadow-sm`}>
        <h3 className="text-sm font-semibold mb-6 flex items-center gap-2"><PieChart className="w-4 h-4"/> Results Overview</h3>
        <div className="h-64 flex items-center justify-center">
          <Pie data={pieData} options={{ plugins: { legend: { position: 'bottom', labels: { color: textColor } } } }} />
        </div>
      </div>

      <div className={`p-6 rounded-2xl border lg:col-span-2 ${theme === 'dark' ? 'bg-darkCard border-slate-700' : 'bg-white border-slate-200'} shadow-sm`}>
        <h3 className="text-sm font-semibold mb-6 flex items-center gap-2"><BarChart className="w-4 h-4"/> Subject-Wise Passing Percentage</h3>
        <div className="h-64">
          <Bar data={barData} options={barOptions} />
        </div>
      </div>

      <div className={`p-6 rounded-2xl border lg:col-span-3 ${theme === 'dark' ? 'bg-darkCard border-slate-700' : 'bg-white border-slate-200'} shadow-sm`}>
        <h3 className="text-sm font-semibold mb-6 flex items-center gap-2"><BarChart className="w-4 h-4"/> SGPA Distribution Histogram</h3>
        <div className="h-64">
          <Bar data={histData} options={histOptions} />
        </div>
      </div>
    </div>
  );
}
