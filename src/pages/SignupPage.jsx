// import { useState } from "react";
// import { motion } from "framer-motion";
// import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle, FiUser } from "react-icons/fi";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import api from "../api/axios";
// import toast from "react-hot-toast";
// import logo from "../assets/logo.jpeg";

// // ── Validation Schema ──────────────────────────────────────────
// const schema = yup.object({
//   name: yup
//     .string()
//     .min(2, "Name must be at least 2 characters")
//     .required("Full name is required"),
//   email: yup
//     .string()
//     .email("Enter a valid email")
//     .required("Email is required"),
//   password: yup
//     .string()
//     .min(6, "Minimum 6 characters")
//     .required("Password is required"),
//   confirmPassword: yup
//     .string()
//     .oneOf([yup.ref("password")], "Passwords do not match")
//     .required("Please confirm your password"),
// });

// // ── Password Strength Logic ────────────────────────────────────
// const getPasswordStrength = (password) => {
//   if (!password) return { label: "", color: "", width: "0%" };
//   if (password.length < 6)
//     return { label: "Weak",   color: "#ef4444", width: "25%" };
//   if (password.length < 8)
//     return { label: "Fair",   color: "#f97316", width: "50%" };
//   if (!/[A-Z]/.test(password) || !/[0-9]/.test(password))
//     return { label: "Good",   color: "#eab308", width: "75%" };
//   return   { label: "Strong", color: "#22c55e", width: "100%" };
// };

// // ── Steps shown on right side ──────────────────────────────────
// const steps = [
//   { icon: "1️⃣", title: "Create your account",      description: "Sign up free in under 60 seconds. No credit card needed." },
//   { icon: "2️⃣", title: "Add your subscriptions",   description: "Add Netflix, Gym, Spotify — anything you pay for monthly." },
//   { icon: "3️⃣", title: "Get renewal alerts",       description: "We'll alert you 7, 3 and 1 day before every renewal date." },
//   { icon: "4️⃣", title: "Track your spending",      description: "See charts showing exactly where your money goes each month." },
//   { icon: "5️⃣", title: "Cancel what you don't use", description: "Stop wasting money on subscriptions you've forgotten about." },
//   { icon: "6️⃣", title: "Save every month",         description: "The average user saves ₹800/month after using SubTrack." },
// ];

// // ── Step Card Component ────────────────────────────────────────
// function StepCard({ icon, title, description, index }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay: 0.1 * index }}
//       whileHover={{ y: -8, rotateX: 5, rotateY: -5, scale: 1.03 }}
//       whileTap={{ scale: 0.97 }}
//       style={{ transformStyle: "preserve-3d" }}
//       className="relative p-5 rounded-xl
//                  bg-gradient-to-br from-black/90 via-black/80 to-black/90
//                  backdrop-blur-2xl border border-white/10
//                  shadow-[0_20px_60px_rgba(0,0,0,0.6)] text-white
//                  transition-all duration-300 cursor-default"
//     >
//       <div className="absolute inset-0 rounded-xl bg-gradient-to-br
//                       from-white/10 to-transparent opacity-0
//                       hover:opacity-100 transition-opacity pointer-events-none" />
//       <div className="relative z-10" style={{ transform: "translateZ(25px)" }}>
//         <div className="text-2xl mb-2">{icon}</div>
//         <h3 className="text-sm font-semibold mb-1">{title}</h3>
//         <p className="text-gray-400 text-xs leading-relaxed">{description}</p>
//       </div>
//     </motion.div>
//   );
// }

// // ── Reusable Input Field ───────────────────────────────────────
// function InputField({ label, icon: Icon, error, children }) {
//   return (
//     <div>
//       <label className="block text-xs font-semibold text-gray-400
//                         uppercase tracking-widest mb-2">
//         {label}
//       </label>
//       <div className="relative">
//         <Icon className="absolute left-4 top-1/2 -translate-y-1/2
//                          text-gray-500 text-lg pointer-events-none" />
//         {children}
//       </div>
//       {error && (
//         <p className="flex items-center gap-1.5 text-red-400 text-xs mt-1.5">
//           <FiAlertCircle /> {error.message}
//         </p>
//       )}
//     </div>
//   );
// }

