import type { CSSProperties } from "react";

const images = [
  { src: "/logos/marquee/tab32.png", alt: "Tab32", hf: "1.446" },
  { src: "/logos/marquee/carestack.png", alt: "CareStack", hf: "1.071" },
  { src: "/logos/marquee/curve.png", alt: "Curve", hf: "1.411" },
  { src: "/logos/marquee/dentrix.png", alt: "Dentrix", hf: "1.143" },
  { src: "/logos/marquee/eaglesoft.png", alt: "EagleSoft", hf: "1.429" },
  { src: "/logos/marquee/maxident.png", alt: "Maxident", hf: "1.161" },
  { src: "/logos/marquee/opendental.png", alt: "Open Dental", hf: "1.339" },
  { src: "/logos/marquee/planetdds.png", alt: "Planet DDS", hf: "1.375" },
  { src: "/logos/marquee/sensei.png", alt: "Sensei", hf: "1.321" },
];

export default function Marquee() {
  return (
    <div className="relative overflow-hidden w-full marquee-wrapper" style={{ marginTop: '2.5rem' }}>
      <style>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .marquee-wrapper {
          --base: 56px;
          position: relative;
          padding: 0.25rem 0;
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        /* Hairline rules above/below (faded by the parent edge mask) */
        .marquee-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            to right,
            transparent,
            rgba(255, 255, 255, 0.08) 20%,
            rgba(255, 255, 255, 0.08) 80%,
            transparent
          );
          pointer-events: none;
        }
        .marquee-line-top {
          top: 0;
        }
        .marquee-line-bottom {
          bottom: 0;
        }

        /* Track holds two identical groups; -50% lands exactly
           on the second group's start for a seamless loop */
        .marquee-track {
          display: flex;
          width: max-content;
          font-size: 0;
          animation: marquee 40s linear infinite;
          will-change: transform;
        }

        .marquee-group {
          --mgap: 5rem;
          display: flex;
          align-items: center;
          gap: var(--mgap);
          padding-right: var(--mgap);
        }

        .marquee-item {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          height: calc(var(--base) * 1.88);
        }

        .marquee-logo {
          display: block;
          height: calc(var(--base) * var(--lhf, 1));
          width: auto;
          max-width: none;
          object-fit: contain;
          opacity: 0.85;
          transition: opacity 300ms ease;
        }

        .marquee-item:hover .marquee-logo {
          opacity: 1;
        }

        /* Tablet */
        @media (max-width: 768px) {
          .marquee-wrapper {
            --base: 46px;
            padding: 0.25rem 0;
          }
          .marquee-group {
            --mgap: 3rem;
          }
        }

        /* Mobile */
        @media (max-width: 480px) {
          .marquee-wrapper {
            --base: 40px;
            padding: 0.25rem 0;
            -webkit-mask-image: linear-gradient(
              to right,
              transparent 0%,
              black 12%,
              black 88%,
              transparent 100%
            );
            mask-image: linear-gradient(
              to right,
              transparent 0%,
              black 12%,
              black 88%,
              transparent 100%
            );
          }
          .marquee-group {
            --mgap: 2.25rem;
          }
        }

        /* Respect prefers-reduced-motion: static readable strip */
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
          .marquee-logo {
            opacity: 1;
            transition: none;
          }
        }
      `}</style>
      <div className="marquee-line marquee-line-top" />
      <div className="marquee-line marquee-line-bottom" />
      <div className="marquee-track">
        <div className="marquee-group">
          {images.map((img) => (
            <div key={img.alt} className="marquee-item">
              <img
                src={img.src}
                alt={img.alt}
                className="marquee-logo"
                style={{ "--lhf": img.hf } as CSSProperties}
                loading="eager"
                decoding="async"
                draggable={false}
              />
            </div>
          ))}
        </div>
        <div className="marquee-group" aria-hidden="true">
          {images.map((img) => (
            <div key={`${img.alt}-dup`} className="marquee-item">
              <img
                src={img.src}
                alt=""
                className="marquee-logo"
                style={{ "--lhf": img.hf } as CSSProperties}
                loading="eager"
                decoding="async"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
