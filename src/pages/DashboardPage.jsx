// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FiHome, FiList, FiPlus, FiBell, FiUser, FiLogOut,
//   FiTrendingUp, FiAlertCircle, FiMenu,
//   FiDollarSign, FiCreditCard
// } from "react-icons/fi";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import {
//   PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
//   BarChart, Bar, XAxis, YAxis, CartesianGrid
// } from "recharts";
// import logo from "../assets/logo.jpeg";

// // ── Demo Data ──────────────────────────────────────────────────
// const DEMO_SUBSCRIPTIONS = [
//   { id: 1, name: "Netflix",      cost: 499,  category: "Entertainment", renewalDate: "2026-03-14", icon: "🎬" },
//   { id: 2, name: "Spotify",      cost: 119,  category: "Entertainment", renewalDate: "2026-03-17", icon: "🎵" },
//   { id: 3, name: "Gym",          cost: 1200, category: "Health",        renewalDate: "2026-03-20", icon: "💪" },
//   { id: 4, name: "Amazon Prime", cost: 299,  category: "Shopping",      renewalDate: "2026-04-05", icon: "📦" },
//   { id: 5, name: "Hotstar",      cost: 899,  category: "Entertainment", renewalDate: "2026-04-10", icon: "📺" },
//   { id: 6, name: "GitHub",       cost: 399,  category: "Tech",          renewalDate: "2026-04-15", icon: "💻" },
// ];

// const PIE_COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];

// // ── Helpers ────────────────────────────────────────────────────
// const getDaysLeft = (dateStr) => {
//   const today = new Date();
//   const renewal = new Date(dateStr);
//   return Math.ceil((renewal - today) / (1000 * 60 * 60 * 24));
// };

// const getAlertStyle = (days) => {
//   if (days <= 0)  return { color: "text-gray-400",   bg: "bg-gray-500/10",   border: "border-gray-500/20",  label: "Expired" };
//   if (days <= 3)  return { color: "text-red-400",    bg: "bg-red-500/10",    border: "border-red-500/20",   label: `${days}d left` };
//   if (days <= 7)  return { color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20",label: `${days}d left` };
//   if (days <= 14) return { color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20",label: `${days}d left` };
//   return               { color: "text-green-400",  bg: "bg-green-500/10",  border: "border-green-500/20", label: `${days}d left` };
// };

// // ── Stat Card ──────────────────────────────────────────────────
// function StatCard({ icon: Icon, label, value, sub, color, delay }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5, delay }}
//       whileHover={{ y: -4, scale: 1.02 }}
//       className="relative p-6 rounded-2xl
//                  bg-gradient-to-br from-black/80 via-black/70 to-black/80
//                  border border-white/10 backdrop-blur-xl
//                  shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden"
//     >
//       <div className="absolute inset-0 rounded-2xl bg-gradient-to-br
//                       from-white/5 to-transparent pointer-events-none" />
//       <div className="relative z-10">
//         <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
//           <Icon className="text-lg" />
//         </div>
//         <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">{label}</p>
//         <p className="text-white text-2xl font-bold mb-1">{value}</p>
//         <p className="text-gray-500 text-xs">{sub}</p>
//       </div>
//     </motion.div>
//   );
// }

// // ── Alert Row ──────────────────────────────────────────────────
// function AlertRow({ sub, index }) {
//   const days  = getDaysLeft(sub.renewalDate);
//   const style = getAlertStyle(days);
//   return (
//     <motion.div
//       initial={{ opacity: 0, x: -20 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ delay: 0.1 * index }}
//       className={`flex items-center justify-between p-3 rounded-xl
//                   border ${style.border} ${style.bg} mb-2`}
//     >
//       <div className="flex items-center gap-3">
//         <span className="text-xl">{sub.icon}</span>
//         <div>
//           <p className="text-white text-sm font-semibold">{sub.name}</p>
//           <p className="text-gray-400 text-xs">{sub.renewalDate}</p>
//         </div>
//       </div>
//       <div className="text-right">
//         <p className="text-white text-sm font-bold">₹{sub.cost}</p>
//         <p className={`text-xs font-semibold ${style.color}`}>{style.label}</p>
//       </div>
//     </motion.div>
//   );
// }

