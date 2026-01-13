import { useState } from 'react';
import { Checklist, ChecklistItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import { getCityLabel } from '@/lib/attractions-data';

export function ChecklistsPage() {
  const [checklists, setChecklists] = useState<Checklist[]>([
    {
      id: '1',
      title: 'Packlista',
      description: 'Allt vi behöver packa för resan',
      city: 'las-vegas',
      items: [
        { id: '1-1', text: 'Pass och ID-handlingar', completed: false, createdAt: new Date() },
        { id: '1-2', text: 'Solglasögon och solkräm', completed: false, createdAt: new Date() },
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [newItemText, setNewItemText] = useState<Record<string, string>>({});

  const handleCreateChecklist = () => {
    if (!newTitle.trim()) return;

    const newChecklist: Checklist = {
      id: Date.now().toString(),
      title: newTitle,
      description: newDescription,
      items: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setChecklists([newChecklist, ...checklists]);
    setNewTitle('');
    setNewDescription('');
    setIsCreating(false);
  };

  const handleDeleteChecklist = (id: string) => {
    setChecklists(checklists.filter((c) => c.id !== id));
  };

  const handleUpdateChecklistTitle = (id: string) => {
    if (!editTitle.trim()) return;

    setChecklists(
      checklists.map((c) =>
        c.id === id ? { ...c, title: editTitle, updatedAt: new Date() } : c
      )
    );
    setEditingId(null);
    setEditTitle('');
  };

  const handleAddItem = (checklistId: string) => {
    const text = newItemText[checklistId]?.trim();
    if (!text) return;

    const newItem: ChecklistItem = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date(),
    };

    setChecklists(
      checklists.map((c) =>
        c.id === checklistId
          ? { ...c, items: [...c.items, newItem], updatedAt: new Date() }
          : c
      )
    );
    setNewItemText({ ...newItemText, [checklistId]: '' });
  };

  const handleToggleItem = (checklistId: string, itemId: string) => {
    setChecklists(
      checklists.map((c) =>
        c.id === checklistId
          ? {
              ...c,
              items: c.items.map((item) =>
                item.id === itemId ? { ...item, completed: !item.completed } : item
              ),
              updatedAt: new Date(),
            }
          : c
      )
    );
  };

  const handleDeleteItem = (checklistId: string, itemId: string) => {
    setChecklists(
      checklists.map((c) =>
        c.id === checklistId
          ? {
              ...c,
              items: c.items.filter((item) => item.id !== itemId),
              updatedAt: new Date(),
            }
          : c
      )
    );
  };

  return (
    <div className="space-y-6 p-6 pb-24">
      <div className="flex justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">Checklistor</h1>
        <Button
          onClick={() => setIsCreating(true)}
          size="lg"
          className="min-h-[56px] min-w-[56px] rounded-2xl"
          aria-label="Skapa ny checklista"
        >
          <Plus size={24} />
        </Button>
      </div>

      {isCreating && (
        <Card className="p-6 space-y-4 rounded-2xl">
          <h2 className="text-xl font-semibold">Ny checklista</h2>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Titel..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background text-lg min-h-[56px]"
              autoFocus
            />
            <input
              type="text"
              placeholder="Beskrivning (valfritt)..."
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-background min-h-[56px]"
            />
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleCreateChecklist}
              size="lg"
              className="flex-1 min-h-[56px] rounded-xl"
            >
              Skapa
            </Button>
            <Button
              onClick={() => {
                setIsCreating(false);
                setNewTitle('');
                setNewDescription('');
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

      <div className="space-y-4">
        {checklists.length === 0 && !isCreating && (
          <Card className="p-8 text-center rounded-2xl">
            <p className="text-muted-foreground text-lg">
              Inga checklistor ännu. Skapa din första!
            </p>
          </Card>
        )}

        {checklists.map((checklist) => (
          <Card key={checklist.id} className="p-6 space-y-4 rounded-2xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                {editingId === checklist.id ? (
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg border border-border bg-background min-h-[48px]"
                      autoFocus
                    />
                    <Button
                      onClick={() => handleUpdateChecklistTitle(checklist.id)}
                      size="icon"
                      className="min-h-[48px] min-w-[48px] rounded-xl"
                      aria-label="Spara"
                    >
                      <Check size={20} />
                    </Button>
                    <Button
                      onClick={() => {
                        setEditingId(null);
                        setEditTitle('');
                      }}
                      variant="outline"
                      size="icon"
                      className="min-h-[48px] min-w-[48px] rounded-xl"
                      aria-label="Avbryt"
                    >
                      <X size={20} />
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-semibold">{checklist.title}</h2>
                    {checklist.description && (
                      <p className="text-muted-foreground mt-1">{checklist.description}</p>
                    )}
                    {checklist.city && (
                      <p className="text-sm text-primary mt-1">
                        {getCityLabel(checklist.city)}
                      </p>
                    )}
                  </>
                )}
              </div>
              {editingId !== checklist.id && (
                <div className="flex gap-2">
                  <Button
                    onClick={() => {
                      setEditingId(checklist.id);
                      setEditTitle(checklist.title);
                    }}
                    variant="outline"
                    size="icon"
                    className="min-h-[48px] min-w-[48px] rounded-xl"
                    aria-label="Redigera"
                  >
                    <Edit2 size={20} />
                  </Button>
                  <Button
                    onClick={() => handleDeleteChecklist(checklist.id)}
                    variant="destructive"
                    size="icon"
                    className="min-h-[48px] min-w-[48px] rounded-xl"
                    aria-label="Ta bort"
                  >
                    <Trash2 size={20} />
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-2">
              {checklist.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-accent/50 transition-colors min-h-[56px]"
                >
                  <button
                    onClick={() => handleToggleItem(checklist.id, item.id)}
                    className={`
                      min-w-[32px] min-h-[32px] rounded-lg border-2 flex items-center justify-center
                      transition-colors
                      ${
                        item.completed
                          ? 'bg-primary border-primary text-primary-foreground'
                          : 'border-border'
                      }
                    `}
                    aria-label={item.completed ? 'Markera som ej klar' : 'Markera som klar'}
                    aria-checked={item.completed}
                    role="checkbox"
                  >
                    {item.completed && <Check size={20} />}
                  </button>
                  <span
                    className={`flex-1 text-lg ${
                      item.completed ? 'line-through text-muted-foreground' : ''
                    }`}
                  >
                    {item.text}
                  </span>
                  <Button
                    onClick={() => handleDeleteItem(checklist.id, item.id)}
                    variant="ghost"
                    size="icon"
                    className="min-h-[40px] min-w-[40px] rounded-lg"
                    aria-label="Ta bort punkt"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-2">
              <input
                type="text"
                placeholder="Lägg till ny punkt..."
                value={newItemText[checklist.id] || ''}
                onChange={(e) =>
                  setNewItemText({ ...newItemText, [checklist.id]: e.target.value })
                }
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddItem(checklist.id);
                  }
                }}
                className="flex-1 px-4 py-3 rounded-xl border border-border bg-background min-h-[56px]"
              />
              <Button
                onClick={() => handleAddItem(checklist.id)}
                size="icon"
                className="min-h-[56px] min-w-[56px] rounded-xl"
                aria-label="Lägg till punkt"
              >
                <Plus size={24} />
              </Button>
            </div>

            <div className="text-sm text-muted-foreground pt-2">
              {checklist.items.filter((i) => i.completed).length} av {checklist.items.length}{' '}
              klara
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
