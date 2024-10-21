import React, { FC, Fragment, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import headerImg from "../../assets/LandingPage/Image/banner.jpg";
import HomeLayout from "../../components/layouts/HomeLayout";
import aboutTop from "../../assets/LandingPage/Image/aboutTop.png";
import about from "../../assets/LandingPage/Image/about.png";

interface types {}
const datas = [
  {
    id: 1,
    title: "Secure authentication:",
    des: " Implement secure authentication methods such as two-factor authentication, multi-factor authentication to protect user accounts from unauthorized access.",
  },
  {
    id: 2,
    title: "Regular updates:",
    des: " We Regularly update our app to address any vulnerabilities or bugs that could be exploited by malicious actors.",
  },
  {
    id: 3,
    title: "Privacy policy:",
    des: " Clearly state the Bazigaar’s privacy policy and data collection practices to users. This will help build trust and ensure transparency.",
  },
  {
    id: 4,
    title: "Limited data collection:",
    des: " We only collect the data necessary to provide the app's functionality. We are avoiding collect unnecessary data that could be used to identify or track users.",
  },
  {
    id: 5,
    title: "User control:",
    des: " We are providing users control over their data, such as the ability to delete their account or data, or to opt-out of data collection.",
  },
  {
    id: 6,
    title: "Third-party services:",
    des: " We carefully vet any third-party services used by the app and ensure that they have proper security and privacy measures in place.",
  },
  {
    id: 7,
    title: "Regular security audits:",
    des: " We conduct regular security audits of the app to identify and address any potential vulnerabilities or threats.",
  },
];
const AboutUs: FC<types> = () => {
  const [numCounter, setNumCounter] = useState(0);

  const counter = (minimum: number, maximum: number) => {
    for (let numCounter = minimum; numCounter <= maximum; numCounter++) {
      setTimeout(() => setNumCounter(numCounter), 1000);
    }
  };

  useEffect(() => {
    counter(2, 42);
  }, []);

  return (
    <Fragment>
      <HomeLayout>
        <Image
          src={headerImg}
          alt="Header Image"
          className="!h-[480px] !w-[100%]"
        />
        <div className="container py-16 lg:py-24">
          <h3 className="font-semiBold text-2xl lg:text-4xl text-primary text-center pb-[40px] lg:[pb-80px]">
            About Us
          </h3>
          <Image src={aboutTop} alt="About Us" />

          <h3 className="font-semiBold text-xl lg:text-3xl text-primary pt-[20px] lg:[pt-40px]">
            About Bazigaar
          </h3>
          <p className="font-regular text-[#999] pb-[20px] lg:[pb-40px]">
            Bazigaar is a top-notch online lottery and gaming app. We focused
            primarily on lottery and game which allow our valuable players to
            buy lottery tickets and play exciting game! At Bazigaar, we are
            committed to create a safe, stable, fair and reliable lottery and
            gameing environment for our players to enjoy the supreme money
            earning experience.
          </p>
          <h3 className="font-semiBold text-xl lg:text-3xl text-primary">
            Safe & Private Environment
          </h3>
          <p className="font-regular text-[#999] pb-[20px] lg:[pb-40px]">
            Bazigaar cooperates with the world’s top network security and uses
            the highest quality security system together with a 128-bit
            encryption to ensure all your transactions as well as privacy of
            your data are safe and secure. We promise to keep all of your
            information strictly confidential and private, and will never be
            sold to any third parties, except in accordance with our Privacy
            Policy.
          </p>
          <p className="font-regular text-[#999] pb-[10px] lg:[pb-20px]">
            Here are some steps that have been taken to create a secure and
            private environment for Bazigaar.
          </p>
          <ul>
            {datas.map((data) => {
              return (
                <li
                  key={data.id}
                  className="font-semiBold text-[#999] pb-[5px] lg:[pb-8px]">
                  {data.title}{" "}
                  <span className="font-regular text-[#999]">{data.des}</span>
                </li>
              );
            })}
          </ul>
          <h3 className="font-semiBold text-xl lg:text-3xl text-primary pt-[20px] lg:[pt-40px]">
            Customer Support
          </h3>
          <p className="font-regular text-[#999]">
            Our highly trained customer support team available 24 hours a day, 7
            days a week, offer efficient and dedicated support to help to answer
            your queries and assists on any of your issues.
          </p>
        </div>
      </HomeLayout>
    </Fragment>
  );
};

export default AboutUs;
