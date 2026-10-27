import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Container, Paper, Button, Divider, CircularProgress, Chip
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import type { Order } from '../lib/supabase';

export default function OrdersPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate('/giris'); return; }
    supabase.from('orders').select('*, order_items(*)').eq('user_id', user.id).order('created_at', { ascending: false }).then(({ data }) => {
      setOrders(data || []);
      setLoading(false);
    });
  }, [user, navigate]);

  if (!user) return null;

  return (
    <Box sx={{ bgcolor: '#FFFFFF', minHeight: '80vh', py: 5 }}>
      <Container maxWidth="lg">
        <Typography sx={{ fontFamily: 'Jost, Arial, sans-serif', fontSize: { xs: 24, md: 34 }, fontWeight: 700, color: '#000000', mb: 4 }}>
          Siparişlerim
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 12 }}><CircularProgress sx={{ color: '#A9876D' }} /></Box>
        ) : orders.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 12 }}>
            <Typography sx={{ fontSize: 48, mb: 2 }}>📦</Typography>
            <Typography sx={{ fontFamily: 'Jost, Arial, sans-serif', fontSize: 22, color: '#000000', mb: 1 }}>
              Henüz siparişiniz yok
            </Typography>
            <Typography sx={{ color: '#5E564D', mb: 3 }}>Mağazaya göz atarak ilk siparişinizi verebilirsiniz.</Typography>
            <Button component={Link} to="/magaza" variant="contained" sx={{ bgcolor: '#000000', color: 'white', px: 4, '&:hover': { bgcolor: '#A9876D' } }}>
              Mağazaya Git
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {orders.map(o => (
              <Paper key={o.id} sx={{ p: 3, borderRadius: 3, border: '1px solid rgba(201,149,106,0.15)' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: 15, color: '#000000' }}>{o.order_number}</Typography>
                    <Chip label={o.status} size="small" sx={{ bgcolor: statusBg(o.status), color: 'white', fontSize: 11, fontWeight: 600, height: 22 }} />
                  </Box>
                  <Typography sx={{ fontSize: 13, color: '#5E564D' }}>{new Date(o.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1, mb: 2 }}>
                  {o.order_items?.map((item: any) => (
                    <Box key={item.id} sx={{ display: 'flex', gap: 1, alignItems: 'center', minWidth: 180 }}>
                      <Box component="img" src={item.product_image} alt={item.product_name}
                        sx={{ width: 44, height: 44, borderRadius: 1, objectFit: 'cover', flexShrink: 0 }} />
                      <Box>
                        <Typography sx={{ fontSize: 12, color: '#000000', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 130 }}>
                          {item.product_name}
                        </Typography>
                        <Typography sx={{ fontSize: 11, color: '#5E564D' }}>{item.quantity} adet</Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>

                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography sx={{ fontSize: 11, color: '#5E564D' }}>{o.order_items?.length || 0} ürün · {o.payment_method === 'kredi_karti' ? 'Kredi Kartı' : o.payment_method === 'havale' ? 'Havale' : 'Kapıda Ödeme'}</Typography>
                  </Box>
                  <Typography sx={{ fontFamily: 'Jost, Arial, sans-serif', fontSize: 20, fontWeight: 700, color: '#000000' }}>
                    {o.total.toLocaleString('tr-TR')} ₺
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}

function statusBg(status: string) {
  const colors: Record<string, string> = {
    'onaylandı': '#3DA56F', 'kargoda': '#3A7BD5', 'teslim edildi': '#3DA56F',
    'iptal': '#D64545', 'beklemede': '#B8924A', 'hazırlanıyor': '#A9876D',
  };
  return colors[status] || '#5E564D';
}
