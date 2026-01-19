import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ConflictMapPage from "./pages/ConflictMapPage";
import CrossReferencePage from "./pages/CrossReferencePage";
import DocumentsPage from "./pages/DocumentsPage";
import ResolutionPage from "./pages/ResolutionPage";
import UncertaintyPage from "./pages/UncertaintyPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/conflict-map" element={<ConflictMapPage />} />
          <Route path="/cross-reference" element={<CrossReferencePage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/resolution" element={<ResolutionPage />} />
          <Route path="/uncertainty" element={<UncertaintyPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
