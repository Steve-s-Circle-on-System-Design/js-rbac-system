# js-rbac-system

A robust, enterprise-grade Role-Based Access Control (RBAC) and authentication backend built for modern applications.

Project Summary: https://docs.google.com/document/d/1VXwk0z7lnAnuCDsi8v84_JsRxHZ4BoqX8CuWPvWfORM/edit?tab=t.0

## Features
• Multi-Channel Authentication: Traditional email/password (with bcrypt), Google OAuth 2.0, and passwordless Magic OTPs.

• Token Lifecycle Management: Secure JWT pipeline featuring short-lived access tokens (15-min expiry) and single-use refresh tokens (7-day longevity) with rotation.

• Automated Security: Real-time failed login tracking, automated 15-minute account lockouts, Helmet protection, CORS, and global input validation.

• Role-Based Access Control (RBAC): Granular, multi-tier permission guards (@Roles()) separating standard users and administrators.

• Event-Driven Email Infrastructure: Fully decoupled asynchronous email processing via EventEmitter, complete with a transactional logging ledger (email_logs), state machine pipeline (Pending $\rightarrow$ Sent $\rightarrow$ Delivered $\rightarrow$ Opened $\rightarrow$ Clicked), exponential backoff retries, and telemetry metrics.  

• Modular File Uploads: Isolated file handling utilizing direct memory streaming to Cloudinary with zero server disk pollution.

• Admin Dashboard Support: Endpoints and modules for user management, system monitoring, and email telemetry analytics.

## Tech Stack
• Package Manager: pnpm

• Runtime / Framework: Node.js

## Getting Started
Prerequisites
Ensure you have Node.js and pnpm installed on your machine.

## Installation
Clone the repository and install dependencies using pnpm:

git clone [https://github.com/your-username/your-repo-name.git](https://github.com/Steve-s-Circle-on-System-Design/js-rbac-system)
cd js-rbac-system
pnpm install

Environment Setup
Create a .env file in the root directory and configure your environment variables (Database URI, JWT secrets, Cloudinary credentials, and Mail service configurations).

Running the App

# Development mode
pnpm run dev

# Production build
pnpm run build
pnpm run start
