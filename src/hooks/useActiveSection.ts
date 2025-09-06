import { useState } from 'react';
import { SECTIONS } from '@/data/constants';

export const useActiveSection = (initialSection: string = SECTIONS.HOME) => {
  const [activeSection, setActiveSection] = useState(initialSection);
  
  const changeSection = (section: string) => {
    setActiveSection(section);
  };
  
  return { activeSection, changeSection };
};