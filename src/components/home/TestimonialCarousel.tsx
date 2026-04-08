import { useEffect, useRef, useState } from "react";
import { Star, Quote, MapPin } from "lucide-react";

import instructorSarah from "@/assets/instructor-sarah.jpg";
import instructorJames from "@/assets/instructor-james.jpg";
import instructorPriya from "@/assets/instructor-priya.jpg";

const testimonials = [
  {
    name: "Robert & Carol S.",
    location: "Dayton, OH",
    quote:
      "We were about to send $5,000 to someone pretending to be our grandson. InVision's safe-word training saved us.",
    rating: 5,
    avatar: instructorSarah,
    tag: "Grandparent Scam",
  },
  {
    name: "Maria T.",
    location: "Springfield, OH",
    quote:
      "The workshop was eye-opening. We've blocked 3 phishing attempts on our small business since.",
    rating: 5,
    avatar: instructorJames,
    tag: "Business Owner",
  },
  {
    name: "David & Linda W.",
    location: "Centerville, OH",
    quote:
      "Our parents now know exactly what to do when they get suspicious calls. We sleep better.",
    rating: 5,
    avatar: instructorPriya,
    tag: "Family Session",
  },
  {
    name: "Harold P.",
    location: "Kettering, OH",
    quote:
      "I used to panic every time the phone rang. Now I know the tricks — even caught a deepfake call last week.",
    rating: 5,
    avatar: instructorSarah,
    tag: "Deepfake Caught",
  },
  {
    name: "Jennifer R.",
    location: "Beavercreek, OH",
    quote:
      "Their team had our practice back up in under an hour after a payroll email got spoofed. Best insurance we ever bought.",
    rating: 5,
    avatar: instructorPriya,
    tag: "Business Rescue",
  },
  {
    name: "Eleanor B.",
    location: "Oakwood, OH",
    quote:
      "I'm 78 and felt completely lost with technology. Their patience with me was incredible — I actually feel confident now.",
    rating: 5,
    avatar: instructorSarah,
    tag: "Senior Training",
  },
  {
    name: "Thomas & Anne G.",
    location: "Miamisburg, OH",
    quote:
      "A romance scammer nearly took our life savings. InVision's team spotted it in minutes when nobody else would listen.",
    rating: 5,
    avatar: instructorJames,
    tag: "Romance Scam",
  },
  {
    name: "Patricia H.",
    location: "Fairborn, OH",
    quote:
      "My identity was stolen and I had no idea where to start. They walked me through every step until it was fully resolved.",
    rating: 5,
    avatar: instructorPriya,
    tag: "Identity Theft",
  },
  {
    name: "Michael S.",
    location: "Huber Heights, OH",
    quote:
      "The AI receptionist they built for my barbershop pays for itself every week. Bookings are up 40%.",
    rating: 5,
    avatar: instructorJames,
    tag: "AI Receptionist",
  },
  {
    name: "Grace & Walter K.",
    location: "Vandalia, OH",
    quote:
      "My husband has dementia and scammers target him daily. InVision set up filters that catch 99% of them before he sees them.",
    rating: 5,
    avatar: instructorSarah,
    tag: "Dementia Support",
  },
  {
    name: "Rev. Daniel F.",
    location: "Troy, OH",
    quote:
      "They trained my entire church congregation for free. A week later a parishioner avoided a $12,000 gift-card scam.",
    rating: 5,
    avatar: instructorJames,
    tag: "Community Outreach",
  },
  {
    name: "Susan & James M.",
    location: "Xenia, OH",
    quote:
      "After the breach at our kids' school we panicked. InVision had us locked down across every device in two evenings.",
    rating: 5,
    avatar: instructorPriya,
    tag: "Family Lockdown",
  },
];

