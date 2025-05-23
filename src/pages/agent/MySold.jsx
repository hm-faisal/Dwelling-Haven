import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import useHelmet from "../../hooks/useHelmet";

const MySold = () => {
  const axiosBase = useAxiosSecure();
  const helmet = useHelmet("My Sold Properties");
  const [totalPrice, setTotalPrice] = useState(0);
  const { user } = useAuth();
  const { data: property = [], isLoading } = useQuery({
    queryKey: ["property", user],
    queryFn: async () => {
      const { data } = await axiosBase.get(`/sold-properties/${user?.email}`);
      if (data) {
        data.map((item) => setTotalPrice(totalPrice + Number(item.price)));
      }
      return data;
    },
  });

  if (isLoading) return <Loading />;

  console.log(totalPrice);

  return (
    <>
      {helmet}
      {property.length > 0 ? (
        <>
          <p className="text-sm opacity-50 flex items-center  gap-3">
            Total Amount Sold:{" "}
            <span className="font-bold opacity-100">{totalPrice}</span>
          </p>
          <div className="overflow-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Customer</th>
                  <th>Price ($)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {property?.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-bold">{item.title}</div>
                          <div className="text-sm opacity-50">
                            {item.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div>
                          <div className="font-bold">{item.customer_name}</div>
                          <div className="text-sm opacity-50">
                            {item.customer_email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{item.price}</td>

                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-full font-bold">
          No Property Found
        </div>
      )}
    </>
  );
};

export default MySold;
