import { useState } from "react";
import axios from "axios";

export default function MakeSale() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [cart, setCart] = useState({});
  const [patientId, setPatientId] = useState("");
const [showBillForm, setShowBillForm] = useState(false);
const [customerName, setCustomerName] = useState("");
const [paymentMethod, setPaymentMethod] = useState("");

  const handleSubmitBill = async () => {
  try {
    const payload = {
      customer_name: customerName,
      payment_method: paymentMethod,
      items: getItemsForBackend(),
    };

    console.log(payload); // debug

    await axios.post("http://127.0.0.1:8000/sales", payload);

    alert("Sale completed ✅");

    // reset
    setCart({});
    setResults([]);
    setCustomerName("");
    setPaymentMethod("");
    setShowBillForm(false);

  } catch (err) {
    console.error(err);
    alert("Error creating bill ❌");
  }
};

  const searchMedicine = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/inventory/search",
        {
          params: { search: query },
        }
      );
      setResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const increaseQty = (item) => {
    setCart((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }));
  };

  const decreaseQty = (item) => {
    setCart((prev) => {
      const newQty = (prev[item.id] || 0) - 1;

      if (newQty <= 0) {
        const updated = { ...prev };
        delete updated[item.id];
        return updated;
      }

      return { ...prev, [item.id]: newQty };
    });
  };

  const getItemsForBackend = () => {
  return results
    .filter((item) => cart[item.id])
    .map((item) => ({
      medicine_id: item.id,
      quantity: cart[item.id],
      price: item.price,
    }));
};

  return (
    <>
      {/* Make Sale Box */}
      <div className="bg-blue-50 p-4 rounded-xl mb-6">
        <h3 className="font-semibold mb-2">Make a Sale</h3>

        <div className="flex gap-3">
          <input
  type="text"
  placeholder="Patient Id"
  value={patientId}
  onChange={(e) => setPatientId(e.target.value)}
  className="border p-2 rounded-lg w-1/4"
/>

          <input
            type="text"
            placeholder="Search medicines..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border p-2 rounded-lg flex-1"
          />

          <button
            type="button"
            onClick={searchMedicine}
            className="bg-blue-600 text-white px-4 rounded-lg"
          >
            Enter
          </button>

          <button
  onClick={() => setShowBillForm(true)}
  className="bg-red-500 text-white px-4 rounded-lg"
>
  Bill
</button>
        </div>
      </div>

      {/* Table */}
      <div className="mt-4 bg-white rounded-xl overflow-hidden border">
        <div className="grid grid-cols-8 text-xs font-semibold text-gray-500 bg-gray-100 p-3">
          <p>MEDICINE NAME</p>
          <p>GENERIC NAME</p>
          <p>BATCH NO</p>
          <p>EXPIRY DATE</p>
          <p>QUANTITY</p>
          <p>MRP / PRICE</p>
          <p>SUPPLIER</p>
          <p>ACTIONS</p>
        </div>

        {results.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-8 items-center p-3 border-t text-sm"
          >
            <p>{item.name}</p>
            <p>{item.generic_name}</p>
            <p>{item.batch_no}</p>
            <p>{item.expiry_date}</p>
            <p>{cart[item.id] || 0}</p>
            <p>₹{item.price}</p>
            <p>{item.supplier}</p>

            <div className="flex gap-2">
              <button
                onClick={() => decreaseQty(item)}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                −
              </button>

              <button
                onClick={() => increaseQty(item)}
                className="px-2 py-1 bg-blue-600 text-white rounded"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      {showBillForm && (
  <div className="mt-6 bg-white p-4 rounded-xl shadow">

    <h3 className="font-semibold mb-4">Complete Billing</h3>

    <div className="flex gap-3 mb-4">
      <input
        type="text"
        placeholder="Customer Name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
        className="border p-2 rounded-lg flex-1"
      />

      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        className="border p-2 rounded-lg"
      >
        <option value="">Payment Method</option>
        <option value="Cash">Cash</option>
        <option value="Card">Card</option>
        <option value="UPI">UPI</option>
      </select>
    </div>

    <button
      onClick={handleSubmitBill}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg"
    >
      Confirm & Generate Bill
    </button>

  </div>
)}
    </>
  );
}