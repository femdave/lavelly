"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronUp } from "lucide-react";
import { div } from "framer-motion/client";

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
          <p className="text-[#3f3f3f] text-[48px] font-extralight tracking-[0.4em] lg:tracking-[0.8em] leading-8">
            BIO+CV
          </p>
          <div className="h-[1px] mt-8 lg:mt-12 bg-[#c4c2c2]"></div>

          <div className="flex justify-center flex-col items-center ">
            <h1 className="my-16 italic text-2xl text-center text-[#3f3f3f]">
              NORWAY / AMSTERDAM / GERMANY BELGIUM / NEW YORK CITY
            </h1>
            <div className="flex flex-col gap-8 items-center max-w-[800px]">
              <img src="/p4.png" alt="p4" />
            </div>
            <h1 className="  text-black tracking-widest text-lg lg:text-xl mt-12">
              “LAVELY MILLER paints figures that exist in moments of emotional
              action. This sense of movement is translated through transparent
              layers of glazes, sometimes upward of 100 separate applications of
              color combining to create the final surface. The quality of
              layering is heightened by the use of paper, as it moves and
              crinkles during its application to create physical depth.
              Classical Flemish glazing techniques - unusually applied almost
              exclusively with the artist’s right index finger - and the aged
              appearance of the painted surface give these figures a timeless
              quality, a frozen moment of physical time filled with universal
              human emotion.”
            </h1>
            <h1 className=" text-left self-start italic tracking-widest text-black my-4 text-lg lg:text-xl ">
              - Art Martin, Muskegon Museum of Art
            </h1>
            <h1 className="  text-black tracking-widest text-lg lg:text-xl ">
              Miller’s work contains depths that are “both metaphorical and
              literal. That the format evokes Renaissance art seems apt...her
              paintings have an eerie timelessness.”
            </h1>
            <h1 className=" text-left self-start italic tracking-widest text-black my-4 text-lg lg:text-xl ">
              - Mark Jenkins, the Washington Post
            </h1>
            <h1 className="  text-black tracking-widest text-lg lg:text-xl my-4">
              Lavely Miller was named one of ten finalists for the 2021 Bennett
              Prize, the largest visual arts award given to a female figurative
              realist in the United States. She has received grants from the
              Pollock-Krasner Foundation, Maryland State Arts, and the Adolph
              and Esther Gottlieb Foundation. She is a past recipient of the
              Keller Prize, the Contemporary Award from Contemporary Paintings,
              the Beautiful Bizarre Art Prize, and a Juror’s Choice awardee from
              the National Museum of American History/Smithsonian Institution.
              Miller has had residencies at the Virginia Center for the Creative
              Arts and Dacia Gallery in New York City, where she studied under
              Iliya Mirochnick. Her work is regularly exhibited at the LA Art
              Show through Arcadia Contemporary.
            </h1>
            <h1 className="  text-black tracking-widest text-lg lg:text-xl my-4">
              Lavely Miller’s paintings have been featured in American Art
              Collector, Hyperallergic, Fine Art Connoisseur, Beautiful Bizarre
              Magazine, the Washington Post, as well as other publications
              internationally. Her work is held in various public collections
              such as the New Salem Museum in New Salem, Massachusetts, the
              University of Virginia, the National Center for Transgender
              Equality in Washington, DC, and the Twenty-First Century Fox and
              News Corporation Building in New York City. Her work is
              internationally privately collected.
            </h1>
            <h1 className="  text-black tracking-widest text-lg lg:text-xl my-4">
              Miller graduated summa cum laude with a BFA in Studio Art from
              James Madison University. She holds both master's and doctoral
              level degrees in Clinical Mental Health from the University of
              Virginia, where she completed her residency in the area of serious
              mental illness.
            </h1>
            <h1 className=" self-start text-black tracking-widest text-lg lg:text-xl my-4">
              Lavely Miller currently lives and works on the eastern shore of
              Maryland.
            </h1>
            <div className="flex flex-col gap-8 items-center max-w-[800px] mt-6">
              <img src="/p26.png" alt="p4" />
            </div>
            <h1 className=" sm:text-center text-[#768188] italic tracking-widest text-base lg:text-lg my-4">
              Lindsay, as I Remember Her, on banner for Rising Voices II, The
              Bennett Prize exhibition at the Muskegon Museum of Art, 2021
            </h1>
            <p className=" self-start text-[#1d2129] tracking-widest  text-xl lg:text-2xl mt-8 mb-4">
              Education /
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              Ed.D., Clinical Mental Health. University of Virginia,
              Charlottesville, Virginia.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              M.Ed., Clinical Mental Health. University of Virginia,
              Charlottesville, Virginia.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              B.F.A., Painting and Drawing. Summa Cum Laude, With Distinction,
              Phi Kappa Phi. James Madison University, Harrisonburg, Virginia.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-xl lg:text-2xl  my-4">
              Selected Solo Exhibitions /
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2025, January. LAVELY MILLER IN BERLIN. Galerie-Z22, Berlin,
              Germany.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2024, April. LAVELY MILLER / NORWAY. Galleri Ramfjord, Oslo,
              Norway.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2024, March. KUNSTRAI ART FAIR (solo booth with Galerie Mokum).
              Amsterdam, Netherlands.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2023, July. LAVELY MILLER IN BELGIUM. Verduyn Gallery,
              Wortegem-Petegem, Belgium.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2023, April. LAVELY MILLER: SPECIAL FEATURE. Arcadia Contemporary,
              New York City, New York.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2023, February. LAVELY MILLER IN OSLO. Galleri Ramfjord, Oslo,
              Norway.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2022, April. NEW WORK. Verduyn Gallery, Wortegem-Petegem, Belgium.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2022, March. THE NEW WORK. Galleri Ramfjord, Oslo, Norway.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2021, October. LAVELY MILLER IN MUNICH. Benjamin Eck Galerie,
              Munich, Germany.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2020, April. NEW PAINTINGS. W Hotel, Washington, DC.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2020, March. NEW PAINTINGS. Foundry Gallery, Washington, DC.{" "}
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2019, October. LAVELY MILLER-KERSHMAN PAINTS LAVELY
              MILLER-KERSHMAN. The Academy, Lynchburg, Virginia.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2018, November. UNTITLED. Foundry Gallery, Washington, DC.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2018, September. BETWEEN THE GAZE. Artist's Proof, Washington, DC.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2015, June. I SHOT A MAN IN RENO. Gallery One Sixty, Cleveland,
              Ohio.{" "}
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2012, June. LAVELY MILLER/OPEN STUDIO. Virginia Center for the
              Creative Arts, Amherst, Virginia.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2012, March - April. CONTEMPORARY PORTRAITURE, Riverviews
              Artspace, Lynchburg, Virginia.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2011, January. I AM ALMOST CERTAIN THIS IS THE YEAR LILY TOMLIN
              FALLS IN LOVE WITH ME, Dialog Gallery, Roanoke, Virginia.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2008, July. THESE ARE NOT THE GOOD PAINTINGS, Park Group,
              Richmond, Virginia.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2007, July. MY MOTHER WON'T LET ME USE THE GOOD TITLE, McGuffey
              Art Center, Charlottesville, Virginia.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2005, October. DENNIS BIGELOW, THEATRE DIRECTOR, 52, DIES/NEW
              PAINTINGS, Mudhouse, Charlottesville, Virginia.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2004, November. FINGERPAINTINGS/NOVEMBER, Mountain Air Gallery,
              Charlottesville, Virginia.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2004, June. FINGERPAINTINGS/JUNE, Mountain Air Gallery,
              Charlottesville, Virginia.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2004, September. UNTITLED, Jabberwocky, Charlottesville, Virginia.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2003, June. NEW WORK, Lynchburg Fine Arts Center, Lynchburg,
              Virginia.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2000, January. WOMEN + MEN, Zirkle House Art Gallery,
              Harrsionburg, Virginia.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-xl lg:text-2xl  my-4">
              Awards /
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2023, October. Finalist; Galleri Ramfjord Grants Exhibition. Oslo,
              Norway.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2023. October. Second place; Trinity 7th National Juried
              Exhibition. Sacramento, California
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2023, September. First place; Women in Art Award. Women in Art,
              New York, New York.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2023, September. Second place; Art Collide, Portrait Award. New
              York, New York.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2023, April. Contemporary Award; Barcelona Academy of Art.
              Barcelona, Spain.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2022, December. The Keller Prize. Aspen, Colorado.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2022, April. Pollock-Krasner Foundation Grant. New York City, New
              York.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2021, September. Beautiful Bizarre Art Prize, 3rd Place, Sydney,
              Australia.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2021, March. Maryland State Arts Grant, Baltimore, Maryland.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2020, November. The Bennett Prize, finalist, Pittsburgh,
              Pennsylvania.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2020, May. Adolph and Ester Gottlieb Grant, New York City, New
              York.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2020, February. Juror's Choice Award, from National Museum of
              American History/Smithsonian Institution's Camy Clough, Dowell,
              Maryland.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2017, October. Finalist for solo exhibition at Dacia Gallery, New
              York City, New York.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2014, November. Best In Show Award, Riverviews 6th Annual Group
              Show, Lynchburg, Virginia.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2014, August. Artist Residency/Fellowship, Dacia Gallery, New York
              City, New York.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2013, June. Context Award - Art, Scope Art Festival, Art Basel,
              Miami, Florida.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2012, June. Artist Residency/Fellowship, Virginia Center for the
              Creative Arts, Amherst, Virginia.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2006, Honorable Mention, VRMC Juried Group Show, Harrisonburg,
              Virginia.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2000, The Art Achievement Award, James Madison University,
              Harrisonburg, Virginia.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              1999, Best in Show Award, James Madison University, Harrisonburg,
              Virginia.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              1998, Best in Show Award, James Madison University, Harrisonburg,
              Virginia.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              1996, Best in Show Award, Lynchburg Kaleidoscope Festival,
              Lynchburg, Virginia.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              1996, Amherst-Nelson Alliance for the Arts Award, Amherst,
              Virginia.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-xl lg:text-2xl  my-4">
              Reviews, Articles and Publications /
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2023, December. International Artist Magazine. Infinite Depths /
              Lavely Miller.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2023, April. The Studio, a journal from Robert Rausch. The
              Definition of Beauty / Lavely Miller.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2023, February. The Art Talk Magazine. Thank You Letters to God /
              Lavely Miller.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2022, July. Beautiful Bizarre Magazine. Lavely Miller: An
              Eccentric Look at the Clinical Side of Painting.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2022, April. Cultura Inquieta. La Pintura Emocional de Lavely
              Miller.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2022, March. John Dalton Podcast. Live podcast interview.{" "}
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2021, March. James Madison University College of Visual and
              Performing Arts. CVPA Spotlight: Lavely Miller.{" "}
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2021, February. Fine Art Connoisseur. Mention about The Bennett
              Prize, feature of my work.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2021, February. American Art Collector. Article on The Bennett
              Prize finalists.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2020, December. Hyperallergic. Mention.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2020, April. Beautiful Bizarre Magazine. Review of paintings at
              Arcadia Contemporary.{" "}
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2019, October. Academy Center of the Arts Blog, Lynchburg,
              Virginia. Review of solo show.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2019, October. Amherst New Era Progress, Amherst, Virginia. Review
              of solo show.{" "}
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2019, October. Lynchburg News and Advance, Lynchburg, Virginia.
              Review of solo show.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2018, December. Washington Post, Washington, DC. Review of solo
              show.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2018, December. Wall Street International Magazine, “Painting
              Without Brushes”. Article.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2012, September. Straw Dogs Magazine, Nicosia, Republic of Cyprus.
              Artist Interview.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2012, May. Richmond Magazine's R-Home, Richmond, Virginia.
              Painting used for cover.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2012, The Art Takes Miami Book, Art Basel, Miami, Florida.
              Paintings, interview and artist profile.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2005, Issue 15, Fall/Winter. Meridian: The Semi-Annual from the
              University of Virginia, Charlottesville, Virginia. Drawing used
              for cover and inside art.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2007, September. Albemarle Magazine, Charlottesville, Virginia.
              Interview and review of work.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              2007, August. The Daily Progress, Charlottesville, Virginia.
              Review of solo exhibition.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-xl lg:text-2xl  my-4">
              Selected Past/Present Collections /
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              Twenty-First Century Fox and News Corporation Building, New York
              City, New York.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              Barcelona Academy of Art, Barcelona, Spain.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              The New Salem Museum, New Salem, Massachusetts.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              The University of Virginia Library System, Charlottesville,
              Virginia.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              Virginia Commonwealth University, Women's Studies Department,
              Richmond, Virginia.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              Maria McVarish Design Services, San Francisco, California.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              The National Center for Transgender Equality, Washington, D.C.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              Delancey Street Museum, Philadelphia, Pennsylvania.{" "}
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              Law offices of Gordon-Creed, Kelley, Holl & Sugerman, San
              Franciso, California.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              Private collection of Jock Sturges, Seattle, Washington.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              Private collection of Kate Bornstein, New York City, New York.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              Various private collections throughout the United States, France,
              Germany, Greece, Japan, the Netherlands, Norway, Cyprus Sweden,
              and the UK.
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-xl lg:text-2xl  my-4">
              Gallery Representation /
            </p>
            <p className=" self-start text-[#1d2129] tracking-widest  text-lg lg:text-xl ">
              Arcadia Contemporary / New York, NY.
            </p>
            <div className="flex flex-col gap-8 items-center max-w-[800px] mt-6">
              <img src="/p74.png" alt="p4" />
            </div>
            <h1 className=" sm:text-center text-[#768188] italic tracking-widest text-base lg:text-lg my-4">
              Installation of work at the Benjamin Eck Gallery in Munich,
              Germany, 2022
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
