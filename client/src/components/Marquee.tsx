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
    <div className="relative overflow-hidden w-full group">
      <div className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
        {[...images, ...images].map((img, i) => (
          <div key={i} className="inline-flex items-center justify-center mx-10 h-16 w-40 grayscale hover:grayscale-0 transition-all duration-300">
            <img
              src={img.src}
              alt={img.alt}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
