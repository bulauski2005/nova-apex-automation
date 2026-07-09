import { useRef, useEffect } from "react";

const images = [
  { src: "/images/partners/planet-dds.png", alt: "Planet DDS" },
  { src: "/images/partners/Eagle-soft.png", alt: "Eagle Soft" },
  { src: "/images/partners/Care-Stack.png", alt: "Care Stack" },
  { src: "/images/partners/curve.jpg", alt: "Curve" },
  { src: "/images/partners/axiUm.jpg", alt: "axiUm" },
  { src: "/images/partners/open-dental-2.jpg", alt: "Open Dental" },
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
    const step = () => {
      offset -= 0.5;
      const setWidth = track.scrollWidth / 4;
      if (Math.abs(offset) >= setWidth) offset += setWidth;
      track.style.transform = `translateX(${offset}px)`;
      requestAnimationFrame(step);
    };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="relative overflow-hidden w-full">
      <div
        ref={trackRef}
        style={{
          display: "flex"
        }}
      >
        {[...images, ...images, ...images, ...images].map((img, i) => (
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
