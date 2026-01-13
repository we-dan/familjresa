import { useState } from 'react';
import { Link } from 'react-router-dom';
import { City } from '@/types';
import { CitySelector } from '@/components/city-selector';
import { Card } from '@/components/ui/card';
import { CheckSquare, Search, FileText, ArrowRight, Sun } from 'lucide-react';

export function OverviewPage() {
  const [selectedCity, setSelectedCity] = useState<City>('las-vegas');

  const quickStats = [
    { label: 'Checklistor', value: '3', icon: CheckSquare },
    { label: 'Dokument', value: '5', icon: FileText },
    { label: 'Attraktioner', value: '18', icon: Search },
  ];

  const cityInfo = {
    'las-vegas': {
      description: 'Underhållningshuvudstaden med världskända kasinon och shower',
      highlights: ['The Strip', 'Bellagio Fountains', 'Red Rock Canyon', 'High Roller'],
      icon: '🎰',
      tips: [
        'Bästa tiden att besöka: Oktober-April',
        'Drickspeng förväntas: 15-20%',
        'Gå på shower tidigt - de slutar sent!',
      ],
    },
    'los-angeles': {
      description: 'Stjärnspäckad stad med stränder, underhållning och kultur',
      highlights: ['Hollywood Sign', 'Santa Monica Pier', 'Getty Center', 'Venice Beach'],
      icon: '🌴',
      tips: [
        'Planera för trafik - det tar tid att ta sig runt',
        'Solskydd är viktigt året runt',
        'Många attraktioner kräver förbokning',
      ],
    },
  };

  const currentCity = cityInfo[selectedCity];

  return (
    <div className="space-y-6 p-6 pb-24">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Familjereseguide</h1>
        <p className="text-muted-foreground text-lg">
          Las Vegas & Los Angeles
        </p>
      </div>

      <CitySelector selectedCity={selectedCity} onCityChange={setSelectedCity} />

      <Card className="p-6 space-y-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="flex items-center gap-3">
          <span className="text-5xl" role="img" aria-label={selectedCity}>
            {currentCity.icon}
          </span>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">
              {selectedCity === 'las-vegas' ? 'Las Vegas' : 'Los Angeles'}
            </h2>
            <p className="text-muted-foreground mt-1">{currentCity.description}</p>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <h3 className="font-semibold text-lg">Topp-attraktioner</h3>
          <div className="flex flex-wrap gap-2">
            {currentCity.highlights.map((highlight) => (
              <span
                key={highlight}
                className="px-4 py-2 bg-background rounded-full text-sm font-medium min-h-[40px] flex items-center"
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Sun size={20} aria-hidden="true" />
            Resetips
          </h3>
          <ul className="space-y-2">
            {currentCity.tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-primary font-bold mt-0.5">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </Card>

      <div className="grid grid-cols-3 gap-3">
        {quickStats.map(({ label, value, icon: Icon }) => (
          <Card key={label} className="p-4 text-center rounded-2xl">
            <Icon size={28} className="mx-auto text-primary mb-2" aria-hidden="true" />
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-xs text-muted-foreground mt-1">{label}</div>
          </Card>
        ))}
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Snabbåtkomst</h2>
        <Link to="/checklists">
          <Card className="p-5 rounded-2xl hover:bg-accent/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <CheckSquare size={28} className="text-primary" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold text-lg">Checklistor</h3>
                  <p className="text-sm text-muted-foreground">Håll koll på alla att-göra</p>
                </div>
              </div>
              <ArrowRight size={24} className="text-muted-foreground" aria-hidden="true" />
            </div>
          </Card>
        </Link>

        <Link to="/attractions">
          <Card className="p-5 rounded-2xl hover:bg-accent/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Search size={28} className="text-primary" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold text-lg">Utforska attraktioner</h3>
                  <p className="text-sm text-muted-foreground">Hitta sevärdheter nära dig</p>
                </div>
              </div>
              <ArrowRight size={24} className="text-muted-foreground" aria-hidden="true" />
            </div>
          </Card>
        </Link>

        <Link to="/documents">
          <Card className="p-5 rounded-2xl hover:bg-accent/50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <FileText size={28} className="text-primary" aria-hidden="true" />
                <div>
                  <h3 className="font-semibold text-lg">Resehandlingar</h3>
                  <p className="text-sm text-muted-foreground">Pass, biljetter och bokningar</p>
                </div>
              </div>
              <ArrowRight size={24} className="text-muted-foreground" aria-hidden="true" />
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}
