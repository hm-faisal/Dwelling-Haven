import PropTypes from "prop-types";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const PropertyCard = ({ property, refetch }) => {
  const {
    title,
    images,
    agentName: agent,
    agentEmail,
    customer_email,
    price: amount,
    status,
    location,
    propertyId,
    _id,
    transactionId,
  } = property;

  const stripePromise = loadStripe(
    import.meta.env.VITE_PAYMENT_PUBLISHABLE_KEY
  );

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white border border-gray-200">
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Pay and get Your Property </h3>
          <p className="py-4 my-4 ">
            Total Applicable Amount :{" "}
            <span className="font-bold">{amount}</span> $
          </p>
          <Elements stripe={stripePromise}>
            <CheckoutForm
              amount={amount}
              agentEmail={agentEmail}
              customerEmail={customer_email}
              propertyId={propertyId}
              refetch={refetch}
            />
          </Elements>
        </div>
      </dialog>

      {/* Property Image */}
      <img
        className="w-full h-48 object-cover"
        src={images && images[0]}
        alt={title}
      />

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
            <>
              <button
                className="btn"
                onClick={() => {
                  const id = _id;
                  localStorage.setItem("propertyId", id);
                  document.getElementById("my_modal_3").showModal();
                }}
              >
                pay
              </button>
            </>
          )}
        </div>
        {transactionId && (
          <div className="my-4">
            Transaction Id : <span>{transactionId}</span>
          </div>
        )}
      </div>
    </div>
  );
};
PropertyCard.propTypes = {
  property: PropTypes.object,
  refetch: PropTypes.func,
};

export default PropertyCard;
