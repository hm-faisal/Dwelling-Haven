import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../components/Loading";
import PropertyCard from "./PropertyCard";

const PropertyBought = () => {
  const axiosBase = useAxios();
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
      <div className="grid grid-cols-4 gap-4 mx-12">
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
