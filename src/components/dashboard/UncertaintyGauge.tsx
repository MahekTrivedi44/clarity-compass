import { uncertaintyMetrics } from "@/data/dummyData";
import { HowItsMade, techConfigs } from "@/components/HowItsMade";
import { AlertCircle, TrendingUp } from "lucide-react";

export const UncertaintyGauge = () => {
  const { overall_confidence, uncertainty_level, risk_flag, key_uncertainties } =
    uncertaintyMetrics;

  const getConfidenceColor = (score: number) => {
    if (score >= 0.8) return "text-consensus";
    if (score >= 0.6) return "text-primary";
    if (score >= 0.4) return "text-conflict";
    return "text-destructive";
  };

  const getBarColor = (score: number) => {
    if (score >= 0.8) return "bg-consensus";
    if (score >= 0.6) return "bg-primary";
    if (score >= 0.4) return "bg-conflict";
    return "bg-destructive";
  };

  return (
    <div className="glass-panel p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-uncertainty" />
          <h3 className="font-semibold text-foreground">Uncertainty Analysis</h3>
        </div>
        <HowItsMade {...techConfigs.uncertaintyQuantification} />
      </div>

      {/* Main Gauge */}
      <div className="flex items-center justify-center py-4">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="hsl(var(--secondary))"
              strokeWidth="12"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${overall_confidence * 440} 440`}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className={`text-3xl font-bold ${getConfidenceColor(
                overall_confidence
              )}`}
            >
              {(overall_confidence * 100).toFixed(0)}%
            </span>
            <span className="text-xs text-muted-foreground">Confidence</span>
          </div>
        </div>
      </div>

      {/* Risk Flag */}
      <div className="flex items-center justify-center gap-2 py-2 bg-conflict/10 rounded-lg">
        <AlertCircle className="w-4 h-4 text-conflict" />
        <span className="text-sm font-medium text-conflict">{risk_flag}</span>
      </div>

      {/* Key Uncertainties */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-muted-foreground">
          Key Uncertainty Areas
        </h4>
        {key_uncertainties.map((item, index) => (
          <div key={item.area} className="space-y-1.5">
            <div className="flex items-center justify-between text-sm">
              <span className="text-foreground">{item.area}</span>
              <span className={`font-mono ${getConfidenceColor(item.score)}`}>
                {(item.score * 100).toFixed(0)}%
              </span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className={`h-full ${getBarColor(item.score)} transition-all duration-500 rounded-full`}
                style={{
                  width: `${item.score * 100}%`,
                  animationDelay: `${index * 100}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
