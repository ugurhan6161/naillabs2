import { Link, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Button, TextField, Alert, CircularProgress, Container
} from '@mui/material';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function TrainerPortalLoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async () => {
    setError(null);
    if (!form.email || !form.password) { setError('Lütfen tüm alanları doldurun.'); return; }
    setLoading(true);
    const result = await signIn(form.email, form.password);
    setLoading(false);
    if (result.error) { setError(result.error); return; }
    navigate('/egitmen-portal');
  };

  return (
    <Box sx={{
      minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      bgcolor: '#FFFFFF', py: 5,
    }}>
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ width: 64, height: 64, borderRadius: '50%', bgcolor: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
            <SchoolOutlinedIcon sx={{ fontSize: 32, color: '#A9876D' }} />
          </Box>
          <Typography sx={{ fontFamily: 'Jost, Arial, sans-serif', fontSize: 28, fontWeight: 700, color: '#000000' }}>
            Eğitmen Portalı
          </Typography>
          <Typography sx={{ fontSize: 14, color: '#5E564D', mt: 1 }}>
            Eğitmen hesabınızla giriş yapın
          </Typography>
        </Box>

        <Box sx={{ bgcolor: 'white', borderRadius: 4, p: { xs: 3, md: 4 }, border: '1px solid rgba(201,149,106,0.2)' }}>
          {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField fullWidth label="E-posta" size="medium" type="email" required
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            <TextField fullWidth label="Şifre" size="medium" type="password" required
              value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
          </Box>
          <Button fullWidth variant="contained" size="large" disabled={loading} onClick={handleSubmit}
            sx={{ mt: 3, bgcolor: '#000000', color: 'white', py: 1.75, fontWeight: 600, borderRadius: 2, '&:hover': { bgcolor: '#A9876D' } }}>
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Giriş Yap'}
          </Button>
        </Box>

        <Typography sx={{ textAlign: 'center', mt: 3, fontSize: 12, color: '#5E564D' }}>
          Eğitmen değil misiniz? <Link to="/giris" style={{ color: '#A9876D' }}>Müşteri girişi</Link>
        </Typography>
      </Container>
    </Box>
  );
}
