import PropTypes from "prop-types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import "./common.css";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CheckoutForm = ({ amount, refetch }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosBase = useAxiosSecure();
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    paymentIntend(amount);
  }, []);

  const paymentIntend = async (amount) => {
    try {
      const { data } = await axiosBase.post("/payment-intend", {
        pay: amount,
      });
      setClientSecret(data.clientSecret);
      return data;
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

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
    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {},
      },
    });
    if (paymentIntent?.status === "succeeded") {
      try {
        axiosBase
          .patch(`/sell-properties/${localStorage.getItem("propertyId")}`, {
            status: "Bought",
            id: paymentIntent.id,
          })
          .then((res) => {
            if (res.data) {
              navigate("/user/property-bought");
            }
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
      <label htmlFor="Submit" className="font-bold">
        You must press enter to confirm your payment
      </label>
    </form>
  );
};

CheckoutForm.propTypes = {
  agentEmail: PropTypes.string,
  clientSecret: PropTypes.string,
  amount: PropTypes.any,
  refetch: PropTypes.func,
};

export default CheckoutForm;
