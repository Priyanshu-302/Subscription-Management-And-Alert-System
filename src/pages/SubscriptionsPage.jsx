// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FiPlus, FiSearch, FiEdit2, FiTrash2, FiX,
//   FiAlertCircle, FiFilter, FiGrid, FiList,
//   FiCalendar, FiDollarSign, FiTag
// } from "react-icons/fi";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { motion as m } from "framer-motion";
// import toast from "react-hot-toast";

// // ── Validation ─────────────────────────────────────────────────
// const schema = yup.object({
//   name:        yup.string().required("Service name is required"),
//   cost:        yup.number().positive("Must be positive").required("Cost is required"),
//   renewalDate: yup.string().required("Renewal date is required"),
//   category:    yup.string().required("Category is required"),
//   notes:       yup.string(),
// });

// // ── Constants ──────────────────────────────────────────────────
// const CATEGORIES = [
//   { value: "Entertainment", icon: "🎬" },
//   { value: "Health",        icon: "💪" },
//   { value: "Tech",          icon: "💻" },
//   { value: "Shopping",      icon: "🛒" },
//   { value: "Education",     icon: "📚" },
//   { value: "Utility",       icon: "⚡" },
//   { value: "Finance",       icon: "💰" },
//   { value: "Other",         icon: "📦" },
// ];

// const CATEGORY_ICONS = Object.fromEntries(CATEGORIES.map(c => [c.value, c.icon]));

// const INITIAL_SUBS = [
//   { id: 1, name: "Netflix",      cost: 499,  category: "Entertainment", renewalDate: "2026-03-14", notes: "Family plan",    icon: "🎬" },
//   { id: 2, name: "Spotify",      cost: 119,  category: "Entertainment", renewalDate: "2026-03-17", notes: "",               icon: "🎵" },
//   { id: 3, name: "Gym",          cost: 1200, category: "Health",        renewalDate: "2026-03-20", notes: "Morning batch",  icon: "💪" },
//   { id: 4, name: "Amazon Prime", cost: 299,  category: "Shopping",      renewalDate: "2026-04-05", notes: "",               icon: "📦" },
//   { id: 5, name: "Hotstar",      cost: 899,  category: "Entertainment", renewalDate: "2026-04-10", notes: "Annual plan",    icon: "📺" },
//   { id: 6, name: "GitHub",       cost: 399,  category: "Tech",          renewalDate: "2026-04-15", notes: "Pro plan",       icon: "💻" },
// ];

// // ── Helpers ────────────────────────────────────────────────────
// const getDaysLeft = (dateStr) => {
//   const today = new Date();
//   const renewal = new Date(dateStr);
//   return Math.ceil((renewal - today) / (1000 * 60 * 60 * 24));
// };

// const getAlertStyle = (days) => {
//   if (days <= 0)  return { color: "text-gray-400",   bg: "bg-gray-500/10",   border: "border-gray-500/20",  dot: "bg-gray-400" };
//   if (days <= 3)  return { color: "text-red-400",    bg: "bg-red-500/10",    border: "border-red-500/20",   dot: "bg-red-400" };
//   if (days <= 7)  return { color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20",dot: "bg-orange-400" };
//   if (days <= 14) return { color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20",dot: "bg-yellow-400" };
//   return               { color: "text-green-400",  bg: "bg-green-500/10",  border: "border-green-500/20", dot: "bg-green-400" };
// };

// // ── Input Field ────────────────────────────────────────────────
// function FormField({ label, icon: Icon, error, children }) {
//   return (
//     <div>
//       <label className="block text-xs font-semibold text-gray-400
//                         uppercase tracking-widest mb-2">{label}</label>
//       <div className="relative">
//         {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2
//                                   text-gray-500 text-base pointer-events-none" />}
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

// // ── Add/Edit Modal ─────────────────────────────────────────────
// function SubModal({ isOpen, onClose, onSave, editData }) {
//   const isEdit = !!editData;
//   const { register, handleSubmit, reset, formState: { errors } } = useForm({
//     resolver: yupResolver(schema),
//     defaultValues: editData || {},
//   });

//   const onSubmit = (data) => {
//     onSave({ ...data, id: editData?.id || Date.now(), icon: CATEGORY_ICONS[data.category] || "📦" });
//     reset();
//     onClose();
//   };

//   const inputClass = (hasError) =>
//     `w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-white/5 border text-white
//      placeholder-gray-600 outline-none transition duration-200
//      focus:bg-white/10 focus:border-white/40
//      ${hasError ? "border-red-500/60" : "border-white/10"}`;

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           {/* Backdrop */}
//           <motion.div
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//             onClick={onClose}
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
//           />

