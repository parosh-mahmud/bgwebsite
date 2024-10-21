import React, { FC, Fragment, useState } from "react";
import Image from "next/image";
import contactHeader from "../../assets/LandingPage/Image/banner.jpg";
import { TextField } from "@mui/material";
import HomeLayout from "../../components/layouts/HomeLayout";

interface types {}
const Contact: FC<types> = () => {
  const [contactFormData, setContactFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
  });
  const handleContactForm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log("contactFormData ==>>", contactFormData);
  };
  return (
    <Fragment>
      <HomeLayout>
        <Image
          src={contactHeader}
          alt="Contact Header"
          className="!h-[480px] !w-[100%]"
        />
        <div className="container py-16 lg:py-24">
          <h3 className="font-semiBold text-2xl lg:text-4xl text-primary text-center pb-[40px] lg:[pb-80px]">
            Contact Us
          </h3>
          <div className="bg-black p-4 md:p-12 lg:p-16 rounded-[10px] lg:rounded-[20px]">
            <form action="">
              <div className="flex items-center flex-col lg:flex-row gap-[30px] lg:gap-[50px] pb-[30px] lg:pb-[50px]">
                <TextField
                  className="bg-secondary rounded-md w-full placeholder-[#999999]"
                  sx={{ input: { color: "#999" }, label: { color: "white" } }}
                  id="outlined-basic"
                  placeholder="Full Name"
                  variant="outlined"
                  type="text"
                  onChange={(e) =>
                    setContactFormData((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                />
                <TextField
                  className="bg-secondary rounded-md w-full placeholder-[#999999]"
                  sx={{ input: { color: "#999" }, label: { color: "white" } }}
                  id="outlined-basic"
                  placeholder="Email Address"
                  variant="outlined"
                  type="email"
                  onChange={(e) =>
                    setContactFormData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="flex items-center flex-col lg:flex-row gap-[30px] lg:gap-[50px] pb-[30px] lg:pb-[50px]">
                <TextField
                  className="bg-secondary rounded-md w-full  placeholder-[#999999]"
                  sx={{ input: { color: "#999" }, label: { color: "white" } }}
                  id="outlined-basic"
                  placeholder="Phone Number"
                  variant="outlined"
                  type="number"
                  onChange={(e) =>
                    setContactFormData((prev) => ({
                      ...prev,
                      phoneNumber: e.target.value,
                    }))
                  }
                />
                <TextField
                  className="bg-secondary rounded-md w-full placeholder-[#999999]"
                  sx={{ input: { color: "#999" }, label: { color: "white" } }}
                  id="outlined-basic"
                  placeholder="Subject"
                  variant="outlined"
                  type="text"
                  onChange={(e) =>
                    setContactFormData((prev) => ({
                      ...prev,
                      subject: e.target.value,
                    }))
                  }
                />
              </div>

              <TextField
                className="bg-secondary rounded-md w-full placeholder-[#999999]"
                sx={{ input: { color: "#999" }, label: { color: "white" } }}
                id="outlined-multiline-static"
                placeholder="Message..."
                multiline
                rows={4}
                onChange={(e) =>
                  setContactFormData((prev) => ({
                    ...prev,
                    message: e.target.value,
                  }))
                }
              />
              <div className="mt-[40px] lg:mt-[60px] flex justify-center items-center">
                <button
                  onClick={(e) => handleContactForm(e)}
                  className="px-4 py-2 font-medium text-sm text-[#222] bg-primary rounded-md">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </HomeLayout>
    </Fragment>
  );
};

export default Contact;
