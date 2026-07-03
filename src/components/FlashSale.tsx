import { flashSaleProducts } from "../data";
import ProductCard from "./ProductCard";
import { Zap, Timer } from "lucide-react";
import { useEffect, useState } from "react";
import { Product } from "../types";

export default function FlashSale({
  onProductClick,
  onViewAllOffers,
}: {
  onProductClick?: (product: Product) => void;
  onViewAllOffers?: () => void;
}) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0)
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0)
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatUnit = (unit: number) => String(unit).padStart(2, "0");

  return (
    <section
      className="py-12 bg-slate-50 border-y border-gray-100"
      aria-labelledby="flash-sale-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4 sm:gap-0">
          <div className="flex items-center flex-wrap gap-4 md:gap-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                <Zap className="w-6 h-6 fill-orange-600" />
              </div>
              <h2
                id="flash-sale-heading"
                className="text-2xl font-bold text-gray-900 tracking-tight"
              >
                Flash Sale
              </h2>
            </div>

            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
              <Timer className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-500 mr-2">
                Ends in:
              </span>
              <div className="flex gap-1.5 items-center font-mono text-sm font-bold text-gray-900">
                <span className="bg-orange-50 text-orange-600 w-8 py-1 rounded flex justify-center">
                  {formatUnit(timeLeft.hours)}
                </span>
                <span className="text-gray-400 mb-0.5">:</span>
                <span className="bg-orange-50 text-orange-600 w-8 py-1 rounded flex justify-center">
                  {formatUnit(timeLeft.minutes)}
                </span>
                <span className="text-gray-400 mb-0.5">:</span>
                <span className="bg-orange-50 text-orange-600 w-8 py-1 rounded flex justify-center">
                  {formatUnit(timeLeft.seconds)}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.preventDefault();
              if (onViewAllOffers) onViewAllOffers();
            }}
            className="self-end sm:self-auto inline-flex text-indigo-600 font-medium hover:text-indigo-700 text-sm transition-colors cursor-pointer shrink-0"
          >
            View All Offers &rarr;
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {flashSaleProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={onProductClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
