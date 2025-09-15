import React, { useState } from "react";
import { Card, Button, Input, TextArea } from "@/components/ui";
import { ContactForm, BaseSectionProps } from "@/types";
import { validateEmail } from "@/utils/helpers";

const SocialLinks: React.FC = () => (
  <div className="flex justify-center gap-4 mb-6">
    <a
      href="#"
      className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl hover:bg-green-600 transition-colors"
    >
      📱
    </a>
    <a
      href="#"
      className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white text-xl hover:bg-pink-600 transition-colors"
    >
      📷
    </a>
    <a
      href="#"
      className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl hover:bg-blue-700 transition-colors"
    >
      💼
    </a>
  </div>
);

export const ContactSection: React.FC<BaseSectionProps> = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<ContactForm>>({});

  const handleInputChange =
    (field: keyof ContactForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    };

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactForm> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      alert("Thank you for your message! We'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <div className="animate-fadeIn">
      <Card>
        <h3 className="text-xl font-bold mb-6 text-gray-800">Get in Touch</h3>
        <div>
          <Input
            label="Name"
            value={formData.name}
            onChange={handleInputChange("name")}
            error={errors.name}
            required
          />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleInputChange("email")}
            error={errors.email}
            required
          />
          <TextArea
            label="Message"
            rows={5}
            value={formData.message}
            onChange={handleInputChange("message")}
            error={errors.message}
            required
          />
          <Button onClick={handleSubmit} className="w-full">
            Send Message
          </Button>
        </div>

        <SocialLinks />

        <div className="text-center text-gray-500 text-sm">
          © 2025 College City Student Guide. Made with ❤️ for students.
        </div>
      </Card>
    </div>
  );
};
