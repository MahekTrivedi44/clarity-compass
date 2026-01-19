import { useState } from "react";
import { resolutionQuestions, claims } from "@/data/dummyData";
import { HowItsMade, techConfigs } from "@/components/HowItsMade";
import {
  AlertTriangle,
  ArrowUp,
  ChevronDown,
  ChevronRight,
  Link as LinkIcon,
  MessageCircle,
} from "lucide-react";

export const ResolutionQuestionsDetail = () => {
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(
    resolutionQuestions[0]?.id || null
  );

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case "critical":
        return {
          badge: "bg-destructive/10 text-destructive border-destructive/30",
          indicator: "bg-destructive",
          icon: <AlertTriangle className="w-4 h-4" />,
        };
      case "high":
        return {
          badge: "bg-conflict/10 text-conflict border-conflict/30",
          indicator: "bg-conflict",
          icon: <ArrowUp className="w-4 h-4" />,
        };
      case "medium":
        return {
          badge: "bg-primary/10 text-primary border-primary/30",
          indicator: "bg-primary",
          icon: null,
        };
      default:
        return {
          badge: "bg-muted text-muted-foreground border-border",
          indicator: "bg-muted-foreground",
          icon: null,
        };
    }
  };

  const getRelatedClaims = (claimIds: string[]) => {
    return claims.filter((c) => claimIds.includes(c.claim_id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">
            Resolution Questions
          </h2>
          <p className="text-sm text-muted-foreground">
            Answer these questions to reduce uncertainty and resolve conflicts
          </p>
        </div>
        <HowItsMade {...techConfigs.resolutionQuestions} />
      </div>

      <div className="space-y-4">
        {resolutionQuestions.map((question, index) => {
          const styles = getPriorityStyles(question.priority);
          const relatedClaims = getRelatedClaims(question.related_claims);
          const isExpanded = expandedQuestion === question.id;

          return (
            <div
              key={question.id}
              className="glass-panel overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() =>
                  setExpandedQuestion(isExpanded ? null : question.id)
                }
                className="w-full p-5 flex items-start gap-4 text-left hover:bg-secondary/30 transition-colors"
              >
                <div className={`w-1 h-full min-h-[40px] rounded-full ${styles.indicator}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${styles.badge}`}
                    >
                      {styles.icon}
                      {question.priority.toUpperCase()}
                    </span>
                    <span className="px-2 py-1 bg-secondary text-xs text-secondary-foreground rounded">
                      {question.category}
                    </span>
                  </div>
                  <p className="text-foreground font-medium">{question.question}</p>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                )}
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 space-y-4 border-t border-border animate-fade-in">
                  {/* Context */}
                  <div className="pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageCircle className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">
                        Context
                      </span>
                    </div>
                    <p className="text-sm text-foreground bg-secondary/30 p-3 rounded-lg">
                      {question.context}
                    </p>
                  </div>

                  {/* Related Claims */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <LinkIcon className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-muted-foreground">
                        Related Claims
                      </span>
                    </div>
                    <div className="space-y-2">
                      {relatedClaims.map((claim) => (
                        <div
                          key={claim.claim_id}
                          className="p-3 bg-secondary/20 rounded-lg text-sm"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-xs text-muted-foreground">
                              {claim.claim_id}
                            </span>
                            <span className="px-1.5 py-0.5 bg-primary/10 text-primary text-xs rounded">
                              {claim.source}
                            </span>
                          </div>
                          <p className="text-foreground">{claim.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-2">
                    <button className="flex-1 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                      Record Answer
                    </button>
                    <button className="flex-1 py-2.5 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors">
                      Mark for Follow-up
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
