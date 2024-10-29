import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { announcement, packages } from "../locales/home";
import MainSlider from "../components/common/Slider/MainSlider";
import ProjectsSlider from "../components/common/Slider/ProjectsSlider";
import HomeLayout from "../components/layouts/HomeLayout";
import { Dice, Trophy, Player } from "../assets/Icons";
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
import Carousel from "../components/common/Slider/Carousel";

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
  const [numCounter, setNumCounter] = useState(0);
  const [loading, setLoading] = useState(true);

  const counter = (minimum: number, maximum: number) => {
    for (let numCounter = minimum; numCounter <= maximum; numCounter++) {
      setTimeout(() => setNumCounter(numCounter), 50);
    }
  };

  useEffect(() => {
    counter(50000, 98396);
    // Simulate loading time (e.g., for data or assets)
    setTimeout(() => setLoading(false), 2000); // Adjust time as needed
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <p className="text-2xl font-bold">Loading...</p>
      </div>
    );
  }

  return (
    <HomeLayout>
        {/* Loading Spinner Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="loader"></div>
        </div>
      )}
       {!loading && (
      <main className="">
        {/* Full-width Carousel Section */}
        <div className={`w-full ${styles.heroBanner}`} style={{ marginTop: "85px" }}>
          <Carousel images={images} />
        </div>

        {/* Centered Text Content Section */}
        <div className="container mx-auto text-center mt-8 md:mt-12 lg:mt-16 px-4">
          <p className="uppercase font-semiBold text-xl lg:text-2xl text-teal-200">
            Play Anytime & Anywhere
          </p>
          <h1 className="font-semiBold text-2xl lg:text-3xl xl:text-6xl text-yellow-100 py-4">
            Win Latest iPhone!
          </h1>
          <h3 className="font-semiBold text-2xl lg:text-3xl xl:text-3xl text-yellow-100 pb-8">
            Check Out Our Exciting Lottery Packages and Get Your Chance to Win!
          </h3>
          <button
            className="font-medium text-xl lg:text-2xl text-white py-4 px-6 rounded-lg"
            style={{
              background: "linear-gradient(90deg, #F2BA56 0%, #E65E09 100%)",
              border: "none",
            }}
          >
            Participate Now
          </button>
        </div>

        {/* Top Slider */}
        <MainSlider sliderData={announcement} bodyStyle="!flex items-center py-2 lg:py-3 gap-3" />

        {/* Counter Section */}
        <div className="container py-16 lg:py-24">
          <div className="shadow-jackpot bg-[#222222] rounded-[20px]">
            <div className="grid grid-cols-1 lg:grid-cols-3 justify-center items-center gap-12 divide-x-0 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-primary py-8 px-10 lg:py-12 lg:px-16">
              <div className="flex items-center gap-12">
                <Trophy />
                <div>
                  <p className="font-bold text-3xl lg:text-5xl pb-2 text-white">${numCounter}</p>
                  <h3 className="uppercase font-bold text-xl lg:text-2xl text-primary">JACKPOT TODAY</h3>
                </div>
              </div>
              <div className="flex items-center gap-12">
                <Dice />
                <div>
                  <p className="font-bold text-3xl lg:text-5xl pb-2 text-white">220</p>
                  <h3 className="uppercase font-bold text-xl lg:text-2xl text-primary">GAMES TODAY</h3>
                </div>
              </div>
              <div className="flex items-center gap-12">
                <Player />
                <div>
                  <p className="font-bold text-3xl lg:text-5xl pb-2 text-white">5500</p>
                  <h3 className="uppercase font-bold text-xl lg:text-2xl text-primary">PLAYER ONLINE</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Available Games Section */}
        <div className="container">
          <div className="bg-black py-10 lg:py-12 px-16 lg:px-24 rounded-[30px] lg:rounded-[50px]">
            <h3 className="font-semiBold text-2xl lg:text-4xl text-primary text-center">Available Games</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center items-center gap-12 py-10 lg:py-12">
              {games1.map((game) => (
                <div key={game.id}>
                  <Image src={game.img} alt="Games" />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center items-center gap-12">
              {games2.map((game) => (
                <div key={game.id}>
                  <Image src={game.img} alt="Games" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lottery Package Section */}
        <div className="container py-16 lg:py-24">
          <div>
            <h3 className="font-semiBold text-2xl lg:text-4xl text-primary text-center">Lottery Package</h3>
            <p className="font-regular text-[#999999] text-center pt-[24px]">
              Luck is what happens when preparation meets opportunity, and <br /> playing the lottery is one way of creating that opportunity.
            </p>
            <ProjectsSlider sliderData={packages} />
          </div>
        </div>

        {/* How to Play Section */}
        <div className="container">
          <h3 className="font-semiBold text-2xl lg:text-4xl text-primary text-center pb-3">How to Play</h3>
          <Image src={howtoplay} alt="How to play" />
        </div>

        {/* Download Section */}
        <div className={styles.downloadBG}>
          <div className="container">
            <div className="w-full lg:w-[70%] flex justify-center">
              <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-5 lg:gap-0">
                <Image src={phone} alt="download app" />
                <div>
                  <h1 className="font-bold text-3xl lg:text-5xl text-primary">Download Our Mobile App!</h1>
                  <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center items-center gap-5 py-10">
                    <Image src={android} alt="download app" className="pb-5" />
                    <Image src={apple} alt="download app" />
                    <Image src={qr} alt="download app" />
                  </div>
                  <hr />
                  <p className="text-center">
                    <a className="text-white font-regular text-center" rel="noreferrer" target="_blank" href="https://bazigaar.com">
                      www.bazigaar.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      )}
    </HomeLayout>
  );
};

export default Home;
