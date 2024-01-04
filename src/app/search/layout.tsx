import { Metadata } from "next";
import { Suspense } from "react";
import LoadingSearch from "./loading";
import { TITLE_CONFIG } from "@/config/metadata-config";

type Props = {
  children: React.ReactNode;
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
//   console.log("jejejee", searchParams);
  if (!searchParams || !searchParams.query)
    return {
      title: "Khong co tu khoa",
    };
  return {
    title: `Kết quả tìm kiếm cho từ khoá ${searchParams.query}`,
    description: TITLE_CONFIG.home,
  };
}

export default function SearchLayout({ children }: Props) {
  return <Suspense fallback={<LoadingSearch />}>{children}</Suspense>;
}
