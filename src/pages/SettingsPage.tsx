import { MainLayout } from "@/components/layout/MainLayout";
import { Settings, Database, Cpu, Shield, Bell } from "lucide-react";

const SettingsPage = () => {
  return (
    <MainLayout>
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">
            Configure system preferences and integrations
          </p>
        </div>

        {/* Settings Sections */}
        <div className="space-y-4">
          {/* General */}
          <div className="glass-panel p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Settings className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">General</h3>
                <p className="text-sm text-muted-foreground">Basic system settings</p>
              </div>
            </div>
            <div className="space-y-4 ml-12">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Demo Mode</span>
                <div className="px-3 py-1 bg-consensus/10 text-consensus text-xs rounded-full">
                  Active
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Auto-refresh Dashboard</span>
                <button className="w-10 h-5 bg-primary rounded-full relative">
                  <span className="absolute right-0.5 top-0.5 w-4 h-4 bg-primary-foreground rounded-full" />
                </button>
              </div>
            </div>
          </div>

          {/* Data Sources */}
          <div className="glass-panel p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Database className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Data Sources</h3>
                <p className="text-sm text-muted-foreground">Configure document intake</p>
              </div>
            </div>
            <div className="space-y-3 ml-12">
              <p className="text-sm text-muted-foreground italic">
                ⚠️ In demo mode, synthetic data is used. Production would connect to:
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground" />
                  PostgreSQL for document metadata
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground" />
                  MongoDB for structured claims
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground" />
                  Neo4j for claim relationships
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-muted-foreground" />
                  FAISS/Chroma for vector embeddings
                </div>
              </div>
            </div>
          </div>

          {/* ML Models */}
          <div className="glass-panel p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Cpu className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">ML Models</h3>
                <p className="text-sm text-muted-foreground">AI model configuration</p>
              </div>
            </div>
            <div className="space-y-3 ml-12">
              <p className="text-sm text-muted-foreground italic">
                ⚠️ Simulated in demo. Production models:
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Claim Extraction</span>
                  <span className="font-mono text-foreground">Claude 3.5 Sonnet</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">NLI / Conflict Detection</span>
                  <span className="font-mono text-foreground">RoBERTa-MNLI</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Embeddings</span>
                  <span className="font-mono text-foreground">text-embedding-3-large</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">NER</span>
                  <span className="font-mono text-foreground">spaCy + GLiNER</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="glass-panel p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">Notifications</h3>
                <p className="text-sm text-muted-foreground">Alert preferences</p>
              </div>
            </div>
            <div className="space-y-3 ml-12">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Critical conflicts</span>
                <button className="w-10 h-5 bg-primary rounded-full relative">
                  <span className="absolute right-0.5 top-0.5 w-4 h-4 bg-primary-foreground rounded-full" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">New documents processed</span>
                <button className="w-10 h-5 bg-secondary rounded-full relative">
                  <span className="absolute left-0.5 top-0.5 w-4 h-4 bg-muted-foreground rounded-full" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SettingsPage;
