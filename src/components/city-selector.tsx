import { City } from '@/types';
import { getCityLabel, getCityEmoji } from '@/lib/attractions-data';

interface CitySelectorProps {
  selectedCity: City;
  onCityChange: (city: City) => void;
}

export function CitySelector({ selectedCity, onCityChange }: CitySelectorProps) {
  const cities: City[] = ['las-vegas', 'los-angeles'];

  return (
    <div className="flex gap-3 w-full max-w-2xl mx-auto">
      {cities.map((city) => (
        <button
          key={city}
          onClick={() => onCityChange(city)}
          className={`
            flex-1 py-4 px-6 rounded-2xl font-semibold text-lg
            transition-all duration-200 min-h-[72px]
            ${
              selectedCity === city
                ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }
          `}
          aria-pressed={selectedCity === city}
        >
          <span className="text-3xl mr-2" role="img" aria-label={getCityLabel(city)}>
            {getCityEmoji(city)}
          </span>
          {getCityLabel(city)}
        </button>
      ))}
    </div>
  );
}
