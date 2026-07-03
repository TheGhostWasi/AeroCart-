import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, Database, Wallet, Building2, User, Phone, Package, Tag, ArrowRight, CheckCircle2 } from "lucide-react";

export default function SellerCenterPage() {
  const [partnerForm, setPartnerForm] = useState({
    businessName: "",
    ownerName: "",
    mobileNumber: "",
    catalogSize: "",
    category: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const advantages = [
    {
      title: "Curated Growth Protection",
      description: "We control platform quality tightly, ensuring verified partners don't compete with cheap counter-feit sellers.",
      icon: <ShieldCheck className="w-8 h-8 text-indigo-600" />
    },
    {
      title: "Dedicated Admin Operations",
      description: "Once selected, our internal catalog team uploads and optimizes your entire inventory into our system for you.",
      icon: <Database className="w-8 h-8 text-indigo-600" />
    },
    {
      title: "Fast Financial Disbursements",
      description: "Enjoy rapid and secure weekly payouts directly cleared into your company bank account or digital wallets.",
      icon: <Wallet className="w-8 h-8 text-indigo-600" />
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API lead generation
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setPartnerForm({
        businessName: "",
        ownerName: "",
        mobileNumber: "",
        catalogSize: "",
        category: ""
      });
    }, 1500);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#2d1b69] to-[#1e1245] py-20 md:py-32 relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
              Partner with AeroCart — <br className="hidden md:block" />
              Scale Your Business Online
            </h1>
            <p className="mt-8 text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto font-medium leading-relaxed">
              We handpick Bangladesh's top merchants, vendors, and wholesalers to bring premium goods to customers across all 64 districts. Apply to become an authorized partner today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Elite Merchant Advantages */}
      <section className="max-w-7xl mx-auto px-4 -mt-12 md:-mt-16 relative z-20 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {advantages.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-white p-8 md:p-10 rounded-[32px] shadow-xl shadow-slate-200/60 border border-slate-100 group hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed font-medium text-sm">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive Partnership Lead Form */}
      <section className="max-w-4xl mx-auto px-4 pb-24 md:pb-32">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-[40px] shadow-2xl shadow-indigo-100 border border-slate-100 overflow-hidden"
        >
          <div className="p-8 md:p-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Submit Your Vendor Profile</h2>
              <p className="text-slate-500 font-medium">Join our curated marketplace and reach millions of verified customers.</p>
            </div>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 rounded-3xl p-10 text-center border border-green-100"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-900 mb-3">Application Received!</h3>
                  <p className="text-green-700 font-medium max-w-sm mx-auto">
                    Thank you for your interest. Our merchant onboarding team will review your profile and contact you within 3-5 business days.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-8 px-8 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors"
                  >
                    Submit Another Application
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-slate-400" />
                        Company/Business Name
                      </label>
                      <input
                        required
                        type="text"
                        value={partnerForm.businessName}
                        onChange={(e) => setPartnerForm({ ...partnerForm, businessName: e.target.value })}
                        className="w-full bg-slate-50 border-slate-200 border-2 focus:bg-white focus:border-indigo-600 rounded-2xl py-4 px-5 text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none transition-all duration-200"
                        placeholder="Aero Tech Solutions"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                        <User className="w-4 h-4 text-slate-400" />
                        Owner Full Name
                      </label>
                      <input
                        required
                        type="text"
                        value={partnerForm.ownerName}
                        onChange={(e) => setPartnerForm({ ...partnerForm, ownerName: e.target.value })}
                        className="w-full bg-slate-50 border-slate-200 border-2 focus:bg-white focus:border-indigo-600 rounded-2xl py-4 px-5 text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none transition-all duration-200"
                        placeholder="Ariful Islam"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-slate-400" />
                        Mobile Number
                      </label>
                      <input
                        required
                        type="tel"
                        value={partnerForm.mobileNumber}
                        onChange={(e) => setPartnerForm({ ...partnerForm, mobileNumber: e.target.value })}
                        className="w-full bg-slate-50 border-slate-200 border-2 focus:bg-white focus:border-indigo-600 rounded-2xl py-4 px-5 text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none transition-all duration-200"
                        placeholder="01XXX XXXXXX"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                        <Package className="w-4 h-4 text-slate-400" />
                        Estimated Catalog Size
                      </label>
                      <select
                        required
                        value={partnerForm.catalogSize}
                        onChange={(e) => setPartnerForm({ ...partnerForm, catalogSize: e.target.value })}
                        className="w-full bg-slate-50 border-slate-200 border-2 focus:bg-white focus:border-indigo-600 rounded-2xl py-4 px-5 text-slate-900 font-medium appearance-none focus:outline-none transition-all duration-200"
                      >
                        <option value="" disabled>Select Catalog Size</option>
                        <option value="1-50">1-50 Products</option>
                        <option value="51-500">51-500 Products</option>
                        <option value="500+">500+ Products</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                      <Tag className="w-4 h-4 text-slate-400" />
                      Primary Category
                    </label>
                    <select
                      required
                      value={partnerForm.category}
                      onChange={(e) => setPartnerForm({ ...partnerForm, category: e.target.value })}
                      className="w-full bg-slate-50 border-slate-200 border-2 focus:bg-white focus:border-indigo-600 rounded-2xl py-4 px-5 text-slate-900 font-medium appearance-none focus:outline-none transition-all duration-200"
                    >
                      <option value="" disabled>Select Category</option>
                      <option value="electronics">Consumer Electronics</option>
                      <option value="home">Home & Kitchen</option>
                      <option value="fashion">Fashion</option>
                      <option value="groceries">Groceries</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-5 rounded-2xl font-bold hover:shadow-2xl hover:shadow-indigo-200 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 text-lg md:text-xl"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Apply for Partnership Evaluation
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
