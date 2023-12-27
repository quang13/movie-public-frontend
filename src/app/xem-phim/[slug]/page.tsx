"use client"

import React from "react";

import { getDataFromSlug } from "@/common/utils";
import HandleTabEpisode from "@/components/HandleTabEpisode";

export default async function WatchFilm({ params }: { params: any }) {
  const slug = params.slug;
  if (!slug) return null;
  let item: any = null;

  item = await getDataFromSlug(slug);

  // if (!item)
  //   return (
  //     <div className="relative flex h-[360px] w-full max-w-[980px] animate-pulse items-center justify-center rounded-xl bg-brandLinear bg-opacity-20">
  //       <FaCirclePlay size={44} />
  //     </div>
  //   );

  return <HandleTabEpisode item={item} />;
}
