import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import theme from './theme';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';

import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderCompletePage from './pages/OrderCompletePage';
import AuthPage from './pages/AuthPage';
import AccountPage from './pages/AccountPage';
import OrdersPage from './pages/OrdersPage';
import GuestOrderTrackingPage from './pages/GuestOrderTrackingPage';
import AcademyPage from './pages/AcademyPage';
import ClinicalAtelierPage from './pages/ClinicalAtelierPage';
import ContactPage from './pages/ContactPage';
import TrainerPortalLoginPage from './pages/TrainerPortalLoginPage';
import TrainerPortalPage from './pages/TrainerPortalPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminProductsPage from './pages/AdminProductsPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import NotificationsPage from './pages/NotificationsPage';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header />
      <Box component="main" sx={{ flex: 1 }}>{children}</Box>
      <Footer />
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              {/* Admin pages (no customer layout) */}
              <Route path="/admin/giris" element={<AdminLoginPage />} />
              <Route path="/admin" element={<AdminDashboardPage />} />
              <Route path="/admin/urunler" element={<AdminProductsPage />} />
              <Route path="/admin/siparisler" element={<AdminOrdersPage />} />

              {/* Trainer pages (no customer layout) */}
              <Route path="/egitmen-giris" element={<TrainerPortalLoginPage />} />
              <Route path="/egitmen-portal" element={<TrainerPortalPage />} />

              {/* Customer pages (with header + footer) */}
              <Route path="/" element={<Layout><HomePage /></Layout>} />
              <Route path="/magaza" element={<Layout><ShopPage /></Layout>} />
              <Route path="/urun/:id" element={<Layout><ProductDetailPage /></Layout>} />
              <Route path="/sepet" element={<Layout><CartPage /></Layout>} />
              <Route path="/odeme" element={<Layout><CheckoutPage /></Layout>} />
              <Route path="/siparis-tamamlandi/:orderNumber" element={<Layout><OrderCompletePage /></Layout>} />
              <Route path="/giris" element={<Layout><AuthPage /></Layout>} />
              <Route path="/hesabim" element={<Layout><AccountPage /></Layout>} />
              <Route path="/siparislerim" element={<Layout><OrdersPage /></Layout>} />
              <Route path="/siparis-takip" element={<Layout><GuestOrderTrackingPage /></Layout>} />
              <Route path="/akademi" element={<Layout><AcademyPage /></Layout>} />
              <Route path="/klinik-atolye" element={<Layout><ClinicalAtelierPage /></Layout>} />
              <Route path="/iletisim" element={<Layout><ContactPage /></Layout>} />
              <Route path="/bildirimler" element={<Layout><NotificationsPage /></Layout>} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
