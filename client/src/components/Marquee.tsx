import { useEffect } from "react";

const images = [
  { src: "/images/partners/planet-dds.png", alt: "Planet DDS" },
  { src: "/images/partners/Eagle-soft.png", alt: "Eagle Soft" },
  { src: "/images/partners/Care-Stack.png", alt: "Care Stack" },
  { src: "/images/partners/curve.jpg", alt: "Curve" },
  { src: "/images/partners/axiUm.jpg", alt: "axiUm" },
  { src: "/images/partners/Open-Dental.png", alt: "Open Dental" },
  { src: "/images/partners/Dentrix.png", alt: "Dentrix" },
  { src: "/images/partners/Tab32.png", alt: "Tab32" },
  { src: "/images/partners/Sensei-Clouds.png", alt: "Sensei Clouds" },
];

export default function Marquee() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `@keyframes scroll{0%{transform:translate3d(0,0,0)}100%{transform:translate3d(-50%,0,0)}}`;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);
  return (
    <div className="relative overflow-hidden w-full">
      <div
        style={{
          display: "flex",
          animation: "scroll 40s linear infinite",
          willChange: "transform"
        }}
      >
        {[...images, ...images].map((img, i) => (
          <div
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 4rem",
              height: "6rem",
              width: "14rem",
              flexShrink: 0
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "0 1.5rem",
                height: "3.5rem",
                borderRadius: "9999px",
                border: "2px solid rgba(3,225,234,0.5)",
                background: "transparent"
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                style={{
                  maxHeight: "100%",
                  maxWidth: "100%",
                  objectFit: "contain",
                  opacity: 0.85,
                  filter: "grayscale(100%)"
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
