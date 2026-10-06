import { EffortSum } from "@/components/home/EffortSum";
import { Manifesto } from "@/components/home/Manifesto";
import { ColorShowcase } from "@/components/home/ColorShowcase";
import { Craft } from "@/components/home/Craft";
import { EarnedFriday } from "@/components/home/EarnedFriday";
import { getProduct } from "@/lib/commerce";

// Golden Circle order: why (the feeling) → how (craft) → what (the product).
export default async function Home() {
  const product = await getProduct("essential-tee");

  return (
    <>
      <EffortSum />
      <Manifesto />
      {product && <ColorShowcase product={product} />}
      <Craft />
      <EarnedFriday />
    </>
  );
}
