import { MainLayout } from "@/components/layout/MainLayout";
import { DocumentList } from "@/components/documents/DocumentList";
import { ClaimsList } from "@/components/documents/ClaimsList";

const DocumentsPage = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Document Processing</h1>
          <p className="text-muted-foreground">
            Upload and process documents to extract claims for analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DocumentList />
          <ClaimsList />
        </div>
      </div>
    </MainLayout>
  );
};

export default DocumentsPage;
