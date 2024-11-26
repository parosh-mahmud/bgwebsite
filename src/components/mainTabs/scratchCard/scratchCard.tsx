import React, { useRef, useEffect, useState } from 'react';
import styles from '../../../styles/scratchCard.module.css';
import confetti from 'canvas-confetti';
import ScratchCardSvg from '..//..//../assets/LandingPage/SVG/ScratchCard.svg';
import HeaderLogo from "../../assets/LandingPage/SVG/BazigaarLogo.svg";
interface ScratchCardProps {
  onClose: () => void;
}
const ScratchCard: React.FC<ScratchCardProps> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scratchCardCoverRef = useRef<HTMLDivElement>(null);
  const scratchCardCanvasRenderRef = useRef<HTMLImageElement>(null);
  const scratchCardCoverContainerRef = useRef<HTMLDivElement>(null);
  const scratchCardTextRef = useRef<HTMLParagraphElement>(null);
  const scratchCardImageRef = useRef<HTMLImageElement>(null);

  const [isShining, setIsShining] = useState(true);
  const [isCoverCleared, setIsCoverCleared] = useState(false);
  const [isCoverHidden, setIsCoverHidden] = useState(false);
  const [isCanvasRenderHidden, setIsCanvasRenderHidden] = useState(true);
  const [isImageAnimated, setIsImageAnimated] = useState(false);
  const [scratchCardText, setScratchCardText] = useState('🎁 Scratch for a surprise!');

  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    let positionX: number;
    let positionY: number;
    let clearDetectionTimeout: NodeJS.Timeout | null = null;

    const devicePixelRatio = window.devicePixelRatio || 1;

    const canvasWidth = canvas.offsetWidth * devicePixelRatio;
    const canvasHeight = canvas.offsetHeight * devicePixelRatio;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    context.scale(devicePixelRatio, devicePixelRatio);
    context.fillStyle = 'black';

    if (isSafari) {
      canvas.classList.add(styles.hidden);
      setIsCanvasRenderHidden(false);
    }

    const getPosition = ({ clientX, clientY }: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
    };

    const plotLine = (context: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) => {
      const diffX = Math.abs(x2 - x1);
      const diffY = Math.abs(y2 - y1);
      const dist = Math.sqrt(diffX * diffX + diffY * diffY);
      const step = dist / 50;
      let i = 0;

      while (i < dist) {
        const t = Math.min(1, i / dist);
        const x = x1 + (x2 - x1) * t;
        const y = y1 + (y2 - y1) * t;

        context.beginPath();
        context.arc(x, y, 16, 0, Math.PI * 2);
        context.fill();

        i += step;
      }
    };

    const setImageFromCanvas = () => {
      canvas.toBlob((blob) => {
        if (blob && scratchCardCanvasRenderRef.current) {
          const url = URL.createObjectURL(blob);
          const previousUrl = scratchCardCanvasRenderRef.current.src;
          scratchCardCanvasRenderRef.current.src = url;
          if (!previousUrl) {
            setIsCanvasRenderHidden(false);
          } else {
            URL.revokeObjectURL(previousUrl);
          }
        }
      });
    };

    let setImageTimeout: NodeJS.Timeout | null = null;

    const plot = (e: PointerEvent) => {
      const { x, y } = getPosition(e);
      plotLine(context, positionX, positionY, x, y);
      positionX = x;
      positionY = y;
      if (isSafari) {
        if (setImageTimeout) {
          clearTimeout(setImageTimeout);
        }
        setImageTimeout = setTimeout(() => {
          setImageFromCanvas();
        }, 5);
      }
    };

    const checkBlackFillPercentage = () => {
      const imageData = context.getImageData(0, 0, canvasWidth, canvasHeight);
      const pixelData = imageData.data;

      let blackPixelCount = 0;

      for (let i = 0; i < pixelData.length; i += 4) {
        const red = pixelData[i];
        const green = pixelData[i + 1];
        const blue = pixelData[i + 2];
        const alpha = pixelData[i + 3];

        if (red === 0 && green === 0 && blue === 0 && alpha === 255) {
          blackPixelCount++;
        }
      }

      const blackFillPercentage = (blackPixelCount * 100) / (canvasWidth * canvasHeight);

      if (blackFillPercentage >= 45) {
        setIsCoverCleared(true);
        confetti({
          particleCount: 100,
          spread: 90,
          // origin: {
          //   y: (scratchCardTextRef.current.getBoundingClientRect().bottom + 60) / window.innerHeight,
          // },
        });
        setScratchCardText('🎉 You got a $50 Apple gift card!');
        setIsImageAnimated(true);

        const handleTransitionEnd = () => {
          setIsCoverHidden(true);
          scratchCardCoverContainerRef.current?.removeEventListener('transitionend', handleTransitionEnd);
        };

        scratchCardCoverContainerRef.current?.addEventListener('transitionend', handleTransitionEnd);
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      setIsShining(false);
      const { x, y } = getPosition(e);
      positionX = x;
      positionY = y;
      if (clearDetectionTimeout) {
        clearTimeout(clearDetectionTimeout);
      }

      canvas.addEventListener('pointermove', plot);

      const handlePointerUp = () => {
        canvas.removeEventListener('pointermove', plot);
        clearDetectionTimeout = setTimeout(() => {
          checkBlackFillPercentage();
        }, 500);
        window.removeEventListener('pointerup', handlePointerUp);
      };

      window.addEventListener('pointerup', handlePointerUp);
    };

    canvas.addEventListener('pointerdown', handlePointerDown);

    return () => {
      canvas.removeEventListener('pointerdown', handlePointerDown);
      if (clearDetectionTimeout) {
        clearTimeout(clearDetectionTimeout);
      }
      if (setImageTimeout) {
        clearTimeout(setImageTimeout);
      }
    };
  }, [isSafari]);

  return (
    <div className='relative'>
     {/* Back Button */}
      <button
        onClick={onClose}
        className="absolute top-4 left-4 z-10 bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors duration-300"
      >
        Back
      </button>
      <div className={styles.scratchCard}>
        <div
          className={`${styles.scratchCardCoverContainer} ${isCoverCleared ? styles.clear : ''} ${
            isCoverHidden ? styles.hidden : ''
          }`}
          ref={scratchCardCoverContainerRef}
        >
          <canvas className={styles.scratchCardCanvas} width="320" height="320" ref={canvasRef}></canvas>
          {/* only needed for Safari and iOS browsers */}
          <img
            className={`${styles.scratchCardCanvasRender} ${isCanvasRenderHidden ? styles.hidden : ''}`}
            alt=""
            ref={scratchCardCanvasRenderRef}
          />
         <div
            className={`${styles.scratchCardCover} ${isShining ? styles.shine : ''}`}
            ref={scratchCardCoverRef}
          >
            {/* Use the imported SVG as a React component */}
            <ScratchCardSvg className={styles.scratchCardCoverBackground} />
          </div>
        </div>
        <img
          className={`${styles.scratchCardImage} ${isImageAnimated ? styles.animate : ''}`}
          src="https://assets.codepen.io/4175254/apple-gift-card.png"
          alt="Apple 50$ gift card"
          ref={scratchCardImageRef}
        />
      </div>
      <p className={styles.scratchCardText} ref={scratchCardTextRef}>
        {scratchCardText}
      </p>
      <svg width="0" height="0">
        <filter id="remove-black" colorInterpolationFilters="sRGB">
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    -1 -1 -1 0 1"
            result="black-pixels"
          />
          <feComposite in="SourceGraphic" in2="black-pixels" operator="out" />
        </filter>
        <filter id="noise">
          <feTurbulence baseFrequency="0.5"></feTurbulence>
        </filter>
      </svg>
    </div>
  );
};

export default ScratchCard;
