// components/layouts/HomeLayout.tsx
import Head from "next/head";
import React, { FC, Fragment, useState, useEffect } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import BottomNavBar from "../common/BottomNavBar/bottomNavBar";
import AuthBottomBar from "../common/AuthBottomBar/authBottomBar";
import SignUpModal from "../modal/signupModal";
import LoginModal from "../modal/loginModal";
import ProfileModal from "../modal/profileModal";
import toast, { Toaster } from "react-hot-toast";

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout: FC<HomeLayoutProps> = ({ children }) => {
  // Navigation State
  const [navfix, setNavfix] = useState(false);

  // Authentication State
  const [userDetails, setUserDetails] = useState<any>(null);
  const [isSignUpOpen, setSignUpOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);

  // Handle navigation fix on scroll
  function setFixed() {
    // Adjust as needed based on scroll position
    if (window.scrollY >= 500) {
      setNavfix(true);
    } else {
      setNavfix(false);
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", setFixed);
    return () => {
      window.removeEventListener("scroll", setFixed);
    };
  }, []);

  // Load user details from localStorage on initial render
  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    const savedUserDetails = localStorage.getItem("userDetails");

    if (savedToken && savedUserDetails) {
      setUserDetails(JSON.parse(savedUserDetails));
    }
  }, []);

  // Handle login success
  const handleLoginSuccess = (details: any) => {
    const token = details.token;
    if (token) {
      localStorage.setItem("authToken", token);
      localStorage.setItem("userDetails", JSON.stringify(details));
      setUserDetails(details);
      toast.success("Login Successful");
    }
  };

  // Handle sign-up success
  const handleSignUpSuccess = (details: any) => {
    setSignUpOpen(false);
    setUserDetails(details);
    toast.success("Sign-Up Successful!");
  };

  // Toggle between Sign Up and Log In modals
  const toggleToSignUp = () => {
    setLoginOpen(false);
    setSignUpOpen(true);
  };

  const toggleToLogin = () => {
    setSignUpOpen(false);
    setLoginOpen(true);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userDetails");
    setUserDetails(null);
    toast.success("Logout Successful");
  };

  return (
    <Fragment>
      <Head>
        <title>Bazigaar | Welcome to Bazigaar</title>
        <meta name="description" content="Best It Solution" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Navigation */}
      <div
        className={`${
          navfix
            ? "z-10 w-full top-0 lg:right-0 fixed bg-black shadow-header"
            : "z-10 w-full top-0 lg:right-0 absolute bg-black shadow-header"
        }`}
      >
        <Header
          navfix={navfix}
          userDetails={userDetails}
          setUserDetails={setUserDetails}
          setSignUpOpen={setSignUpOpen}
          setLoginOpen={setLoginOpen}
          setProfileModalOpen={setProfileModalOpen}
          handleLogout={handleLogout}
        />
      </div>

      {/* Main content */}
      <div>{children}</div>

      {/* Conditionally render the bottom bar based on authentication status */}
      {userDetails ? (
        <BottomNavBar />
      ) : (
        <AuthBottomBar
          onSignUpClick={() => setSignUpOpen(true)}
          onLoginClick={() => setLoginOpen(true)}
        />
      )}

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setSignUpOpen(false)}
        onSignUpSuccess={handleSignUpSuccess}
        onLoginClick={toggleToLogin}
      />
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setLoginOpen(false)}
        onSignUpClick={toggleToSignUp}
        onLoginSuccess={handleLoginSuccess}
      />
      <ProfileModal
        user={userDetails}
        open={isProfileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        cards={[
          { header: "Deposits", value: 0 },
          { header: "Withdrawals", value: 0 },
          // Additional cards...
        ]}
      />

      {/* Toast Notifications */}
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

export default HomeLayout;
