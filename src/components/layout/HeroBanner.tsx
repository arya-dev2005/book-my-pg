import React from "react";

export const HeroBanner: React.FC = () => (
  <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-2xl p-8 mb-6 text-center">
    <h1 className="text-3xl font-bold mb-3">Welcome to College City!</h1>
    <p className="text-blue-100 mb-6">
      Your ultimate student guide for everything you need around campus
    </p>
    <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto text-4xl">
      🎓
    </div>
  </div>
);
