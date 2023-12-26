export const PROD = process.env.NODE_ENV === "production";
export const isBrowser = typeof window !== 'undefined';
export const BASE_URL = PROD
  ? "https://deloy-server-movie.vercel.app"
  : "http://localhost:53535";
// export const BASE_URL = "https://deloy-server-movie.vercel.app"

export const acceptImage =
  "image/png,image/jpeg,image/webp,image/tiff,image/avif";
export const acceptVideo = "video/mp4,video/mkv";
export const VIDEO_API_KEY = "123774v9eris7ejjr68vkb";
export const DEFAULT_HEIGHT_INPUT = "40px";
export const TOTAL_STAR = 10

/* API ENDPOINT */

export const GET_DATA_FROM_LIST_CATEGORY = "/film/film-of-list-category"
export const GET_FILM_FROM_SLUG = "/film/film-by-slug"
export const GET_FILM_BY_FILTER = "/film/film-filter"
export const HOT_FILM="/film/hot-film"
export const GET_COMMENT="/film/get-comment"
export const GET_ADS = "/ads/get-all"
export const GET_ONE_CATEGORY="/film/category-one"
export const GET_ONE_COUNTRY="/film/country-one"