import PropTypes from "prop-types";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import useAuth from "../../../hooks/useAuth";
import swal from "sweetalert";
import { useState } from "react";
import Modal from "./Modal";

const PropertyCard = ({ property, refetch }) => {
  const { userRole } = useAuth();
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleConfirmAction = () => {
    console.log("Confirmed!");
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white border border-gray-200">
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
        {status === "Available" && (
          <div className="p-4">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => {
                const id = _id;
                localStorage.setItem("propertyId", id);
                userRole === "user"
                  ? handleOpenModal()
                  : swal("Error", "Only user can Buy Property", "warning");
              }}
            >
              Pay
            </button>

            <Modal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              title="Confirm Payment"
              onConfirm={handleConfirmAction}
            >
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  amount={amount}
                  agentEmail={agentEmail}
                  customerEmail={customer_email}
                  propertyId={propertyId}
                  refetch={refetch}
                />
              </Elements>
            </Modal>
          </div>
        )}
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
              {/* <button
                className="btn"
                onClick={() => {
                  const id = _id;
                  localStorage.setItem("propertyId", id);
                  userRole === "user"
                    ? document.getElementById("my_modal_3").showModal()
                    : swal("Error", "Only user can Buy Property", "warning");
                }}
              >
                pay
              </button> */}
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
