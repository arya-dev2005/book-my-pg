export const formatCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN')}/month`;
};

export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};