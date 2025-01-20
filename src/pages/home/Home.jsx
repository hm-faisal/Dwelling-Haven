import Advertise from "./Advertise";
import Carousel from "./Carousel";
import ContactSection from "./ContactSection";
import MeetOurTeam from "./MeetOurTeam";
import Properties from "./Properties";
import Reviews from "./Reviews";
import useHelmet from "../../hooks/useHelmet";

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
      </div>
    </>
  );
};

export default Home;
