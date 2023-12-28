"use client"

import ListCartoon from "@/components/ListCartoon";
import ListNewFilms from "@/components/ListNewFilms";
// import TabCategoryFilmComponent from "@/components/TabCategoryFilm";
import dynamic from "next/dynamic";
const TabCategoryFilmComponent = dynamic(
  async () => await import("@/components/TabCategoryFilm")
);

export default function Home() {
  return (
    <section className="main-page mx-auto w-full ">
      {/* <TabCategoryFilmComponent />
      <ListNewFilms /> */}
      <ListCartoon />
    </section>
  );
}
