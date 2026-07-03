import React from "react";
import { motion } from "motion/react";
import { MapPin, Mail, Phone, ShieldCheck, Building } from "lucide-react";

const STORES_DATA = [
  {
    id: 1,
    name: "AeroCart Digital Operations Hub",
    location: "Satkhira, Bangladesh",
    badge: "Primary Technical Hub",
    email: "ops.satkhira@aerocart.com",
    hotline: "+880 16290-OPS",
    description: "Our primary center for digital system maintenance, server operations, and software development. This hub ensures the AeroCart platform remains 100% secure and operational 24/7."
  },
  {
    id: 2,
    name: "AeroCart Central Fulfillment Center",
    location: "Dhaka, Bangladesh",
    email: "fulfillment.dhaka@aerocart.com",
    hotline: "+880 16290-DH",
    description: "The heart of our logistics network. This massive facility handles sorting, quality inspection, and dispatch for over 10,000 orders daily across the capital and beyond."
  },
  {
    id: 3,
    name: "AeroCart Regional Logistics Node",
    location: "Chittagong, Bangladesh",
    email: "logistics.ctg@aerocart.com",
    hotline: "+880 16290-CTG",
    description: "Serving the port city and southeastern districts. This regional node optimizes delivery times for coastal regions and manages inbound global shipments."
  }
];

export default function StoresDirectoryPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Intro Section */}
      <section className="bg-white border-b border-slate-100 pt-20 pb-16 md:pt-32 md:pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              AeroCart Official <span className="text-indigo-600">Network Directory</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
              Every single product is inspected and shipped directly by AeroCart from our regional fulfillment hubs. 100% authenticity guaranteed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Official Hub Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {STORES_DATA.map((hub) => (
            <motion.div
              key={hub.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden flex flex-col group hover:-translate-y-1 transition-all duration-300"
            >
              <div className="p-8 flex-1">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
                    <Building className="w-7 h-7" />
                  </div>
                  {hub.badge && (
                    <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-indigo-200">
                      {hub.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  {hub.name}
                </h3>
                
                <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold mb-6">
                  <MapPin className="w-4 h-4 text-indigo-400" />
                  {hub.location}
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-8">
                  {hub.description}
                </p>

                <div className="space-y-4 pt-6 border-t border-slate-50">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-mono text-slate-500">{hub.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-mono text-slate-500">{hub.hotline}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 100% Quality Assurance Banner */}
      <section className="max-w-7xl mx-auto px-4 pb-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-[40px] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-indigo-100"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-md shrink-0">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-3">100% Quality Assurance Guarantee</h2>
              <p className="text-indigo-50 text-lg font-medium leading-relaxed max-w-3xl">
                Every hub in our network follows the strict AeroCart Authenticity Protocol. We never use 3rd party drop-shippers. If it's on our directory, it's verified, inspected, and guaranteed genuine.
              </p>
            </div>
            <div className="md:ml-auto">
              <div className="px-6 py-3 bg-white text-indigo-600 font-bold rounded-2xl shadow-lg">
                Verified Hub Network
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
