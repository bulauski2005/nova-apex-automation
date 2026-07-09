import { useRef, useLayoutEffect } from "react";

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

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measureAndSetAnimation = () => {
      const items = Array.from(track.querySelectorAll(".marquee-item"));
      if (items.length === 0) return;

      const firstItem = items[0] as HTMLElement;
      const lastItemOfFirstSet = items[images.length - 1] as HTMLElement;

      const firstSetWidth =
        lastItemOfFirstSet.offsetLeft +
        lastItemOfFirstSet.offsetWidth -
        firstItem.offsetLeft;

      if (firstSetWidth > 0) {
        track.style.setProperty("--marquee-distance", `-${firstSetWidth}px`);
      }
    };

    const imgs = Array.from(track.querySelectorAll<HTMLImageElement>("img"));
    let loaded = 0;

    const onImageLoad = () => {
      loaded++;
      if (loaded === imgs.length) {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            measureAndSetAnimation();
          });
        });
      }
    };

    if (imgs.length === 0) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          measureAndSetAnimation();
        });
      });
    } else {
      imgs.forEach((img) => {
        if (img.complete) onImageLoad();
        else img.addEventListener("load", onImageLoad, { once: true });
      });
    }

    const resizeObserver = new ResizeObserver(() => {
      requestAnimationFrame(() => {
        measureAndSetAnimation();
      });
    });

    resizeObserver.observe(track);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="relative overflow-hidden w-full marquee-wrapper">
      <style>{`
        @keyframes marquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(var(--marquee-distance, -50%), 0, 0);
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
          gap: 8rem;
          animation: marquee 30s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
          transform: translateZ(0);
        }
        .marquee-item {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: 6rem;
          width: 14rem;
          position: relative;
        }
        .marquee-item::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse at center,
            rgba(3, 225, 234, 0.07) 0%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 0;
        }
        .marquee-logo {
          position: relative;
          z-index: 1;
          max-height: 100%;
          max-width: 100%;
          object-fit: contain;
          opacity: 0.9;
          filter: grayscale(100%) brightness(1.15);
        }
      `}</style>
      <div ref={trackRef} className="marquee-track">
        {[...images, ...images].map((img, i) => (
          <div key={i} className="marquee-item">
            <img
              src={img.src}
              alt={img.alt}
              className="marquee-logo"
              width={200}
              height={56}
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