//           {/* Modal */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.9, y: 20 }}
//             transition={{ type: "spring", stiffness: 300, damping: 25 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4"
//           >
//             <div className="relative w-full max-w-md p-7 rounded-2xl
//                             bg-gradient-to-br from-black/95 via-black/90 to-black/95
//                             border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.7)]
//                             text-white">
//               {/* Shimmer */}
//               <div className="absolute inset-0 rounded-2xl bg-gradient-to-br
//                               from-white/5 to-transparent pointer-events-none" />

//               <div className="relative z-10">
//                 {/* Header */}
//                 <div className="flex items-center justify-between mb-6">
//                   <h2 className="text-xl font-bold">
//                     {isEdit ? "✏️ Edit Subscription" : "➕ Add Subscription"}
//                   </h2>
//                   <button onClick={onClose}
//                     className="p-2 rounded-lg hover:bg-white/10 transition text-gray-400
//                                hover:text-white">
//                     <FiX />
//                   </button>
//                 </div>

//                 <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">

//                   {/* Service Name */}
//                   <FormField label="Service Name" icon={FiTag} error={errors.name}>
//                     <input type="text" placeholder="Netflix, Gym, Spotify..."
//                       {...register("name")} className={inputClass(errors.name)} />
//                   </FormField>

//                   {/* Cost */}
//                   <FormField label="Monthly Cost (₹)" icon={FiDollarSign} error={errors.cost}>
//                     <input type="number" placeholder="499"
//                       {...register("cost")} className={inputClass(errors.cost)} />
//                   </FormField>

//                   {/* Renewal Date */}
//                   <FormField label="Renewal Date" icon={FiCalendar} error={errors.renewalDate}>
//                     <input type="date"
//                       {...register("renewalDate")}
//                       className={`${inputClass(errors.renewalDate)} text-gray-300`}
//                       style={{ colorScheme: "dark" }}
//                     />
//                   </FormField>

//                   {/* Category */}
//                   <FormField label="Category" error={errors.category}>
//                     <select {...register("category")}
//                       className={`w-full px-4 py-3 rounded-xl text-sm bg-white/5 border
//                                   text-white outline-none transition duration-200
//                                   focus:bg-white/10 focus:border-white/40
//                                   ${errors.category ? "border-red-500/60" : "border-white/10"}`}
//                       style={{ colorScheme: "dark" }}
//                     >
//                       <option value="" className="bg-gray-900">Select category</option>
//                       {CATEGORIES.map(c => (
//                         <option key={c.value} value={c.value} className="bg-gray-900">
//                           {c.icon} {c.value}
//                         </option>
//                       ))}
//                     </select>
//                   </FormField>

//                   {/* Notes */}
//                   <FormField label="Notes (optional)">
//                     <textarea placeholder="Family plan, annual subscription..."
//                       {...register("notes")}
//                       rows={2}
//                       className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border
//                                  border-white/10 text-white placeholder-gray-600
//                                  outline-none transition duration-200 resize-none
//                                  focus:bg-white/10 focus:border-white/40"
//                     />
//                   </FormField>

//                   {/* Buttons */}
//                   <div className="flex gap-3 pt-2">
//                     <button type="button" onClick={onClose}
//                       className="flex-1 py-3 rounded-xl text-sm font-semibold
//                                  bg-white/5 border border-white/10 text-gray-400
//                                  hover:bg-white/10 hover:text-white transition">
//                       Cancel
//                     </button>
//                     <motion.button type="submit"
//                       whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
//                       className="flex-1 py-3 rounded-xl text-sm font-bold
//                                  bg-gradient-to-r from-white via-gray-100 to-white
//                                  text-black shadow-[0_10px_30px_rgba(255,255,255,0.1)]
//                                  hover:shadow-[0_15px_40px_rgba(255,255,255,0.2)]
//                                  transition duration-200">
//                       {isEdit ? "Save Changes" : "Add Subscription"}
//                     </motion.button>
//                   </div>

//                 </form>
//               </div>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }

// // ── Delete Confirm Modal ───────────────────────────────────────
// function DeleteModal({ isOpen, onClose, onConfirm, subName }) {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//             onClick={onClose}
//             className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
//           />
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4"
//           >
//             <div className="w-full max-w-sm p-7 rounded-2xl
//                             bg-gradient-to-br from-black/95 to-black/90
//                             border border-red-500/20 shadow-[0_40px_100px_rgba(0,0,0,0.7)]
//                             text-white text-center">
//               <div className="text-5xl mb-4">🗑️</div>
//               <h2 className="text-xl font-bold mb-2">Delete Subscription?</h2>
//               <p className="text-gray-400 text-sm mb-6">
//                 Are you sure you want to delete <span className="text-white font-semibold">{subName}</span>?
//                 This cannot be undone.
//               </p>
//               <div className="flex gap-3">
//                 <button onClick={onClose}
//                   className="flex-1 py-3 rounded-xl text-sm font-semibold
//                              bg-white/5 border border-white/10 text-gray-400
//                              hover:bg-white/10 hover:text-white transition">
//                   Cancel
//                 </button>
//                 <motion.button onClick={onConfirm}
//                   whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
//                   className="flex-1 py-3 rounded-xl text-sm font-bold
//                              bg-red-500 text-white hover:bg-red-600 transition">
//                   Yes, Delete
//                 </motion.button>
//               </div>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }

