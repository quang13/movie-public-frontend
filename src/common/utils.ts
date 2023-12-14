import { isEmpty } from "lodash";
import axios from "./axiosInstance";

export function getElement(classOrId: string) {
  const el = document.querySelector(classOrId);
  return el;
}

export function convertToSlug(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, (char) => (char === "đ" ? "d" : "D"))
    .replace(/[^a-z0-9]/g, "-");
}

export function toCapitalize(str: string) {
  return str.replace(/\b\w/g, char => char.toUpperCase());
}

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

export function calculateStatus(current_episode: any, totalEpisode: any) {
  if (totalEpisode === "Tập FULL") {
    return "Tập FULL";
  } else if (+current_episode === +totalEpisode) {
    return `Full ${current_episode}/${totalEpisode}`;
  } else if (totalEpisode === "?") {
    return `Tập ${current_episode}`;
  } else if (+current_episode < +totalEpisode) {
    return `Tập ${current_episode}/${totalEpisode}`;
  } else {
    return "Không xác định";
  }
}


export function getValueCategory(label: string) {
  if (!label) return;
  const result = label.toLowerCase().trim().replace(" ", "-");
  return result;
}

export async function getListCategory() {
  let dataList = [];
  const list = await axios.get("/film/category");
  if (!isEmpty(list.data.list)) {
    const lst = list.data.list.map((e: any) => ({
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
    const lst = list.data.listCountry.map((e) => ({
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

export async function getListQuality() {
  let dataList = [];
  const list = await axios.get("/film/quality");
  if (!isEmpty(list.data.listQuality)) {
    const lst = list.data.listQuality.map((e) => ({
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
    const lst = list.data.listLanguage.map((e) => ({
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
export async function getListFilm(url: string, filters?: any) {
  const result = await axios.post(url, filters ?? {}, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!isEmpty(result.data)) {
    return result.data;
  } else return null;
}
