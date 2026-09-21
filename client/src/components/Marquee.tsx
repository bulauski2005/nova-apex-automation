import React from "react";

const logos = [
  { src: "https://cdn.brandfetch.io/opendental.com/logo?c=1id9gSQYSNw8Mf4xwCA", alt: "Open Dental Software" },
  { src: "https://cdn.brandfetch.io/carestack.com/logo?c=1id9gSQYSNw8Mf4xwCA", alt: "CareStack" },
  { src: "/Tab32-Photoroom.png", alt: "Tab32" },
  { src: "/Curve-Dental-Photoroom.png", alt: "Curve Dental" },
  { src: "https://cdn.brandfetch.io/planetdds.com/logo?c=1id9gSQYSNw8Mf4xwCA", alt: "Planet DDS" },
  { src: "https://cdn.brandfetch.io/myoryx.com/logo?c=1id9gSQYSNw8Mf4xwCA", alt: "Oryx Dental" },
  { src: "https://cdn.brandfetch.io/dentimax.com/logo?c=1id9gSQYSNw8Mf4xwCA", alt: "DentiMax" }
];

const Marquee = () => {
  return (
    <div className="marquee-container">
      <style>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .marquee-container {
          --base: 48px;
          --mgap: 5rem;
          --mspeed: 40s;
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 0.5rem 0;
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

        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee var(--mspeed) linear infinite;
          will-change: transform;
        }

        .marquee-group {
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
          height: calc(var(--base) * 1.67);
        }

        .marquee-logo {
          display: block;
          height: var(--base);
          width: auto;
          max-width: none;
          object-fit: contain;
          filter: brightness(0) invert(0.633);
          transition: filter 300ms ease;
        }

        .marquee-item:hover .marquee-logo,
        .marquee-item:focus-visible .marquee-logo {
          filter: none;
        }

        /* Tablet */
        @media (max-width: 768px) {
          .marquee-container {
            --base: 42px;
            padding: 0.25rem 0;
          }
          .marquee-group {
            --mgap: 3rem;
          }
        }

        /* Mobile */
        @media (max-width: 480px) {
          .marquee-container {
            --base: 38px;
            padding: 0.25rem 0;
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
            filter: brightness(0) invert(0.633);
          }
        }
      `}</style>
      <div className="marquee-track">
        <div className="marquee-group">
          {logos.map((logo) => (
            <div key={logo.alt} className="marquee-item">
              <img
                src={logo.src}
                alt={logo.alt}
                className="marquee-logo"
                loading="eager"
                decoding="async"
                draggable={false}
              />
            </div>
          ))}
        </div>
        <div className="marquee-group" aria-hidden="true">
          {logos.map((logo) => (
            <div key={`${logo.alt}-dup`} className="marquee-item">
              <img
                src={logo.src}
                alt=""
                className="marquee-logo"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Marquee;
