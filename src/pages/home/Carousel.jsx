import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import bgImage1 from "./../../assets/home/bg-home-1.jpg";
import bgImage2 from "./../../assets/home/bg-home-2.jpg";
import bgImage3 from "./../../assets/home/bg-home-3.jpg";
import bgImage4 from "./../../assets/home/bg-home-4.jpg";
import { Link } from "react-router";

const carouselItems = [bgImage1, bgImage2, bgImage3, bgImage4];

const HomeCarousel = () => {
  return (
    <div className="relative">
      <Carousel
        showThumbs={false}
        autoPlay={true}
        infiniteLoop={true}
        interval={2500}
        showArrows={false}
        showStatus={false}
        stopOnHover={false}
        showIndicators={false}
      >
        {carouselItems.map((item, i) => (
          <div key={i}>
            <img src={item} className="h-[65vh] object-cover brightness-50" />
          </div>
        ))}
      </Carousel>
      <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center flex-col gap-4">
        <h2 className="text-white text-3xl md:text-6xl font-bold">
          Find Your Perfect Home
        </h2>
        <p className="text-white text-base md:text-xl text-center max-w-screen-md">
          Discover a place you’ll love to call home – search through a wide
          range of properties tailored to your needs and preferences. Explore
          spaces perfect for living, working, or relaxing.
        </p>
        <Link to="/all-properties" className="btn">
          See all Property
        </Link>
      </div>
    </div>
  );
};

export default HomeCarousel;