// // ── Subscription Card (Grid View) ─────────────────────────────
// function SubCard({ sub, onEdit, onDelete, index }) {
//   const days  = getDaysLeft(sub.renewalDate);
//   const style = getAlertStyle(days);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: 0.05 * index }}
//       whileHover={{ y: -4, scale: 1.02 }}
//       className="relative p-5 rounded-2xl
//                  bg-gradient-to-br from-black/80 to-black/70
//                  border border-white/10 backdrop-blur-xl
//                  shadow-[0_15px_50px_rgba(0,0,0,0.4)] text-white
//                  flex flex-col gap-3"
//     >
//       {/* Top row */}
//       <div className="flex items-start justify-between">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center
//                           justify-center text-xl">
//             {sub.icon}
//           </div>
//           <div>
//             <h3 className="font-semibold text-sm">{sub.name}</h3>
//             <p className="text-gray-400 text-xs">{sub.category}</p>
//           </div>
//         </div>
//         {/* Action buttons */}
//         <div className="flex gap-1">
//           <button onClick={() => onEdit(sub)}
//             className="p-1.5 rounded-lg hover:bg-white/10 transition text-gray-400
//                        hover:text-white">
//             <FiEdit2 className="text-sm" />
//           </button>
//           <button onClick={() => onDelete(sub)}
//             className="p-1.5 rounded-lg hover:bg-red-500/20 transition text-gray-400
//                        hover:text-red-400">
//             <FiTrash2 className="text-sm" />
//           </button>
//         </div>
//       </div>

//       {/* Cost */}
//       <div className="flex items-center justify-between">
//         <span className="text-gray-400 text-xs">Monthly</span>
//         <span className="text-white font-bold text-lg">₹{sub.cost}</span>
//       </div>

//       {/* Renewal */}
//       <div className={`flex items-center justify-between px-3 py-2 rounded-xl
//                        ${style.bg} border ${style.border}`}>
//         <div className="flex items-center gap-2">
//           <div className={`w-2 h-2 rounded-full ${style.dot}`} />
//           <span className="text-gray-300 text-xs">{sub.renewalDate}</span>
//         </div>
//         <span className={`text-xs font-bold ${style.color}`}>
//           {days <= 0 ? "Expired" : `${days}d left`}
//         </span>
//       </div>

//       {/* Notes */}
//       {sub.notes && (
//         <p className="text-gray-500 text-xs italic">📝 {sub.notes}</p>
//       )}
//     </motion.div>
//   );
// }

// // ── Subscription Row (List View) ──────────────────────────────
// function SubRow({ sub, onEdit, onDelete, index }) {
//   const days  = getDaysLeft(sub.renewalDate);
//   const style = getAlertStyle(days);

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: -20 }}
//       animate={{ opacity: 1, x: 0 }}
//       transition={{ delay: 0.05 * index }}
//       className="flex items-center gap-4 p-4 rounded-xl
//                  bg-gradient-to-r from-black/70 to-black/60
//                  border border-white/10 hover:border-white/20
//                  transition duration-200 text-white"
//     >
//       <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center
//                       justify-center text-xl flex-shrink-0">
//         {sub.icon}
//       </div>
//       <div className="flex-1 min-w-0">
//         <p className="font-semibold text-sm">{sub.name}</p>
//         <p className="text-gray-400 text-xs">{sub.category}</p>
//       </div>
//       <div className="text-right hidden sm:block">
//         <p className="text-white font-bold">₹{sub.cost}</p>
//         <p className="text-gray-500 text-xs">per month</p>
//       </div>
//       <div className={`px-3 py-1.5 rounded-lg ${style.bg} border ${style.border}
//                        hidden md:flex items-center gap-2`}>
//         <div className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
//         <span className={`text-xs font-semibold ${style.color}`}>
//           {days <= 0 ? "Expired" : `${days}d`}
//         </span>
//       </div>
//       <div className="flex gap-1 flex-shrink-0">
//         <button onClick={() => onEdit(sub)}
//           className="p-2 rounded-lg hover:bg-white/10 transition text-gray-400
//                      hover:text-white">
//           <FiEdit2 />
//         </button>
//         <button onClick={() => onDelete(sub)}
//           className="p-2 rounded-lg hover:bg-red-500/20 transition text-gray-400
//                      hover:text-red-400">
//           <FiTrash2 />
//         </button>
//       </div>
//     </motion.div>
//   );
// }

// // ── Main Subscriptions Page ────────────────────────────────────
// export default function SubscriptionsPage() {
//   const [subs, setSubs]           = useState(INITIAL_SUBS);
//   const [search, setSearch]       = useState("");
//   const [filterCat, setFilterCat] = useState("All");
//   const [sortBy, setSortBy]       = useState("name");
//   const [viewMode, setViewMode]   = useState("grid");
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editData, setEditData]   = useState(null);
//   const [deleteModal, setDeleteModal] = useState({ open: false, sub: null });

