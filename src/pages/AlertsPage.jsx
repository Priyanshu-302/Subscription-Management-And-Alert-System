// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FiBell, FiAlertCircle, FiCheckCircle,
//   FiClock, FiCalendar, FiFilter
// } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";

// // ── Demo Data (replace with API later) ────────────────────────
// const DEMO_SUBSCRIPTIONS = [
//   { id: 1, name: "Netflix",      cost: 499,  category: "Entertainment", renewalDate: "2026-03-14", icon: "🎬" },
//   { id: 2, name: "Spotify",      cost: 119,  category: "Entertainment", renewalDate: "2026-03-17", icon: "🎵" },
//   { id: 3, name: "Gym",          cost: 1200, category: "Health",        renewalDate: "2026-03-20", icon: "💪" },
//   { id: 4, name: "Amazon Prime", cost: 299,  category: "Shopping",      renewalDate: "2026-04-05", icon: "📦" },
//   { id: 5, name: "Hotstar",      cost: 899,  category: "Entertainment", renewalDate: "2026-04-10", icon: "📺" },
//   { id: 6, name: "GitHub",       cost: 399,  category: "Tech",          renewalDate: "2026-04-15", icon: "💻" },
// ];

// // ── Helpers ────────────────────────────────────────────────────
// const getDaysLeft = (dateStr) => {
//   const today = new Date();
//   const renewal = new Date(dateStr);
//   return Math.ceil((renewal - today) / (1000 * 60 * 60 * 24));
// };

// const getAlertLevel = (days) => {
//   if (days <= 0)  return "expired";
//   if (days <= 3)  return "critical";
//   if (days <= 7)  return "warning";
//   if (days <= 14) return "upcoming";
//   return "safe";
// };

// const ALERT_STYLES = {
//   expired:  { color: "text-gray-400",   bg: "bg-gray-500/10",    border: "border-gray-500/30",  dot: "bg-gray-400",   label: "Expired",  emoji: "💀" },
//   critical: { color: "text-red-400",    bg: "bg-red-500/10",     border: "border-red-500/30",   dot: "bg-red-400",    label: "Critical", emoji: "🔴" },
//   warning:  { color: "text-orange-400", bg: "bg-orange-500/10",  border: "border-orange-500/30",dot: "bg-orange-400", label: "Warning",  emoji: "🟠" },
//   upcoming: { color: "text-yellow-400", bg: "bg-yellow-500/10",  border: "border-yellow-500/30",dot: "bg-yellow-400", label: "Upcoming", emoji: "🟡" },
//   safe:     { color: "text-green-400",  bg: "bg-green-500/10",   border: "border-green-500/30", dot: "bg-green-400",  label: "Safe",     emoji: "🟢" },
// };

// // ── Countdown Timer Component ──────────────────────────────────
// function CountdownTimer({ renewalDate }) {
//   const [timeLeft, setTimeLeft] = useState({});

//   useEffect(() => {
//     const calculate = () => {
//       const now     = new Date();
//       const renewal = new Date(renewalDate);
//       const diff    = renewal - now;

//       if (diff <= 0) {
//         setTimeLeft({ expired: true });
//         return;
//       }

//       setTimeLeft({
//         days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
//         hours:   Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
//         minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
//         seconds: Math.floor((diff % (1000 * 60)) / 1000),
//       });
//     };

//     calculate();
//     const interval = setInterval(calculate, 1000);
//     return () => clearInterval(interval);
//   }, [renewalDate]);

//   if (timeLeft.expired) {
//     return <span className="text-gray-400 text-xs font-mono">Expired</span>;
//   }

//   return (
//     <div className="flex items-center gap-1 font-mono text-xs">
//       <TimeBox value={timeLeft.days}    label="d" />
//       <span className="text-gray-600">:</span>
//       <TimeBox value={timeLeft.hours}   label="h" />
//       <span className="text-gray-600">:</span>
//       <TimeBox value={timeLeft.minutes} label="m" />
//       <span className="text-gray-600">:</span>
//       <TimeBox value={timeLeft.seconds} label="s" />
//     </div>
//   );
// }

