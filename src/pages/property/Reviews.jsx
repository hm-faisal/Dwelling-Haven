import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";

const Reviews = ({ id }) => {
  const axiosBase = useAxios();
  const { user } = useAuth();
  const {
    data: reviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const { data } = await axiosBase.get(`/reviews/${id}`);
      return data;
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const rating = {
      ...data,
      username: user.displayName,
      email: user.email,
      profile: user.photoURL,
      propertyId: id,
    };
    axiosBase
      .post("/reviews", rating)
      .then((res) => {
        refetch();
        console.log(res.data);
      })
      .catch((e) => console.log(e));
  };

  if (isLoading) return <Loading />;

  return (
    <div className="mt-6">
      <div className="">
        <h2 className="text-xl font-semibold mb-4">Add your experience</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          {/* Property Agent */}
          <div className="form-control w-full">
            <label className="label font-bold">
              <span className="label-text">Your Rating</span>
            </label>
            <input
              type="number"
              min={0.0}
              max={5.0}
              placeholder="4.9"
              className="input input-bordered"
              {...register("rating", { required: true })}
            />
            {errors.rating && (
              <span className="text-red-700">This field is required</span>
            )}
          </div>
          {/* Property Agent email*/}
          <div className="form-control w-full">
            <label className="label font-bold">
              <span className="label-text">Rating Description</span>
            </label>
            <textarea
              className="textarea textarea-bordered"
              placeholder="This is a perfect property for me"
              {...register("rating_description", { required: true })}
            ></textarea>

            {errors.rating_description && (
              <span className="text-red-700">This field is required</span>
            )}

            <input
              type="submit"
              value="Add Review"
              className="btn btn-primary mt-4"
            />
          </div>
        </form>
      </div>
      <div className="">
        <h2 className="text-xl font-semibold mb-4">All Reviews</h2>
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
                    <p className="">{item?.email}</p>
                  </div>
                  <div className="rating">
                    {"⭐".repeat(Math.floor(item.rating))}
                  </div>
                </div>
                <div className="description text-gray-500">
                  <p>{item.rating_description}</p>
                </div>
              </div>
            ))
          : "No Reviews Found"}
      </div>
    </div>
  );
};

Reviews.propTypes = {
  id: PropTypes.any,
};

export default Reviews;
