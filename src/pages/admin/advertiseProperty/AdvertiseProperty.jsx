import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../../components/Loading";
import swal from "sweetalert";
import useHelmet from "../../../hooks/useHelmet";
const AdvertiseProperty = () => {
  const axiosBase = useAxiosSecure();
  const helmet = useHelmet("Advertise Property");
  const { data: property = [], isLoading } = useQuery({
    queryKey: ["property"],
    queryFn: async () => {
      const { data } = await axiosBase.get("/all-properties?verified=true");
      return data;
    },
  });

  if (isLoading) return <Loading />;

  const addAdvertise = (id) => {
    axiosBase
      .post(`/advertise-properties/${id}`, { property: id })
      .then((res) => {
        if (res) {
          swal(
            "Advertise Added",
            "This property will Advertise Home page soon",
            "success"
          );
        }
      })
      .catch((e) => console.log(e));
  };
  return (
    <>
      <div className="overflow-auto">
        {helmet}
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Property</th>
              <th>Agent</th>
              <th>Price ($)</th>
              <th>Action</th>
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
                <td>
                  <button
                    type="button"
                    className="px-3 py-1 text-sm bg-primary font-bold rounded-md"
                    onClick={() => addAdvertise(item._id)}
                  >
                    Advertise
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdvertiseProperty;
