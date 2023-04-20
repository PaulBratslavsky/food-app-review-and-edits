export default function CardSection({ submitOrder, user }) {
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
