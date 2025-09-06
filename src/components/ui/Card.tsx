import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  onClick,
}) => (
  <div
    className={`bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1 ${
      onClick ? "cursor-pointer" : ""
    } ${className}`}
    onClick={onClick}
  >
    {children}
  </div>
);

interface IconCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}

export const IconCard: React.FC<IconCardProps> = ({
  icon,
  title,
  description,
  onClick,
}) => (
  <Card onClick={onClick}>
    <div className="w-12 h-12 bg-blue-500 text-white rounded-xl flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-bold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </Card>
);
