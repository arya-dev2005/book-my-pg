import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = "",
  ...props
}) => (
  <div className={`mb-6 ${className}`}>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label}
    </label>
    <input
      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200"
      {...props}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  className?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  className = "",
  ...props
}) => (
  <div className={`mb-6 ${className}`}>
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label}
    </label>
    <textarea
      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200 resize-vertical"
      {...props}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);
