import React from "react";
import { Card } from "@/components/ui";
import { BaseSectionProps } from "@/types";

export const EssentialsSection: React.FC<BaseSectionProps> = () => (
  <div className="animate-fadeIn">
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <div className="w-12 h-12 bg-red-500 text-white rounded-xl flex items-center justify-center mb-4 text-2xl">
          🏥
        </div>
        <h3 className="text-lg font-bold mb-3 text-gray-800">
          Hospitals & Medical
        </h3>
        <div className="space-y-3 text-sm text-gray-600">
          <div>
            <p className="font-semibold">City Hospital</p>
            <p>2km • 📞 +91-1234567890</p>
          </div>
          <div>
            <p className="font-semibold">Campus Medical Center</p>
            <p>200m • 📞 +91-1234567891</p>
          </div>
          <div>
            <p className="font-semibold">24/7 Pharmacy</p>
            <p>500m • 📞 +91-1234567892</p>
          </div>
        </div>
      </Card>

      <Card>
        <div className="w-12 h-12 bg-green-500 text-white rounded-xl flex items-center justify-center mb-4 text-2xl">
          🛒
        </div>
        <h3 className="text-lg font-bold mb-3 text-gray-800">
          Markets & Shopping
        </h3>
        <div className="space-y-3 text-sm text-gray-600">
          <div>
            <p className="font-semibold">Student Market</p>
            <p>300m • Books, stationery, daily needs</p>
          </div>
          <div>
            <p className="font-semibold">City Mall</p>
            <p>5km • Clothing, electronics, food court</p>
          </div>
          <div>
            <p className="font-semibold">Weekly Bazaar</p>
            <p>1km • Fresh groceries every Tuesday</p>
          </div>
        </div>
      </Card>

      <Card>
        <div className="w-12 h-12 bg-red-600 text-white rounded-xl flex items-center justify-center mb-4 text-2xl">
          🚨
        </div>
        <h3 className="text-lg font-bold mb-3 text-gray-800">
          Emergency Contacts
        </h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>
            <strong>Police:</strong> 100
          </p>
          <p>
            <strong>Fire:</strong> 101
          </p>
          <p>
            <strong>Ambulance:</strong> 108
          </p>
          <p>
            <strong>College Security:</strong> +91-1234567893
          </p>
          <p>
            <strong>Student Helpline:</strong> +91-1234567894
          </p>
        </div>
      </Card>
    </div>
  </div>
);
