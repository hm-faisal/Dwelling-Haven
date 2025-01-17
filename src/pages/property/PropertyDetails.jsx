import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { useParams } from "react-router";
import Loading from "../../components/Loading";
import { FaLocationDot } from "react-icons/fa6";
import Overview from "./Overview";
import Features from "./Features";
import Details from "./Details";
import Reviews from "./Reviews";

const PropertyDetails = () => {
  const { id } = useParams();
  const axiosBase = useAxios();
  const { user } = useAuth();
  const { data: property = [], isLoading } = useQuery({
    queryKey: ["property", user],
    queryFn: async () => {
      const { data } = await axiosBase.get(`/properties/${id}`);
      return data;
    },
  });

  if (isLoading) return <Loading />;

  const addWishlist = (id) => {
    const wishlistData = {
      propertyId: id,
      user: user.displayName,
      email: user.email,
    };
    axiosBase
      .post(`/add-wishlist`, wishlistData)
      .then((res) => console.log(res.data))
      .catch((e) => console.log(e));
  };
  return (
    <div className="my-24 w-full">
      <div className=" mx-12 flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <div className="">
            <h3 className="text-3xl font-bold mb-3">
              {property.property_name}
            </h3>
            <p className="flex items-start justify-center gap-4 text-neutral">
              <FaLocationDot /> <span>{property.property_location}</span>
            </p>
          </div>
          <div className="">
            <h3 className="text-3xl font-bold mb-3">
              {property.property_price_min} $ - {property.property_price_max} $
            </h3>
            <p className=" text-neutral">
              {property.property_size} ft<sup>2</sup>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 grid-rows-2 overflow-hidden items-stretch">
          {property?.images?.map((item, i) => (
            <img
              src={item}
              key={i}
              className={`rounded ${i === 0 && "col-span-2 row-span-2"}`}
            />
          ))}
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="property col-span-8 border-double ">
            <div className="overview">
              <Overview
                Bedrooms={property.property_bedrooms}
                Bathrooms={property.property_bathrooms}
                Area={property.property_size}
                Built={property.property_build}
              />
            </div>
            <div className="description shadow-md rounded-lg p-6 mt-6">
              <h2 className="text-xl font-semibold mb-4">Description</h2>
              <p className="text-gray-500">{property.property_description}</p>
            </div>
            <div className="details  shadow-md rounded-lg p-6 mt-6">
              <Details
                name={property.property_name}
                location={property.property_location}
                price={`${property.property_price_min} - ${property.property_price_max}`}
                category={property.category}
                size={property.property_size}
                vehicle={property.property_vehicle_space}
                lastUpdate={property.property_last_update}
                build={property.property_build}
                bedrooms={property.property_bedrooms}
                bathrooms={property.property_bathrooms}
              />
            </div>
            <div className="features shadow-md rounded-lg p-6 mt-6">
              <h2 className="text-xl font-semibold mb-4">Features</h2>
              <Features features={property.property_features} />
            </div>
          </div>
          <div className="agent col-span-4 border  p-6">
            <div className="flex justify-start items-center gap-8">
              <img
                src={property.property_agent_img}
                alt="agent_photo"
                className="w-24 h-24 rounded-full"
              />
              <div className="">
                <p className="font-bold">{property.property_agent}</p>
                <p className="">{property.property_agent_email}</p>
              </div>
            </div>
            <div className="actions">
              <button
                className="btn btn-primary w-full"
                onClick={() => addWishlist(property._id)}
              >
                Add to Wishlist{" "}
              </button>
            </div>
            <div className="reviews">
              <Reviews id={property._id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
