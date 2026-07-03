import React from "react";
import { ShieldCheck, Truck, Lock, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

// Data architecture for future admin customization
const ABOUT_DATA = {
  heroTitle: "About AeroCart — Redefining E-Commerce in Bangladesh",
  heroSubTitle: "Your Trustworthy Gateway to 15,000+ Authentic Products Across Bangladesh.",
  brandStory: {
    title: "Our Story",
    content: "Founded in 2024, AeroCart emerged from a simple observation: the Bangladeshi e-commerce landscape needed a platform that prioritizes authenticity and speed without compromise. We started with a small team of passionate individuals dedicated to bridging the gap between quality global brands and the local consumer market. Today, we are proud to serve thousands of customers daily, ensuring every package delivered is a promise kept.",
  },
  pillars: [
    {
      id: 1,
      title: "100% Authenticity",
      description: "We work directly with official distributors and verified sellers to ensure every product on our platform is genuine.",
      icon: <ShieldCheck className="w-8 h-8 text-indigo-600" />,
    },
    {
      id: 2,
      title: "Secure Payments",
      description: "Multiple layers of encryption and partnership with leading payment gateways ensure your financial data is always safe.",
      icon: <Lock className="w-8 h-8 text-indigo-600" />,
    },
    {
      id: 3,
      title: "Fastest Logistics",
      description: "Our dedicated logistics network ensures next-day delivery in Dhaka and 2-3 days across the rest of the country.",
      icon: <Truck className="w-8 h-8 text-indigo-600" />,
    },
  ],
  founder: {
    name: "Wasi Ahmed",
    role: "Owner and Founder, AeroCart",
    signature: "Warm regards,"
  }
};

export default function AboutPage() {
  return (
    <div className="bg-white flex-grow">
      {/* Hero Banner Section */}
      <section className="relative w-full overflow-hidden bg-[#2d1b69] py-20 md:py-32">
        {/* Abstract smooth lines & blurred assets (Simulated) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4"></div>
          <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,50 Q25,30 50,50 T100,50" fill="none" stroke="white" strokeWidth="0.5" />
            <path d="M0,60 Q25,40 50,60 T100,60" fill="none" stroke="white" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-4xl mx-auto tracking-tight">
              {ABOUT_DATA.heroTitle}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto font-medium">
              {ABOUT_DATA.heroSubTitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Story & Core Pillars */}
      <section className="max-w-6xl mx-auto px-4 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              {ABOUT_DATA.brandStory.title}
            </h2>
            <div className="text-gray-700 leading-relaxed max-w-none">
              <p>{ABOUT_DATA.brandStory.content}</p>
              <p className="mt-4">
                We believe that shopping should be an experience, not a chore. By integrating cutting-edge technology with human-centric service, we are setting new standards for the e-commerce industry in Bangladesh.
              </p>
            </div>

            {/* Founder Signature Block */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <p className="text-gray-500 italic">{ABOUT_DATA.founder.signature}</p>
              <p className="mt-2 text-xl font-bold text-gray-900">{ABOUT_DATA.founder.name}</p>
              <p className="text-gray-500 text-sm">{ABOUT_DATA.founder.role}</p>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-indigo-50 rounded-3xl p-8 border border-indigo-100">
              <h3 className="text-lg font-bold text-indigo-900 mb-4">Quick Stats</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-indigo-700">
                  <ChevronRight className="w-4 h-4" />
                  <span className="font-semibold">15,000+ Products</span>
                </li>
                <li className="flex items-center gap-3 text-indigo-700">
                  <ChevronRight className="w-4 h-4" />
                  <span className="font-semibold">64 Districts Covered</span>
                </li>
                <li className="flex items-center gap-3 text-indigo-700">
                  <ChevronRight className="w-4 h-4" />
                  <span className="font-semibold">24/7 Support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Core Pillars Grid */}
        <div className="mt-20 md:mt-28">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Core Pillars</h2>
            <p className="text-gray-500 mt-2">Built on trust, transparency, and technology</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ABOUT_DATA.pillars.map((pillar) => (
              <motion.div
                key={pillar.id}
                whileHover={{ y: -4 }}
                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{pillar.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
