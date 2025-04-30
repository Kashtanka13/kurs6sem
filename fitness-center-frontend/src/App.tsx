// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';


import AdminDashboard from './pages/AdminDashboard';
import ClientList from './pages/ClientList';
import AddClient from './pages/AddClient';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';

import { ProtectedRoute } from './components/ProtectedRoute';
import { RoleGuard } from './components/RoleGuard';
import Login from './pages/Login';
import Register from './pages/Register';

const theme = createTheme({
  palette: {
    primary: { main: '#1a237e' },
    secondary: { main: '#dc004e' },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Header />
          <Box component="main" sx={{ flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="/admin" element={
                <ProtectedRoute>
                  <RoleGuard role="admin">
                    <AdminDashboard />
                  </RoleGuard>
                </ProtectedRoute>
              } />

              <Route path="/clients" element={
                <ProtectedRoute>
                  <>
                    <AddClient />
                    <ClientList />
                  </>
                </ProtectedRoute>
              } />
            </Routes>
          </Box>
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;