// // ── Sidebar Content ────────────────────────────────────────────
// // FIX 1: Added `navigate` to props
// function SidebarContent({ navItems, activeTab, setActiveTab, setSidebarOpen, handleLogout, navigate }) {
//   return (
//     <>
//       {/* Logo */}
//       <div className="mb-8 px-2">
//         <img src={logo} alt="Logo" className="h-12 w-auto object-contain" />
//         <p className="text-gray-500 text-xs mt-1">Subscription Manager</p>
//       </div>

//       {/* Nav Items */}
//       <nav className="flex-1 space-y-1">
//         {navItems.map((item) => (
//           <motion.button
//             key={item.id}
//             // FIX 2: Added navigate(item.path) to onClick
//             onClick={() => {
//               setActiveTab(item.id);
//               setSidebarOpen(false);
//               navigate(item.path);
//             }}
//             whileHover={{ x: 4 }}
//             whileTap={{ scale: 0.97 }}
//             className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl
//                         text-sm font-medium transition duration-200 relative
//                         ${activeTab === item.id
//                           ? "bg-white/10 text-white"
//                           : "text-gray-400 hover:text-white hover:bg-white/5"
//                         }`}
//           >
//             <item.icon className="text-lg flex-shrink-0" />
//             {item.label}
//             {item.badge > 0 && (
//               <span className="ml-auto w-5 h-5 bg-red-500 rounded-full
//                                text-white text-xs flex items-center justify-center font-bold">
//                 {item.badge}
//               </span>
//             )}
//             {activeTab === item.id && (
//               <motion.div
//                 layoutId="activeTab"
//                 className="absolute left-0 top-1/2 -translate-y-1/2
//                            w-1 h-6 bg-indigo-400 rounded-r-full"
//               />
//             )}
//           </motion.button>
//         ))}
//       </nav>

//       {/* Logout */}
//       <motion.button
//         onClick={handleLogout}
//         whileHover={{ x: 4 }}
//         whileTap={{ scale: 0.97 }}
//         className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
//                    text-sm font-medium text-gray-400
//                    hover:text-red-400 hover:bg-red-500/10 transition duration-200"
//       >
//         <FiLogOut className="text-lg" />
//         Logout
//       </motion.button>
//     </>
//   );
// }

// // ── Main Dashboard ─────────────────────────────────────────────
// export default function DashboardPage() {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [activeTab, setActiveTab]     = useState("dashboard");
//   const { user, logout }              = useAuth();
//   const navigate                      = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const totalMonthly = DEMO_SUBSCRIPTIONS.reduce((s, x) => s + x.cost, 0);
//   const totalYearly  = totalMonthly * 12;
//   const urgentAlerts = DEMO_SUBSCRIPTIONS.filter(s => getDaysLeft(s.renewalDate) <= 7).length;

//   const categoryMap = {};
//   DEMO_SUBSCRIPTIONS.forEach(s => {
//     categoryMap[s.category] = (categoryMap[s.category] || 0) + s.cost;
//   });
//   const pieData = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
//   const barData = DEMO_SUBSCRIPTIONS.map(s => ({ name: s.name, cost: s.cost }));
//   const upcoming = [...DEMO_SUBSCRIPTIONS].sort(
//     (a, b) => getDaysLeft(a.renewalDate) - getDaysLeft(b.renewalDate)
//   );

//   const navItems = [
//     { id: "dashboard",     icon: FiHome,  label: "Dashboard",     path: "/dashboard" },
//     { id: "subscriptions", icon: FiList,  label: "Subscriptions", path: "/subscriptions" },
//     { id: "alerts",        icon: FiBell,  label: "Alerts",        path: "/alerts",  badge: urgentAlerts },
//     { id: "profile",       icon: FiUser,  label: "Profile",       path: "/profile" },
//   ];

