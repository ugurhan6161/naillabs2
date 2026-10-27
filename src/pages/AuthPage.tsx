import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Container, Button, TextField, Alert, CircularProgress, Divider
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

export default function AuthPage() {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ email: '', password: '', fullName: '' });

  const handleSubmit = async () => {
    setError(null);
    if (!form.email || !form.password) { setError('E-posta ve şifre gerekli.'); return; }
    if (mode === 'register' && !form.fullName) { setError('Ad Soyad gerekli.'); return; }
    setLoading(true);
    const result = mode === 'login'
      ? await signIn(form.email, form.password)
      : await signUp(form.email, form.password, form.fullName);
    setLoading(false);
    if (result.error) { setError(result.error); return; }
    navigate('/');
  };

  return (
    <Box sx={{
      minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      bgcolor: '#FFFFFF', py: 5, mt: 8,
    }}>
      <Container maxWidth="sm">
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, mb: 3 }}>
            <Box sx={{
              width: 48, height: 48,
              background: 'linear-gradient(135deg, #000000, #A9876D)',
              borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Typography sx={{ color: '#FFFFFF', fontSize: 18, fontWeight: 700, fontFamily: 'Jost, Arial, sans-serif' }}>NL</Typography>
            </Box>
          </Box>
          <Typography sx={{ fontFamily: 'Jost, Arial, sans-serif', fontSize: { xs: 26, md: 32 }, fontWeight: 700, color: '#000000' }}>
            {mode === 'login' ? 'Hoş Geldiniz' : 'Aramıza Katılın'}
          </Typography>
          <Typography sx={{ fontSize: 14, color: '#5E564D', mt: 1 }}>
            {mode === 'login' ? 'Hesabınıza giriş yapın' : 'Yeni hesap oluşturun'}
          </Typography>
        </Box>

        <Box sx={{
          bgcolor: 'white', borderRadius: 4, p: { xs: 3, md: 4 },
          border: '1px solid rgba(11,11,13,0.08)',
          boxShadow: '0 12px 40px rgba(11,11,13,0.08)',
        }}>
          {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {mode === 'register' && (
              <TextField fullWidth label="Ad Soyad" size="medium" required
                value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })}
                sx={inputSx} />
            )}
            <TextField fullWidth label="E-posta" size="medium" required type="email"
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              sx={inputSx} />
            <TextField fullWidth label="Şifre" size="medium" required type="password"
              value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
              sx={inputSx}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()} />
          </Box>

          <Button fullWidth variant="contained" size="large" disabled={loading} onClick={handleSubmit}
            sx={{ mt: 3, bgcolor: '#000000', color: 'white', py: 1.75, fontWeight: 600, fontSize: 15, borderRadius: 50, '&:hover': { bgcolor: '#A9876D' } }}>
            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : (mode === 'login' ? 'Giriş Yap' : 'Hesap Oluştur')}
          </Button>

          <Divider sx={{ my: 3 }}>
            <Typography sx={{ fontSize: 12, color: '#5E564D' }}>veya</Typography>
          </Divider>

          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ fontSize: 14, color: '#000000', display: 'inline' }}>
              {mode === 'login' ? 'Hesabınız yok mu? ' : 'Zaten hesabınız var mı? '}
            </Typography>
            <Link to="#" onClick={(e) => { e.preventDefault(); setMode(mode === 'login' ? 'register' : 'login'); setError(null); }}>
              <Typography component="span" sx={{ fontSize: 14, color: '#A9876D', fontWeight: 600 }}>
                {mode === 'login' ? 'Kayıt Olun' : 'Giriş Yapın'}
              </Typography>
            </Link>
          </Box>
        </Box>

        <Typography sx={{ textAlign: 'center', mt: 3, fontSize: 12, color: '#5E564D' }}>
          Misafir olarak alışveriş yapmak istiyorsanız <Link to="/magaza" style={{ color: '#A9876D' }}>mağazaya</Link> gidebilirsiniz.
        </Typography>
      </Container>
    </Box>
  );
}

const inputSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 2,
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#A9876D' },
  },
  '& .MuiInputLabel-root.Mui-focused': { color: '#A9876D' },
};
