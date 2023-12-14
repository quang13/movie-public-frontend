"use client";

import axiosInstance from "@/common/axiosInstance";
import { GET_FILM_BY_FILTER } from "@/common/constant";
import FiltersComponent from "@/components/Filters";
import ListFilmItemComponent from "@/components/ListFilmItem";
import { Input } from "antd";
import { useEffect, useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

export default function SearchPage({ searchParams }: { searchParams: any }) {
  const { query } = searchParams;
  const [filters, setFilters] = useState<any>({}); //Phim lẻ
  const [dataFilm, setDataFilm] = useState<any>({
    result: null,
    totalPages: 0,
    currentPage: 1,
  });
  const [fetchingData, setFetchingData] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

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

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const handlePrevPage = () => {
    if (currentPage !== 1) setCurrentPage((prev) => prev - 1);
  };

  useEffect(() => {
    if (!query) return;
    getDataFilm({ filters: { keyword: query } });
  }, []);

  useEffect(() => {
    if (!currentPage) return;
    getDataFilm({ ...filters, page: currentPage });
  }, [currentPage]);

  return (
    <section className="list-film-container w-full">
      <FiltersComponent
        filters={filters}
        setFilters={setFilters}
        fetching={fetchingData}
        setFetching={setFetchingData}
        onSubmit={getDataFilm}
        keyword={query}
      />
      <div className="data-list-film my-6 flex flex-wrap items-start gap-2">
        <ListFilmItemComponent listFilm={dataFilm?.result} />
      </div>
      {totalPages !== 0 && (
        <div className="pagination-container flex items-center justify-center gap-4">
          <button
            onClick={handlePrevPage}
            className={`prev-page flex h-8 w-8 items-center justify-center rounded-md transition-all duration-200 hover:bg-white hover:text-blueSecondary`}
            disabled={currentPage === 1}
          >
            <BsArrowLeft size={20} />
          </button>
          <Input
            className="block !h-8 !w-8 text-center !bg-blueSecondary !text-white"
            value={currentPage}
            disabled
          />
          <button
            onClick={handleNextPage}
            className="next-page flex h-8 w-8 items-center justify-center rounded-md transition-all duration-200 hover:bg-white hover:text-blueSecondary"
            disabled={currentPage === totalPages}
          >
            <BsArrowRight size={20} />
          </button>
        </div>
      )}
    </section>
  );
}
