const getSessions = (req, res) => {
  res.json({
    sessions: [
      { id: 'S001', device: 'Chrome on Windows 11', location: 'Mumbai, Maharashtra', lastActive: '2024-01-25 14:32:00', current: true },
      { id: 'S002', device: 'Safari on iPhone 15', location: 'Delhi, India', lastActive: '2024-01-24 09:15:00', current: false },
      { id: 'S003', device: 'Firefox on Ubuntu', location: 'Bengaluru, Karnataka', lastActive: '2024-01-20 18:45:00', current: false },
    ]
  });
};

const toggleMFA = (req, res) => {
  const { method, enabled } = req.body;
  res.json({ success: true, method, enabled, message: `${method} MFA ${enabled ? 'enabled' : 'disabled'} successfully` });
};

module.exports = { getSessions, toggleMFA };
