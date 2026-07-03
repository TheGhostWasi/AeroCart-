import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  CheckCircle,
  Clock,
  ArrowLeft,
  MapPin,
  Phone,
  User,
  Mail,
  Truck,
  CreditCard,
  ShoppingBag,
  Ticket,
  Info,
  AlertCircle,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import SEO from "./SEO";

const checkoutSchema = z.object({
  fullName: z.string().min(2, "আপনার সঠিক নাম লিখুন (কমপক্ষে ২ অক্ষর)"),
  phone: z.string().regex(/^(01)[3-9]{1}[0-9]{8}$/, "সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (উদাঃ 017XXXXXXXX)"),
  email: z.string().email("সঠিক ইমেইল এড্রেস দিন").optional().or(z.literal("")),
  division: z.string().min(1, "বিভাগ নির্বাচন করুন"),
  district: z.string().min(1, "জেলা নির্বাচন করুন"),
  upazila: z.string().min(1, "উপজেলা নির্বাচন করুন"),
  address: z.string().min(5, "আপনার সম্পূর্ণ বিস্তারিত ঠিকানা প্রদান করুন (কমপক্ষে ৫ অক্ষর)"),
  paymentMethod: z.enum(["cod", "mobile_pay"]),
  deliveryArea: z.enum(["inside", "outside"]),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

interface LocationData {
  [division: string]: {
    [district: string]: string[];
  };
}

export default function CheckoutPage({
  onGoHome,
}: {
  onGoHome: () => void;
}) {
  const navigate = useNavigate();
  const { cartItems, cartSubtotal, cartTax, cartTotal, clearCart } = useCart();

  // State-loaded hierarchical location data for 8 divisions in Bangladesh
  const locationData: LocationData = {
    "ঢাকা": {
      "ঢাকা": ["ঢাকা সদর", "সাভার", "ধামরাই", "কেরানীগঞ্জ", "দোহার", "নবাবগঞ্জ"],
      "গাজীপুর": ["গাজীপুর সদর", "কালিয়াকৈর", "কাপাসিয়া", "শ্রীপুর", "কালীগঞ্জ"],
      "মানিকগঞ্জ": ["মানিকগঞ্জ সদর", "সাটুরিয়া", "সিঙ্গাইর", "ঘিওর", "দৌলতপুর", "শিবালয়", "হরিরামপুর"],
      "মুন্সীগঞ্জ": ["মুন্সীগঞ্জ সদর", "শ্রীনগর", "সিরাজদীখান", "লৌহজং", "টঙ্গীবাড়ী", "গজারিয়া"],
      "নারায়ণগঞ্জ": ["নারায়ণগঞ্জ সদর", "সোনারগাঁও", "রূপগঞ্জ", "আড়াইহাজার", "বন্দর"],
      "নরসিংদী": ["নরসিংদী সদর", "পলাশ", "শিবপুর", "রায়পুরা", "মনোহরদী", "বেলাবো"],
      "কিশোরগঞ্জ": ["কিশোরগঞ্জ সদর", "হোসেনপুর", "করিমগঞ্জ", "তাড়াইল", "পাকুন্দিয়া", "কটিয়াদী", "কুলিয়ারচর", "ভৈরব", "নিকলী", "মিঠামইন", "ইটনা", "অষ্টগ্রাম", "বাজিতপুর"],
      "টাঙ্গাইল": ["টাঙ্গাইল সদর", "সখীপুর", "মির্জাপুর", "মধুপুর", "ভূঞাপুর", "গোপালপুর", "কালিহাতী", "ঘাটাইল", "বাসাইল", "ধনবাড়ী", "দেলদুয়ার", "নাগরপুর"],
      "ফরিদপুর": ["ফরিদপুর সদর", "সালথা", "বোয়ালমারী", "সদরপুর", "নগরকান্দা", "ভাঙ্গা", "আলফাডাঙ্গা", "চরভদ্রাসন"],
      "মাদারীপুর": ["মাদারীপুর সদর", "শিবচর", "কালকিনি", "রাজৈর"],
      "গোপালগঞ্জ": ["গোপালগঞ্জ সদর", "টুঙ্গিপাড়া", "কোটালীপাড়া", "কাশিয়ানী", "মুকসুদপুর"],
      "রাজবাড়ী": ["রাজবাড়ী সদর", "গোয়ালন্দ", "পাংশা", "বালিয়াকান্দি", "কালুখালী"],
      "শরীয়তপুর": ["শরীয়তপুর সদর", "নড়িয়া", "জাজিরা", "ভেদরগঞ্জ", "ডামুড্যা", "গোসাইরহাট"]
    },
    "চট্টগ্রাম": {
      "চট্টগ্রাম": ["চট্টগ্রাম সদর", "পটিয়া", "হাটহাজারী", "রাউজান", "রাঙ্গুনিয়া", "ফটিকছড়ি", "বোয়ালখালী", "আনোয়ারা", "চন্দনাইশ", "লোহাগাড়া", "বাঁশখালী", "সীতাকুণ্ড", "মীরসরাই", "সন্দ্বীপ", "কর্ণফুলী"],
      "কুমিল্লা": ["কুমিল্লা সদর", "বরুড়া", "চান্দিনা", "চৌদ্দগ্রাম", "দাউদকান্দি", "দেবিদ্বার", "হোমনা", "লাকসাম", "মুরাদনগর", "নাঙ্গলকোট", "তিতাস", "মেঘনা", "বুড়িচং", "ব্রাহ্মণপাড়া", "কুমিল্লা সদর দক্ষিণ", "মনোহরগঞ্জ", "লালমাই"],
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

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      division: "",
      district: "",
      upazila: "",
      address: "",
      paymentMethod: "cod",
      deliveryArea: "inside",
    },
    mode: "onChange",
  });

  const watchDivision = watch("division");
  const watchDistrict = watch("district");
  const watchUpazila = watch("upazila");
  const watchDeliveryArea = watch("deliveryArea");
  const watchPaymentMethod = watch("paymentMethod");

  // Coupon State
  const [couponInput, setCouponInput] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponStatus, setCouponStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleApplyCoupon = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    if (couponInput.toUpperCase() === "AEROCART50") {
      setDiscount(50);
      setCouponStatus({ type: 'success', message: "৳ ৫০ ডিসকাউন্ট সফলভাবে প্রয়োগ করা হয়েছে!" });
    } else {
      setDiscount(0);
      setCouponStatus({ type: 'error', message: "ভুল কুপন কোড! আবার চেষ্টা করুন।" });
    }
  };

  // Automate Delivery Area based on Upazila selection
  useEffect(() => {
    if (watchUpazila === "ঢাকা সদর") {
      setValue("deliveryArea", "inside", { shouldValidate: true });
    } else if (watchUpazila) {
      setValue("deliveryArea", "outside", { shouldValidate: true });
    }
  }, [watchUpazila, setValue]);

  // Reset dependent fields when higher level hierarchical selection changes
  useEffect(() => {
    setValue("district", "", { shouldValidate: true });
    setValue("upazila", "", { shouldValidate: true });
  }, [watchDivision, setValue]);

  useEffect(() => {
    setValue("upazila", "", { shouldValidate: true });
  }, [watchDistrict, setValue]);

  // Success screen state
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<any>(null);

  const deliveryCharge = watchDeliveryArea === "inside" ? 60 : 160;
  const grandTotal = cartTotal + deliveryCharge - discount;

  const onSubmit = (data: CheckoutFormData) => {
    if (cartItems.length === 0) {
      alert("আপনার কার্ট খালি রয়েছে। অর্ডার প্লেস করতে পণ্য কার্ট-এ যোগ করুন।");
      return;
    }

    // Capture the order data for future administrative dashboard/backend readiness
    const orderId = `AERO-${Date.now().toString().slice(-6)}`;
    const newOrder = {
      orderId,
      customer: {
        name: data.fullName,
        phone: data.phone,
        email: data.email || "N/A",
        address: data.address,
        division: data.division,
        district: data.district,
        upazila: data.upazila,
        deliveryArea: data.deliveryArea,
      },
      items: cartItems.map((item) => ({
        productId: item.productId,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        imageURL: item.imageURL,
      })),
      pricing: {
        subtotal: cartSubtotal,
        tax: cartTax,
        deliveryCharge,
        grandTotal,
      },
      payment: {
        method: data.paymentMethod === "cod" ? "Cash on Delivery" : "Mobile Banking (bKash/Nagad/Rocket)",
        status: "Unpaid (Pending Delivery Charge Validation)",
      },
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    // Save order data to local history to make it fully accessible for future admin panels (Administrative Readiness)
    try {
      const existingOrders = JSON.parse(localStorage.getItem("orders_history") || "[]");
      existingOrders.push(newOrder);
      localStorage.setItem("orders_history", JSON.stringify(existingOrders));
    } catch (err) {
      console.error("Failed to save order history to localStorage:", err);
    }

    setPlacedOrder(newOrder);
    setIsSubmitted(true);
    clearCart(); // Clean cart state upon successful order receipt
    if (window.innerWidth < 768) {
      setTimeout(() => window.scrollTo(0, 0), 10);
    }
  };

  if (isSubmitted && placedOrder) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16 font-sans">
        {/* Animated Order Success Card styled in AeroCart theme */}
        <div className="bg-white rounded-3xl border border-gray-150 p-6 md:p-10 shadow-xl shadow-slate-100 max-w-2xl mx-auto text-center" id="order-success-card">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-amber-50 text-amber-500 mb-6 border border-amber-100 animate-pulse">
            <Clock className="w-10 h-10 stroke-[2]" />
          </div>

          <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 mb-2">
            অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে!
          </h2>
          <p className="text-sm font-semibold text-indigo-600 mb-5 select-all font-mono">
            Order ID: {placedOrder.orderId}
          </p>

          {/* Mandated Bengali Notification Message Block */}
          <div className="bg-indigo-50/70 border-l-4 border-indigo-600 rounded-2xl p-5 mb-8 text-left leading-relaxed">
            <p className="text-sm text-indigo-950 font-medium font-sans">
              "আপনার অর্ডারটি বর্তমানে 'Pending' অবস্থায় রয়েছে। আমাদের একজন প্রতিনিধি শীঘ্রই আপনার সাথে যোগাযোগ করবেন। ডেলিভারি চার্জ পরিশোধ করার সাথে সাথেই আপনার অর্ডারটি নিশ্চিত (Confirm) করা হবে।"
            </p>
          </div>

          {/* Quick Info breakdown */}
          <div className="border border-gray-100 rounded-2xl p-5 mb-8 text-left space-y-3 bg-slate-50/50">
            <h3 className="text-xs font-extrabold text-gray-900 uppercase tracking-wider mb-2">Order Details Resume</h3>
            <div className="flex justify-between text-xs text-gray-600">
              <span className="font-semibold text-gray-500">গ্রাহকের নাম:</span>
              <span className="font-bold text-gray-800">{placedOrder.customer.name}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span className="font-semibold text-gray-500">মোবাইল নম্বর:</span>
              <span className="font-bold text-gray-800">{placedOrder.customer.phone}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-600 pt-1 border-t border-gray-100">
              <div className="flex justify-between md:block">
                <span className="font-semibold text-gray-500 block">বিভাগ/জেলা:</span>
                <span className="font-bold text-gray-800">{placedOrder.customer.division} / {placedOrder.customer.district}</span>
              </div>
              <div className="flex justify-between md:block">
                <span className="font-semibold text-gray-500 block">উপজেলা:</span>
                <span className="font-bold text-gray-800">{placedOrder.customer.upazila}</span>
              </div>
            </div>
            <div className="flex flex-col text-xs text-gray-600 pt-1">
              <span className="font-semibold text-gray-500">বিস্তারিত ঠিকানা:</span>
              <span className="font-bold text-gray-800 bg-white/70 rounded-lg p-2 border border-gray-100 mt-1 leading-normal break-words">{placedOrder.customer.address}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-650 pt-2.5 border-t border-gray-150">
              <span className="font-extrabold text-gray-900">মোট পরিশোধযোগ্য মূল্য:</span>
              <span className="font-extrabold text-indigo-600 text-sm">৳ {placedOrder.pricing.grandTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Button Options */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => {
                navigate("/");
                if (onGoHome) onGoHome();
              }}
              className="px-6 py-3.5 bg-indigo-600 hover:bg-slate-900 hover:text-white text-white text-xs font-bold rounded-xl transition-all shadow-md active:scale-[0.98] cursor-pointer"
            >
              Back to Home page
            </button>
            <button
              onClick={() => {
                navigate("/products");
              }}
              className="px-6 py-3.5 border border-gray-300 hover:border-gray-450 hover:bg-slate-55 bg-white text-gray-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 font-sans" id="checkout-main-content">
      <SEO 
        title="Checkout" 
        description="Secure checkout at AeroCart. Complete your purchase and get everything you need delivered fast."
      />
      {/* Header Breadcrumb navigation */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-white hover:bg-slate-100 text-gray-600 hover:text-gray-900 border border-gray-200 rounded-xl transition-all cursor-pointer shadow-sm flex items-center justify-center"
          title="Go Back"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">Checkout Details</h1>
          <p className="text-xs text-gray-500 font-medium">Provide your details to complete the purchase</p>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-150 p-10 text-center shadow-lg shadow-slate-100 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-350 mx-auto mb-4 border border-slate-100">
            <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h2 className="text-lg font-bold text-gray-800 mb-2">আপনার কার্ট-এ কোন পণ্য নেই</h2>
          <p className="text-xs text-gray-500 mb-6">কোন পণ্য ক্রয় করার জন্য প্রথমে সেটি কার্ট-এ যুক্ত করুন।</p>
          <button
            onClick={() => navigate("/")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-6 py-3.5 rounded-xl shadow-md transition-all cursor-pointer"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Details */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-120 p-6 md:p-8 space-y-6 shadow-sm">
            
            {/* Billing / Shipping section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <MapPin className="w-5 h-5 text-indigo-650" />
                <h2 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider">
                  ডেলিভারি ঠিকানা ও তথ্য (Delivery Info)
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-gray-700 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-indigo-600" />
                    আপনার নাম *
                  </label>
                  <input
                    type="text"
                    {...register("fullName")}
                    placeholder="নামটি বাংলায় অথবা ইংরেজিতে লিখুন"
                    className={`w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition-all font-medium text-gray-800 bg-slate-50/30 ${errors.fullName ? "border-red-500 focus:ring-red-100" : ""}`}
                  />
                  {errors.fullName && (
                    <p className="text-[10px] text-red-500 font-bold flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" /> {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Mobile Phone Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-gray-700 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-indigo-600" />
                    মোবাইল নম্বর *
                  </label>
                  <input
                    type="tel"
                    {...register("phone")}
                    placeholder="উদাঃ 017XXXXXXXX"
                    className={`w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition-all font-mono text-gray-800 bg-slate-50/30 ${errors.phone ? "border-red-500 focus:ring-red-100" : ""}`}
                  />
                  {errors.phone && (
                    <p className="text-[10px] text-red-500 font-bold flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" /> {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email Optional */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-gray-700 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-indigo-600" />
                  ইমেইল এড্রেস (ঐচ্ছিক)
                </label>
                <input
                  type="email"
                  {...register("email")}
                  placeholder="name@example.com"
                  className={`w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition-all font-medium text-gray-800 bg-slate-50/30 ${errors.email ? "border-red-500 focus:ring-red-100" : ""}`}
                />
                {errors.email && (
                  <p className="text-[10px] text-red-500 font-bold flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" /> {errors.email.message}
                  </p>
                )}
              </div>

              {/* Hierarchical dropdowns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Division Dropdown */}
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-gray-700">বিভাগ (Division) *</label>
                  <select
                    {...register("division")}
                    className={`w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition-all font-medium text-gray-800 cursor-pointer ${errors.division ? "border-red-500 focus:ring-red-100" : ""}`}
                  >
                    <option value="">বিভাগ নির্বাচন করুন</option>
                    {Object.keys(locationData).map((div) => (
                      <option key={div} value={div}>
                        {div}
                      </option>
                    ))}
                  </select>
                  {errors.division && (
                    <p className="text-[10px] text-red-500 font-bold flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" /> {errors.division.message}
                    </p>
                  )}
                </div>

                {/* District Dropdown */}
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-gray-700">জেলা (District) *</label>
                  <select
                    {...register("district")}
                    disabled={!watchDivision}
                    className={`w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition-all font-medium text-gray-800 cursor-pointer disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed ${errors.district ? "border-red-500 focus:ring-red-100" : ""}`}
                  >
                    <option value="">{watchDivision ? "জেলা নির্বাচন করুন" : "বিভাগ আগে নির্বাচন করুন"}</option>
                    {watchDivision && Object.keys(locationData[watchDivision] || {}).map((dist) => (
                      <option key={dist} value={dist}>
                        {dist}
                      </option>
                    ))}
                  </select>
                  {errors.district && (
                    <p className="text-[10px] text-red-500 font-bold flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" /> {errors.district.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Upazila Dropdown */}
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-gray-700">উপজেলা (Upazila) *</label>
                  <select
                    {...register("upazila")}
                    disabled={!watchDistrict}
                    className={`w-full border border-gray-300 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition-all font-medium text-gray-800 cursor-pointer disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed ${errors.upazila ? "border-red-500 focus:ring-red-100" : ""}`}
                  >
                    <option value="">{watchDistrict ? "উপজেলা নির্বাচন করুন" : "জেলা আগে নির্বাচন করুন"}</option>
                    {watchDivision && watchDistrict && (locationData[watchDivision]?.[watchDistrict] || []).map((upz) => (
                      <option key={upz} value={upz}>
                        {upz}
                      </option>
                    ))}
                  </select>
                  {errors.upazila && (
                    <p className="text-[10px] text-red-500 font-bold flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3 h-3" /> {errors.upazila.message}
                    </p>
                  )}
                </div>

                {/* Shipping Zone Zone for Pricing */}
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-gray-700">ডেলিভারি এরিয়া *</label>
                  <div className="grid grid-cols-2 gap-3 pointer-events-none opacity-80 select-none cursor-not-allowed">
                    <label
                      className={`flex flex-col items-center justify-center border rounded-xl p-3 cursor-not-allowed text-center select-none transition-all ${
                        watchDeliveryArea === "inside"
                          ? "border-indigo-600 bg-indigo-50/40 text-indigo-950 font-bold"
                          : "border-gray-200 bg-white text-gray-650"
                      }`}
                    >
                      <input
                        type="radio"
                        {...register("deliveryArea")}
                        value="inside"
                        className="sr-only"
                      />
                      <span className="text-[11px] mb-0.5 font-bold">Inside Dhaka</span>
                      <span className="text-[10px] font-mono text-indigo-650">৳ 60.00</span>
                    </label>

                    <label
                      className={`flex flex-col items-center justify-center border rounded-xl p-3 cursor-not-allowed text-center select-none transition-all ${
                        watchDeliveryArea === "outside"
                          ? "border-indigo-600 bg-indigo-50/40 text-indigo-950 font-bold"
                          : "border-gray-200 bg-white text-gray-650"
                      }`}
                    >
                      <input
                        type="radio"
                        {...register("deliveryArea")}
                        value="outside"
                        className="sr-only"
                      />
                      <span className="text-[11px] mb-0.5 font-bold">Outside Dhaka</span>
                      <span className="text-[10px] font-mono text-indigo-650">৳ 160.00</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Delivery Address Details */}
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-gray-700">সম্পূর্ণ ঠিকানা (রোড, হাউজ নম্বর, গ্রাম বা এরিয়া) *</label>
                <textarea
                  {...register("address")}
                  rows={3}
                  placeholder="যেমন: বাসা নং- ২৪, রোড নং- ৫, ব্লক- সি, মিরপুর ১০, ঢাকা।"
                  className={`w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-600 transition-all font-medium text-gray-800 bg-slate-50/30 resize-none ${errors.address ? "border-red-500 focus:ring-red-100" : ""}`}
                />
                {errors.address && (
                  <p className="text-[10px] text-red-500 font-bold flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" /> {errors.address.message}
                  </p>
                )}
                <p className="text-[11px] text-gray-500 font-medium">ডেলিভারি ম্যানের সুবিধার জন্য বিস্তারিত ঠিকানা লিখুন।</p>
              </div>
            </div>

            {/* Payment method section */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 pb-2">
                <CreditCard className="w-5 h-5 text-indigo-650" />
                <h2 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider">
                  পেমেন্ট পদ্ধতি নির্ধারণ করুন (Payment Method)
                </h2>
              </div>

              <div className="space-y-3">
                {/* Cash on Delivery */}
                <label
                  className={`flex items-start gap-3 border rounded-2xl p-4 cursor-pointer select-none transition-all ${
                    watchPaymentMethod === "cod"
                      ? "border-indigo-600 bg-indigo-50/20"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    {...register("paymentMethod")}
                    value="cod"
                    className="mt-1"
                  />
                  <div>
                    <span className="block text-xs font-extrabold text-gray-900">ক্যাশ অন ডেলিভারি (Cash on Delivery)</span>
                    <span className="block text-[11px] text-gray-500 mt-1 leading-normal">
                      পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন। তবে অর্ডারটি নিশ্চিত করতে আমাদের প্রতিনিধি কল দিয়ে নির্দেশনা প্রদান করবেন।
                    </span>
                  </div>
                </label>

                {/* Mobile Banking bKash/Nagad */}
                <label
                  className={`flex items-start gap-3 border rounded-2xl p-4 cursor-pointer select-none transition-all ${
                    watchPaymentMethod === "mobile_pay"
                      ? "border-indigo-600 bg-indigo-50/20"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    {...register("paymentMethod")}
                    value="mobile_pay"
                    className="mt-1"
                  />
                  <div>
                    <span className="block text-xs font-extrabold text-gray-900">মোবাইল ব্যাংকিং (bKash, Nagad, Rocket)</span>
                    <span className="block text-[11px] text-gray-500 mt-1 leading-normal">
                      আমাদের পেমেন্ট নম্বরে ডেলিভারি চার্জ অথবা ফুল পেমেন্ট প্রদান করে আপনার ট্রানজেকশন আইডি নিশ্চিত করতে প্রতিনিধি দ্রুত যোগাযোগ করবেন।
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Resume Summary */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-gray-120 p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
                <ShoppingBag className="w-5 h-5 text-indigo-650" />
                <h2 className="text-sm font-extrabold text-gray-900 uppercase tracking-wider">
                  Order Summary
                </h2>
              </div>

              {/* Items List inside summary container */}
              <div className="max-h-[290px] overflow-y-auto divide-y divide-gray-100 pr-1">
                {cartItems.map((item) => (
                  <div key={item.productId} className="flex gap-4.5 py-3 first:pt-0 last:pb-0">
                    <img
                      src={item.imageURL}
                      alt={item.title}
                      className="w-12 h-12 rounded-lg object-cover bg-slate-50 border border-slate-100 flex-none"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-extrabold text-gray-850 truncate font-sans">{item.title}</h4>
                      <p className="text-xs text-gray-500 mt-0.5">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right flex-none">
                      <span className="text-xs font-extrabold text-gray-900 font-mono">
                        ৳ {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Code Section */}
              <div className="pt-4 border-t border-gray-100">
                <label className="text-[11px] font-extrabold text-gray-700 uppercase tracking-wider mb-2 block">
                  কুপন কোড (Coupon Code)
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="কুপন কোড লিখুন"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all active:scale-95"
                  >
                    Apply
                  </button>
                </div>
                {couponStatus && (
                  <p className={`mt-2 text-[10px] font-medium ${couponStatus.type === 'success' ? 'text-emerald-600' : 'text-red-500'}`}>
                    {couponStatus.message}
                  </p>
                )}
              </div>

              {/* Price Calculations breakdown container with Bengali instruction note */}
              <div className="border-t border-gray-100 pt-4 space-y-2.5">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-950 font-mono">৳ {cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Estimated Tax (5%)</span>
                  <span className="font-semibold text-gray-950 font-mono">৳ {cartTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-600">
                  <span className="flex items-center gap-1">
                    <Truck className="h-3.5 w-3.5 text-gray-400" />
                    ডেলিভারি চার্জ
                  </span>
                  <span className="font-semibold text-gray-950 font-mono">৳ {deliveryCharge.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-xs text-emerald-600 font-medium">
                    <span className="flex items-center gap-1">
                      <Ticket className="h-3.5 w-3.5" />
                      ডিসকাউন্ট
                    </span>
                    <span className="font-mono">- ৳ {discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-extrabold text-gray-900 pt-3 border-t border-gray-150">
                  <span className="text-xs uppercase tracking-wider">মোট পরিশোধযোগ্য মূল্য:</span>
                  <span className="text-indigo-650 font-mono font-extrabold text-base">৳ {grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Complete order button & Safety message */}
            <div className="space-y-4">
              <button
                type="submit"
                disabled={!isValid || cartItems.length === 0}
                className={`w-full bg-indigo-600 hover:bg-slate-900 text-white font-extrabold py-4 px-6 rounded-2xl text-sm shadow-md transition-all active:scale-[0.98] text-center cursor-pointer font-sans ${!isValid || cartItems.length === 0 ? "opacity-70 cursor-not-allowed" : ""}`}
              >
                Place Order
              </button>

              {!isValid && (
                <p className="text-[10px] text-red-500 font-bold text-center mt-2 flex items-center justify-center gap-1">
                  <AlertCircle className="w-3 h-3" /> অনুগ্রহ করে ফর্মের সব তথ্য সঠিক ভাবে প্রদান করুন
                </p>
              )}

              <div className="flex items-start gap-2.5 bg-indigo-50/50 border border-indigo-100 rounded-2xl p-4.5">
                <Info className="h-4.5 w-4.5 text-indigo-600 mt-0.5 flex-none" />
                <p className="text-[11px] font-medium leading-relaxed text-indigo-950">
                  অর্ডার প্লেস করার পর আপনি একটি Order ID পাবেন। ডেলিভারি চার্জ দ্রুত পরিশোধ করলেই আপনার অর্ডার ডেলিভারি করা শুরু হবে।
                </p>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
