import { documents } from "@/data/dummyData";
import { HowItsMade, techConfigs } from "@/components/HowItsMade";
import {
  FileText,
  FileSpreadsheet,
  Image,
  Upload,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";

export const DocumentList = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case "claim_statement":
        return FileText;
      case "adjuster_report":
        return FileSpreadsheet;
      case "invoice":
        return FileSpreadsheet;
      case "photo":
        return Image;
      default:
        return FileText;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processed":
        return <CheckCircle2 className="w-4 h-4 text-consensus" />;
      case "processing":
        return <Clock className="w-4 h-4 text-primary animate-pulse" />;
      case "pending":
        return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const getTypeLabel = (type: string) => {
    return type.split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div className="glass-panel p-6 border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer">
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Upload className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              Upload Documents
            </p>
            <p className="text-xs text-muted-foreground">
              PDF, DOCX, TXT, Images • Max 50MB each
            </p>
          </div>
        </div>
      </div>

      {/* Document Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">
            Processed Documents ({documents.length})
          </h3>
          <HowItsMade {...techConfigs.documentIntake} />
        </div>

        <div className="grid gap-4">
          {documents.map((doc, index) => {
            const Icon = getIcon(doc.type);
            return (
              <div
                key={doc.id}
                className="glass-panel p-4 flex items-center gap-4 hover:border-primary/30 transition-all cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground truncate">
                      {doc.name}
                    </p>
                    {getStatusIcon(doc.status)}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{getTypeLabel(doc.type)}</span>
                    <span>•</span>
                    <span>{doc.author}</span>
                    <span>•</span>
                    <span>{doc.date}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-muted-foreground">{doc.size}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
