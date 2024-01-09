"use client";

import { Tabs } from "antd";
import dynamic from "next/dynamic";
import { FaCirclePlay } from "react-icons/fa6";
import React, { useEffect, useState } from "react";

import HLSPlayerComponent from "./HLSPlayer";
import IframePlayerComponent from "./IframePlayer";

const CommentComponent = dynamic(
  async () => await import("@/components/Comment")
);
const ListFilmSameGenre = dynamic(
  async () => await import("@/components/ListFilmSameGenre")
);

function HandleTabEpisode({ item }: { item: any }) {
  if (!item)
    return (
      <div className="relative flex h-[360px] w-full max-w-[980px] animate-pulse items-center justify-center rounded-xl bg-brandLinear bg-opacity-20">
        <FaCirclePlay size={44} />
      </div>
    );

  const [currentEp, setCurrentEp] = useState<any>();
  const [itemsTab, setItemsTab] = useState<any[]>([]);

  useEffect(() => {
    if (!item) return;
    if (item.list_episode) {
      const length = item.list_episode.length - 1;
      setCurrentEp(item.list_episode[length].list_link[0]);
    }
    const _itemsTab: any = item.list_episode?.map((el: any, index: number) => ({
      key: index.toString(),
      label: <p className="text-base font-medium text-white">{el.name}</p>,
      children: (
        <div className="flex flex-wrap items-center justify-start gap-2">
          {el.list_link.reverse().map((v: any, index: number) => (
            <button
              key={`a${index}`}
              onClick={() => {
                setCurrentEp(v);
              }}
              className={`btn-ep rounded-sm transition-all duration-300 ${
                currentEp === v
                  ? "bg-blueSecondary text-white"
                  : "bg-white text-blueSecondary"
              } border border-blueSecondary p-1.5  text-center`}
              type="button"
            >{`Tập ${v.title}`}</button>
          ))}
        </div>
      ),
    }));
    setItemsTab(_itemsTab);
  }, [item]);

  // currentEp = item.list_episode?.[item.list_episode.length - 1].list_link[0];
  // const itemsTab = item.list_episode?.map((el: any, index: number) => ({
  //   key: index.toString(),
  //   label: <p className="text-base font-medium">{el.name}</p>,
  //   children: (
  //     <div className="flex flex-wrap items-center justify-start gap-2">
  //       {el.list_link.reverse().map((v: any, index: number) => (
  //         <button
  //           key={`a${index}`}
  //           className="btn-ep rounded-sm bg-blueSecondary p-1.5 text-center text-white"
  //           type="button"
  //           onClick={() => {
  //             "use client";
  //             currentEp = v;
  //           }}
  //         >
  //           {`Tập ${v.title}`}
  //         </button>
  //       ))}
  //     </div>
  //   ),
  // }));

  if (!item || !currentEp)
    return (
      <div className="relative flex h-[360px] w-full max-w-[980px] animate-pulse items-center justify-center rounded-xl bg-brandLinear bg-opacity-20">
        <FaCirclePlay size={44} />
      </div>
    );

  return (
    <section className="main-page watch-film-container mt-8 w-full">
      <div
        className={`video-player-container bg relative w-full animate-pulse overflow-hidden rounded-xl border border-blueSecondary bg-opacity-50`}
      >
        {currentEp?.link.trim().endsWith("m3u8") ? (
          <HLSPlayerComponent videoLink={currentEp?.link} />
        ) : (
          <IframePlayerComponent videoLink={currentEp?.link} />
        )}
      </div>
      <div className="film-info mt-4">
        <p className="head-title text-2xl font-medium capitalize">
          Xem phim {item?.title} - Tập {currentEp?.title}
        </p>
        <p className="original-title text italic">({item?.secondary_title})</p>
        <div className="mt-2 border-t border-t-overlay">
          <Tabs items={itemsTab} />
        </div>
        <div className="description-data mt-2 border-t border-t-blueSecondary py-2">
          <span className="border-b border-b-brandLinear pb-1 text-xl font-semibold">
            Giới thiệu phim
          </span>
          <p className="description-text mt-2 text-sm font-normal leading-6">
            {item?.description}
          </p>
        </div>
      </div>
      <CommentComponent slug={item?.slug} firstDataComment={item?.comments} />
      <div className="list-film-container">
        <ListFilmSameGenre listCategory={item?.category} />
      </div>
    </section>
  );
}

export default HandleTabEpisode;
