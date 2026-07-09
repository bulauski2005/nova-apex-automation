import { useEffect } from "react";

const images = [
  { src: "/images/partners/planet-dds.png", alt: "Planet DDS" },
  { src: "/images/partners/Eagle-soft.png", alt: "Eagle Soft" },
  { src: "/images/partners/Care-Stack.png", alt: "Care Stack" },
  { src: "/images/partners/curve.jpg", alt: "Curve" },
  { src: "/images/partners/denticon.png", alt: "Denticon" },
  { src: "/images/partners/Open-Dental.png", alt: "Open Dental" },
  { src: "/images/partners/Dentrix.png", alt: "Dentrix" },
];

export default function Marquee() {
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `@keyframes scroll{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}`;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);
  return (
    <div className="relative overflow-hidden w-full">
      <div
        style={{
          display: "flex",
          animation: "scroll 40s linear infinite"
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
              flexShrink: 0,
              borderRadius: "0.5rem",
              border: "2px solid #03e1ea",
              filter: "grayscale(100%)"
            }}
          >
            <img
              src={img.src}
              alt={img.alt}
              style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
