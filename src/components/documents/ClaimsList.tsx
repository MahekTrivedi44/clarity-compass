import { useState } from "react";
import { claims } from "@/data/dummyData";
import { HowItsMade, techConfigs } from "@/components/HowItsMade";
import { ChevronDown, ChevronRight, Tag, Clock, User } from "lucide-react";

export const ClaimsList = () => {
  const [expandedClaim, setExpandedClaim] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const categories = [...new Set(claims.map((c) => c.category))];
  const filteredClaims = categoryFilter
    ? claims.filter((c) => c.category === categoryFilter)
    : claims;

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Damage: "bg-conflict/10 text-conflict",
      Timeline: "bg-primary/10 text-primary",
      Location: "bg-consensus/10 text-consensus",
      Cost: "bg-uncertainty/10 text-uncertainty",
      Liability: "bg-destructive/10 text-destructive",
      Witness: "bg-secondary text-secondary-foreground",
    };
    return colors[category] || "bg-secondary text-secondary-foreground";
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return "text-consensus";
    if (confidence >= 0.7) return "text-primary";
    if (confidence >= 0.5) return "text-conflict";
    return "text-destructive";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">
          Extracted Claims ({filteredClaims.length})
        </h3>
        <div className="flex items-center gap-2">
          <select
            value={categoryFilter || ""}
            onChange={(e) => setCategoryFilter(e.target.value || null)}
            className="h-8 px-3 bg-secondary border border-border rounded-lg text-sm text-foreground"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <HowItsMade {...techConfigs.claimExtraction} />
        </div>
      </div>

      <div className="space-y-2">
        {filteredClaims.map((claim, index) => (
          <div
            key={claim.claim_id}
            className="glass-panel overflow-hidden animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <button
              onClick={() =>
                setExpandedClaim(
                  expandedClaim === claim.claim_id ? null : claim.claim_id
                )
              }
              className="w-full p-4 flex items-start gap-3 text-left hover:bg-secondary/30 transition-colors"
            >
              {expandedClaim === claim.claim_id ? (
                <ChevronDown className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              ) : (
                <ChevronRight className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs font-mono text-muted-foreground">
                    {claim.claim_id}
                  </span>
                  <span
                    className={`px-2 py-0.5 text-xs rounded ${getCategoryColor(
                      claim.category
                    )}`}
                  >
                    {claim.category}
                  </span>
                  <span
                    className={`text-xs font-mono ${getConfidenceColor(
                      claim.confidence
                    )}`}
                  >
                    {(claim.confidence * 100).toFixed(0)}%
                  </span>
                </div>
                <p className="text-sm text-foreground">{claim.content}</p>
              </div>
            </button>

            {expandedClaim === claim.claim_id && (
              <div className="px-4 pb-4 pt-0 ml-7 space-y-3 border-t border-border animate-fade-in">
                <div className="grid grid-cols-2 gap-4 pt-3">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Attribution:</span>
                    <span className="text-foreground">{claim.attribution}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Temporal:</span>
                    <span className="text-foreground">
                      {claim.temporal_reference
                        ? new Date(claim.temporal_reference).toLocaleString()
                        : "Not specified"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Entities:</span>
                  <div className="flex flex-wrap gap-1">
                    {claim.entities.map((entity) => (
                      <span
                        key={entity}
                        className="px-2 py-0.5 bg-secondary text-xs text-secondary-foreground rounded"
                      >
                        {entity}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Source:</span>
                  <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded">
                    {claim.source}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