//   return (
//     <div className="min-h-screen bg-white flex overflow-hidden">

//       {/* ── Sidebar ── */}
//       <>
//         {/* Mobile overlay — FIX 3: just closes sidebar, no item reference */}
//         <AnimatePresence>
//           {sidebarOpen && (
//             <motion.div
//               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//               onClick={() => setSidebarOpen(false)}
//               className="fixed inset-0 bg-black/50 z-20 lg:hidden"
//             />
//           )}
//         </AnimatePresence>

//         {/* Mobile sidebar */}
//         <motion.aside
//           initial={{ x: -280 }}
//           animate={{ x: sidebarOpen ? 0 : -280 }}
//           className="fixed top-0 left-0 h-full w-64 z-30
//                      bg-black/90 backdrop-blur-xl border-r border-white/10
//                      flex flex-col py-6 px-4 lg:hidden"
//         >
//           <SidebarContent
//             navItems={navItems}
//             activeTab={activeTab}
//             setActiveTab={setActiveTab}
//             setSidebarOpen={setSidebarOpen}
//             handleLogout={handleLogout}
//             navigate={navigate}
//           />
//         </motion.aside>

//         {/* Desktop sidebar */}
//         <aside className="hidden lg:flex w-64 flex-shrink-0
//                           bg-black/90 backdrop-blur-xl border-r border-white/10
//                           flex-col py-6 px-4 min-h-screen">
//           <SidebarContent
//             navItems={navItems}
//             activeTab={activeTab}
//             setActiveTab={setActiveTab}
//             setSidebarOpen={setSidebarOpen}
//             handleLogout={handleLogout}
//             navigate={navigate}
//           />
//         </aside>
//       </>

//       {/* ── Main Content ── */}
//       <div className="flex-1 overflow-auto bg-gray-50">

//         {/* Top bar */}
//         <motion.div
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl
//                      border-b border-gray-200 px-6 py-4
//                      flex items-center justify-between"
//         >
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => setSidebarOpen(true)}
//               className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
//             >
//               <FiMenu className="text-gray-600 text-xl" />
//             </button>
//             <div>
//               <h1 className="text-xl font-bold text-gray-900">
//                 Good morning, {user?.name?.split(" ")[0] || "User"} 👋
//               </h1>
//               <p className="text-gray-500 text-sm">Here's your subscription overview</p>
//             </div>
//           </div>

//           {/* Top bar right — Bell + Sign Out */}
//           <div className="flex items-center gap-3">
//             <div className="relative">
//               <button className="p-2 rounded-xl bg-black/5 hover:bg-black/10 transition">
//                 <FiBell className="text-gray-700 text-xl" />
//               </button>
//               {urgentAlerts > 0 && (
//                 <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500
//                                  rounded-full text-white text-xs flex items-center
//                                  justify-center font-bold">
//                   {urgentAlerts}
//                 </span>
//               )}
//             </div>
//             <motion.button
//               onClick={handleLogout}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.97 }}
//               className="flex items-center gap-2 px-4 py-2 rounded-xl
//                          bg-black/90 text-white text-sm font-semibold
//                          border border-white/10 hover:bg-red-500/20
//                          hover:border-red-500/30 hover:text-red-400
//                          transition duration-200"
//             >
//               <FiLogOut />
//               Sign Out
//             </motion.button>
//           </div>
//         </motion.div>

//         <div className="p-6 space-y-6">

//           {/* Urgent Alert Banner */}
//           {urgentAlerts > 0 && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="flex items-center gap-3 p-4 rounded-2xl
//                          bg-red-500/10 border border-red-500/20"
//             >
//               <FiAlertCircle className="text-red-400 text-xl flex-shrink-0" />
//               <p className="text-red-300 text-sm">
//                 <span className="font-bold text-red-400">
//                   {urgentAlerts} subscription{urgentAlerts > 1 ? "s" : ""}
//                 </span>{" "}
//                 renewing within 7 days! Check alerts below.
//               </p>
//             </motion.div>
//           )}

