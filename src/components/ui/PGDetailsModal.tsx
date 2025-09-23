import React from 'react';
import Image from "next/image";
import { Modal, StarRating, Button } from './';
import { PGListing } from '@/types';
import { formatCurrency } from '@/utils/helpers';
import { MapPin, Phone, Mail, Wifi, Car, Utensils, Shield, Dumbbell, Home, Zap } from 'lucide-react';

interface PGDetailsModalProps {
  pg: PGListing | null;
  isOpen: boolean;
  onClose: () => void;
  onContact: () => void;
  onWishlist: () => void;
  isWishlisted: boolean;
}

const FacilityIcon: React.FC<{ facility: string }> = ({ facility }) => {
  const iconMap: Record<string, React.ReactNode> = {
    'WiFi': <Wifi size={16} className="text-blue-500" />,
    'Food': <Utensils size={16} className="text-green-500" />,
    'AC': <Zap size={16} className="text-yellow-500" />,
    'Security': <Shield size={16} className="text-red-500" />,
    'Gym': <Dumbbell size={16} className="text-purple-500" />,
    'Parking': <Car size={16} className="text-gray-500" />,
    'Laundry': <Home size={16} className="text-indigo-500" />,
  };

  return (
    <div className="flex items-center gap-2">
      {iconMap[facility] || <Home size={16} className="text-gray-500" />}
      <span className="text-sm text-gray-700">{facility}</span>
    </div>
  );
};

export const PGDetailsModal: React.FC<PGDetailsModalProps> = ({
  pg,
  isOpen,
  onClose,
  onContact,
  onWishlist,
  isWishlisted
}) => {
  if (!pg) return null;

  const handleMapClick = () => {
    if (pg.coordinates) {
      const { lat, lng } = pg.coordinates;
      const mapUrl = `https://www.google.com/maps?q=${lat},${lng}`;
      window.open(mapUrl, '_blank');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={pg.name} size="lg">
      <div className="p-6 pb-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row gap-6 mb-6">
          {/* Image */}
          <div className="md:w-1/2">
            <div className="h-64 rounded-xl overflow-hidden">
              {pg.image ? (
                <Image
                  src={pg.image}
                  alt={pg.name}
                  width={256}
                  height={256}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-white text-4xl bg-gray-200">
                  🏠
                </div>
              )}
            </div>
          </div>
          
          {/* Basic Info */}
          <div className="md:w-1/2 space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{pg.name}</h3>
              <div className="text-3xl font-bold text-blue-500 mb-3">
                {formatCurrency(Math.min(...pg.rooms.map(r => r.price)))} - {formatCurrency(Math.max(...pg.rooms.map(r => r.price)))}
                <span className="text-lg font-normal text-gray-500">/month</span>
              </div>
            </div>

            {/* Rating */}
            {pg.rating && (
              <div>
                <StarRating 
                  rating={pg.rating} 
                  reviewCount={pg.reviewCount}
                  size="md"
                />
              </div>
            )}

            {/* Room Availability */}
            <div className="mb-4">
              <h4 className="text-md font-semibold text-gray-800 mb-2">Room Availability</h4>
              <div className={`text-sm font-medium mb-2 ${pg.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                {pg.isAvailable ? '🟢 Rooms Available' : '🔴 No Rooms Available'}
              </div>
              {pg.isAvailable && (
                <div className="space-y-2">
                  {pg.rooms.map((room) => (
                    <div key={room.type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <span className="font-medium text-gray-800 capitalize">{room.type} Room</span>
                        <div className="text-sm text-gray-600">
                          {room.available} {room.available === 1 ? 'room' : 'rooms'} available
                        </div>
                      </div>
                      <div className="text-blue-600 font-bold">
                        {formatCurrency(room.price)}
                        <span className="text-gray-500 text-sm font-normal">/month</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Location */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin size={16} />
                <span className="text-sm">{pg.distance}</span>
              </div>
              {pg.address && (
                <div className="flex items-start gap-2 text-gray-600">
                  <MapPin size={16} className="mt-0.5" />
                  <span className="text-sm">{pg.address}</span>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button 
                onClick={onWishlist}
                variant={isWishlisted ? "default" : "secondary"}
                className="flex-1"
              >
                {isWishlisted ? "❤️ In Wishlist" : "❤️ Add to Wishlist"}
              </Button>
              <Button onClick={onContact} className="flex-1">
                📞 Contact Owner
              </Button>
            </div>
          </div>
        </div>

        {/* Facilities Section */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Facilities & Amenities</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {pg.facilities.map((facility, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <FacilityIcon facility={facility} />
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
              <Phone size={20} className="text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium text-gray-800">+91 98765 43210</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
              <Mail size={20} className="text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-800">owner@{pg.name.toLowerCase().replace(/\s+/g, '')}.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        {pg.coordinates && (
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Location</h4>
            <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin size={48} className="text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 mb-3">View location on map</p>
                <Button onClick={handleMapClick} variant="secondary">
                  Open in Google Maps
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Additional Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <h4 className="text-lg font-semibold text-gray-800 mb-3">Additional Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p><strong>Check-in Time:</strong> 12:00 PM</p>
              <p><strong>Check-out Time:</strong> 11:00 AM</p>
            </div>
            <div>
              <p><strong>Room Type:</strong> Shared/Double</p>
              <p><strong>Meal Plan:</strong> Available</p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="text-center text-gray-400 text-xs py-2">
          <span>Scroll to see more content</span>
        </div>
      </div>
    </Modal>
  );
};
