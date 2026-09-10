const images = [
  { src: "/logos/marquee/planetdds.png", alt: "Planet DDS" },
  { src: "/logos/marquee/dentrix.png", alt: "Dentrix" },
  { src: "/logos/marquee/maxident.png", alt: "Maxident" },
  { src: "/logos/marquee/curve.png", alt: "Curve" },
  { src: "/logos/marquee/carestack.png", alt: "CareStack" },
  { src: "/logos/marquee/sensei.png", alt: "Sensei" },
  { src: "/logos/marquee/tab32.png", alt: "Tab32" },
  { src: "/logos/marquee/opendental.png", alt: "Open Dental" },
  { src: "/logos/marquee/eaglesoft.png", alt: "EagleSoft" },
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
          height: 64px;
        }

        .marquee-logo {
          display: block;
          height: 56px;
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

        /* Tablet */
        @media (max-width: 768px) {
          .marquee-wrapper {
            padding: 2rem 0;
          }
          .marquee-group {
            --mgap: 3rem;
          }
          .marquee-item {
            height: 52px;
          }
          .marquee-logo {
            height: 46px;
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
            height: 40px;
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
