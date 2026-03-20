import { useEffect, useState } from "react";
import axios from "axios";
import Tab from "../components/Tab";
import MakeSale from "../components/MakeSale"; // ✅ add this
import Inventory from "./Inventory";

export default function Sales() {
  const [activeTab, setActiveTab] = useState("sales");
  const [sales, setSales] = useState([]);
  const [showSaleBox, setShowSaleBox] = useState(false); // ✅ add this


  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/sales");
        setSales(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSales();
  }, []);

  return (
    <div className="p-6">

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <Tab name="sales" activeTab={activeTab} setActiveTab={setActiveTab} />
        <Tab name="purchase" activeTab={activeTab} setActiveTab={setActiveTab} />
        <Tab name="inventory" activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {activeTab === "sales" && (
        <>
          {/* Buttons */}
          <div className="flex justify-end gap-3 mb-4">
            <button
  onClick={() => setShowSaleBox((prev) => !prev)}
  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
>
  {showSaleBox ? "Close Sale" : "+ New Sale"}
</button>

            <button className="px-4 py-2 border rounded-lg bg-white">
              + New Purchase
            </button>
          </div>

          {/* Make Sale */}
          {showSaleBox && <MakeSale />}

          {/* Recent Sales */}
<div className="bg-white p-4 rounded-xl shadow-sm mt-6">
  <h3 className="font-semibold mb-4">Recent Sales</h3>

  <div className="space-y-3">
    {sales.map((item, index) => (
      <div
        key={index}
        className="flex items-center justify-between border rounded-lg p-3 hover:bg-gray-50 transition"
      >
        {/* Left Section */}
        <div className="flex items-center gap-3">

          {/* Icon */}
          <div className="bg-green-500 text-white p-2 rounded-lg">
            🛒
          </div>

          {/* Info */}
          <div>
            <p className="font-medium">{item.invoice_no}</p>
            <p className="text-sm text-gray-500">
              {item.customer_name} • {item.payment_method}
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="text-right">
          <p className="font-semibold">
            ₹{Number(item.total_amount).toFixed(2)}
          </p>

          <span
            className={`text-xs px-2 py-1 rounded ${
              item.status === "Completed"
                ? "bg-green-100 text-green-600"
                : "bg-yellow-100 text-yellow-600"
            }`}
          >
            {item.status}
          </span>
        </div>
      </div>
    ))}
  </div>
</div>
        </>
      )}
      {/* Right → Buttons (only for inventory) */}
  {activeTab === "purchase" && (
  <div>Purchase Page Coming Soon</div>
)}

{activeTab === "inventory" && (
  <div>

    {/* Top Row → Title + Buttons */}
    <div className="flex justify-end mb-4 gap-3">
      <button className="px-4 py-2 border rounded-lg bg-white">
        Filter
      </button>

      <button className="px-4 py-2 border rounded-lg bg-white">
        Export
      </button>
    </div>

    {/* Inventory Component */}
    <Inventory />

  </div>
)}
    </div>
  );
}