import React, { useState, FC, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import styles from "../styles/Home.module.css";
import {
  announcement,
  packages,
} from "../locales/home";
import MainSlider from "../components/common/Slider/MainSlider";
import { TextField } from "@mui/material";
import Link from "next/link";
import ProjectsSlider from "../components/common/Slider/ProjectsSlider";
import HomeLayout from "../components/layouts/HomeLayout";
import { Dice, Trophy } from "../assets/Icons";
import { Player } from "../assets/Icons";
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
  const [contactFormData, setContactFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });
  const handleContactForm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log("contactFormData ==>>", contactFormData);
  };

  // counter
  const [numCounter, setNumCounter] = useState(0);

  const counter = (minimum: number, maximum: number) => {
    for (let numCounter = minimum; numCounter <= maximum; numCounter++) {
      setTimeout(() => setNumCounter(numCounter), 50);
    }
  };
  useEffect(() => {
    counter(50000, 98396);
  }, []);

  return (
    <HomeLayout>
      <main>
        {/* banner */}
        <div
                      className={`mt-14 lg:mt-0 !h-[600px] xl:!h-[700px] 2xl:!h-[785px] ${styles.heroBanner}`}>


          <div className="container">
            <p className="uppercase font-semiBold text-xl lg:text-2xl text-center md:text-right text-primary">
              Paly Anytime & Any Where
            </p>
            <h1 className="font-semiBold text-2xl lg:text-3xl xl:text-6xl text-center md:text-right text-white py-4">
              Win the Latest iPhone!
            </h1>
            <h3 className="font-semiBold text-2xl lg:text-3xl xl:text-3xl text-center md:text-right text-white pb-8">
              Check Out Our Exciting Lottery Packages and Get Your Chance to Win!
            </h3>

            <button  className="font-medium text-xl lg:text-2xl text-white py-4 px-6 rounded-lg w-full md:w-auto float-none md:float-right"
  style={{
    background: 'linear-gradient(90deg, #F2BA56 0%, #E65E09 100%)', // Gradient background
    border: 'none', // Remove border to match the gradient style
  }}>
              Participate Now
            </button>
          </div>
        </div>

        {/* top slider */}
        <MainSlider
          sliderData={announcement}
          bodyStyle={"!flex items-center py-2 lg:py-3 gap-3"}
        />

        {/* counter */}
        <div className="container py-16 lg:py-24">
          {/* teams  */}
          <div className="shadow-jackpot bg-[#222222] rounded-[20px]">
            <div className="grid grid-cols-1 lg:grid-cols-3 justify-center items-center gap-12 divide-x-0 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-primary py-8 px-10 lg:py-12 lg:px-16">
              <div className="flex items-center gap-12">
                <Trophy />
                <div>
                  <p className="font-bold text-3xl lg:text-5xl pb-2 text-white">
                    ${numCounter}
                  </p>
                  <h3 className="uppercase font-bold text-xl lg:text-2xl text-primary">
                    JACKPOT TODAY
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-12">
                <div className="pl-0 lg:pl-12 pt-10 lg:pt-0">
                  <Dice />
                </div>
                <div>
                  <p className="font-bold text-3xl lg:text-5xl pb-2 text-white">
                    220
                  </p>
                  <h3 className="uppercase font-bold text-xl lg:text-2xl text-primary">
                    GAMES TODAY
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-12">
                <div className="pl-0 lg:pl-12 pt-10 lg:pt-0">
                  <Player />
                </div>
                <div>
                  <p className="font-bold text-3xl lg:text-5xl pb-2 text-white">
                    5500
                  </p>
                  <h3 className="uppercase font-bold text-xl lg:text-2xl text-primary">
                    PLAYER ONLINE
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Available Games */}
        <div className="container">
          <div className="bg-black py-10 lg:py-12 px-16 lg:px-24 rounded-[30px] lg:rounded-[50px]">
            <h3 className="font-semiBold text-2xl lg:text-4xl text-primary text-center">
              Available Games
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center items-center gap-12 py-10 lg:py-12">
              {games1.map((game) => {
                return (
                  <div key={game.id}>
                    <Image src={game.img} alt="Games" />
                  </div>
                );
              })}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center items-center gap-12">
              {games2.map((game) => {
                return (
                  <div key={game.id}>
                    <Image src={game.img} alt="Games" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* Lottery Package */}
        <div className="container py-16 lg:py-24">
          <div>
            <h3 className="font-semiBold text-2xl lg:text-4xl text-primary text-center">
              Lottery Package
            </h3>
            <p className="font-regular text-[#999999] text-center pt-[24px]">
              Luck is what happens when preparation meets opportunity, and{" "}
              <br />
              playing the lottery is one way of creating that opportunity.
            </p>
            <ProjectsSlider sliderData={packages} />
          </div>
        </div>

        {/* How TO Play */}
        <div className="container">
          <h3 className="font-semiBold text-2xl lg:text-4xl text-primary text-center pb-3">
            How TO Play
          </h3>
          <Image src={howtoplay} alt="how to play" />
        </div>

        {/* download  */}
        <div className={styles.downloadBG}>
          <div className="container">
            <div className="w-full lg:w-[70%] flex justify-center">
              <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center gap-5 lg:gap-0">
                <Image src={phone} alt="download app" />
                <div>
                  <h1 className="font-bold text-3xl lg:text-5xl text-primary">
                    Download Our Mobile App!
                  </h1>
                  <div className="grid grid-cols-1 lg:grid-cols-2 justify-items-center items-center gap-5 py-10">
                    <div>
                      <Image
                        src={android}
                        alt="download app"
                        className="pb-5"
                      />
                      <Image src={apple} alt="download app" />
                    </div>
                    <Image src={qr} alt="download app" />
                  </div>

                  <hr />
                  <p className="text-center">
                    <a
                      className="text-white font-regular text-center"
                      rel="noreferrer"
                      target="_blank"
                      href="https://bazigaar.com">
                      www.bazigaar.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Contact Us */}
        <div className="container py-16 lg:py-24">
          <h3 className="font-semiBold text-2xl lg:text-4xl text-primary text-center pb-[40px] lg:[pb-80px]">
            Contact Us
          </h3>
          <div className="bg-black p-4 md:p-12 lg:p-16 rounded-[10px] lg:rounded-[20px]">
            <form action="">
              <div className="flex items-center flex-col lg:flex-row gap-[30px] lg:gap-[50px] pb-[30px] lg:pb-[50px]">
                <TextField
                  className="bg-secondary rounded-md w-full placeholder-[#999999]"
                  sx={{ input: { color: "#999" }, label: { color: "white" } }}
                  id="outlined-basic"
                  placeholder="Full Name"
                  variant="outlined"
                  type="text"
                  onChange={(e) =>
                    setContactFormData((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                />
                <TextField
                  className="bg-secondary rounded-md w-full placeholder-[#999999]"
                  sx={{ input: { color: "#999" }, label: { color: "white" } }}
                  id="outlined-basic"
                  placeholder="Email Address"
                  variant="outlined"
                  type="email"
                  onChange={(e) =>
                    setContactFormData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex items-center flex-col lg:flex-row gap-[30px] lg:gap-[50px] pb-[30px] lg:pb-[50px]">
                <TextField
                  className="bg-secondary rounded-md w-full  placeholder-[#999999]"
                  sx={{ input: { color: "#999" }, label: { color: "white" } }}
                  id="outlined-basic"
                  placeholder="Phone Number"
                  variant="outlined"
                  type="number"
                  onChange={(e) =>
                    setContactFormData((prev) => ({
                      ...prev,
                      phoneNumber: e.target.value,
                    }))
                  }
                />
                <TextField
                  className="bg-secondary rounded-md w-full placeholder-[#999999]"
                  sx={{ input: { color: "#999" }, label: { color: "white" } }}
                  id="outlined-basic"
                  placeholder="Subject"
                  variant="outlined"
                  type="text"
                  onChange={(e) =>
                    setContactFormData((prev) => ({
                      ...prev,
                      subject: e.target.value,
                    }))
                  }
                />
              </div>

              <TextField
                className="bg-secondary rounded-md w-full placeholder-[#999999]"
                sx={{ input: { color: "#999" }, label: { color: "white" } }}
                id="outlined-multiline-static"
                placeholder="Message..."
                multiline
                rows={4}
                onChange={(e) =>
                  setContactFormData((prev) => ({
                    ...prev,
                    message: e.target.value,
                  }))
                }
              />
              <div className="mt-[40px] lg:mt-[60px] flex justify-center items-center">
                <button
                  onClick={(e) => handleContactForm(e)}
                  className="px-4 py-2 font-medium text-sm text-[#222] bg-primary rounded-md">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* subscribe */}
        <div className="bg-black mb-16 lg:mb-24 py-12 lg:py-20">
          <div className="container">
            <div className="p-[30px] lg:p-[50px] border rounded-[10px] lg:rounded-[20px]">
              <h3 className="font-semiBold text-2xl lg:text-4xl text-primary text-center pb-[40px] lg:[pb-80px]">
                Join our mail list to get latest announcement
              </h3>

              <form
                action=""
                className="flex justify-center items-center gap-4">
                <div className="w-full border-b border-[#999]">
                  <TextField
                    className="rounded-md w-full !placeholder-[#999999]"
                    sx={{ input: { color: "#999" }, label: { color: "white" } }}
                    placeholder="Enter Your Email"
                    type="text"
                    onChange={(e) =>
                      setContactFormData((prev) => ({
                        ...prev,
                        fullName: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="mt-[40px] lg:mt-[60px] flex justify-center items-center">
                  <button
                    onClick={(e) => handleContactForm(e)}
                    className="px-6 py-2 font-medium text-sm text-[#222] bg-primary rounded-full">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </HomeLayout>
  );
};
export default Home;
