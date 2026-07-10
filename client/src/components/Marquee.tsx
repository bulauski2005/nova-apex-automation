import { useRef, useLayoutEffect } from "react";

const images = [
  { src: "/images/partners/Planet-DDS-2s.png", alt: "Planet DDS" },
  { src: "/images/partners/Eagle-soft.png", alt: "Eagle Soft" },
  { src: "/images/partners/Care-Stack.png", alt: "Care Stack" },
  { src: "/images/partners/axiUm.jpg", alt: "axiUm", xl: true },
  { src: "/images/partners/open-dental-3.png", alt: "Open Dental" },
  { src: "/images/partners/Dentrix.png", alt: "Dentrix" },
  { src: "/images/partners/curve.jpg", alt: "Curve", xl: true },
  { src: "/images/partners/Tab32.png", alt: "Tab32" },
  { src: "/images/partners/Sensei-Clouds.png", alt: "Sensei Clouds" },
  { src: "/images/partners/Maxi-dent.png", alt: "Maxi-dent" },
  { src: "/images/partners/Ace-dental.png", alt: "Ace Dental" },
];

const IMAGE_LOAD_TIMEOUT = 2000; // ms
const BASE_SPEED_MULTIPLIER = 1; // seconds per 100px of marquee width

export default function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measureAndSetAnimation = () => {
      const items = Array.from(track.querySelectorAll(".marquee-item"));
      if (items.length === 0) return;

      const firstItem = items[0] as HTMLElement;
      const firstItemOfSecondSet = items[images.length] as HTMLElement;

      const firstSetWidth =
        firstItemOfSecondSet.offsetLeft -
        firstItem.offsetLeft;

      if (firstSetWidth > 0) {
        // Calculate animation duration based on distance for consistent speed
        const animationDuration = (firstSetWidth / 100) * BASE_SPEED_MULTIPLIER;

        track.style.setProperty("--marquee-distance", `-${firstSetWidth}px`);
        track.style.setProperty(
          "--marquee-duration",
          `${animationDuration}s`
        );
      }
    };

    const imgs = Array.from(track.querySelectorAll<HTMLImageElement>("img"));
    let loaded = 0;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const handleAnimationStart = () => {
      if (timeoutId) clearTimeout(timeoutId);
      requestAnimationFrame(() => {
        measureAndSetAnimation();
      });
    };

    const onImageLoad = () => {
      loaded++;
      if (loaded === imgs.length) {
        handleAnimationStart();
      }
    };

    // Set timeout fallback in case images fail to load
    timeoutId = setTimeout(() => {
      console.warn("Marquee: Image load timeout, starting animation anyway");
      handleAnimationStart();
    }, IMAGE_LOAD_TIMEOUT);

    if (imgs.length === 0) {
      handleAnimationStart();
    } else {
      imgs.forEach((img) => {
        if (img.complete) {
          onImageLoad();
        } else {
          img.addEventListener("load", onImageLoad, { once: true });
          img.addEventListener("error", () => {
            console.warn(`Failed to load image: ${img.src}`);
            onImageLoad(); // Still count it so animation eventually starts
          }, { once: true });
        }
      });
    }

    // Recalculate on window resize
    const resizeObserver = new ResizeObserver(() => {
      measureAndSetAnimation();
    });

    resizeObserver.observe(track);

    return () => {
      resizeObserver.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="relative overflow-hidden w-full marquee-wrapper" style={{ marginTop: '30vh' }}>
      <style>{`
        @keyframes marquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(var(--marquee-distance, 0px),0,0);
          }
        }

        .marquee-wrapper {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
        }

        .marquee-track {
          display: flex;
          gap: 6rem;
          animation: marquee var(--marquee-duration, 30s) linear infinite;
          will-change: transform;
          backface-visibility: hidden;
          transform: translateZ(0);
        }

        .marquee-item {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 257px;
          height: 129px;
          padding: 0;
        }

        .marquee-pill {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          position: relative;
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.06);
          transition: transform 350ms ease;
        }

        .marquee-item:hover .marquee-pill {
          border-color: transparent;
          background: transparent;
          transform: translateY(-2px) scale(1.03);
        }

        .marquee-logo {
          position: relative;
          z-index: 1;
          max-width: 218px;
          max-height: 69px;
          width: auto;
          height: auto;
          object-fit: contain;
          opacity: 0.8;
          filter: grayscale(100%);
          transition: opacity 350ms ease, transform 350ms ease, filter 350ms ease;
        }

        .marquee-item:hover .marquee-logo {
          opacity: 1;
          filter: none;
          transform: scale(1.15);
        }

        [data-xl="true"] {
          max-width: 262px;
          max-height: 83px;
        }

        /* Respect prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
            transform: translateX(0);
          }
          .marquee-logo {
            transition: none;
          }
        }
      `}</style>
      <div ref={trackRef} className="marquee-track">
        {[...images, ...images].map((img, i) => (
          <div key={`${img.alt}-${i}`} className="marquee-item">
            <div className="marquee-pill">
              <img
                src={img.src}
                alt={img.alt}
                className="marquee-logo"
                width={200}
                height={56}
                loading="eager"
                decoding="async"
                draggable={false}
                data-xl={img.xl ? "true" : undefined}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
