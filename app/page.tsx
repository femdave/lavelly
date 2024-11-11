"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Work() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, -0.01, 0.9],
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.6, 0.05, -0.01, 0.9],
      },
    },
  };

  useEffect(() => {
    // Short delay before showing the nav to ensure smooth animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500); // Adjust this delay as needed

    return () => clearTimeout(timer);
  }, []);

  const links = [
    { href: "/", label: "LAVELY MILLER" },
    { href: "/work", label: "WORK" },
    { href: "/bio-cv", label: "BIO + CV" },
    { href: "/contact", label: "CONTACT" },
  ];

  if (!mounted) return null;
  return (
    <div className="relative min-h-screen w-full">
      <Image
        src="/lavelly.jpg"
        alt="Close-up portrait with vibrant red lips"
        fill
        className="object-cover"
        priority
        quality={100}
      />
      <div className="absolute z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden fixed top-4 left-4 z-50 p-2 text-black"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <X size={26} className="text-black" />
          ) : (
            <Menu size={26} className="text-white" />
          )}
        </button>

        {/* Desktop Navigation */}
        <nav
          className={`hidden lg:block fixed top-0 left-0 right-0 z-40 transition-opacity duration-1000 ease-in ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="max-w-screen-xl mx-auto px-6 py-12">
            <ul className="flex justify-center space-x-12">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-lg font-normal tracking-[0.3em] hover:opacity-75 transition-opacity ${
                      pathname === link.href
                        ? "text-white border-b border-white"
                        : "text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <nav
          className={`lg:hidden fixed inset-0 z-40 bg-white transform transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-center h-full">
            <ul className="space-y-8">
              {links.map((link) => (
                <li key={link.href} className="text-center">
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg tracking-widest hover:opacity-75 transition-opacity ${
                      pathname === link.href
                        ? "text-black border-b border-white"
                        : "text-black/80"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
