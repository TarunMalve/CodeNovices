const { getDb } = require('../database/db');

const getDBTStatus = (req, res) => {
  const db = getDb();
  const dbtRows = db.prepare('SELECT * FROM dbt_statuses').all();
  const dbtStatuses = dbtRows.map(dbt => {
    const timeline = db.prepare('SELECT stage, date, completed FROM dbt_timeline WHERE dbt_id = ? ORDER BY id').all(dbt.id);
    return {
      id: dbt.id,
      scheme: dbt.scheme,
      amount: dbt.amount,
      status: dbt.status,
      blockchainHash: dbt.blockchain_hash,
      timeline: timeline.map(t => ({ stage: t.stage, date: t.date, completed: !!t.completed })),
    };
  });
  res.json({ dbtStatuses, total: dbtStatuses.length });
};

module.exports = { getDBTStatus };
