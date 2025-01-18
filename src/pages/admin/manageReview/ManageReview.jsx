import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../components/Loading";
import ReviewCard from "../manageUsers/ReviewCard";

const ManageReview = () => {
  const axiosBase = useAxios();
  const {
    data: reviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosBase.get("/all-users-review");
      return data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="m-12">
        {reviews.length > 0 ? (
          <div className="grid grid-cols-4 gap-3 items-stretch">
            {reviews.map((item) => (
              <ReviewCard reviewer={item} key={item._id} refetch={refetch} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-full font-bold">
            No reviews found
          </div>
        )}
      </div>
    </>
  );
};

export default ManageReview;