/**
 * World map backdrop — all seven continents rendered as recognizable
 * silhouettes with glowing white outlines.
 *
 * Continents included (matching real geography, not blobs):
 *   North America, Central America, Greenland, South America,
 *   Europe (incl. British Isles, Scandinavia, Iberia, Italy),
 *   Africa (incl. Horn, Cape, Madagascar),
 *   Middle East, Asia main mass, Arabian Peninsula, India,
 *   Southeast Asia / Indochina, Indonesia / Philippines, Japan,
 *   Australia, New Zealand, plus a thin Antarctic rim.
 *
 * Render style:
 *   Layer 1: outer soft white glow (blurred, very low opacity)
 *   Layer 2: mid white halo
 *   Layer 3: crisp thin white outline on top
 *   Layer 4: very subtle interior fill
 *
 * viewBox uses a 2000×1000 Mercator-ish grid so continents sit
 * in roughly correct lat/lon positions.
 */
function WorldMapBackdrop() {
  // Continent path data — pulled out so the same d-values drive
  // every layer (glow + halo + outline + fill).
  const paths: { id: string; d: string }[] = [
    // ─── NORTH AMERICA (Alaska → Florida) ───
    {
      id: "north-america",
      d: "M 220 120 L 260 95 L 310 85 L 360 82 L 410 88 L 455 98 L 495 112 L 525 102 L 560 92 L 595 90 L 625 105 L 640 130 L 635 158 L 615 180 L 585 200 L 570 225 L 580 250 L 605 272 L 618 305 L 608 340 L 585 375 L 560 405 L 540 440 L 515 470 L 480 498 L 445 512 L 410 520 L 380 518 L 355 505 L 335 483 L 320 458 L 305 430 L 290 395 L 275 360 L 262 325 L 250 288 L 240 248 L 232 208 L 225 168 Z",
    },
    // ─── CENTRAL AMERICA isthmus ───
    {
      id: "central-america",
      d: "M 460 520 L 490 540 L 515 572 L 530 605 L 545 635 L 552 665 L 545 680 L 525 672 L 505 648 L 485 618 L 470 585 L 458 550 Z",
    },
    // ─── SOUTH AMERICA (Venezuela → Patagonia) ───
    {
      id: "south-america",
      d: "M 560 640 L 605 625 L 645 628 L 680 645 L 708 670 L 725 705 L 735 740 L 740 780 L 735 815 L 722 850 L 700 880 L 678 908 L 655 925 L 628 932 L 605 925 L 585 905 L 570 875 L 560 840 L 552 798 L 548 755 L 550 712 L 555 675 Z",
    },
    // ─── GREENLAND ───
    {
      id: "greenland",
      d: "M 720 70 L 770 58 L 820 62 L 855 78 L 870 105 L 862 138 L 840 160 L 810 172 L 780 168 L 750 155 L 728 130 L 720 100 Z",
    },
    // ─── ICELAND ───
    {
      id: "iceland",
      d: "M 885 200 L 908 195 L 920 210 L 912 225 L 892 225 L 880 215 Z",
    },
    // ─── EUROPE (Iberia / France / Italy / Balkans / Scandinavia / E-Europe) ───
    {
      id: "europe",
      d: "M 930 258 L 945 245 L 962 235 L 980 232 L 1000 238 L 1018 235 L 1035 220 L 1050 200 L 1068 182 L 1085 175 L 1100 188 L 1108 210 L 1118 232 L 1132 248 L 1150 260 L 1168 272 L 1185 288 L 1190 305 L 1178 320 L 1158 328 L 1135 332 L 1108 335 L 1082 340 L 1055 345 L 1028 342 L 1002 335 L 978 325 L 955 312 L 938 295 L 928 278 Z",
    },
    // ─── BRITISH ISLES ───
    {
      id: "british-isles",
      d: "M 928 220 L 948 215 L 960 228 L 962 245 L 950 258 L 932 258 L 922 245 L 920 230 Z",
    },
    // ─── AFRICA (Mediterranean → Cape) ───
    {
      id: "africa",
      d: "M 990 340 L 1030 332 L 1070 330 L 1110 332 L 1148 338 L 1180 348 L 1208 365 L 1228 388 L 1240 418 L 1245 450 L 1242 482 L 1235 515 L 1225 545 L 1218 575 L 1220 608 L 1215 638 L 1202 668 L 1185 700 L 1162 728 L 1138 755 L 1112 780 L 1085 795 L 1058 800 L 1035 790 L 1015 770 L 998 745 L 982 715 L 968 680 L 955 640 L 945 595 L 938 545 L 935 495 L 938 445 L 948 395 L 965 360 Z",
    },
    // ─── MADAGASCAR ───
    {
      id: "madagascar",
      d: "M 1238 672 L 1252 678 L 1260 698 L 1262 720 L 1255 740 L 1245 748 L 1235 735 L 1232 715 L 1232 692 Z",
    },
    // ─── ARABIAN PENINSULA ───
    {
      id: "arabia",
      d: "M 1188 350 L 1218 352 L 1248 362 L 1272 380 L 1288 405 L 1290 430 L 1278 450 L 1258 460 L 1232 460 L 1205 450 L 1185 432 L 1175 412 L 1175 388 L 1180 365 Z",
    },
    // ─── ASIA MAIN MASS (Siberia → East Asia) ───
    {
      id: "asia-main",
      d: "M 1190 240 L 1230 218 L 1275 198 L 1320 182 L 1370 170 L 1425 162 L 1485 158 L 1545 162 L 1605 172 L 1660 188 L 1705 212 L 1740 242 L 1762 278 L 1772 315 L 1765 350 L 1742 380 L 1710 400 L 1672 408 L 1632 402 L 1592 392 L 1552 388 L 1515 395 L 1482 402 L 1452 395 L 1425 380 L 1400 362 L 1375 345 L 1348 335 L 1320 322 L 1292 305 L 1262 288 L 1235 270 L 1212 255 Z",
    },
    // ─── INDIA SUB-CONTINENT ───
    {
      id: "india",
      d: "M 1410 395 L 1448 405 L 1482 425 L 1502 455 L 1510 490 L 1498 525 L 1478 548 L 1452 558 L 1425 548 L 1402 520 L 1388 488 L 1385 450 L 1395 415 Z",
    },
    // ─── SOUTHEAST ASIA / INDOCHINA ───
    {
      id: "sea-mainland",
      d: "M 1520 412 L 1548 408 L 1575 420 L 1592 445 L 1595 472 L 1580 495 L 1558 505 L 1538 498 L 1522 478 L 1515 452 L 1515 430 Z",
    },
    // ─── INDONESIA (Sumatra + Java) ───
    {
      id: "indonesia-sumatra",
      d: "M 1548 528 L 1588 525 L 1618 540 L 1625 558 L 1608 572 L 1575 572 L 1548 560 L 1540 542 Z",
    },
    // ─── INDONESIA (Borneo + Sulawesi) ───
    {
      id: "indonesia-borneo",
      d: "M 1635 520 L 1668 518 L 1692 530 L 1700 552 L 1688 568 L 1660 570 L 1638 558 L 1632 538 Z",
    },
    // ─── PHILIPPINES ───
    {
      id: "philippines",
      d: "M 1720 480 L 1735 478 L 1742 498 L 1738 518 L 1725 522 L 1715 505 L 1715 490 Z",
    },
    // ─── JAPAN ───
    {
      id: "japan",
      d: "M 1755 290 L 1778 285 L 1795 302 L 1800 328 L 1790 352 L 1770 362 L 1752 348 L 1748 322 L 1750 302 Z",
    },
    // ─── AUSTRALIA ───
    {
      id: "australia",
      d: "M 1645 700 L 1700 688 L 1755 682 L 1808 688 L 1852 702 L 1880 728 L 1888 758 L 1878 788 L 1848 808 L 1808 818 L 1760 818 L 1712 812 L 1672 798 L 1645 778 L 1632 752 L 1632 725 Z",
    },
    // ─── NEW ZEALAND (north + south island) ───
    {
      id: "new-zealand-north",
      d: "M 1898 808 L 1915 808 L 1925 825 L 1918 842 L 1902 842 L 1895 825 Z",
    },
    {
      id: "new-zealand-south",
      d: "M 1878 835 L 1895 835 L 1905 852 L 1898 870 L 1882 870 L 1872 855 Z",
    },
    // ─── ANTARCTICA rim ───
    {
      id: "antarctica",
      d: "M 200 935 L 400 925 L 600 922 L 800 925 L 1000 928 L 1200 925 L 1400 922 L 1600 925 L 1800 932 L 1880 945 L 1850 960 L 1700 968 L 1500 972 L 1300 970 L 1100 972 L 900 970 L 700 968 L 500 965 L 300 960 L 180 952 Z",
    },
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-0 flex items-center justify-center"
    >
      <svg
        viewBox="0 0 2000 1000"
        className="w-full h-full max-w-[1600px]"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        <defs>
          {/* Soft outer glow filter — used on the widest blur halo layer */}
          <filter id="wm-outer-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <filter id="wm-mid-glow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="2.2" />
          </filter>

          {/* Shared group — every continent path referenced by id */}
          <g id="world-continents">
            {paths.map((p) => (
              <path key={p.id} d={p.d} />
            ))}
          </g>
        </defs>

        {/*
          Rendering order (bottom → top):
          1) Subtle interior fill so the continent silhouettes are
             faintly suggested as areas.
          2) Thick wide soft-blurred white glow — the "aura".
          3) Mid white halo — a tighter but still soft stroke.
          4) Crisp thin white outline — the final hairline edge.
        */}

        {/* 1 — interior fill */}
        <use
          href="#world-continents"
          fill="#ffffff"
          opacity="0.035"
        />

        {/* 2 — outer soft glow */}
        <use
          href="#world-continents"
          fill="none"
          stroke="#ffffff"
          strokeWidth="4"
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity="0.22"
          filter="url(#wm-outer-glow)"
        />

        {/* 3 — mid halo */}
        <use
          href="#world-continents"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity="0.5"
          filter="url(#wm-mid-glow)"
        />

        {/* 4 — crisp hairline edge */}
        <use
          href="#world-continents"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.1"
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity="0.72"
        />
      </svg>
    </div>
  );
}

