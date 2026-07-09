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
  return (
    <>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .scroll-track {
          animation: scroll 40s linear infinite;
        }
        .scroll-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div className="relative overflow-hidden w-full">
        <div className="flex scroll-track">
          {[...images, ...images].map((img, i) => (
            <div key={i} className="inline-flex items-center justify-center mx-16 h-24 w-56 grayscale hover:grayscale-0 transition-all duration-300 flex-shrink-0">
              <img
                src={img.src}
                alt={img.alt}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
