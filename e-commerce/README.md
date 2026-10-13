# VELVET & CO. — Contemporary E-Commerce Clothing Website

A responsive, modern, frontend e-commerce clothing store built with pure **HTML5**, **CSS3**, and **Vanilla JavaScript** (no external framework or build dependencies required).

---

## 🌟 Key Features

### 🛍️ Storefront & Catalog
- **Interactive Department Filters:** Filter by *All Items*, *Women*, *Men*, *Streetwear*, *Shoes*, and *Accessories*.
- **Instant Search:** Real-time search bar that filters products by title, description, and keywords.
- **Advanced Filters:**
  - Dynamic **Max Price Range Slider** ($30 to $200).
  - **Size Selector Chips** (XS, S, M, L, XL, 42).
  - **On Sale Only** and **In Stock Only** toggles.
- **Sorting Options:** Sort by Featured, Price (Low to High), Price (High to Low), Customer Rating, and Alphabetical (A-Z).
- **Active Filter Pills:** Visual indicators for applied filters with one-click remove or full reset.

### 🧥 Product Experience
- **Quick View Modal:**
  - Multi-image gallery with interactive thumbnail switching.
  - Interactive color swatch selector.
  - Interactive size buttons.
  - Quantity stepper.
  - One-click *Add to Bag*.
- **Product Cards:** Hover animations, category tags, star ratings with review counts, color preview dots, badge overlays (*Bestseller*, *Sale*, *Hot*, *Luxury*), and quick add.
- **Wishlist System:** Heart toggle on every card with a dedicated slide-out Wishlist Drawer and *Move to Bag* functionality.

### 🛒 Cart & Checkout Flow
- **Slide-out Cart Drawer:**
  - Real-time item list with selected size, color, quantity adjustments, and removal.
  - **Dynamic Free Shipping Meter:** Visual progress bar tracking orders toward the **$75.00** free shipping threshold.
  - **Promo Code Engine:** Apply discount codes (`SPRING40` for 40% off, `SAVE15` for 15% off, `WELCOME10` for 10% off).
  - Subtotal, discount deduction, shipping calculation, and total price updates in real-time.
- **Secure Checkout Modal:**
  - Customer shipping information form.
  - Payment method selector (*Credit Card*, *PayPal*, *Pay on Delivery*).
  - Simulated payment processing animation.
  - **Order Confirmation Modal:** Displays unique order ID (`#ORD-XXXXX`), estimated delivery timeline, customer name, and order total.

### 🎨 Design & Micro-Interactions
- **Dark / Light Theme Switcher:** Fully responsive theme toggle with persistent state saved in `localStorage`.
- **Live Countdown Timer:** Real-time ticking countdown for the flash promotion.
- **Floating Toast Notifications:** Animated feedback when adding items, toggling wishlist, or applying coupons.
- **Fully Responsive:** Optimized for mobile phones, tablets, and desktop displays.

---

## 📁 Project Structure

```text
e-commerce/
├── index.html          # Semantic HTML5 markup, modals, drawers, and layouts
├── css/
│   └── styles.css      # CSS variables, responsive design, dark mode, animations
├── js/
│   ├── products.js     # Catalog dataset (apparel, prices, images, colors, sizes)
│   └── app.js          # Cart, wishlist, filters, sorting, modals, and checkout logic
└── README.md           # Documentation
```

---

## 🚀 How to Run

1. Open the project folder:
   ```text
   c:\Users\JANA M\OneDrive\Desktop\e-commerce
   ```
2. Double-click **`index.html`** to open it directly in any modern browser (Chrome, Edge, Firefox, Safari).
3. Alternatively, if you use VS Code or a local server:
   - Right-click `index.html` and choose **"Open with Live Server"**, or
   - Run `npx serve .` in terminal.

---

## 🎟️ Active Promo Codes for Testing

| Promo Code | Discount | Description |
| :--- | :--- | :--- |
| `SPRING40` | **40% OFF** | Flash spring sale discount |
| `SAVE15` | **15% OFF** | Special cart coupon |
| `WELCOME10` | **10% OFF** | New customer club welcome reward |
