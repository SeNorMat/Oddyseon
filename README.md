# Oddyseon
Web app project for a startup 
# Odysseon Web Platform

Odysseon is an interactive educational platform for cryptocurrency trading and financial literacy. The platform combines courses, simulations, and community features to help users navigate the crypto space with confidence.

## Features

- **Interactive Learning:** Engaging courses with quizzes, simulations, and practical exercises
- **Trading Simulator:** Practice trading with virtual funds in a realistic environment
- **User Progress Tracking:** Track your learning journey with achievements and milestones
- **Community Features:** Connect with fellow learners and traders (coming soon)
- **Trader Network (ODEX):** Find expert traders and mentors (coming soon)

## Technology Stack

- **Frontend:** Next.js 13+ (App Router) with React & TypeScript
- **Styling:** Tailwind CSS with ShadCN UI components
- **Authentication:** Firebase Authentication
- **Database:** Firebase Firestore
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/odysseon.git
   cd odysseon
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with your Firebase credentials:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
odysseon/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   ├── (dashboard)/              # Protected dashboard routes
│   └── api/                      # API routes
├── components/                   # Shared components
│   ├── ui/                       # ShadCN UI components
│   ├── common/                   # Common components
│   ├── auth/                     # Authentication components
│   └── [feature]/                # Feature-specific components
├── lib/                          # Utility functions & helpers
│   ├── firebase/                 # Firebase configuration
│   ├── hooks/                    # Custom React hooks
│   └── utils.ts                  # Utility functions
├── public/                       # Static assets
└── styles/                       # Additional styles
```

## Design System

The design follows a dark-themed "aurora" style with space-inspired elements:

- **Color Palette:**
  - Dark Background: #0B0F19
  - Surface: #1B2230
  - Aurora Green: #14E81E
  - Aurora Blue: #00EA8D
  - Aurora Purple: #8D00C4

- **Typography:**
  - Primary Font: Inter
  - Headings: Text sizes from text-lg to text-4xl
  - Body: text-base (16px)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.com/)
- [Firebase](https://firebase.google.com/)
- [Vercel](https://vercel.com/)
