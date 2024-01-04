"use client";

import Link from "next/link";
import { Button } from "antd";
import { isEmpty } from "lodash";
import { toast } from "react-toastify";
import { FaHome } from "react-icons/fa";
import { IoIosMenu } from "react-icons/io";
import React, { useState, useEffect } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import { useParams, usePathname, useRouter } from "next/navigation";

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
    startWith: "/quoc-gia/",
  },
  {
    name: "Thể loại",
    slug: "#",
    sub: true,
    startWith: "/the-loai/",
  },
  {
    name: "Phim mới",
    slug: "/danh-sach/phim-moi-cap-nhat",
    sub: false,
  },
  {
    name: "Phim chiếu rạp",
    slug: "/danh-sach/phim-chieu-rap",
    sub: false,
  },
  {
    name: "TV Shows",
    slug: "/the-loai/tv-shows",
    sub: false,
  },
];

export default function HeaderComponent() {
  const router = useRouter();
  const path = usePathname();

  const [categories, setCategories] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);

  const fetchDataList = async () => {
    try {
      const [categories, countries] = await Promise.all([
        getListCategory(),
        getListCountry(),
      ]);

      setCategories(categories);
      setCountries(countries);
    } catch (error) {
      // console.error("Error fetching data:", error);
      setCategories([]);
      setCountries([]);
    }
  };

  useEffect(() => {
    fetchDataList();
  }, []);

  const onSubmitSearch = (e: any) => {
    e.preventDefault();
    const keyword = e.target[0].value;
    if (!keyword) return toast.error("Vui lòng nhập từ khoá");
    router.push(`/search?query=${keyword}`);
  };

  const showMenuMobile = () => {
    const listMenu = getElement(".menu-container");
    if (!listMenu) return;
    listMenu.classList.toggle("active");
  };

  // const changeLink = (e: any) => {
  //   const link = e.slug || "/admin/post";
  //   const tmp = path.split("/");
  //   const _path = link === "/admin/post" ? "/admin/post" : `/${tmp[1]}`;

  //   if (_path === link || `/${category}` === link) {
  //     menuToggle.current?.classList.remove("active");
  //     return true;
  //   }
  //   return false;
  // };

  // const changeLink = (e: (typeof menus)[0]) => {
  //   const link = e.slug;
  //   const childrenLink = getElement("#children-link") as HTMLAnchorElement;
  //   if (link === "/" && path === "/") return true;
  //   if (e.sub === true) {
  //     if (!childrenLink || e.startWith) return false;
  //     const value = childrenLink.pathname;
  //     return e.startWith === value.startsWith(e.startWith);
  //   } else {
  //     if (link === path) return true;
  //   }
  //   return false;
  // };

  const changeLink = (menu: (typeof menus)[0]) => {
    const link = menu.slug;

    // Kiểm tra nếu đây là trang chính
    if (link === "/" && path === "/") return true;

    // Kiểm tra nếu đây là một menu con
    if (menu.sub === true) {
      // Nếu không có element con hoặc nếu menu bắt đầu với một giá trị cụ thể
      if (!menu.startWith) return false;
      // Kiểm tra xem đường dẫn hiện tại có bắt đầu với giá trị của menu hay không
      return path.startsWith(menu.startWith);
    } else {
      // Kiểm tra xem liên kết có khớp với đường dẫn hiện tại không
      return link === path;
    }
  };

  return (
    <header
      id="header-container w-full max-w-[1440px] px-4"
      className="md:border-b md:border-b-blueSecondary"
    >
      <div className="ads-top-header"></div>
      <div className="search-logo mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-8 p-4 sm:flex-row">
        <Link className="text-4xl font-bold" href="/">
          LOGO
        </Link>
        <div className="fav-search flex w-full items-center gap-6 sm:w-auto">
          <form
            className="search-item relative flex w-full items-center sm:w-auto"
            onSubmit={onSubmitSearch}
          >
            <input
              autoFocus
              className="fill-keyword w-full rounded-3xl border border-[#5142FC] p-2 pr-[95px] text-sm text-[#5142FC] sm:w-[300px]"
              placeholder="Bạn muốn tìm phim gì ?..."
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
          className="toggle-menu-mobile ml-4 rounded-full p-1 text-white transition-all duration-300 hover:bg-white hover:text-blueSecondary md:ml-0 md:hidden"
        >
          <IoIosMenu size={24} className="" />
        </button>
        <ul className="menu-container relative mx-auto flex max-w-[1440px] items-center justify-center gap-4">
          {menus.map((e, i) => {
            if (e.sub) {
              let submenus = [];
              if (e.name === "Thể loại") {
                submenus = categories;
              } else {
                submenus = countries;
              }
              return (
                <li
                  className={`menu-item menu-item-has-children relative py-4 text-sm font-bold uppercase lg:py-4 ${
                    changeLink(e) ? "active" : ""
                  }`}
                  key={`${i}${e.slug}`}
                >
                  {/* {e.icon} */}
                  <Link
                    href={e.slug}
                    className={`title-item flex items-center gap-1 ${
                      changeLink(e) ? "text-[#5142FC]" : ""
                    }`}
                  >
                    {e.name}
                    <IoChevronDownSharp size={16} />
                  </Link>
                  {!isEmpty(submenus) && (
                    <div className="submenu-container p-2">
                      <ul className="submenu w-full" id="submenu">
                        {submenus?.map((val, it) => (
                          <li
                            role="button"
                            key={`b${val.slug}${it}`}
                            className={`children-item relative border-b border-b-blueSecondary py-2 text-sm font-normal capitalize transition-all duration-300 hover:cursor-pointer hover:text-blueSecondary ${
                              e.startWith + val.slug === path
                                ? "active"
                                : ""
                            }`}
                            onClick={() => {
                              changeLink(e);
                            }}
                          >
                            <Link
                              href={`${e.startWith}${val.slug}`}
                              id="children-link"
                              className="inline-block h-full w-full"
                            >
                              {val.label}
                            </Link>
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
                className={`menu-item relative py-4 text-base font-bold uppercase transition-all duration-300 hover:text-[#4B50E6] lg:py-4 ${
                  changeLink(e) ? "active text-[#5142FC]" : ""
                }`}
                key={`b${e.name}`}
                onClick={() => changeLink(e)}
              >
                <Link href={e.slug}>{e.name}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
