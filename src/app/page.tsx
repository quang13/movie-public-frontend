// "use client"
// import { isEmpty } from "lodash";

// import { getListFilm } from "@/common/utils";
import ListCartoon from "@/components/ListCartoon";
// import ListFilmItemComponent from "@/components/ListFilmItem";
// import TabCategoryFilmComponent from "@/components/TabCategoryFilm";

export default async function Home() {

  // useEffect(() => {
  //   getListFilm("/film/get-all-film")
  //     .then((value) => {
  //       if (isEmpty(value.result)) {
  //         setListFilm([]);
  //       } else {
  //         setListFilm(value.result);
  //         setTotalPages(value.totalPages);
  //       }
  //     })
  //     .catch(() => setListFilm([]));
  // }, []);
  // const listFilm = await getListFilm("/film/get-all-film")

  return (
    <section className="main-page mx-auto w-full ">
      {/* <TabCategoryFilmComponent /> */}
      <p className="big-title mb-6 text-xl font-semibold text-white pb-2 border-b-2 border-b-[#5142fc7f] w-fit">Phim MỚI</p>
      <div className="list-film-container flex w-full flex-wrap items-start gap-2 mb-10">
        {/* <ListFilmItemComponent listFilm={listFilm} /> */}
      </div>
      <ListCartoon />
    </section>
  );
}
