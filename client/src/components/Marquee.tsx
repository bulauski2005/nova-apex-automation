import { useRef, useEffect } from "react";

const images = [
  { src: "/images/partners/Planet-DDS-2s.png", alt: "Planet DDS" },
  { src: "/images/partners/Eagle-soft.png", alt: "Eagle Soft" },
  { src: "/images/partners/Care-Stack.png", alt: "Care Stack" },
  { src: "/images/partners/curve.jpg", alt: "Curve" },
  { src: "/images/partners/axiUm.jpg", alt: "axiUm" },
  { src: "/images/partners/open-dental-3.png", alt: "Open Dental" },
  { src: "/images/partners/Dentrix.png", alt: "Dentrix" },
  { src: "/images/partners/Tab32.png", alt: "Tab32" },
  { src: "/images/partners/Sensei-Clouds.png", alt: "Sensei Clouds" },
  { src: "/images/partners/Maxi-dent.png", alt: "Maxi-dent" },
  { src: "/images/partners/Ace-dental.png", alt: "Ace Dental" },
];

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let offset = 0;
    let firstSetWidth = 0;
    let rafId = 0;

    const animate = () => {
      offset -= 0.5;
      if (Math.abs(offset) >= firstSetWidth) offset = 0;
      track.style.transform = `translate3d(${offset}px,0,0)`;
      rafId = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      // Measure the width AFTER layout settles
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          // Get width of just one set of images (not half of scrollWidth)
          const items = Array.from(track.querySelectorAll(".marquee-item"));
          if (items.length > 0) {
            const firstItem = items[0] as HTMLElement;
            const lastItem = items[images.length - 1] as HTMLElement;
            firstSetWidth =
              lastItem.offsetLeft + lastItem.offsetWidth - firstItem.offsetLeft;
          }
          if (firstSetWidth > 0) {
            rafId = requestAnimationFrame(animate);
          }
        });
      });
    };

    const imgs = Array.from(track.querySelectorAll<HTMLImageElement>("img"));
    let loaded = 0;

    const check = () => {
      loaded++;
      if (loaded === imgs.length) {
        startAnimation();
      }
    };

    if (imgs.length === 0) {
      startAnimation();
    } else {
      imgs.forEach((img) => {
        if (img.complete) check();
        else img.addEventListener("load", check, { once: true });
      });
    }

    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="relative overflow-hidden w-full">
      <style>{`
        .marquee-track {
          display: flex;
          will-change: transform;
          backface-visibility: hidden;
        }
        .marquee-pill {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 1.75rem;
          height: 3.75rem;
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          box-shadow: 0 4px 12px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.04);
          transition: border-color 250ms ease, box-shadow 250ms ease, transform 250ms ease;
        }
        .marquee-pill:hover {
          border-color: #03E1EA;
          box-shadow: 0 8px 24px rgba(3,225,234,0.18);
          transform: translateY(-2px);
        }
        .marquee-logo {
          max-height: 100%;
          max-width: 100%;
          object-fit: contain;
          opacity: 0.7;
          filter: grayscale(100%) brightness(1.1);
          transition: opacity 250ms ease, filter 250ms ease;
        }
        .marquee-pill:hover .marquee-logo {
          opacity: 1;
        }
      `}</style>
      <div ref={trackRef} className="marquee-track">
        {[...images, ...images].map((img, i) => (
            <div
              key={i}
              className="marquee-item inline-flex items-center justify-center mx-16 h-24 w-56 flex-shrink-0"
            >
            <div className="marquee-pill">
              <img src={img.src} alt={img.alt} className="marquee-logo" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
