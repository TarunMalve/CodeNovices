const billIcons = {
  electricity: '⚡',
  water: '💧',
  'property tax': '🏠',
  'piped gas': '🌿',
  'land tax': '📜',
  'professional tax': '💼',
};

export default function BillCard({ bill, onPay, paying }) {
  const icon = billIcons[bill.type?.toLowerCase()] || '📄';
  const isPaid = bill.status?.toLowerCase() === 'paid';

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{icon}</div>
          <div>
            <h3 className="text-sm font-bold text-navy capitalize">{bill.type}</h3>
            <p className="text-xs text-gray-500">{bill.provider}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${isPaid ? 'bg-green-100 text-india-green' : 'bg-red-100 text-red-600'}`}>
          {bill.status}
        </span>
      </div>

      {bill.consumerNumber && (
        <p className="text-xs text-gray-400 mb-2">Consumer No: {bill.consumerNumber}</p>
      )}

      <div className="flex items-end justify-between mt-4">
        <div>
          <p className="text-xs text-gray-500">Amount Due</p>
          <p className="text-xl font-bold text-navy">₹{Number(bill.amount).toLocaleString('en-IN')}</p>
          {bill.dueDate && <p className="text-xs text-gray-400 mt-1">Due: {bill.dueDate}</p>}
        </div>
        <button
          onClick={() => onPay(bill)}
          disabled={isPaid || paying}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
            isPaid
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : paying
              ? 'bg-gray-200 text-gray-500 cursor-wait'
              : 'bg-saffron text-navy hover:bg-orange-400'
          }`}
        >
          {isPaid ? '✅ Paid' : paying ? 'Paying...' : 'Pay Now'}
        </button>
      </div>
    </div>
  );
}
