import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Alerts from './pages/Alerts';
import Settings from './pages/Settings';
import AdminDashboard from './pages/AdminDashboard';
import LandingPage from './pages/LandingPage';
import HealthDashboard from './pages/HealthDashboard';
import TeamDashboard from './pages/TeamDashboard';
import RoutePlanner from './pages/RoutePlanner';
import MaritimeDashboard from './pages/MaritimeDashboard';
import './styles/index.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/health" element={<HealthDashboard />} />
                <Route path="/team" element={<TeamDashboard />} />
                <Route path="/route" element={<RoutePlanner />} />
                <Route path="/maritime" element={<MaritimeDashboard />} />
            </Routes>
        </Router>
    );
}

export default App;


