# QuickBite 🍔 — Food Ordering & Management Platform

A full-stack food ordering and restaurant management web application built with **React (Vite)**, **Tailwind CSS**, **Node.js**, **Express**, **Prisma ORM**, **PostgreSQL**, and **Stripe Checkout**.

---

## 📸 Project Screenshots

### 1. Home & Explore Menu Page
Browse food categories (`Salad`, `Rolls`, `Deserts`, `Sandwich`, `Cake`, `Pure Veg`, `Pasta`, `Noodles`) and add dishes directly to your cart.

![Home and Menu Page](./screenshots/home-menu.png)

### 2. Slide-in Cart & Checkout (Stripe + Cash on Delivery)
Review cart items in the slide-out drawer, enter delivery details, and choose between **Stripe Online Payment** or **Cash on Delivery (COD)**.

![Cart and Checkout Page](./screenshots/cart-checkout.png)

### 3. My Orders & Real-Time Order Status
Track active and past orders (`Food Processing`, `Out for delivery`, `Delivered`) or cancel orders before dispatch.

![My Orders Page](./screenshots/my-orders.png)

### 4. Admin Dashboard (Food Catalog & Order Management)
Add new dishes with image uploads, manage the food catalog, and update customer order statuses in real time.

![Admin Panel](./screenshots/admin-panel.png)

---

## ✨ Key Features

- **Customer Frontend (`frontend/`)**:
  - Dynamic category filtering and responsive food catalog
  - Interactive slide-in cart drawer with live subtotal and delivery fee calculation
  - JWT-based user authentication (Sign Up / Login modal)
  - Dual checkout modes: **Stripe Checkout** (Card payments) & **Cash on Delivery (COD)**
  - Order tracking and order cancellation (`My Orders`)
- **Admin Panel (`admin/`)**:
  - Add new food items with image uploads
  - View and delete existing menu items
  - Manage customer orders and update delivery statuses (`Food Processing` → `Out for delivery` → `Delivered`)
- **Backend API (`backend/`)**:
  - RESTful API built with Express.js
  - PostgreSQL database managed via **Prisma ORM**
  - Password hashing with `bcrypt` & token authentication with `jsonwebtoken`
  - Image upload handling via `multer`

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS, React Router v6, Axios, Stripe.js |
| **Admin Panel** | React 18, Vite, Tailwind CSS, React Toastify, Axios |
| **Backend** | Node.js, Express.js, Prisma ORM, PostgreSQL, JWT, Bcrypt, Multer, Stripe SDK |

---

## 🔐 Environment Variables (API Keys Hidden)

All sensitive API keys and database credentials are excluded from version control via `.gitignore`. Use the provided `.env.example` templates to create your local `.env` files:

### 1. Backend (`backend/.env`)
Copy `backend/.env.example` to `backend/.env`:
```env
DATABASE_URL=postgresql://username:password@127.0.0.1:5432/Quickbite
JWT_SECRET=your_jwt_secret_key_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here
PORT=4000
```

### 2. Frontend (`frontend/.env`)
Copy `frontend/.env.example` to `frontend/.env`:
```env
VITE_BACKEND_URL=http://localhost:4000
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key_here
```

### 3. Admin Panel (`admin/.env`)
Copy `admin/.env.example` to `admin/.env`:
```env
VITE_BACKEND_URL=http://localhost:4000
```

---

## 🚀 Setup & Installation

### Prerequisites
- **Node.js** (v18+)
- **PostgreSQL** Database
- **Stripe** Account (for test API keys)

### 1. Database & Backend Setup
```bash
cd backend
npm install
# Configure your backend/.env file first
npx prisma migrate dev --name init
npx prisma db seed
```

### 2. Frontend Setup
```bash
cd frontend
npm install
# Configure your frontend/.env file
```

### 3. Admin Panel Setup
```bash
cd admin
npm install
# Configure your admin/.env file
```

### 4. Running the Application
Since `concurrently` is configured in the root `package.json`, you can start all three servers (`backend`, `frontend`, and `admin`) together from the root folder:

```bash
npm install
npm run dev
```

Or run each service individually:
- **Backend API**: `cd backend && npm run dev` (`http://localhost:4000`)
- **Customer Frontend**: `cd frontend && npm run dev` (`http://localhost:5173`)
- **Admin Panel**: `cd admin && npm run dev` (`http://localhost:5174`)
