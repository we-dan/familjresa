import { Attraction } from '@/types';

// Fördefinierad data för attraktioner i Las Vegas och Los Angeles
export const attractionsData: Attraction[] = [
  // Las Vegas
  {
    id: 'lv-1',
    name: 'The Strip',
    description: 'Världsberömd boulevard med kasinon, hotell och underhållning',
    category: 'entertainment',
    city: 'las-vegas',
    address: 'Las Vegas Boulevard South',
    rating: 4.8,
  },
  {
    id: 'lv-2',
    name: 'Bellagio Fountains',
    description: 'Spektakulär vattenshow med musik och ljus',
    category: 'entertainment',
    city: 'las-vegas',
    address: '3600 S Las Vegas Blvd',
    rating: 4.9,
  },
  {
    id: 'lv-3',
    name: 'Red Rock Canyon',
    description: 'Naturreservat med röda klippformationer och vandringsleder',
    category: 'nature',
    city: 'las-vegas',
    address: '1000 Scenic Loop Dr',
    rating: 4.7,
  },
  {
    id: 'lv-4',
    name: 'High Roller',
    description: 'Världens högsta pariserhjul med fantastisk utsikt',
    category: 'entertainment',
    city: 'las-vegas',
    address: '3545 S Las Vegas Blvd',
    rating: 4.6,
  },
  {
    id: 'lv-5',
    name: 'Fremont Street Experience',
    description: 'Historisk gata med LED-tak och liveunderhållning',
    category: 'entertainment',
    city: 'las-vegas',
    address: 'Fremont Street',
    rating: 4.5,
  },
  {
    id: 'lv-6',
    name: 'Mob Museum',
    description: 'Museum om organiserad brottslighet och rättsväsende',
    category: 'museum',
    city: 'las-vegas',
    address: '300 Stewart Ave',
    rating: 4.6,
  },
  {
    id: 'lv-7',
    name: 'Seven Magic Mountains',
    description: 'Färgglad konstinstallation i öknen',
    category: 'other',
    city: 'las-vegas',
    address: 'Las Vegas Blvd S',
    rating: 4.4,
  },
  {
    id: 'lv-8',
    name: 'Gordon Ramsay Hell\'s Kitchen',
    description: 'Restaurang baserad på TV-serien med Gordon Ramsay',
    category: 'restaurant',
    city: 'las-vegas',
    address: '3570 S Las Vegas Blvd',
    rating: 4.5,
  },

  // Los Angeles
  {
    id: 'la-1',
    name: 'Hollywood Sign',
    description: 'Ikonisk skylt i Hollywood Hills',
    category: 'other',
    city: 'los-angeles',
    address: 'Mount Lee, Hollywood Hills',
    rating: 4.7,
  },
  {
    id: 'la-2',
    name: 'Universal Studios Hollywood',
    description: 'Nöjespark och filmstudio med temaattraktioner',
    category: 'entertainment',
    city: 'los-angeles',
    address: '100 Universal City Plaza',
    rating: 4.6,
  },
  {
    id: 'la-3',
    name: 'Santa Monica Pier',
    description: 'Klassisk pir med nöjespark och restauranger',
    category: 'entertainment',
    city: 'los-angeles',
    address: '200 Santa Monica Pier',
    rating: 4.5,
  },
  {
    id: 'la-4',
    name: 'Griffith Observatory',
    description: 'Observatorium med planetarium och fantastisk utsikt',
    category: 'museum',
    city: 'los-angeles',
    address: '2800 E Observatory Rd',
    rating: 4.8,
  },
  {
    id: 'la-5',
    name: 'Getty Center',
    description: 'Konstmuseum med imponerande samling och arkitektur',
    category: 'museum',
    city: 'los-angeles',
    address: '1200 Getty Center Dr',
    rating: 4.8,
  },
  {
    id: 'la-6',
    name: 'Venice Beach',
    description: 'Livlig strand med boardwalk och street performers',
    category: 'nature',
    city: 'los-angeles',
    address: 'Venice Beach Boardwalk',
    rating: 4.4,
  },
  {
    id: 'la-7',
    name: 'The Grove',
    description: 'Utomhusshoppingcenter med butiker och restauranger',
    category: 'shopping',
    city: 'los-angeles',
    address: '189 The Grove Dr',
    rating: 4.5,
  },
  {
    id: 'la-8',
    name: 'Runyon Canyon Park',
    description: 'Populär vandringsled med utsikt över LA',
    category: 'nature',
    city: 'los-angeles',
    address: '2000 N Fuller Ave',
    rating: 4.6,
  },
  {
    id: 'la-9',
    name: 'La Brea Tar Pits',
    description: 'Paleontologiskt museum med fossila fynd',
    category: 'museum',
    city: 'los-angeles',
    address: '5801 Wilshire Blvd',
    rating: 4.5,
  },
  {
    id: 'la-10',
    name: 'In-N-Out Burger',
    description: 'Klassisk västkustburgare, ett måste',
    category: 'restaurant',
    city: 'los-angeles',
    address: 'Flera platser',
    rating: 4.7,
  },
];

export const getCategoryLabel = (category: Attraction['category']): string => {
  const labels: Record<Attraction['category'], string> = {
    restaurant: 'Restaurang',
    entertainment: 'Underhållning',
    nature: 'Natur',
    museum: 'Museum',
    shopping: 'Shopping',
    other: 'Övrigt',
  };
  return labels[category];
};

export const getCityLabel = (city: City): string => {
  return city === 'las-vegas' ? 'Las Vegas' : 'Los Angeles';
};

export const getCityEmoji = (city: City): string => {
  return city === 'las-vegas' ? '🎰' : '🌴';
};

type City = 'las-vegas' | 'los-angeles';
