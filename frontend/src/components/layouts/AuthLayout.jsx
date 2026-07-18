import { Outlet, Link } from "react-router-dom";
import { BrandMark } from "@/components/layouts/AppLayout";
import { motion } from "framer-motion";

export function AuthLayout() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between p-10 gradient-brand text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_60%,white,transparent_50%)]" />
        <Link to="/" className="relative">
          <BrandMark />
        </Link>
        <div className="relative">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-display font-bold leading-tight"
          >
            One campus.
            <br />
            One network.
            <br />
            Every opportunity.
          </motion.h2>
          <p className="mt-4 text-white/80 max-w-md">
            Join 10,000+ students, alumni, and faculty already building their futures together.
          </p>
        </div>
        <div className="relative text-sm text-white/70">© Campus Connect 2026</div>
      </div>
      <div className="flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
