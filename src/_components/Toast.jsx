'use client';

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideToast } from "@/redux/slices/toastSlice";
import { useAppSelector } from "@/redux/store";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertCircle, Info, X } from "lucide-react";

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const styles = {
  success: "from-emerald-500/90 to-teal-600/90 border-emerald-400/30 shadow-emerald-500/20",
  error: "from-rose-500/90 to-red-600/90 border-rose-400/30 shadow-rose-500/20",
  warning: "from-amber-500/90 to-orange-600/90 border-amber-400/30 shadow-amber-500/20",
  info: "from-sky-500/90 to-blue-600/90 border-sky-400/30 shadow-sky-500/20",
};

export default function Toast() {
  const { message, type, visible } = useAppSelector((state) => state.toast);
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);
  const [progress, setProgress] = useState(100);

  const Icon = icons[type] || icons.info;
  const gradientClass = styles[type] || styles.info;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!visible) {
      setProgress(100);
      return;
    }

    setProgress(100);
    const duration = 3000;
    const interval = 30;
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          dispatch(hideToast());
          return 0;
        }
        return prev - step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [visible, dispatch]);

  const handleClose = () => {
    dispatch(hideToast());
  };

  const variants = isMobile
    ? { initial: { y: 100, opacity: 0, scale: 0.9 }, animate: { y: 0, opacity: 1, scale: 1 }, exit: { y: 100, opacity: 0, scale: 0.9 } }
    : { initial: { x: 100, opacity: 0, scale: 0.9 }, animate: { x: 0, opacity: 1, scale: 1 }, exit: { x: 100, opacity: 0, scale: 0.9 } };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={`fixed ${isMobile ? '-translate-x-1/2 left-1/2 bottom-6' : 'left-6 top-16 right-auto'} z-50`}
        >
          <div className={`
            relative overflow-hidden rounded-2xl border backdrop-blur-xl
            bg-gradient-to-br ${gradientClass}
            shadow-2xl shadow-black/10
            min-w-[320px] max-w-md
          `}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
            
            <div className="relative flex items-start gap-4 p-4">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm"
              >
                <Icon className="w-5 h-5 text-white" strokeWidth={2.5} />
              </motion.div>

              <div className="flex-1 min-w-0 pt-0.5">
                <p className="text-white font-medium text-sm leading-relaxed break-words">
                  {typeof message === "string" ? message : message?.text || JSON.stringify(message)}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="flex-shrink-0 w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-white/80" />
              </motion.button>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10">
              <motion.div
                className="h-full bg-white/50"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}