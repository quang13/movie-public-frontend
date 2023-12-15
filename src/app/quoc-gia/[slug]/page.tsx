"use client";

import React, { useState, useEffect } from "react";

import axiosInstance from "@/common/axiosInstance";
import FiltersComponent from "@/components/Filters";
import { GET_FILM_BY_FILTER } from "@/common/constant";
import ListFilmItemComponent from "@/components/ListFilmItem";
import { Input } from "antd";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Spinner from "@/components/Spinner";

export default function ListFilmByCountryPage({ params }: { params: any }) {
  const [filters, setFilters] = useState<any>({});
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPages] = useState(1);
  const [dataFilm, setDataFilm] = useState<any>({
    result: null,
    totalPages: 0,
    currentPage: 1,
  });
  const [fetchingData, setFetchingData] = useState(false);
  const slug = params.slug;

  const getDataFilm = async (filters: any, limit?: number, page?: number) => {
    if (!filters) {
      setFetchingData(false);
      setDataFilm({ result: [] });
      return;
    }

    setFetchingData(true);
    try {
      const ress = await axiosInstance.post(
        GET_FILM_BY_FILTER,
        { filters: { ...filters }, limit: limit, page: page },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (ress.status === 200) {
        setFetchingData(false);
        setDataFilm(ress.data);
        setTotalPages(ress.data.totalPages);
      } else {
        setFetchingData(false);
        setDataFilm({ result: [] });
        setTotalPages(0);
      }
    } catch (error) {
      setFetchingData(false);
      setDataFilm({ result: [] });
      console.error("Error fetching data:", error);
    }
  };

  const prevPage = () => {
    if (currentPage === 1) return;
    setCurrentPages((prev) => prev - 1);
  };

  const nextPage = () => {
    if (currentPage === totalPages) return;
    setCurrentPages((prev) => prev + 1);
  };

  useEffect(() => {
    if (!slug) return;
    const newData = { ...filters };
    newData.category = slug;
    setFilters(newData);
    getDataFilm({ category: slug });
  }, [slug]);

  useEffect(() => {
    if (!currentPage) return;
    getDataFilm({ category: slug }, undefined, currentPage);
  }, [currentPage]);

  return (
    <section className="list-film-container w-full">
      <FiltersComponent
        filters={filters}
        setFilters={setFilters}
        fetching={fetchingData}
        onSubmit={getDataFilm}
      />
      <div className="data-list-film flex flex-wrap items-start gap-2">
        {fetchingData ? (
          <div className="my-8 mx-auto w-full flex justify-center">
            <Spinner />
          </div>
        ) : (
          <ListFilmItemComponent listFilm={dataFilm?.result} />
        )}
        <div className="mx-auto mt-6 flex items-center justify-center gap-2">
          {+totalPages > 1 && (
            <>
              <button
                onClick={prevPage}
                className="flex h-10 w-10 items-center justify-center rounded-md bg-[#5142FC] text-center text-white disabled:bg-opacity-50"
                type="button"
                disabled={currentPage === 1}
              >
                <BsArrowLeft size={20} />
              </button>
              <Input
                className="h-10 w-16 bg-[#5142FC] text-center text-white disabled:bg-[#5142FC] disabled:bg-opacity-90 disabled:text-white"
                value={`${currentPage}/${totalPages}`}
                disabled
              />
              <button
                onClick={nextPage}
                className="flex h-10 w-10 items-center justify-center rounded-md bg-[#5142FC] text-center text-white disabled:bg-opacity-50"
                disabled={currentPage === totalPages}
              >
                <BsArrowRight size={20} />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
