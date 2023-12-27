import { getListFilm } from "@/common/utils";
// import ListFilmItemComponent from "./ListFilmItem";
import { BASE_URL } from "@/common/constant";
import dynamic from "next/dynamic";

const ListFilmItemComponent = dynamic(()=> import("./ListFilmItem"))

export default async function ListNewFilms() {
  const listFilm = await getListFilm(`${BASE_URL}/film/get-all-film`);

  return (
    <div className=" list-cartoon-container">
      <p className="big-title mb-6 w-fit border-b-2 border-b-[#5142fc7f] pb-2 text-xl font-semibold text-white">
        Phim MỚI
      </p>
      <div className="list-film-container mb-10 flex w-full flex-wrap items-start gap-2">
        <ListFilmItemComponent listFilm={listFilm} />
      </div>
    </div>
  );
}
