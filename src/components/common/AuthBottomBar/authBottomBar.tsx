// components/common/AuthBottomBar/AuthBottomBar.tsx
import React from "react";
import { Button } from "@mui/material";
import BazigaarLogo from "../../../assets/LandingPage/SVG/BazigaarLogo.svg";

interface AuthBottomBarProps {
  onSignUpClick: () => void;
  onLoginClick: () => void;
}

const AuthBottomBar: React.FC<AuthBottomBarProps> = ({
  onSignUpClick,
  onLoginClick,
}) => {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex"
      style={{
        height: "60px",
      }}
    >
      {/* Language and Currency Section */}
      <div
        className="flex items-center justify-center w-1/3"
        style={{
          backgroundColor: "#D3E4F1", // Light blue background for currency and language
        }}
      >
        <span className="text-black font-bold flex items-center">
          {/* <img
            src={BazigaarLogo}
            alt="Bazigaar Logo"
            style={{ width: "20px", marginRight: "8px" }}
          /> */}
          Bazigaar
        </span>
      </div>

      {/* Login Button Section */}
      <div
        className="flex items-center justify-center w-1/3"
        style={{
          backgroundColor: "#4CAF50", // Green background for Login
        }}
      >
        <Button
          onClick={onLoginClick}
          variant="text"
          style={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Login
        </Button>
      </div>

      {/* Sign Up Button Section */}
      <div
        className="flex items-center justify-center w-1/3"
        style={{
          backgroundColor: "#FFD700", // Yellow background for Sign up
        }}
      >
        <Button
          onClick={onSignUpClick}
          variant="text"
          style={{
            color: "#000",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Sign up
        </Button>
      </div>
    </div>
  );
};

export default AuthBottomBar;
