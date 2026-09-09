const images = [
  { src: "/images/partners/Tab32.svg", alt: "Tab32" },
  { src: "/images/partners/axiUm.svg", alt: "axiUm" },
  { src: "/images/partners/Care-Stack.svg", alt: "Care Stack" },
  { src: "/images/partners/curve.svg", alt: "Curve" },
  { src: "/images/partners/Dentrix.svg", alt: "Dentrix" },
  { src: "/images/partners/Eagle-soft.svg", alt: "Eagle Soft" },
  { src: "/images/partners/Maxi-dent.svg", alt: "Maxi-dent" },
  { src: "/images/partners/open-dental-3.svg", alt: "Open Dental" },
  { src: "/images/partners/Sensei-Clouds.svg", alt: "Sensei Clouds" },
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
          position: relative;
          padding: 2.5rem 0;
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

        /* Extremely subtle blue ambient light behind the logos */
        .marquee-wrapper::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: min(880px, 92%);
          height: 150%;
          background: radial-gradient(
            closest-side,
            rgba(59, 130, 246, 0.055),
            rgba(59, 130, 246, 0.018) 45%,
            transparent 72%
          );
          pointer-events: none;
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
          height: 56px;
        }

        .marquee-logo {
          display: block;
          height: 38px;
          width: auto;
          max-width: none;
          object-fit: contain;
          opacity: 0.85;
          filter: grayscale(1);
          transition: opacity 300ms ease, filter 300ms ease;
        }

        .marquee-item:hover .marquee-logo {
          opacity: 1;
          filter: grayscale(0);
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        /* Tablet */
        @media (max-width: 768px) {
          .marquee-wrapper {
            padding: 2rem 0;
          }
          .marquee-group {
            --mgap: 3rem;
          }
          .marquee-item {
            height: 48px;
          }
          .marquee-logo {
            height: 30px;
          }
        }

        /* Mobile */
        @media (max-width: 480px) {
          .marquee-wrapper {
            padding: 1.5rem 0;
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
          .marquee-item {
            height: 44px;
          }
          .marquee-logo {
            height: 26px;
          }
        }

        /* Respect prefers-reduced-motion: static readable strip */
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
          .marquee-logo {
            opacity: 1;
            filter: grayscale(0);
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