// function TimeBox({ value, label }) {
//   return (
//     <div className="flex flex-col items-center">
//       <span className="text-white font-bold text-sm w-7 text-center
//                        bg-white/10 rounded px-1 py-0.5">
//         {String(value ?? 0).padStart(2, "0")}
//       </span>
//       <span className="text-gray-600 text-xs mt-0.5">{label}</span>
//     </div>
//   );
// }

// // ── Alert Card ─────────────────────────────────────────────────
// function AlertCard({ sub, index }) {
//   const days    = getDaysLeft(sub.renewalDate);
//   const level   = getAlertLevel(days);
//   const style   = ALERT_STYLES[level];

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.06 * index }}
//       whileHover={{ y: -3, scale: 1.01 }}
//       className={`relative p-5 rounded-2xl border ${style.border} ${style.bg}
//                   backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.3)]`}
//     >
//       {/* Top row */}
//       <div className="flex items-start justify-between mb-4">
//         <div className="flex items-center gap-3">
//           <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center
//                           justify-center text-2xl flex-shrink-0">
//             {sub.icon}
//           </div>
//           <div>
//             <h3 className="text-white font-bold text-base">{sub.name}</h3>
//             <p className="text-gray-400 text-xs">{sub.category}</p>
//           </div>
//         </div>

//         {/* Status badge */}
//         <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full
//                          ${style.bg} border ${style.border}`}>
//           <div className={`w-2 h-2 rounded-full ${style.dot} animate-pulse`} />
//           <span className={`text-xs font-bold ${style.color}`}>{style.emoji} {style.label}</span>
//         </div>
//       </div>

//       {/* Info row */}
//       <div className="grid grid-cols-2 gap-3 mb-4">
//         <div className="bg-white/5 rounded-xl p-3">
//           <p className="text-gray-500 text-xs mb-1">Monthly Cost</p>
//           <p className="text-white font-bold text-lg">₹{sub.cost}</p>
//         </div>
//         <div className="bg-white/5 rounded-xl p-3">
//           <p className="text-gray-500 text-xs mb-1">Renewal Date</p>
//           <p className="text-white font-semibold text-sm">{sub.renewalDate}</p>
//         </div>
//       </div>

//       {/* Countdown */}
//       <div className="flex items-center justify-between bg-white/5 rounded-xl p-3">
//         <div className="flex items-center gap-2">
//           <FiClock className={`${style.color} text-sm`} />
//           <span className="text-gray-400 text-xs">Time remaining</span>
//         </div>
//         <CountdownTimer renewalDate={sub.renewalDate} />
//       </div>

//       {/* Days left bar */}
//       {days > 0 && (
//         <div className="mt-3">
//           <div className="flex justify-between text-xs text-gray-500 mb-1">
//             <span>0 days</span>
//             <span className={`font-semibold ${style.color}`}>{days} days left</span>
//             <span>30 days</span>
//           </div>
//           <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
//             <motion.div
//               initial={{ width: 0 }}
//               animate={{ width: `${Math.min((days / 30) * 100, 100)}%` }}
//               transition={{ duration: 0.8, delay: 0.1 * index }}
//               className="h-full rounded-full"
//               style={{ background: style.dot.replace("bg-", "").includes("red")
//                 ? "#ef4444" : style.dot.replace("bg-", "").includes("orange")
//                 ? "#f97316" : style.dot.replace("bg-", "").includes("yellow")
//                 ? "#eab308" : "#22c55e"
//               }}
//             />
//           </div>
//         </div>
//       )}
//     </motion.div>
//   );
// }