export const TestimonialCarousel = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-reveal observer for [data-reveal] inside this section
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    const targets = root.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!targets.length) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="hss-testimonial-theater relative z-10 py-16 md:py-22 lg:py-24"
      aria-labelledby="testimonials-heading"
    >
      {/* Ambient glows */}
      <div aria-hidden="true" className="hss-testimonial-glow-left" />
      <div aria-hidden="true" className="hss-testimonial-glow-right" />

      {/* NEW — dotted world map backdrop in purple-gray at low opacity */}
      <WorldMapBackdrop />

      <div className="relative z-10 container mx-auto px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-10 lg:mb-14">
          <span
            data-reveal
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#1E293B]/12 bg-white/70 mb-5 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#d96c4a]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#d96c4a]">
              Testimonials
            </span>
          </span>
          <h2
            id="testimonials-heading"
            data-reveal
            style={{ "--reveal-delay": "100ms" } as React.CSSProperties}
            className="text-4xl md:text-5xl lg:text-[3rem] font-extrabold text-[#1E293B] leading-[1.05] tracking-tight mb-3 mt-4"
          >
            What families are saying
          </h2>
          {/* Darker subtitle — reads clearly on the light mesh background */}
          <p
            data-reveal
            style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
            className="text-[#475569] text-base md:text-lg max-w-xl mx-auto leading-relaxed font-medium"
          >
            Real stories from Ohio families we&rsquo;ve helped protect.
          </p>
        </div>

        {/* Mini fade-in cards grid — many testimonials, hover to reveal.
            4 per row on xl so we can pack 12 into a 3-row grid. */}
        <div
          data-reveal
          style={{ "--reveal-delay": "300ms" } as React.CSSProperties}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto"
        >
          {testimonials.map((t, i) => {
            const isHovered = hoveredIdx === i;
            const anyHovered = hoveredIdx !== null;
            // Staggered rise delay so they don't all pop in at once
            const riseDelay = `${(i % 4) * 60 + Math.floor(i / 4) * 80}ms`;
            return (
              <figure
                key={t.name}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{ transitionDelay: anyHovered ? "0ms" : riseDelay }}
                className={[
                  "group relative rounded-xl p-3 md:p-3.5",
                  "bg-white/85 backdrop-blur-md border border-[#1E293B]/8",
                  "shadow-[0_6px_18px_-10px_rgba(15,23,42,0.15)]",
                  "transition-all duration-[600ms]",
                  "ease-[cubic-bezier(0.22,1,0.36,1)]",
                  // Smart appear/disappear: when any card is hovered,
                  // unhovered cards dim + shrink and slightly recede,
                  // hovered card floats forward with a warm glow.
                  anyHovered
                    ? isHovered
                      ? "opacity-100 scale-[1.04] -translate-y-1.5 shadow-[0_18px_44px_-14px_rgba(217,108,74,0.35),0_4px_14px_-4px_rgba(15,23,42,0.14)] border-[#d96c4a]/30 z-10"
                      : "opacity-25 scale-[0.97] blur-[0.5px]"
                    : "opacity-90 hover:opacity-100",
                ].join(" ")}
              >
                {/* Floating quote badge — very small */}
                <div
                  aria-hidden="true"
                  className={[
                    "absolute -top-2 -left-2 w-7 h-7 rounded-lg bg-gradient-to-br from-[#d96c4a] to-[#b8552f]",
                    "flex items-center justify-center shadow-[0_4px_12px_-4px_rgba(217,108,74,0.5)] border border-white/30",
                    "transition-all duration-[600ms] ease-out",
                    isHovered ? "rotate-[-8deg] scale-110" : "rotate-0 scale-100",
                  ].join(" ")}
                >
                  <Quote className="w-3 h-3 text-white" strokeWidth={2.5} />
                </div>

                {/* Stars row */}
                <div className="flex gap-0.5 mb-1.5 mt-0.5 ml-6">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="w-2.5 h-2.5 fill-[#d96c4a] text-[#d96c4a]"
                    />
                  ))}
                </div>

                {/* Quote — clamped to keep every card compact + uniform */}
                <blockquote className="text-[11px] md:text-[11.5px] text-[#475569] leading-snug mb-2.5 italic font-light line-clamp-3">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {/* Author row — tight */}
                <figcaption className="flex items-center gap-2 pt-2 border-t border-[#1E293B]/8">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-7 h-7 rounded-full object-cover border border-white shadow-sm flex-shrink-0"
                    loading="lazy"
                    decoding="async"
                    width={28}
                    height={28}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-[#1E293B] text-[10px] leading-tight truncate">
                      {t.name}
                    </div>
                    <div className="text-[9px] text-[#64748B] truncate">
                      {t.location}
                    </div>
                  </div>
                </figcaption>

                {/* Tag pill — appears on hover */}
                <div
                  className={[
                    "absolute top-2 right-2 inline-flex items-center px-1.5 py-px rounded-full",
                    "text-[8px] font-bold uppercase tracking-wider whitespace-nowrap",
                    "bg-[#d96c4a]/12 text-[#d96c4a] border border-[#d96c4a]/25",
                    "transition-all duration-[600ms] ease-out",
                    isHovered ? "opacity-100 translate-y-0" : "opacity-60 translate-y-0.5",
                  ].join(" ")}
                >
                  {t.tag}
                </div>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
};
