import { BASE_URL, GET_DATA_FROM_LIST_CATEGORY } from "@/common/constant";
import { IFilm } from "@/config/types";
import React from "react";
import { isEmpty } from "lodash";
import ListFilmItemComponent from "./ListFilmItem";

export default async function ListFilmSameGenre({
  listCategory,
}: {
  listCategory: string[];
}) {
  //Nhan vao 1 mang the loai
  const res = await fetch(`${BASE_URL}${GET_DATA_FROM_LIST_CATEGORY}`, {
    method: "POST",
    headers: {
      Accept: "application.json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category: listCategory }),
  });
  if (res.ok) {
    const parserData = await res.json();
    const dataList = parserData.result;
    return (
      <section className="list-data-content border-t border-t-blueSecondary border-opacity-50 py-4">
        <p className="text-2xl font-bold uppercase text-white">
          Phim cùng thể loại
        </p>
        {dataList.map((e: any) => (
          <div className="mt-6" key={e.slug}>
            <p className="title-head text-lg font-medium">{e.name}</p>
            {!isEmpty(e.result) && (
              <div className="relative mb-8 mt-4 flex flex-wrap items-start gap-2">
                <ListFilmItemComponent listFilm={e.result} />
              </div>
            )}
          </div>
        ))}
      </section>
    );
  }
  return <section className="">fdfdfdf</section>;
}