// // ── Main Signup Page ───────────────────────────────────────────
// export default function SignupPage() {
//   const [showPassword, setShowPassword]         = useState(false);
//   const [showConfirmPassword, setShowConfirm]   = useState(false);
//   const [loading, setLoading]                   = useState(false);
//   const [passwordValue, setPasswordValue]       = useState("");
//   const { login }                               = useAuth();
//   const navigate                                = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm({ resolver: yupResolver(schema) });

//   // Watch password for strength indicator
//   const watchedPassword = watch("password", "");
//   const strength = getPasswordStrength(watchedPassword);

//   const onSubmit = async (formData) => {
//     try {
//       setLoading(true);
//       const { data } = await api.post("/auth/signup", {
//         name:     formData.name,
//         email:    formData.email,
//         password: formData.password,
//       });
//       login(data.user, data.token);
//       toast.success(`Welcome to SubTrack, ${data.user.name}! 🎉`);
//       navigate("/dashboard");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Signup failed. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen overflow-hidden bg-white text-black px-8">

//       {/* ── Header ── */}
//       <motion.header
//         initial={{ opacity: 0, y: -15 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 1.5 }}
//         className="max-w-7xl mx-auto mt-8 rounded-2xl
//                    bg-black/80 backdrop-blur-xl border border-white/10
//                    px-8 py-6 shadow-[0_20px_45px_rgba(0,0,0,0.6)]
//                    flex items-center justify-between"
//       >
//         <div>
//           <h1 className="text-4xl font-bold flex items-center gap-3">
//             <img
//               src={logo}
//               alt="Subscription Alert Logo"
//               className="h-14 w-auto object-contain"
             
//             />
//           </h1>
//           <p className="text-base text-gray-400 mt-1">
//             Track renewals. Kill forgotten subscriptions. Save money.
//           </p>
//         </div>
//         <div className="hidden md:flex items-center gap-3 text-gray-400 text-sm">
//           Already have an account?{" "}
//           <Link
//             to="/login"
//             className="text-white font-semibold border border-white/20
//                        px-4 py-1.5 rounded-lg hover:bg-white/10 transition duration-200"
//           >
//             Sign In
//           </Link>
//         </div>
//       </motion.header>

//       {/* ── Main Grid ── */}
//       <main className="max-w-7xl mx-auto py-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

//         {/* ── LEFT: Signup Form ── */}
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 1.2 }}
//           className="text-center lg:text-left"
//         >
//           <h2 className="text-5xl lg:text-6xl font-extrabold leading-tight
//                          bg-gradient-to-br from-black/90 via-black/60 to-black/90
//                          bg-clip-text text-transparent mb-3">
//             Get Started
//           </h2>
//           <p className="text-gray-500 text-lg mb-10">
//             Create your free account and take control of your subscriptions.
//           </p>

//           {/* Form Card */}
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, delay: 0.3 }}
//             className="relative p-8 rounded-2xl
//                        bg-gradient-to-br from-black/90 via-black/85 to-black/90
//                        backdrop-blur-2xl border border-white/10
//                        shadow-[0_30px_80px_rgba(0,0,0,0.5)]
//                        text-white max-w-md mx-auto lg:mx-0"
//           >
//             {/* Shimmer overlay */}
//             <div className="absolute inset-0 rounded-2xl bg-gradient-to-br
//                             from-white/5 to-transparent pointer-events-none" />

//             <form
//               onSubmit={handleSubmit(onSubmit)}
//               noValidate
//               className="relative z-10 space-y-5"
//             >

//               {/* Full Name */}
//               <InputField label="Full Name" icon={FiUser} error={errors.name}>
//                 <input
//                   type="text"
//                   placeholder="Ayan Das"
//                   {...register("name")}
//                   className={`w-full pl-11 pr-4 py-3.5 rounded-xl text-sm
//                               bg-white/5 border text-white placeholder-gray-600
//                               outline-none transition duration-200
//                               focus:bg-white/10 focus:border-white/40
//                               focus:shadow-[0_0_0_3px_rgba(255,255,255,0.08)]
//                               ${errors.name ? "border-red-500/60" : "border-white/10"}`}
//                 />
//               </InputField>

