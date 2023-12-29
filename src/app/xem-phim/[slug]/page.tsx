"use client";

import React, { useEffect, useState } from "react";
import { FaCirclePlay } from "react-icons/fa6";

import { getDataFromSlug } from "@/common/utils";
import HandleTabEpisode from "@/components/HandleTabEpisode";

export default function WatchFilm({ params }: { params: any }) {
  const slug = params.slug;
  if (!slug) return null;

  const [item, setItem] = useState<any>(null);

  const fetchData = async () => {
    const data = await getDataFromSlug(slug);
    setItem(data);
  };

  useEffect(() => {
    fetchData();
  }, [slug]);

  if (!item)
    return (
      <div className="relative flex h-[360px] w-full max-w-[980px] animate-pulse items-center justify-center rounded-xl bg-brandLinear bg-opacity-20">
        <FaCirclePlay size={44} />
      </div>
    );

  return <HandleTabEpisode item={item} />;
}
