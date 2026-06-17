# 🌾 AgriTech Pipeline

**AgriTech Pipeline** is a specialized digital ecosystem designed to bridge the gap between rural farmers, bulk buyers, and logistics providers in Nigeria. By solving the "Trust and Logistics Gap," the platform ensures that farmers get fair prices, buyers receive quality produce, and drivers find consistent loads.

## 🚀 Core Value Proposition
In many agricultural markets, trust is the biggest barrier. AgriTech Pipeline solves this by implementing a **Trust-Based Escrow System**, ensuring that payments are held securely and only released once the buyer confirms delivery.

---

## ✨ Key Features

### 👨‍🌾 For Farmers
- **Produce Listings**: List crops with images, quantities, and pricing.
- **Order Management**: Track incoming requests and manage fulfillment.
- **Driver Assignment**: Match orders with available logistics providers.
- **Performance Tracking**: Build a reputation through buyer ratings.

### 🛒 For Buyers (Hotels, Supermarkets, Wholesalers)
- **Advanced Marketplace**: Search and filter produce by category, location, and price.
- **Secure Payments**: Integrated Paystack checkout with funds held in escrow.
- **Direct Access**: Connect directly with farmers, reducing middlemen costs.
- **Review System**: Rate farmers based on product quality and delivery.

### 🚚 For Drivers
- **Load Matching**: View available produce waiting for transport.
- **Delivery Tracking**: Update order status from "Picked up" to "Delivered."
- **Earnings**: Track completed trips and payouts.

### 🏢 For Village Agents (The Bridge)
- **Farmer Onboarding**: Register rural farmers who lack smartphone access.
- **Inventory Management**: Manage listings on behalf of their network of farmers.
- **Market Intelligence**: Access analytics on demand hotspots and top crops.

### 📱 Accessibility (The "Nigerian Reality" Layer)
- **USSD Gateway**: Basic price checks and listing requests via `*XXX#`.
- **WhatsApp Notifications**: Instant alerts for new orders and shipment updates.

---

## 🛠 Technical Stack

- **Backend**: 
  - Node.js & Express
  - MongoDB (NoSQL)
  - Mongoose (ODM)
  - JWT (Authentication)
  - Paystack API (Payments)
- **Frontend**: 
  - React.js (via Vite)
  - Tailwind CSS v4 (Styling)
  - Lucide React (Icons)
  - Axios (API Client)
- **DevOps**:
  - Git (Version Control)
  - Cloudinary (Image Storage)

---

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd agritech-pipeline
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
PORT=5000
DATABASE_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/agritech
JWT_SECRET=your_super_secret_key
PAYSTACK_SECRET_KEY=your_paystack_key
FRONTEND_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```
Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 🗺 Project Structure

```text
agritech-pipeline/
├── backend/
│   ├── config/          # Database and environment config
│   ├── controllers/     # Business logic for Auth, Products, Orders, etc.
│   ├── middleware/      # Auth protection and Image upload logic
│   ├── models/          # MongoDB Schemas (User, Product, Order, Review, Transaction)
│   ├── routes/          # API Endpoints
│   └── services/        # External integrations (WhatsApp, Cloudinary)
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # Global State (AuthContext)
│   │   ├── pages/       # Page views (Marketplace, Dashboard, etc.)
│   │   ├── services/    # API client and endpoints
│   │   └── index.css    # Tailwind v4 styles
│   └── tailwind.config.js
└── DEPLOYMENT.md        # Production guide
```

---

## 📈 Future Roadmap
- [ ] **Flutter Mobile App**: Dedicated apps for Farmers and Drivers.
- [ ] **AI Price Prediction**: Using historical data to predict crop price trends.
- [ ] **Automated Payouts**: Automatic release of escrow funds to farmers via API.
- [ ] **Cold Chain Integration**: Specialized tracking for perishable goods.
