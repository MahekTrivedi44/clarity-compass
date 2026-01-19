import { Shield, AlertCircle, CheckCircle } from "lucide-react";
import { sourceCredibility } from "@/data/dummyData";
import { HowItsMade, techConfigs } from "@/components/HowItsMade";

export const SourceCredibilityPanel = () => {
  const getBiasColor = (risk: string) => {
    switch (risk) {
      case "Very Low":
        return "text-consensus";
      case "Low":
        return "text-primary";
      case "Medium":
        return "text-conflict";
      case "High":
        return "text-destructive";
      default:
        return "text-muted-foreground";
    }
  };

  const getCredibilityBar = (score: number) => {
    if (score >= 0.9) return "bg-consensus";
    if (score >= 0.8) return "bg-primary";
    if (score >= 0.7) return "bg-conflict";
    return "bg-destructive";
  };

  return (
    <div className="glass-panel p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Source Credibility</h3>
        </div>
        <HowItsMade {...techConfigs.sourceCredibility} />
      </div>

      <div className="space-y-3">
        {sourceCredibility.map((source, index) => (
          <div
            key={source.source}
            className="p-3 bg-secondary/30 rounded-lg animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">
                {source.source}
              </span>
              <span className="text-sm font-mono text-primary">
                {(source.credibility * 100).toFixed(0)}%
              </span>
            </div>
            <div className="h-1.5 bg-secondary rounded-full overflow-hidden mb-2">
              <div
                className={`h-full ${getCredibilityBar(
                  source.credibility
                )} rounded-full transition-all duration-500`}
                style={{ width: `${source.credibility * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">{source.reliability}</span>
              <span className={`flex items-center gap-1 ${getBiasColor(source.bias_risk)}`}>
                {source.bias_risk === "Very Low" || source.bias_risk === "Low" ? (
                  <CheckCircle className="w-3 h-3" />
                ) : (
                  <AlertCircle className="w-3 h-3" />
                )}
                {source.bias_risk} Bias Risk
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
