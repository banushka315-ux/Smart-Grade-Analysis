import { useState, useEffect } from 'react';
import { Download, Upload as UploadIcon, Moon, Sun, AlertTriangle, GraduationCap, BarChart3, CheckCircle2, XCircle, Sparkles } from 'lucide-react';
import FileUpload from './components/FileUpload';
import VisualAnalytics from './components/VisualAnalytics';
import SubjectGradeDistribution from './components/SubjectGradeDistribution';

// --- Types ---
export interface AnalysisData {
  summary: {
    totalAppeared: number;
    totalPass: number;
    totalPromoted: number;
    totalFail: number;
    passPercentage: string;
    promotedPercentage: string;
    classDistribution: { distinction: number; firstClass: number; secondClass: number; };
    failureDistribution: { '1': number; '2': number; '3': number; '>3': number; };
  };
  subjectWiseAnalysis: {
    subjectCode: string;
    type: string;
    appeared: number;
    passed: number;
    passingPercentage: string;
    gradeDistribution: Record<string, number>;
  }[];
  students: {
    enrollmentNo: string;
    name: string;
    grades: Record<string, string>;
    sgpa: number;
    cgpa: number;
    result: string;
    failedSubjectsCount: number;
  }[];
  insights: {
    topSubjects: any[];
    weakSubjects: any[];
    toppers: any[];
    atRisk: any[];
    suggestions: string[];
  };
}

