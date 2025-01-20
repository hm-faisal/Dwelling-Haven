import { useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading";
import { useState } from "react";
import uploadImage from "../../utils/uploadImage";
import { useForm } from "react-hook-form";
import { RxCross2 } from "react-icons/rx";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import swal from "sweetalert";
import useHelmet from "../../hooks/useHelmet";

const UpdateProperties = () => {
  const { id } = useParams();
  const axiosBase = useAxiosSecure();
  const helmet = useHelmet("Update Properties");
  const { user } = useAuth();
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const { data: property = [], isLoading } = useQuery({
    queryKey: ["property", user],
    queryFn: async () => {
      const { data } = await axiosBase.get(`/properties/${id}`);
      setCategory(data.category);
      setImages(data.images);
      return data;
    },
  });
  const property_image = async (e) => {
    const image = await uploadImage(e);
    setImages([...images, image.data.url]);
  };
  const removeImage = (url) => {
    setImages(images.filter((item) => item !== url));
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const submitData = { images, category, ...data };
    console.log(submitData);
    axiosBase
      .put(`/update-properties/${id}`, submitData)
      .then((res) => {
        if (res.data) {
          swal(
            "Update Successfully",
            "Your Property Information update successfully",
            "success"
          );
        }
      })
      .catch((e) => console.log(e));
  };

  if (isLoading) return <Loading />;

  return (
    <>
      {helmet}
      <div className="mx-12 mb-12 ">
        <h2 className="text-5xl font-bold">Update Your Property</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8"
        >
          {/* Property Agent */}
          <div className="form-control w-full">
            <label className="label font-bold">
              <span className="label-text">Agent Username</span>
            </label>
            <input
              type="text"
              value={property.property_agent}
              readOnly={true}
              className="input input-bordered"
              {...register("property_agent", { required: true })}
            />
            {errors.property_agent && (
              <span className="text-red-700">This field is required</span>
            )}
          </div>
          {/* Property Agent email*/}
          <div className="form-control w-full">
            <label className="label font-bold">
              <span className="label-text">Agent Email</span>
            </label>
            <input
              type="email"
              value={property.property_agent_email}
              readOnly={true}
              className="input input-bordered"
              {...register("property_agent_email", { required: true })}
            />
            {errors.property_agent_email && (
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
              defaultValue={property.property_name}
              className="input input-bordered"
              {...register("property_name", { required: true })}
            />
            {errors.property_name && (
              <span className="text-red-700">This field is required</span>
            )}
          </div>
          {/* property category  */}
          <div className="form-control w-full">
            <label className="label font-bold">
              <span className="label-text">Property Category</span>
            </label>
            <select
              className="select select-ghost w-full max-w-xs"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option>Select Your Category</option>
              <option value={"house"}>House</option>
              <option value="apartments">Apartments</option>
              <option value={"office"}>Office</option>
            </select>
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
              defaultValue={property.property_location}
              className="input input-bordered"
              {...register("property_location", { required: true })}
            />
            {errors.property_location && (
              <span className="text-red-700">This field is required</span>
            )}
          </div>
          {/* Property size */}
          <div className="form-control w-full">
            <label className="label font-bold">
              <span className="label-text">
                Property Size (ft)<sup>2</sup>
              </span>
            </label>
            <input
              type="number"
              min={0}
              defaultValue={property.property_size}
              className="input input-bordered"
              {...register("property_size", { required: true })}
            />
            {errors.property_size && (
              <span className="text-red-700">This field is required</span>
            )}
          </div>
          {category !== "office" && (
            <>
              {/* Property bedrooms */}
              <div className="form-control w-full">
                <label className="label font-bold">
                  <span className="label-text">Bedrooms</span>
                </label>
                <input
                  type="number"
                  min={0}
                  defaultValue={property.property_bedrooms}
                  className="input input-bordered"
                  {...register("property_bedrooms", { required: true })}
                />
                {errors.property_bedrooms && (
                  <span className="text-red-700">This field is required</span>
                )}
              </div>
              {/* Property bathrooms */}
              <div className="form-control w-full">
                <label className="label font-bold">
                  <span className="label-text">Bathrooms</span>
                </label>
                <input
                  type="number"
                  min={0}
                  defaultValue={property.property_bathrooms}
                  className="input input-bordered"
                  {...register("property_bathrooms", { required: true })}
                />
                {errors.property_bathrooms && (
                  <span className="text-red-700">This field is required</span>
                )}
              </div>
            </>
          )}

          {/* Property Price min*/}
          <div className="form-control w-full">
            <label className="label font-bold">
              <span className="label-text">Property Price min</span>
            </label>
            <input
              type="number"
              min={0}
              defaultValue={property.property_price_min}
              className="input input-bordered"
              {...register("property_price_min", { required: true })}
            />
            {errors.property_price && (
              <span className="text-red-700">This field is required</span>
            )}
          </div>
          {/* Property Price max*/}
          <div className="form-control w-full">
            <label className="label font-bold">
              <span className="label-text">Property Price max</span>
            </label>
            <input
              type="number"
              min={0}
              defaultValue={property.property_price_max}
              className="input input-bordered"
              {...register("property_price_max", { required: true })}
            />
            {errors.property_price && (
              <span className="text-red-700">This field is required</span>
            )}
          </div>
          {/* Property build year */}
          <div className="form-control w-full">
            <label className="label font-bold">
              <span className="label-text">Property Build Year</span>
            </label>
            <input
              type="number"
              min={0}
              defaultValue={property.property_build}
              className="input input-bordered"
              {...register("property_build", { required: true })}
            />
            {errors.property_build && (
              <span className="text-red-700">This field is required</span>
            )}
          </div>

          {/* Property last Updated */}
          <div className="form-control w-full">
            <label className="label font-bold">
              <span className="label-text">Property Last Updated</span>
            </label>
            <input
              type="date"
              defaultValue={property.property_last_update}
              className="input input-bordered"
              {...register("property_last_update", { required: true })}
            />
            {errors.property_last_update && (
              <span className="text-red-700">This field is required</span>
            )}
          </div>

          {/* upload Description  */}
          <div className="form-control w-full">
            <label className="label font-bold">
              <span className="label-text">Property Description</span>
            </label>
            <textarea
              className="textarea textarea-bordered"
              defaultValue={property.property_description}
              {...register("property_description", { required: true })}
            ></textarea>
            {errors.property_description && (
              <span className="text-red-700">This field is required</span>
            )}
          </div>

          {/* Property Features */}
          <div className="form-control w-full">
            <label className="label font-bold">
              <span className="label-text">Property Features</span>
            </label>
            <textarea
              className="textarea textarea-bordered"
              defaultValue={property.property_features}
              {...register("property_features", { required: true })}
            ></textarea>
            {errors.property_features && (
              <span className="text-red-700">This field is required</span>
            )}
          </div>
          {/* Property Image */}
          <div className="form-control w-full">
            <label className="label font-bold">
              <span className="label-text">Property Image</span>
            </label>
            <input
              type="file"
              name="img"
              onChange={property_image}
              required={!images && true}
              multiple={false}
            />
          </div>

          {/* property images */}
          <div className="form-control w-full">
            <label className="label font-bold">
              <span className="label-text">Property uploaded Image</span>
            </label>
            <div className="flex gap-2">
              {images?.map((item, i) => (
                <div
                  key={i}
                  className="relative p-2 border border-black rounded"
                >
                  <img src={item} className="w-8 h-8" />
                  <RxCross2
                    className="absolute top-0 right-0"
                    onClick={() => removeImage(item)}
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Property vehicle space */}
          <div className="form-control w-full">
            <label className="label font-bold">
              <span className="label-text">Vehicle Space</span>
            </label>
            <input
              type="number"
              min={0}
              defaultValue={property.property_vehicle_space}
              className="input input-bordered"
              {...register("property_vehicle_space", { required: true })}
            />
            {errors.property_vehicle_space && (
              <span className="text-red-700">This field is required</span>
            )}
          </div>

          <input
            type="submit"
            value="Update Property"
            className="btn btn-secondary mt-6"
          />
        </form>
      </div>
    </>
  );
};

export default UpdateProperties;
