import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser, FiMail, FiPhone, FiEdit2, FiSave,
  FiX, FiCamera, FiBell, FiShield, FiTrash2,
  FiLogOut, FiCheck, FiAlertCircle, FiLock,
  FiGlobe, FiCreditCard, FiTrendingUp
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";

// ── Demo Data ──────────────────────────────────────────────────
const DEMO_STATS = {
  totalSubs:     6,
  monthlySpend:  3415,
  yearlySpend:   40980,
  savedThisYear: 2400,
};

const DEMO_SUBSCRIPTIONS = [
  { id: 1, name: "Netflix",      cost: 499,  category: "Entertainment", icon: "🎬" },
  { id: 2, name: "Spotify",      cost: 119,  category: "Entertainment", icon: "🎵" },
  { id: 3, name: "Gym",          cost: 1200, category: "Health",        icon: "💪" },
  { id: 4, name: "Amazon Prime", cost: 299,  category: "Shopping",      icon: "📦" },
  { id: 5, name: "Hotstar",      cost: 899,  category: "Entertainment", icon: "📺" },
  { id: 6, name: "GitHub",       cost: 399,  category: "Tech",          icon: "💻" },
];

// ── Validation Schemas ─────────────────────────────────────────
const profileSchema = yup.object({
  name:     yup.string().required("Name is required"),
  email:    yup.string().email("Invalid email").required("Email is required"),
  phone:    yup.string().matches(/^[0-9]{10}$/, "Enter valid 10-digit number").nullable(),
  currency: yup.string().required(),
});

const passwordSchema = yup.object({
  currentPassword: yup.string().required("Current password required"),
  newPassword:     yup.string().min(6, "Min 6 characters").required("New password required"),
  confirmPassword: yup.string()
    .oneOf([yup.ref("newPassword")], "Passwords don't match")
    .required("Please confirm password"),
});

// ── Avatar Component ───────────────────────────────────────────
function Avatar({ name, size = "lg" }) {
  const initials = name
    ? name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
    : "U";
  const sizeClass = size === "lg" ? "w-24 h-24 text-3xl" : "w-10 h-10 text-sm";

  return (
    <div className={`${sizeClass} rounded-full bg-gradient-to-br
                     from-indigo-500 via-purple-500 to-pink-500
                     flex items-center justify-center text-white font-bold
                     shadow-[0_10px_30px_rgba(99,102,241,0.4)]`}>
      {initials}
    </div>
  );
}

// ── Input Field ────────────────────────────────────────────────
function FormField({ label, icon: Icon, error, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-400
                        uppercase tracking-widest mb-2">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2
                                  text-gray-500 text-base pointer-events-none" />}
        {children}
      </div>
      {error && (
        <p className="flex items-center gap-1.5 text-red-400 text-xs mt-1.5">
          <FiAlertCircle className="flex-shrink-0" /> {error.message}
        </p>
      )}
    </div>
  );
}

// ── Section Card ───────────────────────────────────────────────
function Section({ title, icon: Icon, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="p-6 rounded-2xl bg-gradient-to-br from-black/80 to-black/70
                 border border-white/10 backdrop-blur-xl
                 shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
    >
      <h2 className="text-white font-bold text-base mb-5 flex items-center gap-2">
        <Icon className="text-gray-400" /> {title}
      </h2>
      {children}
    </motion.div>
  );
}

