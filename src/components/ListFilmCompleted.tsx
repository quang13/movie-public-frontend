import { BASE_URL, GET_FILM_BY_FILTER } from "@/common/constant";


async function fetchData() {
    const res = await fetch(`${BASE_URL}${GET_FILM_BY_FILTER}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filters: { status: "completed" }, limit: 8 }),
      next: { revalidate: 1800, tags: ["list-film-completed"] },
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


export default async function ListFilmCompleted(){

    const data = await fetchData()

}