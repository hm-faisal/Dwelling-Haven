import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageWishlist = () => {
  const axiosBase = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: property = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["property", user],
    queryFn: async () => {
      const { data } = await axiosBase.get(`/wishlists/${user?.email}`);
      return data;
    },
  });

  if (isLoading) return <Loading />;
  const onDelete = (id) => {
    axiosBase
      .delete(`/delete-wishlists/${id}`)
      .then((res) => {
        console.log(res.data);
        refetch();
      })
      .catch((e) => console.log(e));
  };
  return (
    <>
      <div>
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
                      src={user?.agentPhoto}
                      className="w-10 h-10 rounded-full mr-3"
                    />
                    <span className="font-medium">{item.agentName}</span>
                  </div>

                  {/* Verification Status */}
                  <p className="mt-2 text-sm font-bold">
                    Status:{item.verify_status}
                  </p>

                  {/* Price Range */}
                  <p className="mt-2 text-sm text-gray-700">
                    Price Range: ${item.price_min} - ${item.price_max}
                  </p>

                  {/* Action Buttons */}
                  <div className="card-actions mt-4 flex justify-between">
                    {item.verify_status !== "Rejected" && (
                      <Link
                        className="btn btn-primary btn-sm"
                        to={`/user/buy-properties/${item._id}`}
                      >
                        Make an Offer
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
      </div>
    </>
  );
};

export default ManageWishlist;
