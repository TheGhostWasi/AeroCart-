import { Product, Question } from "../types";
import { products } from "../data";

/**
 * Service to handle product-related data operations.
 * Simulated with async/await and Promises using local data.
 */

export const productService = {
  /**
   * Fetches a product by ID from the mock database.
   */
  fetchProductById: async (id: string): Promise<Product | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundProduct = products.find((p) => p.id === id);
        resolve(foundProduct);
      }, 400);
    });
  },

  /**
   * Simulates submitting a question to the backend.
   */
  submitQuestion: async (productId: string, questionText: string, askedBy: string): Promise<Question> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newQuestion: Question = {
          id: Date.now(),
          questionText,
          askedBy,
          answerText: "Pending Admin Reply...",
          createdAt: new Date().toISOString().split("T")[0],
        };
        console.log(`[Service] Question submitted for product ${productId}`);
        resolve(newQuestion);
      }, 800);
    });
  },

  /**
   * Simulates submitting a review to the backend.
   */
  submitReview: async (productId: string, reviewData: { name: string; stars: number; comment: string }): Promise<any> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newReview = {
          id: Date.now(),
          ...reviewData,
          date: new Date().toISOString().split("T")[0],
        };
        console.log(`[Service] Review submitted for product ${productId}`);
        resolve(newReview);
      }, 800);
    });
  },
};
