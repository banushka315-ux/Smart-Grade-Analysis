import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { SubjectGradeDistribution } from '../utils/grades';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface SubjectChartsProps {
  distributions: SubjectGradeDistribution[];
}

const GRADE_COLORS: Record<string, string> = {
  'A+': '#059669',
  'A': '#34d399',
  'B+': '#0284c7',
  'B': '#38bdf8',
  'C+': '#d97706',
  'C': '#fbbf24',
};

const GRADE_ORDER = ['A+', 'A', 'B+', 'B', 'C+', 'C'];

export default function SubjectCharts({ distributions }: SubjectChartsProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-800">Grade Distribution Charts</h2>
        <p className="text-sm text-slate-500 mt-0.5">Visual breakdown of grades across each subject</p>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {distributions.map((dist) => {
          const data = {
            labels: GRADE_ORDER,
            datasets: [
              {
                label: 'Students',
                data: GRADE_ORDER.map((g) => dist.distribution[g] || 0),
                backgroundColor: GRADE_ORDER.map((g) => GRADE_COLORS[g]),
                borderRadius: 8,
                borderSkipped: false,
                maxBarThickness: 52,
              },
            ],
          };

          const options = {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              legend: { display: false },
              title: {
                display: true,
                text: dist.subject,
                font: { size: 14, weight: 'bold' as const },
                color: '#334155',
                padding: { bottom: 16 },
              },
              tooltip: {
                backgroundColor: '#1e293b',
                titleFont: { size: 12 },
                bodyFont: { size: 12 },
                padding: 12,
                cornerRadius: 8,
                displayColors: true,
                boxPadding: 4,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1,
                  color: '#94a3b8',
                  font: { size: 11 },
                },
                grid: {
                  color: '#f1f5f9',
                  drawBorder: false,
                },
              },
              x: {
                ticks: {
                  color: '#64748b',
                  font: { size: 11, weight: 'normal' as const },
                },
                grid: { display: false },
              },
            },
          };

          return (
            <div key={dist.subject} className="bg-slate-50/80 rounded-xl p-5 border border-slate-100">
              <Bar data={data} options={options} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
