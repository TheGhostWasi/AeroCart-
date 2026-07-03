import React from "react";
import { Truck, Clock, MapPin, ShieldCheck, Info } from "lucide-react";
import { motion } from "motion/react";

export default function ShippingInfoPage() {
  // Isolated Admin-Ready Config Variables
  const insideDhakaCharge = 60;
  const outsideDhakaCharge = 160;
  const insideDhakaTime = "24 to 48 Hours";
  const outsideDhakaTime = "3 to 7 Working Days";
  const freeShippingThreshold = "Applicable for specific order limits (Configurable)";
  const courierPartners = "Details manageable via Admin Panel";

  const shippingMetrics = [
    {
      id: 1,
      title: "Inside Dhaka",
      charge: `৳${insideDhakaCharge}`,
      time: insideDhakaTime,
      icon: <MapPin className="w-8 h-8 text-indigo-600" />,
      color: "bg-indigo-50",
      description: "Fast-track delivery within the Dhaka metropolitan area."
    },
    {
      id: 2,
      title: "Outside Dhaka",
      charge: `৳${outsideDhakaCharge}`,
      time: outsideDhakaTime,
      icon: <Truck className="w-8 h-8 text-indigo-600" />,
      color: "bg-purple-50",
      description: "Reliable shipping to all 64 districts across Bangladesh."
    }
  ];

  const additionalFeatures = [
    {
      title: "Free Shipping",
      content: freeShippingThreshold,
      icon: <ShieldCheck className="w-6 h-6 text-indigo-600" />
    },
    {
      title: "Courier Partners",
      content: courierPartners,
      icon: <Clock className="w-6 h-6 text-indigo-600" />
    }
  ];

  return (
    <div className="bg-white flex-grow">
      {/* Hero Banner Section */}
      <section className="relative w-full overflow-hidden bg-[#1a1c2e] py-20 md:py-32">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-4xl mx-auto tracking-tight">
              Shipping & Delivery Information
            </h1>
            <p className="mt-6 text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto font-medium">
              Transparent shipping rates and timelines designed for your convenience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Shipping Grid */}
      <section className="max-w-6xl mx-auto px-4 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {shippingMetrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`${metric.color} p-10 rounded-[40px] border border-white/50 shadow-sm transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 group`}
            >
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-300">
                {metric.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{metric.title}</h3>
              <p className="text-gray-500 mb-8 text-sm font-medium">{metric.description}</p>
              
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between bg-white/60 p-5 rounded-2xl">
                  <span className="text-gray-500 text-sm font-bold">Delivery Charge</span>
                  <span className="text-2xl font-black text-indigo-600">{metric.charge}</span>
                </div>
                <div className="flex items-center justify-between bg-white/60 p-5 rounded-2xl">
                  <span className="text-gray-500 text-sm font-bold">Estimated Time</span>
                  <span className="text-sm font-extrabold text-gray-900 uppercase tracking-wider">{metric.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Secondary Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {additionalFeatures.map((feature, index) => (
            <div key={index} className="flex items-start gap-5 p-8 bg-white border border-gray-100 rounded-3xl shadow-sm">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
                {feature.icon}
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1">{feature.title}</h4>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">{feature.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Management Notice */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="p-8 bg-slate-900 rounded-[32px] border border-slate-800 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Info className="w-24 h-24 text-white" />
          </div>
          <div className="relative z-10">
            <h4 className="text-white font-bold text-lg mb-3">Management Notice</h4>
            <p className="text-slate-400 text-sm font-medium max-w-3xl mx-auto leading-relaxed">
              Shipping charges and delivery timelines are subject to change based on logistical factors and can be updated instantly by management. We strive to maintain the highest standard of service across all regions.
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
