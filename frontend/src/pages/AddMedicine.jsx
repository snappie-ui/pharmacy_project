import { useState } from "react";
import axios from "axios";

export default function AddMedicine({ onBack }) {
  const [form, setForm] = useState({
    name: "",
    generic_name: "",
    category: "",
    batch_no: "",
    expiry_date: "",
    quantity: "",
    cost_price: "",
    mrp: "",
    supplier: "",
  });

  // handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // submit form
  const handleSubmit = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/medicine`, {
        ...form,
        quantity: Number(form.quantity),
        cost_price: Number(form.cost_price),
        mrp: Number(form.mrp),
      });

      alert("Medicine added successfully ✅");
      onBack(); // go back to dashboard
    } catch (err) {
      console.error(err);
      alert("Error adding medicine ❌");
    }
  };

  return (
    <div className="p-6">

      {/* Header */}
      <h1 className="text-2xl font-semibold mb-6">Add Medicine</h1>

      {/* Form */}
      <div className="grid grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow-sm">

        <Input name="name" placeholder="Medicine Name" onChange={handleChange} />
        <Input name="generic_name" placeholder="Generic Name" onChange={handleChange} />
        <Input name="category" placeholder="Category" onChange={handleChange} />
        <Input name="batch_no" placeholder="Batch No" onChange={handleChange} />
        <Input name="expiry_date" type="date" onChange={handleChange} />
        <Input name="quantity" type="number" placeholder="Quantity" onChange={handleChange} />
        <Input name="cost_price" type="number" placeholder="Cost Price" onChange={handleChange} />
        <Input name="mrp" type="number" placeholder="MRP" onChange={handleChange} />
        <Input name="supplier" placeholder="Supplier" onChange={handleChange} />

      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          Save
        </button>

        <button
          onClick={onBack}
          className="px-6 py-2 border rounded-lg"
        >
          Back
        </button>
      </div>

    </div>
  );
}

// reusable input
function Input({ name, placeholder, type = "text", onChange }) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className="border p-2 rounded-lg"
    />
  );
}