import { MainLayout } from "@/components/layout/MainLayout";
import { UncertaintyGauge } from "@/components/dashboard/UncertaintyGauge";
import { SourceCredibilityPanel } from "@/components/dashboard/SourceCredibilityPanel";
import { HowItsMade, techConfigs } from "@/components/HowItsMade";
import { uncertaintyMetrics } from "@/data/dummyData";
import { AlertCircle, TrendingUp, TrendingDown, Minus } from "lucide-react";

const UncertaintyPage = () => {
  const { key_uncertainties } = uncertaintyMetrics;

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Uncertainty Analysis
            </h1>
            <p className="text-muted-foreground">
              Quantified uncertainty and confidence metrics for this case
            </p>
          </div>
          <HowItsMade {...techConfigs.uncertaintyQuantification} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Gauge */}
          <UncertaintyGauge />

          {/* Source Credibility */}
          <SourceCredibilityPanel />

          {/* Detailed Breakdown */}
          <div className="glass-panel p-5 space-y-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-uncertainty" />
              <h3 className="font-semibold text-foreground">
                Uncertainty Breakdown
              </h3>
            </div>

            <div className="space-y-4">
              {key_uncertainties.map((item) => {
                const trend =
                  item.score >= 0.8
                    ? "up"
                    : item.score <= 0.5
                    ? "down"
                    : "neutral";
                return (
                  <div
                    key={item.area}
                    className="p-4 bg-secondary/30 rounded-lg space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">
                        {item.area}
                      </span>
                      <div className="flex items-center gap-2">
                        {trend === "up" && (
                          <TrendingUp className="w-4 h-4 text-consensus" />
                        )}
                        {trend === "down" && (
                          <TrendingDown className="w-4 h-4 text-conflict" />
                        )}
                        {trend === "neutral" && (
                          <Minus className="w-4 h-4 text-muted-foreground" />
                        )}
                        <span
                          className={`font-mono ${
                            item.score >= 0.8
                              ? "text-consensus"
                              : item.score >= 0.6
                              ? "text-primary"
                              : item.score >= 0.4
                              ? "text-conflict"
                              : "text-destructive"
                          }`}
                        >
                          {(item.score * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Explanation */}
        <div className="glass-panel p-5">
          <h3 className="font-semibold text-foreground mb-3">
            Interpretation Guide
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-consensus/10 rounded-lg border border-consensus/20">
              <p className="font-medium text-consensus mb-1">High Confidence (80%+)</p>
              <p className="text-muted-foreground">
                Strong agreement across sources. Low risk of error.
              </p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg border border-primary/20">
              <p className="font-medium text-primary mb-1">Medium Confidence (60-79%)</p>
              <p className="text-muted-foreground">
                Some disagreement exists. Review recommended.
              </p>
            </div>
            <div className="p-3 bg-conflict/10 rounded-lg border border-conflict/20">
              <p className="font-medium text-conflict mb-1">Low Confidence (&lt;60%)</p>
              <p className="text-muted-foreground">
                Significant conflicts detected. Investigation required.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default UncertaintyPage;