//               {/* Email */}
//               <InputField label="Email Address" icon={FiMail} error={errors.email}>
//                 <input
//                   type="email"
//                   placeholder="you@example.com"
//                   {...register("email")}
//                   className={`w-full pl-11 pr-4 py-3.5 rounded-xl text-sm
//                               bg-white/5 border text-white placeholder-gray-600
//                               outline-none transition duration-200
//                               focus:bg-white/10 focus:border-white/40
//                               focus:shadow-[0_0_0_3px_rgba(255,255,255,0.08)]
//                               ${errors.email ? "border-red-500/60" : "border-white/10"}`}
//                 />
//               </InputField>

//               {/* Password */}
//               <InputField label="Password" icon={FiLock} error={errors.password}>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="••••••••"
//                   {...register("password")}
//                   className={`w-full pl-11 pr-12 py-3.5 rounded-xl text-sm
//                               bg-white/5 border text-white placeholder-gray-600
//                               outline-none transition duration-200
//                               focus:bg-white/10 focus:border-white/40
//                               focus:shadow-[0_0_0_3px_rgba(255,255,255,0.08)]
//                               ${errors.password ? "border-red-500/60" : "border-white/10"}`}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2
//                              text-gray-500 hover:text-gray-300 transition"
//                 >
//                   {showPassword ? <FiEyeOff /> : <FiEye />}
//                 </button>
//               </InputField>

//               {/* Password Strength Bar */}
//               {watchedPassword && (
//                 <div className="-mt-2">
//                   <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
//                     <motion.div
//                       className="h-full rounded-full"
//                       style={{ background: strength.color }}
//                       initial={{ width: "0%" }}
//                       animate={{ width: strength.width }}
//                       transition={{ duration: 0.4 }}
//                     />
//                   </div>
//                   <p className="text-xs mt-1" style={{ color: strength.color }}>
//                     Password strength: <strong>{strength.label}</strong>
//                   </p>
//                 </div>
//               )}

//               {/* Confirm Password */}
//               <InputField
//                 label="Confirm Password"
//                 icon={FiLock}
//                 error={errors.confirmPassword}
//               >
//                 <input
//                   type={showConfirmPassword ? "text" : "password"}
//                   placeholder="••••••••"
//                   {...register("confirmPassword")}
//                   className={`w-full pl-11 pr-12 py-3.5 rounded-xl text-sm
//                               bg-white/5 border text-white placeholder-gray-600
//                               outline-none transition duration-200
//                               focus:bg-white/10 focus:border-white/40
//                               focus:shadow-[0_0_0_3px_rgba(255,255,255,0.08)]
//                               ${errors.confirmPassword
//                                 ? "border-red-500/60"
//                                 : "border-white/10"}`}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowConfirm(!showConfirmPassword)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2
//                              text-gray-500 hover:text-gray-300 transition"
//                 >
//                   {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
//                 </button>
//               </InputField>

//               {/* Submit Button */}
//               <motion.button
//                 type="submit"
//                 disabled={loading}
//                 whileHover={!loading ? { y: -4, scale: 0.98 } : {}}
//                 whileTap={!loading ? { scale: 0.97 } : {}}
//                 transition={{ type: "spring", stiffness: 200, damping: 18 }}
//                 className="w-full py-3.5 rounded-xl font-bold text-base
//                            bg-gradient-to-r from-white via-gray-100 to-white
//                            text-black shadow-[0_15px_40px_rgba(255,255,255,0.15)]
//                            hover:shadow-[0_20px_50px_rgba(255,255,255,0.25)]
//                            transition duration-300 disabled:opacity-50
//                            disabled:cursor-not-allowed
//                            flex items-center justify-center gap-2"
//               >
//                 {loading ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-black/30
//                                     border-t-black rounded-full animate-spin" />
//                     Creating account...
//                   </>
//                 ) : "Create Free Account →"}
//               </motion.button>

