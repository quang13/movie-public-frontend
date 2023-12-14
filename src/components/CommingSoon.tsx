"use client";

import Image from "next/image";
import { BASE_URL, GET_FILM_BY_FILTER, TOTAL_STAR } from "@/common/constant";

import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { IFilm } from "@/config/types";
import { IoIosStar } from "react-icons/io";

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
    <div className="comming-soon-container grid grid-cols-2 sm:grid-cols-3 gap-2 2lg:block ">
      {loading || dataFilm === null ? (
        <Spinner />
      ) : dataFilm.length === 0 ? (
        <p className="">Không có dữ liệu</p>
      ) : (
        dataFilm.result.map((e: IFilm) => (
          <div
            className="relative flex flex-col 2lg:flex-row w-full items-start gap-2 md:gap-4 py-2 2lg:border-b border-b-[#5142FC] cursor-pointer transition duration-300 hover:text-blueSecondary"
            key={e.slug}
          >
            <span className="block relative w-full max-w-[280px] 2lg:max-w-[75px] h-[343px] 2lg:h-[87px] border border-blue-200">
            <Image
              src={e.thumbnail}
              fill              
              sizes="(min-width: 320px) 100vw"
              alt={e.title as string}
              className="object-cover"
              placeholder="blur"
              blurDataURL="/blur_img.webp"
            />

            </span>
            <div className="info-data">
              <p className="title text-sm capitalize">{e.title}</p>
              <p className="year text-xs opacity-80">{e.year_release}</p>
              <p className="rates text-xs flex items-center gap-1">
                {`${
                  (e.rate!.reduce(
                    (acc, current) => acc + current.star_number,
                    0,
                  ) / e.rate!.length).toFixed(1)
                }/${TOTAL_STAR}`} <IoIosStar size={16} color={"orange"} />
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
