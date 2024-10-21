import React, { FC } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image, { StaticImageData } from "next/image";
import Slider from "react-slick";
function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "none",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "none",
      }}
      onClick={onClick}
    />
  );
}

interface types {
  sliderData: {
    id: number;
    title: string;
    offer: string;
    tag: string;
    tagClass: string;
    bg: string;
  }[];
  bodyStyle: string;
}
const MainSlider: FC<types> = ({ sliderData, bodyStyle }) => {
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-black">
      <div className="container mx-auto h-full">
        <Slider {...settings}>
          {sliderData.map((data) => {
            return (
              <div key={data.id} className={bodyStyle}>
                <p
                  className={data.tagClass}
                  style={{ backgroundColor: data.bg }}>
                  {data.tag}
                </p>
                <p className="text-primary text-lg font-semiBold">
                  {data.title}
                </p>
                <p className="text-white text-lg font-semiBold">{data.offer}</p>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default MainSlider;