//               {/* Divider */}
//               <div className="flex items-center gap-3 text-gray-600 text-xs">
//                 <div className="flex-1 h-px bg-white/10" />
//                 or
//                 <div className="flex-1 h-px bg-white/10" />
//               </div>

//               {/* Login Link */}
//               <p className="text-center text-sm text-gray-500">
//                 Already have an account?{" "}
//                 <Link to="/login" className="text-white font-semibold hover:underline">
//                   Sign in here
//                 </Link>
//               </p>

//               {/* Terms note */}
//               <p className="text-center text-xs text-gray-600 leading-relaxed">
//                 By signing up you agree to our{" "}
//                 <span className="text-gray-400 cursor-pointer hover:text-white transition">
//                   Terms of Service
//                 </span>{" "}
//                 and{" "}
//                 <span className="text-gray-400 cursor-pointer hover:text-white transition">
//                   Privacy Policy
//                 </span>
//               </p>

//             </form>
//           </motion.div>
//         </motion.div>

//         {/* ── RIGHT: How it works steps ── */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//           {steps.map((step, i) => (
//             <StepCard key={step.title} {...step} index={i} />
//           ))}
//         </div>

//       </main>
//     </div>
//   );
// }

import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle, FiUser } from "react-icons/fi";
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
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .required("Full name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Please confirm your password"),
});

// ── Password Strength Logic ────────────────────────────────────
const getPasswordStrength = (password) => {
  if (!password) return { label: "", color: "", width: "0%" };
  if (password.length < 6)
    return { label: "Weak",   color: "#ef4444", width: "25%" };
  if (password.length < 8)
    return { label: "Fair",   color: "#f97316", width: "50%" };
  if (!/[A-Z]/.test(password) || !/[0-9]/.test(password))
    return { label: "Good",   color: "#eab308", width: "75%" };
  return   { label: "Strong", color: "#22c55e", width: "100%" };
};

// ── Reusable Input Field ───────────────────────────────────────
function InputField({ label, icon: Icon, error, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-400
                        uppercase tracking-widest mb-2">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2
                         text-gray-500 text-lg pointer-events-none" />
        {children}
      </div>
      {error && (
        <p className="flex items-center gap-1.5 text-red-400 text-xs mt-1.5">
          <FiAlertCircle /> {error.message}
        </p>
      )}
    </div>
  );
}

