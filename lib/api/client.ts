import { API_BASE_URL } from './config';

/**
 * API Response type
 */
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

/**
 * API Error class
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Make an API request
 */
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    // Handle non-JSON responses
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');

    let data: any;
    if (isJson) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      throw new ApiError(
        data.message || data.error || `HTTP error! status: ${response.status}`,
        response.status,
        data
      );
    }

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    // Handle network errors
    if (error instanceof TypeError && error.message === 'Network request failed') {
      throw new ApiError(
        'Network error: Could not connect to the server. Make sure your backend is running.',
        0,
        error
      );
    }

    throw new ApiError(
      error instanceof Error ? error.message : 'An unknown error occurred',
      0,
      error
    );
  }
}

/**
 * API Client methods
 */
export const api = {
  /**
   * GET request
   */
  get: <T>(endpoint: string, options?: RequestInit): Promise<T> => {
    return request<T>(endpoint, { ...options, method: 'GET' });
  },

  /**
   * POST request
   */
  post: <T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> => {
    return request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  /**
   * PUT request
   */
  put: <T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> => {
    return request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  },

  /**
   * DELETE request
   */
  delete: <T>(endpoint: string, options?: RequestInit): Promise<T> => {
    return request<T>(endpoint, { ...options, method: 'DELETE' });
  },

  /**
   * PATCH request
   */
  patch: <T>(endpoint: string, data?: any, options?: RequestInit): Promise<T> => {
    return request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  },
};

