# Weather Alert System - TapLive Network

A comprehensive real-time weather monitoring and alert system designed for VR/AR live streaming services. Built with TypeScript, React, Node.js, and PostgreSQL.

## 🌤️ Features

- **Real-time Weather Monitoring** - Live weather data from OpenWeatherMap API with automatic caching
- **Multi-tier Alert System** - 4 severity levels from informational to emergency alerts
- **WebSocket Notifications** - Instant push notifications via Socket.io
- **Location-based Alerts** - Subscribe to weather updates for specific coordinates
- **Admin Dashboard** - Monitor system health, broadcast alerts, and view analytics
- **Responsive UI** - Premium dark theme with glassmorphism design

## 🏗️ Tech Stack

### Backend
- **Runtime**: Node.js 20+ with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL 15
- **Cache**: Redis 7
- **Real-time**: Socket.io
- **Weather API**: OpenWeatherMap

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **State Management**: Zustand
- **Routing**: React Router 6
- **Real-time**: Socket.io-client
- **Styling**: Custom CSS with CSS Variables

## 📁 Project Structure

```
weather-alert-system/
├── backend/
│   ├── src/
│   │   ├── config/         # Database, Redis, Logger config
│   │   ├── models/         # TypeScript types
│   │   ├── routes/         # API endpoints
│   │   ├── services/       # Business logic
│   │   ├── jobs/           # Background jobs
│   │   └── index.ts        # Server entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route pages
│   │   ├── store/          # Zustand state management
│   │   ├── styles/         # CSS design system
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── docker-compose.yml
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Docker & Docker Compose (for databases)
- OpenWeatherMap API key (free at https://openweathermap.org/api)

### 1. Clone & Setup

```bash
cd weather-alert-system

# Start PostgreSQL and Redis
docker-compose up -d postgres redis
```

### 2. Configure Environment

```bash
# Backend
cd backend
cp .env.example .env
# Edit .env and add your OPENWEATHERMAP_API_KEY
```

### 3. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 4. Start Development Servers

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 5. Open the App

Visit http://localhost:5173 in your browser.

## 📡 API Endpoints

### Weather
- `GET /api/v1/weather/current?lat=&lon=` - Get current weather
- `GET /api/v1/weather/forecast?lat=&lon=` - Get forecast
- `GET /api/v1/weather/score?lat=&lon=` - Get weather score

### Alerts
- `GET /api/v1/alerts?userId=` - Get user's alerts
- `POST /api/v1/alerts/check` - Check weather & generate alert
- `POST /api/v1/alerts/:id/acknowledge` - Acknowledge alert
- `POST /api/v1/alerts/:id/feedback` - Submit feedback

### Users
- `POST /api/v1/users` - Create user
- `GET /api/v1/users/:id` - Get user profile
- `PUT /api/v1/users/:id/preferences` - Update preferences

### Admin
- `GET /api/v1/admin/dashboard` - Admin dashboard data
- `POST /api/v1/admin/alerts/broadcast` - Broadcast alert
- `GET /api/v1/admin/analytics/weather-impact` - Weather analytics

## ⚡ WebSocket Events

### Client → Server
- `identify(userId)` - Identify user for targeted notifications
- `subscribe_location({lat, lon})` - Subscribe to location updates

### Server → Client
- `weather_alert` - New weather alert
- `weather_update` - Weather data update

## 🎨 Alert Severity Levels

| Level | Type | Description |
|-------|------|-------------|
| 1 | 🟢 Informational | Minor weather changes, FYI only |
| 2 | 🟡 Advisory | Moderate conditions, may affect streaming |
| 3 | 🟠 Warning | Severe conditions, safety concern |
| 4 | 🔴 Emergency | Dangerous conditions, immediate action |

## 🐳 Docker Deployment

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📜 License

MIT License - TapLive Network

---

Built with ❤️ for the TapLive Network
