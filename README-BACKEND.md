# Programming Club IIT Indore — Backend Data Layer (Phase 1)

This repository includes a full-stack **PostgreSQL + Prisma** backend architecture for the Programming Club IIT Indore official website.

---

## 🏗️ Architecture Overview

```
Next.js App Router (Frontend)
        ↓
Next.js Server / Route Handlers (API Layer)
        ↓
Prisma ORM Client Singleton (src/lib/db.ts)
        ↓
PostgreSQL Database
```

---

## 🚀 Quick Setup Guide

### 1. Install PostgreSQL
Ensure PostgreSQL is installed locally or provision a PostgreSQL database URL from your preferred cloud provider (e.g. Supabase, Neon, Railway, or local PostgreSQL service).

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Edit `.env` and set your actual PostgreSQL database connection string:

```env
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/pclub_iiti"
```

> **Note**: `.env` is ignored by Git to keep secrets safe.

### 3. Install Dependencies
Run:

```bash
pnpm install
```

### 4. Generate Prisma Client
Generate the Prisma Client types:

```bash
pnpm exec prisma generate
```

### 5. Run Database Migrations
Create and apply database migrations to your PostgreSQL database:

```bash
pnpm exec prisma migrate dev --name init
```

### 6. Seed Verified Club Data
Seed initial data (Domains, 14 Software Team members, Domain Leads, Official Contact Settings):

```bash
pnpm exec prisma db seed
```

### 7. Start Development Server
Launch the Next.js development server:

```bash
pnpm dev
```

---

## 📡 API Endpoints Reference

### Public GET Endpoints
| Endpoint | Description | Query Parameters |
| :--- | :--- | :--- |
| `GET /api/domains` | List all active domains | — |
| `GET /api/members` | List active domain members | `?domain=software` |
| `GET /api/events` | List domain events | `?domain=software`, `?status=UPCOMING` |
| `GET /api/events/[id]` | Get event details by ID or slug | — |
| `GET /api/contact/info` | Get club contact details & domain leads | — |
| `GET /api/achievements` | List verified achievements | `?domain=software` |
| `GET /api/blog` | List published blog posts | — |
| `GET /api/announcements` | List active announcements | `?domain=software` |

### Public POST Endpoints
| Endpoint | Description | Payload Requirements |
| :--- | :--- | :--- |
| `POST /api/applications` | Submit domain recruitment application | `fullName`, `email` (`*@iiti.ac.in`), `rollNumber`, `year`, `areasOfInterest`, `whyJoin` |
| `POST /api/event-registrations` | Register for an upcoming event | `eventId`, `name`, `email` (`*@iiti.ac.in`), `rollNumber`, `year` |
| `POST /api/contact` | Submit contact inquiry | `name`, `email`, `subject`, `message` |

---

## 🛡️ Database Fallback Mechanism
If PostgreSQL is offline or unconfigured during development, the frontend components (`SoftwareTeamCarousel.tsx`, `HomeContactSection.tsx`, etc.) automatically fall back to verified static data files (`softwareTeam.ts`, `clubContactData.ts`), guaranteeing **zero site downtime or visual breakage**.

---

## 🔮 Phase 2 Roadmap (Admin Dashboard)
The database schema (`schema.prisma`) includes models for `AdminUser` (roles: `SUPER_ADMIN`, `ADMIN`, `DOMAIN_LEAD`, `EDITOR`), `ApplicationStatus` management, and event management prepared for Phase 2 admin authentication and management UI.
