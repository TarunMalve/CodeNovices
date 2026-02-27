export default function StatCard({ icon, value, label, color = 'saffron', trend }) {
  const colorMap = {
    saffron: 'bg-orange-50 text-saffron border-saffron',
    green: 'bg-green-50 text-india-green border-india-green',
    navy: 'bg-blue-50 text-navy border-navy',
    red: 'bg-red-50 text-red-600 border-red-300',
  };

  return (
    <div className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${colorMap[color]} hover:shadow-lg transition-shadow`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-3xl mb-2">{icon}</div>
          <div className="text-2xl font-bold text-gray-800">{value}</div>
          <div className="text-sm text-gray-500 mt-1">{label}</div>
          {trend && <div className="text-xs text-india-green mt-1">↑ {trend}</div>}
        </div>
      </div>
    </div>
  );
}
