import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading";
import PropertyCard from "./PropertyCard";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PropertyBought = () => {
  const axiosBase = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: property = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["property", user],
    queryFn: async () => {
      const { data } = await axiosBase.get(`/bought-properties/${user?.email}`);
      return data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 items-stretch">
        {property.length > 0
          ? property.map((property) => (
              <PropertyCard
                property={property}
                key={property._id}
                refetch={refetch}
              />
            ))
          : "No Property Found"}
      </div>
    </>
  );
};

export default PropertyBought;
