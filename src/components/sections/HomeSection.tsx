import React from "react";
import {
  GraduationCap,
  Bus,
  Building,
  Pizza,
  Hospital,
  Phone,
} from "lucide-react";
import { IconCard } from "@/components/ui";
import { HeroBanner } from "@/components/layout/HeroBanner";
import { SECTIONS } from "@/data/constants";

interface HomeSectionProps {
  onNavigate: (section: string) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ onNavigate }) => (
  <div className="animate-fadeIn">
    <HeroBanner />
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <IconCard
        icon={<GraduationCap size={24} />}
        title="College Information"
        description="Find everything about your college, courses, and campus details"
        onClick={() => onNavigate(SECTIONS.COLLEGE)}
      />
      <IconCard
        icon={<Bus size={24} />}
        title="Transportation"
        description="Bus routes, metro lines, and travel information"
        onClick={() => onNavigate(SECTIONS.TRANSPORT)}
      />
      <IconCard
        icon={<Building size={24} />}
        title="PG & Hostels"
        description="Find the perfect accommodation near your college"
        onClick={() => onNavigate(SECTIONS.PG)}
      />
      <IconCard
        icon={<Pizza size={24} />}
        title="Food & Dining"
        description="Discover canteens, restaurants, and street food spots"
        onClick={() => onNavigate(SECTIONS.FOOD)}
      />
      <IconCard
        icon={<Hospital size={24} />}
        title="Essential Services"
        description="Hospitals, markets, and emergency contacts"
        onClick={() => onNavigate(SECTIONS.ESSENTIALS)}
      />
      <IconCard
        icon={<Phone size={24} />}
        title="Contact Us"
        description="Get in touch with us for any queries or suggestions"
        onClick={() => onNavigate(SECTIONS.CONTACT)}
      />
    </div>
  </div>
);