// // ── Summary Banner ─────────────────────────────────────────────
// function SummaryBanner({ subs }) {
//   const critical = subs.filter(s => getAlertLevel(getDaysLeft(s.renewalDate)) === "critical").length;
//   const warning  = subs.filter(s => getAlertLevel(getDaysLeft(s.renewalDate)) === "warning").length;
//   const upcoming = subs.filter(s => getAlertLevel(getDaysLeft(s.renewalDate)) === "upcoming").length;
//   const safe     = subs.filter(s => getAlertLevel(getDaysLeft(s.renewalDate)) === "safe").length;
//   const totalDue = subs
//     .filter(s => getDaysLeft(s.renewalDate) <= 7 && getDaysLeft(s.renewalDate) > 0)
//     .reduce((sum, s) => sum + s.cost, 0);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: -10 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
//     >
//       {[
//         { label: "Critical",    value: critical, color: "text-red-400",    bg: "bg-red-500/10",    border: "border-red-500/20",    emoji: "🔴" },
//         { label: "Warning",     value: warning,  color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20", emoji: "🟠" },
//         { label: "Upcoming",    value: upcoming, color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20", emoji: "🟡" },
//         { label: "Safe",        value: safe,     color: "text-green-400",  bg: "bg-green-500/10",  border: "border-green-500/20",  emoji: "🟢" },
//       ].map((item, i) => (
//         <motion.div
//           key={item.label}
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 * i }}
//           className={`p-4 rounded-2xl ${item.bg} border ${item.border}
//                       backdrop-blur-xl text-center`}
//         >
//           <p className="text-2xl mb-1">{item.emoji}</p>
//           <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
//           <p className="text-gray-400 text-xs mt-1">{item.label}</p>
//         </motion.div>
//       ))}
//     </motion.div>
//   );
// }

// // ── Main Alerts Page ───────────────────────────────────────────
// export default function AlertsPage() {
//   const [activeTab, setActiveTab] = useState("all");
//   const navigate                  = useNavigate();

//   const tabs = [
//     { id: "all",      label: "All",          emoji: "📋" },
//     { id: "critical", label: "Critical",     emoji: "🔴" },
//     { id: "warning",  label: "This Week",    emoji: "🟠" },
//     { id: "upcoming", label: "This Month",   emoji: "🟡" },
//     { id: "safe",     label: "Safe",         emoji: "🟢" },
//   ];

//   const filtered = DEMO_SUBSCRIPTIONS
//     .filter(s => {
//       const level = getAlertLevel(getDaysLeft(s.renewalDate));
//       if (activeTab === "all") return true;
//       return level === activeTab;
//     })
//     .sort((a, b) => getDaysLeft(a.renewalDate) - getDaysLeft(b.renewalDate));

//   const urgentCount = DEMO_SUBSCRIPTIONS.filter(
//     s => getDaysLeft(s.renewalDate) <= 7 && getDaysLeft(s.renewalDate) > 0
//   ).length;

//   const urgentCost = DEMO_SUBSCRIPTIONS
//     .filter(s => getDaysLeft(s.renewalDate) <= 7 && getDaysLeft(s.renewalDate) > 0)
//     .reduce((sum, s) => sum + s.cost, 0);

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">

//       {/* ── Header ── */}
//       <motion.div
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="flex items-center justify-between mb-6"
//       >
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
//             <FiBell className="text-gray-700" />
//             Renewal Alerts
//           </h1>
//           <p className="text-gray-500 text-sm mt-0.5">
//             Stay ahead of your subscription renewals
//           </p>
//         </div>

//         {/* Urgent summary pill */}
//         {urgentCount > 0 && (
//           <motion.div
//             initial={{ scale: 0 }}
//             animate={{ scale: 1 }}
//             transition={{ type: "spring", stiffness: 200 }}
//             className="flex items-center gap-2 px-4 py-2 rounded-xl
//                        bg-red-500/10 border border-red-500/20"
//           >
//             <FiAlertCircle className="text-red-400" />
//             <div>
//               <p className="text-red-400 text-xs font-bold">
//                 {urgentCount} due this week
//               </p>
//               <p className="text-red-300 text-xs">₹{urgentCost} at risk</p>
//             </div>
//           </motion.div>
//         )}
//       </motion.div>

