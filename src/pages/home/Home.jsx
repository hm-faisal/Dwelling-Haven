import Advertise from "./Advertise";
import Carousel from "./Carousel";
import ContactSection from "./ContactSection";
import MeetOurTeam from "./MeetOurTeam";
import Properties from "./Properties";
import Reviews from "./Reviews";

const Home = () => {
  return (
    <>
      <div className="bg-base-100">
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
