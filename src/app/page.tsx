"use client";

import React from "react";
import { useActiveSection } from "@/hooks/useActiveSection";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { TopNavigation } from "@/components/navigation/TopNavigation";
import { BottomNavigation } from "@/components/navigation/BottomNavigation";
import { HomeSection } from "@/components/sections/HomeSection";
import { CollegeSection } from "@/components/sections/CollegeSection";
import { TransportSection } from "@/components/sections/TransportSection";
import { PGSection } from "@/components/sections/PGSection";
import { FoodSection } from "@/components/sections/FoodSection";
import { EssentialsSection } from "@/components/sections/EssentialsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { WishlistSection } from "@/components/sections/WishlistSection";
import { SECTIONS } from "@/data/constants";

function CollegeCityGuideContent() {
  const { activeSection, changeSection } = useActiveSection();

  const sectionComponents: Record<string, React.ReactNode> = {
    [SECTIONS.HOME]: <HomeSection onNavigate={changeSection} />,
    [SECTIONS.COLLEGE]: <CollegeSection onNavigate={changeSection} />,
    [SECTIONS.TRANSPORT]: <TransportSection onNavigate={changeSection} />,
    [SECTIONS.PG]: <PGSection onNavigate={changeSection} />,
    [SECTIONS.FOOD]: <FoodSection onNavigate={changeSection} />,
    [SECTIONS.ESSENTIALS]: <EssentialsSection onNavigate={changeSection} />,
    [SECTIONS.CONTACT]: <ContactSection onNavigate={changeSection} />,
    [SECTIONS.WISHLIST]: <WishlistSection onNavigate={changeSection} />,
  };

  const CurrentComponent =
    sectionComponents[activeSection] || sectionComponents[SECTIONS.HOME];

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation onNavigate={changeSection} />
      <main className="pt-16 pb-20 px-4 max-w-4xl mx-auto">
        {CurrentComponent}
      </main>
      <BottomNavigation
        activeSection={activeSection}
        onNavigate={changeSection}
      />
    </div>
  );
}

export default function Page() {
  return (
    <WishlistProvider>
      <CollegeCityGuideContent />
    </WishlistProvider>
  );
}
