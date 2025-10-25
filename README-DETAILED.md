# 🎂 Sweet Delights Bakery - E-Commerce Website

A fully responsive, modern e-commerce website for a premium cake shop built with Next.js 14, TypeScript, Tailwind CSS, and deployed on Vercel.

## 🌐 Live Demo

**Website:** [https://agentic-0128b630.vercel.app](https://agentic-0128b630.vercel.app)

## ✨ Features

### Customer-Facing Features

#### 🏠 Homepage
- Visually striking hero section with animated cake imagery
- Prominent call-to-action buttons
- Testimonials carousel with star ratings
- Featured cakes showcase
- Company story and values section
- Responsive design optimized for all devices

#### 🛍️ Cake Catalog
- User-friendly grid layout with beautiful cake displays
- Advanced filtering by:
  - Flavor (Chocolate, Vanilla, Red Velvet, etc.)
  - Occasion (Birthday, Wedding, Anniversary, etc.)
  - Dietary restrictions (Vegan, Gluten-Free, Dairy-Free)
  - Price range
- Multiple sorting options (popularity, rating, price, name)
- Real-time filter updates
- 12 unique cake varieties

#### 🎂 Cake Detail Page
- Multiple high-quality image views with carousel
- Detailed descriptions and pricing
- Size selection (6", 8", 10" options)
- Frosting customization options
- Custom message input field (up to 50 characters)
- Related cakes recommendations
- Customer ratings and reviews display
- Add to cart with quantity selection

#### 🛒 Shopping Cart
- Clear display of selected items with images
- Quantity adjustment controls
- Remove items functionality
- Automatic subtotal calculation
- Tax calculation (8%)
- Shipping cost calculation (free over $75)
- Order summary with total
- Persistent cart (saved in browser)

#### 💳 Checkout Process
- Multi-step checkout flow:
  1. Shipping Information
  2. Payment Details
  3. Order Review
- Address validation
- Multiple shipping options:
  - Standard (5-7 days) - $10
  - Express (2-3 days) - $25
  - Overnight (1 day) - $50
- Secure payment gateway ready (Stripe integration structure)
- Form validation with error messages
- Order summary sidebar

#### 👤 User Account Management
- Registration with email/password
- Login with demo credentials
- User dashboard with:
  - Order history
  - Order tracking
  - Quick stats
- Profile management
- Password reset functionality (structure ready)
- Persistent authentication

#### 🔐 Admin Dashboard
- Secure admin access (use "admin@" in email during login)
- Dashboard overview with:
  - Revenue statistics
  - Order counts
  - Product management
  - Customer metrics
- Inventory management:
  - View all cakes
  - Edit cake details (structure ready)
  - Delete cakes (structure ready)
  - Add new cakes (structure ready)
- Order management:
  - View all orders
  - Update order status
  - Process shipments
- Sales analytics visualization
- Popular products tracking

### 🎨 Design System

#### Color Palette (Pastel Theme)
- Pink: `#F8BBD0`
- Purple: `#E1BEE7`
- Blue: `#BBDEFB`
- Peach: `#FFCCBC`
- Mint: `#C8E6C9`
- Yellow: `#FFF9C4`

#### Typography
- Font Family: Open Sans
- Consistent hierarchy (h1-h6)
- Readable line heights
- Responsive font sizes

#### Spacing
- 8px grid system
- Consistent padding and margins
- Responsive breakpoints

#### Components
- Reusable button styles (primary, secondary)
- Card components with hover effects
- Input fields with focus states
- Custom form controls

### ♿ Accessibility (WCAG Compliant)

- ✅ Proper ARIA attributes throughout
- ✅ Keyboard navigation support
- ✅ Focus indicators on all interactive elements
- ✅ Alt text for images (emoji placeholders)
- ✅ Sufficient color contrast ratios
- ✅ Semantic HTML structure
- ✅ Screen reader friendly labels
- ✅ Form field labels and error messages

### 📱 Responsiveness

- **Mobile-first design approach**
- Flexible layouts that adapt to screen sizes
- Optimized touch interactions
- Responsive navigation with hamburger menu
- Breakpoints:
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px

## 🛠️ Technology Stack

### Frontend
- **Next.js 14.2.5** - React framework with App Router
- **React 18.3.1** - UI library
- **TypeScript 5.5.3** - Type safety
- **Tailwind CSS 3.4.6** - Utility-first CSS
- **Framer Motion 11.3.2** - Animations
- **Lucide React 0.408.0** - Icon library

### State Management
- **Zustand 4.5.4** - Lightweight state management
- Local storage persistence

### Form Handling
- **React Hook Form 7.52.1** - Form validation
- **Zod 3.23.8** - Schema validation
- **@hookform/resolvers 3.9.0** - Validation integration

### Utilities
- **date-fns 3.6.0** - Date formatting

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/                      # Next.js 14 App Router pages
│   ├── about/               # About page
│   ├── account/             # User account dashboard
│   ├── admin/               # Admin dashboard
│   ├── cart/                # Shopping cart page
│   ├── catalog/             # Cake catalog
│   │   └── [id]/           # Individual cake detail page
│   ├── checkout/            # Checkout flow
│   ├── contact/             # Contact page
│   ├── login/               # Login page
│   ├── order-confirmation/  # Order success page
│   ├── register/            # Registration page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── home/               # Homepage components
│   ├── Header.tsx           # Site header/navigation
│   └── Footer.tsx           # Site footer
├── lib/                     # Utilities and data
│   ├── store.ts            # Zustand state management
│   └── data.ts             # Mock data
└── ...                      # Configuration files
```

## 🧪 Demo Credentials

### Regular User
- Email: any@email.com
- Password: any password (minimum 6 characters)

### Admin Access
- Email: admin@email.com (or any email containing "admin@")
- Password: any password (minimum 6 characters)

## 🔮 Future Enhancements (Backend Integration)

The frontend is ready to integrate with a Spring Boot backend using JPA/Hibernate.

---

**Built with ❤️ using Next.js and deployed on Vercel**