// ── Toggle Switch ──────────────────────────────────────────────
function Toggle({ value, onChange, label, description }) {
  return (
    <div className="flex items-center justify-between py-3
                    border-b border-white/5 last:border-0">
      <div>
        <p className="text-white text-sm font-medium">{label}</p>
        {description && <p className="text-gray-500 text-xs mt-0.5">{description}</p>}
      </div>
      <motion.button
        onClick={() => onChange(!value)}
        whileTap={{ scale: 0.95 }}
        className={`relative w-11 h-6 rounded-full transition duration-300
                    ${value ? "bg-indigo-500" : "bg-white/20"}`}
      >
        <motion.div
          animate={{ x: value ? 20 : 2 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
        />
      </motion.button>
    </div>
  );
}

// ── Delete Account Modal ───────────────────────────────────────
function DeleteModal({ isOpen, onClose, onConfirm }) {
  const [input, setInput] = useState("");
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-sm p-7 rounded-2xl
                            bg-gradient-to-br from-black/95 to-black/90
                            border border-red-500/20 text-white text-center">
              <div className="text-5xl mb-4">⚠️</div>
              <h2 className="text-xl font-bold mb-2">Delete Account?</h2>
              <p className="text-gray-400 text-sm mb-5">
                This will permanently delete your account and all subscription data.
                Type <span className="text-red-400 font-bold">DELETE</span> to confirm.
              </p>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type DELETE"
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10
                           text-white text-center text-sm outline-none mb-4
                           focus:border-red-500/50 transition"
              />
              <div className="flex gap-3">
                <button onClick={onClose}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold
                             bg-white/5 border border-white/10 text-gray-400
                             hover:bg-white/10 transition">
                  Cancel
                </button>
                <motion.button
                  onClick={() => input === "DELETE" && onConfirm()}
                  whileTap={{ scale: 0.97 }}
                  disabled={input !== "DELETE"}
                  className={`flex-1 py-3 rounded-xl text-sm font-bold transition
                              ${input === "DELETE"
                                ? "bg-red-500 text-white hover:bg-red-600"
                                : "bg-red-500/20 text-red-500/40 cursor-not-allowed"}`}>
                  Delete Forever
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Main Profile Page ──────────────────────────────────────────
export default function ProfilePage() {
  const { user, logout }  = useAuth();
  const navigate          = useNavigate();
  const [editMode, setEditMode]       = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [notifications, setNotifications] = useState({
    emailAlerts:   true,
    pushAlerts:    false,
    weeklyReport:  true,
    threeDayAlert: true,
    sameDayAlert:  true,
  });

  // Profile form
  const {
    register: regProfile,
    handleSubmit: handleProfile,
    formState: { errors: profileErrors },
    reset: resetProfile,
  } = useForm({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      name:     user?.name  || "Ayan Paul",
      email:    user?.email || "ayanpaul626@gmail.com",
      phone:    "",
      currency: "INR",
    },
  });

  // Password form
  const {
    register: regPassword,
    handleSubmit: handlePassword,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm({ resolver: yupResolver(passwordSchema) });

  const onSaveProfile = (data) => {
    toast.success("Profile updated! ✅");
    setEditMode(false);
  };

  const onChangePassword = (data) => {
    toast.success("Password changed! 🔒");
    resetPassword();
  };

  const onDeleteAccount = () => {
    toast.success("Account deleted");
    logout();
    navigate("/login");
  };

  const inputClass = (hasError) =>
    `w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-white/5 border text-white
     placeholder-gray-600 outline-none transition duration-200
     focus:bg-white/10 focus:border-white/40
     ${hasError ? "border-red-500/60" : "border-white/10"}
     disabled:opacity-40 disabled:cursor-not-allowed`;

  const topCategory = (() => {
    const map = {};
    DEMO_SUBSCRIPTIONS.forEach(s => {
      map[s.category] = (map[s.category] || 0) + s.cost;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";
  })();

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
        <p className="text-gray-500 text-sm mt-0.5">Manage your account and preferences</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── LEFT COLUMN ── */}
        <div className="space-y-6">

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-black/80 to-black/70
                       border border-white/10 backdrop-blur-xl
                       shadow-[0_20px_60px_rgba(0,0,0,0.3)] text-center"
          >
            {/* Avatar */}
            <div className="relative inline-block mb-4">
              <Avatar name={user?.name || "Ayan Paul"} size="lg" />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full
                           bg-indigo-500 text-white flex items-center justify-center
                           shadow-lg border-2 border-black"
              >
                <FiCamera className="text-xs" />
              </motion.button>
            </div>

            <h2 className="text-white font-bold text-xl">
              {user?.name || "Ayan Paul"}
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              {user?.email || "ayanpaul626@gmail.com"}
            </p>

            <div className="mt-4 pt-4 border-t border-white/10">
              <p className="text-gray-500 text-xs">Member since</p>
              <p className="text-gray-300 text-sm font-semibold mt-0.5">March 2026</p>
            </div>

            {/* Edit toggle */}
            <motion.button
              onClick={() => setEditMode(!editMode)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={`w-full mt-4 py-2.5 rounded-xl text-sm font-semibold
                          flex items-center justify-center gap-2 transition duration-200
                          ${editMode
                            ? "bg-white/10 text-gray-300 border border-white/10"
                            : "bg-gradient-to-r from-white to-gray-100 text-black"
                          }`}
            >
              {editMode ? <><FiX /> Cancel Edit</> : <><FiEdit2 /> Edit Profile</>}
            </motion.button>
          </motion.div>

          {/* Stats Card */}
        {/* Banner Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl overflow-hidden border border-white/10
                       shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
          >
            <img
              src="/Banner.jpeg"
              alt="Subscription Manager"
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div className="lg:col-span-2 space-y-6">

          {/* Edit Profile Form */}
          <Section title="Personal Information" icon={FiUser} delay={0.1}>
            <form onSubmit={handleProfile(onSaveProfile)} noValidate className="space-y-4">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Full Name" icon={FiUser} error={profileErrors.name}>
                  <input type="text" placeholder="Ayan Paul"
                    {...regProfile("name")}
                    disabled={!editMode}
                    className={inputClass(profileErrors.name)} />
                </FormField>

                <FormField label="Email Address" icon={FiMail} error={profileErrors.email}>
                  <input type="email" placeholder="you@example.com"
                    {...regProfile("email")}
                    disabled={!editMode}
                    className={inputClass(profileErrors.email)} />
                </FormField>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="Phone Number" icon={FiPhone} error={profileErrors.phone}>
                  <input type="tel" placeholder="9876543210"
                    {...regProfile("phone")}
                    disabled={!editMode}
                    className={inputClass(profileErrors.phone)} />
                </FormField>

                <FormField label="Currency" icon={FiGlobe}>
                  <select {...regProfile("currency")}
                    disabled={!editMode}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm
                                bg-white/5 border border-white/10 text-white
                                outline-none transition focus:bg-white/10
                                focus:border-white/40 disabled:opacity-40
                                disabled:cursor-not-allowed`}
                    style={{ colorScheme: "dark" }}>
                    <option value="INR" className="bg-gray-900">₹ INR — Indian Rupee</option>
                    <option value="USD" className="bg-gray-900">$ USD — US Dollar</option>
                    <option value="EUR" className="bg-gray-900">€ EUR — Euro</option>
                    <option value="GBP" className="bg-gray-900">£ GBP — British Pound</option>
                  </select>
                </FormField>
              </div>

              <AnimatePresence>
                {editMode && (
                  <motion.button
                    type="submit"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl
                               bg-gradient-to-r from-white to-gray-100 text-black
                               text-sm font-bold shadow-[0_10px_30px_rgba(255,255,255,0.1)]
                               hover:shadow-[0_15px_40px_rgba(255,255,255,0.2)] transition"
                  >
                    <FiSave /> Save Changes
                  </motion.button>
                )}
              </AnimatePresence>
            </form>
          </Section>

          {/* Change Password */}
          <Section title="Change Password" icon={FiLock} delay={0.2}>
            <form onSubmit={handlePassword(onChangePassword)} noValidate className="space-y-4">
              <FormField label="Current Password" icon={FiLock} error={passwordErrors.currentPassword}>
                <input type="password" placeholder="••••••••"
                  {...regPassword("currentPassword")}
                  className={inputClass(passwordErrors.currentPassword)} />
              </FormField>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField label="New Password" icon={FiLock} error={passwordErrors.newPassword}>
                  <input type="password" placeholder="••••••••"
                    {...regPassword("newPassword")}
                    className={inputClass(passwordErrors.newPassword)} />
                </FormField>

                <FormField label="Confirm Password" icon={FiLock} error={passwordErrors.confirmPassword}>
                  <input type="password" placeholder="••••••••"
                    {...regPassword("confirmPassword")}
                    className={inputClass(passwordErrors.confirmPassword)} />
                </FormField>
              </div>

              <motion.button type="submit"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl
                           bg-white/10 text-white border border-white/10
                           text-sm font-semibold hover:bg-white/20 transition">
                <FiShield /> Update Password
              </motion.button>
            </form>
          </Section>

          {/* Notification Preferences */}
          <Section title="Notification Preferences" icon={FiBell} delay={0.3}>
            <Toggle
              value={notifications.emailAlerts}
              onChange={v => setNotifications(p => ({ ...p, emailAlerts: v }))}
              label="Email Alerts"
              description="Receive renewal reminders via email"
            />
            <Toggle
              value={notifications.pushAlerts}
              onChange={v => setNotifications(p => ({ ...p, pushAlerts: v }))}
              label="Push Notifications"
              description="Browser push notifications"
            />
            <Toggle
              value={notifications.weeklyReport}
              onChange={v => setNotifications(p => ({ ...p, weeklyReport: v }))}
              label="Weekly Spending Report"
              description="Get a weekly summary every Monday"
            />
            <Toggle
              value={notifications.threeDayAlert}
              onChange={v => setNotifications(p => ({ ...p, threeDayAlert: v }))}
              label="3-Day Advance Alert"
              description="Alert 3 days before renewal"
            />
            <Toggle
              value={notifications.sameDayAlert}
              onChange={v => setNotifications(p => ({ ...p, sameDayAlert: v }))}
              label="Same-Day Alert"
              description="Alert on the day of renewal"
            />
          </Section>

          {/* Danger Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20
                       backdrop-blur-xl"
          >
            <h2 className="text-red-400 font-bold text-base mb-4 flex items-center gap-2">
              <FiAlertCircle /> Danger Zone
            </h2>

            <div className="flex items-center justify-between py-3
                            border-b border-red-500/10">
              <div>
                <p className="text-white text-sm font-medium">Sign Out</p>
                <p className="text-gray-500 text-xs mt-0.5">
                  Sign out from your current session
                </p>
              </div>
              <motion.button
                onClick={() => { logout(); navigate("/login"); }}
                whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl
                           bg-white/5 border border-white/10 text-gray-300
                           text-sm font-semibold hover:bg-white/10 transition"
              >
                <FiLogOut /> Sign Out
              </motion.button>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-red-400 text-sm font-medium">Delete Account</p>
                <p className="text-gray-500 text-xs mt-0.5">
                  Permanently delete all your data
                </p>
              </div>
              <motion.button
                onClick={() => setDeleteModal(true)}
                whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl
                           bg-red-500/10 border border-red-500/20 text-red-400
                           text-sm font-semibold hover:bg-red-500/20 transition"
              >
                <FiTrash2 /> Delete Account
              </motion.button>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={onDeleteAccount}
      />

    </div>
  );
}