import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { UserPreferencesProvider } from './contexts/UserPreferencesContext';

// Error Handling
import ErrorBoundary from './components/ErrorBoundary';

// Route Protection
import AdminRoute from './components/auth/AdminRoute';

// Auth Pages
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Upgrade from './pages/Upgrade';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';

// Main Pages
import Dashboard from './pages/Dashboard';
import ReadingPlan from './pages/ReadingPlan';
import Schedule from './pages/Schedule';
import Catechism from './pages/Catechism';
import Hymnal from './pages/Hymnal';
import ScriptureMemory from './pages/ScriptureMemory';
import ChildrensBible from './pages/ChildrensBible';
import Liturgy from './pages/Liturgy';
import Resources from './pages/Resources';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Help from './pages/Help';

function App() {
  return (
    <ErrorBoundary fallbackType="full">
      <AuthProvider>
        <UserPreferencesProvider>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/upgrade" element={<Upgrade />} />

            {/* Admin Routes */}
            <Route path="/admin" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />

            {/* Public Dashboard Routes (No login required) */}
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="reading" element={<ReadingPlan />} />
              <Route path="schedule" element={<Schedule />} />
              <Route path="catechism" element={<Catechism />} />
              <Route path="hymnal" element={<Hymnal />} />
              <Route path="memory" element={<ScriptureMemory />} />
              <Route path="children" element={<ChildrensBible />} />
              <Route path="liturgy" element={<Liturgy />} />
              <Route path="resources" element={<Resources />} />
              <Route path="preferences" element={<UserDashboard />} />
              <Route path="help" element={<Help />} />
              {/* Keep subscription route for direct access */}
              <Route path="subscription" element={<UserDashboard />} />
              {/* Redirects for backward compatibility */}
              <Route path="family" element={<Navigate to="/preferences" replace />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </UserPreferencesProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
