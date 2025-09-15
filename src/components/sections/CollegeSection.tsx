"use client";
import Image from "next/image";
import { collegeData, quickLinks } from "@/data/collegeData";
import { useAccordion } from "@/hooks/useAccordion";
import {
  Building,
  Book,
  Trophy,
  Users,
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  
  Clock,
  UsersRound,
  CheckCircle,
} from "lucide-react";
import { BaseSectionProps } from "@/types";
import { useState, useRef } from "react";



// Main Component
export const CollegeSection: React.FC<BaseSectionProps> = () => {
  const [activeTab, setActiveTab] = useState<"ug" | "pg" | "res">("ug");
  const { isOpen, toggleItem } = useAccordion();

  // Refs for scrolling
  const sectionRefs = {
    about: useRef<HTMLDivElement>(null),
    achievements: useRef<HTMLDivElement>(null),
    courses: useRef<HTMLDivElement>(null),
    facilities: useRef<HTMLDivElement>(null),
    faculty: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null),
  };

  const handleQuickLinkClick = (id: string) => {
    const ref = sectionRefs[id as keyof typeof sectionRefs];
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="animate-fadeIn space-y-12">
      <HeaderBanner />
      <QuickLinksGrid onLinkClick={handleQuickLinkClick} />

      <div ref={sectionRefs.about}>
        <AboutSection />
      </div>
      <div ref={sectionRefs.achievements}>
        <AchievementsSection />
      </div>
      <div ref={sectionRefs.courses}>
        <CoursesSection activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
      <div ref={sectionRefs.facilities}>
        <FacilitiesSection />
      </div>
      <div ref={sectionRefs.faculty}>
        <FacultySection isOpen={isOpen} toggleItem={toggleItem} />
      </div>
      <div ref={sectionRefs.contact}>
        <ContactSection />
      </div>
    </div>
  );
};

// Sub-components
const HeaderBanner = () => (
  <div
    className="relative h-64 w-full rounded-lg bg-cover bg-center text-white"
    style={{ backgroundImage: `url(${collegeData.campusImage})` }}
  >
    <div className="absolute inset-0 rounded-lg bg-black/50 flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-4xl font-bold">{collegeData.name}</h1>
      <p className="mt-2 text-lg">{collegeData.tagline}</p>
    </div>
  </div>
);

const QuickLinksGrid = ({ onLinkClick }: { onLinkClick: (id: string) => void }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
    {quickLinks.map((link) => (
      <div
        key={link.id}
        onClick={() => onLinkClick(link.id)}
        className="p-4 bg-white rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
      >
        <div className="text-4xl mx-auto mb-2">{link.icon}</div>
        <p className="font-semibold">{link.label}</p>
      </div>
    ))}
  </div>
);

const AboutSection = () => (
  <Section title="About College" icon={<Building />}>
    <p className="text-gray-600  mb-6">{collegeData.about}</p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
      {collegeData.stats.map((stat) => (
        <div key={stat.label} className="p-4 bg-white  rounded-lg">
          <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
          <p className="text-gray-500">{stat.label}</p>
        </div>
      ))}
    </div>
  </Section>
);

const AchievementsSection = () => (
  <Section title="Our Achievements" icon={<Trophy />}>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {collegeData.achievements.map((achievement) => (
        <div key={achievement.title} className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">{achievement.title}</h3>
          <p className="mt-2 text-gray-600">{achievement.description}</p>
        </div>
      ))}
    </div>
  </Section>
);

const CoursesSection = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: "ug" | "pg" | "res";
  setActiveTab: (tab: "ug" | "pg" | "res") => void;
}) => {
  const courses =
    activeTab === "ug"
      ? collegeData.courses.undergraduate
      : activeTab === "pg"
      ? collegeData.courses.postgraduate
      : collegeData.courses.research;

  return (
    <Section title="Courses Offered" icon={<Book />}>
      <div className="flex justify-center border-b border-gray-200 ">
        <button onClick={() => setActiveTab("ug")} className={`px-4 py-2 font-semibold ${activeTab === "ug" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}>Undergraduate</button>
        <button onClick={() => setActiveTab("pg")} className={`px-4 py-2 font-semibold ${activeTab === "pg" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}>Postgraduate</button>
        <button onClick={() => setActiveTab("res")} className={`px-4 py-2 font-semibold ${activeTab === "res" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}>Research</button>
      </div>
      <div className="space-y-4">
        {courses.map((course) => (
          <div key={course.name} className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-800">{course.name}</h4>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2 text-sm text-gray-600">
              <span className="flex items-center gap-2"><Clock size={16} /> {course.duration}</span>
              <span className="flex items-center gap-2"><UsersRound size={16} /> Intake: {course.intake}</span>
              <span className="flex items-center gap-2"><CheckCircle size={16} /> {course.eligibility}</span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const FacilitiesSection = () => (
  <Section title="Hostel & Facilities" icon={<Building />}>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {collegeData.facilities.map((facility) => (
        <div key={facility.name} className="p-4 bg-gray-100 rounded-lg text-center">
          <div className="text-4xl mx-auto mb-2">{facility.icon}</div>
          <h4 className="font-semibold">{facility.name}</h4>
          <p className="text-sm text-gray-500">{facility.description}</p>
        </div>
      ))}
    </div>
  </Section>
);

const FacultySection = ({
  isOpen,
  toggleItem,
}: {
  isOpen: (id: string) => boolean;
  toggleItem: (id: string) => void;
}) => (
  <Section title="Faculty Directory" icon={<Users />}>
    <div className="space-y-2">
      {collegeData.faculty.map((member) => (
        <div key={member.id} className="border border-gray-200 rounded-lg">
          <button
            onClick={() => toggleItem(member.id)}
            className="w-full flex justify-between items-center p-4 text-left"
          >
            <div className="flex items-center gap-4">
              <Image src={member.photo} alt={member.name} width={48} height={48} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <h4 className="font-semibold">{member.name}</h4>
                <p className="text-sm text-gray-500">{member.department} - {member.qualification}</p>
              </div>
            </div>
            <ChevronDown className={`transform transition-transform ${isOpen(member.id) ? "rotate-180" : ""}`} />
          </button>
          {isOpen(member.id) && (
            <div className="p-4 border-t border-gray-200  bg-gray-50">
              <p className="text-gray-600 ">{member.details}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  </Section>
);

const ContactSection = () => (
  <Section title="Contact Us" icon={<Mail />}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Mail size={20} className="text-blue-600" />
          <a href={`mailto:${collegeData.contact.email}`} className="hover:underline">{collegeData.contact.email}</a>
        </div>
        <div className="flex items-center gap-4">
          <Phone size={20} className="text-blue-600" />
          <span>{collegeData.contact.phone}</span>
        </div>
        <div className="flex items-center gap-4">
          <MapPin size={20} className="text-blue-600" />
          <span>{collegeData.contact.address}</span>
        </div>
      </div>
      <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Google Map Placeholder</p>
      </div>
    </div>
  </Section>
);

// Section wrapper for consistent styling
const Section = ({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <section className="py-8 px-4 bg-white rounded-lg shadow-sm">
    <div className="flex items-center gap-3 mb-6">
      <div className="text-blue-600">{icon}</div>
      <h2 className="text-2xl font-bold text-gray-800 ">{title}</h2>
    </div>
    {children}
  </section>
);