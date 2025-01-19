import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MyReview = () => {
  const axiosBase = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: reviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reviews", user],
    queryFn: async () => {
      const { data } = await axiosBase.get(`/my-reviews/${user?.email}`);
      return data;
    },
  });
  const onDelete = (id) => {
    axiosBase.delete(`/delete-review/${id}`).then((res) => {
      console.log(res);
      refetch();
    });
  };

  if (isLoading) return <Loading />;
  return (
    <div className="mx-12">
      <h2 className="text-xl font-semibold mb-4">All Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 items-stretch">
        {reviews.length > 0
          ? reviews.map((item) => (
              <div key={item._id} className="shadow p-3">
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
                <div className="created mt-4">At : {item.createdTime}</div>
                <div className="action my-4">
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => onDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          : "No Reviews Found"}
      </div>
    </div>
  );
};

export default MyReview;
