# Modern Task Management App

A beautiful, modern task management web application built with React.js, TypeScript, Convex DB, and Tailwind CSS. Deployable on Vercel with real-time synchronization.

## 🚀 Features

- **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **Real-time Sync**: Powered by Convex for instant updates across devices
- **Task Management**: Create, edit, delete, and toggle task completion
- **Priority System**: Organize tasks with low, medium, and high priorities
- **Due Dates**: Set and track task deadlines with visual indicators
- **Filtering**: Filter tasks by completion status and priority
- **Statistics**: View task completion statistics at a glance
- **TypeScript**: Full type safety throughout the application
- **Responsive**: Works perfectly on desktop, tablet, and mobile devices

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Database**: Convex (real-time database)
- **Icons**: Lucide React
- **Deployment**: Vercel
- **Build Tool**: Create React App

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd task-manager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Convex**
   ```bash
   npx convex dev
   ```
   Follow the prompts to create your Convex project and get your deployment URL.

4. **Configure environment variables**
   ```bash
   cp env.example .env.local
   ```
   Update `.env.local` with your Convex deployment URL:
   ```
   REACT_APP_CONVEX_URL=https://your-convex-deployment.convex.cloud
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

## 🚀 Deployment on Vercel

### Method 1: Vercel CLI (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Set environment variables**
   ```bash
   vercel env add REACT_APP_CONVEX_URL
   ```
   Enter your Convex deployment URL when prompted.

### Method 2: Vercel Dashboard

1. **Connect your repository** to Vercel
2. **Set environment variables** in the Vercel dashboard:
   - `REACT_APP_CONVEX_URL`: Your Convex deployment URL
3. **Deploy** - Vercel will automatically build and deploy your app

## 🗄️ Database Schema

The application uses the following Convex schema:

### Tasks Table
- `title`: Task title (required)
- `description`: Optional task description
- `completed`: Boolean completion status
- `priority`: Priority level (low, medium, high)
- `dueDate`: Optional due date (ISO string)
- `createdAt`: Creation timestamp
- `updatedAt`: Last update timestamp
- `userId`: User identifier

### Users Table
- `name`: User display name
- `email`: User email address
- `image`: Optional profile image URL

## 🎨 Customization

### Styling
The app uses Tailwind CSS with a custom color palette. You can customize the design by modifying:
- `tailwind.config.js` - Color scheme and design tokens
- `src/index.css` - Global styles and custom CSS
- Component files - Individual component styling

### Features
To add new features:
1. Update the Convex schema in `convex/schema.ts`
2. Add new mutations/queries in `convex/tasks.ts`
3. Create new React components in `src/components/`
4. Update the main `TaskManager` component

## 🔧 Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Project Structure

```
src/
├── components/          # React components
│   ├── TaskManager.tsx  # Main application component
│   ├── AddTaskForm.tsx  # Task creation form
│   ├── TaskList.tsx     # Task list container
│   ├── TaskItem.tsx     # Individual task component
│   └── FilterBar.tsx    # Task filtering controls
├── App.tsx             # Root component with Convex provider
└── index.css          # Global styles and Tailwind imports

convex/
├── schema.ts           # Database schema definition
└── tasks.ts            # Database mutations and queries
```

## 🐛 Troubleshooting

### Common Issues

1. **Convex connection issues**
   - Ensure your `REACT_APP_CONVEX_URL` is correct
   - Check that your Convex project is deployed and running

2. **Build errors**
   - Run `npm run build` to check for TypeScript errors
   - Ensure all dependencies are installed with `npm install`

3. **Styling issues**
   - Verify Tailwind CSS is properly configured
   - Check that `src/index.css` imports Tailwind directives

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.

---

Built with ❤️ using React, Convex, and Tailwind CSS