// ── Main Signup Page ───────────────────────────────────────────
export default function SignupPage() {
  const [showPassword, setShowPassword]       = useState(false);
  const [showConfirmPassword, setShowConfirm] = useState(false);
  const [loading, setLoading]                 = useState(false);
  const { login }                             = useAuth();
  const navigate                              = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const watchedPassword = watch("password", "");
  const strength = getPasswordStrength(watchedPassword);

  const onSubmit = async (formData) => {
    try {
      setLoading(true);
      const { data } = await api.post("/auth/signup", {
        name:     formData.name,
        email:    formData.email,
        password: formData.password,
      });
      login(data.user, data.token);
      toast.success(`Welcome to SubTrack, ${data.user.name}! 🎉`);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed. Try again.");
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
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <img
              src={logo}
              alt="Subscription Alert Logo"
              className="h-14 w-auto object-contain"
            />
          </h1>
          <p className="text-base text-gray-400 mt-1">
            Track renewals. Kill forgotten subscriptions. Save money.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-3 text-gray-400 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-white font-semibold border border-white/20
                       px-4 py-1.5 rounded-lg hover:bg-white/10 transition duration-200"
          >
            Sign In
          </Link>
        </div>
      </motion.header>

      {/* ── Centered Form Section ── */}
      <main className="max-w-7xl mx-auto py-10 flex flex-col items-center">

        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          className="text-center w-full"
        >
          <h2 className="text-5xl lg:text-6xl font-extrabold leading-tight
                         bg-gradient-to-br from-black/90 via-black/60 to-black/90
                         bg-clip-text text-transparent mb-3">
            Get Started
          </h2>
          <p className="text-gray-500 text-lg mb-10">
            Create your free account and take control of your subscriptions.
          </p>
        </motion.div>

        {/* ── Form Card — centered, fixed width ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative p-8 rounded-2xl w-full max-w-md
                     bg-gradient-to-br from-black/90 via-black/85 to-black/90
                     backdrop-blur-2xl border border-white/10
                     shadow-[0_30px_80px_rgba(0,0,0,0.5)]
                     text-white"
        >
          {/* Shimmer overlay */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br
                          from-white/5 to-transparent pointer-events-none" />

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="relative z-10 space-y-5"
          >

            {/* Full Name */}
            <InputField label="Full Name" icon={FiUser} error={errors.name}>
              <input
                type="text"
                placeholder="Ayan Das"
                {...register("name")}
                className={`w-full pl-11 pr-4 py-3.5 rounded-xl text-sm
                            bg-white/5 border text-white placeholder-gray-600
                            outline-none transition duration-200
                            focus:bg-white/10 focus:border-white/40
                            focus:shadow-[0_0_0_3px_rgba(255,255,255,0.08)]
                            ${errors.name ? "border-red-500/60" : "border-white/10"}`}
              />
            </InputField>

            {/* Email */}
            <InputField label="Email Address" icon={FiMail} error={errors.email}>
              <input
                type="email"
                placeholder="you@example.com"
                {...register("email")}
                className={`w-full pl-11 pr-4 py-3.5 rounded-xl text-sm
                            bg-white/5 border text-white placeholder-gray-600
                            outline-none transition duration-200
                            focus:bg-white/10 focus:border-white/40
                            focus:shadow-[0_0_0_3px_rgba(255,255,255,0.08)]
                            ${errors.email ? "border-red-500/60" : "border-white/10"}`}
              />
            </InputField>

            {/* Password */}
            <InputField label="Password" icon={FiLock} error={errors.password}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("password")}
                className={`w-full pl-11 pr-12 py-3.5 rounded-xl text-sm
                            bg-white/5 border text-white placeholder-gray-600
                            outline-none transition duration-200
                            focus:bg-white/10 focus:border-white/40
                            focus:shadow-[0_0_0_3px_rgba(255,255,255,0.08)]
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
            </InputField>

            {/* Password Strength Bar */}
            {watchedPassword && (
              <div className="-mt-2">
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: strength.color }}
                    initial={{ width: "0%" }}
                    animate={{ width: strength.width }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <p className="text-xs mt-1" style={{ color: strength.color }}>
                  Password strength: <strong>{strength.label}</strong>
                </p>
              </div>
            )}

            {/* Confirm Password */}
            <InputField
              label="Confirm Password"
              icon={FiLock}
              error={errors.confirmPassword}
            >
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                {...register("confirmPassword")}
                className={`w-full pl-11 pr-12 py-3.5 rounded-xl text-sm
                            bg-white/5 border text-white placeholder-gray-600
                            outline-none transition duration-200
                            focus:bg-white/10 focus:border-white/40
                            focus:shadow-[0_0_0_3px_rgba(255,255,255,0.08)]
                            ${errors.confirmPassword
                              ? "border-red-500/60"
                              : "border-white/10"}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2
                           text-gray-500 hover:text-gray-300 transition"
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </InputField>

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
                         disabled:cursor-not-allowed
                         flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/30
                                  border-t-black rounded-full animate-spin" />
                  Creating account...
                </>
              ) : "Create Free Account →"}
            </motion.button>

            {/* Divider */}
            <div className="flex items-center gap-3 text-gray-600 text-xs">
              <div className="flex-1 h-px bg-white/10" />
              or
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-white font-semibold hover:underline">
                Sign in here
              </Link>
            </p>

            {/* Terms */}
            <p className="text-center text-xs text-gray-600 leading-relaxed">
              By signing up you agree to our{" "}
              <span className="text-gray-400 cursor-pointer hover:text-white transition">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-gray-400 cursor-pointer hover:text-white transition">
                Privacy Policy
              </span>
            </p>

          </form>
        </motion.div>

        {/* bottom spacing */}
        <div className="h-16" />

      </main>
    </div>
  );
}