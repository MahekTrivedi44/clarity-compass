import { AlertTriangle, ArrowRight } from "lucide-react";
import { conflictRelations, claims } from "@/data/dummyData";
import { HowItsMade, techConfigs } from "@/components/HowItsMade";
import { Link } from "react-router-dom";

export const ConflictSummary = () => {
  const criticalConflicts = conflictRelations.filter(
    (r) => r.type === "contradiction" && r.severity === "high"
  );

  const getClaimContent = (claimId: string) => {
    const claim = claims.find((c) => c.claim_id === claimId);
    return claim?.content || "";
  };

  const getClaimSource = (claimId: string) => {
    const claim = claims.find((c) => c.claim_id === claimId);
    return claim?.source || "";
  };

  return (
    <div className="glass-panel p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-conflict" />
          <h3 className="font-semibold text-foreground">Critical Conflicts</h3>
        </div>
        <HowItsMade {...techConfigs.conflictDetection} />
      </div>

      <div className="space-y-3">
        {criticalConflicts.map((conflict, index) => (
          <div
            key={conflict.id}
            className="p-4 bg-conflict/5 border border-conflict/20 rounded-lg animate-fade-in glow-conflict"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="flex items-start gap-3">
              <div className="w-1 h-full min-h-[60px] bg-conflict rounded-full" />
              <div className="flex-1 space-y-2">
                <p className="text-sm text-foreground font-medium">
                  {conflict.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="px-2 py-0.5 bg-secondary rounded">
                    {getClaimSource(conflict.claim_a_id)}
                  </span>
                  <ArrowRight className="w-3 h-3" />
                  <span className="px-2 py-0.5 bg-secondary rounded">
                    {getClaimSource(conflict.claim_b_id)}
                  </span>
                  <span className="ml-auto font-mono">
                    {(conflict.confidence * 100).toFixed(0)}% confidence
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link
        to="/conflict-map"
        className="flex items-center justify-center gap-2 w-full py-2.5 bg-secondary/50 hover:bg-secondary text-foreground rounded-lg transition-colors text-sm font-medium"
      >
        View Full Conflict Map
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};
