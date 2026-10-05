# Octofit Tracker - Frontend (React 19 + Vite)

The presentation tier for the Octofit Tracker multi-tier application. Built with React 19, Vite, React Router, and Bootstrap 5.

## Project Structure

```
src/
├── components/          # React components
│   ├── Navigation.jsx   # Navigation bar with routing links
│   ├── Activities.jsx   # Activities dashboard
│   ├── Leaderboard.jsx  # Competitive leaderboard view
│   ├── Teams.jsx        # Team management and listing
│   ├── Users.jsx        # User profiles and listing
│   └── Workouts.jsx     # Workout programs and suggestions
├── utils/
│   └── api.js          # API configuration and helpers
├── App.jsx             # Main app with routing setup
├── main.jsx            # React DOM entry point
├── App.css             # App styling
└── index.css           # Global styles
```

## Features

- **React Router Navigation** - Multi-page application with client-side routing
- **Bootstrap 5 Styling** - Responsive UI components
- **API Integration** - Connects to backend API via configurable base URL
- **Environment Variables** - `VITE_CODESPACE_NAME` for Codespace or localhost fallback
- **Flexible API Responses** - Supports both paginated and array-based API responses
- **Error Handling** - Graceful error messages for failed API calls
- **Loading States** - User feedback during data fetching

## Environment Variables

### VITE_CODESPACE_NAME
Controls the API base URL:
- **If set:** Uses GitHub Codespace URL `https://{VITE_CODESPACE_NAME}-8000.app.github.dev/api`
- **If unset:** Falls back to `http://localhost:8000/api`

See `.env.local.example` for detailed configuration instructions.

## API Endpoints

The frontend connects to these backend endpoints:
- `GET /api/activities/` - List user activities
- `GET /api/leaderboard/` - Get competitive rankings
- `GET /api/teams/` - List teams
- `GET /api/users/` - List user profiles
- `GET /api/workouts/` - Get personalized workouts

## Development

```bash
# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## Stack

- **React 19** - UI framework
- **Vite 8** - Build tool and dev server
- **React Router 7** - Client-side routing
- **Bootstrap 5** - CSS framework
- **Oxlint** - Fast JavaScript linter
- **ES Modules** - Native module support

## Notes

- The app uses `import.meta.env.VITE_CODESPACE_NAME` for environment variables per Vite conventions
- The Navigation component provides links to all major sections
- Home page displays quick cards for each feature area
- All components handle loading and error states gracefully

