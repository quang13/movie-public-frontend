"use client";

import Link from "next/link";
import { Button } from "antd";
import { isEmpty } from "lodash";
import { toast } from "react-toastify";
import { FaHome } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { IoChevronDownSharp } from "react-icons/io5";

import { getElement, getListCategory, getListCountry } from "@/common/utils";

const menus = [
  {
    name: "Trang chủ",
    slug: "/",
    icon: <FaHome size={16} />,
    sub: false,
  },
  {
    name: "Phim lẻ",
    slug: "/danh-sach/phim-le",
    sub: false,
  },
  {
    name: "Phim bộ",
    slug: "/danh-sach/phim-bo",
    sub: false,
  },
  {
    name: "Quốc gia",
    slug: "#",
    sub: true,
  },
  {
    name: "Thể loại",
    slug: "#",
    sub: true,
  },
  {
    name: "Phim mới",
    slug: "#",
    sub: false,
  },
  {
    name: "Phim chiếu rạp",
    slug: "#",
    sub: false,
  },
  {
    name: "TV Shows",
    slug: "#",
    sub: false,
  },
];

export default function HeaderComponent() {

  const router = useRouter()

  const [categories, setCategories] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);

  useEffect(() => {
    getListCategory()
      .then((value) => setCategories(value))
      .catch((e) => setCategories([]));

    getListCountry()
      .then((value) => setCountries(value))
      .catch((e) => setCountries([]));
  }, []);

  const onSubmitSearch = (e: any) => {
    e.preventDefault();
    const keyword = e.target[0].value;
    if (!keyword) return toast.error("Vui lòng nhập từ khoá");
    router.push(`/search?query=${keyword}`)
  };

  const showMenuMobile = (e: any) => {
    const listMenu = getElement(".menu-container");
    if (!listMenu) return;
    listMenu.classList.toggle("active");
  };

  return (
    <header
      id="header-container w-full max-w-[1440px] px-4"
      className="md:border-b md:border-b-blueSecondary"
    >
      <div className="ads-top-header"></div>
      <div className="search-logo flex flex-col sm:flex-row gap-8 items-center justify-between p-4 mx-auto max-w-[1440px]">
        <Link className="text-4xl font-bold" href="/">LOGO</Link>
        <div className="fav-search flex items-center gap-6 w-full sm:w-auto">
          <form
            className="search-item relative flex items-center w-full sm:w-auto"
            onSubmit={onSubmitSearch}
          >
            <input
              autoFocus
              className="fill-keyword rounded-3xl border border-[#5142FC] p-2 pr-[95px] text-sm text-[#5142FC] w-full sm:w-[300px]"
              placeholder="Nhập từ khoá tìm kiếm..."
            />
            <Button
              className="btn-submit !absolute right-0 z-10 !h-full !rounded-none !rounded-br-3xl !rounded-tr-3xl !border-[#5142FC] !bg-[#5142FC] p-2 text-sm !text-white"
              htmlType="submit"
            >
              Tìm kiếm
            </Button>
          </form>
        </div>
      </div>
      <nav className="nav-container relative mx-auto w-full max-w-full md:bg-[#2b1867]">
        <button
          type="button"
          onClick={showMenuMobile}
          className="toggle-menu-mobile ml-4 md:ml-0 md:hidden rounded-full p-1 text-white transition-all duration-300 hover:bg-white hover:text-blueSecondary"
        >
          <IoIosMenu size={24} className="" />
        </button>
        <ul className="menu-container max-w-[1440px] mx-auto relative flex items-center justify-center gap-4">
          {menus.map((e) => {
            if (e.sub) {
              let submenu = [];
              if (e.name === "Thể loại") {
                submenu = categories;
              } else {
                submenu = countries;
              }
              return (
                <li
                  className="menu-item menu-item-has-children relative py-4 text-sm font-bold uppercase lg:py-4"
                  key={`a${e.name}`}
                >
                  {e.icon}
                  <Link
                    href={e.slug}
                    className="title-item flex items-center gap-1"
                  >
                    {e.name}
                    <IoChevronDownSharp size={16} />
                  </Link>
                  {!isEmpty(submenu) && (
                    <div className="submenu-container p-2">
                      <ul className="submenu w-full" id="submenu">
                        {submenu?.map((val) => (
                          <li
                            key={val.slug}
                            className="chilren-item relative border-b border-b-blueSecondary py-2 text-sm font-normal capitalize transition-all duration-300 hover:cursor-pointer hover:text-blueSecondary"
                          >
                            <Link href={`/${val.slug}`}>{val.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            }
            return (
              <li
                className="menu-item py-4 text-base font-bold uppercase transition-all duration-300 hover:text-[#4B50E6] lg:py-4"
                key={`b${e.name}`}
              >
                <Link href={e.slug}>
                  {e.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
