export default function Tab({ name, activeTab, setActiveTab }) {
  const isActive = activeTab === name;

  return (
    <button
      onClick={() => setActiveTab(name)}
      className={`px-4 py-2 rounded-lg capitalize ${
        isActive
          ? "bg-white shadow text-blue-600"
          : "bg-gray-100 text-gray-600"
      }`}
    >
      {name}
    </button>
  );
}