import BooksList from "@/components/BooksList";
import HeroSection from "@/components/HeroSection";
import { NeubrutalismFaq } from "@/components/ui/neubrutalism-faq";

const Home = () => {
  return (
    <div className="space-y-24">
      <HeroSection />
      <BooksList />
      <NeubrutalismFaq />
    </div>
  );
};

export default Home;
