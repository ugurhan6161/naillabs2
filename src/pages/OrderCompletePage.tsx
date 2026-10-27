import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Box, Typography, Container, Button, CircularProgress, Paper, Divider
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { supabase } from '../lib/supabase';

export default function OrderCompletePage() {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderNumber) return;
    supabase.rpc('get_public_order', { p_order_number: orderNumber }).then(({ data }) => {
      setOrder(data);
      setLoading(false);
    });
  }, [orderNumber]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 16, bgcolor: '#FFFFFF', minHeight: '80vh' }}>
        <CircularProgress sx={{ color: '#A9876D' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: '#FFFFFF', minHeight: '90vh', py: { xs: 6, md: 10 } }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Box sx={{
            width: 100, height: 100, borderRadius: '50%', bgcolor: '#DCEFE4',
            display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3,
          }}>
            <CheckCircleIcon sx={{ fontSize: 56, color: '#3DA56F' }} />
          </Box>
          <Typography sx={{ fontFamily: 'Jost, Arial, sans-serif', fontSize: { xs: 26, md: 36 }, fontWeight: 700, color: '#000000', mb: 1.5 }}>
            Siparişiniz Alındı!
          </Typography>
          <Typography sx={{ fontSize: 15, color: '#5E564D', mb: 1 }}>
            Sipariş numaranız: <Box component="strong" sx={{ color: '#A9876D' }}>{orderNumber}</Box>
          </Typography>
          <Typography sx={{ fontSize: 14, color: '#000000' }}>
            Siparişiniz hakkında bilgilendirme e-posta ile gönderilecektir.
          </Typography>
        </Box>

        {order && (
          <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, border: '1px solid rgba(11,11,13,0.08)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Box>
                <Typography sx={{ fontSize: 11, color: '#5E564D', textTransform: 'uppercase', letterSpacing: 1 }}>Sipariş No</Typography>
                <Typography sx={{ fontWeight: 700, fontSize: 15, color: '#000000' }}>{order.order_number}</Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography sx={{ fontSize: 11, color: '#5E564D', textTransform: 'uppercase', letterSpacing: 1 }}>Durum</Typography>
                <Typography sx={{ fontWeight: 700, fontSize: 15, color: '#3DA56F' }}>Onaylandı</Typography>
              </Box>
            </Box>
            <Divider sx={{ mb: 3 }} />

            <Box sx={{ mb: 3 }}>
              <Typography sx={{ fontWeight: 700, fontSize: 14, color: '#000000', mb: 2 }}>Ürünler</Typography>
              {order.order_items?.map((item: any) => (
                <Box key={item.id} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
                  <Box component="img" src={item.product_image} alt={item.product_name}
                    sx={{ width: 56, height: 56, borderRadius: 1.5, objectFit: 'cover' }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: 13, color: '#000000', fontWeight: 600 }}>{item.product_name}</Typography>
                    <Typography sx={{ fontSize: 12, color: '#5E564D' }}>{item.quantity} x {item.unit_price.toLocaleString('tr-TR')} ₺</Typography>
                  </Box>
                  <Typography sx={{ fontWeight: 700, fontSize: 14, color: '#000000' }}>
                    {item.total_price.toLocaleString('tr-TR')} ₺
                  </Typography>
                </Box>
              ))}
            </Box>

            <Divider sx={{ mb: 3 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography sx={{ fontSize: 14, color: '#5E564D' }}>Ara Toplam</Typography>
              <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{order.subtotal.toLocaleString('tr-TR')} ₺</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography sx={{ fontSize: 14, color: '#5E564D' }}>Kargo</Typography>
              <Typography sx={{ fontSize: 14, fontWeight: 600, color: order.shipping_cost === 0 ? '#3DA56F' : 'inherit' }}>
                {order.shipping_cost === 0 ? 'Ücretsiz' : `${order.shipping_cost.toLocaleString('tr-TR')} ₺`}
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ fontFamily: 'Jost, Arial, sans-serif', fontSize: 18, fontWeight: 700, color: '#000000' }}>Toplam</Typography>
              <Typography sx={{ fontFamily: 'Jost, Arial, sans-serif', fontSize: 22, fontWeight: 700, color: '#000000' }}>
                {order.total.toLocaleString('tr-TR')} ₺
              </Typography>
            </Box>
          </Paper>
        )}

        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 5, flexWrap: 'wrap' }}>
          <Button component={Link} to="/magaza" variant="contained"
            sx={{ bgcolor: '#000000', color: 'white', px: 4, py: 1.5, borderRadius: 50, '&:hover': { bgcolor: '#A9876D' } }}>
            Alışverişe Devam Et
          </Button>
          <Button component={Link} to="/siparis-takip" variant="outlined"
            sx={{ borderColor: '#A9876D', color: '#A9876D', px: 4, py: 1.5, borderRadius: 50 }}>
            Siparişi Takip Et
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
