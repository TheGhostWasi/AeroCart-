import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Package, 
  Tag, 
  Truck, 
  Clock, 
  DollarSign, 
  Plus, 
  Save, 
  Trash2, 
  Image as ImageIcon,
  LayoutGrid,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Product } from "../types";
import { categories } from "../data";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<"upload" | "manage">("upload");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Product Form State
  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    originalPrice: "",
    category: "",
    subcategory: "",
    stock: "",
    vendor: "AeroCart Official",
    image: "",
    description: "",
    // Logistics & Delivery Settings (New Dynamic Fields)
    insideDhakaCharge: 60,
    outsideDhakaCharge: 160,
    insideDhakaTime: "24 to 48 Hours",
    outsideDhakaTime: "3 to 7 Working Days"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call to save product
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
      
      // Reset form (except delivery defaults)
      setProductForm({
        ...productForm,
        name: "",
        price: "",
        originalPrice: "",
        category: "",
        subcategory: "",
        stock: "",
        image: "",
        description: ""
      });
    }, 1500);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-[#1e1b4b] to-[#312e81] pt-24 pb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-200 text-xs font-bold uppercase tracking-wider mb-4 border border-indigo-500/30 backdrop-blur-sm"
              >
                <ShieldCheck className="w-3 h-3" />
                Administrative Control Panel
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-5xl font-extrabold text-white tracking-tight"
              >
                Product Intelligence System
              </motion.h1>
            </div>
            
            <div className="flex bg-white/5 backdrop-blur-md p-1.5 rounded-2xl border border-white/10">
              <button
                onClick={() => setActiveTab("upload")}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === "upload" 
                    ? "bg-white text-indigo-900 shadow-lg" 
                    : "text-white/60 hover:text-white"
                }`}
              >
                Upload New
              </button>
              <button
                onClick={() => setActiveTab("manage")}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === "manage" 
                    ? "bg-white text-indigo-900 shadow-lg" 
                    : "text-white/60 hover:text-white"
                }`}
              >
                Inventory
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Form Container */}
      <div className="max-w-5xl mx-auto px-4 -mt-16 relative z-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[2.5rem] shadow-2xl shadow-indigo-200/40 border border-indigo-50 overflow-hidden"
        >
          <div className="p-8 md:p-12">
            {activeTab === "upload" ? (
              <form onSubmit={handleSubmit} className="space-y-12">
                {/* Basic Information Section */}
                <div className="space-y-8">
                  <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                      <Package className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 leading-none">Core Product Details</h2>
                      <p className="text-xs text-slate-500 mt-1 font-medium tracking-wide">Enter standard listing information</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wider">Product Title</label>
                      <input
                        required
                        type="text"
                        value={productForm.name}
                        onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                        className="w-full bg-slate-50 border-slate-200 border-2 focus:bg-white focus:border-indigo-600 rounded-2xl py-4 px-5 text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none transition-all"
                        placeholder="e.g., Premium Wireless Headphones"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wider">Category</label>
                      <select
                        required
                        value={productForm.category}
                        onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                        className="w-full bg-slate-50 border-slate-200 border-2 focus:bg-white focus:border-indigo-600 rounded-2xl py-4 px-5 text-slate-900 font-medium focus:outline-none transition-all appearance-none"
                      >
                        <option value="">Select Primary Category</option>
                        {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wider">Selling Price (৳)</label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          required
                          type="number"
                          value={productForm.price}
                          onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                          className="w-full bg-slate-50 border-slate-200 border-2 focus:bg-white focus:border-indigo-600 rounded-2xl py-4 pl-12 pr-5 text-slate-900 font-medium focus:outline-none transition-all"
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wider">Original Price (৳)</label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="number"
                          value={productForm.originalPrice}
                          onChange={(e) => setProductForm({...productForm, originalPrice: e.target.value})}
                          className="w-full bg-slate-50 border-slate-200 border-2 focus:bg-white focus:border-indigo-600 rounded-2xl py-4 pl-12 pr-5 text-slate-900 font-medium focus:outline-none transition-all"
                          placeholder="Optional"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wider">Stock Level</label>
                      <input
                        required
                        type="number"
                        value={productForm.stock}
                        onChange={(e) => setProductForm({...productForm, stock: e.target.value})}
                        className="w-full bg-slate-50 border-slate-200 border-2 focus:bg-white focus:border-indigo-600 rounded-2xl py-4 px-5 text-slate-900 font-medium focus:outline-none transition-all"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                {/* Logistics & Delivery Settings Section (PREMIUM INTEGRATION) */}
                <div className="bg-indigo-50/50 rounded-[2rem] p-8 md:p-10 border border-indigo-100/50 space-y-8">
                  <div className="flex items-center gap-3 pb-4 border-b border-indigo-100">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center">
                      <Truck className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-indigo-900 leading-none">Logistics & Delivery Settings</h2>
                      <p className="text-xs text-indigo-500 mt-1 font-medium tracking-wide">Configure dynamic shipping rates and timelines</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Inside Dhaka */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-6 bg-indigo-600 rounded-full"></div>
                        <h3 className="font-bold text-slate-800 text-sm uppercase tracking-widest">Inside Dhaka Metro</h3>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[11px] font-bold text-slate-500 ml-1 uppercase tracking-wider">Delivery Charge (৳)</label>
                          <input
                            required
                            type="number"
                            value={productForm.insideDhakaCharge}
                            onChange={(e) => setProductForm({...productForm, insideDhakaCharge: parseInt(e.target.value) || 0})}
                            className="w-full bg-white border-slate-200 border-2 focus:border-indigo-600 rounded-2xl py-3.5 px-5 text-slate-900 font-bold focus:outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[11px] font-bold text-slate-500 ml-1 uppercase tracking-wider">Estimated Timeframe</label>
                          <div className="relative">
                            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                              required
                              type="text"
                              value={productForm.insideDhakaTime}
                              onChange={(e) => setProductForm({...productForm, insideDhakaTime: e.target.value})}
                              className="w-full bg-white border-slate-200 border-2 focus:border-indigo-600 rounded-2xl py-3.5 pl-12 pr-5 text-slate-900 font-bold focus:outline-none transition-all"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Outside Dhaka */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-6 bg-purple-600 rounded-full"></div>
                        <h3 className="font-bold text-slate-800 text-sm uppercase tracking-widest">Outside Dhaka (All Districts)</h3>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-[11px] font-bold text-slate-500 ml-1 uppercase tracking-wider">Delivery Charge (৳)</label>
                          <input
                            required
                            type="number"
                            value={productForm.outsideDhakaCharge}
                            onChange={(e) => setProductForm({...productForm, outsideDhakaCharge: parseInt(e.target.value) || 0})}
                            className="w-full bg-white border-slate-200 border-2 focus:border-indigo-600 rounded-2xl py-3.5 px-5 text-slate-900 font-bold focus:outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[11px] font-bold text-slate-500 ml-1 uppercase tracking-wider">Estimated Timeframe</label>
                          <div className="relative">
                            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                              required
                              type="text"
                              value={productForm.outsideDhakaTime}
                              onChange={(e) => setProductForm({...productForm, outsideDhakaTime: e.target.value})}
                              className="w-full bg-white border-slate-200 border-2 focus:border-indigo-600 rounded-2xl py-3.5 pl-12 pr-5 text-slate-900 font-bold focus:outline-none transition-all"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-8 flex items-center justify-between gap-6">
                  <div className="hidden md:flex items-center gap-3 text-slate-400">
                    <AlertCircle className="w-5 h-5" />
                    <p className="text-xs font-medium max-w-xs">Double check logistics settings before publishing to live marketplace.</p>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 md:flex-none md:min-w-[300px] bg-slate-900 text-white py-5 px-8 rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-200"
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : isSuccess ? (
                      <>
                        <CheckCircle2 className="w-6 h-6 text-green-400" />
                        Product Live
                      </>
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Save & Publish Product
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="py-20 text-center space-y-6">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                  <LayoutGrid className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Inventory Management</h3>
                  <p className="text-slate-500 font-medium mt-2">Historical product database records will appear here.</p>
                </div>
                <button 
                  onClick={() => setActiveTab("upload")}
                  className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors"
                >
                  Return to Upload Form
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
