import { CheckCircle2, Users } from "lucide-react";
import { consensusClusters } from "@/data/dummyData";
import { HowItsMade, techConfigs } from "@/components/HowItsMade";

export const ConsensusSummary = () => {
  return (
    <div className="glass-panel p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-consensus" />
          <h3 className="font-semibold text-foreground">Points of Agreement</h3>
        </div>
        <HowItsMade {...techConfigs.consensusDetection} />
      </div>

      <div className="space-y-3">
        {consensusClusters.map((cluster, index) => (
          <div
            key={cluster.id}
            className="p-4 bg-consensus/5 border border-consensus/20 rounded-lg animate-fade-in glow-consensus"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="flex items-start gap-3">
              <div className="w-1 h-full min-h-[60px] bg-consensus rounded-full" />
              <div className="flex-1 space-y-2">
                <p className="text-sm text-foreground">{cluster.summary}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <Users className="w-3 h-3 text-muted-foreground" />
                  {cluster.sources_agreeing.map((source) => (
                    <span
                      key={source}
                      className="px-2 py-0.5 bg-consensus/10 text-consensus text-xs rounded"
                    >
                      {source}
                    </span>
                  ))}
                  <span className="ml-auto text-xs font-mono text-muted-foreground">
                    {(cluster.confidence * 100).toFixed(0)}% confidence
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
