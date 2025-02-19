import Advertise from "./Advertise";
import Carousel from "./Carousel";
import MeetOurTeam from "./MeetOurTeam";
import Properties from "./Properties";
import Reviews from "./Reviews";
import useHelmet from "../../hooks/useHelmet";
import ContactSection from "../contact/ContactSection";
import Testimonials from "./Testimonials";

const Home = () => {
  const helmet = useHelmet("Home");
  return (
    <>
      <div className="bg-base-100">
        {helmet}
        <Carousel />
        <Properties />
        <Reviews />
        <Advertise />
        <ContactSection />
        <MeetOurTeam />
        <Testimonials />
      </div>
    </>
  );
};

export default Home;
