import PropTypes from "prop-types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxios from "../../../hooks/useAxios";

import "./common.css";

const CheckoutForm = ({ amount, clientSecret, refetch, id }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosBase = useAxios();

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    // confirm payment
    const { paymentIntent } = await stripe.confirmCardPayment(
      `${clientSecret}`,
      {
        payment_method: {
          card: card,
          billing_details: {},
        },
      }
    );
    if (paymentIntent?.status === "succeeded") {
      try {
        axiosBase
          .patch(`/sell-properties/${id}`, {
            status: "Bought",
            id: paymentIntent.id,
          })
          .then((res) => {
            console.log(res.data);
            refetch();
          });
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button type="submit" disabled={!stripe} className="btn btn-primary">
        {`Pay ${amount} $`}
      </button>
    </form>
  );
};

CheckoutForm.propTypes = {
  agentEmail: PropTypes.string,
  clientSecret: PropTypes.string,
  amount: PropTypes.any,
  refetch: PropTypes.func,
  id: PropTypes.any,
};

export default CheckoutForm;