//   // ── Handlers ────────────────────────────────────────────────
//   const handleAdd = () => { setEditData(null); setModalOpen(true); };

//   const handleEdit = (sub) => { setEditData(sub); setModalOpen(true); };

//   const handleSave = (data) => {
//     if (editData) {
//       setSubs(prev => prev.map(s => s.id === data.id ? data : s));
//       toast.success(`${data.name} updated! ✅`);
//     } else {
//       setSubs(prev => [...prev, data]);
//       toast.success(`${data.name} added! 🎉`);
//     }
//   };

//   const handleDeleteConfirm = () => {
//     setSubs(prev => prev.filter(s => s.id !== deleteModal.sub.id));
//     toast.success(`${deleteModal.sub.name} deleted`);
//     setDeleteModal({ open: false, sub: null });
//   };

//   // ── Filter + Sort ────────────────────────────────────────────
//   const allCategories = ["All", ...new Set(subs.map(s => s.category))];

//   const filtered = subs
//     .filter(s =>
//       (filterCat === "All" || s.category === filterCat) &&
//       s.name.toLowerCase().includes(search.toLowerCase())
//     )
//     .sort((a, b) => {
//       if (sortBy === "name")    return a.name.localeCompare(b.name);
//       if (sortBy === "cost")    return b.cost - a.cost;
//       if (sortBy === "renewal") return getDaysLeft(a.renewalDate) - getDaysLeft(b.renewalDate);
//       return 0;
//     });

//   const totalMonthly = subs.reduce((s, x) => s + x.cost, 0);

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">

//       {/* ── Header ── */}
//       <motion.div
//         initial={{ opacity: 0, y: -10 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="flex items-center justify-between mb-6"
//       >
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">My Subscriptions</h1>
//           <p className="text-gray-500 text-sm mt-0.5">
//             {subs.length} active · <span className="font-semibold text-gray-700">₹{totalMonthly.toLocaleString()}/month</span>
//           </p>
//         </div>
//         <motion.button
//           onClick={handleAdd}
//           whileHover={{ y: -2, scale: 1.02 }}
//           whileTap={{ scale: 0.97 }}
//           className="flex items-center gap-2 px-5 py-2.5 rounded-xl
//                      bg-black text-white text-sm font-semibold
//                      shadow-[0_10px_30px_rgba(0,0,0,0.2)]
//                      hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)]
//                      transition duration-200"
//         >
//           <FiPlus /> Add Subscription
//         </motion.button>
//       </motion.div>

//       {/* ── Filters Bar ── */}
//       <motion.div
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.1 }}
//         className="flex flex-wrap items-center gap-3 mb-6"
//       >
//         {/* Search */}
//         <div className="relative flex-1 min-w-48">
//           <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2
//                                text-gray-400 pointer-events-none" />
//           <input
//             type="text"
//             placeholder="Search subscriptions..."
//             value={search}
//             onChange={e => setSearch(e.target.value)}
//             className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200
//                        bg-white text-sm outline-none focus:border-gray-400
//                        focus:ring-2 focus:ring-black/5 transition"
//           />
//         </div>

//         {/* Category Filter */}
//         <select
//           value={filterCat}
//           onChange={e => setFilterCat(e.target.value)}
//           className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white
//                      text-sm outline-none focus:border-gray-400 transition cursor-pointer"
//         >
//           {allCategories.map(c => <option key={c}>{c}</option>)}
//         </select>

//         {/* Sort */}
//         <select
//           value={sortBy}
//           onChange={e => setSortBy(e.target.value)}
//           className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white
//                      text-sm outline-none focus:border-gray-400 transition cursor-pointer"
//         >
//           <option value="name">Sort: Name</option>
//           <option value="cost">Sort: Cost</option>
//           <option value="renewal">Sort: Renewal</option>
//         </select>

//         {/* View Toggle */}
//         <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden">
//           <button
//             onClick={() => setViewMode("grid")}
//             className={`p-2.5 transition ${viewMode === "grid"
//               ? "bg-black text-white"
//               : "text-gray-400 hover:text-gray-700"}`}
//           >
//             <FiGrid />
//           </button>
//           <button
//             onClick={() => setViewMode("list")}
//             className={`p-2.5 transition ${viewMode === "list"
//               ? "bg-black text-white"
//               : "text-gray-400 hover:text-gray-700"}`}
//           >
//             <FiList />
//           </button>
//         </div>
//       </motion.div>

