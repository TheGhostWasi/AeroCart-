import React, { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { productService } from "../services/productService";

const reviewSchema = z.object({
  name: z.string().min(1, "Name is required"),
  comment: z.string().min(5, "Review must be at least 5 characters long"),
  stars: z.number().min(1).max(5),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface Review {
  id: number;
  name: string;
  stars: number;
  comment: string;
  date: string;
}

interface ReviewListProps {
  productId: string;
  reviewsList: Review[];
  averageRating: string | number;
  reviewCount: number;
  isAuthenticated: boolean;
  user: { name: string } | null;
  reviewsSectionRef: React.RefObject<HTMLDivElement>;
  onReviewSubmitted: (newReview: Review) => void;
  onLoginRedirect: () => void;
}

const REVIEWS_PER_PAGE = 4;

export default function ReviewList({
  productId,
  reviewsList,
  averageRating,
  reviewCount,
  isAuthenticated,
  user,
  reviewsSectionRef,
  onReviewSubmitted,
  onLoginRedirect,
}: ReviewListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      name: user?.name || "",
      comment: "",
      stars: 5,
    },
    mode: "onChange",
  });

  const reviewStars = watch("stars");

  // Reset state when product changes to prevent data leakage
  useEffect(() => {
    setCurrentPage(1);
    reset({
      name: user?.name || "",
      comment: "",
      stars: 5,
    });
  }, [productId, reset, user]);

  useEffect(() => {
    if (isAuthenticated && user) {
      setValue("name", user.name);
    } else {
      setValue("name", "");
    }
  }, [isAuthenticated, user, setValue]);

  const totalPages = Math.ceil(reviewsList.length / REVIEWS_PER_PAGE);
  const paginatedReviews = reviewsList.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE
  );

  const scrollToReviews = () => {
    if (reviewsSectionRef.current) {
      const headerOffset = 100;
      const elementPosition = reviewsSectionRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    scrollToReviews();
  };

  const onSubmit = async (data: ReviewFormData) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const newReview = await productService.submitReview(productId, data);
      onReviewSubmitted(newReview);
      reset({
        name: user?.name || "",
        comment: "",
        stars: 5,
      });
      setCurrentPage(1);
    } catch (error) {
      console.error("Failed to submit review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      ref={reviewsSectionRef}
      className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mt-6"
    >
      <div className="bg-slate-50 border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900">Reviews & Ratings</h2>
        <div className="text-indigo-600 font-semibold">
          {averageRating} ★ ({reviewCount})
        </div>
      </div>
      <div className="p-6">
        {/* Reviews List */}
        <div className="space-y-6 mb-8">
          {paginatedReviews.map((review) => (
            <div
              key={review.id}
              className="border-b border-gray-100 pb-6 last:border-0 last:pb-0"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold text-gray-900">{review.name}</h4>
                  <div className="flex text-amber-400 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < review.stars ? "fill-amber-400" : "text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-gray-500">{review.date}</span>
              </div>
              <p className="text-gray-700 text-sm mt-2">{review.comment}</p>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 mb-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center space-x-1 px-3 py-2 rounded-md border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">PREV</span>
            </button>

            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-10 h-10 flex items-center justify-center rounded-md border text-sm font-medium transition-all ${
                      currentPage === pageNum
                        ? "bg-indigo-600 border-indigo-600 text-white shadow-sm"
                        : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center space-x-1 px-3 py-2 rounded-md border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span className="hidden sm:inline">NEXT</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Write a Review Form */}
        <div
          className="bg-slate-50 rounded-lg p-5 sm:p-6 border border-gray-100 relative group"
          onClick={() => {
            if (!isAuthenticated) {
              onLoginRedirect();
            }
          }}
        >
          {!isAuthenticated && (
            <div
              className="absolute inset-0 z-10 cursor-pointer"
              title="Login to review"
            ></div>
          )}
          <h3 className="text-base font-bold text-gray-900 mb-4">
            Write a Review
          </h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={!isAuthenticated ? "pointer-events-none opacity-60" : ""}
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                {...register("name")}
                readOnly={isAuthenticated}
                className={`w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                  isAuthenticated ? "bg-gray-100 cursor-not-allowed" : ""
                } ${errors.name ? "border-red-500 focus:ring-red-200" : ""}`}
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.name.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating
              </label>
              <div className="flex items-center space-x-1 cursor-pointer">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    onClick={() => setValue("stars", star, { shouldValidate: true })}
                    className={`w-6 h-6 transition-colors ${
                      star <= reviewStars
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-300 hover:text-amber-400"
                    }`}
                  />
                ))}
              </div>
              {errors.stars && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.stars.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Review
              </label>
              <textarea
                {...register("comment")}
                rows={4}
                className={`w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${errors.comment ? "border-red-500 focus:ring-red-200" : ""}`}
                placeholder="Tell others what you think about this product..."
              />
              {errors.comment && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.comment.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className={`bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors shadow-sm w-full sm:w-auto cursor-pointer flex items-center justify-center ${
                isSubmitting || !isValid ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                "Submit Review"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
