import { useQuery } from "@tanstack/react-query";
import Loading from "../../../components/Loading";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const { deleteCurrentUser } = useAuth();
  const axiosBase = useAxiosSecure();
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await axiosBase.get("/all-users");
      return data;
    },
  });

  const updateUserStatus = (id, status) => {
    axiosBase
      .patch(`/update-user-status/${id}`, {
        update_status: status,
      })
      .then(() => {
        refetch();
      });
  };

  const makeStatusFraud = (id) => {
    console.log("clicked");
    axiosBase
      .patch(`/update-user-to-fraud/${id}`, {
        status: "fraud",
      })
      .then((res) => {
        console.log(res.data);
        refetch();
      });
  };

  const onDelete = (id) => {
    axiosBase
      .delete(`/delete-user/${id}`)
      .then(() => {
        deleteCurrentUser().then((res) => {
          console.log(res);
          refetch();
        });
      })
      .catch((e) => console.log(e));
  };
  if (isLoading) return <Loading />;
  return (
    <>
      <div className="overflow-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
              <th>isFraud</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <th className="space-x-1">
                  {item.status !== "fraud" ? (
                    item.role === "admin" ? (
                      <button className="btn btn-secondary btn-xs" disabled>
                        Admin
                      </button>
                    ) : item.role === "agent" ? (
                      <button className="btn btn-secondary btn-xs" disabled>
                        Agent
                      </button>
                    ) : (
                      <>
                        <button
                          className="btn btn-primary btn-xs"
                          onClick={() => updateUserStatus(item._id, "admin")}
                        >
                          Make Admin
                        </button>
                        <button
                          className="btn btn-secondary btn-xs"
                          onClick={() => updateUserStatus(item._id, "agent")}
                        >
                          Make Agent
                        </button>
                      </>
                    )
                  ) : (
                    ""
                  )}
                  <button
                    className="btn btn-error btn-xs"
                    onClick={() => onDelete(item._id)}
                  >
                    Delete User
                  </button>
                </th>
                <td>
                  {item.status !== "fraud" ? (
                    <button
                      className="btn btn-primary btn-xs"
                      disabled={item.role === "agent" ? false : true}
                      onClick={() => makeStatusFraud(item._id)}
                    >
                      Mark as Fraud
                    </button>
                  ) : (
                    "True"
                  )}
                </td>
                <th>
                  {item.role === "admin" && "Admin"}
                  {item.role === "agent" && "Agent"}
                  {item.role === "user" && "User"}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageUsers;