//           {/* Stats Row */}
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//             <StatCard icon={FiDollarSign}  label="Monthly Spend"  value={`₹${totalMonthly.toLocaleString()}`} sub="This month"           color="bg-indigo-500/20 text-indigo-400"  delay={0.1} />
//             <StatCard icon={FiTrendingUp}  label="Yearly Spend"   value={`₹${totalYearly.toLocaleString()}`}  sub="Projected annual"     color="bg-emerald-500/20 text-emerald-400" delay={0.2} />
//             <StatCard icon={FiCreditCard}  label="Active Subs"    value={DEMO_SUBSCRIPTIONS.length}           sub="Total subscriptions"  color="bg-amber-500/20 text-amber-400"    delay={0.3} />
//             <StatCard icon={FiAlertCircle} label="Alerts"         value={urgentAlerts}                        sub="Due this week"        color="bg-red-500/20 text-red-400"        delay={0.4} />
//           </div>

//           {/* Charts Row */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
//               className="p-6 rounded-2xl bg-gradient-to-br from-black/80 to-black/70
//                          border border-white/10 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
//               <h3 className="text-white font-semibold mb-4">🥧 Spend by Category</h3>
//               <ResponsiveContainer width="100%" height={200}>
//                 <PieChart>
//                   <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
//                     {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
//                   </Pie>
//                   <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "#f1f5f9" }} formatter={(v) => [`₹${v}`, ""]} />
//                 </PieChart>
//               </ResponsiveContainer>
//               <div className="flex flex-wrap gap-3 mt-2">
//                 {pieData.map((d, i) => (
//                   <div key={d.name} className="flex items-center gap-1.5">
//                     <div className="w-2.5 h-2.5 rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
//                     <span className="text-gray-400 text-xs">{d.name}</span>
//                   </div>
//                 ))}
//               </div>
//             </motion.div>

//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
//               className="p-6 rounded-2xl bg-gradient-to-br from-black/80 to-black/70
//                          border border-white/10 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
//               <h3 className="text-white font-semibold mb-4">📊 Cost per Subscription</h3>
//               <ResponsiveContainer width="100%" height={220}>
//                 <BarChart data={barData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
//                   <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} />
//                   <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} />
//                   <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "#f1f5f9" }} formatter={(v) => [`₹${v}`, "Cost"]} />
//                   <Bar dataKey="cost" radius={[6, 6, 0, 0]}>
//                     {barData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
//                   </Bar>
//                 </BarChart>
//               </ResponsiveContainer>
//             </motion.div>
//           </div>

//           {/* Bottom Row */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
//               className="p-6 rounded-2xl bg-gradient-to-br from-black/80 to-black/70
//                          border border-white/10 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
//               <h3 className="text-white font-semibold mb-4">🔔 Upcoming Renewals</h3>
//               {upcoming.map((sub, i) => <AlertRow key={sub.id} sub={sub} index={i} />)}
//             </motion.div>

//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
//               className="p-6 rounded-2xl bg-gradient-to-br from-black/80 to-black/70
//                          border border-white/10 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-white font-semibold">📋 All Subscriptions</h3>
//                 <button
//                   onClick={() => navigate("/subscriptions")}
//                   className="flex items-center gap-1 text-xs text-indigo-400
//                              hover:text-indigo-300 transition font-semibold">
//                   <FiPlus /> Add New
//                 </button>
//               </div>
//               <div className="space-y-2">
//                 {DEMO_SUBSCRIPTIONS.map((sub, i) => (
//                   <motion.div key={sub.id}
//                     initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: 0.1 * i }}
//                     className="flex items-center justify-between p-3 rounded-xl
//                                bg-white/5 border border-white/5 hover:bg-white/10 transition duration-200"
//                   >
//                     <div className="flex items-center gap-3">
//                       <span className="text-lg">{sub.icon}</span>
//                       <div>
//                         <p className="text-white text-sm font-semibold">{sub.name}</p>
//                         <p className="text-gray-500 text-xs">{sub.category}</p>
//                       </div>
//                     </div>
//                     <p className="text-white text-sm font-bold">₹{sub.cost}</p>
//                   </motion.div>
//                 ))}
//               </div>
//             </motion.div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome, FiList, FiPlus, FiBell, FiUser, FiLogOut,
  FiTrendingUp, FiAlertCircle, FiMenu,
  FiDollarSign, FiCreditCard
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";
import logo from "../assets/logo.jpeg";

