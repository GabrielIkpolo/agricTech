# Project Plan: AgriTech Farm-to-Market Pipeline

## 1. Project Overview
The goal is to build a digital orchestrator that connects Nigerian farmers, bulk buyers, and logistics providers to reduce food waste and ensure fair pricing through a trust-based escrow system.

## 2. Target Audience
- **Farmers**: Producers looking for fair market prices and reliable logistics.
- **Buyers**: Hotels, Supermarkets, and Wholesalers needing consistent quality and supply.
- **Drivers**: Independent truck owners looking for load matching.
- **Village Agents**: Tech-intermediaries managing farmers in rural areas.

## 3. Technical Stack
- **Backend**: 
    - Runtime: Node.js
    - Database: MongoDB
    - ORM: Prisma (for type-safe database access)
    - API: REST (initially)
- **Frontend (Web)**: 
    - Framework: React.js
    - Build Tool: Vite
    - Styling: Tailwind CSS (recommended for speed)
- **Frontend (Mobile - Future)**: 
    - Framework: Flutter (for Android/iOS)
- **External Integrations**:
    - Payments: Paystack / Flutterwave
    - Communications: WhatsApp API / Africa's Talking (USSD)

## 4. Core Architecture
- **Multi-tenant User Roles**: Different dashboards for Farmers, Buyers, and Drivers.
- **Escrow System**: A financial logic layer that holds payments until delivery confirmation.
- **Matching Engine**: A logic layer that matches available produce with nearby available trucks.
- **Agent Model**: A hierarchical structure where an Agent account can manage multiple Farmer profiles.

## 5. Success Metrics
- Number of successful trades facilitated.
- Reduction in "Empty Miles" for truck drivers.
- Increase in farmer income via direct-to-buyer sales.
