import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

import useHelmet from "../../hooks/useHelmet";

const MyProperties = () => {
  const axiosBase = useAxiosSecure();

  const helmet = useHelmet("My Properties");
  const { user } = useAuth();
  const {
    data: property = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["property", user],
    queryFn: async () => {
      const { data } = await axiosBase.get(`/my-properties/${user?.email}`);
      return data;
    },
  });

  if (isLoading) return <Loading />;
  const onDelete = (id) => {
    axiosBase.delete(`/delete-property/${id}`).then((res) => {
      console.log(res.data);
      refetch();
    });
  };
  return (
    <>
      {helmet}
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
                <h2 className="card-title text-lg font-bold">
                  {item.property_name}
                </h2>

                {/* Property Location */}
                <p className="text-sm text-gray-500">
                  Location: {item.property_location}
                </p>

                {/* Agent Info */}
                <div className="flex items-center mt-2">
                  <img
                    src={user.photoURL}
                    alt="Agent"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <span className="font-medium">{item.property_agent}</span>
                </div>

                {/* Verification Status */}
                <p className="mt-2 text-sm font-bold">
                  Status:{item.verify_status}
                </p>

                {/* Price Range */}
                <p className="mt-2 text-sm text-gray-700">
                  Price Range: ${item.property_price_min} - $
                  {item.property_price_max}
                </p>

                {/* Action Buttons */}
                <div className="card-actions mt-4 flex justify-between">
                  {item.verify_status !== "Rejected" && (
                    <Link
                      className="btn btn-primary btn-sm"
                      to={`/agent/update-properties/${item._id}`}
                    >
                      Update
                    </Link>
                  )}
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => onDelete(item._id)}
                  >
                    Delete
                  </button>
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
    </>
  );
};

export default MyProperties;