//       {/* ── Content ── */}
//       <AnimatePresence mode="wait">
//         {filtered.length === 0 ? (
//           /* Empty State */
//           <motion.div
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }}
//             className="flex flex-col items-center justify-center py-24 text-center"
//           >
//             <div className="text-6xl mb-4">📭</div>
//             <h3 className="text-gray-700 font-semibold text-lg mb-2">
//               {search ? "No results found" : "No subscriptions yet"}
//             </h3>
//             <p className="text-gray-400 text-sm mb-6">
//               {search ? "Try a different search term" : "Add your first subscription to get started"}
//             </p>
//             {!search && (
//               <button onClick={handleAdd}
//                 className="flex items-center gap-2 px-5 py-2.5 rounded-xl
//                            bg-black text-white text-sm font-semibold transition
//                            hover:bg-gray-800">
//                 <FiPlus /> Add Subscription
//               </button>
//             )}
//           </motion.div>
//         ) : viewMode === "grid" ? (
//           /* Grid View */
//           <motion.div
//             key="grid"
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }}
//             className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
//           >
//             {filtered.map((sub, i) => (
//               <SubCard key={sub.id} sub={sub} index={i}
//                 onEdit={handleEdit}
//                 onDelete={(s) => setDeleteModal({ open: true, sub: s })}
//               />
//             ))}
//           </motion.div>
//         ) : (
//           /* List View */
//           <motion.div
//             key="list"
//             initial={{ opacity: 0 }} animate={{ opacity: 1 }}
//             className="space-y-3"
//           >
//             {filtered.map((sub, i) => (
//               <SubRow key={sub.id} sub={sub} index={i}
//                 onEdit={handleEdit}
//                 onDelete={(s) => setDeleteModal({ open: true, sub: s })}
//               />
//             ))}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ── Modals ── */}
//       <SubModal
//         isOpen={modalOpen}
//         onClose={() => { setModalOpen(false); setEditData(null); }}
//         onSave={handleSave}
//         editData={editData}
//       />
//       <DeleteModal
//         isOpen={deleteModal.open}
//         onClose={() => setDeleteModal({ open: false, sub: null })}
//         onConfirm={handleDeleteConfirm}
//         subName={deleteModal.sub?.name}
//       />

//     </div>
//   );
// }

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus, FiSearch, FiEdit2, FiTrash2, FiX,
  FiAlertCircle, FiGrid, FiList,
  FiCalendar, FiDollarSign, FiTag
} from "react-icons/fi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";

// ── Validation ─────────────────────────────────────────────────
const schema = yup.object({
  name:        yup.string().required("Service name is required"),
  cost:        yup.number().positive("Must be positive").required("Cost is required"),
  renewalDate: yup.string().required("Renewal date is required"),
  category:    yup.string().required("Category is required"),
  notes:       yup.string(),
});

// ── Brand Logos (Wikipedia SVG/PNG) ───────────────────────────
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

// ── Categories ─────────────────────────────────────────────────
const CATEGORIES = [
  { value: "Entertainment", icon: "🎬" },
  { value: "Health",        icon: "💪" },
  { value: "Tech",          icon: "💻" },
  { value: "Shopping",      icon: "🛒" },
  { value: "Education",     icon: "📚" },
  { value: "Utility",       icon: "⚡" },
  { value: "Finance",       icon: "💰" },
  { value: "Other",         icon: "📦" },
];

const CATEGORY_ICONS = Object.fromEntries(CATEGORIES.map(c => [c.value, c.icon]));

// ── Initial Subscriptions with logos ──────────────────────────
const INITIAL_SUBS = [
  { id: 1, name: "Netflix",      cost: 499,  category: "Entertainment", renewalDate: "2026-03-14", notes: "Family plan",   logo: getLogoForName("netflix") },
  { id: 2, name: "Spotify",      cost: 119,  category: "Entertainment", renewalDate: "2026-03-17", notes: "",              logo: getLogoForName("spotify") },
  { id: 3, name: "Gym",          cost: 1200, category: "Health",        renewalDate: "2026-03-20", notes: "Morning batch", logo: null, icon: "💪" },
  { id: 4, name: "Amazon Prime", cost: 299,  category: "Shopping",      renewalDate: "2026-04-05", notes: "",              logo: getLogoForName("amazon prime") },
  { id: 5, name: "Hotstar",      cost: 899,  category: "Entertainment", renewalDate: "2026-04-10", notes: "Annual plan",   logo: getLogoForName("hotstar") },
  { id: 6, name: "GitHub",       cost: 399,  category: "Tech",          renewalDate: "2026-04-15", notes: "Pro plan",      logo: getLogoForName("github") },
];

// ── Helpers ────────────────────────────────────────────────────
const getDaysLeft = (dateStr) => {
  const today = new Date();
  const renewal = new Date(dateStr);
  return Math.ceil((renewal - today) / (1000 * 60 * 60 * 24));
};

