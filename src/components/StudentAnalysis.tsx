import { Trophy, AlertTriangle, TrendingUp } from 'lucide-react';
import { StudentData } from '../utils/grades';

interface StudentAnalysisProps {
  topPerformers: StudentData[];
  needsImprovement: StudentData[];
}

const gradeBadge: Record<string, string> = {
  'A+': 'bg-emerald-100 text-emerald-700',
  'A': 'bg-emerald-50 text-emerald-600',
  'B+': 'bg-sky-100 text-sky-700',
  'B': 'bg-sky-50 text-sky-600',
  'C+': 'bg-amber-100 text-amber-700',
  'Fail': 'bg-red-100 text-red-700',
};

export default function StudentAnalysis({ topPerformers, needsImprovement }: StudentAnalysisProps) {
  return (
    <div className="space-y-6">
      {/* Top Performers */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-800">Top Performers</h2>
            <p className="text-xs text-slate-500">Students with highest average scores</p>
          </div>
        </div>

        <div className="divide-y divide-slate-50">
          {topPerformers.map((student, idx) => (
            <div key={student.name} className="px-6 py-3.5 flex items-center justify-between hover:bg-emerald-50/40 transition-colors">
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold
                  ${idx === 0 ? 'bg-amber-100 text-amber-700 ring-2 ring-amber-200' : idx === 1 ? 'bg-slate-200 text-slate-600' : idx === 2 ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-500'}`}>
                  {idx + 1}
                </span>
                <span className="font-medium text-slate-800">{student.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-emerald-600 tabular-nums">{student.average}</span>
                <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${gradeBadge[student.averageGrade] || 'bg-slate-100 text-slate-600'}`}>
                  {student.averageGrade}
                </span>
              </div>
            </div>
          ))}
          {topPerformers.length === 0 && (
            <div className="px-6 py-8 text-center text-slate-400 text-sm">No data available</div>
          )}
        </div>
      </div>

      {/* Needs Improvement */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-slate-800">Needs Improvement</h2>
            <p className="text-xs text-slate-500">Students averaging below 50 marks</p>
          </div>
        </div>

        <div className="divide-y divide-slate-50">
          {needsImprovement.map((student) => (
            <div key={student.name} className="px-6 py-3.5 flex items-center justify-between hover:bg-red-50/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-red-500" />
                </div>
                <span className="font-medium text-slate-800">{student.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-red-600 tabular-nums">{student.average}</span>
                <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${gradeBadge[student.averageGrade] || 'bg-slate-100 text-slate-600'}`}>
                  {student.averageGrade}
                </span>
              </div>
            </div>
          ))}
          {needsImprovement.length === 0 && (
            <div className="px-6 py-8 text-center">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-2">
                <Trophy className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="text-sm text-emerald-600 font-medium">All students are performing above the threshold</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
