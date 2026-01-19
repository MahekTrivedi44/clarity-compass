import {
  FileText,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { documents, conflictRelations, consensusClusters, resolutionQuestions, uncertaintyMetrics } from "@/data/dummyData";
import { HowItsMade, techConfigs } from "@/components/HowItsMade";

const metrics = [
  {
    label: "Documents Processed",
    value: documents.length,
    change: "+2 today",
    trend: "up",
    icon: FileText,
    color: "primary",
  },
  {
    label: "Conflicts Detected",
    value: conflictRelations.filter(r => r.type === "contradiction" || r.type === "partial_conflict").length,
    change: "3 critical",
    trend: "down",
    icon: AlertTriangle,
    color: "conflict",
  },
  {
    label: "Consensus Points",
    value: consensusClusters.length,
    change: "94% confidence",
    trend: "up",
    icon: CheckCircle2,
    color: "consensus",
  },
  {
    label: "Open Questions",
    value: resolutionQuestions.length,
    change: "2 critical",
    trend: "neutral",
    icon: HelpCircle,
    color: "uncertainty",
  },
];

export const MetricsGrid = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Case Overview</h3>
        <HowItsMade {...techConfigs.documentIntake} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={metric.label}
            className="metric-card animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className={`p-2 rounded-lg bg-${metric.color}/10`}
                style={{
                  backgroundColor:
                    metric.color === "primary"
                      ? "hsl(var(--primary) / 0.1)"
                      : metric.color === "conflict"
                      ? "hsl(var(--conflict) / 0.1)"
                      : metric.color === "consensus"
                      ? "hsl(var(--consensus) / 0.1)"
                      : "hsl(var(--uncertainty) / 0.1)",
                }}
              >
                <metric.icon
                  className="w-5 h-5"
                  style={{
                    color:
                      metric.color === "primary"
                        ? "hsl(var(--primary))"
                        : metric.color === "conflict"
                        ? "hsl(var(--conflict))"
                        : metric.color === "consensus"
                        ? "hsl(var(--consensus))"
                        : "hsl(var(--uncertainty))",
                  }}
                />
              </div>
              {metric.trend === "up" && (
                <TrendingUp className="w-4 h-4 text-consensus" />
              )}
              {metric.trend === "down" && (
                <TrendingDown className="w-4 h-4 text-conflict" />
              )}
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-foreground">{metric.value}</p>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              <p className="text-xs text-muted-foreground">{metric.change}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
