"use client";

import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  {
    name: "Instagram",
    icon: "/social/instagram.svg",
    href: "#",
    hoverColor: "hover:bg-gradient-to-r from-purple-500 to-pink-500",
    defaultColor: "text-purple-500",
  },
  {
    name: "LinkedIn",
    icon: "/social/linkedin.svg",
    href: "#",
    hoverColor: "hover:bg-blue-600",
    defaultColor: "text-blue-500",
  },
  {
    name: "Twitter",
    icon: "/social/twitter.svg",
    href: "#",
    hoverColor: "hover:bg-blue-400",
    defaultColor: "text-blue-400",
  },
  {
    name: "YouTube",
    icon: "/social/youtube.svg",
    href: "#",
    hoverColor: "hover:bg-red-600",
    defaultColor: "text-red-500",
  },
];

export default function MediaSignup() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement email signup functionality
  };

  return (
    <section className="relative py-24 overflow-hidden bg-black">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-red-500/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-purple-500/10 blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Logo with hover effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
            className="mb-8 relative group"
          >
            <div className="absolute inset-0 bg-red-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
            <Image
              src="/GameToWorkLogo.png"
              alt="Game To Work"
              width={80}
              height={80}
              className="mx-auto relative z-10"
            />
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-red-400 to-red-900 bg-clip-text text-transparent"
          >
            Gelişmelerden Haberdar Ol
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-gray-300 text-lg mb-8"
          >
            Yeni özelliklerden, etkinliklerden ve fırsatlardan ilk senin haberin
            olsun.
          </motion.p>

          {/* Email Signup Form with enhanced button */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
          >
            <Input
              type="email"
              placeholder="E-posta adresiniz"
              className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:ring-red-500/50 focus:border-red-500/50 transition-all duration-300"
            />
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-red-500/50 rounded-md blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
              <Button className="relative z-10 bg-gradient-to-r from-red-400 to-red-800 hover:from-red-600 hover:to-red-900 duration-300 ease-in-out transition text-white px-8 shadow-lg shadow-red-500/20 hover:shadow-red-500/40">
                Kaydol
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.form>

          {/* Social Media Links with enhanced hover effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center gap-6 mt-8"
          >
            {socialLinks.map((social, index) => (
              <motion.div
                key={social.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                className="relative group"
              >
                <div
                  className={`absolute inset-0 rounded-full blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100 ${social.hoverColor.replace(
                    "hover:",
                    ""
                  )}`}
                />
                <Link
                  href={social.href}
                  className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm transition-all duration-300 ${social.hoverColor} shadow-lg hover:shadow-xl`}
                >
                  <Image
                    src={social.icon}
                    alt={social.name}
                    width={24}
                    height={24}
                    className={`${social.defaultColor} group-hover:opacity-100 transition-opacity`}
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
