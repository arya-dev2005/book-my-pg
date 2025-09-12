import React from "react";
import { IconCard } from "@/components/ui";
import { BaseSectionProps } from "@/types";

export const CollegeSection: React.FC<BaseSectionProps> = ({ onNavigate }) => (
  <div className="animate-fadeIn">
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <IconCard
        icon="ℹ️"
        title="About College"
        description="Learn about college history, mission, vision, and campus facilities. Get complete information about academic departments and student services."
      />
      <IconCard
        icon="📚"
        title="Courses"
        description="Browse all available undergraduate and postgraduate courses. Find detailed curriculum, admission requirements, and faculty information."
      />
      <IconCard
        icon="🗺️"
        title="Maps & Contact"
        description="Campus map, building locations, and complete contact information. Find directions and important office locations."
      />
    </div>
  </div>
);
