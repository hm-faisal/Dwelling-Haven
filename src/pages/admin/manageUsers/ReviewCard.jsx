import PropTypes from "prop-types";
import useAxios from "../../../hooks/useAxios";
const ReviewCard = ({ refetch, reviewer }) => {
  const axiosBase = useAxios();
  const onDelete = (id) => {
    axiosBase
      .delete(`/delete-review/${id}`)
      .then((res) => console.log(res.data))
      .catch((e) => console.log(e));

    refetch();
  };
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4">
      <div className="flex items-center">
        <img
          className="w-12 h-12 rounded-full mr-4"
          src={reviewer.profile}
          alt={`${reviewer.username}'s avatar`}
        />
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            {reviewer.username}
          </h2>
          <p className="rating">{"⭐".repeat(Math.floor(reviewer.rating))}</p>
          <p className="text-sm text-gray-500">{reviewer.email}</p>
        </div>
      </div>
      <p className="mt-4 text-gray-700">{reviewer.rating_description}</p>
      <button
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        onClick={() => onDelete(reviewer._id)}
      >
        Delete
      </button>
    </div>
  );
};

ReviewCard.propTypes = {
  reviewer: PropTypes.object,
  refetch: PropTypes.func,
};

export default ReviewCard;
