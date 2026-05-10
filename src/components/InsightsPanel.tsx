import { Lightbulb, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Insight } from '../utils/grades';

interface InsightsPanelProps {
  insights: Insight[];
}

const iconMap = {
  positive: TrendingUp,
  negative: TrendingDown,
  neutral: Minus,
};

const styleMap = {
  positive: {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    icon: 'text-emerald-600',
    badge: 'bg-emerald-100 text-emerald-700',
    text: 'text-emerald-800',
  },
  negative: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    icon: 'text-red-600',
    badge: 'bg-red-100 text-red-700',
    text: 'text-red-800',
  },
  neutral: {
    bg: 'bg-sky-50',
    border: 'border-sky-200',
    icon: 'text-sky-600',
    badge: 'bg-sky-100 text-sky-700',
    text: 'text-sky-800',
  },
};

export default function InsightsPanel({ insights }: InsightsPanelProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center">
          <Lightbulb className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-slate-800">AI Insights</h2>
          <p className="text-xs text-slate-500">Smart analysis of student performance patterns</p>
        </div>
      </div>

      <div className="p-5 space-y-3">
        {insights.map((insight, idx) => {
          const Icon = iconMap[insight.type];
          const style = styleMap[insight.type];
          return (
            <div
              key={idx}
              className={`flex items-start gap-3 p-4 rounded-xl border ${style.bg} ${style.border} transition-all duration-200 hover:shadow-sm`}
            >
              <Icon className={`w-5 h-5 mt-0.5 shrink-0 ${style.icon}`} />
              <div className="min-w-0">
                <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${style.badge} mb-1`}>
                  {insight.subject}
                </span>
                <p className={`text-sm leading-relaxed ${style.text}`}>{insight.message}</p>
              </div>
            </div>
          );
        })}
        {insights.length === 0 && (
          <div className="text-center text-slate-400 py-8 text-sm">
            Upload a file to see AI-generated insights
          </div>
        )}
      </div>
    </div>
  );
}
