import React, { FC, Fragment, useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
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
  const [dropdownOpen, setdropdownOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  // Function to toggle from LoginModal to SignUpModal
  const toggleToSignUp = () => {
    setLoginOpen(false); // Close the LoginModal
    setSignUpOpen(true); // Open the SignUpModal
  };

  // Function to toggle from SignUpModal to LoginModal
  const toggleToLogin = () => {
    setSignUpOpen(false); // Close the SignUpModal
    setLoginOpen(true); // Open the LoginModal
  };
  const Links = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
  ];

  //   function handleLogout(data) {
  //     axios
  //       .post(`${API_PRIMARY_BASE_URL}auth/logout/`, data, {
  //         headers: {
  //           Authorization: "token " + userToken,
  //         },
  //       })
  //       .then(() => {
  //         localStorage.removeItem("Token");
  //         localStorage.removeItem("UserName");
  //         localStorage.removeItem("Email");
  //         toast.success("Logout Successful");
  //         // console.log(localStorage.getItem("Token"));

  //         navigate("/login", { replace: true });
  //         // window.location.reload(true);
  //       })
  //       .catch((e) => {
  //         UnAuth(e);
  //       });
  //   }
  //   if (logoutState === true) {
  //     handleLogout();
  //     setlogoutState(false);
  //   }
  // balance state

  // fetching user data
  //   const [userProfile, setUserProfile] = useState(null);

  //   const getUserProfile = (data) => {
  //     axios
  //       .post(
  //         `${API_PRIMARY_BASE_URL}myuser/userProfileData/${Username}/`,
  //         data,
  //         {
  //           headers: {
  //             Authorization: "token " + userToken,
  //           },
  //         }
  //       )
  //       .then((res) => {
  //         if (res.data.type === "error") {
  //           toast.error(res.data.msg);
  //         } else {
  //           setUserProfile(res.data.data.userInfo.propicture);
  //         }
  //       })
  //       .catch((e) => {
  //         // UnAuth(e);
  //       });
  //   };

  //   useEffect(() => {
  //     getUserProfile();
  //   }, []);
  //   const [userImage, setUserImage] = useState(userProfile);
  //   useEffect(() => {
  //     if (userProfile !== null) {
  //       setUserImage(API_PRIMARY_IMAGE_URL + userProfile);
  //     }
  //   }, [userProfile]);
  return (
    <Fragment>
         <nav className="w-full" style={{ background: 'rgba(26, 26, 64, 0.4)'}}>
        <div className="container lg:flex items-center justify-between py-5">
          <Link href="/">
            <Image src={HeaderLogo} alt="Header Logo" />
          </Link>

          <div
            onClick={() => setOpen(!open)}
            className="text-3xl absolute right-4 top-[22%] cursor-pointer lg:hidden">
            {open ? (
              <CloseIcon className={`${navfix && "text-primaryText"}`} />
            ) : (
              <MenuIcon className={`${navfix && "text-primaryText"}`} />
            )}
          </div>

          <ul
            className={`mt-4 lg:mt-0 lg:flex lg:items-center lg:bg-inherit absolute lg:static text-white lg:z-auto z-[1] right-0 w-full h-screen lg:h-full lg:w-auto lg:pl-0 px-5 transition-all duration-500 ease-in-out gap-5 lg:gap-8 bg-black ${
              open ? "right-19" : "hidden"
            }`}>
            {Links.map((link, i) => (
              <li
                key={i}
                className="shadow-md lg:shadow-none py-3 px-6 lg:px-0 mb-2 lg:mb-0 rounded-lg lg:rounded-none">
                <Link
                  href={link.link}
                  className="text-white text-xl font-semiBold hover:text-primary duration-500 active:text-primary focus:text-primary">
                  {link.name}
                </Link>
              </li>
            ))}

            <li className="flex items-center">
  <button
    onClick={() => setSignUpOpen(true)}
    style={{
      background: 'linear-gradient(90deg, #F2BA56 0%, #E65E09 100%)',
      borderTopLeftRadius: '9999px', // Left corners rounded
      borderBottomLeftRadius: '9999px',
    }}
    className="text-white font-bold py-2 px-6"
  >
    Sign Up
  </button>
  <button
    onClick={() => setLoginOpen(true)}
    style={{
      backgroundColor: '#DFF4E4',
      marginLeft: '-10px', // Overlap with the Sign Up button
    }}
    className="text-black font-bold py-2 px-6 rounded-r-full"
  >
    Log In
  </button>
</li>

            <li>
              <Link
                href="/lottery"
                style={{
                  background: 'linear-gradient(90deg, #F2BA56 0%, #E65E09 100%)',
                }}
                className="shadow-btn py-2 px-6 rounded-lg text-white text-xl font-semiBold hover:text-primary duration-500 active:text-primary focus:text-primary bg-secondary flex items-center gap-2">
                <TicketIcon /> Buy Ticket
              </Link>
            </li>
           
          </ul>
        </div>
      </nav>

        {/* Modals */}
      {/* Modals */}
      <SignUpModal isOpen={isSignUpOpen} onClose={() => setSignUpOpen(false)} onLoginClick={toggleToLogin} />
      <LoginModal isOpen={isLoginOpen} onClose={() => setLoginOpen(false)} onSignUpClick={toggleToSignUp} />
      <Toaster
        position="top-right"
        toastOptions={{
          // Define default options
          className: "mt-6",
          duration: 5000,
          style: {
            background: "#152b3c",
            color: "#fff",
          },
          // Default options for specific types
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
