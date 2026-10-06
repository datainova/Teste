import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductView } from "@/components/product/ProductView";
import { getProduct, getProducts } from "@/lib/commerce";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: PageProps<"/produto/[handle]">): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);
  return product ? { title: product.title, description: product.description } : {};
}

export default async function ProductPage({ params, searchParams }: PageProps<"/produto/[handle]">) {
  const { handle } = await params;
  const { cor } = await searchParams;
  const product = await getProduct(handle);
  if (!product) notFound();

  return <ProductView product={product} initialColorId={typeof cor === "string" ? cor : undefined} />;
}
