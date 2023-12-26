import { BASE_URL, GET_ONE_COUNTRY } from "@/common/constant";
import NotFoundComponent from "@/components/404";
import { TITLE_CONFIG } from "@/config/metadata-config";
import { Metadata } from "next";
import { Suspense } from "react";

type Props = {
  params: { slug: string };
  // searchParams: { [key: string]: string | string[] | undefined };
  children: React.ReactNode;
};

export async function generateMetadata(
  { params }: Props
  // parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;
  const res = await fetch(`${BASE_URL}${GET_ONE_COUNTRY}?slug=${slug}`, {
    method: "GET",
    headers: {
      "Content-Type": "text/plain",
    },
  });
  if (res.ok) {
    const item = await res.json();
    return {
      title: `Danh sách phim theo Quốc gia ${item.result.name}`,
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
  }).then((value) => value.json());
  if (ress.result)
    return (
      <Suspense
        fallback={
          <div className="loading-list mx-auto flex h-full w-full items-center justify-center p-0">
            Đang tải...
          </div>
        }
      >
        {children}
      </Suspense>
    );
  return <NotFoundComponent />;
}
