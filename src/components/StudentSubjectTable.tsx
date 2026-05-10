import { StudentData } from '../utils/grades';

interface StudentSubjectTableProps {
  students: StudentData[];
  subjects: string[];
}

const gradeBadge: Record<string, string> = {
  'A+': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'A': 'bg-emerald-50 text-emerald-600 border-emerald-100',
  'B+': 'bg-sky-100 text-sky-700 border-sky-200',
  'B': 'bg-sky-50 text-sky-600 border-sky-100',
  'C+': 'bg-amber-100 text-amber-700 border-amber-200',
  'C': 'bg-orange-100 text-orange-700 border-orange-200',
};

export default function StudentSubjectTable({ students, subjects }: StudentSubjectTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100">
        <h2 className="text-lg font-semibold text-slate-800">Student Results</h2>
        <p className="text-sm text-slate-500 mt-0.5">
          {students.length} students &middot; {subjects.length} subjects &middot; Organized subject-wise
        </p>
      </div>

      <div className="overflow-x-auto scrollbar-thin">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 font-semibold text-slate-600 text-xs uppercase tracking-wider min-w-[200px]">Student Name</th>
              <th className="px-6 py-4 font-semibold text-slate-600 text-xs uppercase tracking-wider">Subject Name</th>
              <th className="px-6 py-4 font-semibold text-slate-600 text-xs uppercase tracking-wider text-center">Marks</th>
              <th className="px-6 py-4 font-semibold text-slate-600 text-xs uppercase tracking-wider text-center">Grade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {students.map((student) => {
              // Combine subjects and the "Overall" summary
              const rows = [
                ...subjects.map(subName => ({
                  isOverall: false,
                  name: subName,
                  marks: student.subjects[subName],
                  grade: student.grades[subName],
                })),
                {
                  isOverall: true,
                  name: 'Overall Average',
                  marks: student.average,
                  grade: student.averageGrade,
                }
              ];

              return rows.map((row, rowIndex) => (
                <tr key={`${student.name}-${row.name}`} className={`hover:bg-slate-50/50 transition-colors ${row.isOverall ? 'bg-slate-50/80 font-medium' : ''}`}>
                  {rowIndex === 0 && (
                    <td 
                      rowSpan={rows.length} 
                      className="px-6 py-4 align-top border-r border-slate-100 bg-white"
                    >
                      <div className="font-semibold text-slate-800 sticky top-4">
                        {student.name}
                      </div>
                    </td>
                  )}
                  <td className="px-6 py-3 text-slate-700">{row.name}</td>
                  <td className="px-6 py-3 text-center">
                    <span className={`font-semibold tabular-nums ${row.isOverall ? 'text-slate-800 text-base' : 'text-slate-600'}`}>
                      {row.marks}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-center">
                    <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-semibold border ${gradeBadge[row.grade] || 'bg-slate-100 text-slate-600 border-slate-200'} ${row.isOverall ? 'shadow-sm' : ''}`}>
                      {row.grade}
                    </span>
                  </td>
                </tr>
              ));
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
