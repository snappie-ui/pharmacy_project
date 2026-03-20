export default function StatCard({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold !text-black">
        {value}
      </h2>
      <p className="text-sm text-gray-500">{title}</p>
    </div>
  );
}