import { MainLayout } from "@/components/layout/MainLayout";
import { ConfidenceChart } from "@/components/analytics/ConfidenceChart";
import { ConflictTypeChart } from "@/components/analytics/ConflictTypeChart";
import { TimelineChart } from "@/components/analytics/TimelineChart";
import { claims, conflictRelations, consensusClusters, documents } from "@/data/dummyData";

const AnalyticsPage = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground">
            Visual analysis of claims, conflicts, and confidence metrics
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-panel p-4 text-center">
            <p className="text-3xl font-bold gradient-text">{documents.length}</p>
            <p className="text-sm text-muted-foreground">Documents</p>
          </div>
          <div className="glass-panel p-4 text-center">
            <p className="text-3xl font-bold gradient-text">{claims.length}</p>
            <p className="text-sm text-muted-foreground">Claims Extracted</p>
          </div>
          <div className="glass-panel p-4 text-center">
            <p className="text-3xl font-bold text-conflict">{conflictRelations.length}</p>
            <p className="text-sm text-muted-foreground">Relationships</p>
          </div>
          <div className="glass-panel p-4 text-center">
            <p className="text-3xl font-bold text-consensus">{consensusClusters.length}</p>
            <p className="text-sm text-muted-foreground">Consensus Points</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-panel p-5">
            <h3 className="font-semibold text-foreground mb-4">
              Average Confidence by Source
            </h3>
            <ConfidenceChart />
          </div>

          <div className="glass-panel p-5">
            <h3 className="font-semibold text-foreground mb-4">
              Relationship Types Distribution
            </h3>
            <ConflictTypeChart />
          </div>
        </div>

        <div className="glass-panel p-5">
          <h3 className="font-semibold text-foreground mb-4">
            Incident Timeline
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Claims plotted by reported time across sources. Green reference line shows camera-verified time.
          </p>
          <TimelineChart />
        </div>
      </div>
    </MainLayout>
  );
};

export default AnalyticsPage;