//       {/* ── Summary Cards ── */}
//       <SummaryBanner subs={DEMO_SUBSCRIPTIONS} />

//       {/* ── Tabs ── */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 0.2 }}
//         className="flex gap-2 mb-6 overflow-x-auto pb-2"
//       >
//         {tabs.map(tab => {
//           const count = tab.id === "all"
//             ? DEMO_SUBSCRIPTIONS.length
//             : DEMO_SUBSCRIPTIONS.filter(s =>
//                 getAlertLevel(getDaysLeft(s.renewalDate)) === tab.id
//               ).length;

//           return (
//             <motion.button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               whileHover={{ y: -2 }}
//               whileTap={{ scale: 0.97 }}
//               className={`flex items-center gap-2 px-4 py-2.5 rounded-xl
//                           text-sm font-semibold whitespace-nowrap transition duration-200
//                           ${activeTab === tab.id
//                             ? "bg-black text-white shadow-[0_8px_20px_rgba(0,0,0,0.2)]"
//                             : "bg-white text-gray-500 border border-gray-200 hover:border-gray-300"
//                           }`}
//             >
//               {tab.emoji} {tab.label}
//               <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold
//                                 ${activeTab === tab.id
//                                   ? "bg-white/20 text-white"
//                                   : "bg-gray-100 text-gray-500"
//                                 }`}>
//                 {count}
//               </span>
//             </motion.button>
//           );
//         })}
//       </motion.div>

//       {/* ── Alert Cards Grid ── */}
//       <AnimatePresence mode="wait">
//         {filtered.length === 0 ? (
//           <motion.div
//             key="empty"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="flex flex-col items-center justify-center py-24 text-center"
//           >
//             <div className="text-6xl mb-4">✅</div>
//             <h3 className="text-gray-700 font-semibold text-lg mb-2">
//               All clear!
//             </h3>
//             <p className="text-gray-400 text-sm">
//               No subscriptions in this category.
//             </p>
//           </motion.div>
//         ) : (
//           <motion.div
//             key={activeTab}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
//           >
//             {filtered.map((sub, i) => (
//               <AlertCard key={sub.id} sub={sub} index={i} />
//             ))}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ── Bottom tip ── */}
//       {urgentCount > 0 && (
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5 }}
//           className="mt-8 p-4 rounded-2xl bg-gradient-to-r
//                      from-black/80 to-black/70 border border-white/10
//                      flex items-center gap-3"
//         >
//           <div className="text-2xl">💡</div>
//           <div>
//             <p className="text-white text-sm font-semibold">
//               Pro tip: Review subscriptions before renewal
//             </p>
//             <p className="text-gray-400 text-xs mt-0.5">
//               Cancel what you don't use before the renewal date to avoid unwanted charges.
//               <button
//                 onClick={() => navigate("/subscriptions")}
//                 className="text-indigo-400 hover:text-indigo-300 ml-1 font-semibold transition"
//               >
//                 Manage subscriptions →
//               </button>
//             </p>
//           </div>
//         </motion.div>
//       )}

//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiBell, FiAlertCircle, FiClock,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// ── Brand Logos ────────────────────────────────────────────────
const BRAND_LOGOS = {
  "netflix":        "https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png",
  "spotify":        "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg",
  "amazon prime":   "https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.svg",
  "hotstar":        "https://upload.wikimedia.org/wikipedia/commons/1/1e/Disney%2B_Hotstar_logo.svg",
  "github":         "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
  "youtube":        "https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg",
  "youtube premium":"https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg",
  "instagram":      "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
  "notion":         "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png",
  "figma":          "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
  "canva":          "https://upload.wikimedia.org/wikipedia/commons/b/bb/Canva_Logo.svg",
  "chatgpt":        "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
  "adobe":          "https://upload.wikimedia.org/wikipedia/commons/8/8e/Adobe_Corporate_Logo.png",
  "microsoft":      "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  "google one":     "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
  "dropbox":        "https://upload.wikimedia.org/wikipedia/commons/7/74/Dropbox_Icon.svg",
  "linkedin":       "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
  "zoom":           "https://upload.wikimedia.org/wikipedia/commons/7/7b/Zoom_Communications_Logo.svg",
  "slack":          "https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg",
  "apple":          "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  "apple music":    "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  "disney+":        "https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg",
  "twitch":         "https://upload.wikimedia.org/wikipedia/commons/2/26/Twitch_logo.svg",
  "reddit":         "https://upload.wikimedia.org/wikipedia/commons/b/b4/Reddit_logo.svg",
  "twitter":        "https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg",
  "whatsapp":       "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
};

