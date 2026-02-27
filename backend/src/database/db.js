const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '..', '..', 'data', 'egovernance.db');

let db;

function getDb() {
  if (!db) {
    const fs = require('fs');
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    db = new Database(DB_PATH);
    db.pragma('journal_mode = WAL');
    db.pragma('foreign_keys = ON');
  }
  return db;
}

function initializeDatabase() {
  const db = getDb();

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'citizen',
      aadhaar TEXT,
      department TEXT
    );

    CREATE TABLE IF NOT EXISTS wallets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL UNIQUE,
      balance REAL NOT NULL DEFAULT 0,
      currency TEXT NOT NULL DEFAULT 'INR',
      account_number TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS transactions (
      id TEXT PRIMARY KEY,
      user_id INTEGER NOT NULL,
      type TEXT NOT NULL,
      amount REAL NOT NULL,
      description TEXT NOT NULL,
      date TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'completed',
      category TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS grievances (
      id TEXT PRIMARY KEY,
      user_id INTEGER,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      category TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'Open',
      date TEXT NOT NULL,
      resolved_date TEXT
    );

    CREATE TABLE IF NOT EXISTS dbt_statuses (
      id TEXT PRIMARY KEY,
      user_id INTEGER,
      scheme TEXT NOT NULL,
      amount REAL NOT NULL,
      status TEXT NOT NULL,
      blockchain_hash TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS dbt_timeline (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      dbt_id TEXT NOT NULL,
      stage TEXT NOT NULL,
      date TEXT,
      completed INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (dbt_id) REFERENCES dbt_statuses(id)
    );

    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      price REAL NOT NULL,
      artisan TEXT NOT NULL,
      location TEXT NOT NULL,
      category TEXT NOT NULL,
      rating REAL NOT NULL DEFAULT 0,
      sales INTEGER NOT NULL DEFAULT 0,
      made_in_india INTEGER NOT NULL DEFAULT 1,
      color TEXT
    );

    CREATE TABLE IF NOT EXISTS documents (
      id TEXT PRIMARY KEY,
      user_id INTEGER,
      type TEXT NOT NULL,
      file_name TEXT NOT NULL,
      uploaded_at TEXT NOT NULL,
      verified INTEGER NOT NULL DEFAULT 0,
      category TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS bills (
      id TEXT PRIMARY KEY,
      user_id INTEGER,
      type TEXT NOT NULL,
      provider TEXT NOT NULL,
      consumer_no TEXT NOT NULL,
      amount REAL NOT NULL,
      due_date TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'Unpaid',
      units INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS usage_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      type TEXT NOT NULL,
      month TEXT NOT NULL,
      value REAL NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      user_id INTEGER,
      device TEXT NOT NULL,
      location TEXT NOT NULL,
      last_active TEXT NOT NULL,
      current_session INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS schemes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      benefit TEXT NOT NULL,
      occupation_match TEXT,
      income_threshold REAL,
      eligible_occupations TEXT
    );

    CREATE TABLE IF NOT EXISTS departments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      allocated REAL NOT NULL DEFAULT 0,
      distributed REAL NOT NULL DEFAULT 0,
      schemes_count INTEGER NOT NULL DEFAULT 0,
      percentage REAL NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS revenue_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      month TEXT NOT NULL,
      amount REAL NOT NULL DEFAULT 0,
      disbursed REAL NOT NULL DEFAULT 0,
      beneficiaries INTEGER NOT NULL DEFAULT 0,
      schemes_count INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS heatmap_data (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      state TEXT NOT NULL,
      funds REAL NOT NULL DEFAULT 0,
      beneficiaries INTEGER NOT NULL DEFAULT 0,
      intensity REAL NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS grievance_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      count INTEGER NOT NULL DEFAULT 0,
      priority TEXT NOT NULL DEFAULT 'Medium',
      avg_resolution REAL NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS blockchain_transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      hash TEXT NOT NULL,
      block_number INTEGER,
      scheme TEXT NOT NULL,
      amount REAL NOT NULL,
      beneficiary TEXT,
      status TEXT NOT NULL DEFAULT 'Pending',
      timestamp TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS fund_transparency_transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      hash TEXT NOT NULL,
      scheme TEXT NOT NULL,
      amount REAL NOT NULL,
      state TEXT NOT NULL,
      date TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS land_records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      survey_number TEXT NOT NULL,
      owner_name TEXT NOT NULL,
      father_name TEXT NOT NULL,
      area TEXT NOT NULL,
      land_type TEXT NOT NULL DEFAULT 'Agricultural',
      district TEXT NOT NULL,
      state TEXT NOT NULL,
      registration_date TEXT NOT NULL,
      tax_status TEXT NOT NULL DEFAULT 'Paid',
      last_tax_paid TEXT,
      blockchain_hash TEXT,
      verified INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS scheme_distribution (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      scheme TEXT NOT NULL,
      percentage REAL NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS analytics_overview (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT NOT NULL UNIQUE,
      value REAL NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS fund_transparency_overview (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT NOT NULL UNIQUE,
      value REAL NOT NULL DEFAULT 0
    );
  `);

  return db;
}

module.exports = { getDb, initializeDatabase };
