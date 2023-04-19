import React, { useState, useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

const options = {
  style: {
    base: {
      fontSize: "32px",
      color: "#52a635",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2521",
    },
  },
};

function CardSection({ submitOrder, user }) {
  return (
    <div className="p-6">
      <span>Credit or debit card</span>
      <div className="my-4">
        <CardElement options={options} />
      </div>
      <button
        className="inline-block w-full px-6 py-3 text-center font-bold text-white bg-green-500 hover:bg-green-600 transition duration-200 rounded-full"
        onClick={submitOrder}
      >
        {user ? "Confirm Order" : "Login to Order"}
      </button>
    </div>
  );
}

const INITIAL_STATE = {
  address: "",
  city: "",
  state: "",
  stripe_id: "",
};

export default function CheckoutForm() {
  const [data, setData] = useState(INITIAL_STATE);
  const { user, cart } = useAuth();
  const stripe = useStripe();
  const router = useRouter();
  const elements = useElements();

  function onChange(e) {
    const updateItem = (data[e.target.name] = e.target.value);
    setData({ ...data, updateItem });
    console.log(data);
  }

  async function submitOrder() {
    alert("Order submitted");
    // const cardElement = elements.getElement(CardElement);
    // const token = await stripe.createToken(cardElement);
    // const userToken = Cookies.get("token");

    // try {
    //   const response = await fetch(
    //     `${process.env.STRAPI_URL || "http://127.0.0.1:1337"}/api/orders`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${userToken}`,
    //       },
    //       body: JSON.stringify({
    //         amount: Number(Math.round(appContext.cart.total + "e2") + "e-2"),
    //         dishes: appContext.cart.items,
    //         address: data.address,
    //         city: data.city,
    //         state: data.state,
    //         token: token.token.id,
    //       }),
    //     }
    //   );

    //   if (response.status === 200) {
    //     alert("Transaction Successful, continue your shopping");
    //     router.push("/");
    //   } else {
    //     alert(response.statusText);
    //   }
    // } catch (error) {
    //   console.log("error", error);
    // }
  }

  return (
    <form>
      <div className="bg-white shadow-md rounded-lg p-8">
        <h5 className="text-lg font-semibold">Your information:</h5>
        <hr className="my-4" />
        <div className="flex mb-6">
          <div className="flex-1">
            <label
              className="block mb-2 test-gray-800 font-medium"
              htmlFor="address"
            >
              Address
            </label>
            <input
              id="address"
              htmlFor="address"
              className="appearance-none block w-full p-3 leading-5 text-gray-900 border border-gray-200 rounded-lg shadow-md placeholder-text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              type="text"
              name="address"
              onChange={onChange}
              placeholder="Enter your address"
            />
          </div>
        </div>
        <div className="flex mb-6">
          <div className="flex-1 mr-6">
            <label
              htmlFor="city"
              className="block mb-2 test-gray-800 font-medium"
            >
              City
            </label>
            <input
              type="text"
              name="city"
              id="city"
              onChange={onChange}
              className="appearance-none block w-full p-3 leading-5 text-gray-900 border border-gray-200 rounded-lg shadow-md placeholder-text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            />
          </div>

          <div className="w-1/4">
            <label
              htmlFor="state"
              className="block mb-2 test-gray-800 font-medium"
            >
              State
            </label>
            <input
              type="text"
              name="state"
              id="state"
              onChange={onChange}
              className="appearance-none block w-full p-3 leading-5 text-gray-900 border border-gray-200 rounded-lg shadow-md placeholder-text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            />
          </div>
        </div>
        {cart.items.length > 0 ? (
          <CardSection user={user} submitOrder={submitOrder} />
        ) : (
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Your cart is empty</h1>
            <p className="text-gray-500">
              Add some items to your cart to continue
            </p>
          </div>
        )}
      </div>
    </form>
  );
}
