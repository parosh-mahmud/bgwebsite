import Link from "next/link";
import React, { Fragment } from "react";
import {
  FbIcon,
  InstaIcon,
  LinkedInIcon,
  TwitterIcon,
} from "../../assets/SocialIcons";
import footerLogo from "../../assets/LandingPage/SVG/BazigaarLogo.svg";
import Image from "next/image";
import WhatsappIcon from "../../assets/LandingPage/SVG/WhatsApp.svg";
import android from "../../assets/LandingPage/SVG/GooglePlayGolden.svg";
import apple from "../../assets/LandingPage/SVG/AppleStoreGolden.svg";
const Footer = () => {
  return (
    <Fragment>
      {/* top footer  */}
      <div className="bg-black py-16 lg:py-28 mt-12 lg:mt-20">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-5 justify-between items-center">
            <Image src={footerLogo} alt="Footer Logo" />
            <div>
              <p className="text-white font-semiBold text-[16px] lg:text-[18px] pb-4 text-center md:text-left">
                Download Our Apps
              </p>
              <div className="flex items-center gap-3 pb-4">
                <Image src={android} alt="android" />
                <Image src={apple} alt="apple" />
              </div>
              <div className="flex items-center gap-3 pb-4 divide-x divide-[#999]">
                <Link className="text-white" href="/privacy-policy">
                  Privacy Policy
                </Link>
                <Link className="text-white pl-3" href="/terms-and-conditions">
                  Terms of Service
                </Link>
                {/* <Link className="text-white pl-3" href="#">
                  FAQ
                </Link> */}
              </div>
            </div>
          </div>
          <hr className="my-6" />
          <div className="flex flex-col md:flex-row gap-5 justify-between items-center">
            <p className="text-white">
              copyright @ 2023 All right Reserved by{" "}
              <span className="text-primary">Bazigaar.</span>
            </p>
            <div className="flex gap-5 items-center">
              <LinkedInIcon />
              <FbIcon />
              <TwitterIcon />
              <InstaIcon />
              {/* <div> */}
              <Link href="">
                <Image src={WhatsappIcon} alt="What'sapp Icon" />
              </Link>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Footer;
