import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import StatCard from "../components/StatCard";

export default function Dashboard({ onAddMedicine}) {
  const [dashboard, setDashboard] = useState({});

  useEffect(() => {
  const fetchDashboard = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/dashboard`);
      setDashboard(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchDashboard();
}, []);

  return (
    <div className="p-6">

      {/* Header */}
      <Header onAddMedicine={onAddMedicine} />

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mt-6">
        <StatCard title="Today's Sales" value={`₹${dashboard.today_sales || 0}`} />
        <StatCard title="Items Sold Today" value={dashboard.items_sold || 0} />
        <StatCard title="Low Stock Items" value={dashboard.low_stock || 0} />
        <StatCard title="Purchase Orders" value={`₹${dashboard.total_purchase || 0}`} />
      </div>

    </div>
  );
}