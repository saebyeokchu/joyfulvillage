import React, { useState, useEffect, useRef } from "react";
import Image from 'next/image'


const MobileSlider = ({
  images,
  autoPlay
} : {
  images : string[] ,
  autoPlay : boolean
}) => {
  const [index, setIndex] = useState(1); // Start at first cloned slide
  const transitionRef = useRef(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Clone first and last slides
  const extendedSlides = [
    images[images.length - 1], // Last slide (cloned at the beginning)
    ...images,
    images[0], // First slide (cloned at the end)
  ];

  const handleNext = () => {
    setIndex((prev) => prev + 1);
  };

  const setAutoPlay = () => {
    intervalRef.current = setInterval(handleNext, 3000); // Auto-slide every 3 seconds
    return () => clearInterval(intervalRef.current!); // Cleanup on unmount
  }

  useEffect(() => {
    if(autoPlay){
      setAutoPlay();
    }
  }, []);

  useEffect(() => {
    // Smooth transition reset
    if (index === extendedSlides.length - 1) {
      setTimeout(() => {
        transitionRef.current = false;
        setIndex(1); // Reset to first real slide
      }, 500);
    }
    if (index === 0) {
      setTimeout(() => {
        transitionRef.current = false;
        setIndex(extendedSlides.length - 2); // Reset to last real slide
      }, 500);
    }
    transitionRef.current = true;
  }, [index]);

  return (
    <div className="relative w-full max-w-2xl mx-auto overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${index * 100}%)`,
          transition: transitionRef.current ? "transform 0.5s ease-in-out" : "none",
        }}
      >
        {extendedSlides.map((slide, i) => (
          // <div
          //   key={i}
          //   // className={`w-full min-w-full h-64 flex items-center justify-center text-white text-2xl font-bold ${slide.bgColor}`}
          // >
          //   {slide.content}
          <img key={i} src={`/images/${slide}`} width={800} height={500} className="object-cover" />
          // <Image key={i} src={`${slide}`} layout="intrinsic" width={800} height={500} alt={`slider-${i}`} className="object-cover"/>

          // </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, i) => (
          <button
            key={i}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              index === i + 1 ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => setIndex(i + 1)}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileSlider;