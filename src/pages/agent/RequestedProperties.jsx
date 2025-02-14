import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useHelmet from "../../hooks/useHelmet";

const RequestedProperties = () => {
  const axiosBase = useAxiosSecure();
  const helmet = useHelmet("Requested Properties");
  const { user } = useAuth();
  const {
    data: property = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["property", user],
    queryFn: async () => {
      const { data } = await axiosBase.get(
        `/requested-properties/${user?.email}`
      );
      return data;
    },
  });

  if (isLoading) return <Loading />;

  const verifyProperty = (id, status, user) => {
    axiosBase
      .patch(`/update-offer-status/${id}/${user}`, {
        update_status: status,
      })
      .then((res) => {
        console.log(res.data);
        refetch();
      });
  };

  return (
    <>
      {helmet}
      {property.length > 0 ? (
        <div className="overflow-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Property</th>
                <th>Customer</th>
                <th>Offered Price ($)</th>
                <th>Action</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {property.map((item) => (
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
                    {item.customer_name}
                    <br />
                    <span className="badge badge-ghost badge-sm">
                      {item.customer_email}
                    </span>
                  </td>
                  <td>{item.price}</td>
                  <th className="space-x-1">
                    {item.status !== "pending" ? (
                      <>
                        <button className="btn btn-primary btn-xs" disabled>
                          Accept
                        </button>
                        <button className="btn btn-secondary btn-xs" disabled>
                          Reject
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-primary btn-xs"
                          onClick={() =>
                            verifyProperty(
                              item._id,
                              "accept",
                              item.customer_email
                            )
                          }
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn-secondary btn-xs"
                          onClick={() =>
                            verifyProperty(
                              item._id,
                              "reject",
                              item.customer_email
                            )
                          }
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </th>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full font-bold">
          No Request Found
        </div>
      )}
    </>
  );
};

export default RequestedProperties;
