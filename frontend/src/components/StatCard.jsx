export default function StatCard({ label, value }) {
    return (
      <div className="bg-blue-100 rounded-lg p-4 flex flex-col items-center min-w-[120px]">
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-blue-700">{label}</div>
      </div>
    );
  }
  