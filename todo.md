# Project Todo List: AgriTech Pipeline

## Phase 1: MVP Foundation (Web-based)
- [x] **Backend Setup**:
    - [x] Initialize Node.js project.
    - [x] Setup MongoDB connection using Mongoose.
    - [x] Define Mongoose models (User, Product, Order).
    - [x] Implement JWT-based Authentication (Signup/Login).
- [x] **Frontend Setup**:
    - [x] Initialize React project with Vite.
    - [x] Setup Tailwind CSS (v4) for styling.
    - [x] Create basic routing (Home, Dashboard, Login).
- [x] **Core Marketplace Features**:
    - [x] Farmer Listing Page (Create/Edit/Delete crop listings).
    - [x] Buyer Marketplace (Search, filter, and view products).
    - [x] Order Placement logic (Buyer requests a quantity).
- [x] **Testing**:
    - [x] End-to-end test: Farmer lists $\rightarrow$ Buyer orders $\rightarrow$ Order is recorded.

## Phase 2: Trust & Logistics (The "Meat")
- [ ] **Payment Integration**:
    - [ ] Integrate Paystack/Flutterwave API.
    - [ ] Implement Escrow logic (Payment status: `Pending` $\rightarrow$ `Held` $\rightarrow$ `Released`).
- [x] **Logistics Matching**:
    - [x] Driver Role setup & Dashboard.
    - [x] "Available Loads" feed for Drivers.
    - [x] Shipment status updates (Picked up $\rightarrow$ Delivered).
    - [x] Driver Assignment logic (Farmer assigns Driver).
- [ ] **Feedback Loop**:
    - [ ] Rating and Review system for all parties.

## Phase 3: Nigerian Context (Accessibility)
- [ ] **Agent System**:
    - [ ] Implement Agent account role.
    - [ ] Build functionality for Agents to create and manage multiple Farmer accounts.
- [ ] **WhatsApp Integration**:
    - [ ] Setup WhatsApp Business API / Bot for notifications.
- [ ] **USSD Gateway**:
    - [ ] Integrate Africa's Talking for basic USSD listing and price checks.

## Phase 4: Scaling & Revenue
- [ ] **Monetization**:
    - [ ] Implement commission deduction logic on escrow release.
    - [ ] Create "Premium" subscription tier for bulk buyers.
- [ ] **Mobile App**:
    - [ ] Start Flutter development for Farmer/Driver apps.
- [ ] **Analytics**:
    - [ ] Build a trend dashboard (Price fluctuations, Demand hotspots).
