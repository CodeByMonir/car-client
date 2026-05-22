import Image from "next/image";
import Banner from "./components/Banner";
import AvailableCars from "./components/AvailableCar";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <div>
      <Banner/>
      <AvailableCars/>
      <WhyChooseUs/>
      <Testimonials/>
    </div>
  );
}
