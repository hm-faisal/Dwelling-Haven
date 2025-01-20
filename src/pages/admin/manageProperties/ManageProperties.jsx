import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useHelmet from "../../../hooks/useHelmet";

const ManageProperties = () => {
  const axiosBase = useAxiosSecure();
  const helmet = useHelmet("Manage Property");
  const {
    data: property = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["property"],
    queryFn: async () => {
      const { data } = await axiosBase.get("/all-properties");
      return data;
    },
  });

  const verifyProperty = (id, status) => {
    axiosBase
      .patch(`/update-properties-status/${id}`, {
        update_status: status,
      })
      .then(() => {
        refetch();
      });
  };
  if (isLoading) return <Loading />;
  return (
    <>
      {helmet}
      <div className="overflow-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Property</th>
              <th>Agent</th>
              <th>Price ($)</th>
              <th>Action</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {property.map((item) => (
              <tr key={item._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={item.images[0]}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.property_name}</div>
                      <div className="text-sm opacity-50">
                        {item.property_location}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {item.property_agent}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {item.property_agent_email}
                  </span>
                </td>
                <td>
                  {item.property_price_min} - {item.property_price_max}
                </td>
                <th className="space-x-1">
                  {item.verify_status === "Verified" ? (
                    <button
                      className="btn btn-primary btn-xs"
                      onClick={() => verifyProperty(item._id, "verify")}
                      disabled
                    >
                      Verify
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
                        onClick={() => verifyProperty(item._id, "verify")}
                      >
                        Verify
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
                <td>
                  {item.verify_status === "Verified"
                    ? "Verified"
                    : item.verify_status === "Rejected"
                    ? "Rejected"
                    : "No Status"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageProperties;
