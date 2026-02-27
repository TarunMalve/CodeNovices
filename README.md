# 🇮🇳 Aatmanirbhar Bharat E-Governance Portal

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue?logo=tailwindcss)
![Solidity](https://img.shields.io/badge/Solidity-0.8.24-gray?logo=solidity)
![Hardhat](https://img.shields.io/badge/Hardhat-Blockchain-yellow)

> A **Fintech-Enabled E-Governance Portal** built for the **Aatmanirbhar Bharat** initiative — combining blockchain-verified fund distribution, digital citizen services, and a Vocal for Local marketplace into one polished, demo-ready platform.

---

## 🌟 Features

- **🏠 Citizen Dashboard** — Real-time wallet balance, DBT tracker, document vault, and quick access to all services
- **🏛️ Admin Dashboard** — Analytics charts, blockchain explorer, grievance management, and department fund distribution
- **💰 Fintech Wallet** — Government subsidy wallet with full transaction history (credit/debit filter)
- **📊 DBT Tracker** — Blockchain-verified Direct Benefit Transfer timeline (Pending → Verified → Approved → Disbursed)
- **📁 Document Vault** — Digital certificate storage with category filters
- **📢 Grievance Portal** — File new grievances and track existing ones
- **🛒 Vocal for Local Marketplace** — Made-in-India MSME product marketplace with artisan profiles
- **📋 Government Schemes** — Browse and apply for PM Mudra, Startup India, Make in India, PM Kisan, PMAY, and more
- **📈 Swadeshi Dashboard** — Track startup growth, local vs import ratios, and employment data
- **⛓️ Blockchain Smart Contract** — Tamper-proof fund distribution ledger on Ethereum/Polygon

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, Tailwind CSS, React 18 |
| Backend | Node.js, Express.js, JWT Auth |
| Blockchain | Solidity 0.8.24, Hardhat, ethers.js |
| Styling | Tailwind CSS with custom Aatmanirbhar Bharat theme |

### 🎨 Theme Colors
| Color | Hex | Usage |
|-------|-----|-------|
| Saffron | `#FF9933` | Primary CTAs, accents |
| India Green | `#138808` | Success, DBT verified |
| Navy Blue | `#000080` | Headers, sidebars, text |
| White | `#FFFFFF` | Backgrounds, contrast |

---

## 📁 Folder Structure

```
egovernance-portal/
├── frontend/                        # Next.js + Tailwind CSS
│   ├── src/
│   │   ├── components/
│   │   │   └── common/              # Header, Footer, Sidebar, Card, StatCard
│   │   ├── pages/
│   │   │   ├── index.js             # Landing page
│   │   │   ├── login.js             # Citizen / Admin login
│   │   │   ├── register.js          # New user registration
│   │   │   ├── wallet.js            # Fintech wallet
│   │   │   ├── dbt-tracker.js       # DBT blockchain tracker
│   │   │   ├── documents.js         # Document vault
│   │   │   ├── grievance.js         # Grievance portal
│   │   │   ├── dashboard/
│   │   │   │   ├── citizen.js       # Citizen dashboard
│   │   │   │   └── admin.js         # Admin dashboard
│   │   │   └── aatmanirbhar/
│   │   │       ├── marketplace.js   # Vocal for Local marketplace
│   │   │       ├── schemes.js       # Government schemes
│   │   │       └── swadeshi-dashboard.js
│   │   ├── utils/
│   │   │   ├── api.js               # Axios API helpers
│   │   │   └── blockchain.js        # ethers.js / MetaMask integration
│   │   ├── context/
│   │   │   └── AuthContext.js       # React auth context
│   │   └── styles/
│   │       └── globals.css          # Tailwind + custom CSS
│   ├── tailwind.config.js
│   ├── next.config.js
│   └── package.json
├── backend/                         # Node.js + Express
│   ├── src/
│   │   ├── routes/                  # auth, wallet, dbt, grievance, marketplace, admin
│   │   ├── controllers/             # Business logic with mock data
│   │   ├── middleware/              # JWT auth, input validation
│   │   └── server.js
│   └── package.json
├── blockchain/                      # Hardhat + Solidity
│   ├── contracts/
│   │   └── FundDistribution.sol     # Smart contract
│   ├── scripts/
│   │   └── deploy.js
│   ├── test/
│   │   └── FundDistribution.test.js
│   └── hardhat.config.js
└── README.md
```

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js >= 18.x
- npm >= 9.x

---

### Frontend

```bash
cd frontend
npm install
npm run dev        # Development: http://localhost:3000
npm run build      # Production build
npm start          # Production server
```

---

### Backend

```bash
cd backend
npm install
npm run dev        # Development with nodemon: http://localhost:5000
npm start          # Production
```

**Environment Variables** (optional — defaults provided for demo):
```env
PORT=5000
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000
```

---

### Blockchain

```bash
cd blockchain
npm install
npx hardhat compile          # Compile contracts
npx hardhat test             # Run tests
npx hardhat node             # Start local blockchain
npx hardhat run scripts/deploy.js --network localhost  # Deploy
```

---

## 🔐 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| 👤 Citizen | `citizen@example.com` | `password123` |
| 🏛️ Admin | `admin@example.com` | `admin123` |

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login with JWT response |
| POST | `/api/auth/register` | Register new citizen |
| GET | `/api/wallet/balance` | Get wallet balance |
| GET | `/api/wallet/transactions` | Transaction history |
| GET | `/api/dbt/status` | DBT blockchain status |
| POST | `/api/grievance/create` | File a grievance |
| GET | `/api/grievance/list` | List grievances |
| GET | `/api/marketplace/products` | MSME products |
| GET | `/api/admin/analytics` | Admin analytics data |
| GET | `/api/admin/blockchain` | Blockchain explorer data |

---

## ⛓️ Smart Contract

**FundDistribution.sol** — Deployed on Ethereum/Polygon (Solidity 0.8.24)

| Function | Description |
|----------|-------------|
| `distributeFund(address, uint, string)` | Record a fund distribution (owner only) |
| `getDistribution(uint id)` | Get a specific distribution by ID |
| `getAllDistributions()` | Get all distributions |
| `verifyDistribution(uint id)` | Mark a distribution as verified (owner only) |

**Events:** `FundDistributed`, `FundVerified`

---

## 📸 Screenshots

> _The portal features:_
> - **Landing Page** — Ashoka Chakra design, tricolor gradient, hero section with stats
> - **Citizen Dashboard** — Wallet, DBT tracker, quick links, document count
> - **Admin Dashboard** — Bar charts, progress bars, blockchain explorer table, grievance management
> - **Marketplace** — Product grid with Made-in-India badge, category filter
> - **Schemes** — Apply button with real-time status, eligibility info
> - **Swadeshi Dashboard** — Startup growth chart, local vs import bar chart, sector employment

---

## 👥 Team

Built for **Hackathon** — Aatmanirbhar Bharat Digital Initiative

---

## 📜 Disclaimer

This is a **demo portal** built for hackathon purposes. All data shown is mock data. Not affiliated with the Government of India.

> "Sabka Saath, Sabka Vikas, Sabka Vishwas, Sabka Prayas" 🇮🇳