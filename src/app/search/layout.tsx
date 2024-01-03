import { Metadata } from "next";
import { Suspense } from "react";
import LoadingSearch from "./loading";

type Props = {
  children: React.ReactNode;
  searchParams: { [key: string]: string | string[] | undefined };
};

export function Metadata({ searchParams }: Props): Metadata {
  return {
    title: `Kết quả tìm kiếm cho từ khoá ${searchParams.query}`,
  };
}

export default function SearchLayout({ children }: Props) {
  return <Suspense fallback={<LoadingSearch />}>{children}</Suspense>;
}
