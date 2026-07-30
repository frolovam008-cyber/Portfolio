"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  PanInfo,
} from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import styles from "@/components/Projects/ProjectSlider/ProjectSlider.module.css";

export type ProjectImage = {
  src: string;
  title?: string;
};

type ProjectSliderProps = {
  images: ProjectImage[];
  alt: string;
};

const AUTOPLAY_DELAY = 5000;
const SWIPE_OFFSET = 50;

export default function ProjectSlider({
  images,
  alt,
}: ProjectSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1);

  const imagesCount = images.length;

  const showNextImage = () => {
    setDirection(1);

    setCurrentIndex((current) =>
      current === imagesCount - 1 ? 0 : current + 1
    );
  };

  const showPreviousImage = () => {
    setDirection(-1);

    setCurrentIndex((current) =>
      current === 0 ? imagesCount - 1 : current - 1
    );
  };

  const showImage = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (
      isPaused ||
      imagesCount <= 1
    ) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setDirection(1);

      setCurrentIndex((current) =>
        current === imagesCount - 1
          ? 0
          : current + 1
      );
    }, AUTOPLAY_DELAY);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isPaused, imagesCount]);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x < -SWIPE_OFFSET) {
      showNextImage();
    }

    if (info.offset.x > SWIPE_OFFSET) {
      showPreviousImage();
    }
  };

  if (imagesCount === 0) {
    return null;
  }

  const currentImage = images[currentIndex];

  return (
    <div
      className={styles.slider}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <AnimatePresence
        initial={false}
        custom={direction}
        mode="popLayout"
      >
        <motion.div
          key={`${currentImage.src}-${currentIndex}`}
          custom={direction}
          className={styles.slide}
          initial={{
            opacity: 0,
            x: direction > 0 ? 60 : -60,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          exit={{
            opacity: 0,
            x: direction > 0 ? -60 : 60,
          }}
          transition={{
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          }}
          drag={imagesCount > 1 ? "x" : false}
          dragConstraints={{
            left: 0,
            right: 0,
          }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
        >
          <Image
            src={currentImage.src}
            alt={
              currentImage.title
                ? `${alt} — ${currentImage.title}`
                : `${alt} — изображение ${currentIndex + 1}`
            }
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={styles.image}
          />
        </motion.div>
      </AnimatePresence>

      <div className={styles.overlay} />

      {imagesCount > 1 && (
        <>
          <button
            type="button"
            className={`${styles.arrow} ${styles.previous}`}
            onClick={showPreviousImage}
            aria-label="Предыдущее изображение"
          >
            <ChevronLeft aria-hidden="true" />
          </button>

          <button
            type="button"
            className={`${styles.arrow} ${styles.next}`}
            onClick={showNextImage}
            aria-label="Следующее изображение"
          >
            <ChevronRight aria-hidden="true" />
          </button>

          <div className={styles.controls}>
            <div className={styles.dots}>
              {images.map((image, index) => (
                <button
                  key={`${image.src}-${index}`}
                  type="button"
                  className={`${styles.dot} ${
                    index === currentIndex
                      ? styles.active
                      : ""
                  }`}
                  onClick={() => showImage(index)}
                  aria-label={`Показать изображение ${index + 1}`}
                  aria-current={
                    index === currentIndex
                      ? "true"
                      : undefined
                  }
                />
              ))}
            </div>

            {currentImage.title && (
              <p className={styles.imageTitle}>
                {currentImage.title}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}