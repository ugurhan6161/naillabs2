import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Alert, Box, Button, Container, Divider, Grid, Paper, TextField, Typography
} from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

const WHATSAPP_NUMBER = '908500000000';

type CheckoutForm = {
  name: string; phone: string; address: string; city: string; district: string; notes: string;
};

export default function CheckoutPage() {
  const { items, subtotal, shippingCost, total, clearCart } = useCart();
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<CheckoutForm>({
    name: profile?.full_name || '', phone: profile?.phone || '',
    address: '', city: '', district: '', notes: '',
  });

  if (items.length === 0) { navigate('/sepet'); return null; }

  const updateField = (field: keyof CheckoutForm, value: string) => setForm((c) => ({ ...c, [field]: value }));

  const handleCheckout = async () => {
    setError(null);
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim() || !form.city.trim()) {
      setError('Lütfen ad, telefon, adres ve şehir alanlarını doldurun.'); return;
    }
    setLoading(true);
    const { data: order, error: orderError } = await supabase.from('orders').insert({
      user_id: user?.id || null, guest_email: user?.email || null,
      guest_name: form.name.trim(), guest_phone: form.phone.trim(),
      status: 'beklemede', subtotal, shipping_cost: shippingCost, total,
      shipping_address: { address: form.address.trim(), city: form.city.trim(), district: form.district.trim() },
      payment_method: 'whatsapp', notes: form.notes.trim() || null,
    }).select().maybeSingle();

    if (orderError || !order) { setError('Sipariş oluşturulamadı. Lütfen tekrar deneyin.'); setLoading(false); return; }

    const { error: itemsError } = await supabase.from('order_items').insert(
      items.map((item) => ({
        order_id: order.id, product_id: item.product.id, product_name: item.product.name,
        product_image: item.product.image_url, quantity: item.quantity,
        unit_price: item.product.price, total_price: item.product.price * item.quantity,
      })),
    );
    if (itemsError) { setError('Sipariş ürünleri kaydedilemedi.'); setLoading(false); return; }

    const productLines = items.map((item) => `• ${item.product.name} x${item.quantity} — ${(item.product.price * item.quantity).toLocaleString('tr-TR')} ₺`).join('\n');
    const message = [
      'Merhaba Naillabs, yeni sipariş vermek istiyorum.', `Sipariş no: ${order.order_number}`, '',
      productLines, '', `Toplam: ${total.toLocaleString('tr-TR')} ₺`,
      `Ad Soyad: ${form.name.trim()}`, `Telefon: ${form.phone.trim()}`,
      `Adres: ${form.address.trim()}, ${form.district.trim()}, ${form.city.trim()}`,
      form.notes.trim() ? `Not: ${form.notes.trim()}` : '',
    ].filter(Boolean).join('\n');

    clearCart();
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    navigate(`/siparis-tamamlandi/${order.order_number}`);
  };

  return (
    <Box sx={{ bgcolor: '#FFFFFF', minHeight: '80vh', py: { xs: 3, md: 6 }, mt: 8 }}>
      <Container maxWidth="lg">
        <Button component={Link} to="/sepet" startIcon={<ArrowBackIcon />}
          sx={{ color: '#5E564D', mb: 2, '&:hover': { bgcolor: 'transparent', color: '#000000' } }}>
          Sepete dön
        </Button>
        <Typography sx={{ fontFamily: 'Jost, Arial, sans-serif', fontSize: { xs: 28, md: 40 }, fontWeight: 700, color: '#000000', mb: 1 }}>
          Siparişi Tamamla
        </Typography>
        <Typography sx={{ color: '#5E564D', mb: 4, fontSize: 15 }}>
          Bilgilerinizi bırakın, sipariş detayınızı WhatsApp üzerinden birlikte netleştirelim.
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}

        <Grid container spacing={3} alignItems="flex-start">
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper sx={{ p: { xs: 2.5, sm: 4 }, borderRadius: 3, border: '1px solid rgba(11,11,13,0.08)' }}>
              <Typography sx={{ fontFamily: 'Jost, Arial, sans-serif', fontSize: 20, fontWeight: 700, color: '#000000', mb: 3 }}>
                Teslimat Bilgileri
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Ad Soyad" value={form.name} onChange={(e) => updateField('name', e.target.value)} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Telefon" value={form.phone} onChange={(e) => updateField('phone', e.target.value)} />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField fullWidth label="Açık Adres" multiline minRows={3} value={form.address} onChange={(e) => updateField('address', e.target.value)} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="İl" value={form.city} onChange={(e) => updateField('city', e.target.value)} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="İlçe" value={form.district} onChange={(e) => updateField('district', e.target.value)} />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField fullWidth label="Sipariş notu (opsiyonel)" multiline minRows={2} value={form.notes} onChange={(e) => updateField('notes', e.target.value)} />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Paper sx={{ p: { xs: 2.5, sm: 4 }, position: { md: 'sticky' }, top: 96, borderRadius: 3, border: '1px solid rgba(11,11,13,0.08)' }}>
              <Typography sx={{ fontFamily: 'Jost, Arial, sans-serif', fontSize: 20, fontWeight: 700, color: '#000000', mb: 2.5 }}>
                Sipariş Özeti
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 2.5 }}>
                {items.map((item) => (
                  <Box key={item.product.id} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                    <Typography sx={{ fontSize: 14, color: '#000000' }}>{item.product.name} × {item.quantity}</Typography>
                    <Typography sx={{ fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap' }}>{(item.product.price * item.quantity).toLocaleString('tr-TR')} ₺</Typography>
                  </Box>
                ))}
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ fontSize: 14, color: '#5E564D' }}>Ara toplam</Typography>
                <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{subtotal.toLocaleString('tr-TR')} ₺</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography sx={{ fontSize: 14, color: '#5E564D' }}>Kargo</Typography>
                <Typography sx={{ fontSize: 14, fontWeight: 600, color: shippingCost === 0 ? '#3DA56F' : 'inherit' }}>
                  {shippingCost === 0 ? 'Ücretsiz' : `${shippingCost.toLocaleString('tr-TR')} ₺`}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography sx={{ fontFamily: 'Jost, Arial, sans-serif', fontSize: 18, fontWeight: 700, color: '#000000' }}>Toplam</Typography>
                <Typography sx={{ fontFamily: 'Jost, Arial, sans-serif', fontSize: 22, fontWeight: 700, color: '#000000' }}>{total.toLocaleString('tr-TR')} ₺</Typography>
              </Box>
              <Button fullWidth size="large" variant="contained" disabled={loading} startIcon={<WhatsAppIcon />} onClick={handleCheckout}
                sx={{ py: 1.75, bgcolor: '#000000', color: 'white', borderRadius: 50, fontWeight: 700, '&:hover': { bgcolor: '#A9876D' }, '&.Mui-disabled': { bgcolor: 'rgba(11,11,13,0.1)' } }}>
                {loading ? 'Sipariş hazırlanıyor...' : 'WhatsApp ile sipariş ver'}
              </Button>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.75, mt: 2 }}>
                <LockOutlinedIcon sx={{ fontSize: 15, color: '#5E564D' }} />
                <Typography sx={{ fontSize: 12, color: '#5E564D' }}>Bilgileriniz güvende</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
