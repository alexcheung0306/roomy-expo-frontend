import { api } from './client';
import { API_ENDPOINTS } from './config';

/**
 * User type
 */
export interface User {
  id: number;
  name?: string;
  email?: string;
  [key: string]: any;
}

/**
 * Room type (for future implementation)
 */
export interface Room {
  id: number;
  title?: string;
  description?: string;
  [key: string]: any;
}

/**
 * User API Service
 */
export const userService = {
  /**
   * Get all users
   */
  getAll: async (): Promise<User[]> => {
    return api.get<User[]>(API_ENDPOINTS.users);
  },

  /**
   * Create a new user
   */
  create: async (userData: Omit<User, 'id'>): Promise<User> => {
    return api.post<User>(API_ENDPOINTS.users, userData);
  },

  /**
   * Get a user by ID
   */
  getById: async (id: number): Promise<User> => {
    return api.get<User>(`${API_ENDPOINTS.users}/${id}`);
  },
};

/**
 * Room API Service (for future implementation)
 */
export const roomService = {
  /**
   * Get all rooms
   */
  getAll: async (): Promise<Room[]> => {
    return api.get<Room[]>(API_ENDPOINTS.rooms);
  },

  /**
   * Create a new room
   */
  create: async (roomData: Omit<Room, 'id'>): Promise<Room> => {
    return api.post<Room>(API_ENDPOINTS.rooms, roomData);
  },

  /**
   * Get a room by ID
   */
  getById: async (id: number): Promise<Room> => {
    return api.get<Room>(`${API_ENDPOINTS.rooms}/${id}`);
  },
};

/**
 * Health check
 */
export const healthCheck = async (): Promise<{ message: string }> => {
  return api.get<{ message: string }>(API_ENDPOINTS.health);
};

