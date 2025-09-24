# The Wild Oasis

<div align="center">
  <img src="public/logo.png" alt="Wild Oasis Logo" width="200">
  <br>
  <br>
  A luxurious cabin booking platform built with Next.js 14, featuring secure authentication, real-time booking management, and seamless payment integration.
</div>

## 🌟 Features

- **Modern Authentication**
  - Secure Google OAuth2.0 integration
  - Protected routes and middleware
  - Guest profile management

- **Real-time Booking System**
  - Interactive date picker
  - Automatic availability updates
  - Instant booking confirmation

- **Secure Payments**
  <div align="center">
    <img src="public/secure.png" alt="Secure Payments" width="150">
  </div>
  
  - Stripe payment integration
  - SSL-secured transactions
  - Webhook handling for payment status

- **Responsive Design**
  - Mobile-first approach
  - Tailwind CSS styling
  - Smooth animations

- **User Experience**
  - Intuitive navigation
  - Quick loading states
  - Error boundaries
  - Fallback pages

## 🛠️ Tech Stack

- **Frontend**
  - Next.js 14
  - React 19
  - Tailwind CSS
  - Zustand for state management

- **Authentication & Security**
  - NextAuth.js v5
  - Google OAuth2.0
  - Middleware protection

- **Payment Processing**
  - Stripe API
  - Webhook integration
  - Secure payment flow

- **Development Tools**
  - ESLint
  - Modern JavaScript (ES6+)
  - Responsive design principles

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/EsmailKhaleel/the-wild-oasis-website.git
   ```

2. **Install dependencies**
   ```bash
   cd the-wild-oasis-website
   npm install
   ```

3. **Set up environment variables**
   ```env
   NEXT_PUBLIC_API_URL=your_api_url
   AUTH_GOOGLE_ID=your_google_client_id
   AUTH_GOOGLE_SECRET=your_google_client_secret
   NEXT_AUTH_SECRET=your_nextauth_secret
   STRIPE_SECRET_KEY=your_stripe_secret
   STRIPE_WEBHOOK_SECRET=your_webhook_secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## 📱 App Screenshots

[Add your application screenshots here]

## 🔒 Security

- Secure authentication flow
- Protected API routes
- Data encryption
- Secure payment processing
- Input validation

## 🔄 State Management

- Zustand for global state
- Server-side rendering
- Optimistic updates
- Real-time data synchronization

## 📦 Project Structure

```
the-wild-oasis-website/
├── app/                  # Next.js app directory
│   ├── _components/     # Reusable components
│   ├── _hooks/         # Custom React hooks
│   ├── _lib/           # Utility functions
│   ├── _styles/        # Global styles
│   ├── _zustand/       # State management
│   └── [routes]/       # Application routes
├── public/             # Static assets
└── ...configuration files
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

