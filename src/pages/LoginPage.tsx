import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "motion/react";
import { Smartphone, Mail, ArrowRight, ShieldCheck, LockKeyhole } from "lucide-react";

// Official Google Logo SVG
const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

// Official Facebook Logo SVG
const FacebookIcon = () => (
  <svg width="20" height="20" fill="#1877F2" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

export default function LoginPage() {
  const { login } = useAuth();
  const { syncCartWithBackend } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [socialLoading, setSocialLoading] = useState<string | null>(null);

  const handleSocialLogin = (platform: string) => {
    setSocialLoading(platform);
    setTimeout(() => {
      setSocialLoading(null);
      // Simulate success
      login("Demo User", "demo@example.com").then(() => {
        const from = (location.state as any)?.from || "/";
        navigate(from, { replace: true });
      });
    }, 1500);
  };

  const handleIdentifierSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (identifier.trim()) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setShowOtp(true);
      }, 1000);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) otpRefs.current[index - 1]?.focus();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length === 6) {
      setLoading(true);
      try {
        const name = identifier.split("@")[0] || (activeTab === "signup" ? "New User" : "User");
        const newUser = await login(name, identifier.includes("@") ? identifier : `${identifier}@phone.com`);
        
        // Sync guest cart with backend after login
        await syncCartWithBackend(newUser.id);
        
        const from = (location.state as any)?.from || "/";
        navigate(from, { replace: true });
      } catch (error) {
        console.error("Login failed:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex-grow flex items-center justify-center px-4 bg-slate-50/50 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[460px]"
      >
        <div className="bg-white rounded-[32px] shadow-2xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          {/* Header Branding */}
          <div className="pt-10 pb-6 px-8 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-50/80 mb-5">
              <LockKeyhole className="w-7 h-7 text-indigo-600" />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {activeTab === "signin" ? "Welcome Back" : "Join AeroCart"}
            </h1>
            <p className="text-slate-500 text-sm mt-2 font-medium">
              {activeTab === "signin" ? "Enter your credentials to continue" : "Create an account to start shopping"}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="px-8 mb-8">
            <div className="flex border-b border-slate-100 relative">
              <button
                onClick={() => { setActiveTab("signin"); setShowOtp(false); }}
                className={`flex-1 py-3 text-sm font-bold transition-colors duration-200 ${activeTab === "signin" ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"}`}
              >
                Sign In
              </button>
              <button
                onClick={() => { setActiveTab("signup"); setShowOtp(false); }}
                className={`flex-1 py-3 text-sm font-bold transition-colors duration-200 ${activeTab === "signup" ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"}`}
              >
                Sign Up
              </button>
              <motion.div 
                className="absolute bottom-0 h-0.5 bg-indigo-600"
                initial={false}
                animate={{ 
                  left: activeTab === "signin" ? "0%" : "50%",
                  width: "50%" 
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>
          </div>

          <div className="p-8 pt-0 sm:p-10 sm:pt-0">
            {/* Social Logins */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              <button 
                onClick={() => handleSocialLogin("google")}
                disabled={!!socialLoading}
                className="flex items-center justify-center gap-3 py-3 px-4 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all duration-200 group disabled:opacity-50"
              >
                {socialLoading === "google" ? (
                  <div className="w-5 h-5 border-2 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin"></div>
                ) : (
                  <>
                    <GoogleIcon />
                    <span className="text-[13px] font-bold text-slate-700">Google</span>
                  </>
                )}
              </button>
              <button 
                onClick={() => handleSocialLogin("facebook")}
                disabled={!!socialLoading}
                className="flex items-center justify-center gap-3 py-3 px-4 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all duration-200 group disabled:opacity-50"
              >
                {socialLoading === "facebook" ? (
                  <div className="w-5 h-5 border-2 border-[#1877F2]/30 border-t-[#1877F2] rounded-full animate-spin"></div>
                ) : (
                  <>
                    <FacebookIcon />
                    <span className="text-[13px] font-bold text-slate-700">Facebook</span>
                  </>
                )}
              </button>
            </div>

            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="bg-white px-4 text-slate-400 font-bold tracking-[0.2em]">OR USE {activeTab === "signin" ? "ACCOUNT" : "EMAIL"}</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {!showOtp ? (
                <motion.form 
                  key="identifier"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onSubmit={handleIdentifierSubmit} 
                  className="space-y-6"
                >
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-bold text-slate-700 ml-1">Email or Phone Number</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        {identifier.includes("@") ? (
                          <Mail className="w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                        ) : (
                          <Smartphone className="w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                        )}
                      </div>
                      <input
                        type="text"
                        required
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        className="w-full bg-slate-50/50 border-slate-200 border-2 focus:bg-white focus:border-indigo-500 rounded-2xl py-4 pl-12 pr-4 text-slate-900 font-medium placeholder:text-slate-400 focus:outline-none transition-all duration-200"
                        placeholder={activeTab === "signin" ? "name@mail.com" : "Enter email or phone"}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !identifier}
                    className="w-full bg-slate-900 text-white py-4.5 rounded-2xl font-bold hover:bg-slate-800 transition-all duration-200 flex items-center justify-center gap-2 shadow-xl shadow-slate-200/50 disabled:opacity-50 disabled:cursor-not-allowed text-[15px]"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        {activeTab === "signin" ? "Send OTP" : "Sign Up"}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.form 
                  key="otp"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleLogin} 
                  className="space-y-8"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-[13px] font-bold text-slate-700">Verification Code</label>
                      <button 
                        type="button"
                        onClick={() => setShowOtp(false)}
                        className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700"
                      >
                        Change Account
                      </button>
                    </div>
                    <div className="flex justify-between gap-2">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength={1}
                          value={digit}
                          ref={(el) => (otpRefs.current[index] = el)}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          className="w-full h-14 sm:h-16 text-center text-xl font-bold bg-slate-50 border-2 border-transparent focus:bg-white focus:border-indigo-500 rounded-2xl outline-none transition-all duration-300"
                        />
                      ))}
                    </div>
                    <p className="text-center text-[11px] text-slate-500">
                      Didn't receive code? <button type="button" className="text-indigo-600 font-extrabold hover:underline">Resend</button>
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading || otp.join("").length < 6}
                    className="w-full bg-indigo-600 text-white py-4.5 rounded-2xl font-bold hover:bg-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-xl shadow-indigo-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      "Verify & Continue"
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <div className="bg-slate-50/60 px-8 py-6 border-t border-slate-100/80 text-center">
            {activeTab === "signup" && (
              <div className="space-y-4">
                <p className="text-[11px] text-slate-500 leading-relaxed max-w-[280px] mx-auto">
                  By creating an account, you agree to AeroCart's <br />
                  <button className="font-bold text-slate-800 hover:underline">Terms & Conditions</button> and <button className="font-bold text-slate-800 hover:underline">Privacy Policy</button>
                </p>
                <p className="text-[11px] text-slate-500 font-medium">
                  Already have an account? <button onClick={() => setActiveTab("signin")} className="text-indigo-600 font-bold hover:underline">Sign In</button>
                </p>
              </div>
            )}
            {activeTab === "signin" && (
              <p className="text-[11px] text-slate-500 font-medium">
                New to AeroCart? <button onClick={() => setActiveTab("signup")} className="text-indigo-600 font-bold hover:underline">Create an account</button>
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
