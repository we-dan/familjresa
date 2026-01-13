import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Checklist, Document } from '@/types';

interface DataContextType {
  checklists: Checklist[];
  setChecklists: (checklists: Checklist[]) => void;
  documents: Document[];
  setDocuments: (documents: Document[]) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [checklists, setChecklistsState] = useState<Checklist[]>(() => {
    const saved = localStorage.getItem('family-travel-checklists');
    return saved ? JSON.parse(saved) : [];
  });

  const [documents, setDocumentsState] = useState<Document[]>(() => {
    const saved = localStorage.getItem('family-travel-documents');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('family-travel-checklists', JSON.stringify(checklists));
  }, [checklists]);

  useEffect(() => {
    localStorage.setItem('family-travel-documents', JSON.stringify(documents));
  }, [documents]);

  const setChecklists = (newChecklists: Checklist[]) => {
    setChecklistsState(newChecklists);
  };

  const setDocuments = (newDocuments: Document[]) => {
    setDocumentsState(newDocuments);
  };

  return (
    <DataContext.Provider value={{ checklists, setChecklists, documents, setDocuments }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData måste användas inom DataProvider');
  }
  return context;
}
