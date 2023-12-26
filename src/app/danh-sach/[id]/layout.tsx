import { BASE_URL } from "@/common/constant";
import NotFoundComponent from "@/components/404";
import Spinner from "@/components/Spinner";
import { TITLE_CONFIG } from "@/config/metadata-config";
import { TYPE_LIST_FILM_SINGLE_OR_SERIES } from "@/config/types";
import { Metadata } from "next";
import { Suspense } from "react";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
  children: React.ReactNode;
};

export function generateMetadata({ params }: Props): Metadata {
  const slug = params.id;

  if (TYPE_LIST_FILM_SINGLE_OR_SERIES.includes(slug)) {
    return {
      title:
        slug === "phim-le"
          ? TITLE_CONFIG.phimle
          : slug === "phim-bo"
            ? TITLE_CONFIG.phimbo
            : slug === "phim-chieu-rap"
              ? TITLE_CONFIG.phimchieurap
              : TITLE_CONFIG.phimmoicapnhat,
      description:
        slug === "phim-le"
          ? TITLE_CONFIG.phimle
          : slug === "phim-bo"
            ? TITLE_CONFIG.phimbo
            : slug === "phim-chieu-rap"
              ? TITLE_CONFIG.phimchieurap
              : TITLE_CONFIG.phimmoicapnhat,
      metadataBase: new URL(BASE_URL),
    };
  }
  return {
    title: "Không tìm thấy trang này",
    description: TITLE_CONFIG.home,
  };
}

export default function ListLayout({ children, params }: Props) {
  const isChecked = TYPE_LIST_FILM_SINGLE_OR_SERIES.includes(params.id);
  if (isChecked)
    return (
      <Suspense
        fallback={
          <div className="loading-list mx-auto flex h-screen w-screen items-center justify-center p-0">
            <Spinner />
          </div>
        }
      >
        {children}
      </Suspense>
    );
  return <NotFoundComponent />;
}
