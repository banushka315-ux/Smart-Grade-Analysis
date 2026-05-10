import { Users, BookOpen, BarChart3, Award, AlertTriangle } from 'lucide-react';
import { StudentData } from '../utils/grades';

interface StatsCardsProps {
  students: StudentData[];
  subjects: string[];
}

export default function StatsCards({ students, subjects }: StatsCardsProps) {
  const totalStudents = students.length;
  const totalSubjects = subjects.length;
  const classAverage =
    students.length > 0
      ? Math.round(
          (students.reduce((a, s) => a + s.average, 0) / students.length) * 10
        ) / 10
      : 0;
  const passRate =
    students.length > 0
      ? Math.round(
          (students.filter((s) => s.averageGrade !== 'Fail').length / students.length) * 100
        )
      : 0;
  const failCount = students.filter((s) => s.averageGrade === 'Fail').length;

  const stats = [
    {
      label: 'Total Students',
      value: totalStudents,
      icon: Users,
      bg: 'bg-sky-50',
      iconBg: 'bg-sky-100',
      iconColor: 'text-sky-600',
    },
    {
      label: 'Subjects',
      value: totalSubjects,
      icon: BookOpen,
      bg: 'bg-emerald-50',
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
    },
    {
      label: 'Class Average',
      value: classAverage,
      icon: BarChart3,
      bg: classAverage >= 70 ? 'bg-emerald-50' : classAverage >= 50 ? 'bg-amber-50' : 'bg-red-50',
      iconBg: classAverage >= 70 ? 'bg-emerald-100' : classAverage >= 50 ? 'bg-amber-100' : 'bg-red-100',
      iconColor: classAverage >= 70 ? 'text-emerald-600' : classAverage >= 50 ? 'text-amber-600' : 'text-red-600',
    },
    {
      label: 'Pass Rate',
      value: `${passRate}%`,
      icon: passRate >= 70 ? Award : AlertTriangle,
      bg: passRate >= 70 ? 'bg-emerald-50' : passRate >= 50 ? 'bg-amber-50' : 'bg-red-50',
      iconBg: passRate >= 70 ? 'bg-emerald-100' : passRate >= 50 ? 'bg-amber-100' : 'bg-red-100',
      iconColor: passRate >= 70 ? 'text-emerald-600' : passRate >= 50 ? 'text-amber-600' : 'text-red-600',
      sub: failCount > 0 ? `${failCount} failing` : undefined,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className={`${stat.bg} rounded-2xl border border-slate-200/60 p-5 hover:shadow-md transition-all duration-200`}
          >
            <div className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center mb-3`}>
              <Icon className={`w-5 h-5 ${stat.iconColor}`} />
            </div>
            <p className="text-2xl font-bold text-slate-800 tabular-nums">{stat.value}</p>
            <p className="text-sm text-slate-500 mt-0.5">{stat.label}</p>
            {stat.sub && (
              <p className="text-xs text-red-500 font-medium mt-1">{stat.sub}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
