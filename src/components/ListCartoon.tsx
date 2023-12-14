"use client";

import { useEffect, useState } from "react";

import { BASE_URL, GET_FILM_BY_FILTER } from "@/common/constant";
import ListFilmItemComponent from "./ListFilmItem";

export default function ListCartoon() {
  const [data, setData] = useState<any>({
    result: null,
    totalPages: 0,
    currentPage: 1,
  });
  const fetchData = async () => {
    const res = await fetch(`${BASE_URL}${GET_FILM_BY_FILTER}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filters: { category: "Hoạt hình" }, limit: 8 }),
      next: { revalidate: 1800, tags:["list-film-cartoon"] },
    });
    if (res.ok) {
      const data_tmp = await res.json();
      setData(data_tmp);
    } else {
      setData({
        result: [],
        totalPages: 0,
        currentPage: 1,
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className=" list-cartoon-container">
      <p className="big-title mb-4 text-xl font-bold text-white">
        Phim HOAT HINH
      </p>
      <div className="list-film-container flex w-full flex-wrap items-start gap-2">
        <ListFilmItemComponent listFilm={data.result} />
      </div>
    </div>
  );
}
