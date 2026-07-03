import React from "react";
import * as Icons from "lucide-react";
import { categories } from "../data";
import SEO from "./SEO";

export default function CategoriesPage({
  onGoHome,
  onCategoryClick,
}: {
  onGoHome: () => void;
  onCategoryClick?: (slug: string, subcategory?: string) => void;
}) {
  return (
    <div className="bg-slate-50 py-8">
      <SEO 
        title="All Categories" 
        description="Browse all categories on AeroCart. From fashion to electronics, find everything you need."
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm font-medium text-gray-500 mb-6">
          <button
            onClick={onGoHome}
            className="hover:text-indigo-600 transition-colors"
          >
            Home
          </button>
          <span className="mx-2">&gt;</span>
          <span className="text-gray-900">All Categories</span>
        </nav>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            All Categories
          </h1>
          <p className="text-gray-500 mt-2">
            Browse through our extensive catalog of products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            // @ts-ignore
            const IconPattern =
              Icons[
                category.icon
                  .split("-")
                  .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                  .join("")
              ] || Icons.Box;

            return (
              <div
                key={category.id}
                className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-5 border-b border-gray-50 flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${category.bgColor || "bg-slate-50"}`}
                  >
                    <div
                      className={`w-6 h-6 flex items-center justify-center ${category.color || "text-gray-600"}`}
                    >
                      <IconPattern
                        strokeWidth={1.5}
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg leading-tight">
                      <a
                        href={`/category/${category.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          if (onCategoryClick) onCategoryClick(category.slug);
                        }}
                        className="hover:text-indigo-600 transition-colors"
                      >
                        {category.name}
                      </a>
                    </h3>
                    <span className="text-xs text-gray-400 font-medium">
                      {category.itemCount.toLocaleString()} items
                    </span>
                  </div>
                </div>

                <div className="p-2">
                  <ul className="flex flex-col">
                    {category.subcategories?.map((sub, idx) => (
                      <li key={idx}>
                        <a
                          href={`/category/${category.slug}/${sub.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                          onClick={(e) => {
                            e.preventDefault();
                            if (onCategoryClick)
                              onCategoryClick(category.slug, sub);
                          }}
                          className="block px-4 py-2.5 text-sm font-medium text-gray-600 hover:text-indigo-600 active:text-blue-600 focus:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
                        >
                          {sub}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2 px-4 pb-3">
                    <a
                      href={`/category/${category.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        if (onCategoryClick) onCategoryClick(category.slug);
                      }}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-wide flex items-center gap-1 group"
                    >
                      View full category
                      <Icons.ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
