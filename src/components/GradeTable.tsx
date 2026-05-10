import { StudentData } from '../utils/grades';

interface GradeTableProps {
  students: StudentData[];
  subjects: string[];
}

const gradeBadge: Record<string, string> = {
  'A+': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'A': 'bg-emerald-50 text-emerald-600 border-emerald-100',
  'B+': 'bg-sky-100 text-sky-700 border-sky-200',
  'B': 'bg-sky-50 text-sky-600 border-sky-100',
  'C+': 'bg-amber-100 text-amber-700 border-amber-200',
  'Fail': 'bg-red-100 text-red-700 border-red-200',
};

export default function GradeTable({ students, subjects }: GradeTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-800">Student-wise Grades</h2>
        <p className="text-sm text-slate-500 mt-0.5">
          {students.length} students &middot; {subjects.length} subjects &middot; Grades assigned automatically
        </p>
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50/80">
              <th className="text-left px-5 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wider sticky left-0 bg-slate-50 z-10">#</th>
              <th className="text-left px-5 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wider sticky left-8 bg-slate-50 z-10 min-w-[140px]">Name</th>
              {subjects.map((subject) => (
                <th key={subject} colSpan={2} className="text-center px-2 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wider border-l border-slate-200">
                  {subject}
                </th>
              ))}
              <th colSpan={2} className="text-center px-2 py-3 font-semibold text-slate-500 text-xs uppercase tracking-wider border-l border-slate-200">
                Overall
              </th>
            </tr>
            <tr className="bg-slate-50/50 border-b border-slate-200">
              <th className="px-5 py-2 sticky left-0 bg-slate-50 z-10" />
              <th className="px-5 py-2 sticky left-8 bg-slate-50 z-10" />
              {subjects.map((subject) => (
                <th key={`${subject}-sub`} className="border-l border-slate-200">
                  <div className="flex">
                    <span className="flex-1 text-center px-2 py-1 text-xs font-medium text-slate-400">Marks</span>
                    <span className="flex-1 text-center px-2 py-1 text-xs font-medium text-slate-400 border-l border-slate-200/60">Grade</span>
                  </div>
                </th>
              ))}
              <th className="border-l border-slate-200">
                <div className="flex">
                  <span className="flex-1 text-center px-2 py-1 text-xs font-medium text-slate-400">Avg</span>
                  <span className="flex-1 text-center px-2 py-1 text-xs font-medium text-slate-400 border-l border-slate-200/60">Grade</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, idx) => {
              const isFail = student.averageGrade === 'Fail';
              return (
                <tr
                  key={student.name}
                  className={`border-b border-slate-100 transition-colors hover:bg-slate-50/60 ${
                    isFail ? 'bg-red-50/30' : ''
                  }`}
                >
                  <td className="px-5 py-3 text-slate-400 text-xs sticky left-0 bg-inherit z-10">{idx + 1}</td>
                  <td className="px-5 py-3 font-medium text-slate-800 sticky left-8 bg-inherit z-10 whitespace-nowrap">{student.name}</td>
                  {subjects.map((subject) => {
                    const grade = student.grades[subject];
                    return (
                      <td key={subject} className="border-l border-slate-100">
                        <div className="flex items-stretch">
                          <span className="flex-1 text-center px-3 py-2 font-medium text-slate-700 tabular-nums">
                            {student.subjects[subject]}
                          </span>
                          <span className="flex-1 text-center px-2 py-2 border-l border-slate-100/60">
                            <span className={`inline-block px-2 py-0.5 rounded-md text-xs font-semibold border ${gradeBadge[grade] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                              {grade}
                            </span>
                          </span>
                        </div>
                      </td>
                    );
                  })}
                  <td className="border-l border-slate-100">
                    <div className="flex items-stretch">
                      <span className={`flex-1 text-center px-3 py-2 font-bold tabular-nums ${isFail ? 'text-red-600' : 'text-slate-800'}`}>
                        {student.average}
                      </span>
                      <span className="flex-1 text-center px-2 py-2 border-l border-slate-100/60">
                        <span className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-bold border ${gradeBadge[student.averageGrade] || 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                          {student.averageGrade}
                        </span>
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
