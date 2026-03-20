// App.jsx or Layout.jsx
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import AddMedicine from "./pages/AddMedicine";
import Sales from "./pages/Sales";

export default function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-gray-100">
      
      <Sidebar />

      <div className="flex-1 p-6">
        
        {page === "dashboard" && (
          <Dashboard onAddMedicine={() => setPage("addMedicine")} />
        )}

        {page === "addMedicine" && (
          <AddMedicine onBack={() => setPage("dashboard")} />
        )}
        < Sales/>
      </div>

    </div>
  );
}