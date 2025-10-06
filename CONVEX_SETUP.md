# Convex Configuration Guide

## How to Get Your Convex URL

### Step 1: Create Convex Account
1. Go to [convex.dev](https://convex.dev)
2. Sign up or login with GitHub/Google
3. Click "Create Project"

### Step 2: Set Up Project
1. **Project Name**: `task-manager` (or any name)
2. **Region**: Choose closest to your users
3. **Template**: Choose "Empty" or "React"

### Step 3: Get Deployment URL
After creating the project, you'll see:
- **Dashboard URL**: `https://dashboard.convex.dev/your-project`
- **Deployment URL**: `https://your-project-name.convex.cloud`

### Step 4: Configure Environment
Create `.env.local` file in your project root:
```
REACT_APP_CONVEX_URL=https://your-project-name.convex.cloud
```

### Step 5: Deploy Schema
Run these commands in your project directory:
```bash
npx convex dev
```

This will:
- Deploy your schema from `convex/schema.ts`
- Deploy your functions from `convex/tasks.ts`
- Generate API types

### Step 6: Update App
Replace mock data in `src/components/TaskManager.tsx` with:
```typescript
import { useQuery, useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
```

## Current Status
✅ App is running with mock data at http://localhost:3000
✅ Convex schema is ready in `convex/schema.ts`
✅ Convex functions are ready in `convex/tasks.ts`
⏳ Waiting for Convex URL to enable real-time features

## Alternative: Use Mock Data
The app currently works perfectly with mock data. You can:
1. Use it as-is for local development
2. Add Convex later for real-time sync
3. Deploy to Vercel with mock data
