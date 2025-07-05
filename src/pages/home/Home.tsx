import BooksList from "@/components/BooksList";
import HeroSection from "@/components/HeroSection";

const Home = () => {
  return (
    <div className="space-y-24">
      <HeroSection />
      <BooksList />
    </div>
  );
};

export default Home;
