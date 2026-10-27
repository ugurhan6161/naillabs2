import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, Box, IconButton, Badge, Button,
  Drawer, List, ListItem, ListItemText, Divider, Stack,
} from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Logo from '../Logo';

const navLinks = [
  { label: 'Mağaza', href: '/magaza' },
  { label: 'Hakkımızda', href: '/klinik-atolye' },
  { label: 'İletişim', href: '/iletisim' },
];

export default function Header() {
  const { itemCount } = useCart();
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHome = location.pathname === '/';
  const onDark = isHome;

  const handleSignOut = async () => {
    setMobileOpen(false);
    await signOut();
    navigate('/');
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: onDark ? 'rgba(0,0,0,0.35)' : 'rgba(249,241,236,0.92)',
          color: onDark ? '#F9F1EC' : '#000000',
          transition: 'background-color 200ms ease',
          boxShadow: 'none',
          zIndex: 1200,
          backdropFilter: onDark ? 'blur(6px)' : 'none',
        }}
      >
        <Toolbar sx={{ px: { xs: 2, md: 5 }, py: 1.25, justifyContent: 'space-between', minHeight: 64 }}>
          <IconButton
            aria-label="Menüyü aç"
            sx={{ display: { md: 'none' }, color: 'inherit' }}
            onClick={() => setMobileOpen(true)}
          >
            <MenuIcon />
          </IconButton>

          <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
            <Logo size={26} onDark={onDark} showTagline />
          </Link>

          <Stack direction="row" spacing={0.5} sx={{ display: { xs: 'none', md: 'flex' } }}>
            {navLinks.map(link => (
              <Button
                key={link.href}
                component={Link}
                to={link.href}
                sx={{
                  color: 'inherit',
                  fontWeight: 400,
                  fontSize: 14,
                  borderRadius: 999,
                  px: 2,
                  '&:hover': { bgcolor: onDark ? 'rgba(249,241,236,0.12)' : '#EED2BC' },
                }}
              >
                {link.label}
              </Button>
            ))}
          </Stack>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {user ? (
              <IconButton component={Link} to="/hesabim" sx={{ color: 'inherit', p: 1 }} aria-label="Hesabım">
                <PersonOutlineIcon />
              </IconButton>
            ) : (
              <Button
                component={Link}
                to="/giris"
                sx={{
                  color: 'inherit', fontSize: 13, fontWeight: 500,
                  border: onDark ? '1px solid rgba(249,241,236,0.4)' : '1px solid #8B6950',
                  borderRadius: 999, px: 2,
                  display: { xs: 'none', sm: 'inline-flex' },
                }}
              >
                Giriş yap
              </Button>
            )}
            <IconButton component={Link} to="/sepet" sx={{ color: 'inherit', p: 1 }} aria-label="Sepet">
              <Badge
                badgeContent={itemCount}
                sx={{ '& .MuiBadge-badge': { bgcolor: '#A9876D', color: '#F9F1EC', fontSize: 10, minWidth: 18, height: 18, fontWeight: 700 } }}
              >
                <ShoppingBagOutlinedIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{ sx: { width: 280, bgcolor: '#F9F1EC' } }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Logo size={24} />
          <IconButton aria-label="Menüyü kapat" onClick={() => setMobileOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: '#DBCEC2' }} />
        <List>
          {navLinks.map(link => (
            <ListItem
              key={link.href}
              component={Link}
              to={link.href}
              onClick={() => setMobileOpen(false)}
              sx={{ color: '#000000', '&:hover': { bgcolor: '#EED2BC' } }}
            >
              <ListItemText primary={link.label} primaryTypographyProps={{ fontSize: 15 }} />
            </ListItem>
          ))}
          <Divider sx={{ my: 1, borderColor: '#DBCEC2' }} />
          {user ? (
            <>
              <ListItem component={Link} to="/hesabim" onClick={() => setMobileOpen(false)} sx={{ color: '#000000' }}>
                <ListItemText primary="Hesabım" />
              </ListItem>
              <ListItem component={Link} to="/siparislerim" onClick={() => setMobileOpen(false)} sx={{ color: '#000000' }}>
                <ListItemText primary="Siparişlerim" />
              </ListItem>
              {profile?.role === 'admin' && (
                <ListItem component={Link} to="/admin" onClick={() => setMobileOpen(false)} sx={{ color: '#000000' }}>
                  <ListItemText primary="Admin Panel" />
                </ListItem>
              )}
              <ListItem onClick={handleSignOut} sx={{ color: '#A63D2F', cursor: 'pointer' }}>
                <ListItemText primary="Çıkış yap" />
              </ListItem>
            </>
          ) : (
            <ListItem component={Link} to="/giris" onClick={() => setMobileOpen(false)} sx={{ color: '#60432E' }}>
              <ListItemText primary="Giriş yap / Kayıt ol" />
            </ListItem>
          )}
        </List>
      </Drawer>
      <Box sx={{ height: 64 }} />
    </>
  );
}
