const PropertyCard = ({ property }) => {
  const {
    property_name: title,
    images,
    property_Agent: agent,
    price: amount,
    status,
    property_location: location,
  } = property;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white border border-gray-200">
      {/* Property Image */}
      <img className="w-full h-48 object-cover" src={images[0]} alt={title} />

      {/* Card Content */}
      <div className="px-6 py-4">
        {/* Property Title */}
        <h2 className="font-bold text-xl mb-2 text-gray-800">{title}</h2>

        {/* Property Location */}
        <p className="text-gray-600 text-sm mb-2">Location: {location}</p>

        {/* Agent Name */}
        <p className="text-gray-600 text-sm mb-2">Agent: {agent}</p>

        {/* Offered Amount */}
        <p className="text-gray-800 font-semibold mb-2">
          Offered Amount: ${amount}
        </p>

        {/* Status */}
        <div className="flex justify-between items-center">
          <p
            className={`text-sm font-medium px-2 py-1 inline-block rounded-md ${
              status === "Available"
                ? "bg-green-100 text-green-700"
                : status === "Pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status}
          </p>
          {status === "Available" && (
            <button className="bg-primary text-sm font-medium px-2 py-1 inline-block rounded-md ">
              pay
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
