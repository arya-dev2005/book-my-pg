import React from "react";
import { useAccordion } from "@/hooks/useAccordion";
import { TRANSPORT_DATA } from "@/data/transportData";
import { AccordionItem as AccordionItemType, BaseSectionProps } from "@/types";

interface AccordionItemProps {
  item: AccordionItemType;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  item,
  isOpen,
  onToggle,
}) => (
  <div className="bg-white rounded-xl shadow-md mb-2 overflow-hidden">
    <button
      className="w-full px-6 py-5 text-left hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center"
      onClick={onToggle}
    >
      <span className="font-semibold text-gray-800">{item.title}</span>
      <span className="text-blue-500 font-bold">{isOpen ? "▲" : "▼"}</span>
    </button>
    {isOpen && (
      <div className="px-6 pb-5">
        <pre className="text-gray-600 whitespace-pre-line font-sans text-sm">
          {item.content}
        </pre>
      </div>
    )}
  </div>
);

export const TransportSection: React.FC<BaseSectionProps> = ({ onNavigate }) => {
  const { toggleItem, isOpen } = useAccordion();

  return (
    <div className="animate-fadeIn">
      {TRANSPORT_DATA.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          isOpen={isOpen(item.id)}
          onToggle={() => toggleItem(item.id)}
        />
      ))}
    </div>
  );
};
