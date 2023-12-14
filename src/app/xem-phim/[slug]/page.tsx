"use client";

import { Tabs } from "antd";
import type { TabsProps } from "antd";
import React, { useEffect, useState } from "react";

import { IFilm } from "@/config/types";
import IframePlayer from "@/components/IframePlayer";
import { BASE_URL, GET_FILM_FROM_SLUG } from "@/common/constant";
import axiosInstance from "@/common/axiosInstance";
import HLSPlayerComponent from "@/components/HLSPlayer";
import CommentComponent from "@/components/Comment";

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
  const [linkVideo, setLinkVideo] = useState("");
  const [itemsTab, setItemsTab] = useState<any[]>([]);
  const slug = params.slug;
  if (!slug) return null;

  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    if (!slug) return;
    getDataFromSlug(slug)
      .then((value) => setItem(value))
      .catch(() => setItem(null));
  }, [slug]);

  useEffect(() => {
    if (!item) return;
    if (item.list_episode) {
      setCurrentEp(item.list_episode[0].list_link[0]);
    }
    const _itemsTab: any = item.list_episode?.map((el: any, index: number) => ({
      key: index.toString(),
      label: ()=><p className="font-medium text-base">{el.name}</p>,
      children: (
        <div className="flex flex-wrap items-center justify-start gap-2">
          {el.list_link.reverse().map((v: any) => (
            <button
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
      <div className="video-player-container w-full">
        {currentEp ? (
          currentEp?.link.trim().endsWith("m3u8") ? (
            <HLSPlayerComponent videoLink={currentEp.link} />
          ) : (
            <IframePlayer videoLink={currentEp.link} />
          )
        ) : (
          <div className="relative h-[360px] w-full max-w-[980px] animate-pulse rounded-xl bg-brandLinear"></div>
        )}
        {/* {currentEp && <HLSPlayerComponent videoLink={currentEp.link} />} */}
      </div>
      <div className="film-info mt-4">
        <p className="head-title font-medium text-2xl capitalize">
          Xem phim {item.title} - Tập {currentEp?.title}
        </p>
        <p className="original-title text italic">({item.secondary_title})</p>
        <div className="border-t-overlay mt-6 border-t">
          <Tabs items={itemsTab} />
        </div>
      </div>
      <CommentComponent/>
    </section>
  );
}

export default React.memo(WatchFilm);
