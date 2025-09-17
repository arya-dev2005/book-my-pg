import { AccordionItem } from '@/types';

export const TRANSPORT_DATA: AccordionItem[] = [
  {
    id: 'train',
    title: '🚆 By Train (From Kolkata/Howrah)',
    icon: '🚆',
    content: `• Go to Howrah Junction.
• Board a Howrah → Haldia local/intercity (or to Durgachak if no direct Haldia train at that time).
• Get down at Haldia (or Durgachak).
• Outside the station, take an auto/toto or taxi to “Haldia Institute of Technology, ICARE Complex, Hatiberia.”
• Tell the driver: “HIT / ICARE Complex, Hatiberia”.`
  },
  {
    id: 'bus',
    title: '🚌 By Bus',
    icon: '🚌',
    content: `• From Esplanade (Dharmatala) or Howrah bus terminus, board a bus to Haldia / Durgachak.
• Get down at Haldia (or Durgachak) bus stop/stand.
• Take a shared auto/taxi to HIT (ICARE Complex, Hatiberia).`
  },
  {
    id: 'car_taxi',
    title: '🚗 By Car/Taxi',
    icon: '🚗',
    content: `• Start from Kolkata → take NH16 (Kolkata–Kharagpur).
• Near Kolaghat / Nandakumar, turn onto NH116 toward Haldia.
• Enter Haldia and follow signs / maps to “Haldia Institute of Technology ICARE Complex, Hatiberia.”
• Parking is available near the main gate.`
  },
  {
    id: 'air',
    title: '✈️ By Air',
    icon: '✈️',
    content: `• Land at Kolkata (Netaji Subhas Chandra Bose Intl. Airport – CCU).
• Hire a taxi/app cab → route NH16 → NH116 → Haldia → HIT (ICARE Complex, Hatiberia).`
  }
];