import { isEmpty } from "lodash";
import type { Metadata, ResolvingMetadata } from 'next'

import NotFoundComponent from "@/components/404";
import { BASE_URL, GET_FILM_FROM_SLUG } from '@/common/constant'
import { Suspense } from "react";
import Spinner from "@/components/Spinner";

type Props = {
    params: { slug: string }
    children: React.ReactNode
  }


  export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
  ): Promise<Metadata> {
    const slug = params.slug
   
    const product = await fetch(`${BASE_URL}${GET_FILM_FROM_SLUG}`, 
    {
        method: "POST",
        headers: {
          Accept: "application.json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug: slug,
          type: "short",
        }),
      }).then((res) => res.json())
   
    const previousImages = (await parent).openGraph?.images || []
    return {
      title: product.item
        ? `Phim ${product.item.title}`
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

  export default function FilmLayout({ params, children }: Props) {
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
        next: {revalidate: 900}
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
      return <Suspense fallback={<Spinner/>}>{children}</Suspense>
    });
  }