export default function App() {
  const [data, setData] = useState<AnalysisData | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleFileLoaded = (analysis: AnalysisData, name: string) => {
    setData(analysis);
    setFileName(name);
  };

  const reset = () => {
    setData(null);
    setFileName('');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-darkBg text-darkText' : 'bg-slate-50 text-slate-900'}`}>
      <header className={`sticky top-0 z-50 border-b ${theme === 'dark' ? 'bg-darkCard/90 border-slate-700' : 'bg-white/90 border-slate-200'} backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">AI Result Dashboard</h1>
              <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>University Gazette Analyzer</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-full hover:bg-slate-500/20 transition-colors">
              {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
            </button>
            {data && (
              <button onClick={reset} className="px-4 py-2 text-sm font-medium bg-rose-500/10 text-rose-500 rounded-lg hover:bg-rose-500/20 transition-colors">
                Reset
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!data ? (
          <div className="max-w-3xl mx-auto mt-12 text-center space-y-8">
            <h2 className={`text-4xl font-extrabold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Automate University Results
            </h2>
            <p className={`text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              Upload your official Excel Gazette. Our AI engine will parse the subjects, calculate statistics, and generate actionable insights instantly.
            </p>
            <FileUpload onFileLoaded={handleFileLoaded} isProcessing={isProcessing} />
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Table A: Overall Summary */}
            <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-darkCard border-slate-700' : 'bg-white border-slate-200'} shadow-sm`}>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-blue-500"/> Overall Result Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-slate-50'}`}>
                  <p className="text-sm text-slate-500 mb-1">Appeared</p>
                  <p className="text-3xl font-bold">{data.summary.totalAppeared}</p>
                </div>
                <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-emerald-900/20' : 'bg-emerald-50'}`}>
                  <p className="text-sm text-emerald-500 mb-1">Pass %</p>
                  <p className="text-3xl font-bold text-emerald-500">{data.summary.passPercentage}%</p>
                  <p className="text-xs text-emerald-600/70 mt-1">{data.summary.totalPass} students</p>
                </div>
                <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-yellow-900/20' : 'bg-yellow-50'}`}>
                  <p className="text-sm text-yellow-500 mb-1">Promoted %</p>
                  <p className="text-3xl font-bold text-yellow-500">{data.summary.promotedPercentage}%</p>
                  <p className="text-xs text-yellow-600/70 mt-1">{data.summary.totalPromoted} students</p>
                </div>
                <div className={`p-4 rounded-xl ${theme === 'dark' ? 'bg-rose-900/20' : 'bg-rose-50'}`}>
                  <p className="text-sm text-rose-500 mb-1">Fail</p>
                  <p className="text-3xl font-bold text-rose-500">{data.summary.totalFail}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className={`text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Class Distribution</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center"><span className="text-sm">Distinction ({'>'}80%)</span><span className="font-medium">{data.summary.classDistribution.distinction}</span></div>
                    <div className="flex justify-between items-center"><span className="text-sm">First Class ({'>'}60%)</span><span className="font-medium">{data.summary.classDistribution.firstClass}</span></div>
                    <div className="flex justify-between items-center"><span className="text-sm">Second Class ({'>'}40%)</span><span className="font-medium">{data.summary.classDistribution.secondClass}</span></div>
                  </div>
                </div>
                <div>
                  <h4 className={`text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Failure Distribution</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center"><span className="text-sm">Failed in 1 subject</span><span className="font-medium">{data.summary.failureDistribution['1']}</span></div>
                    <div className="flex justify-between items-center"><span className="text-sm">Failed in 2 subjects</span><span className="font-medium">{data.summary.failureDistribution['2']}</span></div>
                    <div className="flex justify-between items-center"><span className="text-sm">Failed in 3 subjects</span><span className="font-medium">{data.summary.failureDistribution['3']}</span></div>
                    <div className="flex justify-between items-center"><span className="text-sm">Failed in {'>'}3 subjects</span><span className="font-medium">{data.summary.failureDistribution['>3']}</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Analyzer Panel */}
            <div className={`p-6 rounded-2xl border ${theme === 'dark' ? 'bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-indigo-500/30' : 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200'} shadow-sm`}>
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><Sparkles className="w-5 h-5 text-indigo-500"/> AI Insights & Analytics</h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-3">Top Performers (SGPA)</h4>
                  <div className="space-y-2">
                    {data.insights.toppers.map((t, i) => (
                      <div key={i} className={`flex justify-between items-center p-2 rounded ${theme === 'dark' ? 'bg-slate-800/50' : 'bg-white'}`}>
                        <span className="text-sm font-medium">{t.name}</span>
                        <span className="text-sm font-bold text-emerald-500">{t.sgpa.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-rose-600 dark:text-rose-400 mb-3">Actionable Suggestions</h4>
                  <ul className="space-y-3">
                    {data.insights.suggestions.map((s, i) => (
                      <li key={i} className="flex gap-2 text-sm items-start">
                        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{s}</span>
                      </li>
                    ))}
                    {data.insights.atRisk.length > 0 && (
                      <li className="flex gap-2 text-sm items-start text-rose-500">
                        <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{data.insights.atRisk.length} students are at severe risk (failed {'>='} 3 subjects). Need immediate counseling.</span>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Visual Analytics */}
            <VisualAnalytics data={data} theme={theme} />

            {/* Table B: Subject-wise Analysis */}
            <div className={`rounded-2xl border overflow-hidden ${theme === 'dark' ? 'bg-darkCard border-slate-700' : 'bg-white border-slate-200'} shadow-sm`}>
              <div className="p-6 border-b border-inherit">
                <h3 className="text-lg font-bold flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-blue-500"/> Subject-Wise Analysis</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className={`${theme === 'dark' ? 'bg-slate-800 text-slate-300' : 'bg-slate-50 text-slate-600'}`}>
                    <tr>
                      <th className="px-6 py-4 font-medium uppercase tracking-wider">Sr No</th>
                      <th className="px-6 py-4 font-medium uppercase tracking-wider">Subject Name (Code)</th>
                      <th className="px-6 py-4 font-medium uppercase tracking-wider text-center">TH/PR</th>
                      <th className="px-6 py-4 font-medium uppercase tracking-wider text-center">Appeared</th>
                      <th className="px-6 py-4 font-medium uppercase tracking-wider text-center">Passed</th>
                      <th className="px-6 py-4 font-medium uppercase tracking-wider text-center">Passing %</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-inherit">
                    {data.subjectWiseAnalysis.map((sub, i) => (
                      <tr key={i} className={`hover:bg-slate-500/5 transition-colors`}>
                        <td className="px-6 py-4">{i + 1}</td>
                        <td className="px-6 py-4 font-semibold">{sub.subjectCode}</td>
                        <td className="px-6 py-4 text-center font-medium">
                          <span className={`px-2 py-1 rounded text-xs ${sub.type === 'PR' ? 'bg-purple-500/10 text-purple-500' : 'bg-blue-500/10 text-blue-500'}`}>
                            {sub.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">{sub.appeared}</td>
                        <td className="px-6 py-4 text-center">{sub.passed}</td>
                        <td className="px-6 py-4 text-center font-bold text-emerald-500">{sub.passingPercentage}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* New Feature: Subject Grade Distribution */}
            <SubjectGradeDistribution data={data} theme={theme} />

            {/* Table C: Student Master */}
            <div className={`rounded-2xl border overflow-hidden ${theme === 'dark' ? 'bg-darkCard border-slate-700' : 'bg-white border-slate-200'} shadow-sm`}>
              <div className="p-6 border-b border-inherit">
                <h3 className="text-lg font-bold flex items-center gap-2"><GraduationCap className="w-5 h-5 text-blue-500"/> Student Master Table</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className={`${theme === 'dark' ? 'bg-slate-800 text-slate-300' : 'bg-slate-50 text-slate-600'}`}>
                    <tr>
                      <th className="px-6 py-4 font-medium uppercase tracking-wider whitespace-nowrap">Enrollment No</th>
                      <th className="px-6 py-4 font-medium uppercase tracking-wider whitespace-nowrap min-w-[200px]">Name</th>
                      {data.subjectWiseAnalysis.map(sub => (
                        <th key={sub.subjectCode} className="px-6 py-4 font-medium uppercase tracking-wider text-center whitespace-nowrap">
                          {sub.subjectCode}
                        </th>
                      ))}
                      <th className="px-6 py-4 font-medium uppercase tracking-wider text-center">SGPA</th>
                      <th className="px-6 py-4 font-medium uppercase tracking-wider text-center">CGPA</th>
                      <th className="px-6 py-4 font-medium uppercase tracking-wider text-center">Result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-inherit">
                    {data.students.map((student, i) => (
                      <tr key={i} className={`hover:bg-slate-500/5 transition-colors ${student.result === 'FAIL' ? 'bg-rose-500/5' : ''}`}>
                        <td className="px-6 py-4 whitespace-nowrap">{student.enrollmentNo}</td>
                        <td className="px-6 py-4 font-semibold whitespace-nowrap">{student.name}</td>
                        {data.subjectWiseAnalysis.map(sub => {
                          const grade = student.grades[sub.subjectCode] || '-';
                          return (
                            <td key={sub.subjectCode} className="px-6 py-4 text-center font-medium text-slate-600 dark:text-slate-300">
                              <span className={`px-2 py-1 rounded text-xs ${grade.includes('F') ? 'bg-rose-500/10 text-rose-500' : 'bg-slate-500/10'}`}>
                                {grade}
                              </span>
                            </td>
                          );
                        })}
                        <td className="px-6 py-4 font-mono text-center">{student.sgpa.toFixed(2)}</td>
                        <td className="px-6 py-4 font-mono text-center">{student.cgpa.toFixed(2)}</td>
                        <td className="px-6 py-4 text-center">
                          <span className={`px-2.5 py-1 rounded-md text-xs font-bold
                            ${student.result === 'PASS' ? 'bg-emerald-500/10 text-emerald-500' : 
                              student.result === 'PROMOTED' ? 'bg-yellow-500/10 text-yellow-600' : 
                              'bg-rose-500/10 text-rose-500'}`}>
                            {student.result}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
