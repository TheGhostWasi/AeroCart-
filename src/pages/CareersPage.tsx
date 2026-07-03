import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Briefcase, Users, Rocket, Link as LinkIcon, ChevronDown, CheckCircle2, ArrowRight } from "lucide-react";

export default function CareersPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    expertise: "",
    resumeLink: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate pipeline entry
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ fullName: "", contactNumber: "", expertise: "", resumeLink: "" });
    }, 1500);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Intro Section */}
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-6">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Careers at AeroCart</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              Build the Future of <br className="hidden md:block" />
              <span className="text-indigo-600">E-Commerce</span> Together
            </h1>
            <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
              We are actively strengthening our core digital systems. While our official application windows are closed for the current quarter, we are always benchmarking future visionaries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Talent Pool Statement Card */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-slate-900 to-indigo-900 p-8 md:p-16 text-white shadow-2xl shadow-indigo-200"
          >
            {/* Decorative Orbs */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10 max-w-3xl">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
                  <Rocket className="w-6 h-6 text-indigo-300" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold">Future Talent Pool</h2>
              </div>
              <p className="text-lg md:text-xl text-indigo-100/90 leading-relaxed font-medium">
                AeroCart is growing fast! We are building a secure database of top-tier Developers, Growth Marketers, and Operations Experts for our upcoming scale-up cycle in late 2026. Submit your profile today to get priority placement when roles open.
              </p>
              
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: <Users className="w-5 h-5" />, label: "Expert Network" },
                  { icon: <Briefcase className="w-5 h-5" />, label: "Priority Review" },
                  { icon: <Rocket className="w-5 h-5" />, label: "Scale-up Access" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-indigo-200/80 font-semibold text-sm">
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                      {item.icon}
                    </div>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Talent Pool Form */}
      <section className="pb-24 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
            <div className="p-8 md:p-10">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Join the Talent Pipeline</h3>
              <p className="text-slate-500 mb-8 text-sm font-medium">Submit your details to be notified of future opportunities.</p>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 rounded-2xl p-8 text-center border border-green-100"
                  >
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold text-green-900 mb-2">Profile Added!</h4>
                    <p className="text-green-700 text-sm font-medium">You've been successfully added to our talent pipeline. We'll reach out when a suitable position becomes available.</p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="mt-6 text-green-700 font-bold hover:underline text-sm"
                    >
                      Submit another profile
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Full Name</label>
                      <input
                        required
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="w-full bg-slate-50 border-slate-200 border-2 focus:bg-white focus:border-indigo-600 rounded-2xl py-4 px-5 text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none transition-all duration-200"
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Contact Number</label>
                      <input
                        required
                        type="tel"
                        value={formData.contactNumber}
                        onChange={(e) => setFormData({...formData, contactNumber: e.target.value})}
                        className="w-full bg-slate-50 border-slate-200 border-2 focus:bg-white focus:border-indigo-600 rounded-2xl py-4 px-5 text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none transition-all duration-200"
                        placeholder="+880 1XXX XXXXXX"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Primary Expertise</label>
                      <div className="relative">
                        <select
                          required
                          value={formData.expertise}
                          onChange={(e) => setFormData({...formData, expertise: e.target.value})}
                          className="w-full bg-slate-50 border-slate-200 border-2 focus:bg-white focus:border-indigo-600 rounded-2xl py-4 px-5 text-slate-900 font-medium appearance-none focus:outline-none transition-all duration-200"
                        >
                          <option value="" disabled>Select your expertise</option>
                          <option value="tech">Tech & Engineering</option>
                          <option value="marketing">Digital Marketing</option>
                          <option value="ops">Operations & Logistics</option>
                        </select>
                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider ml-1">Resume Link (Google Drive / LinkedIn)</label>
                      <div className="relative">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2">
                          <LinkIcon className="w-5 h-5 text-slate-400" />
                        </div>
                        <input
                          required
                          type="url"
                          value={formData.resumeLink}
                          onChange={(e) => setFormData({...formData, resumeLink: e.target.value})}
                          className="w-full bg-slate-50 border-slate-200 border-2 focus:bg-white focus:border-indigo-600 rounded-2xl py-4 pl-12 pr-5 text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none transition-all duration-200"
                          placeholder="https://linkedin.com/in/username"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-indigo-600 text-white py-4.5 rounded-2xl font-bold hover:bg-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-xl shadow-indigo-100 disabled:opacity-50 mt-4"
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <>
                          Join the Talent Pool Pipeline
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
