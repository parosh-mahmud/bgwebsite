import React, { FC, Fragment, useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RefreshIcon from "@mui/icons-material/Refresh";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"; 
import HistoryIcon from "@mui/icons-material/History";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import StarIcon from "@mui/icons-material/Star";
import ChatIcon from "@mui/icons-material/Chat";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import HeaderLogo from "../../assets/LandingPage/SVG/BazigaarLogo.svg";
import Image from "next/image";
import { TicketIcon } from "../../assets/Icons";
import LoginModal from "../modal/loginModal";
import SignUpModal from "../modal/signupModal";
import ProfileModal from "../modal/profileModal";
import axios from "axios";

interface types {
  navfix: boolean;
}

const Header: FC<types> = ({ navfix }) => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [userDetails, setUserDetails] = useState<any>(null);
 const [isProfileModalOpen, setProfileModalOpen] = useState(false);
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
        localStorage.setItem("userDetails", JSON.stringify(updatedUserDetails)); // Update localStorage
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    }
  };

  const handleProfileClick = () => {
    setProfileModalOpen(true); // Open ProfileModal
    setDropdownOpen(false); // Close dropdown
  };

  useEffect(() => {
    // Load from localStorage on initial render
    const savedToken = localStorage.getItem("authToken");
    const savedUserDetails = localStorage.getItem("userDetails");

    if (savedToken && savedUserDetails) {
      setUserDetails(JSON.parse(savedUserDetails));
    }
  }, []);

  const handleLoginSuccess = (details: any) => {
    const token = details.token;
    if (token) {
      localStorage.setItem("authToken", token);
      localStorage.setItem("userDetails", JSON.stringify(details));
      setUserDetails(details);
      toast.success("Login Successful");
      console.log("Login successful, token saved.");
    } else {
      console.error("No token received during login.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userDetails");
    setUserDetails(null);
    setDropdownOpen(false);
    toast.success("Logout Successful");
  };

  const toggleToSignUp = () => {
    setLoginOpen(false);
    setSignUpOpen(true);
  };

  const toggleToLogin = () => {
    setSignUpOpen(false);
    setLoginOpen(true);
  };

 const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const Links = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];

  return (
    <Fragment>
      <nav
        className="w-full"
        style={{ background: "rgba(26, 26, 64, 0.4)" }}
      >
        <div className="container flex items-center justify-between py-5">
          {/* Left Side: Logo and Mobile Menu Icon */}
          <div className="flex items-center">
            {/* Mobile Menu Icon */}
            {/* <div className="block lg:hidden mr-4">
              <button onClick={() => setOpen(!open)}>
                {open ? (
                  <CloseIcon className="text-white" />
                ) : (
                  <MenuIcon className="text-white" />
                )}
              </button>
            </div> */}

            {/* Logo */}
            <Link href="/">
              <Image src={HeaderLogo} alt="Header Logo" />
            </Link>
          </div>

          {/* Right Side: Buttons */}
          <div className="flex items-center gap-4">
            {/* Buy Ticket Button */}
          <Link
    href="/lottery"
    style={{
      background:
        "linear-gradient(90deg, #F2BA56 0%, #E65E09 100%)",
    }}
    className="text-white font-bold py-1 px-2 md:py-2 md:px-4 text-xs md:text-sm flex items-center rounded-full"
  >
    <span className="w-6 h-6 md:w-5 md:h-5 mr-1">
  <TicketIcon />
</span> 
 Buy Tickets
  </Link>

            {userDetails ? (
              // Display user details after login
              <div className="flex items-center gap-2 relative">
                <button
                  onClick={() => fetchUserDetails(userDetails?.user?.id)} // Pass userId dynamically
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
                      <button   onClick={handleProfileClick}  className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 w-full">
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
              <div className="flex gap-0">
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

        {/* Mobile Menu
        {open && (
          <ul className="lg:hidden absolute top-full left-0 w-full bg-black text-white flex flex-col items-center">
            <li className="py-2">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li className="py-2">
              <Link href="/about" className="hover:text-primary">
                About
              </Link>
            </li>
            <li className="py-2">
              <Link href="/contact" className="hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        )} */}
      </nav>

      {/* Modals */}
      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setSignUpOpen(false)}
        onLoginClick={toggleToLogin}
      />
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setLoginOpen(false)}
        onSignUpClick={toggleToSignUp} // Triggered when "Sign up" is clicked in LoginModal
        onLoginSuccess={handleLoginSuccess}
      />
      <Toaster
        position="top-right"
        toastOptions={{
          className: "mt-6",
          duration: 5000,
          style: {
            background: "#152b3c",
            color: "#fff",
          },
          success: {
            duration: 4000,
            iconTheme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />

       {/* Profile Modal */}
      <ProfileModal
        user={userDetails} // Pass user details to ProfileModal
        open={isProfileModalOpen}
        onClose={() => setProfileModalOpen(false)} // Close ProfileModal
        cards={[
          { header: "Deposits", value: 0 },
          { header: "Withdrawals", value: 0 },
          // Additional cards...
        ]}
      />
    </Fragment>
  );
};

export default Header;
