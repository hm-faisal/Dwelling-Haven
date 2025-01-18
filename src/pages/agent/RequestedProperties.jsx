import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

const RequestedProperties = () => {
  const axiosBase = useAxios();
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

  const verifyProperty = (id, status) => {
    axiosBase
      .patch(`/update-offer-status/${id}`, {
        update_status: status,
      })
      .then((res) => {
        console.log(res.data);
        refetch();
      });
  };

  console.log(property);
  return (
    <>
      <div className="overflow-x-auto">
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
                      <div className="text-sm opacity-50">{item.location}</div>
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
                  {item.status === "Verified" ? (
                    <button
                      className="btn btn-primary btn-xs"
                      onClick={() => verifyProperty(item._id, "accept")}
                      disabled
                    >
                      Accept
                    </button>
                  ) : item.verify_status === "Rejected" ? (
                    <button
                      className="btn btn-secondary btn-xs"
                      onClick={() => verifyProperty(item._id, "reject")}
                      disabled
                    >
                      Reject
                    </button>
                  ) : (
                    <>
                      <button
                        className="btn btn-primary btn-xs"
                        onClick={() => verifyProperty(item._id, "accept")}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-secondary btn-xs"
                        onClick={() => verifyProperty(item._id, "reject")}
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
    </>
  );
};

export default RequestedProperties;
