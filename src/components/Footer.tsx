import React from 'react';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-24 md:pb-8" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Section inside Footer for cleanliness */}
        <div className="bg-indigo-600 rounded-3xl p-8 md:p-12 mb-16 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-lg border border-indigo-700/50">
          <div className="absolute top-0 right-0 -m-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -m-16 w-64 h-64 bg-orange-400/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="max-w-xl relative z-10 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">Join our newsletter now</h3>
            <p className="text-indigo-100 text-sm md:text-base">
              Register now to get updates on promotions and coupons. Everything you need, delivered fast.
            </p>
          </div>
          <form className="w-full md:max-w-md relative z-10 flex gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                required
                className="w-full pl-10 pr-4 py-3 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-orange-500 bg-white"
                placeholder="Enter your email address"
                aria-label="Email address"
              />
            </div>
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-colors whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-orange-500 text-sm shadow-sm"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 xl:gap-12 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-indigo-600 text-white rounded-lg flex items-center justify-center shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
              </div>
              <span className="font-bold text-2xl tracking-tight text-gray-900">
                Aero<span className="text-indigo-600">Cart</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm mb-6 max-w-sm leading-relaxed">
              Based in Bangladesh, AeroCart is a modern multi-vendor e-commerce platform offering everything you need, delivered fast. Shop millions of authentic products.
            </p>
            <div className="flex space-x-4">
              {/* Simple Social Links using generic SVG for brevity */}
              {['Facebook', 'Twitter', 'Instagram', 'YouTube'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-gray-500 hover:bg-indigo-50 hover:text-indigo-600 transition-colors border border-gray-100" aria-label={`Follow us on ${social}`}>
                  <div className="w-4 h-4 bg-current rounded-sm"></div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Nav */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/careers" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Careers</Link>
              </li>
              <li>
                <Link to="/seller-center" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Seller Center</Link>
              </li>
              <li>
                <Link to="/stores" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">Stores Directory</Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Customer Care</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/my-account" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">My Account</Link>
              </li>
              {['Track Order', 'Return Policy', 'Shipping Info', 'Help & FAQs'].map((link) => (
                <li key={link}>
                  {link === 'Return Policy' ? (
                    <Link 
                      to="/return-policy"
                      className="text-sm text-gray-500 hover:text-indigo-600 transition-colors"
                    >
                      {link}
                    </Link>
                  ) : link === 'Shipping Info' ? (
                    <Link 
                      to="/shipping-info"
                      className="text-sm text-gray-500 hover:text-indigo-600 transition-colors"
                    >
                      {link}
                    </Link>
                  ) : link === 'Help & FAQs' ? (
                    <Link 
                      to="/faqs"
                      className="text-sm text-gray-500 hover:text-indigo-600 transition-colors"
                    >
                      {link}
                    </Link>
                  ) : (
                    <a href="#" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">{link}</a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Categories App */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Popular Categories</h3>
            <ul className="space-y-3">
              {[
                { name: 'Electronics & Gadget', path: '/category/electronics-gadget' },
                { name: 'Personal Care', path: '/category/personal-care' },
                { name: 'Appliances', path: '/category/appliances' },
                { name: 'Food & Grocery', path: '/category/food-grocery' },
                { name: 'Fashion', path: '/category/fashion' }
              ].map((category) => (
                <li key={category.name}>
                  <Link to={category.path} className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} AeroCart. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-gray-400">
            <Link to="/privacy-policy" className="hover:text-gray-900 transition-colors">Privacy Policy</Link>
            <a href="#" className="hover:text-gray-900">Terms of Service</a>
            <a href="#" className="hover:text-gray-900">Sitemap</a>
          </div>
          {/* Payment Methods Mock */}
          <div className="flex gap-2">
            <div className="w-10 h-6 bg-slate-100 rounded border border-gray-200"></div>
            <div className="w-10 h-6 bg-slate-100 rounded border border-gray-200"></div>
            <div className="w-10 h-6 bg-slate-100 rounded border border-gray-200"></div>
          </div>
        </div>
      </div>
    </footer>
  );
}
