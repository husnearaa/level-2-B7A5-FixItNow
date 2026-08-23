import HeroSection from "@/components/Home/HeroSection";
import CategoriesSection from "@/components/Home/CategoriesSection";
import PopularServices from "@/components/Home/PopularServices";
import HowItWorks from "@/components/Home/HowItWorks";
import WhyChooseFixItNow from "@/components/Home/WhyChooseFixItNow";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <CategoriesSection />
      <PopularServices />
      <HowItWorks />
      <WhyChooseFixItNow />
    </div>
  );
};

export default HomePage;
