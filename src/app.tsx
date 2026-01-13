import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from '@/components/providers/theme';
import { Navigation } from '@/components/navigation';
import { OverviewPage } from '@/pages/overview-page';
import { ChecklistsPage } from '@/pages/checklists-page';
import { AttractionsPage } from '@/pages/attractions-page';
import { DocumentsPage } from '@/pages/documents-page';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1 overflow-auto">{children}</main>
      <Navigation />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="light" storageKey="family-travel-theme">
        <Layout>
          <Routes>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/checklists" element={<ChecklistsPage />} />
            <Route path="/attractions" element={<AttractionsPage />} />
            <Route path="/documents" element={<DocumentsPage />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}