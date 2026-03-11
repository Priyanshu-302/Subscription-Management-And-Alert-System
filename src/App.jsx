import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgetPasswordPage';
import DashboardPage from './pages/DashboardPage';
import SubscriptionsPage from './pages/SubscriptionsPage';
import AlertsPage from './pages/AlertsPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        {/* Toast notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1e293b',
              color: '#f1f5f9',
              border: '1px solid rgba(255,255,255,0.1)'
            }
          }}
        />

 <Routes>
  <Route path="/"       element={<Navigate to="/login" />} />
  <Route path="/login"  element={<LoginPage />} />
  <Route path="/signup" element={<SignupPage />} />  {/* ← add this */}
  <Route path="/forgot-password" element={<ForgotPasswordPage />} />

 <Route element={<ProtectedRoute />}>
  <Route path="/dashboard" element={<DashboardPage />} />
  <Route path="/subscriptions" element={<SubscriptionsPage />} />
  <Route path="/alerts"  element={<AlertsPage />} />
  <Route path="/profile"       element={<ProfilePage />} />
</Route>
</Routes>

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;