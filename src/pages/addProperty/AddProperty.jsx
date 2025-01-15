import { useState } from "react";
import { useForm } from "react-hook-form";
import uploadImage from "../../utils/uploadImage";
import { RxCross2 } from "react-icons/rx";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";

const AddProperty = () => {
  const { user } = useAuth();
  const axiosBase = useAxios();
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
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
    axiosBase
      .post("/add-properties", submitData)
      .then((res) => console.log(res.data))
      .catch((e) => console.log(e));
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-6 my-20"
      >
        {/* Property Agent */}
        <div className="form-control w-full">
          <label className="label font-bold">
            <span className="label-text">Agent Username</span>
          </label>
          <input
            type="text"
            value={user?.displayName}
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
            value={user?.email}
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
            placeholder="Property Name"
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
            placeholder="New York, USA"
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
            placeholder="1500"
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
                placeholder="15"
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
                placeholder="5"
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
            placeholder="2020"
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
            placeholder="2020"
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
            placeholder="2020"
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
            placeholder="Property Description"
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
            placeholder="Add Property Features with comma(,) separator"
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
            required
            multiple={false}
          />
        </div>

        {/* property images */}
        <div className="form-control w-full">
          <label className="label font-bold">
            <span className="label-text">Property upload Image</span>
          </label>
          <div className="flex gap-2">
            {images.map((item, i) => (
              <div key={i} className="relative p-2 border border-black rounded">
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
            placeholder="20"
            className="input input-bordered"
            {...register("property_vehicle_space", { required: true })}
          />
          {errors.property_vehicle_space && (
            <span className="text-red-700">This field is required</span>
          )}
        </div>

        <input
          type="submit"
          value="Add Property"
          className="btn btn-secondary mt-6"
        />
      </form>
    </>
  );
};

export default AddProperty;
