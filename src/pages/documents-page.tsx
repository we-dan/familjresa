import { useState } from 'react';
import { Document } from '@/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, FileText, Plane, CreditCard, Shield } from 'lucide-react';

const documentTypeIcons = {
  passport: Plane,
  ticket: Plane,
  booking: CreditCard,
  insurance: Shield,
  other: FileText,
};

const documentTypeLabels: Record<Document['type'], string> = {
  passport: 'Pass',
  ticket: 'Biljett',
  booking: 'Bokning',
  insurance: 'Försäkring',
  other: 'Övrigt',
};

export function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Pass - Anna',
      type: 'passport',
      description: 'Giltigt till 2028',
      familyMember: 'Anna',
      uploadedAt: new Date(),
    },
    {
      id: '2',
      name: 'Hotellbokning Las Vegas',
      type: 'booking',
      description: 'Bellagio Hotel, 5 nätter',
      uploadedAt: new Date(),
    },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newDoc, setNewDoc] = useState({
    name: '',
    type: 'other' as Document['type'],
    description: '',
    familyMember: '',
  });

  const handleAddDocument = () => {
    if (!newDoc.name.trim()) return;

    const document: Document = {
      id: Date.now().toString(),
      name: newDoc.name,
      type: newDoc.type,
      description: newDoc.description,
      familyMember: newDoc.familyMember,
      uploadedAt: new Date(),
    };

    setDocuments([document, ...documents]);
    setNewDoc({ name: '', type: 'other', description: '', familyMember: '' });
    setIsAdding(false);
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter((d) => d.id !== id));
  };

  const groupedDocuments = documents.reduce((acc, doc) => {
    if (!acc[doc.type]) {
      acc[doc.type] = [];
    }
    acc[doc.type].push(doc);
    return acc;
  }, {} as Record<Document['type'], Document[]>);

  return (
    <div className="space-y-6 p-6 pb-24">
      <div className="flex justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">Resehandlingar</h1>
        <Button
          onClick={() => setIsAdding(true)}
          size="lg"
          className="min-h-[56px] min-w-[56px] rounded-2xl"
          aria-label="Lägg till dokument"
        >
          <Plus size={24} />
        </Button>
      </div>

      {isAdding && (
        <Card className="p-6 space-y-4 rounded-2xl">
          <h2 className="text-xl font-semibold">Lägg till dokument</h2>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Dokumentnamn..."
              value={newDoc.name}
              onChange={(e) => setNewDoc({ ...newDoc, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-lg min-h-[56px]"
              autoFocus
            />
            <select
              value={newDoc.type}
              onChange={(e) => setNewDoc({ ...newDoc, type: e.target.value as Document['type'] })}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background min-h-[56px]"
            >
              {Object.entries(documentTypeLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Familjemedlem (valfritt)..."
              value={newDoc.familyMember}
              onChange={(e) => setNewDoc({ ...newDoc, familyMember: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background min-h-[56px]"
            />
            <textarea
              placeholder="Beskrivning (valfritt)..."
              value={newDoc.description}
              onChange={(e) => setNewDoc({ ...newDoc, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background min-h-[80px] resize-none"
              rows={2}
            />
          </div>
          <div className="flex gap-3">
            <Button onClick={handleAddDocument} size="lg" className="flex-1 min-h-[56px] rounded-xl">
              Lägg till
            </Button>
            <Button
              onClick={() => {
                setIsAdding(false);
                setNewDoc({ name: '', type: 'other', description: '', familyMember: '' });
              }}
              variant="outline"
              size="lg"
              className="flex-1 min-h-[56px] rounded-xl"
            >
              Avbryt
            </Button>
          </div>
        </Card>
      )}

      {documents.length === 0 && !isAdding && (
        <Card className="p-8 text-center rounded-2xl">
          <p className="text-muted-foreground text-lg">
            Inga dokument ännu. Lägg till dina resehandlingar här!
          </p>
        </Card>
      )}

      <div className="space-y-6">
        {Object.entries(groupedDocuments).map(([type, docs]) => {
          const Icon = documentTypeIcons[type as Document['type']];
          return (
            <div key={type} className="space-y-3">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Icon size={24} aria-hidden="true" />
                {documentTypeLabels[type as Document['type']]}
              </h2>
              <div className="space-y-3">
                {docs.map((doc) => (
                  <Card key={doc.id} className="p-6 rounded-2xl">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">{doc.name}</h3>
                        {doc.familyMember && (
                          <p className="text-primary mt-1 font-medium">{doc.familyMember}</p>
                        )}
                        {doc.description && (
                          <p className="text-muted-foreground mt-2">{doc.description}</p>
                        )}
                        <p className="text-sm text-muted-foreground mt-3">
                          Tillagd {doc.uploadedAt.toLocaleDateString('sv-SE')}
                        </p>
                      </div>
                      <Button
                        onClick={() => handleDeleteDocument(doc.id)}
                        variant="destructive"
                        size="icon"
                        className="min-h-[48px] min-w-[48px] rounded-xl flex-shrink-0"
                        aria-label="Ta bort dokument"
                      >
                        <Trash2 size={20} />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
