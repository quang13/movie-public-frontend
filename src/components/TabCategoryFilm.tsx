"use client";

import React, { useEffect, useState } from "react";

import { TAB_CATEGORY_FILM } from "@/common/enum";
import ListFilmItemComponent from "./ListFilmItem";
import { BASE_URL, GET_FILM_BY_FILTER } from "@/common/constant";


export default function TabCategoryFilmComponent() {
  const [dataFilm, setDataFilm] = useState<any>({
    result: null,
  });
  const [tabSelected, setTabSelected] = useState(TAB_CATEGORY_FILM.SERIES_NEW);

  const fetchData = async () => {
    const res = await fetch(`${BASE_URL}${GET_FILM_BY_FILTER}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filters: {
          type:
            tabSelected === TAB_CATEGORY_FILM.SINGLE_NEW
              ? "phim-le"
              : "phim-bo",
        },
        limit: 12,
      }),
      next: { revalidate: 1800, tags: ["list-film-tab-category"] }, //1800 giây sẽ xác thực lại dữ liệu
    });

    if (res.ok) {
      const tmp = await res.json();

      setDataFilm(tmp);
    } else {
      setDataFilm({
        result: [],
        totalPages: 0,
        currentPage: 1,
      });
    }
  };

  useEffect(() => {
    setDataFilm({
      result: null,
    });
    fetchData();
  }, [tabSelected]);

  return (
    <div className="list-film-tab-category w-full">
      <div className="flex w-full items-end gap-4">
        {Object.values(TAB_CATEGORY_FILM).map((e) => (
          <div
            className={`border-b-2 pb-2 ${
              tabSelected === e
                ? "border-b-[#5142FC] text-2xl uppercase text-blueSecondary"
                : "border-b-[#5142fc7f] text-white"
            }`}
            key={e}
            role="button"
            tabIndex={1}
            onClick={() => setTabSelected(e)}
          >
            {e}
          </div>
        ))}
      </div>
      <div className="list-film-container mb-10 mt-6 flex flex-wrap items-start gap-2">
        <ListFilmItemComponent listFilm={dataFilm?.result} />
      </div>
    </div>
  );
}
