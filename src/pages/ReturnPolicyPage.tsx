import React from "react";
import { ShieldCheck, Video, Package, ClipboardList, CreditCard } from "lucide-react";
import { motion } from "motion/react";

const RETURN_DATA = {
  heroTitle: "Return & Refund Policy",
  heroSubTitle: "Our commitment to a fair and transparent shopping experience for every customer.",
  sections: [
    {
      id: 1,
      title: "7-Day Return Window",
      content: "Returns must be initiated within 7 days of receiving the product. We believe this provides ample time for you to inspect your purchase while ensuring the inventory remains fresh for other shoppers.",
      icon: <ShieldCheck className="w-8 h-8 text-indigo-600" />,
    },
    {
      id: 2,
      title: "Unboxing Video Mandatory",
      content: "An unboxing video is strictly mandatory upon delivery; otherwise, the return policy will not be applicable. This protects both the buyer and the seller by providing clear evidence of the product's condition upon arrival.",
      icon: <Video className="w-8 h-8 text-indigo-600" />,
    },
    {
      id: 3,
      title: "Original Condition",
      content: "The product must be unused, unaltered, and returned in its original packaging with all original tags intact. Any signs of wear or damage to the packaging may result in a rejected return request.",
      icon: <Package className="w-8 h-8 text-indigo-600" />,
    },
    {
      id: 4,
      title: "Valid Reason Required",
      content: "A valid and specific reason must be provided for requesting a return. Whether it's a manufacturing defect or a wrong item sent, clear communication helps us process your request faster.",
      icon: <ClipboardList className="w-8 h-8 text-indigo-600" />,
    },
    {
      id: 5,
      title: "Mobile Banking Refunds",
      content: "Refunds will be processed and issued exclusively through Mobile Banking channels (bKash/Nagad/Rocket). This ensures a fast and secure transaction directly to your mobile wallet.",
      icon: <CreditCard className="w-8 h-8 text-indigo-600" />,
    },
  ]
};

export default function ReturnPolicyPage() {
  const returnPolicyEmail = "support@aerocart.com.bd";

  return (
    <div className="bg-white flex-grow">
      {/* Hero Banner Section */}
      <section className="relative w-full overflow-hidden bg-[#2d1b69] py-20 md:py-32">
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
              {RETURN_DATA.heroTitle}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto font-medium">
              {RETURN_DATA.heroSubTitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Policy Content Grid */}
      <section className="max-w-6xl mx-auto px-4 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RETURN_DATA.sections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className={`bg-white p-8 rounded-3xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 group ${index === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
            >
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                {section.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{section.title}</h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {section.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-16 p-8 bg-slate-50 rounded-3xl border border-slate-100 text-center">
          <p className="text-slate-500 text-sm font-medium">
            For any further clarification regarding our return process, please contact our Customer Care team at <span className="text-indigo-600 font-bold">{returnPolicyEmail}</span>
          </p>
        </div>
      </section>
    </div>
  );
}
