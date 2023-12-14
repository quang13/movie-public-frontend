"use client";

import Link from "next/link";
import Image from "next/image";
import { isEmpty } from "lodash";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import AliceCarousel from "react-alice-carousel";
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import HeaderComponent from "./header";
import FooterComponent from "./footer";
import { IFilm } from "@/config/types";
import { getListFilm } from "@/common/utils";
import { BASE_URL, HOT_FILM } from "@/common/constant";
import CommingSoonComponent from "@/components/CommingSoon";

export default function LayoutComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [listFilm, setListFilm] = useState([]);

  const getHotFilm = async () => {
    const res = await fetch(`${BASE_URL}${HOT_FILM}`, {
      method: "POST",
      next: { revalidate: 1800, tags: ["hot-film"] },
    });
    if (res.ok) {
      const data = await res.json();
      setListFilm(data.result);
    } else {
      setListFilm([]);
    }
  };

  useEffect(() => {
    // getListFilm("/film/get-all-film")
    //   .then((value) => {
    //     if (isEmpty(value.result)) {
    //       setListFilm([]);
    //     } else {
    //       setListFilm(value.result);
    //     }
    //   })
    //   .catch(() => setListFilm([]));
    getHotFilm();
  }, []);

  const items = listFilm.map((e: IFilm) => (
    <Link
      href={`/phim/${e.slug}`}
      className="film-item-slider relative block h-[252px] w-full px-4"
      key={e.slug}
    >
      <Image
        src={e.thumbnail}
        fill
        alt={e.title as string}
        placeholder="blur"
        blurDataURL="/blur_img.webp"
      />
    </Link>
  ));

  return (
    <StyledComponentsRegistry>
      <HeaderComponent />
      <main className="main-container relative mx-auto w-full max-w-[1440px] px-4">
        <div className="hot-trending my-6">
          {!isEmpty(listFilm) && (
            <AliceCarousel
              autoPlay
              autoPlayStrategy="all"
              autoPlayInterval={5000}
              animationDuration={1000}
              animationType="slide"
              infinite
              syncStateOnPropsUpdate
              touchTracking={false}
              disableDotsControls
              // disableButtonsControls
              renderNextButton={(isDisabled) => (
                <button className="absolute right-5 top-[35%] z-10 flex h-10 w-10 items-center justify-center rounded-full bg-blueSecondary">
                  <FaChevronRight size={16} color="#fff" />
                </button>
              )}
              renderPrevButton={(isDisabled) => (
                <button className="hover:opacity-55 absolute left-5 top-[35%] z-10 flex h-10 w-10 items-center justify-center rounded-full bg-blueSecondary hover:border-blueSecondary">
                  <FaChevronLeft size={16} color="#fff" />
                </button>
              )}
              items={items}
              responsive={{
                360: {
                  items: 2,
                },
                576: {
                  items: 3,
                },
                768: {
                  items: 4,
                },
                992: {
                  items: 5,
                },
                1100: {
                  items: 6,
                },
              }}
            />
          )}
        </div>
        <section className="ads-top-between-content flex flex-col items-start justify-center gap-4 sm:flex-row sm:gap-8">
          <div className="ads-group-top-left w-full sm:w-1/2">
            <Link
              className="relative block h-[70px] w-full border "
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="https://chaolua3.live/images/08/720-x-100-VTM.gif"
                fill
                alt=""
              />
            </Link>
            <Link
              className="relative mt-4 block h-[70px] w-full border "
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="https://chaolua3.live/images/08/720-x-100-VTM.gif"
                fill
                alt=""
              />
            </Link>
          </div>
          <div className="ads-group-top-right w-full sm:w-1/2">
            <Link
              className="relative block h-[70px] w-full border "
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="https://chaolua3.live/images/08/720-x-100-VTM.gif"
                fill
                alt=""
              />
            </Link>
            <Link
              className="relative mt-4 block h-[70px] w-full border "
              href="#"
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <Image
                src="https://chaolua3.live/images/08/720-x-100-VTM.gif"
                fill
                alt=""
              />
            </Link>
          </div>
        </section>
        <div className="relative mt-8 flex w-full items-start gap-4">
          <Link
            className="ads-left relative hidden h-[600px] w-[120px] md:block"
            href="#"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <Image
              src="https://chaolua3.live/images/08/120-x-600-VTM.gif"
              fill
              alt=""
            />
          </Link>
          <div className="children-wrapper relative z-10 flex items-start gap-2">
            {children}
            <div className="w-full 2lg:w-fit">
              <div className="comming-soon-films h-full">
                <p className="big-title mb-6 border-b-2 border-dashed border-b-[#5142FC] pb-2 text-xl font-semibold text-white">
                  Phim SẮP CHIẾU
                </p>
                <div className="h-auto w-full 2lg:w-[250px] xl:w-[300px]">
                  <CommingSoonComponent />
                </div>
              </div>
              <div className="comming-soon-films h-full mt-10">
                <p className="big-title border-b-[#5142FC] pb-2 text-xl font-semibold text-white">
                  Phim SẮP CHIẾU
                </p>
                <div className="h-auto w-full 2lg:w-[250px] xl:w-[300px]">
                  <CommingSoonComponent />
                </div>
              </div>
            </div>
          </div>
          <Link
            className="ads-right relative hidden h-[600px] w-[120px] md:block"
            href="#"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <Image
              src="https://chaolua3.live/images/08/120-x-600-VTM.gif"
              fill
              alt=""
              rel="nofollow"
            />
          </Link>
          <div className="fixed bottom-0 left-0 z-20 mx-auto flex w-full justify-center">
            <div className="bottom-ads-neo relative h-[70px] w-full max-w-[720px] bg-danger">
              <button
                className="btn-close-bottom-ads absolute -right-[10px] -top-[15px] flex items-center justify-center rounded-full bg-gray-600 p-2"
                type="button"
              >
                <IoMdClose size={16} />
              </button>
            </div>
          </div>
        </div>
      </main>
      <FooterComponent />
      <ToastContainer position="top-center" />
    </StyledComponentsRegistry>
  );
}
