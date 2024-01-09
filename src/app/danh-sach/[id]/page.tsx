"use client";

import React, { useState, useEffect } from "react";

import axiosInstance from "@/common/axiosInstance";
import FiltersComponent from "@/components/Filters";
import { DEFAULT_ITEMS, GET_FILM_BY_FILTER } from "@/common/constant";
import ListFilmItemComponent from "@/components/ListFilmItem";
import { Pagination, PaginationProps } from "antd";

export default function ListFilmPage({ params }: { params: any }) {
  const [filters, setFilters] = useState<any>({}); //Phim lẻ
  const [dataFilm, setDataFilm] = useState<any>({
    result: null,
    totalPages: 0,
    currentPage: 1,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [fetchingData, setFetchingData] = useState(false);
  const id = params.id;

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
      setTotalPages(0);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (!id) return;
    const newData = { ...filters };
    newData.type = id;
    setFilters(newData);
    getDataFilm({ type: id });
  }, [id]);

  // const prevPage = () => {
  //   if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  // };

  // const nextPage = () => {
  //   if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  // };

  useEffect(() => {
    if (!currentPage || currentPage == 0 || currentPage > totalPages) return;
    if (!id) return;

    getDataFilm({ ...filters, page: currentPage });
  }, [currentPage]);

  const onChangePage: PaginationProps["onChange"] = (page) => {
    // console.log(page);
    setCurrentPage(page);
  };

  return (
    <section className="list-film-container w-full">
      <FiltersComponent
        filters={filters}
        setFilters={setFilters}
        fetching={fetchingData}
        // setFetching={setFetchingData}
        onSubmit={getDataFilm}
      />
      <div className="data-list-film flex flex-wrap items-start gap-2">
        <ListFilmItemComponent listFilm={dataFilm?.result} />
      </div>
      <div className="group-btn-action-page w-full mt-8 mb-6 mx-auto">
        <div className="pagination mx-auto">
          <Pagination
            current={currentPage}
            onChange={onChangePage}
            total={20 * totalPages}
            defaultPageSize={DEFAULT_ITEMS}
            showSizeChanger={false}
            className="flex justify-center"            
          />
        </div>
      </div>
    </section>
  );
}
