import React from 'react';
import { AnalysisData } from '../App';
import { BookOpen } from 'lucide-react';

interface Props {
  data: AnalysisData;
  theme: 'light' | 'dark';
}

const GRADE_ORDER = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'F'];

export default function SubjectGradeDistribution({ data, theme }: Props) {
  return (
    <div className={`rounded-2xl border overflow-hidden ${theme === 'dark' ? 'bg-darkCard border-slate-700' : 'bg-white border-slate-200'} shadow-sm mt-8 animate-in fade-in slide-in-from-bottom-4 duration-700`}>
      <div className="p-6 border-b border-inherit">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-500"/>
          Subject-Wise Grade Distribution Analysis
        </h3>
        <p className={`text-sm mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
          Detailed breakdown of student grades for each individual subject.
        </p>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.subjectWiseAnalysis.map((subject, idx) => {
            const grades = subject.gradeDistribution || {};
            
            // Find max count for progress bar scaling
            const maxCount = Math.max(...GRADE_ORDER.map(g => grades[g] || 0), 1);
            
            return (
              <div 
                key={idx} 
                className={`p-5 rounded-xl border transition-all hover:shadow-md ${theme === 'dark' ? 'bg-slate-800/40 border-slate-700/60 hover:bg-slate-800/70' : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-slate-300'}`}
              >
                <div className="mb-4 pb-3 border-b border-inherit">
                  <h4 className="font-semibold text-[15px] leading-tight flex items-start justify-between gap-3">
                    <span className={theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}>
                      {subject.subjectCode.replace(/\s*\([^)]*\)$/, '')}
                    </span>
                  </h4>
                  <span className={`inline-block mt-1.5 px-2 py-0.5 rounded text-[11px] font-bold font-mono tracking-wider
                    ${theme === 'dark' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-100 text-indigo-700'}`}>
                    {subject.subjectCode.match(/\(([^)]+)\)/)?.[1] || subject.subjectCode}
                  </span>
                </div>
                
                <div className="space-y-2.5">
                  {GRADE_ORDER.map(grade => {
                    const count = grades[grade] || 0;
                    const percentage = (count / maxCount) * 100;
                    
                    // Determine colors based on grade
                    let barColor = 'bg-slate-500';
                    let textColor = theme === 'dark' ? 'text-slate-300' : 'text-slate-600';
                    
                    if (grade === 'A+' || grade === 'A') {
                      barColor = 'bg-emerald-500';
                      textColor = theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600';
                    } else if (grade === 'B+' || grade === 'B') {
                      barColor = 'bg-blue-500';
                      textColor = theme === 'dark' ? 'text-blue-400' : 'text-blue-600';
                    } else if (grade === 'C+' || grade === 'C') {
                      barColor = 'bg-amber-500';
                      textColor = theme === 'dark' ? 'text-amber-400' : 'text-amber-600';
                    } else if (grade === 'F') {
                      barColor = 'bg-rose-500';
                      textColor = theme === 'dark' ? 'text-rose-400' : 'text-rose-600';
                    }

                    return (
                      <div key={grade} className="flex items-center gap-3 text-sm">
                        <div className={`w-6 font-bold text-right ${textColor}`}>
                          {grade}
                        </div>
                        <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${barColor} rounded-full transition-all duration-1000 ease-out`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <div className={`w-6 font-medium text-right ${count > 0 ? (theme === 'dark' ? 'text-slate-300' : 'text-slate-700') : (theme === 'dark' ? 'text-slate-600' : 'text-slate-400')}`}>
                          {count}
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
    </div>
  );
}
