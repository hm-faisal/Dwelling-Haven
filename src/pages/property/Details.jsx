import PropTypes from "prop-types";

const Details = ({
  name,
  location,
  price,
  category,
  size,
  vehicle,
  lastUpdate,
  build,
  bedrooms,
  bathrooms,
}) => {
  return (
    <>
      <h2 className="text-xl font-semibold mb-6">Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex justify-between mb-2">
          <span className=" font-semibold">Property Name:</span>
          <span className=" text-neutral">{name}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className=" font-semibold">Location:</span>
          <span className="text-neutral">{location}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className=" font-semibold">Price:</span>
          <span className="text-neutral">{price} $</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className=" font-semibold">Category:</span>
          <span className="text-neutral">{category}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className=" font-semibold">Property Size:</span>
          <span className="text-neutral">
            {size} ft<sup>2</sup>
          </span>
        </div>
        <div className="flex justify-between mb-2">
          <span className=" font-semibold">Vehicle Spaces:</span>
          <span className="text-neutral">{vehicle}</span>
        </div>
        {bedrooms && (
          <div className="flex justify-between mb-2">
            <span className=" font-semibold">Bedrooms:</span>
            <span className="text-neutral">{bedrooms}</span>
          </div>
        )}

        {bathrooms && (
          <div className="flex justify-between mb-2">
            <span className=" font-semibold">Bathrooms:</span>
            <span className="text-neutral">{bathrooms}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span className="font-semibold">Update Date:</span>
          <span className="text-neutral">{lastUpdate}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Year Built:</span>
          <span className="text-neutral">{build}</span>
        </div>
      </div>
    </>
  );
};

Details.propTypes = {
  name: PropTypes.string,
  location: PropTypes.string,
  price: PropTypes.string,
  category: PropTypes.string,
  size: PropTypes.string,
  vehicle: PropTypes.string,
  lastUpdate: PropTypes.string,
  build: PropTypes.string,
  bedrooms: PropTypes.string,
  bathrooms: PropTypes.string,
};

export default Details;