const getAlertStyle = (days) => {
  if (days <= 0)  return { color: "text-gray-400",   bg: "bg-gray-500/10",   border: "border-gray-500/20",  dot: "bg-gray-400" };
  if (days <= 3)  return { color: "text-red-400",    bg: "bg-red-500/10",    border: "border-red-500/20",   dot: "bg-red-400" };
  if (days <= 7)  return { color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20",dot: "bg-orange-400" };
  if (days <= 14) return { color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20",dot: "bg-yellow-400" };
  return               { color: "text-green-400",  bg: "bg-green-500/10",  border: "border-green-500/20", dot: "bg-green-400" };
};

// ── Brand Icon Component ───────────────────────────────────────
function BrandIcon({ sub }) {
  const [imgError, setImgError] = useState(false);
  return (
    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center
                    overflow-hidden flex-shrink-0 p-1.5 shadow-sm border border-gray-100">
      {sub.logo && !imgError ? (
        <img src={sub.logo} alt={sub.name}
          className="w-full h-full object-contain"
          onError={() => setImgError(true)} />
      ) : (
        <span className="text-xl">{sub.icon || CATEGORY_ICONS[sub.category] || "📦"}</span>
      )}
    </div>
  );
}

// ── Form Field ─────────────────────────────────────────────────
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
          <FiAlertCircle /> {error.message}
        </p>
      )}
    </div>
  );
}

// ── Add / Edit Modal ───────────────────────────────────────────
function SubModal({ isOpen, onClose, onSave, editData }) {
  const isEdit = !!editData;
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: editData || {},
  });

  const watchedName = watch("name", "");
  const previewLogo = getLogoForName(watchedName);

  const onSubmit = (data) => {
    const logo = getLogoForName(data.name);
    onSave({ ...data, id: editData?.id || Date.now(), icon: CATEGORY_ICONS[data.category] || "📦", logo });
    reset();
    onClose();
  };

  const inputClass = (hasError) =>
    `w-full pl-10 pr-4 py-3 rounded-xl text-sm bg-white/5 border text-white
     placeholder-gray-600 outline-none transition duration-200
     focus:bg-white/10 focus:border-white/40
     ${hasError ? "border-red-500/60" : "border-white/10"}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-md p-7 rounded-2xl
                            bg-gradient-to-br from-black/95 via-black/90 to-black/95
                            border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.7)] text-white">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br
                              from-white/5 to-transparent pointer-events-none" />
              <div className="relative z-10">

                {/* Header with live logo preview */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white flex items-center
                                    justify-center overflow-hidden p-1.5 shadow">
                      {previewLogo
                        ? <img src={previewLogo} alt="" className="w-full h-full object-contain" />
                        : <span className="text-lg">📦</span>
                      }
                    </div>
                    <h2 className="text-xl font-bold">
                      {isEdit ? "Edit Subscription" : "Add Subscription"}
                    </h2>
                  </div>
                  <button onClick={onClose}
                    className="p-2 rounded-lg hover:bg-white/10 transition text-gray-400 hover:text-white">
                    <FiX />
                  </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
                  <FormField label="Service Name" icon={FiTag} error={errors.name}>
                    <input type="text" placeholder="Netflix, Gym, Spotify..."
                      {...register("name")} className={inputClass(errors.name)} />
                  </FormField>

                  <FormField label="Monthly Cost (₹)" icon={FiDollarSign} error={errors.cost}>
                    <input type="number" placeholder="499"
                      {...register("cost")} className={inputClass(errors.cost)} />
                  </FormField>

                  <FormField label="Renewal Date" icon={FiCalendar} error={errors.renewalDate}>
                    <input type="date" {...register("renewalDate")}
                      className={`${inputClass(errors.renewalDate)} text-gray-300`}
                      style={{ colorScheme: "dark" }} />
                  </FormField>

                  <FormField label="Category" error={errors.category}>
                    <select {...register("category")}
                      className={`w-full px-4 py-3 rounded-xl text-sm bg-white/5 border
                                  text-white outline-none transition duration-200
                                  focus:bg-white/10 focus:border-white/40
                                  ${errors.category ? "border-red-500/60" : "border-white/10"}`}
                      style={{ colorScheme: "dark" }}>
                      <option value="" className="bg-gray-900">Select category</option>
                      {CATEGORIES.map(c => (
                        <option key={c.value} value={c.value} className="bg-gray-900">
                          {c.icon} {c.value}
                        </option>
                      ))}
                    </select>
                  </FormField>

                  <FormField label="Notes (optional)">
                    <textarea placeholder="Family plan, annual subscription..."
                      {...register("notes")} rows={2}
                      className="w-full px-4 py-3 rounded-xl text-sm bg-white/5 border
                                 border-white/10 text-white placeholder-gray-600 outline-none
                                 transition duration-200 resize-none focus:bg-white/10
                                 focus:border-white/40" />
                  </FormField>

                  {/* Auto logo detected hint */}
                  <AnimatePresence>
                    {previewLogo && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-green-400 text-xs flex items-center gap-1.5">
                        ✅ Logo detected automatically for "{watchedName}"
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={onClose}
                      className="flex-1 py-3 rounded-xl text-sm font-semibold
                                 bg-white/5 border border-white/10 text-gray-400
                                 hover:bg-white/10 hover:text-white transition">
                      Cancel
                    </button>
                    <motion.button type="submit"
                      whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                      className="flex-1 py-3 rounded-xl text-sm font-bold
                                 bg-gradient-to-r from-white via-gray-100 to-white text-black
                                 shadow-[0_10px_30px_rgba(255,255,255,0.1)]
                                 hover:shadow-[0_15px_40px_rgba(255,255,255,0.2)] transition">
                      {isEdit ? "Save Changes" : "Add Subscription"}
                    </motion.button>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Delete Modal ───────────────────────────────────────────────
function DeleteModal({ isOpen, onClose, onConfirm, subName }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40" />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-sm p-7 rounded-2xl
                            bg-gradient-to-br from-black/95 to-black/90
                            border border-red-500/20 shadow-[0_40px_100px_rgba(0,0,0,0.7)]
                            text-white text-center">
              <div className="text-5xl mb-4">🗑️</div>
              <h2 className="text-xl font-bold mb-2">Delete Subscription?</h2>
              <p className="text-gray-400 text-sm mb-6">
                Are you sure you want to delete{" "}
                <span className="text-white font-semibold">{subName}</span>?
                This cannot be undone.
              </p>
              <div className="flex gap-3">
                <button onClick={onClose}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold
                             bg-white/5 border border-white/10 text-gray-400
                             hover:bg-white/10 hover:text-white transition">
                  Cancel
                </button>
                <motion.button onClick={onConfirm}
                  whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                  className="flex-1 py-3 rounded-xl text-sm font-bold
                             bg-red-500 text-white hover:bg-red-600 transition">
                  Yes, Delete
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Subscription Card (Grid) ───────────────────────────────────
function SubCard({ sub, onEdit, onDelete, index }) {
  const days  = getDaysLeft(sub.renewalDate);
  const style = getAlertStyle(days);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index }}
      whileHover={{ y: -4, scale: 1.02 }}
      className="relative p-5 rounded-2xl bg-gradient-to-br from-black/80 to-black/70
                 border border-white/10 backdrop-blur-xl
                 shadow-[0_15px_50px_rgba(0,0,0,0.4)] text-white flex flex-col gap-3"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <BrandIcon sub={sub} />
          <div>
            <h3 className="font-semibold text-sm">{sub.name}</h3>
            <p className="text-gray-400 text-xs">{sub.category}</p>
          </div>
        </div>
        <div className="flex gap-1">
          <button onClick={() => onEdit(sub)}
            className="p-1.5 rounded-lg hover:bg-white/10 transition text-gray-400 hover:text-white">
            <FiEdit2 className="text-sm" />
          </button>
          <button onClick={() => onDelete(sub)}
            className="p-1.5 rounded-lg hover:bg-red-500/20 transition text-gray-400 hover:text-red-400">
            <FiTrash2 className="text-sm" />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-gray-400 text-xs">Monthly</span>
        <span className="text-white font-bold text-lg">₹{sub.cost}</span>
      </div>

      <div className={`flex items-center justify-between px-3 py-2 rounded-xl
                       ${style.bg} border ${style.border}`}>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${style.dot}`} />
          <span className="text-gray-300 text-xs">{sub.renewalDate}</span>
        </div>
        <span className={`text-xs font-bold ${style.color}`}>
          {days <= 0 ? "Expired" : `${days}d left`}
        </span>
      </div>

      {sub.notes && <p className="text-gray-500 text-xs italic">📝 {sub.notes}</p>}
    </motion.div>
  );
}

