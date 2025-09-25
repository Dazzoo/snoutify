# Supercake - Customer and Pet Management by Yurii Shushanskyi from CarsXE API

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

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## API Integration

The app fetches data from `/api/customers` with optional query parameters:
- `searchText`: Search term
- `species`: Pet species filter

Example API call:
```
GET /api/customers?searchText=john&species=dog
```

## Development

```bash
npm install          # Install project dependencies
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run typecheck    # TypeScript checking
```
