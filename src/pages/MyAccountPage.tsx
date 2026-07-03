import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { 
  User, 
  Package, 
  Settings, 
  CreditCard, 
  MapPin, 
  LogOut, 
  ChevronRight, 
  ShieldCheck,
  CheckCircle2,
  Clock,
  Truck,
  Edit3,
  Mail,
  Phone
} from "lucide-react";

type TabType = "profile" | "orders" | "settings";
type OrderStatus = "Pending" | "Confirm";

const MOCK_ORDERS = [
  {
    id: "#AC-4421",
    date: "Oct 12, 2024",
    total: "৳ 12,450",
    paymentStatus: "Paid",
    orderStatus: "Confirm" as OrderStatus,
    items: 3
  },
  {
    id: "#AC-4398",
    date: "Sep 28, 2024",
    total: "৳ 5,200",
    paymentStatus: "COD",
    orderStatus: "Pending" as OrderStatus,
    items: 1
  },
  {
    id: "#AC-4350",
    date: "Sep 15, 2024",
    total: "৳ 45,900",
    paymentStatus: "Paid",
    orderStatus: "Confirm" as OrderStatus,
    items: 2
  }
];

export default function MyAccountPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { clearCart } = useCart();
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [orderFilter, setOrderFilter] = useState<string>("All Orders");
  
  // Dynamic user data with fallback for development
  const displayUser = user || {
    name: "Wasi Ahmed",
    email: "ahmmedwasi6@gmail.com",
    id: "mock-id"
  };

  const [profile, setProfile] = useState({
    fullName: displayUser.name,
    mobileNumber: "+880 1600 000000",
    email: displayUser.email
  });

  // Update profile state when user changes
  React.useEffect(() => {
    if (user) {
      setProfile({
        fullName: user.name,
        mobileNumber: "+880 1600 000000",
        email: user.email
      });
    }
  }, [user]);
  const [address, setAddress] = useState({
    street: "House 12, Road 5, Block C",
    division: "",
    district: "",
    upazila: "",
    postalCode: "1213"
  });

  // Comprehensive Real Bangladesh Administrative Data (Bengali Unicode)
  const BD_DATA: Record<string, Record<string, string[]>> = {
    "ঢাকা": {
      "ঢাকা": ["ঢাকা সদর", "সাভার", "ধামরাই", "কেরানীগঞ্জ", "দোহার", "নবাবগঞ্জ"],
      "গাজীপুর": ["গাজীপুর সদর", "কালিয়াকৈর", "কাপাসিয়া", "শ্রীপুর", "কালীগঞ্জ"],
      "মানিকগঞ্জ": ["মানিকগঞ্জ সদর", "সাটুরিয়া", "সিঙ্গাইর", "ঘিওর", "দৌলতপুর", "শিবালয়", "হরিরামপুর"],
      "মুন্সীগঞ্জ": ["মুন্সীগঞ্জ সদর", "শ্রীনগর", "সিরাজদীখান", "লৌহজং", "টঙ্গীবাড়ী", "গজারিয়া"],
      "নারায়ণগঞ্জ": ["নারায়ণগঞ্জ সদর", "সোনারগাঁও", "রূপগঞ্জ", "আড়াইহাজার", "বন্দর"],
      "নরসিংদী": ["নরসিংদী সদর", "পলাশ", "শিবপুর", "রায়পুরা", "মনোহরদী", "বেলাবো"],
      "কিশোরগঞ্জ": ["কিশোরগঞ্জ সদর", "হোসেনপুর", "করিমগঞ্জ", "তাড়াইল", "পাকুন্দিয়া", "কটিয়াদী", "কুলিয়ারচর", "ভৈরব", "নিকলী", "মিঠামইন", "ইটনা", "অষ্টগ্রাম", "বাজিতপুর"],
      "টাঙ্গাইল": ["টাঙ্গাইল সদর", "সখীপুর", "মির্জাপুর", "মধুপুর", "ভূঞাপুর", "গোপালপুর", "কালিহাতী", "ঘাটাইল", "বাসাইল", "ধনবাড়ী", "দেলদুয়ার", "নাগরপুর"],
      "ফরিদপুর": ["ফরিদপুর সদর", "মধুখালী", "সালথা", "বোয়ালমারী", "সদরপুর", "নগরকান্দা", "ভাঙ্গা", "আলফাডাঙ্গা", "চরভদ্রাসন"],
      "মাদারীপুর": ["মাদারীপুর সদর", "শিবচর", "কালকিনি", "রাজৈর", "ডাসার"],
      "গোপালগঞ্জ": ["গোপালগঞ্জ সদর", "টুঙ্গিপাড়া", "কোটালীপাড়া", "কাশিয়ানী", "মুকসুদপুর"],
      "রাজবাড়ী": ["রাজবাড়ী সদর", "গোয়ালন্দ", "পাংশা", "বালিয়াকান্দি", "কালুখালী"],
      "শরীয়তপুর": ["শরীয়তপুর সদর", "নড়িয়া", "জাজিরা", "ভেদরগঞ্জ", "ডামুড্যা", "গোসাইরহাট"]
    },
    "চট্টগ্রাম": {
      "চট্টগ্রাম": ["চট্টগ্রাম সদর", "পটিয়া", "হাটহাজারী", "রাউজান", "রাঙ্গুনিয়া", "ফটিকছড়ি", "বোয়ালখালী", "আনোয়ারা", "চন্দনাইশ", "লোহাগাড়া", "বাঁশখালী", "সীতাকুণ্ড", "মীরসরাই", "সন্দ্বীপ", "কর্ণফুলী"],
      "কুমিল্লা": ["কুমিল্লা সদর", "বরুড়া", "চান্দিনা", "চৌদ্দগ্রাম", "দাউদকান্দি", "দেবিদ্বার", "হোমনা", "লাকসাম", "মুরাদনগর", "নাঙ্গলকোট", "তিতাস", "মেঘনা", "বুড়িচং", "ব্রাহ্মণপাড়া", "কুমিল্লা সদর দক্ষিণ", "মনোহরগঞ্জ", "লালমাই"],
      "ফেনী": ["ফেনী সদর", "ছাগলনাইয়া", "দাগনভূঞা", "পরশুরাম", "ফুলগাজী", "সোনাগাজী"],
      "ব্রাহ্মণবাড়িয়া": ["ব্রাহ্মণবাড়িয়া সদর", "কসবা", "নাসিরনগর", "সরাইল", "আশুগঞ্জ", "আখাউড়া", "নবীনগর", "বাঞ্ছারামপুর", "বিজয়নগর"],
      "রাঙ্গামাটি": ["রাঙ্গামাটি সদর", "কাপ্তাই", "কাউখালী", "বাঘাইছড়ি", "বরকল", "লংগদু", "রাজস্থলী", "বেলাইছড়ি", "জুরাছড়ি", "নানিয়ারচর"],
      "নোয়াখালী": ["নোয়াখালী সদর", "বেগমগঞ্জ", "চাটখিল", "সেনবাগ", "হাতিয়া", "কোম্পানীগঞ্জ", "সোনাইমুড়ী", "সুবর্ণচর", "কবিরহাট"],
      "চাঁদপুর": ["চাঁদপুর সদর", "হাইমচর", "কচুয়া", "ফরিদগঞ্জ", "মতলব উত্তর", "মতলব দক্ষিণ", "হাজীগঞ্জ", "শাহরাস্তি"],
      "লক্ষ্মীপুর": ["লক্ষ্মীপুর সদর", "রায়পুর", "রামগঞ্জ", "রামগতি", "কমলনগর"],
      "কক্সবাজার": ["কক্সবাজার সদর", "চকরিয়া", "কুতুবদিয়া", "মহেশখালী", "রামু", "টেকনাফ", "উখিয়া", "পেকুয়া", "ঈদগাঁও"],
      "খাগড়াছড়ি": ["খাগড়াছড়ি সদর", "দীঘিনালা", "পানছড়ি", "লক্ষ্মীছড়ি", "মহালছড়ি", "মানিকছড়ি", "মাটিরাঙ্গা", "রামগড়", "গুইমারা"],
      "বান্দরবান": ["বান্দরবান সদর", "রুমা", "থানচি", "রোয়াংছড়ি", "লামা", "আলীকদম", "নাইক্ষ্যংছড়ি"]
    },
    "রাজশাহী": {
      "রাজশাহী": ["রাজশাহী সদর", "পবা", "গোদাগাড়ী", "তানোর", "বাঘমারা", "দুর্গাপুর", "পুঠিয়া", "চারঘাট", "বাঘা", "মোহনপুর"],
      "নাটোর": ["নাটোর সদর", "বাগাতিপাড়া", "বড়াইগ্রাম", "গুরুদাসপুর", "লালপুর", "সিংড়া", "নলডাঙ্গা"],
      "পাবনা": ["পাবনা সদর", "ঈশ্বরদী", "ভাঙ্গুড়া", "চাটমোহর", "সাঁথিয়া", "সুজানগর", "বেড়া", "আটঘরিয়া", "ফরিদপুর"],
      "বগুড়া": ["বগুড়া সদর", "দুপচাঁচিয়া", "সারিয়াকান্দি", "সোনাতলা", "গাবতলী", "শেরপুর", "শিবগঞ্জ", "নন্দীগ্রাম", "ধুনট", "কাহালু", "আদমদিঘী", "শাজাহানপুর"],
      "সিরাজগঞ্জ": ["সিরাজগঞ্জ সদর", "বেলকুচি", "চৌহালী", "কামারখন্দ", "কাজীপুর", "রায়গঞ্জ", "শাহজাদপুর", "তাড়াশ", "উল্লাপাড়া"],
      "জয়পুরহাট": ["জয়পুরহাট সদর", "আক্কেলপুর", "কালাই", "ক্ষেতলাল", "পাঁচবিবি"],
      "নওগাঁ": ["নওগাঁ সদর", "রানীনগর", "আত্রাই", "বদলগাছী", "মহাদেবপুর", "পত্নীতলা", "ধামইরহাট", "সাপাহার", "পোরশা", "মান্দা", "নিয়ামতপুর"],
      "চাঁপাইনবাবগঞ্জ": ["চাঁপাইনবাবগঞ্জ সদর", "শিবগঞ্জ", "নাচোল", "ভোলাহাট", "গোমস্তাপুর"]
    },
    "খুলনা": {
      "খুলনা": ["খুলনা সদর", "ডুমুরিয়া", "পাইকগাছা", "ফুলতলা", "দাকোপ", "দিঘলিয়া", "কয়রা", "বটীয়ঘাটা", "রূপসা", "তেরখাদা"],
      "যশোর": ["যশোর সদর", "অভয়নগর", "কেশবপুর", "বাঘারপাড়া", "ঝিকরগাছা", "চৌগাছা", "মনিরামপুর", "শার্শা"],
      "সাতক্ষীরা": ["সাতক্ষীরা সদর", "কলারোয়া", "তালা", "দেবহাটা", "কালিগঞ্জ", "শ্যামনগর", "আশাশুনি"],
      "বাগেরহাট": ["বাগেরহাট সদর", "মোল্লাহাট", "কচুয়া", "চিতলমারী", "ফকিরহাট", "রামপাল", "মোংলা", "মোরেলগঞ্জ", "শরণখোলা"],
      "মাগুরা": ["মাগুরা সদর", "শ্রীপুর", "শালিখা", "মহম্মদপুর"],
      "ঝিনাইদহ": ["ঝিনাইদহ সদর", "শৈলকুপা", "হরিণাকুণ্ডু", "কালীগঞ্জ", "কোটচাঁদপুর", "মহেশপুর"],
      "নড়াইল": ["নড়াইল সদর", "লোহাগড়া", "কালিয়া"],
      "কুষ্টিয়া": ["কুষ্টিয়া সদর", "কুমারখালী", "দৌলতপুর", "মিরপুর", "ভেড়ামারা", "খোকসা"],
      "চুয়াডাঙ্গা": ["চুয়াডাঙ্গা সদর", "আলমডাঙ্গা", "জীবননগর", "দামুড়হুদা"],
      "মেহেরপুর": ["মেহেরপুর সদর", "গাংনী", "মুজিবনগর"]
    },
    "বরিশাল": {
      "বরিশাল": ["বরিশাল সদর", "বাকেরগঞ্জ", "বাবুগঞ্জ", "উজিরপুর", "বানারীপাড়া", "গৌরনদী", "আগৈলঝাড়া", "মেহেন্দিগঞ্জ", "হিজলা", "মুলাদী"],
      "ভোলা": ["ভোলা সদর", "দৌলতখান", "বোরহানউদ্দিন", "তজুমদ্দিন", "লালমোহন", "চরফ্যাশন", "মনপুরা"],
      "ঝালকাঠি": ["ঝালকাঠি সদর", "নলছিটি", "রাজাপুর", "কাঁঠালিয়া"],
      "পটুয়াখালী": ["পটুয়াখালী সদর", "মির্জাগঞ্জ", "বাউফল", "দশমিনা", "গলাচিপা", "কলাপারা", "রাঙ্গাবালী", "দুমকী"],
      "পিরোজপুর": ["পিরোজপুর সদর", "নাজিরপুর", "কাউখালী", "ভান্ডারিয়া", "মঠবাড়িয়া", "নেছারাবাদ", "ইন্দুরকানী"],
      "বরগুনা": ["বরগুনা সদর", "আমতলী", "বেতাগী", "বামনা", "পাথরঘাটা", "তালতলী"]
    },
    "সিলেট": {
      "সিলেট": ["সিলেট সদর", "গোলাপগঞ্জ", "বিয়ানীবাজার", "কানাইঘাট", "গোয়াইনঘাট", "জৈন্তাপুর", "বিশ্বনাথ", "বালাগঞ্জ", "দক্ষিণ সুরমা", "কোম্পানীগঞ্জ", "জকিগঞ্জ", "ফেঞ্চুগঞ্জ", "ওসমানীনগর"],
      "মৌলভীবাজার": ["মৌলভীবাজার সদর", "শ্রীমঙ্গল", "কমলগঞ্জ", "রাজনগর", "কুলাউড়া", "বড়লেখা", "জুড়ী"],
      "হবিগঞ্জ": ["হবিগঞ্জ সদর", "আজমিরীগঞ্জ", "বানিয়াচং", "বাহুবল", "চুনারুঘাট", "লাখাই", "মাধবপুর", "নবীগঞ্জ", "শায়েস্তাগঞ্জ"],
      "সুনামগঞ্জ": ["সুনামগঞ্জ সদর", "দক্ষিণ সুনামগঞ্জ", "বিশ্বম্ভরপুর", "ছাতক", "দোয়ারাবাজার", "তাহিরপুর", "জামালগঞ্জ", "ধর্মপাশা", "দিরাই", "শাল্লা", "জগন্নাথপুর", "মধ্যনগর"]
    },
    "রংপুর": {
      "রংপুর": ["রংপুর সদর", "পীরগাছা", "কাউনিয়া", "মিঠাপুকুর", "বদরগঞ্জ", "তারাগঞ্জ", "গংগাচড়া", "পীরগঞ্জ"],
      "দিনাজপুর": ["দিনাজপুর সদর", "বিরল", "বিরামপুর", "বীরগঞ্জ", "বোচাগঞ্জ", "চিরিরবন্দর", "ফুলবাড়ী", "ঘোড়াঘাট", "হাকিমপুর", "কাহারোল", "খানসামা", "নবাবগঞ্জ", "পার্বতীপুর"],
      "গাইবান্ধা": ["গাইবান্ধা সদর", "ফুলছড়ি", "সাঘাটা", "পলাশবাড়ী", "গোবিন্দগঞ্জ", "সাদুল্লাপুর", "সুন্দরগঞ্জ"],
      "কুড়িগ্রাম": ["কুড়িগ্রাম সদর", "নাগেশ্বরী", "ভূরুঙ্গামারী", "ফুলবাড়ী", "রাজারহাট", "উলিপুর", "চিলমারী", "রৌমারী", "রাজিবপুর"],
      "নীলফামারী": ["নীলফামারী সদর", "সৈয়দপুর", "জলঢাকা", "কিশোরগঞ্জ", "ডোমার", "ডিমলা"],
      "লালমনিরহাট": ["লালমনিরহাট সদর", "আদিতমারী", "কালীগঞ্জ", "হাতীবান্ধা", "পাটগ্রাম"],
      "পঞ্চগড়": ["পঞ্চগড় সদর", "আটোয়ারী", "বোদা", "দেবীগঞ্জ", "তেঁতুলিয়া"],
      "ঠাকুরগাঁও": ["ঠাকুরগাঁও সদর", "বালিয়াডাঙ্গী", "হরিপুর", "পীরগঞ্জ", "রানীশংকৈল"]
    },
    "ময়মনসিংহ": {
      "ময়মনসিংহ": ["ময়মনসিংহ সদর", "ফুলবাড়িয়া", "ত্রিশাল", "ভালুকা", "মুক্তাগাছা", "ফুলপুর", "হালুয়াঘাট", "গৌরীপুর", "ঈশ্বরগঞ্জ", "নান্দাইল", "তারাকান্দা", "ধোবাউড়া", "গফরগাঁও"],
      "জামালপুর": ["জামালপুর সদর", "মেলান্দহ", "ইসলামপুর", "দেওয়ানগঞ্জ", "সরিষাবাড়ী", "মাদারগঞ্জ", "বকশীগঞ্জ"],
      "শেরপুর": ["শেরপুর সদর", "নালিতাবাড়ী", "শ্রীবরদী", "ঝিনাইগাতী", "নকলা"],
      "নেত্রকোনা": ["নেত্রকোনা সদর", "বারহাট্টা", "দুর্গাপুর", "কেন্দুয়া", "আটপাড়া", "মদন", "খালিয়াজুরী", "মোহনগঞ্জ", "পূর্বধলা", "কলমাকান্দা"]
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      clearCart();
      navigate("/");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "orders":
        const filteredOrders = MOCK_ORDERS.filter(o => 
          orderFilter === "All Orders" || o.orderStatus === orderFilter
        );

        const getStatusCount = (status: string) => 
          status === "All Orders" ? MOCK_ORDERS.length : MOCK_ORDERS.filter(o => o.orderStatus === status).length;

        return (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
              <h3 className="text-xl font-bold text-slate-900">Purchase History</h3>
              
              {/* Order Status Filters */}
              <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-1 overflow-x-auto max-w-full no-scrollbar">
                {["All Orders", "Pending", "Confirm"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setOrderFilter(filter)}
                    className={`px-6 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      orderFilter === filter 
                        ? 'bg-white text-indigo-600 shadow-sm' 
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {filter} <span className="ml-1 opacity-50">({getStatusCount(filter)})</span>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Order ID</th>
                      <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                      <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">Items</th>
                      <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Total</th>
                      <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50/50 transition-colors group">
                        <td className="py-5 px-6">
                          <span className="text-sm font-bold text-indigo-600">{order.id}</span>
                        </td>
                        <td className="py-5 px-6">
                          <span className="text-sm text-slate-600 font-medium">{order.date}</span>
                        </td>
                        <td className="py-5 px-6 text-sm text-slate-500 font-medium hidden md:table-cell">
                          {order.items} {order.items > 1 ? 'items' : 'item'}
                        </td>
                        <td className="py-5 px-6 text-sm font-bold text-slate-900">{order.total}</td>
                        <td className="py-5 px-6 text-right">
                          <span className={`inline-flex px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            order.orderStatus === 'Pending' 
                              ? 'bg-amber-100 text-amber-700' 
                              : 'bg-indigo-600 text-white shadow-lg shadow-indigo-100'
                          }`}>
                            {order.orderStatus}
                          </span>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={5} className="py-20 text-center">
                          <div className="max-w-xs mx-auto">
                            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto mb-4">
                              <Package className="w-8 h-8" />
                            </div>
                            <h5 className="text-slate-900 font-bold mb-1">No {orderFilter} Orders</h5>
                            <p className="text-slate-500 text-sm">You haven't placed any orders in this category yet.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case "profile":
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-900">Personal Details</h3>
                {!isEditingProfile && (
                  <button 
                    onClick={() => setIsEditingProfile(true)}
                    className="text-indigo-600 hover:text-indigo-700 p-2 bg-indigo-50 rounded-xl transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <div className="space-y-6">
                <div className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 ${isEditingProfile ? 'bg-white border-indigo-200 shadow-sm ring-4 ring-indigo-50' : 'bg-slate-50 border-slate-100'}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isEditingProfile ? 'bg-indigo-600 text-white' : 'bg-white text-slate-400'}`}>
                    <User className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${isEditingProfile ? 'text-indigo-400' : 'text-slate-400'}`}>Full Name</p>
                    {isEditingProfile ? (
                      <input
                        type="text"
                        value={profile.fullName}
                        onChange={(e) => setProfile({...profile, fullName: e.target.value})}
                        className="w-full bg-transparent border-none p-0 text-sm font-bold text-slate-900 focus:ring-0 focus:outline-none mt-0.5 placeholder:text-slate-300"
                        autoFocus
                        placeholder="Enter your full name"
                      />
                    ) : (
                      <p className="text-sm font-bold text-slate-900">{profile.fullName}</p>
                    )}
                  </div>
                </div>
                
                <div className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 ${isEditingProfile ? 'bg-white border-indigo-200 shadow-sm ring-4 ring-indigo-50' : 'bg-slate-50 border-slate-100'}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isEditingProfile ? 'bg-indigo-600 text-white' : 'bg-white text-slate-400'}`}>
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${isEditingProfile ? 'text-indigo-400' : 'text-slate-400'}`}>Email Address</p>
                    {isEditingProfile ? (
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        className="w-full bg-transparent border-none p-0 text-sm font-bold text-slate-900 focus:ring-0 focus:outline-none mt-0.5 placeholder:text-slate-300"
                        placeholder="Enter your email address"
                      />
                    ) : (
                      <p className="text-sm font-bold text-slate-900">{profile.email}</p>
                    )}
                  </div>
                </div>

                <div className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 ${isEditingProfile ? 'bg-white border-indigo-200 shadow-sm ring-4 ring-indigo-50' : 'bg-slate-50 border-slate-100'}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isEditingProfile ? 'bg-indigo-600 text-white' : 'bg-white text-slate-400'}`}>
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${isEditingProfile ? 'text-indigo-400' : 'text-slate-400'}`}>Mobile Number</p>
                    {isEditingProfile ? (
                      <input
                        type="tel"
                        value={profile.mobileNumber}
                        onChange={(e) => setProfile({...profile, mobileNumber: e.target.value})}
                        className="w-full bg-transparent border-none p-0 text-sm font-bold text-slate-900 focus:ring-0 focus:outline-none mt-0.5 placeholder:text-slate-300"
                        placeholder="Enter your mobile number"
                      />
                    ) : (
                      <p className="text-sm font-bold text-slate-900">{profile.mobileNumber}</p>
                    )}
                  </div>
                </div>

                {isEditingProfile && (
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={() => setIsEditingProfile(false)}
                      className="flex-1 bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 active:scale-[0.98]"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditingProfile(false)}
                      className="px-8 py-4 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all active:scale-[0.98]"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-900">Default Shipping Address</h3>
                <button 
                  onClick={() => setIsEditingAddress(!isEditingAddress)}
                  className="text-indigo-600 hover:text-indigo-700 p-2 bg-indigo-50 rounded-xl transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                </button>
              </div>

              {isEditingAddress ? (
                <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 ml-1">বিভাগ (Division) *</label>
                      <select
                        value={address.division}
                        onChange={(e) => {
                          const div = e.target.value;
                          setAddress({
                            ...address, 
                            division: div, 
                            district: "", 
                            upazila: ""
                          });
                        }}
                        className="w-full bg-slate-50 border-slate-200 border-2 focus:bg-white focus:border-indigo-600 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none transition-all max-h-60 overflow-y-auto"
                      >
                        <option value="">বিভাগ নির্বাচন করুন</option>
                        {Object.keys(BD_DATA).map(div => <option key={div} value={div}>{div}</option>)}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 ml-1">জেলা (District) *</label>
                        <select
                          value={address.district}
                          disabled={!address.division}
                          onChange={(e) => {
                            const dist = e.target.value;
                            setAddress({
                              ...address, 
                              district: dist, 
                              upazila: ""
                            });
                          }}
                          className="w-full bg-slate-50 border-slate-200 border-2 focus:bg-white focus:border-indigo-600 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none transition-all disabled:opacity-50 max-h-60 overflow-y-auto"
                        >
                          <option value="">জেলা নির্বাচন করুন</option>
                          {address.division && Object.keys(BD_DATA[address.division]).map(dist => (
                            <option key={dist} value={dist}>{dist}</option>
                          ))}
                        </select>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 ml-1">উপজেলা (Upazila) *</label>
                        <select
                          value={address.upazila}
                          disabled={!address.district}
                          onChange={(e) => setAddress({...address, upazila: e.target.value})}
                          className="w-full bg-slate-50 border-slate-200 border-2 focus:bg-white focus:border-indigo-600 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none transition-all disabled:opacity-50 max-h-60 overflow-y-auto"
                        >
                          <option value="">উপজেলা নির্বাচন করুন</option>
                          {address.division && address.district && BD_DATA[address.division][address.district].map(up => (
                            <option key={up} value={up}>{up}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 ml-1">Street Address / Village / Home No (একদম মেইন ঠিকানা)</label>
                      <textarea
                        rows={2}
                        value={address.street}
                        onChange={(e) => setAddress({...address, street: e.target.value})}
                        className="w-full bg-slate-50 border-slate-200 border-2 focus:bg-white focus:border-indigo-600 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none transition-all resize-none"
                        placeholder="House 12, Road 5, Block C"
                      />
                    </div>
                  </div>

                  <button 
                    disabled={!address.division || !address.district || !address.upazila || !address.street}
                    onClick={() => {
                      setIsEditingAddress(false);
                    }}
                    className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 group active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Save Address
                  </button>
                </div>
              ) : (
                <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Building className="w-20 h-20 text-indigo-900" />
                  </div>
                  <p className="text-sm font-bold text-indigo-900 mb-1 leading-relaxed">{address.street}</p>
                  <p className="text-sm text-indigo-700 font-medium">
                    {address.upazila}, {address.district}, {address.division}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4" />
                    Verified Shipping Hub
                  </div>
                </div>
              )}
              
              <div className="mt-8 pt-8 border-t border-slate-50">
                <p className="text-xs text-slate-400 italic">
                  Note: Updating your address book will affect future orders only. Active shipments will still be delivered to the previously selected hub.
                </p>
              </div>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="max-w-2xl">
            <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm space-y-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6">Account Settings</h3>
                <div className="space-y-4">
                  {[
                    { title: "Email Notifications", desc: "Receive order updates and marketing emails", active: true },
                    { title: "SMS Alerts", desc: "Get real-time tracking updates via SMS", active: false },
                    { title: "Two-Factor Auth", desc: "Enable an extra layer of security", active: true }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div>
                        <p className="text-sm font-bold text-slate-900">{item.title}</p>
                        <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
                      </div>
                      <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${item.active ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${item.active ? 'translate-x-6' : 'translate-x-0'}`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-slate-50">
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-600 font-bold text-sm hover:text-red-700 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out of All Sessions
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-slate-50 flex-grow">
      {/* Dashboard Header */}
      <section className="bg-gradient-to-br from-[#2d1b69] to-[#1e1245] pt-24 pb-32 px-4 relative overflow-hidden">
        {/* Orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 relative z-10">
          {/* Avatar Container */}
          <div className="relative group">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-[40px] bg-white p-1 shadow-2xl shadow-black/20 overflow-hidden transform group-hover:rotate-3 transition-transform duration-500">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Wasi&backgroundColor=b6e3f4" 
                alt="Profile"
                className="w-full h-full object-cover rounded-[36px]"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-indigo-600 text-white rounded-2xl flex items-center justify-center border-4 border-[#2d1b69] shadow-lg">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>

          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">Welcome, {profile.fullName}</h1>
              <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-bold text-indigo-200 uppercase tracking-widest">
                Platinum Member
              </span>
            </div>
            <p className="text-indigo-200/70 font-medium">Managing your orders and account preferences with AeroCart.</p>
          </div>
          

        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 -mt-20 pb-24 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Side Navigation */}
          <div className="w-full lg:w-72 shrink-0">
            <div className="bg-white rounded-3xl p-3 border border-slate-100 shadow-xl shadow-slate-200/40 sticky top-24">
              <div className="space-y-1">
                {[
                  { id: 'profile', icon: <User className="w-5 h-5" />, label: 'Profile Hub' },
                  { id: 'orders', icon: <Package className="w-5 h-5" />, label: 'My Orders' },
                  { id: 'settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as TabType)}
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold text-sm transition-all duration-300 ${
                      activeTab === tab.id 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' 
                        : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>
              
              <div className="mt-8 pt-8 border-t border-slate-50 px-5 pb-4">
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-4 text-slate-400 hover:text-red-500 font-bold text-sm transition-colors group"
                >
                  <LogOut className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Dynamic Content */}
          <div className="flex-1 min-w-0">
            {renderTabContent()}
          </div>
        </div>
      </section>
    </div>
  );
}

function Building(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}