// ── Subscription Row (List) ────────────────────────────────────
function SubRow({ sub, onEdit, onDelete, index }) {
  const days  = getDaysLeft(sub.renewalDate);
  const style = getAlertStyle(days);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.05 * index }}
      className="flex items-center gap-4 p-4 rounded-xl
                 bg-gradient-to-r from-black/70 to-black/60
                 border border-white/10 hover:border-white/20
                 transition duration-200 text-white"
    >
      <BrandIcon sub={sub} />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm">{sub.name}</p>
        <p className="text-gray-400 text-xs">{sub.category}</p>
      </div>
      <div className="text-right hidden sm:block">
        <p className="text-white font-bold">₹{sub.cost}</p>
        <p className="text-gray-500 text-xs">per month</p>
      </div>
      <div className={`px-3 py-1.5 rounded-lg ${style.bg} border ${style.border}
                       hidden md:flex items-center gap-2`}>
        <div className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
        <span className={`text-xs font-semibold ${style.color}`}>
          {days <= 0 ? "Expired" : `${days}d`}
        </span>
      </div>
      <div className="flex gap-1 flex-shrink-0">
        <button onClick={() => onEdit(sub)}
          className="p-2 rounded-lg hover:bg-white/10 transition text-gray-400 hover:text-white">
          <FiEdit2 />
        </button>
        <button onClick={() => onDelete(sub)}
          className="p-2 rounded-lg hover:bg-red-500/20 transition text-gray-400 hover:text-red-400">
          <FiTrash2 />
        </button>
      </div>
    </motion.div>
  );
}

