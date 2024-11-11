"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronUp } from "lucide-react";
import emailjs from "@emailjs/browser";

const page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
  }

  interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    message?: string;
  }

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
      setLoading(true);
      emailjs
        .send(
          "service_thblb7d",
          "template_3arfr8o",
          {
            from_name: `${formData.firstName} ${formData.lastName}`,
            to_name: "Shantell",
            from_email: formData.email,
            to_email: "Shantellehandypaula@gmail.com",
            message: formData.message,
          },
          "AiA2v3WSH0eG4AXc7"
        )
        .then((response) => {
          console.log("SUCCESS!", response.status, response.text);
          setLoading(false);
          alert("Your message has been successfully sent.");
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            message: "",
          });
        })
        .catch((error) => {
          console.error("FAILED...", error);
          setLoading(false);
          alert(
            `An error occurred while sending the message: ${error.text}. Please try again.`
          );
        });
    } else {
      setLoading(false);
      setErrors(newErrors);
    }
  };

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
          <p className="text-[#3f3f3f] text-[48px] font-extralight tracking-[0.4em] lg:tracking-[0.6em] leading-8">
            Contact
          </p>
          <div className="h-[1px] mt-8 lg:mt-12 bg-[#c4c2c2]"></div>
          <div className="flex items-end flex-col gap-6 my-4">
            <div>
              <p className="text-[#515151] text-xl lg:text-2xl font-light tracking-widest">
                NORWAY
              </p>
              <p className="text-[#515151] italic font-light tracking-widest text-left">
                Galleri Ramfjord
              </p>
            </div>
            <div>
              <p className="text-[#515151] text-xl lg:text-2xl font-light tracking-widest">
                AMSTERDAM
              </p>
              <p className="text-[#515151] italic font-light tracking-widest text-left">
                Galerie Mokum
              </p>
            </div>
            <div>
              <p className="text-[#515151] text-xl lg:text-2xl font-light tracking-widest">
                GERMANY
              </p>
              <p className="text-[#515151] italic font-light tracking-widest text-left">
                Galerie Z-22
              </p>
            </div>
            <div>
              <p className="text-[#515151] text-xl lg:text-2xl font-light tracking-widest">
                NEW YORK CITY
              </p>
              <p className="text-[#515151] italic font-light tracking-widest text-left">
                Arcadia Contemporary
              </p>
            </div>
            <div>
              <p className="text-[#515151] text-xl lg:text-2xl font-light tracking-widest">
                BELGIUM
              </p>
              <p className="text-[#515151] italic font-light tracking-widest text-left">
                Verduyn Gallery
              </p>
            </div>
            <p className="self-center mt-4 text-[#515151] italic font-semibold tracking-widest">
              Inquiries may also be submitted using the form at the bottom of
              this page.
            </p>
          </div>
          <div className="h-[1px] mt-8 lg:mt-12 bg-[#c4c2c2]"></div>
          <div className="flex justify-center flex-col items-center my-16">
            <div className="flex flex-col items-center max-w-[800px]">
              <img src="/p83.png" alt="p4" />
              <p className="mt-8 text-[#515151] tracking-widest italic">
                www.arcadiacontemporary.com
              </p>
              <p className="text-[#515151] italic tracking-widest font-semibold">
                Arcadia Contemporary
              </p>
              <p className="text-[#515151] tracking-widest">
                421 WEST BROADWAY
              </p>
              <p className="text-[#515151] tracking-widest italic">
                NEW YORK, NY 10012
              </p>
              <p className="text-[#515151] tracking-widest">646-861-3941</p>
              <p className="text-[#515151] tracking-widest italic">
                info@arcadiacontemporary.com
              </p>
            </div>
          </div>
          <div className="h-[1px] mt-8 lg:mt-12 bg-[#c4c2c2]"></div>
          <div className="flex justify-center flex-col items-center my-16">
            <div className="flex flex-col items-center max-w-[800px]">
              <img src="/p180.png" alt="p4" />
              <p className="mt-8 text-[#515151] tracking-widest italic">
                www.benjamin-eck.com
              </p>
              <p className="text-[#515151] italic tracking-widest font-semibold">
                Benjamin Eck Gallery
              </p>
              <p className="text-[#515151] tracking-widest">
                PESTALOZZISTRASSE 14
              </p>
              <p className="text-[#515151] tracking-widest">80469 MÜNCHEN</p>
              <p className="text-[#515151] tracking-widest italic">GERMANY</p>
              <p className="text-[#515151] tracking-widest">
                +49 152 33 52 49 57
              </p>
              <p className="text-[#515151] tracking-widest italic">
                info@benjamin-eck.com
              </p>
            </div>
          </div>
          <div className="h-[1px] mt-8 lg:mt-12 bg-[#c4c2c2]"></div>
          <div className="flex justify-center flex-col items-center my-16">
            <div className="flex flex-col items-center max-w-[800px]">
              <img src="/p86.png" alt="p4" />
              <p className="mt-8 text-[#515151] tracking-widest italic">
                www.galleriramfjord.no
              </p>
              <p className="text-[#515151] italic tracking-widest font-semibold">
                Galleri Ramfjord
              </p>
              <p className="text-[#515151] tracking-widest">SCHWENSENSGATE 1</p>
              <p className="text-[#515151] tracking-widest">0170 OSLO</p>
              <p className="text-[#515151] tracking-widest italic">NORWAY</p>
              <p className="text-[#515151] tracking-widest">+47 40555562</p>
              <p className="text-[#515151] tracking-widest italic">
                post@galleriramfjord.no
              </p>
            </div>
          </div>

          <div className="h-[1px] mt-8 lg:mt-12 bg-[#c4c2c2]"></div>
          <div className="flex justify-center flex-col items-center my-16">
            <div className="flex flex-col items-center max-w-[800px]">
              <img src="/p89.png" alt="p4" />
              <p className="mt-8 text-[#515151] tracking-widest italic">
                www.verduyngallery.com
              </p>
              <p className="text-[#515151] italic tracking-widest font-semibold">
                Verduyn Gallery
              </p>
              <p className="text-[#515151] tracking-widest">
                HEERBAAN 10 9790 MOREGEM
              </p>
              <p className="text-[#515151] tracking-widest">0170 OSLO</p>
              <p className="text-[#515151] tracking-widest italic">BELGIUM</p>
              <p className="text-[#515151] tracking-widest">
                +32 (0) 475 28 85 13
              </p>
              <p className="text-[#515151] tracking-widest italic">
                stefanie@verduyngallery.com
              </p>
            </div>
          </div>
          <div className="h-[1px] mt-8 lg:mt-12 bg-[#c4c2c2]"></div>
          <div className="self-end mt-12 max-w-xl">
            <div className="mb-4 text-sm text-black italic font-medium tracking-widest">
              <span className="text-red-500 font-extrabold">*</span> INDICATES
              REQUIRED FIELD
            </div>
            <form onSubmit={handleSubmit} className="space-y-6 mt-10">
              <div>
                <label className="block mb-2">
                  NAME (LAST, FIRST)
                  <span className="text-red-500 font-extrabold">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First"
                      className="w-full px-3 py-2 border border-[#c4c2c2] bg-transparent"
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last"
                      className="w-full px-3 py-2 border border-[#c4c2c2] bg-transparent"
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block mb-2">
                  EMAIL ADDRESS{" "}
                  <span className="text-red-500 font-extrabold">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-[#c4c2c2] bg-transparent"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="message" className="block mb-2">
                  MESSAGE <span className="text-red-500 font-extrabold">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-[#c4c2c2] bg-transparent resize-none min-h-[200px]"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="bg-[#ecedee] text-black font-medium px-6 py-2 hover:bg-[#c9c9ca] transition-colors"
                disabled={loading}
              >
                {loading ? "SUBMITTing..." : "SUBMIT"}
              </button>
            </form>
          </div>
          <div className="mt-12 flex items-end flex-col">
            <div className="flex justify-center flex-col items-center my-16">
              <div className="flex flex-col items-center max-w-[800px]">
                <img src="/p78.png" alt="p4" />
                <p className="mt-4 text-[#515151] tracking-widest italic">
                  Work at the LA Art Show with Arcadia Contemporary, 2022
                </p>
              </div>
            </div>
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
