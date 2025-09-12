import React, { useState } from 'react';
import { Modal, Button, Input } from './';
import { useAuth } from '@/contexts/AuthContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 500));

    if (login(password)) {
      setPassword('');
      onSuccess();
      onClose();
    } else {
      setError('Invalid password. Please try again.');
    }

    setIsLoading(false);
  };

  const handleClose = () => {
    setPassword('');
    setError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Admin Login" size="sm">
      <div className="p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔐</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Admin Access Required
          </h3>
          <p className="text-gray-600 text-sm">
            Enter admin password to view contact messages
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Admin Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error}
            required
            disabled={isLoading}
            placeholder="Enter admin password"
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !password.trim()}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Verifying...
              </div>
            ) : (
              "Login"
            )}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <div className="flex items-start gap-3">
            <span className="text-yellow-600 text-lg">⚠️</span>
            <div className="text-sm text-yellow-800">
              <p className="font-medium mb-1">Demo Password:</p>
              <p className="font-mono bg-yellow-100 px-2 py-1 rounded">admin123</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};




