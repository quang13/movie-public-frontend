import { isEmpty } from "lodash";
import { Metadata, ResolvingMetadata } from "next";

import NotFoundComponent from "@/components/404";
import { BASE_URL, GET_FILM_FROM_SLUG } from "@/common/constant";
import { toCapitalize } from "@/common/utils";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
  children: React.ReactNode;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const product = await fetch(`${BASE_URL}${GET_FILM_FROM_SLUG}`, {
    method: "POST",
    headers: {
      Accept: "application.json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      slug: slug,
      type: "short",
    }),
  }).then((res) => res.json());

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  return {
    title: product.item
      ? `Xem Phim ${toCapitalize(product.item.title)}`
      : "Phim không tồn tại",
    description: product.item
      ? product.item.description ?? product.item.title
      : "",
    openGraph: product.item
      ? {
          images: [product.item.thumbnail, ...previousImages],
        }
      : undefined,
    metadataBase: new URL(BASE_URL),
  };
}


export default function WatchFilmLayout({ children, params }: Props) {
    const slug = params.slug;
  
    // fetch data
    const fetchData = () => {
      return fetch(`${BASE_URL}${GET_FILM_FROM_SLUG}`, {
        method: "POST",
        headers: {
          Accept: "application.json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug: slug,
          type: "short",
        }),
        next: {revalidate: 900, tags:["watch-film"]}
      })
        .then((res) => res.json())
        .then((product) => {
          if (isEmpty(product.item)) {
            return Promise.reject("Not Found");
          }
          return Promise.resolve(product);
        })
        .catch(() => Promise.resolve({ item: null }));
    };
  
    return fetchData().then((product) => {
      if (isEmpty(product.item)) {
        return <NotFoundComponent/>;
      }
      return children;
    });
  }
  