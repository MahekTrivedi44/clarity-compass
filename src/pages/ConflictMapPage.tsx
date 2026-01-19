import { MainLayout } from "@/components/layout/MainLayout";
import { ConflictMapGraph } from "@/components/conflict-map/ConflictMapGraph";

const ConflictMapPage = () => {
  return (
    <MainLayout>
      <div className="h-[calc(100vh-7rem)] glass-panel overflow-hidden">
        <ConflictMapGraph />
      </div>
    </MainLayout>
  );
};

export default ConflictMapPage;
