import HeroSection from "@/components/Home/HeroSection";
import CategoriesSection from "@/components/Home/CategoriesSection";
import PopularServices from "@/components/Home/PopularServices";
import HowItWorks from "@/components/Home/HowItWorks";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <CategoriesSection />
      <PopularServices />
      <HowItWorks />
    </div>
  );
};

export default HomePage;
