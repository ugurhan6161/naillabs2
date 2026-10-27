import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Container, Grid, Paper, Button, Divider, CircularProgress, TextField
} from '@mui/material';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import type { Order } from '../lib/supabase';

export default function AccountPage() {
  const { user, profile, signOut, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({ full_name: profile?.full_name || '', phone: profile?.phone || '' });

  useEffect(() => {
    if (!user) { navigate('/giris'); return; }
    supabase.from('orders').select('*, order_items(*)').eq('user_id', user.id).order('created_at', { ascending: false }).then(({ data }) => {
      setOrders(data || []);
      setLoading(false);
    });
  }, [user, navigate]);

  useEffect(() => {
    setEditForm({ full_name: profile?.full_name || '', phone: profile?.phone || '' });
  }, [profile]);

  if (!user) return null;

  const handleSignOut = async () => { await signOut(); navigate('/'); };

  const saveProfile = async () => {
    await supabase.from('profiles').update({ full_name: editForm.full_name, phone: editForm.phone }).eq('id', user.id);
    await refreshProfile();
    setEditMode(false);
  };

  return (
    <Box sx={{ bgcolor: '#FFFFFF', minHeight: '80vh', py: 5 }}>
      <Container maxWidth="lg">
        <Typography sx={{ fontFamily: 'Jost, Arial, sans-serif', fontSize: { xs: 24, md: 34 }, fontWeight: 700, color: '#000000', mb: 4 }}>
          Hesabım
        </Typography>

        <Grid container spacing={4}>
          {/* Sidebar */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Paper sx={{ p: 2, borderRadius: 3, border: '1px solid rgba(201,149,106,0.15)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Box sx={{ width: 44, height: 44, borderRadius: '50%', bgcolor: '#A9876D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography sx={{ color: 'white', fontWeight: 700 }}>{profile?.full_name?.[0] || user.email?.[0]?.toUpperCase()}</Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: 14, color: '#000000' }}>{profile?.full_name || 'Kullanıcı'}</Typography>
                  <Typography sx={{ fontSize: 12, color: '#5E564D', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 140 }}>{user.email}</Typography>
                </Box>
              </Box>
              <Divider sx={{ mb: 1 }} />
              {[
                { icon: <PersonOutlineIcon sx={{ fontSize: 18 }} />, label: 'Profil Bilgileri', active: true },
                { icon: <ReceiptLongOutlinedIcon sx={{ fontSize: 18 }} />, label: 'Siparişlerim', href: '/siparislerim' },
                { icon: <LocationOnOutlinedIcon sx={{ fontSize: 18 }} />, label: 'Adreslerim' },
              ].map((item, i) => (
                <Button key={i} fullWidth component={item.href ? Link : 'button'} to={item.href}
                  sx={{ justifyContent: 'flex-start', color: item.active ? '#000000' : '#000000', fontWeight: item.active ? 700 : 500, fontSize: 13, py: 1, '&:hover': { bgcolor: '#F5F0EB' } }}>
                  {item.icon}<Box sx={{ ml: 1.5 }}>{item.label}</Box>
                </Button>
              ))}
              <Divider sx={{ my: 1 }} />
              <Button fullWidth onClick={handleSignOut} sx={{ justifyContent: 'flex-start', color: '#D64545', fontSize: 13, py: 1 }}>
                <LogoutIcon sx={{ fontSize: 18 }} /><Box sx={{ ml: 1.5 }}>Çıkış Yap</Box>
              </Button>
            </Paper>
          </Grid>

          {/* Content */}
          <Grid size={{ xs: 12, md: 9 }}>
            {/* Profile */}
            <Paper sx={{ p: 3, mb: 3, borderRadius: 3, border: '1px solid rgba(201,149,106,0.15)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography sx={{ fontFamily: 'Jost, Arial, sans-serif', fontSize: 20, fontWeight: 700, color: '#000000' }}>
                  Profil Bilgileri
                </Typography>
                {!editMode && (
                  <Button onClick={() => setEditMode(true)} size="small" sx={{ color: '#A9876D', fontSize: 13 }}>Düzenle</Button>
                )}
              </Box>
              {editMode ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
                  <TextField label="Ad Soyad" size="small" fullWidth value={editForm.full_name}
                    onChange={e => setEditForm({ ...editForm, full_name: e.target.value })} />
                  <TextField label="Telefon" size="small" fullWidth value={editForm.phone}
                    onChange={e => setEditForm({ ...editForm, phone: e.target.value })} />
                  <Box sx={{ display: 'flex', gap: 1.5 }}>
                    <Button variant="contained" size="small" onClick={saveProfile} sx={{ bgcolor: '#000000', '&:hover': { bgcolor: '#A9876D' } }}>Kaydet</Button>
                    <Button onClick={() => setEditMode(false)} size="small" sx={{ color: '#5E564D' }}>İptal</Button>
                  </Box>
                </Box>
              ) : (
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography sx={{ fontSize: 11, color: '#5E564D', textTransform: 'uppercase', letterSpacing: 1, mb: 0.5 }}>Ad Soyad</Typography>
                    <Typography sx={{ fontSize: 14, color: '#000000', fontWeight: 600 }}>{profile?.full_name || 'Belirtilmedi'}</Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography sx={{ fontSize: 11, color: '#5E564D', textTransform: 'uppercase', letterSpacing: 1, mb: 0.5 }}>E-posta</Typography>
                    <Typography sx={{ fontSize: 14, color: '#000000', fontWeight: 600 }}>{user.email}</Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography sx={{ fontSize: 11, color: '#5E564D', textTransform: 'uppercase', letterSpacing: 1, mb: 0.5 }}>Telefon</Typography>
                    <Typography sx={{ fontSize: 14, color: '#000000', fontWeight: 600 }}>{profile?.phone || 'Belirtilmedi'}</Typography>
                  </Grid>
                </Grid>
              )}
            </Paper>

            {/* Recent Orders */}
            <Paper sx={{ p: 3, borderRadius: 3, border: '1px solid rgba(201,149,106,0.15)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography sx={{ fontFamily: 'Jost, Arial, sans-serif', fontSize: 20, fontWeight: 700, color: '#000000' }}>
                  Son Siparişlerim
                </Typography>
                <Button component={Link} to="/siparislerim" size="small" sx={{ color: '#A9876D', fontSize: 13 }}>Tümünü Gör</Button>
              </Box>

              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress sx={{ color: '#A9876D' }} /></Box>
              ) : orders.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 5 }}>
                  <Typography sx={{ fontSize: 36, mb: 1 }}>📦</Typography>
                  <Typography sx={{ color: '#5E564D', mb: 2 }}>Henüz siparişiniz yok.</Typography>
                  <Button component={Link} to="/magaza" variant="contained" sx={{ bgcolor: '#000000', '&:hover': { bgcolor: '#A9876D' } }}>Alışverişe Başla</Button>
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {orders.slice(0, 3).map(o => (
                    <Box key={o.id} sx={{ p: 2, bgcolor: '#FFFFFF', borderRadius: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                        <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#000000' }}>{o.order_number}</Typography>
                        <Typography sx={{ fontSize: 12, color: statusColor(o.status), fontWeight: 600 }}>{o.status}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ fontSize: 12, color: '#5E564D' }}>{new Date(o.created_at).toLocaleDateString('tr-TR')} · {o.order_items?.length || 0} ürün</Typography>
                        <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#000000' }}>{o.total.toLocaleString('tr-TR')} ₺</Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function statusColor(status: string) {
  const colors: Record<string, string> = {
    'onaylandı': '#3DA56F', 'kargoda': '#3A7BD5', 'teslim edildi': '#3DA56F',
    'iptal': '#D64545', 'beklemede': '#B8924A', 'hazırlanıyor': '#A9876D',
  };
  return colors[status] || '#5E564D';
}
