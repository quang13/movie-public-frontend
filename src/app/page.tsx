import dynamic from "next/dynamic";

import ListCartoon from "@/components/ListCartoon";
import ListNewFilms from "@/components/ListNewFilms";

const TabCategoryFilmComponent = dynamic(
  async () => await import("@/components/TabCategoryFilm")
);

export default function Home() {
  return (
    <section className="main-page home-page mx-auto w-full">
      <TabCategoryFilmComponent />
      <ListNewFilms />
      <ListCartoon />
    </section>
  );
}
