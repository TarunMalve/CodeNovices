const { getDb } = require('../database/db');

const getSessions = (req, res) => {
  const db = getDb();
  const userId = req.user ? req.user.id : null;
  const sessions = userId
    ? db.prepare('SELECT * FROM sessions WHERE user_id = ? ORDER BY last_active DESC').all(userId)
    : db.prepare('SELECT * FROM sessions ORDER BY last_active DESC').all();
  const mapped = sessions.map(s => ({
    id: s.id,
    device: s.device,
    location: s.location,
    lastActive: s.last_active,
    current: !!s.current_session,
  }));
  res.json({ sessions: mapped });
};

const toggleMFA = (req, res) => {
  const { method, enabled } = req.body;
  res.json({ success: true, method, enabled, message: `${method} MFA ${enabled ? 'enabled' : 'disabled'} successfully` });
};

module.exports = { getSessions, toggleMFA };
