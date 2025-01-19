import useAxios from "../../hooks/useAxios";
import { useEffect, useState } from "react";

const Reviews = () => {
  const axiosBase = useAxios();
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    axiosBase("/reviews")
      .then((res) => setReviews(res.data))
      .catch((e) => console.log(e));
  }, []);
  return (
    <div className=" m-12">
      <div className="text-center mb-12">
        <p className="text-sm text-gray-500">
          Explore reviews that showcase our commitment to excellence.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800">
          Your Voice, Our Pride
        </h2>
        <div className="flex items-center space-x-2"></div>
      </div>
      {reviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 items-stretch">
          {reviews.map((item) => (
            <div key={item._id} className="card bg-base-100 shadow-xl p-4">
              <div className="flex justify-start items-center gap-8">
                <img
                  src={item?.profile}
                  alt="agent_photo"
                  className="w-12 h-12 rounded-lg"
                />
                <div className="">
                  <p className="font-bold">{item?.username}</p>
                  <p className="">{"⭐".repeat(Math.floor(item.rating))}</p>
                </div>
              </div>
              <div className="property my-4">
                <p className="font-bold">{item?.title}</p>
                <p className="">{item?.agentName}</p>
              </div>
              <div className="description text-gray-500">
                <p>{item.rating_description}</p>
              </div>
              <div className="created mt-4">
                At : {item.createdTime.split(",")[0]}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-full font-bold">
          No Review found
        </div>
      )}
    </div>
  );
};

export default Reviews;
