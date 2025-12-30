# Snoutify - Customer and Pet Management by Yurii Shushanskyi

A responsive web app for managing customers and their pets with search and filtering capabilities.

## Features

- Search customers by ID, name, email, or phone
- Filter by pet species (dogs, cats, birds, hamsters, rats)
- Debounced search (300ms delay)
- Mobile-responsive design
- Loading states and error handling

## Tech Stack

- Next.js 15, TypeScript, Tailwind CSS
- React Query for data fetching
- Radix UI components
- Supabase (PostgreSQL database)

## Project Structure

```
src/
├── app/              # Next.js pages and layouts
├── components/       # React components (UI, cards, forms)
├── constants/        # App constants (animals data)
├── hooks/           # Custom React hooks (debounce, API)
├── providers/       # React context providers
├── services/        # API service functions
└── types/           # TypeScript type definitions
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Create a project at [Supabase](https://app.supabase.com)
2. Go to Project Settings > API to get your credentials
3. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 3. Set Up Database Schema

1. Open the Supabase SQL Editor
2. Run the SQL from `supabase-schema.sql` to create the tables

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## API Integration

### GET /api/customers

Fetch customers with optional query parameters:
- `searchText`: Search term (searches ID, name, email, phone, pet names)
- `species`: Pet species filter (comma-separated)
- `page`: Page number (default: 1)
- `pageSize`: Items per page (default: 10)

Example API call:
```
GET /api/customers?searchText=john&species=dog&page=1&pageSize=20
```

Response:
```json
{
  "customers": [...],
  "total": 100,
  "page": 1,
  "pageSize": 20,
  "totalPages": 5
}
```

### POST /api/customers

Create a new customer with optional pets.

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "555-0123",
  "pets": [
    {
      "name": "Fluffy",
      "species": "cat"
    }
  ]
}
```

### POST /api/customers/[id]/pets

Add pets to an existing customer.

Request body (single pet):
```json
{
  "name": "Buddy",
  "species": "dog"
}
```

Request body (multiple pets):
```json
{
  "pets": [
    { "name": "Buddy", "species": "dog" },
    { "name": "Max", "species": "cat" }
  ]
}
```

## Development

```bash
npm install          # Install project dependencies
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run typecheck    # TypeScript checking
```
