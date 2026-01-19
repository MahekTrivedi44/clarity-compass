import { MainLayout } from "@/components/layout/MainLayout";
import { CrossReferenceMatrix } from "@/components/cross-reference/CrossReferenceMatrix";
import { ClaimsList } from "@/components/documents/ClaimsList";

const CrossReferencePage = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Cross-Reference Analysis</h1>
          <p className="text-muted-foreground">
            Compare claims across all sources to identify agreements and discrepancies
          </p>
        </div>

        <CrossReferenceMatrix />
        
        <ClaimsList />
      </div>
    </MainLayout>
  );
};

export default CrossReferencePage;
