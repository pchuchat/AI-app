# Build a SaaS AI Companion with Next.js 13, React, Tailwind, Prisma, Stripe

![Ai](https://github.com/pchuchat/AI-app/assets/84800814/f221487e-c50c-48a1-b63a-b641e77e05c2)

This project is a complete guide to building an AI companion SaaS application using some of the most powerful and popular technologies in the modern web ecosystem.

## Features

- **Tailwind Design**: A sleek and elegant design using Tailwind CSS.
- **Tailwind Animations and Effects**: Enhanced user experience with animations and effects.
- **Full Responsiveness**: Adapts to various screen sizes for a seamless user experience across devices.
- **Clerk Authentication**: Support for Email, Google, and 9+ Social Logins.
- **Client Form Validation**: Utilizes react-hook-form for client-side form validation and handling.
- **Server Error Handling**: Uses react-toast for displaying server errors.
- **Conversation Generation Tool**: Utilizes Open AI for conversation generation.
- **Page Loading State**: Enhances UX with loading indicators.
- **Stripe Monthly Subscription**: Manages subscriptions with Stripe integration.
- **Free Tier with API Limiting**: Free usage with API request limitations.
- **Route Handling**: How to write POST, DELETE, and GET routes in route handlers (app/api).
- **Data Fetching**: How to fetch data in server React components by directly accessing the database (WITHOUT API! like Magic!).
- **Relations Handling**: How to handle relations between Server and Child components.
- **Layout Reuse**: How to reuse layouts across your Next.js application.
- **Folder Structure in Next 13**: Organizing your code for scalability and maintainability.
- **App Router**: Navigation and routing capabilities.

## Prerequisites
- **Node version 18.x.x.**

## Getting Started

### Install Packages

**First, make sure to install the required packages by running:**

```bash
npm i
```
### Setup .env File
**Create a .env file in your project root and add the following keys:**
```bash

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard

OPENAI_API_KEY=
REPLICATE_API_TOKEN=

PINECONE_API_KEY=
PINECONE_ENVIRONMENT=
PINECONE_INDEX=

UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=

DATABASE_URL=

STRIPE_API_KEY=
STRIPE_WEBHOOK_SECRET=

NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Setup Prisma
**Add your MySQL Database (I used PlanetScale), and then run:**
```bash
npx prisma db push
```
### Seed Categories
```bash
node scripts/seed.ts
```
### Start the App
```bash
npm run dev
``` 
