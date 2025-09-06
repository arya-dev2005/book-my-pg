import { AccordionItem } from '@/types';

export const TRANSPORT_DATA: AccordionItem[] = [
  {
    id: 'bus',
    title: '🚌 Bus Routes',
    icon: '🚌',
    content: `Main Bus Routes:
• Route 15: College Gate → City Center (Every 15 mins)
• Route 23: College → Railway Station (Every 20 mins)
• Route 7: College → Airport (Every 30 mins)
Bus Timings: 6:00 AM - 11:00 PM`
  },
  {
    id: 'metro',
    title: '🚇 Train & Metro',
    icon: '🚇',
    content: `Nearest Metro Station: College Road Metro (500m walk)
Metro Lines:
• Blue Line: College Road → Central Station
• Green Line: College Road → Business District
Metro Timings: 5:30 AM - 12:00 AM`
  },
  {
    id: 'airport',
    title: '✈️ Airport Connectivity',
    icon: '✈️',
    content: `Distance to Airport: 25 km (45 mins by metro)
Transportation Options:
• Metro: Blue Line direct to Airport
• Bus: Route 7 (Direct service)
• Taxi/Cab: Available 24/7`
  }
];