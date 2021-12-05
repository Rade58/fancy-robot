/* eslint jsx-a11y/anchor-is-valid: 1 */
import type { FC } from "react";
import { Fragment } from "react";
import tw, { css, styled, theme } from "twin.macro";

import Link from "next/link";

import { Splide, SplideSlide } from "@splidejs/react-splide";

import type { PropsI } from "@/pages/index";

import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";

const ImageItems: FC<{
  items: PropsI["topRatedProducts"];
}> = ({ items }) => {
  return (
    <Fragment>
      {items.map(({ id, image }) => {
        return (
          <SplideSlide key={id}>
            <Link href={`/product/${id}`}>
              <a>
                <img
                  /* onClick={() => {
                console.log("click");
              }} */
                  src={image}
                  // src="/images/placeholder.jpg"
                  alt="product"
                  tw="w-full"
                />
              </a>
            </Link>
          </SplideSlide>
        );
      })}
    </Fragment>
  );
};

const Carousel: FC<{ items: PropsI["topRatedProducts"] }> = ({ items }) => {
  return (
    <Fragment>
      <section tw="overflow-hidden height[0px] md:height[32rem] ">
        {/* Desktop */}
        <Splide
          options={{
            type: "loop",
            gap: "1rem",
            autoplay: true,
            pauseOnHover: false,
            resetProgress: false,
            arrows: "slider",
            height: "31rem",
          }}
          hasSliderWrapper
          // hasAutoplayControls
          hasAutoplayProgress
        >
          <ImageItems items={items} />
        </Splide>
      </section>
      <section tw="overflow-hidden height[14rem] md:height[0px]">
        {/* Mobile */}
        <Splide
          options={{
            type: "loop",
            gap: "1rem",
            autoplay: true,
            pauseOnHover: false,
            resetProgress: false,
            arrows: "slider",
            height: "13rem",
          }}
          hasSliderWrapper
          // hasAutoplayControls
          hasAutoplayProgress
        >
          <ImageItems items={items} />
          {/* <SplideSlide>
            <img src="/images/placeholder.jpg" alt="product" />
          </SplideSlide> */}
        </Splide>
      </section>
    </Fragment>
  );
};

export default Carousel;
