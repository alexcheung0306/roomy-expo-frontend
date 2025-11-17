import Constants from 'expo-constants';

/**
 * API Configuration
 * 
 * For development on physical devices:
 * - iOS Simulator: Use 'localhost' or '127.0.0.1'
 * - Android Emulator: Use '10.0.2.2' (special IP for Android emulator)
 * - Physical Device: Use your computer's local IP address (e.g., '192.168.1.100')
 * 
 * To find your local IP:
 * - macOS/Linux: Run `ifconfig | grep "inet " | grep -v 127.0.0.1`
 * - Windows: Run `ipconfig` and look for IPv4 Address
 */

// Get the local IP address if available (useful for physical device testing)
const getLocalIP = () => {
  // You can manually set this to your computer's local IP for physical device testing
  // Example: '192.168.1.100'
  return 'localhost';
};

// Determine the API base URL based on the environment
const getApiBaseUrl = () => {
  // Check if we're in development
  const isDev = __DEV__;

  if (isDev) {
    // In development, use localhost or local IP
    const localIP = getLocalIP();
    const port = 5000; // Your backend port
    
    // For web, use localhost
    if (Constants.platform?.web) {
      return `http://localhost:${port}`;
    }
    
    // For iOS Simulator, use localhost
    if (Constants.platform?.ios) {
      return `http://localhost:${port}`;
    }
    
    // For Android Emulator, use 10.0.2.2 (special IP that maps to host's localhost)
    if (Constants.platform?.android) {
      return `http://10.0.2.2:${port}`;
    }
    
    // Fallback to localhost
    return `http://${localIP}:${port}`;
  }

  // In production, use your production API URL
  return process.env.EXPO_PUBLIC_API_URL || 'https://api.roomy.app';
};

export const API_BASE_URL = getApiBaseUrl();

// API endpoints
export const API_ENDPOINTS = {
  // Health check
  health: '/',
  
  // Users
  users: '/api/users',
  
  // Rooms (for future implementation)
  rooms: '/api/rooms',
} as const;