// ── Main Page ──────────────────────────────────────────────────
export default function SubscriptionsPage() {
  const [subs, setSubs]       = useState(INITIAL_SUBS);
  const [search, setSearch]   = useState("");
  const [filterCat, setFilterCat] = useState("All");
  const [sortBy, setSortBy]   = useState("name");
  const [viewMode, setViewMode] = useState("grid");
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData]   = useState(null);
  const [deleteModal, setDeleteModal] = useState({ open: false, sub: null });

  const handleAdd  = () => { setEditData(null); setModalOpen(true); };
  const handleEdit = (sub) => { setEditData(sub); setModalOpen(true); };

  const handleSave = (data) => {
    if (editData) {
      setSubs(prev => prev.map(s => s.id === data.id ? data : s));
      toast.success(`${data.name} updated! ✅`);
    } else {
      setSubs(prev => [...prev, data]);
      toast.success(`${data.name} added! 🎉`);
    }
  };

  const handleDeleteConfirm = () => {
    setSubs(prev => prev.filter(s => s.id !== deleteModal.sub.id));
    toast.success(`${deleteModal.sub.name} deleted`);
    setDeleteModal({ open: false, sub: null });
  };

  const allCategories = ["All", ...new Set(subs.map(s => s.category))];
  const filtered = subs
    .filter(s =>
      (filterCat === "All" || s.category === filterCat) &&
      s.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "name")    return a.name.localeCompare(b.name);
      if (sortBy === "cost")    return b.cost - a.cost;
      if (sortBy === "renewal") return getDaysLeft(a.renewalDate) - getDaysLeft(b.renewalDate);
      return 0;
    });

  const totalMonthly = subs.reduce((s, x) => s + x.cost, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Subscriptions</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {subs.length} active ·{" "}
            <span className="font-semibold text-gray-700">₹{totalMonthly.toLocaleString()}/month</span>
          </p>
        </div>
        <motion.button onClick={handleAdd}
          whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.97 }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black text-white
                     text-sm font-semibold shadow-[0_10px_30px_rgba(0,0,0,0.2)]
                     hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] transition duration-200">
          <FiPlus /> Add Subscription
        </motion.button>
      </motion.div>

      {/* Filters */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }} className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-48">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input type="text" placeholder="Search subscriptions..."
            value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white
                       text-sm outline-none focus:border-gray-400 focus:ring-2
                       focus:ring-black/5 transition" />
        </div>
        <select value={filterCat} onChange={e => setFilterCat(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm
                     outline-none focus:border-gray-400 transition cursor-pointer">
          {allCategories.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm
                     outline-none focus:border-gray-400 transition cursor-pointer">
          <option value="name">Sort: Name</option>
          <option value="cost">Sort: Cost</option>
          <option value="renewal">Sort: Renewal</option>
        </select>
        <div className="flex bg-white border border-gray-200 rounded-xl overflow-hidden">
          <button onClick={() => setViewMode("grid")}
            className={`p-2.5 transition ${viewMode === "grid" ? "bg-black text-white" : "text-gray-400 hover:text-gray-700"}`}>
            <FiGrid />
          </button>
          <button onClick={() => setViewMode("list")}
            className={`p-2.5 transition ${viewMode === "list" ? "bg-black text-white" : "text-gray-400 hover:text-gray-700"}`}>
            <FiList />
          </button>
        </div>
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-gray-700 font-semibold text-lg mb-2">
              {search ? "No results found" : "No subscriptions yet"}
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              {search ? "Try a different search term" : "Add your first subscription to get started"}
            </p>
            {!search && (
              <button onClick={handleAdd}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black
                           text-white text-sm font-semibold transition hover:bg-gray-800">
                <FiPlus /> Add Subscription
              </button>
            )}
          </motion.div>
        ) : viewMode === "grid" ? (
          <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((sub, i) => (
              <SubCard key={sub.id} sub={sub} index={i}
                onEdit={handleEdit}
                onDelete={(s) => setDeleteModal({ open: true, sub: s })} />
            ))}
          </motion.div>
        ) : (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="space-y-3">
            {filtered.map((sub, i) => (
              <SubRow key={sub.id} sub={sub} index={i}
                onEdit={handleEdit}
                onDelete={(s) => setDeleteModal({ open: true, sub: s })} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <SubModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditData(null); }}
        onSave={handleSave}
        editData={editData}
      />
      <DeleteModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, sub: null })}
        onConfirm={handleDeleteConfirm}
        subName={deleteModal.sub?.name}
      />
    </div>
  );
}