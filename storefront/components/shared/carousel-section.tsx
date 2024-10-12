"use client";

import type {EmblaOptionsType} from "embla-carousel";
import type {ReactNode} from "react";

import {cx} from "cva";

import {Cta} from "./button";
import {Root, SlidesWrapper, useCarousel, useCarouselButtons} from "./carousel";
import IconButton from "./icons-button";

type Props = {
  cta?: {
    href: string | undefined;
    text: string | undefined;
  };
  options?: EmblaOptionsType;
  showButtons?: boolean;
  showProgress?: boolean;
  slides: React.JSX.Element[] | undefined;
  title?: ReactNode;
  variant?: "cart" | "default";
};

export default function EmblaCarousel(props: Props) {
  const {
    cta,
    options,
    showButtons = true,
    showProgress = false,
    slides,
    title,
    variant = "default",
  } = props;

  if (!slides) return null;

  return (
    <Root
      options={{...options, containScroll: "trimSnaps", dragFree: true}}
      slidesCount={slides.length}
    >
      <section className="mx-auto max-w-max-screen py-2xl">
        <div
          className={cx("mb-xs flex items-center justify-between", {
            "px-m lg:px-xl": variant === "default",
            "px-s": variant === "cart",
          })}
        >
          {title}
          {showButtons && <Buttons variant={variant} />}
        </div>
        <SlidesWrapper
          className={cx({
            "px-m lg:px-xl": variant === "default",
            "px-s": variant === "cart",
          })}
        >
          <div className="-ml-2 flex touch-pan-y touch-pinch-zoom items-stretch">
            {slides.map((slide, index) => (
              <div className="flex-1 pl-2" key={index}>
                {slide}
              </div>
            ))}
          </div>
        </SlidesWrapper>

        {showProgress && <ProgressBar />}
        {cta?.text && (
          <div className="mt-2xl px-m lg:px-xl">
            <Cta className="w-full" size="xl" variant="outline">
              {cta.text}
            </Cta>
          </div>
        )}
      </section>
    </Root>
  );
}

function Buttons({variant}: {variant: "cart" | "default"}) {
  const {nextDisabled, onNext, onPrev, prevDisabled} = useCarouselButtons();
  return (
    <div className="hidden gap-2 lg:flex">
      <IconButton
        disabled={prevDisabled}
        icon="ArrowLeft"
        onClick={onPrev}
        size={variant === "default" ? "sm" : "xs"}
        type="button"
      />
      <IconButton
        disabled={nextDisabled}
        icon="ArrowRight"
        onClick={onNext}
        size={variant === "default" ? "sm" : "xs"}
        type="button"
      />
    </div>
  );
}

function ProgressBar() {
  const {scrollProgress} = useCarousel();

  return (
    <div className="relative mx-auto mt-2xl h-[2px] w-[215px] self-center justify-self-end overflow-hidden bg-[#FFD2C7] lg:hidden">
      <div
        className="absolute bottom-0 left-[-100%] top-0 w-full bg-accent transition-transform duration-300 ease-out"
        style={{transform: `translateX(${scrollProgress}%)`}}
      />
    </div>
  );
}
