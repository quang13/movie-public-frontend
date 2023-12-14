import { BASE_URL } from "@/common/constant";
import NotFoundComponent from "@/components/404";
import { TITLE_CONFIG } from "@/config/metadata-config";
import { TYPE_LIST_FILM_SINGLE_OR_SERIES } from "@/config/types";
import { Metadata, ResolvingMetadata } from "next";
import { Suspense } from "react";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
  children: React.ReactNode;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.id;

  if (TYPE_LIST_FILM_SINGLE_OR_SERIES.includes(slug)) {
    // optionally access and extend (rather than replace) parent metadata
    //   const previousImages = (await parent).openGraph?.images || [];
    return {
      title: slug === "phim-le" ? TITLE_CONFIG.phimle : TITLE_CONFIG.phimbo,
      description:
        slug === "phim-le" ? TITLE_CONFIG.phimle : TITLE_CONFIG.phimbo,
      //   openGraph: {
      //     images: [product.item.thumbnail, ...previousImages],
      //   },
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
      <Suspense fallback={<div className="loading-list">Dang tai....</div>}>
        {children}
      </Suspense>
    );
  return <NotFoundComponent />;
}
