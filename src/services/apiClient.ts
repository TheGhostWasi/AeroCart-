/**
 * Centralized API Client configuration.
 * Currently acting as a placeholder for Axios or Fetch configuration.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

export const apiClient = {
  get: async <T>(endpoint: string): Promise<T> => {
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log(`[API] GET ${BASE_URL}${endpoint}`);
    throw new Error("Not implemented - No real backend connected yet.");
  },

  post: async <T>(endpoint: string, data: any): Promise<T> => {
    // Simulate network latency
    await new Promise((resolve) => setTimeout(resolve, 600));
    console.log(`[API] POST ${BASE_URL}${endpoint}`, data);
    throw new Error("Not implemented - No real backend connected yet.");
  },
};
