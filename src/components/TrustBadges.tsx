import { ShieldCheck, Truck, RefreshCw, BadgeCheck } from 'lucide-react';

export default function TrustBadges() {
  const badges = [
    {
      icon: <Truck className="w-8 h-8 text-indigo-600 mb-4" strokeWidth={1.5} />,
      title: "Fast Delivery",
      description: "Get your products delivered quickly and safely across the country."
    },
    {
       icon: <ShieldCheck className="w-8 h-8 text-indigo-600 mb-4" strokeWidth={1.5} />,
       title: "Secure Payment",
       description: "We use state-of-the-art encryption to protect your payment."
    },
    {
       icon: <RefreshCw className="w-8 h-8 text-indigo-600 mb-4" strokeWidth={1.5} />,
       title: "Easy Returns",
       description: "Not satisfied? Return your item within 7 days for a refund."
    },
    {
       icon: <BadgeCheck className="w-8 h-8 text-indigo-600 mb-4" strokeWidth={1.5} />,
       title: "Authentic Products",
       description: "100% genuine products sourced directly from trusted brands."
    }
  ];

  return (
    <section className="bg-white py-16 border-t border-gray-100" aria-labelledby="trust-heading">
      <h2 id="trust-heading" className="sr-only">Why choose us</h2>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-slate-50 transition-colors">
              <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-2">
                {badge.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{badge.title}</h3>
              <p className="text-gray-500 text-sm">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
