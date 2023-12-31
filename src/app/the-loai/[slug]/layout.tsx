import { BASE_URL, GET_ONE_CATEGORY } from "@/common/constant";
import NotFoundComponent from "@/components/404";
import Spinner from "@/components/Spinner";
import { TITLE_CONFIG } from "@/config/metadata-config";
import { Metadata } from "next";
import { Suspense } from "react";

type Props = {
  params: { slug: string };
  children: React.ReactNode;
};

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const slug = params.slug;
  const res = await fetch(`${BASE_URL}${GET_ONE_CATEGORY}?slug=${slug}`, {
    method: "GET",
    headers: {
      "Content-Type": "text/plain",
    },
  });
  if (res.ok) {
    const item = await res.json();
    return {
      title: `Danh sách phim theo Thể loại ${item?.result?.name}`,
      description: TITLE_CONFIG.home,
      metadataBase: new URL(BASE_URL),
    };
  }

  return {
    title: "Không tìm thấy trang này",
    description: TITLE_CONFIG.home,
  };
}

export default async function ListLayout({ children, params }: Props) {
  const slug = params.slug;
  const ress = await fetch(`${BASE_URL}${GET_ONE_CATEGORY}?slug=${slug}`, {
    method: "GET",
    headers: {
      "Content-Type": "text/plain",
    },
  });
  if (ress.ok) {
    const data = await ress.json();
    if (data.result)
      return <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <Spinner />
        </div>
      }
    >{children}</Suspense>;
    return <NotFoundComponent />;
  } else throw new Error(`Error: ${ress.statusText}`);
}
