import { MainLayout } from "@/components/layout/MainLayout";
import { MetricsGrid } from "@/components/dashboard/MetricsGrid";
import { ConflictSummary } from "@/components/dashboard/ConflictSummary";
import { ConsensusSummary } from "@/components/dashboard/ConsensusSummary";
import { UncertaintyGauge } from "@/components/dashboard/UncertaintyGauge";
import { ResolutionQuestionsList } from "@/components/dashboard/ResolutionQuestionsList";
import { SourceCredibilityPanel } from "@/components/dashboard/SourceCredibilityPanel";
import { caseInfo } from "@/data/dummyData";

const Index = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Case Dashboard
            </h1>
            <p className="text-muted-foreground">
              {caseInfo.claimant} • Policy {caseInfo.policy_number} • Filed{" "}
              {caseInfo.date_filed}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold gradient-text">
              ${caseInfo.total_claimed.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Total Claimed</p>
          </div>
        </div>

        {/* Metrics Grid */}
        <MetricsGrid />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Conflicts & Consensus */}
          <div className="lg:col-span-2 space-y-6">
            <ConflictSummary />
            <ConsensusSummary />
          </div>

          {/* Right Column - Uncertainty & Questions */}
          <div className="space-y-6">
            <UncertaintyGauge />
            <SourceCredibilityPanel />
          </div>
        </div>

        {/* Resolution Questions */}
        <ResolutionQuestionsList />
      </div>
    </MainLayout>
  );
};

export default Index;
