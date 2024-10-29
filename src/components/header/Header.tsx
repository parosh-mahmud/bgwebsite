import React, { FC, Fragment, useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RefreshIcon from "@mui/icons-material/Refresh"; // Add this import at the top
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HistoryIcon from "@mui/icons-material/History";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import StarIcon from "@mui/icons-material/Star";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import HeaderLogo from "../../assets/LandingPage/SVG/BazigaarLogo.svg";
import Image from "next/image";
import { TicketIcon } from "../../assets/Icons";
import LoginModal from "../modal/loginModal";
import SignUpModal from "../modal/signupModal";

interface types {
  navfix: boolean;
}

const Header: FC<types> = ({ navfix }) => {
 const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [userDetails, setUserDetails] = useState<any>(null);

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
    console.log("Login successful, token saved.");
  } else {
    console.error("No token received during login.");
  }
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

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userDetails");
    setUserDetails(null);
    setDropdownOpen(false);
    toast.success("Logout Successful");
  };

  const Links = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];
  return (
    <Fragment>
      <nav className="w-full" style={{ background: "rgba(26, 26, 64, 0.4)" }}>
        <div className="container lg:flex items-center justify-between py-5">
          <Link href="/">
            <Image src={HeaderLogo} alt="Header Logo" />
          </Link>

          <div
            onClick={() => setOpen(!open)}
            className="text-3xl absolute right-4 top-[22%] cursor-pointer lg:hidden"
          >
            {open ? (
              <CloseIcon className={`${navfix && "text-primaryText"}`} />
            ) : (
              <MenuIcon className={`${navfix && "text-primaryText"}`} />
            )}
          </div>

          <ul
            className={`mt-4 lg:mt-0 lg:flex lg:items-center lg:bg-inherit absolute lg:static text-white lg:z-auto z-[1] right-0 w-full h-screen lg:h-full lg:w-auto lg:pl-0 px-5 transition-all duration-500 ease-in-out gap-5 lg:gap-8 bg-black ${
              open ? "right-19" : "hidden"
            }`}
          >
            <li>
              <Link
                href="/lottery"
                style={{
                  background: "linear-gradient(90deg, #F2BA56 0%, #E65E09 100%)",
                }}
                className="shadow-btn py-2 px-6 rounded-lg text-white text-xl font-semiBold hover:text-primary duration-500 active:text-primary focus:text-primary bg-secondary flex items-center gap-2"
              >
                <TicketIcon /> Buy Ticket
              </Link>
            </li>
            {Links.map((link, i) => (
              <li
                key={i}
                className="shadow-md lg:shadow-none py-3 px-6 lg:px-0 mb-2 lg:mb-0 rounded-lg lg:rounded-none"
              >
                <Link
                  href={link.link}
                  className="text-white text-xl font-semiBold hover:text-primary duration-500 active:text-primary focus:text-primary"
                >
                  {/* {link.name} */}
                </Link>
              </li>
            ))}

            {userDetails ? (
              // Display user details after login
              <div className="flex items-center gap-4 relative">
                <button
    onClick={() => window.location.reload()}
    className="  flex items-center justify-center"
  >
    <RefreshIcon className="w-5 h-5   rounded-full" />
  </button>
               <div className="flex items-center gap-2 bg-yellow-500 text-black px-3 py-1 rounded-full">
  <MonetizationOnIcon className="w-6 h-6 text-yellow-800" />
  <span className="font-bold text-lg">{userDetails.user.bgcoin}</span>
</div>

                <div className="flex items-center gap-2 relative">
                 <div className="flex items-center gap-3 bg-gray-800 text-white px-4 py-2 rounded-full cursor-pointer" onClick={toggleDropdown}>
  <span className="font-semibold text-md">{userDetails.user.username}</span>
  <img
    src={userDetails.user.profile_picture || "/default-profile.png"}
    alt="Profile"
    className="w-8 h-8 rounded-full border-2 border-white"
  />
</div>


                  {/* Dropdown menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50"> {/* Updated position */}
                      <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 w-full">
                        <AccountCircleIcon className="w-5 h-5" /> Profile
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 w-full">
                        <HistoryIcon className="w-5 h-5" /> Lottery History
                      </button>
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
              <div className="flex gap-4">
                <li className="flex items-center">
                  <button
                    onClick={() => setSignUpOpen(true)}
                    style={{
                      background: "linear-gradient(90deg, #F2BA56 0%, #E65E09 100%)",
                      borderTopLeftRadius: "9999px",
                      borderBottomLeftRadius: "9999px",
                    }}
                    className="text-white font-bold py-2 px-6"
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={() => setLoginOpen(true)}
                    style={{
                      backgroundColor: "#DFF4E4",
                      marginLeft: "-10px",
                    }}
                    className="text-black font-bold py-2 px-6 rounded-r-full"
                  >
                    Log In
                  </button>
                </li>
              </div>
            )}
          </ul>
        </div>
      </nav>

      {/* Modals */}
      <SignUpModal isOpen={isSignUpOpen} onClose={() => setSignUpOpen(false)} onLoginClick={toggleToLogin} />
     <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setLoginOpen(false)}
        onSignUpClick={toggleToSignUp}  // Triggered when "Sign up" is clicked in LoginModal
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
    </Fragment>
  );
};

export default Header;
