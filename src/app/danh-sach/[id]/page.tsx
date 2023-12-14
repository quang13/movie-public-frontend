"use client";

import React, { useState, useEffect } from "react";

import axiosInstance from "@/common/axiosInstance";
import FiltersComponent from "@/components/Filters";
import { GET_FILM_BY_FILTER } from "@/common/constant";
import ListFilmItemComponent from "@/components/ListFilmItem";

export default function ListFilmPage({ params }: { params: any }) {
  const [filters, setFilters] = useState<any>({}); //Phim lẻ
  const [dataFilm, setDataFilm] = useState<any>({
    result: null,
    totalPages: 0,
    currentPage: 1,
  });
  const [fetchingData, setFetchingData] = useState(false);
  const id = params.id;

  // const getDataFilm = async (filters: any) => {
  //   if (!filters) return;
  //   setFetchingData(true);
  //   const ress = await axiosInstance.post(GET_FILM_BY_FILTER, filters, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   if (ress.status === 200) {
  //     setFetchingData(false);
  //     setDataFilm(ress.data);
  //   } else {
  //     setFetchingData(false);
  //     setDataFilm({ result: [] });
  //   }
  // };

  const getDataFilm = async (filters: any) => {
    if (!filters) {
      setFetchingData(false);
      setDataFilm({ result: [] });
      return;
    }

    setFetchingData(true);
    try {
      const ress = await axiosInstance.post(
        GET_FILM_BY_FILTER,
        { filters: { ...filters } },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (ress.status === 200) {
        setFetchingData(false);
        setDataFilm(ress.data);
      } else {
        setFetchingData(false);
        setDataFilm({ result: [] });
      }
    } catch (error) {
      setFetchingData(false);
      setDataFilm({ result: [] });
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if(!id) return
    const newData = { ...filters };
    newData.type = id;
    setFilters(newData);
    getDataFilm({ type: id });
  }, [id]);

  return (
    <section className="list-film-container w-full">
      <FiltersComponent
        filters={filters}
        setFilters={setFilters}
        fetching={fetchingData}
        setFetching={setFetchingData}
        onSubmit={getDataFilm}
      />
      <div className="data-list-film flex flex-wrap items-start gap-2">
        <ListFilmItemComponent listFilm={dataFilm?.result} />
      </div>
    </section>
  );
}
