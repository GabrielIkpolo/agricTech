# Deployment Guide: AgriTech Pipeline

This project is designed to be deployed as a decoupled architecture with a Node.js backend and a React frontend.

## 1. Backend Deployment (Node.js + MongoDB)

### Database
- Use **MongoDB Atlas** (Free Tier).
- Create a cluster, a database user, and whitelist all IPs (`0.0.0.0/0`).
- Copy your connection string into the `DATABASE_URL` env variable.

### Hosting Options
- **Render / Railway / Fly.io**: Best for Node.js apps.
- **Steps**:
    1. Connect your GitHub repository to the platform.
    2. Set the **Build Command**: `npm install`
    3. Set the **Start Command**: `npm start`
    4. **Environment Variables**:
       - `DATABASE_URL`: Your MongoDB Atlas string.
       - `JWT_SECRET`: A long random string.
       - `PAYSTACK_SECRET_KEY`: Your Paystack secret key.
       - `FRONTEND_URL`: The URL of your deployed frontend.
       - `NODE_ENV`: `production`

## 2. Frontend Deployment (React + Vite)

### Hosting Options
- **Vercel / Netlify**: Optimized for Vite.
- **Steps**:
    1. Connect your GitHub repository.
    2. Set the **Build Command**: `npm run build`
    3. Set the **Output Directory**: `dist`
    4. **Environment Variables**:
       - `VITE_API_URL`: The URL of your deployed backend (e.g., `https://agritech-api.onrender.com/api`).

## 3. Production Considerations

### Image Storage
Currently, images are stored in the `/uploads` folder. In production, this folder is wiped on every restart (ephemeral storage).
- **Solution**: Update `uploadMiddleware.js` to use **Cloudinary**.
- Add `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` to your backend env variables.

### USSD & WhatsApp
- To make the USSD logic work, you must set up an account with **Africa's Talking**.
- Create a USSD shortcode and set the **Callback URL** to `https://your-api.com/ussd/handler`.
- For WhatsApp, connect your `notificationService.js` to a provider like **Twilio** or the **Meta WhatsApp Business API**.

## 4. Local Development Summary
- Backend: `npm run dev` (Port 5000)
- Frontend: `npm run dev` (Port 5173)
