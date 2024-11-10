// components/common/Slider/ImageCarousel.tsx
import { useState, useEffect } from "react";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";
import styles from "..//..//../styles/imageCarousel.module.css"; // Correct import path

interface CarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transitionDirection, setTransitionDirection] = useState("next");

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setTransitionDirection("next");
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setTransitionDirection("prev");
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div className={styles.carouselContainer} {...handlers}>
      <div
        className={`${styles.slides} ${
          transitionDirection === "next" ? styles.slideNext : styles.slidePrev
        }`}
        key={currentIndex}
      >
        <Image
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          fill
          style={{ objectFit: "cover" }} // Ensure images fill the container
          priority
        />
      </div>

      {/* Dots */}
      <div className={styles.dotsContainer}>
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`${styles.dot} ${
              idx === currentIndex ? styles.activeDot : ""
            }`}
            onClick={() => {
              setTransitionDirection(idx > currentIndex ? "next" : "prev");
              setCurrentIndex(idx);
            }}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
