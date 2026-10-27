import { useState } from 'react';
import {
  Box, Typography, Container, Grid, Paper, TextField, Button, Alert,
  Accordion, AccordionSummary, AccordionDetails, Snackbar
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { supabase } from '../lib/supabase';

const faqs = [
  { q: 'Siparişim ne zaman ulaşır?', a: 'Standart teslimat 2-4 iş günü içinde gerçekleşir. Express teslimat seçeneği ile 1-2 iş gününde teslim alabilirsiniz.' },
  { q: 'Ürünleri iade edebilir miyim?', a: 'Ürün tesliminden itibaren 14 gün içinde, kullanılmamış ve orijinal ambalajında olmak şartıyla iade edebilirsiniz.' },
  { q: 'Kargo ücreti ne kadar?', a: '1.500 TL ve üzeri siparişlerde kargo ücretsizdir. Altındaki siparişlerde 89 TL kargo ücreti uygulanır.' },
  { q: 'Eğitim kitini kimler kullanabilir?', a: 'Özellikle tırnak eğitmenleri ve profesyonel manikür uygulayıcıları için tasarlanmıştır.' },
  { q: 'Hangi ödeme yöntemleri geçerli?', a: 'Kredi/Banka Kartı, Havale/EFT ve Kapıda Ödeme seçenekleri ile ödeme yapabilirsiniz.' },
  { q: 'Misafir olarak sipariş verebilir miyim?', a: 'Evet, üye olmadan da misafir olarak sipariş verebilirsiniz. Sipariş numaranızla takip edebilirsiniz.' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    await supabase.from('notifications').insert({ title: form.subject || 'İletişim Formu', message: `${form.name} (${form.email}): ${form.message}`, type: 'sistem' });
    setLoading(false);
    setSuccess(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <Box sx={{ bgcolor: '#F9F1EC', minHeight: '80vh', py: 5 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="overline" sx={{ color: '#60432E', mb: 1, display: 'block' }}>
            İletişim
          </Typography>
          <Typography variant="h1" sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' }, color: '#000000' }}>
            Bizimle iletişime geçin
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Contact Info */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
              {[
                { icon: <PhoneOutlinedIcon />, label: 'Telefon', value: '+90 850 000 00 00', sub: 'Hafta içi 09:00 - 18:00' },
                { icon: <EmailOutlinedIcon />, label: 'E-posta', value: 'destek@nailab.com', sub: '24 saat içinde yanıt' },
                { icon: <LocationOnOutlinedIcon />, label: 'Adres', value: 'Levent, İstanbul', sub: 'Naillabs' },
              ].map((item, i) => (
                <Paper key={i} sx={{ p: 2.5, borderRadius: 3, border: '1px solid rgba(201,149,106,0.15)', display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ width: 44, height: 44, borderRadius: '50%', bgcolor: '#EED2BC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A9876D', flexShrink: 0 }}>
                    {item.icon}
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: 11, color: '#5E564D', textTransform: 'uppercase', letterSpacing: 1 }}>{item.label}</Typography>
                    <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#000000' }}>{item.value}</Typography>
                    <Typography sx={{ fontSize: 12, color: '#5E564D' }}>{item.sub}</Typography>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Grid>

          {/* Contact Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper sx={{ p: { xs: 3, md: 4 }, borderRadius: 3, border: '1px solid #DBCEC2' }}>
              <Typography variant="h3" sx={{ fontSize: '1.3rem', color: '#000000', mb: 3 }}>
                Mesaj gönderin
              </Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Ad Soyad" size="small" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="E-posta" size="small" required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField fullWidth label="Konu" size="small" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField fullWidth label="Mesajınız" size="small" required multiline rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
                </Grid>
              </Grid>
              <Button variant="contained" size="large" onClick={handleSubmit} disabled={loading}
                sx={{ mt: 2, bgcolor: '#000000', color: '#F9F1EC', px: 5, borderRadius: 999, '&:hover': { bgcolor: '#8B6950' } }}>
                {loading ? 'Gönderiliyor...' : 'Mesaj gönder'}
              </Button>
            </Paper>
          </Grid>
        </Grid>

        {/* FAQ */}
        <Box id="sss" sx={{ mt: 8 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, color: '#000000', mb: 4, textAlign: 'center' }}>
            Sık sorulan sorular
          </Typography>
          <Box sx={{ maxWidth: 800, mx: 'auto' }}>
            {faqs.map((faq, i) => (
              <Accordion key={i} sx={{ mb: 1.5, borderRadius: '8px !important', border: '1px solid #DBCEC2', '&:before': { display: 'none' }, overflow: 'hidden' }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#A9876D' }} />}>
                  <Typography sx={{ fontWeight: 500, fontSize: 15, color: '#000000' }}>{faq.q}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography sx={{ fontSize: 14, color: '#5E564D', lineHeight: 1.8 }}>{faq.a}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Box>

        {/* Legal sections */}
        <Box sx={{ mt: 8 }}>
          <Grid container spacing={3}>
            {[
              { id: 'iade', title: 'İade & Değişim', content: 'Ürün tesliminden itibaren 14 gün içinde iade hakkınız bulunmaktadır. Kullanılmamış, orijinal ambalajında bulunan ürünler tam iade kapsamındadır. İade kargo ücreti alıcına aittir.' },
              { id: 'gizlilik', title: 'Gizlilik Politikası', content: 'Kişisel verileriniz KVKK kapsamında korunmaktadır. Verileriniz üçüncü taraflarla paylaşılmaz ve yalnızca sipariş işlemleri için kullanılır.' },
              { id: 'kosullar', title: 'Kullanım Koşulları', content: 'Bu web sitesini kullanarak, hizmet şartlarımızı kabul etmiş olursunuz. Haksız kullanım durumunda erişiminiz engellenebilir.' },
              { id: 'kvkk', title: 'KVKK Aydınlatma Metni', content: '6698 sayılı KVKK kapsamında, kişisel verilerinizin işlenmesi hakkında aydınlatma yükümlülüğümüzü yerine getiriyoruz. Verileriniz güvenli sistemlerde saklanır.' },
            ].map(sec => (
              <Grid size={{ xs: 12, md: 6 }} key={sec.id} id={sec.id}>
                <Paper sx={{ p: 3, borderRadius: 2, border: '1px solid #DBCEC2' }}>
                  <Typography variant="h3" sx={{ fontSize: '1.1rem', color: '#000000', mb: 1.5 }}>
                    {sec.title}
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: '#5E564D', lineHeight: 1.8 }}>
                    {sec.content}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      <Snackbar open={success} autoHideDuration={3000} onClose={() => setSuccess(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" sx={{ bgcolor: '#000000', color: '#F9F1EC', '& .MuiAlert-icon': { color: '#A9876D' } }}>
          Mesajınız alındı. En kısa sürede dönüş yapacağız.
        </Alert>
      </Snackbar>
    </Box>
  );
}
