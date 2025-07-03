import { Typewriter } from "react-simple-typewriter";

const HeroSection = () => {
  return (
    <section className="text-center md:pt-6 px-6 md:px-0">
      <h1 className="text-4xl md:text-6xl font-black text-black dark:text-white">
        Manage &{" "}
        <span className="bg-purple-300 dark:bg-purple-400 px-2">
          <Typewriter
            words={["Borrow", "Organize", "Track", "Explore"]}
            loop={0}
            cursor
            cursorStyle=""
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1500}
          />
        </span>
      </h1>
      <p className="text-gray-700 dark:text-gray-400 mt-4 max-w-xl mx-auto">
        Easily manage your library books, track inventory, and borrow titles 
        all from one simple, responsive interface.
      </p>
    </section>
  );
};

export default HeroSection;
