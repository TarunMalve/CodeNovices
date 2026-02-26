const bcrypt = require('bcryptjs');
const { getDb } = require('./db');

function seedDatabase() {
  const db = getDb();

  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get();
  if (userCount.count > 0) {
    return;
  }

  const seedAll = db.transaction(() => {
    // ─── Users ───
    const insertUser = db.prepare(
      'INSERT INTO users (email, password_hash, name, role, aadhaar, department) VALUES (?, ?, ?, ?, ?, ?)'
    );
    insertUser.run('citizen@example.com', bcrypt.hashSync('password123', 10), 'Rahul Sharma', 'citizen', '1234-5678-9012', null);
    insertUser.run('admin@example.com', bcrypt.hashSync('admin123', 10), 'Priya Singh', 'admin', null, 'Finance Ministry');

    // ─── Wallets ───
    const insertWallet = db.prepare(
      'INSERT INTO wallets (user_id, balance, currency, account_number) VALUES (?, ?, ?, ?)'
    );
    insertWallet.run(1, 45250.75, 'INR', 'XXXX-XXXX-4521');
    insertWallet.run(2, 0, 'INR', 'XXXX-XXXX-9999');

    // ─── Transactions ───
    const insertTxn = db.prepare(
      'INSERT INTO transactions (id, user_id, type, amount, description, date, status, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    );
    insertTxn.run('TXN001', 1, 'credit', 6000, 'PM Kisan Samman Nidhi', '2024-01-15', 'completed', 'DBT');
    insertTxn.run('TXN002', 1, 'credit', 2500, 'LPG Subsidy', '2024-01-10', 'completed', 'DBT');
    insertTxn.run('TXN003', 1, 'debit', 1200, 'Insurance Premium', '2024-01-08', 'completed', 'Payment');
    insertTxn.run('TXN004', 1, 'credit', 15000, 'MNREGA Wages', '2024-01-05', 'completed', 'DBT');
    insertTxn.run('TXN005', 1, 'debit', 500, 'Utility Bill', '2024-01-03', 'completed', 'Payment');
    insertTxn.run('TXN006', 1, 'credit', 3000, 'Scholarship Payment', '2023-12-28', 'pending', 'DBT');

    // ─── Grievances ───
    const insertGrv = db.prepare(
      'INSERT INTO grievances (id, user_id, title, description, category, status, date, resolved_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    );
    insertGrv.run('GRV001', 1, 'Delayed DBT Payment', 'PM Kisan payment delayed by 2 months', 'Finance', 'Resolved', '2024-01-05', '2024-01-15');
    insertGrv.run('GRV002', 1, 'Document Verification Issue', 'Aadhaar verification failed multiple times', 'Documents', 'In Progress', '2024-01-12', null);
    insertGrv.run('GRV003', 1, 'Scheme Application Rejected', 'PM Awas Yojana application rejected without reason', 'Schemes', 'Open', '2024-01-20', null);

    // ─── DBT Statuses & Timeline ───
    const insertDBT = db.prepare(
      'INSERT INTO dbt_statuses (id, user_id, scheme, amount, status, blockchain_hash) VALUES (?, ?, ?, ?, ?, ?)'
    );
    const insertTimeline = db.prepare(
      'INSERT INTO dbt_timeline (dbt_id, stage, date, completed) VALUES (?, ?, ?, ?)'
    );

    insertDBT.run('DBT001', 1, 'PM Kisan Samman Nidhi', 6000, 'Disbursed', '0x4a7b3c9d2e1f8a6b5c4d3e2f1a0b9c8d7e6f5a4b');
    insertTimeline.run('DBT001', 'Applied', '2024-01-01', 1);
    insertTimeline.run('DBT001', 'Verified', '2024-01-05', 1);
    insertTimeline.run('DBT001', 'Approved', '2024-01-10', 1);
    insertTimeline.run('DBT001', 'Disbursed', '2024-01-15', 1);

    insertDBT.run('DBT002', 1, 'Pradhan Mantri Awas Yojana', 250000, 'Verified', '0x1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c');
    insertTimeline.run('DBT002', 'Applied', '2024-01-10', 1);
    insertTimeline.run('DBT002', 'Verified', '2024-01-18', 1);
    insertTimeline.run('DBT002', 'Approved', null, 0);
    insertTimeline.run('DBT002', 'Disbursed', null, 0);

    insertDBT.run('DBT003', 1, 'LPG Subsidy', 2500, 'Disbursed', '0x9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b');
    insertTimeline.run('DBT003', 'Applied', '2024-01-02', 1);
    insertTimeline.run('DBT003', 'Verified', '2024-01-04', 1);
    insertTimeline.run('DBT003', 'Approved', '2024-01-08', 1);
    insertTimeline.run('DBT003', 'Disbursed', '2024-01-10', 1);

    insertDBT.run('DBT004', 1, 'National Scholarship Portal', 3000, 'Pending', null);
    insertTimeline.run('DBT004', 'Applied', '2024-01-20', 1);
    insertTimeline.run('DBT004', 'Verified', null, 0);
    insertTimeline.run('DBT004', 'Approved', null, 0);
    insertTimeline.run('DBT004', 'Disbursed', null, 0);

    // ─── Products ───
    const insertProduct = db.prepare(
      'INSERT INTO products (id, name, price, artisan, location, category, rating, sales, made_in_india, color) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    );
    insertProduct.run('P001', 'Handwoven Banarasi Silk Saree', 4500, 'Ramesh Kumar', 'Varanasi, UP', 'Textiles', 4.8, 234, 1, '#FF9933');
    insertProduct.run('P002', 'Madhubani Painting Set', 1200, 'Sunita Devi', 'Madhubani, Bihar', 'Handicrafts', 4.9, 156, 1, '#138808');
    insertProduct.run('P003', 'Organic Darjeeling Tea', 850, 'Rajesh Tea Estate', 'Darjeeling, WB', 'Food', 4.7, 890, 1, '#8B4513');
    insertProduct.run('P004', 'Chikankari Embroidered Kurta', 2200, 'Zarina Begum', 'Lucknow, UP', 'Textiles', 4.6, 312, 1, '#FFD700');
    insertProduct.run('P005', 'Thanjavur Brass Lamp', 3500, 'Murugesan Works', 'Thanjavur, TN', 'Handicrafts', 4.9, 78, 1, '#DAA520');
    insertProduct.run('P006', 'Kashmiri Walnut Wood Box', 2800, 'Mohammad Yusuf', 'Srinagar, JK', 'Handicrafts', 4.7, 145, 1, '#8B4513');
    insertProduct.run('P007', 'Solar LED Lamp (Make in India)', 650, 'GreenTech Solutions', 'Pune, MH', 'Electronics', 4.5, 1234, 1, '#FFD700');
    insertProduct.run('P008', 'Organic Moringa Powder', 450, 'Natural Farms Co-op', 'Coimbatore, TN', 'Food', 4.8, 567, 1, '#228B22');

    // ─── Documents ───
    const insertDoc = db.prepare(
      'INSERT INTO documents (id, user_id, type, file_name, uploaded_at, verified, category) VALUES (?, ?, ?, ?, ?, ?, ?)'
    );
    insertDoc.run('DOC001', 1, 'Aadhaar Card', 'aadhaar.pdf', '2024-01-10', 1, 'Identity');
    insertDoc.run('DOC002', 1, 'PAN Card', 'pan_card.pdf', '2024-01-11', 1, 'Identity');
    insertDoc.run('DOC003', 1, 'Income Certificate', 'income_cert.pdf', '2024-01-12', 0, 'Income');
    insertDoc.run('DOC004', 1, 'Caste Certificate', 'caste_cert.pdf', '2024-01-13', 1, 'Identity');
    insertDoc.run('DOC005', 1, 'Land Records', 'land_record.pdf', '2024-01-14', 0, 'Property');
    insertDoc.run('DOC006', 1, 'Birth Certificate', 'birth_cert.pdf', '2024-01-15', 1, 'Identity');
    insertDoc.run('DOC007', 1, 'Degree Certificate', 'degree.pdf', '2024-01-16', 0, 'Education');
    insertDoc.run('DOC008', 1, 'Ration Card', 'ration_card.pdf', '2024-01-17', 1, 'Welfare');

    // ─── Bills ───
    const insertBill = db.prepare(
      'INSERT INTO bills (id, user_id, type, provider, consumer_no, amount, due_date, status, units) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    );
    insertBill.run('ELEC001', 1, 'Electricity', 'BESCOM', 'BES7823456', 2340, '2024-02-15', 'Unpaid', 210);
    insertBill.run('WAT001', 1, 'Water', 'BWSSB', 'BWS9012345', 456, '2024-02-20', 'Unpaid', 18);
    insertBill.run('PROP001', 1, 'Property Tax', 'BBMP', 'BBP1234567', 8900, '2024-03-31', 'Unpaid', null);

    // ─── Usage Data ───
    const insertUsage = db.prepare(
      'INSERT INTO usage_data (user_id, type, month, value) VALUES (?, ?, ?, ?)'
    );
    const elecUsage = [{ m: 'Aug', v: 185 }, { m: 'Sep', v: 210 }, { m: 'Oct', v: 195 }, { m: 'Nov', v: 220 }, { m: 'Dec', v: 265 }, { m: 'Jan', v: 210 }];
    const waterUsage = [{ m: 'Aug', v: 15 }, { m: 'Sep', v: 18 }, { m: 'Oct', v: 16 }, { m: 'Nov', v: 17 }, { m: 'Dec', v: 19 }, { m: 'Jan', v: 18 }];
    elecUsage.forEach(u => insertUsage.run(1, 'electricity', u.m, u.v));
    waterUsage.forEach(u => insertUsage.run(1, 'water', u.m, u.v));

    // ─── Sessions ───
    const insertSession = db.prepare(
      'INSERT INTO sessions (id, user_id, device, location, last_active, current_session) VALUES (?, ?, ?, ?, ?, ?)'
    );
    insertSession.run('S001', 1, 'Chrome on Windows 11', 'Mumbai, Maharashtra', '2024-01-25 14:32:00', 1);
    insertSession.run('S002', 1, 'Safari on iPhone 15', 'Delhi, India', '2024-01-24 09:15:00', 0);
    insertSession.run('S003', 1, 'Firefox on Ubuntu', 'Bengaluru, Karnataka', '2024-01-20 18:45:00', 0);

    // ─── Schemes ───
    const insertScheme = db.prepare(
      'INSERT INTO schemes (name, description, benefit, occupation_match, income_threshold, eligible_occupations) VALUES (?, ?, ?, ?, ?, ?)'
    );
    insertScheme.run('PM-KISAN', 'Direct income support of ₹6,000/year to farmer families', '₹6,000/year', 'Farmer', null, 'Farmer');
    insertScheme.run('Ayushman Bharat PM-JAY', 'Health coverage of ₹5 lakh per family per year', '₹5 Lakh health cover', null, 500000, null);
    insertScheme.run('PM Mudra Yojana', 'Loans up to ₹10 lakh for non-farm income-generating activities', 'Loan up to ₹10 Lakh', 'Business', null, 'Business,Unemployed');
    insertScheme.run('National Scholarship Portal', 'Merit-cum-means scholarships for higher education', '₹10,000 - ₹50,000/year', 'Student', 800000, 'Student');
    insertScheme.run('PM Awas Yojana', 'Housing assistance for EWS/LIG families', '₹2.67 Lakh subsidy', null, 600000, null);
    insertScheme.run('MNREGA', '100 days guaranteed wage employment per year', '₹221/day guaranteed', null, 300000, null);
    insertScheme.run('Startup India', 'Tax benefits and funding for registered startups', '3-year tax exemption', 'Business', null, 'Business');

    // ─── Departments (Admin Analytics) ───
    const insertDept = db.prepare(
      'INSERT INTO departments (name, allocated, distributed, schemes_count, percentage) VALUES (?, ?, ?, ?, ?)'
    );
    insertDept.run('Agriculture', 2500000000, 2500000000, 8, 30);
    insertDept.run('Education', 1800000000, 1800000000, 12, 21);
    insertDept.run('Health', 2100000000, 2100000000, 7, 25);
    insertDept.run('Infrastructure', 1200000000, 1200000000, 5, 14);
    insertDept.run('Social Welfare', 820000000, 820000000, 9, 10);

    // Fund transparency departments (separate larger numbers)
    const insertFTDept = db.prepare(
      'INSERT INTO fund_transparency_overview (key, value) VALUES (?, ?)'
    );
    insertFTDept.run('totalBudget', 5000000000000);
    insertFTDept.run('totalAllocated', 4800000000000);
    insertFTDept.run('totalDistributed', 4250000000000);

    // ─── Revenue Data ───
    const insertRevenue = db.prepare(
      'INSERT INTO revenue_data (month, amount, disbursed, beneficiaries, schemes_count) VALUES (?, ?, ?, ?, ?)'
    );
    insertRevenue.run('Aug', 4200, 4200, 12400, 38);
    insertRevenue.run('Sep', 5800, 5800, 15600, 40);
    insertRevenue.run('Oct', 4900, 4900, 13200, 39);
    insertRevenue.run('Nov', 7200, 7200, 18900, 42);
    insertRevenue.run('Dec', 6800, 6800, 17100, 41);
    insertRevenue.run('Jan', 9100, 9100, 22300, 47);

    // ─── Heatmap Data ───
    const insertHeatmap = db.prepare(
      'INSERT INTO heatmap_data (state, funds, beneficiaries, intensity) VALUES (?, ?, ?, ?)'
    );
    insertHeatmap.run('Uttar Pradesh', 85000, 125000, 90);
    insertHeatmap.run('Maharashtra', 72000, 98000, 78);
    insertHeatmap.run('Bihar', 45000, 89000, 65);
    insertHeatmap.run('Rajasthan', 38000, 56000, 55);
    insertHeatmap.run('Madhya Pradesh', 42000, 67000, 60);
    insertHeatmap.run('Gujarat', 55000, 72000, 70);
    insertHeatmap.run('Karnataka', 48000, 61000, 63);
    insertHeatmap.run('West Bengal', 35000, 78000, 58);
    insertHeatmap.run('Tamil Nadu', 52000, 68000, 68);
    insertHeatmap.run('Telangana', 29000, 42000, 45);

    // ─── Grievance Categories ───
    const insertGrvCat = db.prepare(
      'INSERT INTO grievance_categories (name, count, priority, avg_resolution) VALUES (?, ?, ?, ?)'
    );
    insertGrvCat.run('Financial/DBT', 1245, 'High', 3.2);
    insertGrvCat.run('Document Verification', 876, 'Medium', 5.1);
    insertGrvCat.run('Scheme Application', 654, 'High', 4.8);
    insertGrvCat.run('Technical Issues', 432, 'Low', 2.1);
    insertGrvCat.run('Corruption/Fraud', 123, 'Critical', 7.5);
    insertGrvCat.run('Infrastructure', 345, 'Medium', 8.2);

    // ─── Blockchain Transactions ───
    const insertBcTxn = db.prepare(
      'INSERT INTO blockchain_transactions (hash, block_number, scheme, amount, beneficiary, status, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)'
    );
    insertBcTxn.run('0x4a7b3c9d2e1f8a6b5c4d3e2f1a0b9c8d7e6f5a4b', 18945123, 'PM Kisan', 6000, '0x742d35Cc6634C0532925a3b8D4C9D5f3b8E9A1c2', 'Confirmed', '2024-01-15 10:23:45');
    insertBcTxn.run('0x1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c', 18945089, 'PM Awas', 250000, '0x8E3f9A2b4C6d8E0f2A4b6C8d0E2f4A6b8C0d2E4f', 'Confirmed', '2024-01-14 15:45:12');
    insertBcTxn.run('0x9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b', 18944956, 'LPG Subsidy', 2500, '0x3A5c7E9a1B3d5F7e9A1b3D5f7E9a1B3d5F7e9A1b', 'Confirmed', '2024-01-13 09:12:33');
    insertBcTxn.run('0x5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b8a7f6e', 18944823, 'MNREGA', 15000, '0x6B8d0F2a4C6e8A0b2D4f6A8c0E2b4F6a8C0e2B4f', 'Pending', '2024-01-12 14:30:00');
    insertBcTxn.run('0x2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b', 18944701, 'Scholarship', 3000, '0x9C1e3A5b7c9d1E3f5A7b9C1e3A5b7c9d1E3f5A7b', 'Failed', '2024-01-11 11:20:15');

    // ─── Fund Transparency Transactions ───
    const insertFtTxn = db.prepare(
      'INSERT INTO fund_transparency_transactions (hash, scheme, amount, state, date) VALUES (?, ?, ?, ?, ?)'
    );
    insertFtTxn.run('0x4a7b3c9d2e1f8a6b5c4d3e2f1a0b9c8d7e6f5a4b', 'PM Kisan', 600000000, 'Uttar Pradesh', '2024-01-15');
    insertFtTxn.run('0x1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c', 'PM Awas Yojana', 25000000000, 'Rajasthan', '2024-01-14');
    insertFtTxn.run('0x9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b', 'Ayushman Bharat', 15000000000, 'Bihar', '2024-01-13');

    // ─── Land Records ───
    const insertLand = db.prepare(
      'INSERT INTO land_records (survey_number, owner_name, father_name, area, land_type, district, state, registration_date, tax_status, last_tax_paid, blockchain_hash, verified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
    );
    insertLand.run('SY-2024-001', 'Rajesh Kumar Sharma', 'Ram Prasad Sharma', '2.5 acres', 'Agricultural', 'Nashik', 'Maharashtra', '2018-03-15', 'Paid', '₹4,500 (FY 2023-24)', '0xabc123def456789012345678901234567890abcd', 1);

    // ─── Scheme Distribution ───
    const insertSchemeDist = db.prepare(
      'INSERT INTO scheme_distribution (scheme, percentage) VALUES (?, ?)'
    );
    insertSchemeDist.run('PM Kisan', 28);
    insertSchemeDist.run('Ayushman Bharat', 22);
    insertSchemeDist.run('PM Awas', 18);
    insertSchemeDist.run('MNREGA', 15);
    insertSchemeDist.run('Scholarship', 10);
    insertSchemeDist.run('Others', 7);

    // ─── Analytics Overview ───
    const insertAnalytics = db.prepare(
      'INSERT INTO analytics_overview (key, value) VALUES (?, ?)'
    );
    insertAnalytics.run('totalCitizens', 1284750);
    insertAnalytics.run('fundsDistributed', 8420000000);
    insertAnalytics.run('grievancesResolved', 45230);
    insertAnalytics.run('schemesActive', 47);
    insertAnalytics.run('grievancesOpen', 1243);
    insertAnalytics.run('grievancesInProgress', 3421);
    insertAnalytics.run('averageResolutionDays', 4.2);
    insertAnalytics.run('satisfactionRate', 87.5);
    insertAnalytics.run('digitalAdoption', 76.3);
  });

  seedAll();
  console.log('Database seeded successfully');
}

module.exports = { seedDatabase };
