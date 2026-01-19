import { HelpCircle, ChevronRight, AlertTriangle, ArrowUp } from "lucide-react";
import { resolutionQuestions } from "@/data/dummyData";
import { HowItsMade, techConfigs } from "@/components/HowItsMade";
import { Link } from "react-router-dom";

export const ResolutionQuestionsList = () => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-destructive/10 text-destructive border-destructive/30";
      case "high":
        return "bg-conflict/10 text-conflict border-conflict/30";
      case "medium":
        return "bg-primary/10 text-primary border-primary/30";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "critical":
        return <AlertTriangle className="w-3 h-3" />;
      case "high":
        return <ArrowUp className="w-3 h-3" />;
      default:
        return null;
    }
  };

  return (
    <div className="glass-panel p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-primary" />
          <h3 className="font-semibold text-foreground">Resolution Questions</h3>
        </div>
        <HowItsMade {...techConfigs.resolutionQuestions} />
      </div>

      <p className="text-sm text-muted-foreground">
        These questions, if answered, would most significantly reduce uncertainty
        in this case.
      </p>

      <div className="space-y-3">
        {resolutionQuestions.slice(0, 4).map((question, index) => (
          <div
            key={question.id}
            className="p-4 bg-secondary/30 border border-border rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-3">
              <span className="text-lg font-mono text-muted-foreground">
                {index + 1}.
              </span>
              <div className="flex-1 space-y-2">
                <p className="text-sm text-foreground font-medium">
                  {question.question}
                </p>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs rounded-full border ${getPriorityColor(
                      question.priority
                    )}`}
                  >
                    {getPriorityIcon(question.priority)}
                    {question.priority}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {question.category}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        ))}
      </div>

      <Link
        to="/resolution"
        className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm font-medium"
      >
        View All Questions
        <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
};
