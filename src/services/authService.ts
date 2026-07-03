import { User } from "../types";

/**
 * Service to handle authentication-related data operations.
 * Simulated with async/await and Promises.
 * Prepares for HttpOnly Cookie-based authentication.
 */

export const authService = {
  /**
   * Checks if the user is currently authenticated via an HttpOnly cookie.
   * Simulates a GET /api/auth/me request.
   */
  checkSession: async (): Promise<User | null> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real scenario, the browser sends the HttpOnly cookie automatically.
        // We simulate a successful session check for a mock user if a "token" is present in logic.
        // For now, we'll return null to simulate an unauthenticated start.
        console.log("[AuthService] Checking session (Cookie-ready)...");
        resolve(null); 
      }, 200);
    });
  },

  /**
   * Logs in a user.
   * Simulates a POST /api/auth/login request.
   */
  login: async (name: string, email: string): Promise<User> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real scenario, the server responds with a Set-Cookie header.
        const mockUser: User = { id: "u1", name, email };
        console.log("[AuthService] Logged in successfully. (Cookie set by server)");
        resolve(mockUser);
      }, 800);
    });
  },

  /**
   * Logs out a user.
   * Simulates a POST /api/auth/logout request.
   */
  logout: async (): Promise<void> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real scenario, the server clears the HttpOnly cookie.
        console.log("[AuthService] Logged out successfully. (Cookie cleared by server)");
        resolve();
      }, 500);
    });
  },
};
