"use client";

import { Tabs } from "antd";
import React, { useEffect, useState } from "react";

import axiosInstance from "@/common/axiosInstance";
import CommentComponent from "@/components/Comment";
import IframePlayer from "@/components/IframePlayer";
import HLSPlayerComponent from "@/components/HLSPlayer";
import { BASE_URL, GET_FILM_FROM_SLUG } from "@/common/constant";

const getDataFromSlug = async (slug: string) => {
  const ress = await axiosInstance.post(
    GET_FILM_FROM_SLUG,
    { slug: slug },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  if (ress.status != 200) return null;
  return ress.data.item;
};

function WatchFilm({ params }: { params: any }) {
  const [currentEp, setCurrentEp] = useState<any>();
  const [itemsTab, setItemsTab] = useState<any[]>([]);
  const [item, setItem] = useState<any>(null);

  const slug = params.slug;
  if (!slug) return null;

  useEffect(() => {
    if (!slug) return;
    getDataFromSlug(slug)
      .then((value) => setItem(value))
      .catch(() => setItem(null));
  }, [slug]);

  useEffect(() => {
    if (!item) return;
    if (item.list_episode) {
      const length = item.list_episode.length - 1;
      setCurrentEp(item.list_episode[length].list_link[0]);
    }
    const _itemsTab: any = item.list_episode?.map((el: any, index: number) => ({
      key: index.toString(),
      label: <p className="text-base font-medium">{el.name}</p>,
      children: (
        <div className="flex flex-wrap items-center justify-start gap-2">
          {el.list_link.reverse().map((v: any, index: number) => (
            <button
            key={`a${index}`}
              onClick={() => {
                setCurrentEp(v);
              }}
              className="btn-ep rounded-sm bg-blueSecondary p-1.5 text-center text-white"
              type="button"
            >{`Tập ${v.title}`}</button>
          ))}
        </div>
      ),
    }));
    setItemsTab(_itemsTab);
  }, [item]);

  if (!item) return null;

  return (
    <section className="main-page watch-film-container mt-8 w-full">
      <div className={`video-player-container relative w-full`}>
        {currentEp ? (
          currentEp?.link.trim().endsWith("m3u8") ? (
            <HLSPlayerComponent videoLink={currentEp.link} />
          ) : (
            <IframePlayer videoLink={currentEp.link} />
          )
        ) : (
          <div className="relative h-[360px] w-full max-w-[980px] animate-pulse rounded-xl bg-brandLinear"></div>
        )}
      </div>
      <div className="film-info mt-4">
        <p className="head-title text-2xl font-medium capitalize">
          Xem phim {item.title} - Tập {currentEp?.title}
        </p>
        <p className="original-title text italic">({item.secondary_title})</p>
        <div className="border-t-overlay mt-6 border-t">
          <Tabs items={itemsTab} />
        </div>
        <div className="description-data mt-2 py-2 border-t border-t-blueSecondary">
          <span className="pb-1 border-b border-b-brandLinear">Giới thiệu phim</span>
          <p className="description-text mt-2 font-normal">
            {item.description}
          </p>
        </div>
      </div>
      <CommentComponent />
    </section>
  );
}

export default React.memo(WatchFilm);
