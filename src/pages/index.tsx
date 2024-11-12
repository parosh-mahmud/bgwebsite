// pages/index.tsx
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { announcement, packages } from "../locales/home";
import MainSlider from "../components/common/Slider/MainSlider";
import ProjectsSlider from "../components/common/Slider/ProjectsSlider";
import HomeLayout from "../components/layouts/HomeLayout";
import { Dice, Trophy, Player, TicketIcon } from "../assets/Icons";
import spinegame from "../assets/LandingPage/Image/spinGame.png";
import cardgame from "../assets/LandingPage/Image/cardGame.png";
import ludogame from "../assets/LandingPage/Image/luduGame.png";
import game1 from "../assets/LandingPage/Image/game-1.png";
import game2 from "../assets/LandingPage/Image/game-3.png";
import howtoplay from "../assets/LandingPage/Image/HowToplaySection.png";
import phone from "../assets/LandingPage/Image/Mobilephone.png";
import qr from "../assets/LandingPage/Image/QRCode.png";
import apple from "../assets/LandingPage/SVG/AppleStoreSilver.svg";
import android from "../assets/LandingPage/SVG/GooglePlaySilver.svg";
import ImageCarousel from "../components/common/Slider/imageCarousel";
import LoadingSpinner from "../components/common/loadingSpinner/LoadingSpinner";
import Link from "next/link";

const images = [
  "https://res.cloudinary.com/dpudfjkoq/image/upload/v1729943693/Buylottery_vn0b0p.jpg",
  "https://res.cloudinary.com/dpudfjkoq/image/upload/v1729943692/1stdepositebonus_jykk47.jpg",
  "https://res.cloudinary.com/dpudfjkoq/image/upload/v1729943692/2ticket_i3kzas.jpg",
];

const games1 = [
  { id: 1, img: spinegame },
  { id: 2, img: cardgame },
  { id: 3, img: ludogame },
];

const games2 = [
  { id: 1, img: game1 },
  { id: 2, img: game2 },
  { id: 3, img: game1 },
  { id: 4, img: game1 },
];

