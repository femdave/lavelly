"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronUp } from "lucide-react";

const page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Short delay before showing the nav to ensure smooth animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500); // Adjust this delay as needed

    return () => clearTimeout(timer);
  }, []);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Add this new useEffect for scroll to top button
  useEffect(() => {
    const toggleScrollButton = () => {
      if (window.scrollY > window.innerHeight) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", toggleScrollButton);
    return () => window.removeEventListener("scroll", toggleScrollButton);
  }, []);

  // Add this new function for scrolling to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const links = [
    { href: "/", label: "LAVELY MILLER" },
    { href: "/work", label: "WORK" },
    { href: "/bio-cv", label: "BIO + CV" },
    { href: "/contact", label: "CONTACT" },
  ];

  if (!mounted) return null;

  return (
    <div>
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="px-4 py-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-black hover:opacity-75 transition-opacity"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X size={26} className="text-black" />
            ) : (
              <Menu size={26} className="text-black" />
            )}
          </button>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav
        className={`hidden lg:block fixed top-0 left-0 bg-white right-0 z-40   `}
      >
        <div
          className={`max-w-screen-xl mx-auto px-6 transition-opacity duration-1000 ease-in ${
            isVisible ? "opacity-100" : "opacity-0"
          } ${isScrolled ? "py-6" : "py-12"}`}
        >
          <ul className="flex justify-center space-x-12">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-lg font-normal tracking-[0.3em] hover:opacity-75 transition-opacity ${
                    pathname === link.href
                      ? "text-black border-b border-black"
                      : "text-black"
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
        className={`lg:hidden fixed inset-0 z-40 bg-white transform transition-transform duration-300 pt-16 ${
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
                      ? "text-black border-b border-black"
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
      <div className="bg-[#cdcfd3] min-h-screen">
        <div className="container py-16 px-6 mx-auto mt-[70px] lg:mt-32 ">
          <p className="text-[#3f3f3f] text-[48px] font-extralight tracking-[0.8em] leading-8">
            Work
          </p>
          <div className="h-[1px] mt-8 lg:mt-12 bg-[#c4c2c2]"></div>
          <div className="flex justify-center flex-col items-center">
            <h1 className="my-16 italic text-2xl text-center text-[#3f3f3f]">
              NORWAY / AMSTERDAM / GERMANY BELGIUM / NEW YORK CITY
            </h1>
            <div className="flex flex-col gap-8 items-center max-w-[800px]">
              <img src="/p1.png" alt="p1" />
              <img src="/p2.png" alt="p2" />
            </div>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-xl lg:text-2xl italic">
              Holly Rose in Front of a Painting, 2022
            </h1>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-base lg:text-xl ">
              acrylic on paper on canvas, 60" x 45"
            </h1>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-base lg:text-xl ">
              Galleri Ramfjord, Oslo, Norway
            </h1>
          </div>
          <div className="h-[1px] mt-8 lg:mt-12 bg-[#c4c2c2]"></div>
          <div className="flex justify-center flex-col items-center my-16">
            <div className="flex flex-col gap-8 items-center max-w-[800px]">
              <img src="/p3.png" alt="p3" />
            </div>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-xl lg:text-2xl italic">
              Laura as a Little Girl, 2022
            </h1>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-base lg:text-xl ">
              acrylic on paper on canvas, 40" x 30"
            </h1>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-base lg:text-xl ">
              Sold / Oslo, Norway
            </h1>
          </div>
          <div className="h-[1px] mt-8 lg:mt-12 bg-[#c4c2c2]"></div>
          <div className="flex justify-center flex-col items-center my-16">
            <div className="flex flex-col gap-8 items-center max-w-[800px]">
              <img src="/p4.png" alt="p4" />
            </div>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-xl lg:text-2xl italic">
              God Takes Everything I Love and Holds It For Safekeeping, 2022
            </h1>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-base lg:text-xl ">
              acrylic on paper on canvas, 40" x 30"
            </h1>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-base lg:text-xl ">
              sold / New York City
            </h1>
          </div>
          <div className="h-[1px] mt-8 lg:mt-12 bg-[#c4c2c2]"></div>
          <div className="flex justify-center flex-col items-center my-16">
            <div className="flex flex-col gap-8 items-center max-w-[800px]">
              <img src="/p4.jpg" alt="p4" />
              <img src="/p5.jpg" alt="p4" />
            </div>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-xl lg:text-2xl italic">
              Untitled, 2022
            </h1>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-base lg:text-xl ">
              acrylic on paper on canvas, 40" x 30"
            </h1>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-base lg:text-xl ">
              Sold / Oslo, Norway
            </h1>
          </div>
          <div className="h-[1px] mt-8 lg:mt-12 bg-[#c4c2c2]"></div>
          <div className="flex justify-center flex-col items-center my-16">
            <div className="flex flex-col gap-8 items-center max-w-[800px]">
              <img src="/p6.png" alt="p4" />
            </div>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-xl lg:text-2xl italic">
              Bear Hat, 2022
            </h1>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-base lg:text-xl ">
              acrylic on paper on canvas, 40" x 30"
            </h1>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-base lg:text-xl ">
              Sold / Oslo, Norway
            </h1>
          </div>
          <div className="h-[1px] mt-8 lg:mt-12 bg-[#c4c2c2]"></div>
          <div className="flex justify-center flex-col items-center my-16">
            <div className="flex flex-col gap-8 items-center max-w-[800px]">
              <img src="/p7.png" alt="p4" />
            </div>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-xl lg:text-2xl italic">
              Side Profile, 2022
            </h1>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-base lg:text-xl ">
              acrylic on paper on canvas, 40" x 30"
            </h1>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-base lg:text-xl ">
              Sold / New York, New York
            </h1>
          </div>
          <div className="h-[1px] mt-8 lg:mt-12 bg-[#c4c2c2]"></div>
          <div className="flex justify-center flex-col items-center my-16">
            <div className="flex flex-col gap-8 items-center max-w-[800px]">
              <img src="/p8.png" alt="p4" />
            </div>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-xl lg:text-2xl italic">
              Fox and Bunny Tattoo, 2022.
            </h1>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-base lg:text-xl ">
              acrylic on paper on canvas, 40" x 30"
            </h1>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-base lg:text-xl ">
              sold / Chicago, Illinois.
            </h1>
          </div>
          <div className="h-[1px] mt-8 lg:mt-12 bg-[#c4c2c2]"></div>
          <div className="flex justify-center flex-col items-center my-16">
            <div className="flex flex-col gap-8 items-center max-w-[800px]">
              <img src="/p9.png" alt="p4" />
              <img src="/p10.png" alt="p4" />
            </div>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-xl lg:text-2xl italic">
              You Never See It Coming, 2022
            </h1>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-base lg:text-xl ">
              acrylic on paper on canvas, 40" x 30"
            </h1>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-base lg:text-xl ">
              Sold / Miami Beach, Florida
            </h1>
          </div>
          <div className="h-[1px] mt-8 lg:mt-12 bg-[#c4c2c2]"></div>
          <div className="flex justify-center flex-col items-center my-16">
            <div className="flex flex-col gap-8 items-center max-w-[800px]">
              <img src="/p11.png" alt="p4" />
            </div>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-xl lg:text-2xl italic">
              For Brooke, on Her 50th Birthday, 2022
            </h1>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-base lg:text-xl ">
              acrylic on paper on canvas, 30" x 30"
            </h1>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-base lg:text-xl ">
              NFS
            </h1>
          </div>
          <div className="h-[1px] mt-8 lg:mt-12 bg-[#c4c2c2]"></div>
          <div className="flex justify-center flex-col items-center my-16">
            <div className="flex flex-col gap-8 items-center max-w-[800px]">
              <img src="/p12.png" alt="p4" />
            </div>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-xl lg:text-2xl italic">
              Untitled #1, 2022
            </h1>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-base lg:text-xl ">
              acrylic on paper on canvas, 40" x 30"
            </h1>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-base lg:text-xl ">
              sold / Oslo, Norway
            </h1>
          </div>
          <div className="h-[1px] mt-8 lg:mt-12 bg-[#c4c2c2]"></div>
          <div className="flex justify-center flex-col items-center my-16">
            <div className="flex flex-col gap-8 items-center max-w-[800px]">
              <img src="/p36 (1).jpeg" alt="p4" />
            </div>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-xl lg:text-2xl italic">
              Untitled #1, 2022
            </h1>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-base lg:text-xl ">
              acrylic on paper on canvas, 40" x 30"
            </h1>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-base lg:text-xl ">
              sold / Oslo, Norway
            </h1>
          </div>
          <div className="h-[1px] mt-8 lg:mt-12 bg-[#c4c2c2]"></div>
          <div className="flex justify-center flex-col items-center my-16">
            <div className="flex flex-col gap-8 items-center max-w-[800px]">
              <img src="/p36 (2).jpeg" alt="p4" />
            </div>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-xl lg:text-2xl italic">
              Untitled, 2023
            </h1>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-base lg:text-xl ">
              acrylic on paper on canvas, 40" x 30"
            </h1>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-base lg:text-xl ">
              sold / Oslo, Norway
            </h1>
          </div>
          <div className="h-[1px] mt-8 lg:mt-12 bg-[#c4c2c2]"></div>
          <div className="flex justify-center flex-col items-center my-16">
            <div className="flex flex-col gap-8 items-center max-w-[800px]">
              <img src="/p36 (3).jpeg" alt="p4" />
            </div>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-xl lg:text-2xl italic">
              I’ve Come to Take Your Whiskey and Your Women (Hello, New York),
              2022.
            </h1>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-base lg:text-xl ">
              acrylic on paper on canvas, 40" x 30"
            </h1>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-base lg:text-xl ">
              Arcadia Contemporary, New York City
            </h1>
          </div>
          <div className="h-[1px] mt-8 lg:mt-12 bg-[#c4c2c2]"></div>
          <div className="flex justify-center flex-col items-center my-16">
            <div className="flex flex-col gap-8 items-center max-w-[800px]">
              <img src="/p36 (4).jpeg" alt="p4" />
            </div>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-xl lg:text-2xl italic">
              Lindsay, as I Imagine Her in 2022, 2022.
            </h1>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-base lg:text-xl ">
              acrylic on paper on canvas, 40" x 30"
            </h1>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-base lg:text-xl ">
              Arcadia Contemporary, New York City
            </h1>
          </div>
          <div className="h-[1px] mt-8 lg:mt-12 bg-[#c4c2c2]"></div>
          <div className="flex justify-center flex-col items-center my-16">
            <div className="flex flex-col gap-8 items-center max-w-[800px]">
              <img src="/p36 (5).jpg" alt="p4" />
            </div>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-xl lg:text-2xl italic">
              I Miss Fancy, 2022
            </h1>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-base lg:text-xl ">
              acrylic on paper on canvas, 60" x 50"
            </h1>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-base lg:text-xl ">
              Galeri Ramfjord / Oslo, Norway
            </h1>
          </div>
          <div className="h-[1px] mt-8 lg:mt-12 bg-[#c4c2c2]"></div>
          <div className="flex justify-center flex-col items-center my-16">
            <div className="flex flex-col gap-8 items-center max-w-[800px]">
              <img src="/p36 (6).jpg" alt="p4" />
              <img src="/p36 (7).jpg" alt="p4" />
            </div>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-xl lg:text-2xl italic">
              Lindsay, as I Remember Her, 2020
            </h1>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-base lg:text-xl ">
              acrylic on paper on canvas, 60" x 50"
            </h1>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-base lg:text-xl ">
              on loan for the Bennett Prize exhibition
            </h1>
          </div>
          <div className="h-[1px] mt-8 lg:mt-12 bg-[#c4c2c2]"></div>
          <div className="flex justify-center flex-col items-center my-16">
            <div className="flex flex-col gap-8 items-center max-w-[800px]">
              <img src="/p36 (10).jpg" alt="p4" />
            </div>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-xl lg:text-2xl italic">
              MIllerBuilt Tattoo, 2020
            </h1>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-base lg:text-xl ">
              acrylic on paper on canvas, 60" x 50"
            </h1>
            <h1 className="text-right self-end pr-6 text-[#768188] tracking-widest text-base lg:text-xl ">
              sold / Potomac, Maryland
            </h1>
          </div>
        </div>
      </div>
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-[#768188] hover:bg-[#3f3f3f] text-white rounded-full p-3 transition-all duration-300 shadow-lg z-50"
          aria-label="Scroll to top"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  );
};

export default page;
