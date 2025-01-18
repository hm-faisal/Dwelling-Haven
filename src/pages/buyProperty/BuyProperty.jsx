import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxios from "../../hooks/useAxios";
import Loading from "../../components/Loading";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BuyProperty = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosBase = useAxios();
  const { data: property = {}, isLoading } = useQuery({
    queryKey: ["property"],
    queryFn: async () => {
      const { data } = await axiosBase.get(`/make-offer/${id}`);
      return data[0];
    },
  });

  const [offerPrice, setOfferPrice] = useState();
  const propertySubmitPrice = (e) => {
    if (parseInt(e) < parseInt(property.price_min)) {
      setOfferPrice(parseInt(property.price_min));
      toast.error("You can't set price less than minimum price", {
        autoClose: 1500,
      });
      return;
    }
    if (parseInt(e) > parseInt(property.price_max)) {
      setOfferPrice(parseInt(property.price_max));
      toast.error("You can't set price more than maximum price", {
        autoClose: 1500,
      });
      return;
    }

    setOfferPrice(parseInt(e));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const submitData = {
      status: "pending",
      price: data.offerPrice || property.price_min,
      customer_name: user.displayName,
      customer_email: user.email,
      property: property.propertyId,
    };
    axiosBase
      .post("/properties-sell", submitData)
      .then((res) => console.log(res.data))
      .catch((e) => console.log(e));
  };

  if (isLoading) return <Loading />;

  return (
    <div className="mx-12 mb-12 ">
      <ToastContainer />
      <h2 className="text-5xl font-bold">Make a Offer</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-6 my-8"
      >
        {/* Property buyer Username */}
        <div className="form-control w-full">
          <label className="label font-bold">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            value={user?.displayName || ""}
            readOnly={true}
            className="input input-bordered"
            {...register("customer_name")}
          />
          {errors.customer_name && (
            <span className="text-red-700">This field is required</span>
          )}
        </div>
        {/* Property Buyer email*/}
        <div className="form-control w-full">
          <label className="label font-bold">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly={true}
            className="input input-bordered"
            {...register("customer_email")}
          />
          {errors.customer_email && (
            <span className="text-red-700">This field is required</span>
          )}
        </div>
        {/* property Name  */}
        <div className="form-control w-full">
          <label className="label font-bold">
            <span className="label-text">Property Name</span>
          </label>
          <input
            type="text"
            value={property.title || ""}
            readOnly={true}
            className="input input-bordered"
            {...register("property_name")}
          />
          {errors.property_name && (
            <span className="text-red-700">This field is required</span>
          )}
        </div>
        {/* property Location  */}
        <div className="form-control w-full">
          <label className="label font-bold">
            <span className="label-text">Property Location</span>
          </label>
          <input
            type="text"
            value={property.location || ""}
            readOnly={true}
            className="input input-bordered"
            {...register("property_location")}
          />
          {errors.property_location && (
            <span className="text-red-700">This field is required</span>
          )}
        </div>

        {/* Property agent*/}
        <div className="form-control w-full">
          <label className="label font-bold">
            <span className="label-text">Property Agent </span>
          </label>
          <input
            type="text"
            value={property.agentName || ""}
            readOnly={true}
            className="input input-bordered"
            {...register("property_Agent")}
          />
          {errors.property_Agent && (
            <span className="text-red-700">This field is required</span>
          )}
        </div>

        {/* Property offer Price */}
        <div className="form-control w-full">
          <label className="label font-bold">
            <span className="label-text">Property Price </span>
          </label>
          <input
            type="number"
            onChange={(e) => propertySubmitPrice(e.target.value)}
            value={offerPrice || property.price_min}
            className="input input-bordered"
          />
        </div>

        <input
          type="submit"
          value="Offer"
          className="btn btn-primary mt-6 col-span-2"
        />
      </form>
    </div>
  );
};

export default BuyProperty;
