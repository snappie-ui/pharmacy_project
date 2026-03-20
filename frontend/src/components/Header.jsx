export default function Header({ onAddMedicine }) {
  return (
    <div className="flex items-center justify-between">

      <div>
        <h1 className="text-2xl font-semibold !text-gray-500">
          Pharmacy CRM
        </h1>
        <p className="text-sm text-gray-500">
          Manage inventory, sales, and purchase orders
        </p>
      </div>

      <div className="flex gap-3">
        <button className="px-4 py-2 text-sm border rounded-lg bg-white hover:bg-gray-100">
          Export
        </button>

        <button
          onClick={onAddMedicine}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg"
        >
          + Add Medicine
        </button>
      </div>

    </div>
  );
}