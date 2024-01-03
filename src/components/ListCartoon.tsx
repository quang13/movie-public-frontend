import { BASE_URL, GET_FILM_BY_FILTER } from "@/common/constant";
import ListFilmItemComponent from "./ListFilmItem";

async function fetchData() {
  const res = await fetch(`${BASE_URL}${GET_FILM_BY_FILTER}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ filters: { category: "Hoạt hình" }, limit: 8 }),
    next: { revalidate: 1800, tags: ["list-film-cartoon"] },
  });
  if (res.ok) {
    const data_tmp = await res.json();
    return data_tmp;
  } else {
    return {
      result: [],
      totalPages: 0,
      currentPage: 1,
    };
  }
}

export default async function ListCartoon() {
  const data = await fetchData();

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
