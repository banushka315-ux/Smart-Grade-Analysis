import { SubjectGradeDistribution } from '../utils/grades';

interface SubjectBreakdownProps {
  distributions: SubjectGradeDistribution[];
}

const GRADE_ORDER = ['A+', 'A', 'B+', 'B', 'C+', 'C'];

const gradePill: Record<string, string> = {
  'A+': 'bg-emerald-500 text-white',
  'A': 'bg-emerald-400 text-white',
  'B+': 'bg-sky-500 text-white',
  'B': 'bg-sky-400 text-white',
  'C+': 'bg-amber-500 text-white',
  'C': 'bg-amber-400 text-white',
};

export default function SubjectBreakdown({ distributions }: SubjectBreakdownProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-800">Subject-wise Grade Segregation</h2>
        <p className="text-sm text-slate-500 mt-0.5">Number of students in each grade category per subject</p>
      </div>

      <div className="p-6 space-y-6">
        {distributions.map((dist) => {
          const total = Object.values(dist.distribution).reduce((a, b) => a + b, 0);
          return (
            <div key={dist.subject} className="bg-slate-50/80 rounded-xl p-5 border border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-800 text-base">{dist.subject}</h3>
                <span className="text-xs text-slate-400 font-medium">{total} students</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {GRADE_ORDER.map((grade) => {
                  const count = dist.distribution[grade] || 0;
                  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                  return (
                    <div
                      key={grade}
                      className={`rounded-xl p-3 text-center transition-all duration-200 ${
                        count > 0
                          ? 'bg-white border border-slate-200 shadow-sm hover:shadow-md'
                          : 'bg-slate-100/60 border border-slate-100 opacity-50'
                      }`}
                    >
                      <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-bold mb-2 ${gradePill[grade]}`}>
                        {grade}
                      </span>
                      <div className="text-xl font-bold text-slate-800 tabular-nums">{count}</div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {count === 1 ? 'student' : 'students'}
                        {count > 0 && <span className="ml-1 text-slate-300">({pct}%)</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
