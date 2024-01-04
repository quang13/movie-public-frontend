"use client";

import Link from "next/link";
import Image from "next/image";
import { isEmpty } from "lodash";
import dynamic from "next/dynamic";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import AliceCarousel from "react-alice-carousel";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import HeaderComponent from "./header";
import FooterComponent from "./footer";
import { IFilm } from "@/config/types";
import {
  formatNumber,
  getAllElement,
  getElement,
  toStar,
} from "@/common/utils";
import { BASE_URL, GET_ADS, HOT_FILM } from "@/common/constant";
const CommingSoonComponent = dynamic(
  async () => await import("@/components/CommingSoon")
);
const Top5HighRatedComponent = dynamic(
  async () => await import("@/components/Top5HighRated")
);

export default function LayoutComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const [listFilm, setListFilm] = useState([]);
  const [ads, setAds] = useState<any>(null);
  const [showModalContent, setShowModalContent] = useState(false);

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

  const getAds = async () => {
    const res = await fetch(`${BASE_URL}${GET_ADS}`, {
      method: "POST",
    });
    if (res.ok) {
      const data = await res.json();
      setAds(data.result.data);
    } else setAds(null);
  };

  useEffect(() => {
    getHotFilm();
    getAds();
  }, []);

  const scrollYCheck = () => {
    const y = window.scrollY;
    if (y >= 420) {
      getAllElement(".ads-fixed")?.map((e) => (e.style.display = "block"));
    } else {
      getAllElement(".ads-fixed")?.map((e) => (e.style.display = "none"));
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollYCheck);
    return () => window.removeEventListener("scroll", scrollYCheck);
  });

  useEffect(() => {
    if (!ads) return;
    if (!ads.content) return;
    setShowModalContent(true);
  }, [ads]);

  const items = listFilm.map((e: IFilm, index) => (
    <Link
      href={`/phim/${e.slug}`}
      className="film-item-slider relative flex h-[208px] w-full gap-4 rounded-xl transition-all duration-300"
      style={{ background: `url(${e.thumbnail}) 100% 100%` }}
      key={e.slug}
    >
      <div className="custom-filter-blur absolute left-0 top-0 z-0 h-full w-full rounded-xl"></div>
      <div className="relative z-10 h-full w-2/5 overflow-hidden rounded-xl">
        <Image
          src={e.thumbnail}
          fill
          sizes="(min-width: 320px) 100vw"
          loading="lazy"
          alt={e.title as string}
          placeholder="blur"
          blurDataURL="/blur_img.webp"
        />
      </div>
      <div className=" relative z-10 w-3/5 pr-4">
        <div className="info-detail relative flex h-full w-full flex-col justify-center">
          <p className="title mb-6 line-clamp-2 text-base font-semibold">
            {e.title}
          </p>
          <p className="country text-sm font-semibold">
            Quốc gia: <span className=" font-normal"></span>
            {e.country?.join(", ")}
          </p>
          <p className="rate text-sm font-semibold">
            Đánh giá:{" "}
            <span className="flex items-center gap-2 font-normal">
              {toStar(e.rate)}
            </span>
          </p>
          <p className="views">Views: {formatNumber(e.views as number)}</p>
          <p className="rank-item absolute bottom-0 right-0 text-6xl text-white text-opacity-90">
            {index + 1}
          </p>
        </div>
      </div>
    </Link>
  ));

  return (
    <>
      <HeaderComponent />
      <main className="main-container relative mx-auto w-full max-w-[1440px] px-4">
        <div className="hot-trending my-6">
          {!isEmpty(listFilm) && listFilm?.length > 0 && (
            <AliceCarousel
              autoPlay
              autoPlayStrategy="all"
              autoPlayInterval={1500}
              animationType="slide"
              infinite
              touchTracking={false}
              disableDotsControls
              renderNextButton={() => <FaChevronRight size={16} color="#fff" />}
              renderPrevButton={() => <FaChevronLeft size={16} color="#fff" />}
              items={items}
              responsive={{
                320: {
                  items: 1,
                },
                576: {
                  items: 1.5,
                },
                768: {
                  items: 2.5,
                },
                992: {
                  items: 3,
                },
                1100: {
                  items: 3.5,
                },
                1300: {
                  items: 4,
                },
              }}
              ssrSilentMode
            />
          )}
        </div>
        <section className="ads-top-between-content flex flex-col items-start justify-center gap-4 sm:flex-row sm:gap-8">
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            {!isEmpty(ads) &&
              !isEmpty(ads.header) &&
              ads.header.map((e: any, i: number) => (
                <Link
                  className="relative block h-[70px] w-full border "
                  href={e?.link}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  key={`a${i}${e.link}`}
                >
                  <Image
                    src={e?.image_url}
                    fill
                    alt=""
                    sizes="(min-width: 320px) 100vw"
                    loading="lazy"
                    blurDataURL="/blur_img.webp"
                    placeholder="blur"
                  />
                </Link>
              ))}
          </div>
        </section>
        <div className="relative mt-8 flex w-full items-start gap-2">
          {ads && ads.left && (
            <Link
              className="ads-left ads-fixed relative hidden h-[500px] w-[120px] md:block"
              href={ads.left.link}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <Image
                src={ads.left.image_url}
                fill
                alt=""
                sizes="(min-width: 320px) 100vw"
                loading="lazy"
                blurDataURL="/blur_img.webp"
                placeholder="blur"
              />
            </Link>
          )}
          {ads && ads.right && (
            <Link
              className="ads-right ads-fixed relative hidden h-[500px] w-[120px] md:block"
              href={ads.right.link}
              target="_blank"
              rel="nofollow noopener noreferrer"
            >
              <Image
                src={ads.right.image_url}
                fill
                alt=""
                sizes="(min-width: 320px) 100vw"
                loading="lazy"
              />
            </Link>
          )}
          <div className="children-wrapper relative z-10 flex items-start gap-2 md:mx-[128px]">
            {children}
            <div className="w-full 2lg:w-fit">
              <div className="comming-soon-films mt-6 h-full 2lg:mt-0">
                <p className="big-title mb-6 border-b-2 border-dashed border-b-[#5142FC] pb-2 text-xl font-semibold text-white">
                  Phim SẮP CHIẾU
                </p>
                <div className="h-auto w-full 2lg:w-[250px] xl:w-[300px]">
                  {/* <CommingSoonComponent /> */}
                </div>
              </div>
              <div className="comming-soon-films mt-10 h-full">
                <p className="big-title border-b-[#5142FC] pb-2 text-xl font-semibold text-white">
                  Top 5 ĐÁNH GIÁ CAO
                </p>
                <div className="h-auto w-full 2lg:w-[250px] xl:w-[300px]">
                  {/* <Top5HighRatedComponent /> */}
                </div>
              </div>
            </div>
          </div>

          {ads && ads.bottom && (
            <div className="bottom-fixed fixed bottom-0 left-0 z-20 mx-auto flex w-full justify-center transition-all duration-500">
              <div className="relative h-[70px] max-w-[645px] shadow-lg shadow-blueSecondary md:w-[80%]">
                <Link
                  href={ads.bottom.link}
                  className="bottom-ads-neo relative mx-auto block h-[70px] w-full "
                  target="_blank"
                  rel="nofollow"
                >
                  <Image
                    src={ads.bottom.image_url}
                    fill
                    sizes="(min-width: 320px) 100vw"
                    loading="lazy"
                    className="object-cover"
                    alt=""
                  />
                </Link>
                <button
                  className="btn-close-bottom-ads absolute -top-[15px] right-[10px] flex items-center justify-center rounded-full bg-gray-600 p-2 transition-all duration-200 hover:bg-danger hover:text-white md:-right-[10px]"
                  type="button"
                  onClick={() => {
                    const bottomFixed = getElement(
                      ".bottom-fixed"
                    ) as HTMLElement;
                    if (bottomFixed) {
                      bottomFixed.style.transform = "translateY(120px)";
                    }
                  }}
                >
                  <IoMdClose size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <FooterComponent />
      <ToastContainer position="top-center" />
      {showModalContent && (
        <div className="fixed left-0 top-0 z-[100] flex h-full w-full items-center justify-center bg-gray-900 bg-opacity-25">
          <div className="relative h-full max-h-[400px] w-[90%] max-w-[720px]">
            <Link
              href={ads.content.link}
              className="center-ads-neo relative mx-auto block h-[400px] w-full"
              target="_blank"
              rel="nofollow"
            >
              <Image
                src={ads.content.image_url}
                fill
                sizes="(min-width: 320px) 100vw"
                loading="lazy"
                className="object-cover"
                alt=""
              />
            </Link>
            <button
              onClick={() => setShowModalContent(false)}
              className="absolute right-0 top-0 flex items-center justify-center bg-blueSecondary bg-opacity-60 p-1.5 text-center text-sm shadow-md shadow-blueSecondary"
            >
              Tắt quảng cáo
            </button>
          </div>
        </div>
      )}
    </>
  );
}
