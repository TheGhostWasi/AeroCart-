import { ArrowRight, ShieldCheck, Truck, RefreshCw, CreditCard } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-white pt-6 pb-12" aria-label="Hero Promotion">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Banner */}
          <div className="lg:col-span-3 rounded-2xl bg-indigo-50 overflow-hidden relative min-h-[400px] flex items-center shadow-sm">
            <div className="absolute inset-0 z-0 opacity-50 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-200 via-transparent to-transparent"></div>
            
            <div className="relative z-10 p-8 md:p-12 max-w-xl">
              <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-6">
                Big Savings Event
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
                Mega Deals <br />
                <span className="text-orange-500">On All Products</span>
              </h1>
              <p className="text-gray-600 text-lg mb-8 max-w-md">
                Shop from 1000+ categories and enjoy the best quality with premium fast delivery.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a href="#" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-orange-500 hover:bg-orange-600 shadow-sm shadow-orange-200 transition-colors">
                  Shop Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
                <a href="#" className="inline-flex items-center justify-center px-6 py-3 border border-gray-200 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 hover:text-indigo-600 transition-colors">
                  View All Deals
                </a>
              </div>
            </div>

            {/* Decorative Image Placeholder area - represents product showcase */}
            <div className="absolute right-0 bottom-0 top-0 w-1/2 hidden md:block select-none pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-l from-indigo-100/50 to-transparent"></div>
              {/* In a real scenario, an optimized webp illustration or hero product image goes here. Using CSS shapes to abstractly represent modern devices/products */}
              <div className="absolute right-12 top-1/2 -translate-y-1/2 w-64 h-64 bg-white/40 backdrop-blur-sm rounded-3xl rotate-12 shadow-xl border border-white/50"></div>
              <div className="absolute right-24 top-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-200/40 backdrop-blur-sm rounded-full -rotate-12 shadow-lg border border-white/50"></div>
              
              <div className="absolute bottom-12 right-12 bg-white px-4 py-3 rounded-xl shadow-lg border border-gray-100 flexitems-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="bg-orange-100 text-orange-600 p-2 rounded-lg font-bold text-2xl">
                  70%
                </div>
                <div className="text-sm font-bold text-gray-900 leading-tight">
                  UP TO<br />OFF
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Banners */}
          <div className="hidden lg:flex flex-col gap-6">
            <div className="flex-1 rounded-2xl bg-orange-50 p-6 flex flex-col justify-center border border-orange-100 hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute right-0 bottom-0 w-24 h-24 bg-orange-200 rounded-tl-full opacity-50 group-hover:scale-110 transition-transform"></div>
              <span className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-2">New Arrivals</span>
              <h3 className="text-xl font-bold text-gray-900 mb-2 z-10">Smart Home<br/>Devices</h3>
              <a href="#" className="mt-auto text-sm font-semibold text-gray-800 hover:text-orange-600 inline-flex items-center gap-1 z-10">
                Explore <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="flex-1 rounded-2xl bg-slate-100 p-6 flex flex-col justify-center border border-slate-200 hover:shadow-md transition-shadow relative overflow-hidden group">
               <div className="absolute right-0 bottom-0 w-24 h-24 bg-slate-200 rounded-tl-full opacity-50 group-hover:scale-110 transition-transform"></div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">Clearance</span>
              <h3 className="text-xl font-bold text-gray-900 mb-2 z-10">Winter Fashion<br/>Collection</h3>
              <a href="#" className="mt-auto text-sm font-semibold text-gray-800 hover:text-indigo-600 inline-flex items-center gap-1 z-10">
                Shop Now <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Feature/Trust Bar directly under hero */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 p-6 md:p-8 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 flex-shrink-0">
               <ShieldCheck className="w-6 h-6" />
             </div>
             <div>
               <h4 className="font-bold text-gray-900 text-sm lg:text-base">100% Authentic</h4>
               <p className="text-xs text-gray-500 mt-0.5">Original Products Only</p>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 flex-shrink-0">
               <Truck className="w-6 h-6" />
             </div>
             <div>
               <h4 className="font-bold text-gray-900 text-sm lg:text-base">Fast Delivery</h4>
               <p className="text-xs text-gray-500 mt-0.5">Next day on local stock</p>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 flex-shrink-0">
               <RefreshCw className="w-6 h-6" />
             </div>
             <div>
               <h4 className="font-bold text-gray-900 text-sm lg:text-base">Easy Returns</h4>
               <p className="text-xs text-gray-500 mt-0.5">Within 7 days return</p>
             </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 flex-shrink-0">
               <CreditCard className="w-6 h-6" />
             </div>
             <div>
               <h4 className="font-bold text-gray-900 text-sm lg:text-base">Secure Payment</h4>
               <p className="text-xs text-gray-500 mt-0.5">100% Secure Checkout</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
