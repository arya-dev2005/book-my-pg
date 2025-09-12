import React, { useState, useEffect } from 'react';
import { Card, Button, AdminLoginModal } from '@/components/ui';
import { getSavedMessages } from '@/services/emailService';
import { useAuth } from '@/contexts/AuthContext';

export const AdminSection: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const loadMessages = () => {
    setIsLoading(true);
    const savedMessages = getSavedMessages();
    setMessages(savedMessages.reverse()); // Show newest first
    setIsLoading(false);
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadMessages();
    } else {
      setShowLoginModal(true);
    }
  }, [isAuthenticated]);

  const clearAllMessages = () => {
    if (confirm('Are you sure you want to clear all messages?')) {
      localStorage.removeItem('contactMessages');
      setMessages([]);
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  if (!isAuthenticated) {
    return (
      <>
        <div className="animate-fadeIn">
          <Card>
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Access Denied
              </h3>
              <p className="text-gray-600 mb-6">
                Admin authentication required to view contact messages.
              </p>
              <Button onClick={() => setShowLoginModal(true)}>
                Login as Admin
              </Button>
            </div>
          </Card>
        </div>

        <AdminLoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onSuccess={() => {
            setShowLoginModal(false);
            loadMessages();
          }}
        />
      </>
    );
  }

  return (
    <div className="animate-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Contact Messages</h2>
        <div className="flex gap-2">
          <Button onClick={loadMessages} variant="secondary">
            Refresh
          </Button>
          <Button onClick={clearAllMessages} variant="secondary" className="text-red-600">
            Clear All
          </Button>
          <Button onClick={logout} variant="secondary" className="text-gray-600">
            Logout
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading messages...</p>
        </div>
      ) : messages.length === 0 ? (
        <Card>
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              📭
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No Messages Yet</h3>
            <p className="text-gray-600">Contact form messages will appear here.</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <Card key={message.id} className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{message.name}</h3>
                  <p className="text-blue-600 text-sm">{message.email}</p>
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {formatDate(message.timestamp)}
                </span>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button 
                  variant="secondary" 
                  onClick={() => window.location.href = `mailto:${message.email}`}
                  className="text-sm"
                >
                  Reply
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={() => {
                    const messages = getSavedMessages();
                    const filtered = messages.filter(m => m.id !== message.id);
                    localStorage.setItem('contactMessages', JSON.stringify(filtered));
                    loadMessages();
                  }}
                  className="text-sm text-red-600"
                >
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-8 p-4 bg-blue-50 rounded-xl">
        <h4 className="font-semibold text-gray-800 mb-2">Message Statistics</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">{messages.length}</div>
            <div className="text-gray-600">Total Messages</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">
              {messages.filter(m => new Date(m.timestamp) > new Date(Date.now() - 24 * 60 * 60 * 1000)).length}
            </div>
            <div className="text-gray-600">Last 24 Hours</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-500">
              {messages.filter(m => new Date(m.timestamp) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
            </div>
            <div className="text-gray-600">Last 7 Days</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-500">
              {new Set(messages.map(m => m.email)).size}
            </div>
            <div className="text-gray-600">Unique Emails</div>
          </div>
        </div>
      </div>
    </div>
  );
};
