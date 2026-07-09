# Notice Board CRUD Application

## Project Overview
The Notice Board application is a modern, full-stack CRUD (Create, Read, Update, Delete) system designed for organizing, managing, and broadcasting notices. Notices can be assigned different priorities (Normal vs. Urgent) and categorized appropriately (Exam, Event, General). The system ensures that all data is robustly validated on the server side and that urgent notices dynamically take priority when rendering the dashboard. 

## Tech Stack
**Frontend:**
- [Next.js](https://nextjs.org/) (Pages Router)
- [React](https://reactjs.org/) (Hooks only)
- [TypeScript](https://www.typescriptlang.org/) (Strict typing)
- [Tailwind CSS](https://tailwindcss.com/) (Styling and Animations)
- `lucide-react` (Icons)
- `react-hot-toast` (Toast Notifications)

**Backend:**
- Next.js API Routes (Serverless REST API)
- [Prisma ORM](https://www.prisma.io/) 
- [Zod](https://zod.dev/) (Server-side Validation)

**Database:**
- [Supabase PostgreSQL](https://supabase.com/)

**Hosting:**
- [Vercel](https://vercel.com/)

## Folder Structure
```text
pages/
  ├── api/
  │   └── notices/
  │       ├── index.ts        # GET (list) and POST (create) notices
  │       └── [id].ts         # GET (single), PUT (update), DELETE notice
  ├── notice/
  │   ├── add.tsx             # Page to create a new notice
  │   └── edit/[id].tsx       # Page to edit an existing notice
  ├── _app.tsx
  └── index.tsx               # Main Dashboard rendering the grid of notices

components/
  ├── Layout/
  │   └── Layout.tsx          # Main application shell with navbar
  └── Notice/
      ├── NoticeCard.tsx      # Visual card component for individual notices
      ├── NoticeForm.tsx      # Reusable form component (Create/Edit)
      ├── DeleteDialog.tsx    # Destructive action confirmation modal
      ├── EmptyState.tsx      # Placeholder when no notices exist
      └── LoadingSpinner.tsx  # Spinner for async operations

lib/
  ├── api.ts                  # Axios client wrapper for frontend fetching
  ├── prisma.ts               # Global Prisma Client instantiation
  └── validation.ts           # Zod schemas for API payload validation

prisma/
  └── schema.prisma           # Prisma Data Model (Notice, Category, Priority)

styles/
  └── globals.css             # Tailwind configuration & global styles
```

## Environment Variables
Create a `.env` file in the root of the directory and provide your PostgreSQL connection string:

```env
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@[YOUR-PROJECT-ID].supabase.co:5432/postgres"
```

## Setup & Run Locally

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Initialize Database:**
   Push the Prisma schema to your Supabase PostgreSQL instance:
   ```bash
   npx prisma db push
   ```

3. **Generate Prisma Client:**
   Ensure the TypeScript client is synchronized:
   ```bash
   npx prisma generate
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```

5. **Open Application:**
   Visit [http://localhost:3000](http://localhost:3000) to view the Notice Board.

## Deploy to Vercel
1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Log into [Vercel](https://vercel.com) and click **Add New Project**.
3. Import your repository.
4. Set the Framework Preset to **Next.js**.
5. In the **Environment Variables** section, add your `DATABASE_URL`.
6. (Optional) Customize the Build Command if needed. The default `npm run build` will automatically generate the Prisma client before compiling.
7. Click **Deploy**.

## Future Improvements
- **Pagination:** Implement cursor or offset-based pagination in the Prisma query and frontend for handling high volumes of notices.
- **Search & Filter:** Add client-side or server-side filtering by category and full-text search by title/body.
- **Image Uploads:** Integrate an S3-compatible storage bucket (like Supabase Storage) to upload local files rather than strictly using URLs.
- **Dark Mode Support:** Explicitly define dark-mode variant tokens across the UI.
- **Authentication:** Restrict CRUD permissions using NextAuth or Supabase Auth.

## AI Usage Disclosure
This application was developed by the author. An AI coding assistant was used only as a supplementary tool for guidance, troubleshooting, and implementation suggestions, while all design decisions, development, and final implementation were carried out by the author.
