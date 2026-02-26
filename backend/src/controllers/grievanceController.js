const grievances = [
  { id: 'GRV001', title: 'Delayed DBT Payment', description: 'PM Kisan payment delayed by 2 months', category: 'Finance', status: 'Resolved', date: '2024-01-05', resolvedDate: '2024-01-15' },
  { id: 'GRV002', title: 'Document Verification Issue', description: 'Aadhaar verification failed multiple times', category: 'Documents', status: 'In Progress', date: '2024-01-12', resolvedDate: null },
  { id: 'GRV003', title: 'Scheme Application Rejected', description: 'PM Awas Yojana application rejected without reason', category: 'Schemes', status: 'Open', date: '2024-01-20', resolvedDate: null },
];

const createGrievance = (req, res) => {
  const { title, description, category } = req.body;
  const newGrievance = {
    id: `GRV${String(grievances.length + 1).padStart(3, '0')}`,
    title,
    description,
    category,
    status: 'Open',
    date: new Date().toISOString().split('T')[0],
    resolvedDate: null,
  };
  grievances.push(newGrievance);
  res.status(201).json({ grievance: newGrievance, message: 'Grievance filed successfully' });
};

const listGrievances = (req, res) => {
  const { status } = req.query;
  const filtered = status ? grievances.filter(g => g.status === status) : grievances;
  res.json({ grievances: filtered, total: filtered.length });
};

module.exports = { createGrievance, listGrievances };
