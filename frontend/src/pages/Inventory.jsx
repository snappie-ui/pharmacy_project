import { useEffect, useState } from "react";
import axios from "axios";

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [overview, setOverview] = useState({});

  useEffect(() => {
    // 🔥 Fetch inventory list
    const fetchInventory = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/inventory`);
        setInventory(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    // 🔥 Fetch overview data
    const fetchOverview = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/inventory/overview`
        );
        setOverview(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchInventory();
    fetchOverview();
  }, []);

  return (
    <div className="p-6">

      {/* 🔷 Inventory Overview */}
      <div className="bg-blue-50 p-4 rounded-xl mb-6">
        <h3 className="font-semibold mb-4">Inventory Overview</h3>

        <div className="grid grid-cols-4 gap-4">
          <Card title="Total Items" value={overview.total_items || 0} />
          <Card title="Active Stock" value={overview.active_stock || 0} />
          <Card title="Low Stock" value={overview.low_stock || 0} />
          <Card title="Total Value" value={`₹${overview.total_value || 0}`} />
        </div>
      </div>

      {/* 🔷 Inventory Table */}
      {/* 🔥 Inventory Table */}
<div className="bg-white rounded-xl border overflow-hidden">

  {/* Header */}
  <div className="grid grid-cols-10 text-xs font-semibold text-gray-500 bg-gray-100 p-3">
    <p>MEDICINE NAME</p>
    <p>GENERIC NAME</p>
    <p>CATEGORY</p>
    <p>BATCH NO</p>
    <p>EXPIRY DATE</p>
    <p>QUANTITY</p>
    <p>COST PRICE</p>
    <p>MRP</p>
    <p>SUPPLIER</p>
    <p>STATUS</p>
  </div>

  {/* ✅ ONLY CHANGE: add scroll here */}
  <div className="max-h-[400px] overflow-y-auto">

    {inventory.map((item, index) => (
      <div
        key={index}
        className="grid grid-cols-10 items-center p-3 border-t text-sm"
      >
        <p>{item.name}</p>
        <p>{item.generic_name}</p>
        <p>{item.category}</p>
        <p>{item.batch_no}</p>
        <p>{item.expiry_date}</p>

        <p
          className={
            item.quantity === 0
              ? "text-red-500"
              : item.quantity < 50
              ? "text-orange-500"
              : ""
          }
        >
          {item.quantity}
        </p>

        <p>₹{item.cost_price}</p>
        <p>₹{item.mrp}</p>
        <p>{item.supplier}</p>

        <span
          className={`text-xs px-2 py-1 rounded ${
            item.status === "Active"
              ? "bg-green-100 text-green-600"
              : item.status === "Low Stock"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {item.status}
        </span>
      </div>
    ))}

  </div>
</div>
    </div>
  );
}

/* 🔷 Card Component */
function Card({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-xl font-semibold !text-black">{value}</h2>
    </div>
  );
}