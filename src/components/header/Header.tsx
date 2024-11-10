// components/header/Header.tsx
import React, { FC, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import HeaderLogo from "../../assets/LandingPage/SVG/BazigaarLogo.svg";
import { TicketIcon } from "../../assets/Icons";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import RefreshIcon from "@mui/icons-material/Refresh";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HistoryIcon from "@mui/icons-material/History";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import StarIcon from "@mui/icons-material/Star";
import ChatIcon from "@mui/icons-material/Chat";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import axios from "axios";
import toast from "react-hot-toast";

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
    setDropdownOpen(!dropdownOpen);
  };

  const handleProfileClick = () => {
    setProfileModalOpen(true);
    setDropdownOpen(false);
  };

  return (
    <nav
      className="w-full"
      style={{ background: "rgba(26, 26, 64, 0.4)" }}
    >
      <div className="container flex items-center justify-between py-5">
        {/* Left Side: Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image src={HeaderLogo} alt="Header Logo" />
          </Link>
        </div>

        {/* Right Side: Buttons */}
        <div className="flex items-center gap-4">
        
          {userDetails ? (
            // Display user details after login
            <div className="flex items-center gap-2 relative">
              <button
                onClick={() => fetchUserDetails(userDetails?.user?.id)}
                className="flex items-center justify-center"
              >
                <RefreshIcon className="w-5 h-5 rounded-full text-white" />
              </button>
              <div className="flex items-center gap-1 md:gap-2 bg-yellow-500 text-black px-2 py-1 md:px-3 md:py-1 rounded-full">
                <MonetizationOnIcon className="w-4 h-4 md:w-6 md:h-6 text-yellow-800" />
                <span className="font-bold text-xs md:text-lg">
                  {userDetails.user.bgcoin}
                </span>
              </div>

              <div className="flex items-center gap-2 relative">
                <div
                  className="flex items-center gap-1 md:gap-2 relative cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <div className="relative">
                    <img
                      src={
                        userDetails.user.profile_picture ||
                        "/default-profile.png"
                      }
                      alt="Profile"
                      className="w-8 h-8 md:w-8 md:h-8 rounded-full border-2 border-white"
                    />
                    <ArrowDropDownIcon
                      className="absolute bottom-0 right-0 w-3 h-3 md:w-4 md:h-4 text-white"
                    />
                  </div>
                </div>

                {/* Dropdown menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
                    <button
                      onClick={handleProfileClick}
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 w-full"
                    >
                      <AccountCircleIcon className="w-5 h-5" /> Profile
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 w-full">
                      <HistoryIcon className="w-5 h-5" /> Lottery History
                    </button>
                    <Link href="/chat" passHref>
                      <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 w-full">
                        <ChatIcon className="w-5 h-5" /> Chat
                      </button>
                    </Link>
                    <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 w-full">
                      <SportsEsportsIcon className="w-5 h-5" /> Games
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 w-full">
                      <StarIcon className="w-5 h-5" /> Level
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 w-full">
                      <HelpOutlineIcon className="w-5 h-5" /> Help
                    </button>
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 w-full"
                    >
                      <ExitToAppIcon className="w-5 h-5" /> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Show Sign Up and Log In buttons if not logged in
            <div className="hidden sm:flex gap-0">
              <button
                onClick={() => setSignUpOpen(true)}
                style={{
                  background:
                    "linear-gradient(90deg, #F2BA56 0%, #E65E09 100%)",
                  borderTopLeftRadius: "9999px",
                  borderBottomLeftRadius: "9999px",
                }}
                className="text-white font-bold py-1 px-2 md:py-2 md:px-4 text-xs md:text-sm"
              >
                Sign Up
              </button>
              <button
                onClick={() => setLoginOpen(true)}
                style={{
                  backgroundColor: "#DFF4E4",
                  marginLeft: "-1px",
                }}
                className="text-black font-bold py-1 px-2 md:py-2 md:px-4 rounded-r-full text-xs md:text-sm"
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
