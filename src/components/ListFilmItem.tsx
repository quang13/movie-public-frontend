import Link from "next/link";
import Image from "next/image";

import { calculateStatus } from "@/common/utils";

export default function ListFilmItemComponent({
  listFilm,
}: {
  listFilm: any[];
}) {
  if (listFilm === null) {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((e) => (
      <div
        className="film-item item-film-skeleton animate-pulse bg-brandLinear"
        key={e}
      ></div>
    ));
  }
  if (listFilm?.length === 0) {
    return <div className="w-full pt-5 text-center">Không có dữ liệu</div>;
  }
  return listFilm?.map((e: any) => (
    <Link
      className="film-item relative overflow-hidden p-2"
      key={e._id}
      href={`/phim/${e.slug}`}
    >
      {/* <div className="overlay-play bg-overlay invisible absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center rounded-xl transition-all duration-300 hover:visible">
                <CiPlay1 size={32} />
              </div> */}

      <Image
        src={e.thumbnail}
        fill
        alt={e.title}
        loading="lazy"
        placeholder="blur"
        blurDataURL="/blur_img.webp"
        style={{ objectFit: "cover" }}
        className="transition-all duration-300 hover:scale-105"
        sizes="(min-width: 320px) 100vw"
      />
      <span className="quality-text absolute left-0 top-0 z-10 min-w-[72px] rounded bg-danger p-1 text-center text-xs">
        {e.quality}
      </span>
      <span className="status-text absolute left-0 top-[26px] min-w-[72px] rounded-br rounded-tr bg-blueSecondary p-1 text-center text-xs text-white">
        {calculateStatus(e.list_episode, e.total_episode)}
      </span>

      <p className="watch-full-text absolute bottom-0 left-0 text-xl font-bold text-danger">
        Xem phim
      </p>
      <p className="title-film absolute bottom-0 left-0 z-50 w-full text-center text-sm ">
        <p className="title line-clamp-2 truncate">{e.title}</p>
        <p className="original-title italic text-[#ffab10]">
          ({e.secondary_title})
        </p>
      </p>
    </Link>
  ));
}
