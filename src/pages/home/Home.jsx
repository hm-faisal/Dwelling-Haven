import Advertise from "./Advertise";
import Carousel from "./Carousel";
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
      </div>
    </>
  );
};

export default Home;