const getLogoForName = (name) =>
  BRAND_LOGOS[name?.toLowerCase().trim()] || null;

// ── Demo Data ──────────────────────────────────────────────────
const DEMO_SUBSCRIPTIONS = [
  { id: 1, name: "Netflix",      cost: 499,  category: "Entertainment", renewalDate: "2026-03-14", icon: "🎬", logo: getLogoForName("netflix") },
  { id: 2, name: "Spotify",      cost: 119,  category: "Entertainment", renewalDate: "2026-03-17", icon: "🎵", logo: getLogoForName("spotify") },
  { id: 3, name: "Gym",          cost: 1200, category: "Health",        renewalDate: "2026-03-20", icon: "💪", logo: null },
  { id: 4, name: "Amazon Prime", cost: 299,  category: "Shopping",      renewalDate: "2026-04-05", icon: "📦", logo: getLogoForName("amazon prime") },
  { id: 5, name: "Hotstar",      cost: 899,  category: "Entertainment", renewalDate: "2026-04-10", icon: "📺", logo: getLogoForName("hotstar") },
  { id: 6, name: "GitHub",       cost: 399,  category: "Tech",          renewalDate: "2026-04-15", icon: "💻", logo: getLogoForName("github") },
];

// ── Helpers ────────────────────────────────────────────────────
const getDaysLeft = (dateStr) => {
  const today = new Date();
  const renewal = new Date(dateStr);
  return Math.ceil((renewal - today) / (1000 * 60 * 60 * 24));
};

const getAlertLevel = (days) => {
  if (days <= 0)  return "expired";
  if (days <= 3)  return "critical";
  if (days <= 7)  return "warning";
  if (days <= 14) return "upcoming";
  return "safe";
};

