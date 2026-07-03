import React, { useState } from "react";
import { ChevronDown, HelpCircle, ShoppingBag, Truck, MessageSquare, RotateCcw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  icon: React.ReactNode;
}

export default function FaqPage() {
  const [openId, setOpenId] = useState<number | null>(1);

  // Isolated Admin-Ready FAQ Data
  const faqData: FaqItem[] = [
    {
      id: 1,
      question: "How do I place an order?",
      answer: "Choose your desired product, click 'Add to Cart' or 'Buy Now', fill in your delivery details, and confirm the order. You'll receive a confirmation notification once the order is placed.",
      category: "Ordering",
      icon: <ShoppingBag className="w-5 h-5" />
    },
    {
      id: 2,
      question: "What are the shipping fees?",
      answer: "Our shipping fees are transparent: Inside Dhaka is 60 BDT (Estimated delivery: 24-48 hrs), and outside Dhaka is 160 BDT (Estimated delivery: 3-7 working days).",
      category: "Shipping",
      icon: <Truck className="w-5 h-5" />
    },
    {
      id: 3,
      question: "Can I track my order?",
      answer: "Yes, you can. We will send a tracking ID or tracking link directly to your provided phone number via SMS once your order has been shipped from our warehouse.",
      category: "Tracking",
      icon: <MessageSquare className="w-5 h-5" />
    },
    {
      id: 4,
      question: "Do you accept returns?",
      answer: "Yes, we accept returns within 7 days of receiving the product. Please note that an unboxing video upon delivery is strictly mandatory for the return policy to be applicable.",
      category: "Returns",
      icon: <RotateCcw className="w-5 h-5" />
    }
  ];

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="bg-[#f8f9fc] flex-grow">
      {/* Hero Section */}
      <section className="bg-white border-b border-gray-100 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-indigo-50 mb-6">
              <HelpCircle className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              Help & FAQs
            </h1>
            <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
              Everything you need to know about shopping with AeroCart. Find quick answers to your questions below.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Accordion Section */}
      <section className="max-w-3xl mx-auto px-4 py-16 md:py-24">
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-[24px] border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleAccordion(item.id)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left focus:outline-none group"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-xl transition-colors duration-300 ${openId === item.id ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600'}`}>
                    {item.icon}
                  </div>
                  <span className={`font-bold text-lg md:text-xl transition-colors ${openId === item.id ? 'text-indigo-600' : 'text-slate-700'}`}>
                    {item.question}
                  </span>
                </div>
                <ChevronDown 
                  className={`w-6 h-6 transition-transform duration-300 ${openId === item.id ? 'rotate-180 text-indigo-600' : 'text-slate-300'}`} 
                />
              </button>

              <AnimatePresence>
                {openId === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 md:px-8 pb-8 md:pb-10 ml-0 md:ml-14">
                      <div className="h-px w-full bg-slate-50 mb-6"></div>
                      <p className="text-slate-600 leading-relaxed text-base md:text-lg font-medium">
                        {item.answer}
                      </p>
                      <div className="mt-6 flex items-center gap-2">
                        <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-xs font-bold uppercase tracking-wider">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </section>
    </div>
  );
}