// ── Demo Data ──────────────────────────────────────────────────
const DEMO_SUBSCRIPTIONS = [
  { id: 1, name: "Netflix",      cost: 499,  category: "Entertainment", renewalDate: "2026-03-14", icon: "🎬" },
  { id: 2, name: "Spotify",      cost: 119,  category: "Entertainment", renewalDate: "2026-03-17", icon: "🎵" },
  { id: 3, name: "Gym",          cost: 1200, category: "Health",        renewalDate: "2026-03-20", icon: "💪" },
  { id: 4, name: "Amazon Prime", cost: 299,  category: "Shopping",      renewalDate: "2026-04-05", icon: "📦" },
  { id: 5, name: "Hotstar",      cost: 899,  category: "Entertainment", renewalDate: "2026-04-10", icon: "📺" },
  { id: 6, name: "GitHub",       cost: 399,  category: "Tech",          renewalDate: "2026-04-15", icon: "💻" },
];

const PIE_COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];

// ── Helpers ────────────────────────────────────────────────────
const getDaysLeft = (dateStr) => {
  const today = new Date();
  const renewal = new Date(dateStr);
  return Math.ceil((renewal - today) / (1000 * 60 * 60 * 24));
};

const getAlertStyle = (days) => {
  if (days <= 0)  return { color: "text-gray-400",   bg: "bg-gray-500/10",   border: "border-gray-500/20",  label: "Expired" };
  if (days <= 3)  return { color: "text-red-400",    bg: "bg-red-500/10",    border: "border-red-500/20",   label: `${days}d left` };
  if (days <= 7)  return { color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20",label: `${days}d left` };
  if (days <= 14) return { color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20",label: `${days}d left` };
  return               { color: "text-green-400",  bg: "bg-green-500/10",  border: "border-green-500/20", label: `${days}d left` };
};

// ── Stat Card ──────────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, sub, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="relative p-6 rounded-2xl
                 bg-gradient-to-br from-black/80 via-black/70 to-black/80
                 border border-white/10 backdrop-blur-xl
                 shadow-[0_20px_60px_rgba(0,0,0,0.4)] overflow-hidden"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br
                      from-white/5 to-transparent pointer-events-none" />
      <div className="relative z-10">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${color}`}>
          <Icon className="text-lg" />
        </div>
        <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">{label}</p>
        <p className="text-white text-2xl font-bold mb-1">{value}</p>
        <p className="text-gray-500 text-xs">{sub}</p>
      </div>
    </motion.div>
  );
}

// ── Alert Row ──────────────────────────────────────────────────
function AlertRow({ sub, index }) {
  const days  = getDaysLeft(sub.renewalDate);
  const style = getAlertStyle(days);
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 * index }}
      className={`flex items-center justify-between p-3 rounded-xl
                  border ${style.border} ${style.bg} mb-2`}
    >
      <div className="flex items-center gap-3">
        <span className="text-xl">{sub.icon}</span>
        <div>
          <p className="text-white text-sm font-semibold">{sub.name}</p>
          <p className="text-gray-400 text-xs">{sub.renewalDate}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-white text-sm font-bold">₹{sub.cost}</p>
        <p className={`text-xs font-semibold ${style.color}`}>{style.label}</p>
      </div>
    </motion.div>
  );
}

// ── Sidebar Content ────────────────────────────────────────────
function SidebarContent({ navItems, activeTab, setActiveTab, setSidebarOpen, handleLogout, navigate }) {
  return (
    <>
      <div className="mb-8 px-2">
        <img src={logo} alt="Logo" className="h-12 w-auto object-contain" />
        <p className="text-gray-500 text-xs mt-1">Subscription Manager</p>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => { setActiveTab(item.id); setSidebarOpen(false); navigate(item.path); }}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.97 }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl
                        text-sm font-medium transition duration-200 relative
                        ${activeTab === item.id
                          ? "bg-white/10 text-white"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
          >
            <item.icon className="text-lg flex-shrink-0" />
            {item.label}
            {item.badge > 0 && (
              <span className="ml-auto w-5 h-5 bg-red-500 rounded-full
                               text-white text-xs flex items-center justify-center font-bold">
                {item.badge}
              </span>
            )}
            {activeTab === item.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute left-0 top-1/2 -translate-y-1/2
                           w-1 h-6 bg-indigo-400 rounded-r-full"
              />
            )}
          </motion.button>
        ))}
      </nav>

      <motion.button
        onClick={handleLogout}
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.97 }}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl
                   text-sm font-medium text-gray-400
                   hover:text-red-400 hover:bg-red-500/10 transition duration-200"
      >
        <FiLogOut className="text-lg" />
        Logout
      </motion.button>
    </>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────
export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab]     = useState("dashboard");
  const [notifOpen, setNotifOpen]     = useState(false);   // ← notification dropdown
  const { user, logout }              = useAuth();
  const navigate                      = useNavigate();

  const handleLogout = () => { logout(); navigate("/login"); };

  const totalMonthly = DEMO_SUBSCRIPTIONS.reduce((s, x) => s + x.cost, 0);
  const totalYearly  = totalMonthly * 12;
  const urgentAlerts = DEMO_SUBSCRIPTIONS.filter(s => getDaysLeft(s.renewalDate) <= 7).length;

  const categoryMap = {};
  DEMO_SUBSCRIPTIONS.forEach(s => {
    categoryMap[s.category] = (categoryMap[s.category] || 0) + s.cost;
  });
  const pieData = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));
  const barData = DEMO_SUBSCRIPTIONS.map(s => ({ name: s.name, cost: s.cost }));
  const upcoming = [...DEMO_SUBSCRIPTIONS].sort(
    (a, b) => getDaysLeft(a.renewalDate) - getDaysLeft(b.renewalDate)
  );

  // Subscriptions due within 7 days for notification dropdown
  const urgentSubs = upcoming.filter(
    s => getDaysLeft(s.renewalDate) <= 7 && getDaysLeft(s.renewalDate) > 0
  );

  const navItems = [
    { id: "dashboard",     icon: FiHome,  label: "Dashboard",     path: "/dashboard" },
    { id: "subscriptions", icon: FiList,  label: "Subscriptions", path: "/subscriptions" },
    { id: "alerts",        icon: FiBell,  label: "Alerts",        path: "/alerts",  badge: urgentAlerts },
    { id: "profile",       icon: FiUser,  label: "Profile",       path: "/profile" },
  ];

  return (
    <div className="min-h-screen bg-white flex overflow-hidden">

      {/* ── Sidebar ── */}
      <>
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-20 lg:hidden"
            />
          )}
        </AnimatePresence>

        <motion.aside
          initial={{ x: -280 }}
          animate={{ x: sidebarOpen ? 0 : -280 }}
          className="fixed top-0 left-0 h-full w-64 z-30
                     bg-black/90 backdrop-blur-xl border-r border-white/10
                     flex flex-col py-6 px-4 lg:hidden"
        >
          <SidebarContent navItems={navItems} activeTab={activeTab}
            setActiveTab={setActiveTab} setSidebarOpen={setSidebarOpen}
            handleLogout={handleLogout} navigate={navigate} />
        </motion.aside>

        <aside className="hidden lg:flex w-64 flex-shrink-0
                          bg-black/90 backdrop-blur-xl border-r border-white/10
                          flex-col py-6 px-4 min-h-screen">
          <SidebarContent navItems={navItems} activeTab={activeTab}
            setActiveTab={setActiveTab} setSidebarOpen={setSidebarOpen}
            handleLogout={handleLogout} navigate={navigate} />
        </aside>
      </>

      {/* ── Main Content ── */}
      <div className="flex-1 overflow-auto bg-gray-50">

        {/* Top bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl
                     border-b border-gray-200 px-6 py-4
                     flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition">
              <FiMenu className="text-gray-600 text-xl" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Good morning, {user?.name?.split(" ")[0] || "User"} 👋
              </h1>
              <p className="text-gray-500 text-sm">Here's your subscription overview</p>
            </div>
          </div>

          {/* ── Top Bar Right ── */}
          <div className="flex items-center gap-3">

            {/* Bell with notification dropdown */}
            <div className="relative">
              <motion.button
                onClick={() => setNotifOpen(prev => !prev)}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-xl bg-black/5 hover:bg-black/10 transition"
              >
                <FiBell className="text-gray-700 text-xl" />
              </motion.button>

              {/* Red badge */}
              {urgentAlerts > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500
                                 rounded-full text-white text-xs flex items-center
                                 justify-center font-bold pointer-events-none">
                  {urgentAlerts}
                </span>
              )}

              {/* Dropdown */}
              <AnimatePresence>
                {notifOpen && (
                  <>
                    {/* Click outside to close */}
                    <div className="fixed inset-0 z-10"
                         onClick={() => setNotifOpen(false)} />

                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="absolute right-0 top-12 w-80 z-20
                                 bg-gradient-to-br from-black/95 to-black/90
                                 border border-white/10 rounded-2xl
                                 shadow-[0_30px_80px_rgba(0,0,0,0.5)] overflow-hidden"
                    >
                      {/* Dropdown header */}
                      <div className="flex items-center justify-between px-5 py-4
                                      border-b border-white/10">
                        <h3 className="text-white font-bold text-sm flex items-center gap-2">
                          🔔 Notifications
                        </h3>
                        <span className="text-xs px-2 py-1 rounded-full
                                         bg-red-500/20 text-red-400 font-semibold">
                          {urgentAlerts} urgent
                        </span>
                      </div>

                      {/* Notification items */}
                      <div className="max-h-72 overflow-y-auto">
                        {urgentSubs.length > 0 ? (
                          urgentSubs.map((sub, i) => {
                            const days = getDaysLeft(sub.renewalDate);
                            return (
                              <motion.div
                                key={sub.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.05 * i }}
                                className="flex items-center gap-3 px-5 py-3
                                           border-b border-white/5 hover:bg-white/5
                                           transition cursor-pointer"
                              >
                                <div className="w-9 h-9 rounded-xl bg-white/10
                                                flex items-center justify-center text-lg flex-shrink-0">
                                  {sub.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-white text-sm font-semibold">{sub.name}</p>
                                  <p className="text-gray-400 text-xs">Renews on {sub.renewalDate}</p>
                                </div>
                                <span className={`text-xs font-bold px-2 py-1 rounded-lg flex-shrink-0
                                  ${days <= 3
                                    ? "bg-red-500/20 text-red-400"
                                    : "bg-orange-500/20 text-orange-400"
                                  }`}>
                                  {days}d left
                                </span>
                              </motion.div>
                            );
                          })
                        ) : (
                          <div className="px-5 py-8 text-center">
                            <p className="text-3xl mb-2">✅</p>
                            <p className="text-white text-sm font-semibold mb-1">All clear!</p>
                            <p className="text-gray-400 text-xs">No urgent renewals this week.</p>
                          </div>
                        )}
                      </div>

                      {/* Dropdown footer */}
                      <div className="px-5 py-3 border-t border-white/10">
                        <button
                          onClick={() => { setNotifOpen(false); navigate("/alerts"); }}
                          className="w-full text-center text-indigo-400 text-xs
                                     font-semibold hover:text-indigo-300 transition py-1"
                        >
                          View all alerts →
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Sign Out */}
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl
                         bg-black/90 text-white text-sm font-semibold
                         border border-white/10 hover:bg-red-500/20
                         hover:border-red-500/30 hover:text-red-400
                         transition duration-200"
            >
              <FiLogOut />
              Sign Out
            </motion.button>
          </div>
        </motion.div>

        <div className="p-6 space-y-6">

          {/* Urgent Alert Banner */}
          {urgentAlerts > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 p-4 rounded-2xl
                         bg-red-500/10 border border-red-500/20"
            >
              <FiAlertCircle className="text-red-400 text-xl flex-shrink-0" />
              <p className="text-red-300 text-sm">
                <span className="font-bold text-red-400">
                  {urgentAlerts} subscription{urgentAlerts > 1 ? "s" : ""}
                </span>{" "}
                renewing within 7 days! Check alerts below.
              </p>
            </motion.div>
          )}

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={FiDollarSign}  label="Monthly Spend"  value={`₹${totalMonthly.toLocaleString()}`} sub="This month"          color="bg-indigo-500/20 text-indigo-400"   delay={0.1} />
            <StatCard icon={FiTrendingUp}  label="Yearly Spend"   value={`₹${totalYearly.toLocaleString()}`}  sub="Projected annual"    color="bg-emerald-500/20 text-emerald-400"  delay={0.2} />
            <StatCard icon={FiCreditCard}  label="Active Subs"    value={DEMO_SUBSCRIPTIONS.length}           sub="Total subscriptions" color="bg-amber-500/20 text-amber-400"     delay={0.3} />
            <StatCard icon={FiAlertCircle} label="Alerts"         value={urgentAlerts}                        sub="Due this week"       color="bg-red-500/20 text-red-400"         delay={0.4} />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-black/80 to-black/70
                         border border-white/10 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
              <h3 className="text-white font-semibold mb-4">🥧 Spend by Category</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85}
                       paddingAngle={3} dataKey="value">
                    {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "#f1f5f9" }} formatter={(v) => [`₹${v}`, ""]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-3 mt-2">
                {pieData.map((d, i) => (
                  <div key={d.name} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                    <span className="text-gray-400 text-xs">{d.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-black/80 to-black/70
                         border border-white/10 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
              <h3 className="text-white font-semibold mb-4">📊 Cost per Subscription</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={barData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} />
                  <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} />
                  <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "#f1f5f9" }} formatter={(v) => [`₹${v}`, "Cost"]} />
                  <Bar dataKey="cost" radius={[6, 6, 0, 0]}>
                    {barData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </motion.div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-black/80 to-black/70
                         border border-white/10 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
              <h3 className="text-white font-semibold mb-4">🔔 Upcoming Renewals</h3>
              {upcoming.map((sub, i) => <AlertRow key={sub.id} sub={sub} index={i} />)}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-black/80 to-black/70
                         border border-white/10 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold">📋 All Subscriptions</h3>
                <button onClick={() => navigate("/subscriptions")}
                  className="flex items-center gap-1 text-xs text-indigo-400
                             hover:text-indigo-300 transition font-semibold">
                  <FiPlus /> Add New
                </button>
              </div>
              <div className="space-y-2">
                {DEMO_SUBSCRIPTIONS.map((sub, i) => (
                  <motion.div key={sub.id}
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className="flex items-center justify-between p-3 rounded-xl
                               bg-white/5 border border-white/5 hover:bg-white/10 transition duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{sub.icon}</span>
                      <div>
                        <p className="text-white text-sm font-semibold">{sub.name}</p>
                        <p className="text-gray-500 text-xs">{sub.category}</p>
                      </div>
                    </div>
                    <p className="text-white text-sm font-bold">₹{sub.cost}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </div>
  );
}