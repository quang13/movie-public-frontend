"use client";

import Image from "next/image";
import { BASE_URL, GET_FILM_BY_FILTER, TOTAL_STAR } from "@/common/constant";

import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { IFilm } from "@/config/types";
import { IoIosStar } from "react-icons/io";
import { isEmpty } from "lodash";
import Link from "next/link";
import { toStar } from "@/common/utils";

export default function CommingSoonComponent() {
  const [dataFilm, setDataFilm] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    const res = await fetch(`${BASE_URL}${GET_FILM_BY_FILTER}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filters: { quality: "Trailer" }, limit: 5 }),
      next: { revalidate: 900, tags: ["comming-soon"] },
    });
    if (res.ok) {
      const data = await res.json();
      setDataFilm(data);
      setLoading(false);
    } else {
      setDataFilm({ result: [] });
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  return (
    <div className="comming-soon-container 2lg:block grid grid-cols-2 gap-2 sm:grid-cols-3 ">
      {loading || dataFilm === null ? (
        <Spinner />
      ) : dataFilm.length === 0 ? (
        <p className="">Không có dữ liệu</p>
      ) : (
        dataFilm.result.map((e: IFilm) => (
          <Link
            className="2lg:flex-row 2lg:border-b relative flex w-full cursor-pointer flex-col items-start gap-2 border-b-[#5142FC] py-2 transition duration-300 hover:text-blueSecondary md:gap-4"
            key={e.slug}
            href={`/phim/${e.slug}`}
          >
            <span className="2lg:max-w-[75px] 2lg:h-[87px] relative block h-[343px] w-full max-w-[280px] border border-blue-200">
              <Image
                src={e.thumbnail}
                fill
                sizes="(min-width: 320px) 100vw"
                alt={e.title as string}
                className="object-cover"
                placeholder="blur"
                blurDataURL="/blur_img.webp"
                loading="lazy"
              />
            </span>
            <div className="info-data">
              <p className="title text-sm capitalize">{e.title}</p>
              <p className="year text-xs opacity-80">{e.year_release}</p>
              <p className="rates flex items-center gap-1 text-xs">
                {toStar(e.rate)} <IoIosStar size={16} color={"orange"} />
              </p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