const ALERT_STYLES = {
  expired:  { color: "text-gray-400",   bg: "bg-gray-500/10",   border: "border-gray-500/30",  dot: "bg-gray-400",   label: "Expired",  emoji: "💀", barColor: "#94a3b8" },
  critical: { color: "text-red-400",    bg: "bg-red-500/10",    border: "border-red-500/30",   dot: "bg-red-400",    label: "Critical", emoji: "🔴", barColor: "#ef4444" },
  warning:  { color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/30",dot: "bg-orange-400", label: "Warning",  emoji: "🟠", barColor: "#f97316" },
  upcoming: { color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/30",dot: "bg-yellow-400", label: "Upcoming", emoji: "🟡", barColor: "#eab308" },
  safe:     { color: "text-green-400",  bg: "bg-green-500/10",  border: "border-green-500/30", dot: "bg-green-400",  label: "Safe",     emoji: "🟢", barColor: "#22c55e" },
};

// ── Brand Icon ─────────────────────────────────────────────────
function BrandIcon({ sub }) {
  const [imgError, setImgError] = useState(false);
  return (
    <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center
                    overflow-hidden flex-shrink-0 p-2 shadow border border-gray-100">
      {sub.logo && !imgError ? (
        <img src={sub.logo} alt={sub.name}
          className="w-full h-full object-contain"
          onError={() => setImgError(true)} />
      ) : (
        <span className="text-2xl">{sub.icon}</span>
      )}
    </div>
  );
}

// ── Countdown Timer ────────────────────────────────────────────
function CountdownTimer({ renewalDate }) {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const calculate = () => {
      const diff = new Date(renewalDate) - new Date();
      if (diff <= 0) { setTimeLeft({ expired: true }); return; }
      setTimeLeft({
        days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours:   Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [renewalDate]);

  if (timeLeft.expired)
    return <span className="text-gray-400 text-xs font-mono">Expired</span>;

  return (
    <div className="flex items-center gap-1 font-mono text-xs">
      {[
        { v: timeLeft.days,    l: "d" },
        { v: timeLeft.hours,   l: "h" },
        { v: timeLeft.minutes, l: "m" },
        { v: timeLeft.seconds, l: "s" },
      ].map(({ v, l }, i) => (
        <div key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-gray-600">:</span>}
          <div className="flex flex-col items-center">
            <span className="text-white font-bold text-sm w-7 text-center
                             bg-white/10 rounded px-1 py-0.5">
              {String(v ?? 0).padStart(2, "0")}
            </span>
            <span className="text-gray-600 text-xs mt-0.5">{l}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Alert Card ─────────────────────────────────────────────────
function AlertCard({ sub, index }) {
  const days  = getDaysLeft(sub.renewalDate);
  const level = getAlertLevel(days);
  const style = ALERT_STYLES[level];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.06 * index }}
      whileHover={{ y: -3, scale: 1.01 }}
      className={`relative p-5 rounded-2xl border ${style.border} ${style.bg}
                  backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.3)]`}
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <BrandIcon sub={sub} />
          <div>
            <h3 className="text-white font-bold text-base">{sub.name}</h3>
            <p className="text-gray-400 text-xs">{sub.category}</p>
          </div>
        </div>
        {/* Status badge */}
        <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full
                         ${style.bg} border ${style.border}`}>
          <div className={`w-2 h-2 rounded-full ${style.dot} animate-pulse`} />
          <span className={`text-xs font-bold ${style.color}`}>
            {style.emoji} {style.label}
          </span>
        </div>
      </div>

      {/* Info row */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white/5 rounded-xl p-3">
          <p className="text-gray-500 text-xs mb-1">Monthly Cost</p>
          <p className="text-white font-bold text-lg">₹{sub.cost}</p>
        </div>
        <div className="bg-white/5 rounded-xl p-3">
          <p className="text-gray-500 text-xs mb-1">Renewal Date</p>
          <p className="text-white font-semibold text-sm">{sub.renewalDate}</p>
        </div>
      </div>

      {/* Countdown */}
      <div className="flex items-center justify-between bg-white/5 rounded-xl p-3">
        <div className="flex items-center gap-2">
          <FiClock className={`${style.color} text-sm`} />
          <span className="text-gray-400 text-xs">Time remaining</span>
        </div>
        <CountdownTimer renewalDate={sub.renewalDate} />
      </div>

      {/* Progress bar */}
      {days > 0 && (
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>0 days</span>
            <span className={`font-semibold ${style.color}`}>{days} days left</span>
            <span>30 days</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((days / 30) * 100, 100)}%` }}
              transition={{ duration: 0.8, delay: 0.1 * index }}
              className="h-full rounded-full"
              style={{ background: style.barColor }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ── Summary Banner ─────────────────────────────────────────────
function SummaryBanner({ subs }) {
  const counts = {
    critical: subs.filter(s => getAlertLevel(getDaysLeft(s.renewalDate)) === "critical").length,
    warning:  subs.filter(s => getAlertLevel(getDaysLeft(s.renewalDate)) === "warning").length,
    upcoming: subs.filter(s => getAlertLevel(getDaysLeft(s.renewalDate)) === "upcoming").length,
    safe:     subs.filter(s => getAlertLevel(getDaysLeft(s.renewalDate)) === "safe").length,
  };

  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {[
        { label: "Critical", value: counts.critical, color: "text-red-400",    bg: "bg-red-500/10",    border: "border-red-500/20",    emoji: "🔴" },
        { label: "Warning",  value: counts.warning,  color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20", emoji: "🟠" },
        { label: "Upcoming", value: counts.upcoming, color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20", emoji: "🟡" },
        { label: "Safe",     value: counts.safe,     color: "text-green-400",  bg: "bg-green-500/10",  border: "border-green-500/20",  emoji: "🟢" },
      ].map((item, i) => (
        <motion.div key={item.label}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * i }}
          className={`p-4 rounded-2xl ${item.bg} border ${item.border} backdrop-blur-xl text-center`}>
          <p className="text-2xl mb-1">{item.emoji}</p>
          <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
          <p className="text-gray-400 text-xs mt-1">{item.label}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ── Main Alerts Page ───────────────────────────────────────────
export default function AlertsPage() {
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();

  const tabs = [
    { id: "all",      label: "All",        emoji: "📋" },
    { id: "critical", label: "Critical",   emoji: "🔴" },
    { id: "warning",  label: "This Week",  emoji: "🟠" },
    { id: "upcoming", label: "This Month", emoji: "🟡" },
    { id: "safe",     label: "Safe",       emoji: "🟢" },
  ];

  const filtered = DEMO_SUBSCRIPTIONS
    .filter(s => activeTab === "all" || getAlertLevel(getDaysLeft(s.renewalDate)) === activeTab)
    .sort((a, b) => getDaysLeft(a.renewalDate) - getDaysLeft(b.renewalDate));

  const urgentCount = DEMO_SUBSCRIPTIONS.filter(
    s => getDaysLeft(s.renewalDate) <= 7 && getDaysLeft(s.renewalDate) > 0
  ).length;

  const urgentCost = DEMO_SUBSCRIPTIONS
    .filter(s => getDaysLeft(s.renewalDate) <= 7 && getDaysLeft(s.renewalDate) > 0)
    .reduce((sum, s) => sum + s.cost, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FiBell className="text-gray-700" /> Renewal Alerts
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Stay ahead of your subscription renewals
          </p>
        </div>
        {urgentCount > 0 && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl
                       bg-red-500/10 border border-red-500/20">
            <FiAlertCircle className="text-red-400" />
            <div>
              <p className="text-red-400 text-xs font-bold">{urgentCount} due this week</p>
              <p className="text-red-300 text-xs">₹{urgentCost} at risk</p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Summary cards */}
      <SummaryBanner subs={DEMO_SUBSCRIPTIONS} />

      {/* Tabs */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {tabs.map(tab => {
          const count = tab.id === "all"
            ? DEMO_SUBSCRIPTIONS.length
            : DEMO_SUBSCRIPTIONS.filter(s =>
                getAlertLevel(getDaysLeft(s.renewalDate)) === tab.id).length;
          return (
            <motion.button key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm
                          font-semibold whitespace-nowrap transition duration-200
                          ${activeTab === tab.id
                            ? "bg-black text-white shadow-[0_8px_20px_rgba(0,0,0,0.2)]"
                            : "bg-white text-gray-500 border border-gray-200 hover:border-gray-300"
                          }`}>
              {tab.emoji} {tab.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold
                                ${activeTab === tab.id
                                  ? "bg-white/20 text-white"
                                  : "bg-gray-100 text-gray-500"}`}>
                {count}
              </span>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Cards */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-gray-700 font-semibold text-lg mb-2">All clear!</h3>
            <p className="text-gray-400 text-sm">No subscriptions in this category.</p>
          </motion.div>
        ) : (
          <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((sub, i) => (
              <AlertCard key={sub.id} sub={sub} index={i} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom tip */}
      {urgentCount > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-black/80 to-black/70
                     border border-white/10 flex items-center gap-3">
          <div className="text-2xl">💡</div>
          <div>
            <p className="text-white text-sm font-semibold">
              Pro tip: Review subscriptions before renewal
            </p>
            <p className="text-gray-400 text-xs mt-0.5">
              Cancel what you don't use before the renewal date to avoid unwanted charges.{" "}
              <button onClick={() => navigate("/subscriptions")}
                className="text-indigo-400 hover:text-indigo-300 font-semibold transition">
                Manage subscriptions →
              </button>
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}