import Image from "next/image";
import { isEmpty } from "lodash";

import { BASE_URL, GET_FILM_FROM_SLUG } from "@/common/constant";
import { FaPlay, FaUser } from "react-icons/fa";
import Link from "next/link";
import ListFilmSameGenre from "@/components/ListFilmSameGenre";
import { calculateStatus } from "@/common/utils";

export default async function Film({ params }: { params: any }) {
  const slug = params.slug;


  const dataSlug = await fetch(`${BASE_URL}${GET_FILM_FROM_SLUG}`, {
    method: "POST",
    headers: {
      "Accept": "application.json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      slug: slug,
      type: "short",
    }),
  });
  if (dataSlug.ok) {
    const data = await dataSlug.json();
    const item = data.item;

    return (
      <section className="film-container mx-auto mt-6 max-w-[1440px] w-full items-start ">
        <div className="wrapper-content flex flex-col md:flex-row items-start gap-8">
          <div className="left-content mx-auto w-[300px] md:w-[230px]">
            <div className="film-thumbnail mx-auto relative mb-2 h-[320px] w-full overflow-hidden rounded-lg sm:w-[230px]">
              <Image
                src={item?.thumbnail}
                fill
                alt={item?.title}
                placeholder="blur"
                blurDataURL="/blur_img.webp"
                className="rounded-lg"
                sizes="(min-width: 320px) 100vw"
                loading="lazy"
              />
              {item?.thumbnail}
            </div>
            <Link
              className="watch-film mx-auto flex items-center justify-center gap-2 rounded-lg bg-danger px-3 py-2 transition-all duration-200 hover:opacity-80"
              type="button"
              role="button"
              tabIndex={1}
              href={`/xem-phim/${item?.slug}`}
            >
              <FaPlay /> Xem phim
            </Link>
          </div>
          <div className="right-content w-full">
            <div className="group-title mb-6">
              <p className="title-text text-xl font-semibold text-white">{item?.title}</p>
              {item?.originalTitle && (
                <p className="mt-2 text-sm italic">{item?.originalTitle}</p>
              )}
            </div>
            <div className="content-info w-full max-w-full rounded-lg p-4 shadow-[#14141F]">
              <p className="flex items-center gap-4 py-2 text-sm">
                <span className="status-text w-full max-w-[100px] font-semibold opacity-70">
                  Trạng thái
                </span>
                <span className="text detail-text">
                  {calculateStatus(item?.list_episode, item?.total_episode).trim()}
                </span>
              </p>
              <p className="duration flex items-center gap-4 py-2 text-sm">
                <span className="duration-text  w-[100px] font-semibold opacity-70">
                  Thời lượng
                </span>
                <span className="text detail-text">{item?.duration}</span>
              </p>
              {item?.total_episode! <= 1 && (
                <p className="total-ep flex items-center gap-8 py-2 text-sm">
                  <span className="duration-text  w-[100px] font-semibold opacity-70">
                    Số tập
                  </span>
                  <span className="text detail-text">{item?.total_episode}</span>
                </p>
              )}
              <p className="duration flex items-center gap-4 py-2 text-sm">
                <span className="duration-text  w-[100px] font-semibold opacity-70">
                  Thể loại
                </span>
                <span className="text detail-text">{item?.categories.join(", ")}</span>
              </p>
              <p className="duration flex items-center gap-4 py-2 text-sm">
                <span className="duration-text  w-[100px] font-semibold opacity-70">
                  Chất lượng
                </span>
                <span className="text detail-text">{item?.quality}</span>
              </p>
              <p className="duration flex items-center gap-4 py-2 text-sm">
                <span className="duration-text  w-[100px] font-semibold opacity-70">
                  Quốc gia
                </span>
                <span className="text detail-text">{item?.countries.join(", ")}</span>
              </p>
              {!isEmpty(item?.languae) && (
                <p className="duration flex items-center gap-4 py-2 text-sm">
                  <span className="duration-text  w-[100px] font-semibold opacity-70">
                    Ngôn ngữ
                  </span>
                  <span className="text detail-text">{item?.language.join(", ")}</span>
                </p>
              )}
              <p className="duration flex items-center gap-4 py-2 text-sm">
                <span className="duration-text  w-[100px] font-semibold opacity-70">
                  Năm sản xuất
                </span>
                <span className="text detail-text">{item?.year_release}</span>
              </p>
              {!isEmpty(item?.director) && (
                <p className="duration flex items-center gap-4 py-2 text-sm">
                  <span className="duration-text  w-[100px] font-semibold opacity-70">
                    Đạo diễn
                  </span>
                  <span className="text detail-text">{item?.director.join(", ")}</span>
                </p>
              )}
              {!isEmpty(item?.performer) && (
                <p className="duration flex items-center gap-4 py-2 text-sm">
                  <span className="duration-text  w-[100px] font-semibold opacity-70">
                    Diễn viên
                  </span>
                  <span className="text detail-text">{item?.performer.join(", ")}</span>
                </p>
              )}
              <p className="duration flex items-center gap-4 py-2 text-sm">
                <span className="duration-text  w-[100px] font-semibold opacity-70">
                  Lượt xem
                </span>
                <span className="text detail-text">{item?.views ?? 0}</span>
              </p>
            </div>
          </div>
        </div>
        {!isEmpty(item?.performer) && (
          <div className="performer-list wrapper-content mt-6">
            <p className="title-text-perfomer mb-4 text-base font-bold">
              Diễn viên
            </p>
            <ul className="performers flex flex-wrap items-start gap-6">
              {item?.performer.map((performer: string) => (
                <li
                  className="flex w-24 flex-col items-center justify-center text-center"
                  key={performer}
                >
                  <span className="img-performer flex h-16 w-16 items-center justify-center rounded-full bg-blueSecondary">
                    <FaUser />
                  </span>
                  <p className="name-perfomer mt-2 w-24 truncate text-sm">
                    {performer}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="description p-2 my-4">
          <p className="text-center text-base font-semibold uppercase mb-3">Nội dung phim</p>
          <p className="main-description text-sm opacity-80">
            {item?.description}
          </p>
        </div>
        <ListFilmSameGenre listCategory={item?.categories}/>
      </section>
    );
  } else return <div>jfhfhfhffhfh</div>;
}
