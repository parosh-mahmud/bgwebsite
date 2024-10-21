import Head from "next/head";
import React, { FC, Fragment, useState, useEffect } from "react";
import Footer from "../footer/Footer";
import Header from "../header/Header";

interface types {
  children: any;
}

const HomeLayout: FC<types> = ({ children }) => {
  // Navigation State
  const [navfix, setNavfix] = useState(false);

  // navigation
  function setFixed() {
    // if (window.scrollY >= 500) {
    setNavfix(true);
    // } else {
    //   setNavfix(false);
    // }
  }
  useEffect(() => {
    window.addEventListener("scroll", setFixed);
  }, []);

  return (
    <Fragment>
      <Head>
        <title>Bazigaar | Welcome to Bazigaar</title>
        <meta name="description" content="Best It Solution" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* navigation  */}
      <div
        className={`${
          navfix
            ? "z-10 w-full top-0 lg:right-0 !fixed bg-black shadow-header"
            : "z-10 w-full top-0 lg:right-0 absolute bg-black shadow-header"
        }`}>
        <Header navfix={navfix} />
      </div>
      {/* main content  */}
      <div>{children}</div>

      {/* footer  */}
      <Footer />
    </Fragment>
  );
};

export default HomeLayout;
