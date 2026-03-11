import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";
import { MdOutlineSubscriptions } from "react-icons/md";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";
import logo from "../assets/logo.jpeg";

// ── Validation Schema ──────────────────────────────────────────
const schema = yup.object({
  email:    yup.string().email("Enter a valid email").required("Email is required"),
  password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
});

// ── Feature Cards Data ─────────────────────────────────────────
const features = [
  { icon: "📋", title: "Track All Subs",    description: "Add Netflix, Gym, Spotify & every subscription in one place." },
  { icon: "🚨", title: "Renewal Alerts",    description: "Get alerted 7, 3 and 1 day before any renewal date." },
  { icon: "📊", title: "Spend Analytics",   description: "See exactly where your money goes with charts & breakdowns." },
  { icon: "💰", title: "Save Money",        description: "Cancel forgotten subscriptions before they drain your wallet." },
  { icon: "⏱️", title: "Countdown Timers", description: "Live timers showing exactly how long until each renewal." },
  { icon: "🗂️", title: "Smart Categories", description: "Organize by Entertainment, Health, Cloud, Education & more." },
];

// ── Feature Card Component (same style as your original) ───────
function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      whileHover={{ y: -10, rotateX: 6, rotateY: -6, scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 250, damping: 18 }}
      className="relative p-7 rounded-xl bg-gradient-to-br from-black/90 via-black/80 to-black/90
                 backdrop-blur-2xl border border-white/10
                 shadow-[0_20px_60px_rgba(0,0,0,0.6)] text-white"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 to-transparent
                      opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
      <div className="relative z-10" style={{ transform: "translateZ(25px)" }}>
        <div className="text-4xl mb-2">{icon}</div>
        <h3 className="text-base font-semibold mb-1">{title}</h3>
        <p className="text-gray-400 text-xs leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

// ── Main Login Page ────────────────────────────────────────────
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading]           = useState(false);
  const { login }                       = useAuth();
  const navigate                        = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      const { data } = await api.post("/auth/login", formData);
      login(data.user, data.token);
      toast.success(`Welcome back, ${data.user.name}! 👋`);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-white text-black px-8">

      {/* ── Header ── */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className="max-w-7xl mx-auto mt-8 rounded-2xl
                   bg-black/80 backdrop-blur-xl border border-white/10
                   px-8 py-6 shadow-[0_20px_45px_rgba(0,0,0,0.6)]
                   flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-gray-300 to-white
               bg-clip-text text-transparent flex items-center gap-3">
  <img
    src={logo}
    alt="SubTrack Logo"
    className="w-10 h-10 object-contain"
  />
  SubAlert
</h1>

          <p className="text-base text-gray-400 mt-1">
            Your smart subscription manager & alert system
          </p>
        </div>
        <div className="hidden md:flex items-center gap-3 text-gray-400 text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-white font-semibold border border-white/20 px-4 py-1.5
                       rounded-lg hover:bg-white/10 transition duration-200"
          >
            Sign Up
          </Link>
        </div>
      </motion.header>

      {/* ── Main Grid ── */}
      <main className="max-w-7xl mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        {/* ── LEFT: Login Form ── */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          className="text-center lg:text-left"
        >
          <h2 className="text-5xl lg:text-6xl font-extrabold leading-tight
                         bg-gradient-to-br from-black/90 via-black/60 to-black/90
                         bg-clip-text text-transparent mb-3">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-lg mb-10">
            Sign in to manage your subscriptions and never miss a renewal.
          </p>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative p-8 rounded-2xl
                       bg-gradient-to-br from-black/90 via-black/85 to-black/90
                       backdrop-blur-2xl border border-white/10
                       shadow-[0_30px_80px_rgba(0,0,0,0.5)]
                       text-white max-w-md mx-auto lg:mx-0"
          >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br
                            from-white/5 to-transparent pointer-events-none" />

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative z-10 space-y-5">

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-400
                                  uppercase tracking-widest mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2
                                     text-gray-500 text-lg pointer-events-none" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    {...register("email")}
                    className={`w-full pl-11 pr-4 py-3.5 rounded-xl text-sm
                                bg-white/5 border text-white placeholder-gray-600
                                outline-none transition duration-200
                                focus:bg-white/10 focus:border-white/40
                                ${errors.email ? "border-red-500/60" : "border-white/10"}`}
                  />
                </div>
                {errors.email && (
                  <p className="flex items-center gap-1.5 text-red-400 text-xs mt-1.5">
                    <FiAlertCircle /> {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-400
                                  uppercase tracking-widest mb-2">
                  Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2
                                     text-gray-500 text-lg pointer-events-none" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("password")}
                    className={`w-full pl-11 pr-12 py-3.5 rounded-xl text-sm
                                bg-white/5 border text-white placeholder-gray-600
                                outline-none transition duration-200
                                focus:bg-white/10 focus:border-white/40
                                ${errors.password ? "border-red-500/60" : "border-white/10"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2
                               text-gray-500 hover:text-gray-300 transition"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="flex items-center gap-1.5 text-red-400 text-xs mt-1.5">
                    <FiAlertCircle /> {errors.password.message}
                  </p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end -mt-1">
                <Link to="/forgot-password"
                  className="text-xs text-gray-500 hover:text-white transition">
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { y: -4, scale: 0.98 } : {}}
                whileTap={!loading ? { scale: 0.97 } : {}}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="w-full py-3.5 rounded-xl font-bold text-base
                           bg-gradient-to-r from-white via-gray-100 to-white
                           text-black shadow-[0_15px_40px_rgba(255,255,255,0.15)]
                           hover:shadow-[0_20px_50px_rgba(255,255,255,0.25)]
                           transition duration-300 disabled:opacity-50
                           disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black
                                    rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : "Sign In →"}
              </motion.button>

              {/* Divider */}
              <div className="flex items-center gap-3 text-gray-600 text-xs">
                <div className="flex-1 h-px bg-white/10" />
                or
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* Signup Link */}
              <p className="text-center text-sm text-gray-500">
                New here?{" "}
                <Link to="/signup" className="text-white font-semibold hover:underline">
                  Create a free account
                </Link>
              </p>

            </form>
          </motion.div>
        </motion.div>

        {/* ── RIGHT: Feature Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * i }}
            >
              <FeatureCard {...f} />
            </motion.div>
          ))}
        </div>

      </main>
    </div>
  );
}
