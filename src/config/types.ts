export interface IFilm {
  _id: string;
  title?: string;
  secondary_title?: string;
  description?: string;
  thumbnail?: string | any;
  poster?: string;
  category: any;
  year_release: string;
  duration?: string;
  total_episode?: string | number;
  // list_episode?:
  //   | {
  //       name: string;
  //       list_link: {
  //         title: string;
  //         link: string;
  //       };
  //     }[]
  //   | string
  //   | number;
  list_episode?: {
    name: string;
    list_link: {
      title: string;
      link: string;
    }[];
  }[];

  outstating?: string;
  language?: string[];
  country?: string[];
  quality?: string;
  director: string[];
  performer?: string[];
  slug?: string | any;
  isDeleted?: boolean;
  updatedAt?: string | Date;
  createdAt?: string | Date;
}

export const TYPE_LIST_FILM_SINGLE_OR_SERIES = ["phim-le", "phim-bo"];
