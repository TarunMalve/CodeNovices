const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const { initializeDatabase } = require('./database/db');
const { seedDatabase } = require('./database/seed');

// Initialize database and seed data
initializeDatabase();
seedDatabase();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
};
app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/wallet', require('./routes/wallet'));
app.use('/api/dbt', require('./routes/dbt'));
app.use('/api/grievance', require('./routes/grievance'));
app.use('/api/marketplace', require('./routes/marketplace'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/eligibility', require('./routes/eligibility'));
app.use('/api/utilities', require('./routes/utilities'));
app.use('/api/security', require('./routes/security'));
app.use('/api/land', require('./routes/land'));
app.use('/api/fund-transparency', require('./routes/fundTransparency'));
app.use('/api/documents', require('./routes/documents'));
app.use('/api/tax-advisor', require('./routes/taxAdvisor'));
app.use('/api/health-score', require('./routes/healthScore'));
app.use('/api/ai-hub', require('./routes/aiHub'));

// Public stats endpoint (no auth required) for landing page
app.get('/api/public/stats', (req, res) => {
  const { getDb } = require('./database/db');
  const db = getDb();
  const rows = db.prepare('SELECT key, value FROM analytics_overview').all();
  const data = {};
  rows.forEach(r => { data[r.key] = r.value; });
  res.json({
    citizensServed: data.totalCitizens || 0,
    fundsDistributed: data.fundsDistributed || 0,
    grievancesResolved: data.grievancesResolved || 0,
    schemesActive: data.schemesActive || 0,
  });
});

app.get('/', (req, res) => {
  res.json({ message: 'E-Governance Portal API', version: '1.0.0' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
