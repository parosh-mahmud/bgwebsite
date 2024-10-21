import React from "react";
import termsData from "../../locales/terms.json";
import HomeLayout from "../../components/layouts/HomeLayout";
import Image from "next/image";
import headerImg from "../../assets/LandingPage/Image/banner.jpg";

const PrivacyPolicy = () => {
  return (
    <HomeLayout>
      <Image
        src={headerImg}
        alt="Header Image"
        className="!h-[480px] !w-[100%]"
      />
      <div className="container pt-10">
        {termsData.privacyPolicy.map((term) => {
          return (
            <div key={term.id} className="pb-4">
              <h1 className="text-xl lg:text-3xl font-semiBold text-primary">
                {term.title}
              </h1>
              <p className="font-regular py-2 text-[#999]">{term.description}</p>
              {term.listItems.length > 0 && (
                <ul>
                  {term.listItems.map((listItem) => {
                    return (
                      <li
                        key={listItem.id}
                        className="list-disc mx-6 font-regular text-[#999]">
                        {listItem.option}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </HomeLayout>
  );
};

export default PrivacyPolicy;
