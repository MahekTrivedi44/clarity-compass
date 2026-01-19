import { useState } from "react";
import { Info, X, Cpu, Database, Code, Layers } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface TechItem {
  category: string;
  items: string[];
  icon: React.ReactNode;
}

interface HowItsMadeProps {
  featureName: string;
  description: string;
  techStack: TechItem[];
  specialLogic?: string;
}

export const HowItsMade = ({
  featureName,
  description,
  techStack,
  specialLogic,
}: HowItsMadeProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="tech-button group">
          <Info className="w-3 h-3 group-hover:text-primary transition-colors" />
          <span>How It's Made</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Cpu className="w-5 h-5 text-primary" />
            {featureName}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p>

          <div className="grid gap-4">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="glass-panel p-4 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 rounded bg-primary/10 text-primary">
                    {tech.icon}
                  </div>
                  <h4 className="font-medium text-sm">{tech.category}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tech.items.map((item, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-secondary/50 text-secondary-foreground 
                               text-xs font-mono rounded-md border border-border/50"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {specialLogic && (
            <div className="glass-panel p-4 border-l-2 border-primary">
              <div className="flex items-center gap-2 mb-2">
                <Code className="w-4 h-4 text-primary" />
                <h4 className="font-medium text-sm">Special Logic</h4>
              </div>
              <p className="text-muted-foreground text-sm font-mono leading-relaxed">
                {specialLogic}
              </p>
            </div>
          )}

          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground italic">
              ⚠️ This is a simulated demonstration. In production, these technologies
              would process real documents and perform actual ML inference.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Preset configurations for each feature
export const techConfigs = {
  documentIntake: {
    featureName: "Document Intake & Processing",
    description:
      "Multi-source document ingestion pipeline that extracts text, metadata, and structure from various file formats including PDFs, DOCX, images, and scanned documents.",
    techStack: [
      {
        category: "Document Parsing",
        items: ["PyMuPDF", "pdfplumber", "Apache Tika", "python-docx"],
        icon: <Layers className="w-4 h-4" />,
      },
      {
        category: "OCR & Vision",
        items: ["Tesseract OCR", "EasyOCR", "LayoutLMv3"],
        icon: <Cpu className="w-4 h-4" />,
      },
      {
        category: "Audio Transcription",
        items: ["OpenAI Whisper", "AssemblyAI"],
        icon: <Code className="w-4 h-4" />,
      },
      {
        category: "Storage",
        items: ["PostgreSQL", "MongoDB", "S3"],
        icon: <Database className="w-4 h-4" />,
      },
    ],
    specialLogic:
      "Documents are normalized to a common schema with source attribution, temporal metadata extraction, and automatic language detection.",
  },

  claimExtraction: {
    featureName: "Claim Extraction & Structuring",
    description:
      "Extracts atomic factual claims from unstructured text, converting them into structured representations with entity recognition, temporal grounding, and confidence scoring.",
    techStack: [
      {
        category: "LLM Processing",
        items: ["Claude 3.5 Sonnet", "GPT-4o", "Custom Prompting"],
        icon: <Cpu className="w-4 h-4" />,
      },
      {
        category: "NER & Entity Linking",
        items: ["spaCy", "GLiNER", "Custom Domain Models"],
        icon: <Layers className="w-4 h-4" />,
      },
      {
        category: "Embeddings",
        items: ["all-mpnet-base-v2", "text-embedding-3-large"],
        icon: <Code className="w-4 h-4" />,
      },
      {
        category: "Vector Storage",
        items: ["FAISS", "Chroma", "Pinecone"],
        icon: <Database className="w-4 h-4" />,
      },
    ],
    specialLogic:
      "Two-pass extraction: First pass identifies claims, second pass filters opinions vs facts using NLI classification.",
  },

  conflictDetection: {
    featureName: "Conflict Detection Engine",
    description:
      "Hybrid reasoning system that identifies contradictions, partial conflicts, and ambiguities across document sources using vector similarity, NLI, and rule-based checks.",
    techStack: [
      {
        category: "NLI Models",
        items: ["RoBERTa-MNLI", "BART-MNLI", "DeBERTa-v3"],
        icon: <Cpu className="w-4 h-4" />,
      },
      {
        category: "Similarity Matching",
        items: ["Cosine Similarity", "Sentence-BERT", "Cross-Encoders"],
        icon: <Layers className="w-4 h-4" />,
      },
      {
        category: "Rule Engine",
        items: ["RapidFuzz", "dateutil", "Custom Validators"],
        icon: <Code className="w-4 h-4" />,
      },
      {
        category: "Graph Database",
        items: ["Neo4j", "NetworkX", "GraphQL"],
        icon: <Database className="w-4 h-4" />,
      },
    ],
    specialLogic:
      "Three-stage pipeline: semantic filtering (>0.7 similarity) → NLI classification → numeric/temporal rule validation.",
  },

  conflictMap: {
    featureName: "Conflict Map Visualization",
    description:
      "Interactive force-directed graph visualization showing claim relationships, contradictions, and consensus clusters with real-time filtering and exploration.",
    techStack: [
      {
        category: "Visualization",
        items: ["D3.js", "Cytoscape.js", "Vis.js"],
        icon: <Layers className="w-4 h-4" />,
      },
      {
        category: "Frontend",
        items: ["React", "TypeScript", "Framer Motion"],
        icon: <Code className="w-4 h-4" />,
      },
      {
        category: "Styling",
        items: ["Tailwind CSS", "shadcn/ui", "CSS Variables"],
        icon: <Cpu className="w-4 h-4" />,
      },
      {
        category: "Layout Algorithms",
        items: ["Force-directed", "Hierarchical", "Radial"],
        icon: <Database className="w-4 h-4" />,
      },
    ],
    specialLogic:
      "Nodes colored by source type, edges by relationship type. Clustering algorithm groups consensus claims. Interactive zoom/pan with claim detail on hover.",
  },

  consensusDetection: {
    featureName: "Consensus Detection",
    description:
      "Identifies claims that are supported across multiple sources using clustering algorithms and weighted voting based on source credibility.",
    techStack: [
      {
        category: "Clustering",
        items: ["DBSCAN", "HDBSCAN", "Agglomerative"],
        icon: <Cpu className="w-4 h-4" />,
      },
      {
        category: "Voting & Aggregation",
        items: ["Weighted Voting", "Bayesian Aggregation", "Dempster-Shafer"],
        icon: <Layers className="w-4 h-4" />,
      },
      {
        category: "Similarity",
        items: ["Semantic Similarity", "Entailment Scoring"],
        icon: <Code className="w-4 h-4" />,
      },
      {
        category: "Threshold Tuning",
        items: ["Cross-validation", "F1 Optimization"],
        icon: <Database className="w-4 h-4" />,
      },
    ],
    specialLogic:
      "Claims clustered by semantic similarity (>0.85), then validated with bidirectional entailment. Source agreement weighted by credibility scores.",
  },

  uncertaintyQuantification: {
    featureName: "Uncertainty Quantification",
    description:
      "Calculates confidence scores, uncertainty levels, and risk flags using entropy-based methods and weighted source credibility aggregation.",
    techStack: [
      {
        category: "Uncertainty Methods",
        items: ["Entropy Calculation", "Monte Carlo Dropout", "Ensemble Variance"],
        icon: <Cpu className="w-4 h-4" />,
      },
      {
        category: "Credibility Scoring",
        items: ["Bayesian Priors", "Historical Accuracy", "Bias Detection"],
        icon: <Layers className="w-4 h-4" />,
      },
      {
        category: "Risk Assessment",
        items: ["Threshold Classification", "Anomaly Detection", "Flag Rules"],
        icon: <Code className="w-4 h-4" />,
      },
      {
        category: "Calibration",
        items: ["Platt Scaling", "Isotonic Regression"],
        icon: <Database className="w-4 h-4" />,
      },
    ],
    specialLogic:
      "Uncertainty = H(p) where p is the distribution of evidence. Risk flags triggered when key conflicts exceed severity thresholds.",
  },

  resolutionQuestions: {
    featureName: "Resolution Question Generator",
    description:
      "Generates targeted disambiguation questions to resolve key conflicts, prioritized by impact on overall claim assessment.",
    techStack: [
      {
        category: "LLM Generation",
        items: ["Claude 3.5 Sonnet", "GPT-4o", "Chain-of-Thought Prompting"],
        icon: <Cpu className="w-4 h-4" />,
      },
      {
        category: "Question Ranking",
        items: ["Information Gain", "Conflict Severity Weighting"],
        icon: <Layers className="w-4 h-4" />,
      },
      {
        category: "Context Assembly",
        items: ["RAG Pipeline", "Claim Linking"],
        icon: <Code className="w-4 h-4" />,
      },
      {
        category: "Priority Rules",
        items: ["Business Logic", "Liability Impact Scoring"],
        icon: <Database className="w-4 h-4" />,
      },
    ],
    specialLogic:
      "Questions ranked by: (conflict_severity × liability_impact × resolution_probability). Critical questions target direct contradictions.",
  },

  crossReference: {
    featureName: "Cross-Reference Matrix",
    description:
      "Tabular comparison of claims across all sources and categories, highlighting agreements and discrepancies for rapid analysis.",
    techStack: [
      {
        category: "Data Alignment",
        items: ["Claim Clustering", "Category Mapping", "Entity Resolution"],
        icon: <Cpu className="w-4 h-4" />,
      },
      {
        category: "Visualization",
        items: ["React Table", "Heatmap Encoding", "Conditional Formatting"],
        icon: <Layers className="w-4 h-4" />,
      },
      {
        category: "Conflict Highlighting",
        items: ["Pairwise Comparison", "Threshold Rules"],
        icon: <Code className="w-4 h-4" />,
      },
      {
        category: "Export",
        items: ["CSV", "PDF", "JSON"],
        icon: <Database className="w-4 h-4" />,
      },
    ],
    specialLogic:
      "Matrix cells compare claims by category. Conflict cells highlighted when semantic similarity < 0.6 or numeric difference > 10%.",
  },

  sourceCredibility: {
    featureName: "Source Credibility Analysis",
    description:
      "Evaluates the reliability and potential bias of each document source to weight their claims appropriately in conflict resolution.",
    techStack: [
      {
        category: "Credibility Factors",
        items: ["Official Records", "Professional Standards", "Financial Interest"],
        icon: <Cpu className="w-4 h-4" />,
      },
      {
        category: "Bias Detection",
        items: ["Sentiment Analysis", "Stake Assessment", "Historical Patterns"],
        icon: <Layers className="w-4 h-4" />,
      },
      {
        category: "Scoring Model",
        items: ["Multi-factor Weighting", "Calibrated Probabilities"],
        icon: <Code className="w-4 h-4" />,
      },
      {
        category: "Visualization",
        items: ["Radar Charts", "Trust Indicators"],
        icon: <Database className="w-4 h-4" />,
      },
    ],
    specialLogic:
      "Credibility = base_reliability × (1 - bias_risk). Official records get base 0.95+, interested parties capped at 0.80.",
  },
};
