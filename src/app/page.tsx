import { faqItems } from "@/constants/faq";
import FAQSection from "@/views/faq";

export default function Home() {
  return (
    <main className="text-center max-w-[1100px] m-4 xl:mx-auto">
      <FAQSection faqItems={faqItems} />
    </main>
  );
}
