import ListFilmItemComponent from "./ListFilmItem";
import { fetchDataListCartoon } from "@/common/utils";

export default async function ListCartoon() {
  const data = await fetchDataListCartoon();

  return (
    <div className=" list-cartoon-container">
      <p className="big-title mb-6 w-fit border-b-2 border-b-[#5142fc7f] pb-2 text-xl font-semibold text-white">
        Phim Hoạt Hình
      </p>
      <div className="list-film-container mb-10 flex w-full flex-wrap items-start gap-2">
        <ListFilmItemComponent listFilm={data.result} />
      </div>
    </div>
  );
}
