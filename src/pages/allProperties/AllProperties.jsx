import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import Loading from "../../components/Loading";
import { Link } from "react-router";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";

const AllProperties = () => {
  const axiosBase = useAxios();
  const [sort, setSort] = useState("default");
  const [search, setSearch] = useState("");
  const { data: property = [], isLoading } = useQuery({
    queryKey: ["property", sort, search],
    queryFn: async () => {
      const { data } = await axiosBase.get(
        `/my-properties?sort=${sort}&search=${search}`
      );
      return data;
    },
  });

  if (isLoading) return <Loading />;

  const onSearch = (e) => {
    e.preventDefault();
    const search = e.target.search.value;
    setSearch(search);
  };

  return (
    <div className="m-12 mt-24">
      <div className="searchbox my-4 flex justify-between">
        <form onSubmit={onSearch}>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Search Property By location"
              name="search"
            />
            <button type="submit">
              <IoSearch />
            </button>
          </label>
        </form>
        <select
          className="select w-full max-w-xs"
          defaultValue={"default"}
          onChange={(e) => setSort(e.target.value)}
        >
          <option disabled value="default">
            Sort
          </option>
          <option value={"default"}>default</option>
          <option value={"low-to-high"}>Low to High</option>
          <option value={"high-to-low"}>High to Low</option>
        </select>
      </div>
      {property.length > 0 ? (
        <>
          <div className="grid grid-cols-4 gap-3">
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
                      src={item.agent_profile}
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
                  <div className="card-actions mt-4 flex justify-end">
                    <Link
                      className="btn btn-primary btn-sm"
                      to={`/properties/${item._id}`}
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-full font-bold">
          No Property found
        </div>
      )}
    </div>
  );
};

export default AllProperties;
