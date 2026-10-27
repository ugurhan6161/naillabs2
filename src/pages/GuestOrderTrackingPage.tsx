import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Typography, Container, Button, TextField, Paper, Divider, Alert, CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { supabase } from '../lib/supabase';
import type { Order } from '../lib/supabase';

export default function GuestOrderTrackingPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setError(null);
    if (!orderNumber.trim()) { setError('Lütfen sipariş numaranızı girin.'); return; }
    setLoading(true);
    const { data, error: lookupError } = await supabase.rpc('get_public_order', { p_order_number: orderNumber.trim() });
    setLoading(false);
    if (lookupError || !data) { setError('Bu numaraya ait sipariş bulunamadı.'); setOrder(null); return; }
    setOrder(data as Order);
  };

  const statusSteps = ['beklemede', 'onaylandı', 'hazırlanıyor', 'kargoda', 'teslim edildi'];
  const currentStep = order ? statusSteps.indexOf(order.status) : -1;

  return (
    <Box sx={{ bgcolor: '#FFFFFF', minHeight: '80vh', py: 5 }}>
      <Container maxWidth="md">
        <Typography sx={{ fontFamily: 'Jost, Arial, sans-serif', fontSize: { xs: 24, md: 34 }, fontWeight: 700, color: '#000000', mb: 1 }}>
          Sipariş Takibi
        </Typography>
        <Typography sx={{ fontSize: 14, color: '#5E564D', mb: 4 }}>
          Sipariş numaranızla sipariş durumunuzu takip edin.
        </Typography>

        <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, border: '1px solid rgba(201,149,106,0.15)', mb: 4 }}>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <TextField fullWidth label="Sipariş Numarası" size="medium" placeholder="NL-XXXXXXXX"
              value={orderNumber} onChange={e => setOrderNumber(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 }, '& .Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#A9876D' } }} />
            <Button variant="contained" size="medium" onClick={handleSearch} disabled={loading}
              startIcon={loading ? <CircularProgress size={18} sx={{ color: 'white' }} /> : <SearchIcon />}
              sx={{ bgcolor: '#000000', color: 'white', px: 4, borderRadius: 2, whiteSpace: 'nowrap', '&:hover': { bgcolor: '#A9876D' } }}>
              Sorgula
            </Button>
          </Box>
          {error && <Alert severity="error" sx={{ mt: 2, borderRadius: 2 }}>{error}</Alert>}
        </Paper>

        {order && (
          <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, border: '1px solid rgba(201,149,106,0.15)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, flexWrap: 'wrap', gap: 1 }}>
              <Box>
                <Typography sx={{ fontSize: 11, color: '#5E564D', textTransform: 'uppercase', letterSpacing: 1 }}>Sipariş No</Typography>
                <Typography sx={{ fontWeight: 700, fontSize: 16, color: '#000000' }}>{order.order_number}</Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography sx={{ fontSize: 11, color: '#5E564D', textTransform: 'uppercase', letterSpacing: 1 }}>Toplam Tutar</Typography>
                <Typography sx={{ fontWeight: 700, fontSize: 16, color: '#000000' }}>{order.total.toLocaleString('tr-TR')} ₺</Typography>
              </Box>
            </Box>

            {/* Status timeline */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1, mb: 4 }}>
              {statusSteps.map((step, i) => (
                <Box key={step} sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{
                    width: 32, height: 32, borderRadius: '50%',
                    bgcolor: i <= currentStep ? '#A9876D' : '#F9F1EC',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Typography sx={{ fontSize: 12, color: i <= currentStep ? 'white' : '#5E564D', fontWeight: 700 }}>{i + 1}</Typography>
                  </Box>
                  <Typography sx={{ fontSize: 12, color: i <= currentStep ? '#000000' : '#5E564D', fontWeight: i === currentStep ? 700 : 500 }}>
                    {step.charAt(0).toUpperCase() + step.slice(1)}
                  </Typography>
                  {i < statusSteps.length - 1 && (
                    <Box sx={{ flex: 1, height: 2, bgcolor: i < currentStep ? '#A9876D' : '#F9F1EC', display: { xs: 'none', sm: 'block' } }} />
                  )}
                </Box>
              ))}
            </Box>

            <Divider sx={{ mb: 3 }} />

            {/* Items */}
            <Typography sx={{ fontWeight: 700, fontSize: 14, color: '#000000', mb: 2 }}>Sipariş İçeriği</Typography>
            {order.order_items?.map((item: any) => (
              <Box key={item.id} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
                <Box component="img" src={item.product_image} alt={item.product_name}
                  sx={{ width: 48, height: 48, borderRadius: 1.5, objectFit: 'cover' }} />
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontSize: 13, color: '#000000', fontWeight: 600 }}>{item.product_name}</Typography>
                  <Typography sx={{ fontSize: 12, color: '#5E564D' }}>{item.quantity} x {item.unit_price.toLocaleString('tr-TR')} ₺</Typography>
                </Box>
                <Typography sx={{ fontWeight: 700, fontSize: 13 }}>{item.total_price.toLocaleString('tr-TR')} ₺</Typography>
              </Box>
            ))}
          </Paper>
        )}

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography sx={{ fontSize: 13, color: '#5E564D' }}>
            Hesabınıza giriş yaparak tüm siparişlerinizi görüntüleyebilirsiniz.{' '}
            <Link to="/giris" style={{ color: '#A9876D', fontWeight: 600 }}>Giriş Yapın</Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
