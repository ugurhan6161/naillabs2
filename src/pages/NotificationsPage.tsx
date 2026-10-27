import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Container, Paper, Button, Chip, CircularProgress
} from '@mui/material';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import type { Notification } from '../lib/supabase';

export default function NotificationsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate('/giris'); return; }
    supabase.from('notifications').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).then(({ data }) => {
      setNotifications(data || []);
      setLoading(false);
    });
  }, [user, navigate]);

  if (!user) return null;

  const handleMarkRead = async (id: string) => {
    await supabase.from('notifications').update({ is_read: true }).eq('id', id);
    setNotifications(notifications.map(n => n.id === id ? { ...n, is_read: true } : n));
  };

  const handleMarkAllRead = async () => {
    await supabase.from('notifications').update({ is_read: true }).eq('user_id', user.id).eq('is_read', false);
    setNotifications(notifications.map(n => ({ ...n, is_read: true })));
  };

  const iconMap: Record<string, any> = {
    siparis: <NotificationsActiveOutlinedIcon sx={{ color: '#A9876D' }} />,
    kampanya: <CampaignOutlinedIcon sx={{ color: '#B8924A' }} />,
    sistem: <InfoOutlinedIcon sx={{ color: '#3A7BD5' }} />,
  };

  return (
    <Box sx={{ bgcolor: '#FFFFFF', minHeight: '80vh', py: 5 }}>
      <Container maxWidth="md">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography sx={{ fontFamily: 'Jost, Arial, sans-serif', fontSize: { xs: 24, md: 32 }, fontWeight: 700, color: '#000000' }}>
            Bildirimler
          </Typography>
          {notifications.some(n => !n.is_read) && (
            <Button onClick={handleMarkAllRead} size="small" sx={{ color: '#A9876D' }}>Tümünü Okundu İşaretle</Button>
          )}
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress sx={{ color: '#A9876D' }} /></Box>
        ) : notifications.length === 0 ? (
          <Paper sx={{ p: 6, textAlign: 'center', borderRadius: 3, border: '1px solid rgba(201,149,106,0.15)' }}>
            <Typography sx={{ fontSize: 40, mb: 1 }}>🔔</Typography>
            <Typography sx={{ color: '#5E564D' }}>Henüz bildiriminiz yok.</Typography>
          </Paper>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {notifications.map(n => (
              <Paper key={n.id} sx={{
                p: 2.5, borderRadius: 3,
                border: '1px solid rgba(201,149,106,0.15)',
                bgcolor: n.is_read ? 'white' : '#F5F0EB',
                cursor: 'pointer',
                '&:hover': { boxShadow: '0 4px 20px rgba(44,24,16,0.06)' },
              }}
                onClick={() => !n.is_read && handleMarkRead(n.id)}
              >
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <Box sx={{ width: 40, height: 40, borderRadius: '50%', bgcolor: '#FAF0EA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {iconMap[n.type] || iconMap.sistem}
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                      <Typography sx={{ fontWeight: 700, fontSize: 14, color: '#000000' }}>{n.title}</Typography>
                      {!n.is_read && <Chip label="Yeni" size="small" sx={{ bgcolor: '#A9876D', color: 'white', fontSize: 10, height: 18 }} />}
                    </Box>
                    <Typography sx={{ fontSize: 13, color: '#000000', lineHeight: 1.6 }}>{n.message}</Typography>
                    <Typography sx={{ fontSize: 11, color: '#5E564D', mt: 0.5 }}>
                      {new Date(n.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}
