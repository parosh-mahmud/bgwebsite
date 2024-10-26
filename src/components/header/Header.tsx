import React, { FC, Fragment, useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import HeaderLogo from "../../assets/LandingPage/SVG/BazigaarLogo.svg";
import Image from "next/image";
import { TicketIcon } from "../../assets/Icons";

interface types {
  navfix: boolean;
}

const Header: FC<types> = ({ navfix }) => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setdropdownOpen] = useState(false);

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
      <nav className="w-full " style={{ background: 'rgba(26, 26, 64, 0.4)'}}>
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
            className={` mt-4 lg:mt-0 lg:flex lg:items-center lg:bg-inherit absolute lg:static text-white lg:z-auto z-[1] right-0 w-full h-screen lg:h-full lg:w-auto lg:pl-0 px-5 transition-all duration-500 ease-in-out gap-5 lg:gap-8 bg-black  ${
              open ? "right-19" : "hidden"
            }`}>
            {Links.map((link, i) => (
              <li
                key={i}
                className="shadow-md lg:shadow-none py-3 px-6 lg:px-0 mb-2 lg:mb-0 rounded-lg lg:rounded-none">
                <Link
                  href={link.link}
                  className="text-white text-xl font-semiBold  hover:text-primary duration-500 active:text-primary focus:text-primaryt">
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/lottery"
                style={{
      background: 'linear-gradient(90deg, #F2BA56 0%, #E65E09 100%)', // Apply your gradient
    }}
                className="shadow-btn py-2 px-6 rounded-lg text-white text-xl font-semiBold hover:text-primary duration-500 active:text-primary focus:text-primary bg-secondary flex items-center gap-2">
                <TicketIcon /> Buy Ticket
              </Link>
            </li>
          </ul>
        </div>
      </nav>
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
