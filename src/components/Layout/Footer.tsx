import { Link } from 'react-router-dom';
import { Box, Typography, Grid, Divider, IconButton, Stack } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import Logo from '../Logo';

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: '#000000', color: '#5E564D', pt: 8, pb: 4 }}>
      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 3, md: 5 } }}>
        <Grid container spacing={6} sx={{ mb: 5 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ mb: 3 }}>
              <Logo size={32} onDark showTagline />
              <Typography sx={{ fontSize: 14, lineHeight: 1.8, color: '#5E564D', maxWidth: 280, mt: 2 }}>
                Profesyonel tırnak ürünleri. Eğitim kitleri, freze ekipmanları ve manikür malzemeleri.
              </Typography>
            </Box>
            <Stack direction="row" spacing={1}>
              {[<InstagramIcon />, <YouTubeIcon />, <FacebookIcon />].map((icon, i) => (
                <IconButton key={i} href="#" sx={{ color: '#5E564D', border: '1px solid rgba(94,86,77,0.3)', '&:hover': { color: '#A9876D', borderColor: '#A9876D' }, width: 38, height: 38 }}>{icon}</IconButton>
              ))}
            </Stack>
          </Grid>
          {[{ title: 'Mağaza', links: [{ label: 'Tüm Ürünler', href: '/magaza' }, { label: 'Eğitim Kitleri', href: '/magaza' }, { label: 'Ekipmanlar', href: '/magaza' }, { label: 'Malzemeler', href: '/magaza' }] },
            { title: 'Yardım', links: [{ label: 'Sipariş Takip', href: '/siparis-takip' }, { label: 'SSS', href: '/iletisim#sss' }, { label: 'İade & Değişim', href: '/iletisim#iade' }, { label: 'İletişim', href: '/iletisim' }] }].map(col => (
            <Grid size={{ xs: 6, md: 2 }} key={col.title}>
              <Typography sx={{ fontWeight: 700, color: '#F9F1EC', mb: 3, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase' }}>{col.title}</Typography>
              <Stack spacing={1.5}>
                {col.links.map(link => (
                  <Link key={link.href} to={link.href}><Typography sx={{ fontSize: 14, color: '#5E564D', '&:hover': { color: '#A9876D' }, transition: 'color 0.2s' }}>{link.label}</Typography></Link>
                ))}
              </Stack>
            </Grid>
          ))}
          <Grid size={{ xs: 6, md: 2 }}>
            <Typography sx={{ fontWeight: 700, color: '#F9F1EC', mb: 3, fontSize: 12, letterSpacing: 2, textTransform: 'uppercase' }}>Yasal</Typography>
            <Stack spacing={1.5}>
              {[{ label: 'Gizlilik', href: '/iletisim#gizlilik' }, { label: 'Koşullar', href: '/iletisim#kosullar' }, { label: 'KVKK', href: '/iletisim#kvkk' }, { label: 'Çerezler', href: '/iletisim#cerez' }].map(link => (
                <Link key={link.href} to={link.href}><Typography sx={{ fontSize: 14, color: '#5E564D', '&:hover': { color: '#A9876D' } }}>{link.label}</Typography></Link>
              ))}
            </Stack>
          </Grid>
        </Grid>
        <Divider sx={{ borderColor: 'rgba(94,86,77,0.2)', mb: 4 }} />
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography sx={{ fontSize: 13, color: '#5E564D' }}>© 2026 Naillabs. Tüm hakları saklıdır.</Typography>
          <Stack direction="row" spacing={1.5}>
            {['VISA', 'MASTERCARD', 'TROY', 'IYZICO'].map(m => (
              <Box key={m} sx={{ px: 2, py: 0.5, border: '1px solid rgba(94,86,77,0.3)', borderRadius: 1, bgcolor: 'rgba(255,255,255,0.03)' }}>
                <Typography sx={{ fontSize: 10, color: '#5E564D', fontWeight: 700, letterSpacing: 1 }}>{m}</Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