const Home = () => {
  const [numCounter, setNumCounter] = useState(50000);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Counter animation
    let start = 50000;
    const end = 98396;
    const duration = 2000; // 2 seconds
    const increment = (end - start) / (duration / 50);

    const counterInterval = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(counterInterval);
      }
      setNumCounter(Math.floor(start));
    }, 50);

    // Simulate loading
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }
  const iconGradientStyle = {
    background: "linear-gradient(270deg, #E65E09 0%, #F2BA56 100%)",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  };
  return (
    <HomeLayout>
      <main className="mt-20">
<div className="container mx-auto pt-4 px-4 sm:px-6 md:px-8 flex flex-col-reverse lg:flex-row items-center">
  {/* Buy Ticket Section */}
  <div className="w-full lg:w-1/2 mt-4 lg:mt-0 lg:pl-8">
    <div className="text-center lg:text-left">
      <p className="uppercase font-semibold text-base sm:text-lg text-teal-200">
        Play Anytime & Anywhere
      </p>
      <h1 className="font-semibold text-2xl sm:text-3xl text-yellow-100 py-2">
        Win  Latest iPhone!
      </h1>
     
  <Link
  href="/lottery"
  style={{
    background: "linear-gradient(270deg, #E65E09 0%, #F2BA56 100%)", // Right to left gradient
  }}
  className="text-black font-bold py-2 px-4 text-base sm:text-lg flex items-center justify-center rounded-full shadow-lg transform hover:scale-105 transition-transform duration-200 max-w-xs mx-auto lg:mx-0" // Centered for mobile
>
  <span className="w-5 h-5 mr-2">
    <TicketIcon />
  </span>
  Buy Tickets
</Link>


    </div>
  </div>

  {/* Carousel Section */}
  <div className="w-full lg:w-1/2">
    <div className={`w-full`}>
      <ImageCarousel images={images} />
    </div>
  </div>
</div>



        {/* Top Slider */}
        <div className="mt-8">
          <MainSlider
            sliderData={announcement}
            bodyStyle="!flex items-center py-2 lg:py-3 gap-3"
          />
        </div>

        {/* Counter Section */}
        <div className="container py-8 sm:py-12">
          <div className="shadow-jackpot bg-[#222222] rounded-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-primary py-8 px-6 sm:px-10">
              <div className="flex items-center gap-6 sm:gap-8 py-4 sm:py-0">
                     <span style={iconGradientStyle}>
                  <Trophy />
                </span>
                <div>
                  <p className="font-bold text-2xl sm:text-3xl lg:text-5xl pb-2 text-white">
                    ${numCounter}
                  </p>
                  <h3 className="uppercase font-bold text-lg sm:text-xl lg:text-2xl text-primaryText">
                    JACKPOT TODAY
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-6 sm:gap-8 py-4 sm:py-0">
                <Dice />
                <div>
                  <p className="font-bold text-2xl sm:text-3xl lg:text-5xl pb-2 text-primaryText">
                    220
                  </p>
                  <h3 className="uppercase font-bold text-lg sm:text-xl lg:text-2xl text-primaryText">
                    GAMES TODAY
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-6 sm:gap-8 py-4 sm:py-0">
                <Player />
                <div>
                  <p className="font-bold text-2xl sm:text-3xl lg:text-5xl pb-2 text-white">
                    5500
                  </p>
                  <h3 className="uppercase font-bold text-lg sm:text-xl lg:text-2xl text-primaryText">
                    PLAYER ONLINE
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Available Games Section */}
        <div className="container">
          <div className="bg-black py-8 lg:py-12 px-6 sm:px-8 lg:px-16 rounded-2xl lg:rounded-3xl">
            <h3 className="font-semibold text-2xl lg:text-4xltext-primaryText text-center">
              Available Games
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 justify-items-center items-center gap-8 py-8">
              {games1.map((game) => (
                <div key={game.id} className="w-full h-auto">
                  <Image
                    src={game.img}
                    alt="Game"
                    className="object-cover w-full h-full"
                    placeholder="blur"
                  />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 justify-items-center items-center gap-6">
              {games2.map((game) => (
                <div key={game.id} className="w-full h-auto">
                  <Image
                    src={game.img}
                    alt="Game"
                    className="object-cover w-full h-full"
                    placeholder="blur"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lottery Package Section */}
        <div className="container py-12">
          <div>
            <h3 className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl text-primaryText text-center">
              Lottery Package
            </h3>
            <p className="font-regular text-sm sm:text-base text-gray-400 text-center pt-6">
              Luck is what happens when preparation meets opportunity, and
              playing the lottery is one way of creating that opportunity.
            </p>
            <div className="mt-8">
              <ProjectsSlider sliderData={packages} />
            </div>
          </div>
        </div>

        {/* How to Play Section */}
        <div className="container">
          <h3 className="font-semibold text-2xl lg:text-4xl text-primaryText text-center pb-6">
            How to Play
          </h3>
          <div className="w-full h-auto">
            <Image
              src={howtoplay}
              alt="How to play"
              className="object-cover w-full h-full"
              placeholder="blur"
            />
          </div>
        </div>

        {/* Download Section */}
        <div className={`${styles.downloadBG} py-10 mt-12`}>
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                <Image
                  src={phone}
                  alt="Download App"
                  className="w-3/4 sm:w-2/3 md:w-full h-auto"
                  placeholder="blur"
                />
              </div>
              <div className="w-full lg:w-1/2 mt-8 lg:mt-0 text-center lg:text-left">
                <h1 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-primaryText">
                  Download Our Mobile App!
                </h1>
                <div className="flex flex-col sm:flex-row lg:flex-row items-center justify-center lg:justify-start gap-4 py-6">
                  <Image
                    src={android}
                    alt="Google Play Store"
                    className="w-40 h-auto"
                  />
                  <Image
                    src={apple}
                    alt="Apple App Store"
                    className="w-40 h-auto"
                  />
                </div>
                <div className="flex justify-center lg:justify-start">
                  <Image
                    src={qr}
                    alt="QR Code"
                    className="w-32 h-auto"
                    placeholder="blur"
                  />
                </div>
                <hr className="my-4 border-gray-600" />
                <p className="text-center lg:text-left">
                  <a
                    className="text-white font-regular"
                    rel="noreferrer"
                    target="_blank"
                    href="https://bazigaar.com"
                  >
                    www.bazigaar.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </HomeLayout>
  );
};

export default Home;
