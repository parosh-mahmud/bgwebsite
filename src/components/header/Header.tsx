// components/header/Header.tsx
import React, { FC, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import HeaderLogo from "../../assets/LandingPage/SVG/BazigaarLogo.svg";
import { TicketIcon } from "../../assets/Icons";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import RefreshIcon from "@mui/icons-material/Refresh";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import Bgcoin from "../../assets/LandingPage/SVG/bgcoin.svg"
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HistoryIcon from "@mui/icons-material/History";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import StarIcon from "@mui/icons-material/Star";
import ChatIcon from "@mui/icons-material/Chat";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import axios from "axios";
import toast from "react-hot-toast";
import NotificationsIcon from "@mui/icons-material/Notifications";

interface HeaderProps {
  navfix: boolean;
  userDetails: any;
  setUserDetails: (details: any) => void;
  setSignUpOpen: (open: boolean) => void;
  setLoginOpen: (open: boolean) => void;
  setProfileModalOpen: (open: boolean) => void;
  handleLogout: () => void;
}

const Header: FC<HeaderProps> = ({
  navfix,
  userDetails,
  setUserDetails,
  setSignUpOpen,
  setLoginOpen,
  setProfileModalOpen,
  handleLogout,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Fetch latest user details to update balance
  const fetchUserDetails = async (userId: string | number) => {
    const token = localStorage.getItem("authToken");
    if (token && userId) {
      try {
        const response = await axios.get(
          `https://api.bazigaar.com/user/user_details/${userId}`,
          {
            headers: { Authorization: `Token ${token}` },
          }
        );
        const updatedUserDetails = response.data;
        setUserDetails(updatedUserDetails);
        localStorage.setItem(
          "userDetails",
          JSON.stringify(updatedUserDetails)
        );
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleProfileClick = () => {
    setProfileModalOpen(true);
    setDropdownOpen(false); // Close the dropdown after opening profile modal
  };

  return (
    <nav
      className={`w-full ${navfix ? "fixed top-0 left-0 z-50" : ""}`}
      style={{ background: "rgba(26, 26, 64, 0.8)" }}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* Left Side: Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/images/BazigaarLogo.svg"
              alt="Bazigaar Logo"
              width={150}
              height={70}
              className="cursor-pointer"
            />
          </Link>
        </div>

        {/* Right Side: Buttons */}
        <div className="flex items-center gap-2 md:gap-4">
          {userDetails ? (
            <div className="flex items-center gap-4 md:gap-6">
              {/* Notification Icon */}
              <button
                className="relative p-1 md:p-2 hover:bg-gray-700 rounded-full"
                title="Notifications"
              >
                <NotificationsIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                  3
                </span>
              </button>

              {/* Refresh Button */}
              <button
                onClick={() => fetchUserDetails(userDetails?.user?.id)}
                className="p-1 md:p-2 hover:bg-gray-700 rounded-full"
                title="Refresh Balance"
              >
                <RefreshIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </button>

              {/* BG Coin Balance */}
              <div className="flex items-center gap-1 md:gap-2 px-2 py-1 md:px-4 md:py-2 rounded-full bg-gradient-to-r from-[#0B1E37] to-[#455271] shadow-lg">
                <Image
                  src="/images/bgcoin.svg"
                  alt="BG Coin"
                  width={20}
                  height={20}
                />
                <span className="font-semibold text-xs md:text-sm text-white">
                  {userDetails.user.bgcoin}
                </span>
                <button
                  className="ml-1 md:ml-2 bg-white p-1 rounded-full shadow hover:shadow-md hover:bg-gray-200"
                  title="Increase BG Coin"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-3 h-3 md:w-4 md:h-4 text-[#0B1E37]"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                  </svg>
                </button>
              </div>

              {/* User Dropdown */}
              <div className="relative">
                <div
                  className="flex items-center gap-1 md:gap-2 cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <img
                    src={
                      userDetails.user.profile_picture || "/default-profile.png"
                    }
                    alt="Profile"
                    className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white"
                  />
                  <ArrowDropDownIcon className="text-white" />
                </div>
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-40 md:w-48 bg-white shadow-md rounded-lg py-2">
                    <button
                      onClick={handleProfileClick}
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 w-full"
                    >
                      <AccountCircleIcon /> Profile
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 w-full">
                      <HistoryIcon /> Lottery History
                    </button>
                    <Link href="/chat">
                      <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 w-full">
                        <ChatIcon /> Chat
                      </button>
                    </Link>
                    <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 w-full">
                      <SportsEsportsIcon /> Games
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 w-full">
                      <StarIcon /> Level
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 w-full">
                      <HelpOutlineIcon /> Help
                    </button>
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 w-full"
                    >
                      <ExitToAppIcon /> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex gap-1 md:gap-2">
              <button
                onClick={() => setSignUpOpen(true)}
                className="py-1 px-3 md:py-2 md:px-4 bg-gradient-to-r from-[#F2BA56] to-[#E65E09] text-white rounded-l-full font-semibold text-xs md:text-sm"
              >
                Sign Up
              </button>
              <button
                onClick={() => setLoginOpen(true)}
                className="py-1 px-3 md:py-2 md:px-4 bg-gray-100 text-black rounded-r-full font-semibold text-xs md:text-sm"
              >
                Log In
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;