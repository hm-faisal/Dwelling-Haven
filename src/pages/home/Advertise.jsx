import useAxios from "../../hooks/useAxios";
import { Link } from "react-router";
import { useEffect, useState } from "react";

const Advertise = () => {
  const axiosBase = useAxios();
  const [property, setProperty] = useState([]);
  useEffect(() => {
    axiosBase("/all-advertisement")
      .then((res) => setProperty(res.data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="m-12">
      <div className="text-center mb-12">
        <p className="text-sm text-gray-500">Explore Our Top Properties</p>
        <h2 className="text-2xl font-semibold text-gray-800">
          Check Our Premium Properties
        </h2>
        <div className="flex items-center space-x-2"></div>
      </div>
      {property.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 items-stretch">
          {property.map((item) => (
            <div className="card bg-base-100 shadow-xl" key={item._id}>
              {/* Property Image */}
              <figure>
                {item.images?.map((image, i) => (
                  <img
                    key={i}
                    src={image}
                    alt="Property"
                    className="w-full h-48 object-cover"
                  />
                ))}
              </figure>

              <div className="card-body">
                {/* Property Title */}
                <h2 className="card-title text-lg font-bold">{item.title}</h2>

                {/* Property Location */}
                <p className="text-sm text-gray-500">
                  Location: {item.location}
                </p>

                {/* Agent Info */}
                <div className="flex items-center mt-2">
                  <img
                    src={item.agentProfile}
                    alt="Agent"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <span className="font-medium">{item.agent}</span>
                </div>

                {/* Price Range */}
                <p className="mt-2 text-sm text-gray-700">
                  Price Range: ${item.priceMin} - ${item.priceMax}
                </p>

                {/* Action Buttons */}
                <div className="card-actions mt-4 flex justify-end">
                  <Link
                    className="btn btn-primary btn-sm"
                    to={`/properties/${item.propertyId}`}
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-full font-bold">
          No Property found
        </div>
      )}
    </div>
  );
};

export default Advertise;
