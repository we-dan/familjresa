import { useState, useMemo } from 'react';
import { City, Attraction } from '@/types';
import { attractionsData, getCategoryLabel } from '@/lib/attractions-data';
import { CitySelector } from '@/components/city-selector';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Star, MapPin, Filter } from 'lucide-react';

export function AttractionsPage() {
  const [selectedCity, setSelectedCity] = useState<City>('las-vegas');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Attraction['category'] | 'all'>('all');
  const [visitedIds, setVisitedIds] = useState<Set<string>>(new Set());

  const categories: Array<Attraction['category'] | 'all'> = [
    'all',
    'entertainment',
    'restaurant',
    'museum',
    'nature',
    'shopping',
    'other',
  ];

  const filteredAttractions = useMemo(() => {
    return attractionsData.filter((attraction) => {
      const matchesCity = attraction.city === selectedCity;
      const matchesSearch =
        searchQuery === '' ||
        attraction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        attraction.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === 'all' || attraction.category === selectedCategory;

      return matchesCity && matchesSearch && matchesCategory;
    });
  }, [selectedCity, searchQuery, selectedCategory]);

  const toggleVisited = (id: string) => {
    const newVisited = new Set(visitedIds);
    if (newVisited.has(id)) {
      newVisited.delete(id);
    } else {
      newVisited.add(id);
    }
    setVisitedIds(newVisited);
  };

  return (
    <div className="space-y-6 p-6 pb-24">
      <h1 className="text-3xl font-bold">Attraktioner & Sevärdheter</h1>

      <CitySelector selectedCity={selectedCity} onCityChange={setSelectedCity} />

      <div className="space-y-4">
        <div className="relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={24}
            aria-hidden="true"
          />
          <input
            type="text"
            placeholder="Sök attraktioner..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-14 pr-4 py-4 rounded-2xl border border-border bg-background text-lg min-h-[64px]"
            aria-label="Sök attraktioner"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <Filter size={20} className="text-muted-foreground flex-shrink-0" aria-hidden="true" />
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? 'default' : 'outline'}
              className="rounded-full min-h-[44px] px-5 whitespace-nowrap"
            >
              {category === 'all' ? 'Alla' : getCategoryLabel(category)}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredAttractions.length === 0 && (
          <Card className="p-8 text-center rounded-2xl">
            <p className="text-muted-foreground text-lg">
              Inga attraktioner hittades. Prova en annan sökning!
            </p>
          </Card>
        )}

        {filteredAttractions.map((attraction) => {
          const isVisited = visitedIds.has(attraction.id);
          return (
            <Card
              key={attraction.id}
              className={`p-6 space-y-3 rounded-2xl transition-all ${
                isVisited ? 'opacity-75 bg-accent/50' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold">{attraction.name}</h2>
                  <p className="text-muted-foreground mt-2 text-base leading-relaxed">
                    {attraction.description}
                  </p>
                </div>
                <Button
                  onClick={() => toggleVisited(attraction.id)}
                  variant={isVisited ? 'default' : 'outline'}
                  size="icon"
                  className="min-h-[56px] min-w-[56px] rounded-2xl flex-shrink-0"
                  aria-label={isVisited ? 'Markera som ej besökt' : 'Markera som besökt'}
                  aria-pressed={isVisited}
                >
                  {isVisited ? '✓' : '○'}
                </Button>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium min-h-[40px]">
                  {getCategoryLabel(attraction.category)}
                </span>
                {attraction.rating && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm min-h-[40px]">
                    <Star size={16} className="fill-current" aria-hidden="true" />
                    {attraction.rating.toFixed(1)}
                  </span>
                )}
              </div>

              {attraction.address && (
                <div className="flex items-start gap-2 text-sm text-muted-foreground pt-1">
                  <MapPin size={18} className="flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{attraction.address}</span>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      <div className="text-center text-sm text-muted-foreground pt-4">
        Visar {filteredAttractions.length} attraktioner
      </div>
    </div>
  );
}
