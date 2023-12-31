import { isEmpty } from "lodash";
import axios from "./axiosInstance";
import {
  BASE_URL,
  GET_FILM_BY_FILTER,
  GET_FILM_FROM_SLUG,
  TOTAL_STAR,
} from "./constant";
import axiosInstance from "./axiosInstance";

export function getElement(classOrId: string) {
  const el = document.querySelector(classOrId);
  return el;
}

export function getAllElement(classOrTag: string) {
  const els = document.querySelectorAll(classOrTag);
  return Array.from(els) as HTMLElement[];
}

export function convertToSlug(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, (char) => (char === "đ" ? "d" : "D"))
    .replace(/[^a-z0-9]/g, "-");
}

export function toCapitalize(inputText: string) {
  // Tách đoạn văn bản thành các từ
  const words = inputText.split(" ");

  // Lặp qua từng từ và chuyển đổi chữ cái đầu thành chữ hoa
  const capitalizedWords = words.map((word) => {
    // Nếu từ rỗng, không cần chuyển đổi
    if (word.length === 0) {
      return "";
    }

    // Chuyển đổi chữ cái đầu của từ
    const capitalizedWord =
      word.charAt(0).toUpperCase() + word.slice(1).toLocaleLowerCase();

    return capitalizedWord;
  });

  // Kết hợp lại các từ thành đoạn văn bản mới
  const resultText = capitalizedWords.join(" ");

  return resultText;
}

export function formatNumber(num: number) {
  if (Number.isNaN(num)) return 0;
  if (num >= 1000) {
    // Chuyển số thành dạng K, ví dụ: 1000 => 1K, 3600 => 3.6K
    return (num / 1000).toFixed(1) + "K";
  }
  // Trả về số nguyên nếu số không đạt yêu cầu
  return num.toString();
}

export const toStar = (rate: any) => {
  if (isEmpty(rate)) return `0/${TOTAL_STAR}`;
  const x = (
    rate.reduce((acc: any, current: any) => acc + current.star_number, 0) /
    rate.length
  ).toFixed(1);
  if (Number.isNaN(x)) {
    return `0/${TOTAL_STAR}`;
  }
  return `${x}/${TOTAL_STAR}`;
};

export function formatDateTime(dateTimeString: string) {
  return new Date(dateTimeString).toLocaleString("vi-VN", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    day: "numeric",
    month: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function calculateStatus(
  current_episode: any, //list
  totalEpisode: any, //number
  quality?: any
) {
  if (quality === "Trailer") return quality;
  if (totalEpisode === "Tập FULL") {
    return "Tập FULL";
  } else if (+current_episode[0]?.list_link?.length >= totalEpisode) {
    return `Hoàn tất ${totalEpisode}/${totalEpisode}`;
  } else if (totalEpisode === "?") {
    return `Tập ${current_episode[0]?.list_link?.length}`;
  } else if (+current_episode[0]?.list_link?.length < +totalEpisode) {
    return `Tập ${current_episode[0]?.list_link?.length}/${totalEpisode}`;
  } else {
    return "Không xác định";
  }
}

export function getValueCategory(label: string) {
  if (!label) return;
  const result = label.toLowerCase().trim().replace(" ", "-");
  return result;
}

export const getDataFromSlug = async (slug: string) => {
  const ress = await axiosInstance.post(
    GET_FILM_FROM_SLUG,
    { slug: slug },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  if (ress.status != 200) return null;
  return ress.data.item;
};

export async function getListCategory() {
  let dataList = [];
  const list = await axios.get("/film/category-client");
  if (!isEmpty(list.data.list)) {
    const lst = list.data.list.map((e: any) => ({
      label: e.name,
      value: e.slug,
      isDeleted: e.isDeleted,
      slug: e.slug,
    }));
    dataList = lst;
  } else {
    dataList = [];
  }
  return dataList;
}

export async function getSomeCategory(categories: any[]) {
  const list = Array.isArray(categories) ? categories : [categories];
}

export async function deleteCategory(category: string) {
  let res = false;
  const response = await axios.post("/film/category/delete", {
    category: category,
  });
  if (response.data) {
    res = response.data.result;
  } else {
    res = false;
  }
  return res;
}

export async function createCategory(categories: string[]) {
  let res = false;
  const response = await axios.post("/film/category/create", {
    category: categories,
  });
  if (response.data) {
    res = response.data.result;
  } else {
    res = false;
  }
  return res;
}

export async function getListCountry() {
  let dataList = [];
  const list = await axios.get("/film/country");
  if (!isEmpty(list.data.listCountry)) {
    const lst = list.data.listCountry.map((e: any) => ({
      label: e.name,
      value: e.slug,
      isDeleted: e.isDeleted,
      slug: e.slug,
    }));
    dataList = lst;
  } else {
    dataList = [];
  }
  return dataList;
}

export async function getListQuality() {
  let dataList = [];
  const list = await axios.get("/film/quality");
  if (!isEmpty(list.data.listQuality)) {
    const lst = list.data.listQuality.map((e: any) => ({
      label: e.name,
      value: e.name,
      isDeleted: e.isDeleted,
    }));
    dataList = lst;
  } else {
    dataList = [];
  }
  return dataList;
}

export async function getListLanguage() {
  let dataList = [];
  const list = await axios.get("/film/language");
  if (!isEmpty(list.data.listLanguage)) {
    const lst = list.data.listLanguage.map((e: any) => ({
      label: e.name,
      value: e.name,
      isDeleted: e.isDeleted,
    }));
    dataList = lst;
  } else {
    dataList = [];
  }
  return dataList;
}
// export async function getListFilm(url: string, filters?: any) {
//   const result = await axios.post(url, filters ?? {}, {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   if (!isEmpty(result.data)) {
//     return result.data;
//   } else return null;

// }

export async function getListFilm(url: string, filters?: any) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filters ?? {}),
    });

    if (!response.ok) {
      return null;
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonData = await response.json();

    if (!isEmpty(jsonData.result)) {
      return jsonData.result;
    } else {
      return [];
    }
  } catch (error) {
    // console.error('An error occurred:', error);
    return [];
  }
}

export async function getListData_v1() {
  const listCategory = await getListCategory();
  const listCountry = await getListCountry();
  const listQuality = await getListQuality();
  return { listCategory, listCountry, listQuality };
}

export async function getListData() {
  try {
    const [listCategory, listCountry, listQuality] = await Promise.all([
      getListCategory(),
      getListCountry(),
      getListQuality(),
    ]);
    return { listCategory, listCountry, listQuality };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { listCategory: [], listCountry: [], listQuality: [] };
  }
}
export async function fetchDataListCartoon() {
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
