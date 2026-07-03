import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Question } from "../types";
import { productService } from "../services/productService";

const qaSchema = z.object({
  question: z.string().min(5, "Question must be at least 5 characters long"),
});

type QAFormData = z.infer<typeof qaSchema>;

interface QASectionProps {
  productId: string;
  questions: Question[];
  isAuthenticated: boolean;
  user: { name: string } | null;
  onQuestionSubmitted: (newQuestion: Question) => void;
  qnaSectionRef: React.RefObject<HTMLDivElement>;
}

const QUESTIONS_PER_PAGE = 3;

export default function QASection({
  productId,
  questions,
  isAuthenticated,
  user,
  onQuestionSubmitted,
  qnaSectionRef,
}: QASectionProps) {
  const [qCurrentPage, setQCurrentPage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<QAFormData>({
    resolver: zodResolver(qaSchema),
    defaultValues: {
      question: "",
    },
    mode: "onChange",
  });

  // Reset state when product changes to prevent data leakage
  useEffect(() => {
    reset({ question: "" });
    setQCurrentPage(1);
  }, [productId, reset]);

  const qTotalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
  const paginatedQuestions = questions.slice(
    (qCurrentPage - 1) * QUESTIONS_PER_PAGE,
    qCurrentPage * QUESTIONS_PER_PAGE
  );

  const scrollToQnA = () => {
    if (qnaSectionRef.current) {
      const headerOffset = 100;
      const elementPosition = qnaSectionRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleQPageChange = (page: number) => {
    setQCurrentPage(page);
    scrollToQnA();
  };

  const onSubmit = async (data: QAFormData) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const askedBy = isAuthenticated && user ? user.name : "You";
      const newQuestion = await productService.submitQuestion(productId, data.question, askedBy);
      onQuestionSubmitted(newQuestion);
      reset({ question: "" });
      setQCurrentPage(1);
    } catch (error) {
      console.error("Failed to submit question:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      ref={qnaSectionRef}
      className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mt-6"
    >
      <div className="bg-slate-50 border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900">
          Questions & Answers ({questions.length})
        </h2>
      </div>
      <div className="p-6">
        {/* Ask a Question Form */}
        <div className="bg-slate-50 rounded-lg p-5 sm:p-6 border border-gray-100 mb-8 relative group">
          <h3 className="text-base font-bold text-gray-900 mb-4">
            Ask a question about this product
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <textarea
                {...register("question")}
                rows={3}
                className={`w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm ${errors.question ? "border-red-500 focus:ring-red-200" : ""}`}
                placeholder="Ask a question about this product..."
              />
              {errors.question && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.question.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !isValid}
              className={`bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-8 rounded-lg transition-colors shadow-sm w-full sm:w-auto cursor-pointer flex items-center justify-center ${
                isSubmitting || !isValid ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                "Ask Question"
              )}
            </button>
          </form>
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {paginatedQuestions.length > 0 ? (
            paginatedQuestions.map((q) => (
              <div
                key={q.id}
                className="border-b border-gray-100 pb-6 last:border-0 last:pb-0"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs shrink-0">
                    Q
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium text-sm sm:text-base">
                      {q.questionText}
                    </p>
                    <p className="text-[11px] text-gray-500 mt-1 uppercase tracking-wider font-semibold">
                      Asked by {q.askedBy} • {q.createdAt}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 bg-slate-50/80 p-4 rounded-lg ml-0 sm:ml-11">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs shrink-0">
                    A
                  </div>
                  <div>
                    <p
                      className={`text-sm sm:text-base ${
                        q.answerText === "Pending Admin Reply..."
                          ? "text-gray-400 italic"
                          : "text-gray-700"
                      }`}
                    >
                      {q.answerText}
                    </p>
                    {q.answerText !== "Pending Admin Reply..." && (
                      <p className="text-[11px] text-emerald-600 mt-1 uppercase tracking-wider font-bold">
                        Official Answer
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 italic text-sm">
              No questions asked yet. Be the first to ask!
            </div>
          )}
        </div>

        {/* Q&A Pagination Controls */}
        {qTotalPages > 1 && (
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => handleQPageChange(qCurrentPage - 1)}
              disabled={qCurrentPage === 1}
              className="flex items-center space-x-1 px-3 py-2 rounded-md border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">PREV</span>
            </button>

            <div className="flex items-center gap-1">
              {[...Array(qTotalPages)].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handleQPageChange(pageNum)}
                    className={`w-10 h-10 flex items-center justify-center rounded-md border text-sm font-medium transition-all ${
                      qCurrentPage === pageNum
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
              onClick={() => handleQPageChange(qCurrentPage + 1)}
              disabled={qCurrentPage === qTotalPages}
              className="flex items-center space-x-1 px-3 py-2 rounded-md border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span className="hidden sm:inline">NEXT</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
