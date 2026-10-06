import { EffortSum } from "@/components/home/EffortSum";
import { Manifesto } from "@/components/home/Manifesto";
import { Founder } from "@/components/home/Founder";
import { Craft } from "@/components/home/Craft";
import { Drop } from "@/components/home/Drop";
import { EarnedFriday } from "@/components/home/EarnedFriday";
import { Community } from "@/components/home/Community";
import { getProducts } from "@/lib/commerce";

// Golden Circle order: why (the feeling, the belief, the person) → how (craft) → what (Drop 001),
// closing with the ritual and the community.
export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <EffortSum />
      <Manifesto />
      <Founder />
      <Craft />
      <Drop products={products} />
      <EarnedFriday />
      <Community />
    </>
  );
}
