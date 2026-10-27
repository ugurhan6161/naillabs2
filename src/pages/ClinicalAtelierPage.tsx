import { Box, Typography, Container, Grid, Button, Card, Chip } from '@mui/material';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import BiotechOutlinedIcon from '@mui/icons-material/BiotechOutlined';

const features = [
  {
    icon: <ScienceOutlinedIcon sx={{ fontSize: 32 }} />,
    title: 'Anatomik Modeller',
    desc: 'Tıbbi kalitede silikon el ve tırnak modelleri. Detaylı damar, eklem ve kutikül yapısı.',
  },
  {
    icon: <BiotechOutlinedIcon sx={{ fontSize: 32 }} />,
    title: 'Klinik Ekipmanlar',
    desc: 'Profesyonel freze sistemleri ve hassas uygulama aletleri. Düşük titreşim, yüksek hassasiyet.',
  },
  {
    icon: <SchoolOutlinedIcon sx={{ fontSize: 32 }} />,
    title: 'Eğitim Materyalleri',
    desc: 'Akademiler için kapsamlı eğitim setleri. Adım adım uygulama rehberleri ile.',
  },
];

export default function ClinicalAtelierPage() {
  return (
    <Box sx={{ bgcolor: '#FFFFFF' }}>
      {/* Hero */}
      <Box sx={{
        background: 'linear-gradient(135deg, #000000 0%, #3D2A1A 50%, #6B4A35 100%)',
        py: { xs: 8, md: 14 }, position: 'relative', overflow: 'hidden',
      }}>
        <Box sx={{
          position: 'absolute', top: -80, right: -80,
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,149,106,0.15) 0%, transparent 70%)',
        }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Chip label="Klinik Atölye" sx={{ bgcolor: 'rgba(201,149,106,0.2)', color: '#EED2BC', mb: 2, border: '1px solid rgba(201,149,106,0.4)' }} />
              <Typography sx={{ fontFamily: 'Jost, Arial, sans-serif', fontSize: { xs: 30, md: 44 }, fontWeight: 700, color: '#FFFFFF', mb: 2, lineHeight: 1.2 }}>
                Tırnak Sanatının Bilimsel Yüzü
              </Typography>
              <Typography sx={{ fontSize: 16, color: '#5E564D', lineHeight: 1.8, mb: 4, maxWidth: 460 }}>
                Klinik atölyemiz, tırnak anatomisi ve patolojisi alanında eğitim ve uygulama malzemeleri üretir. 
                Profesyonellerin güvenle uygulama yapabilmesi için tıbbi standartlarda modeller geliştirir.
              </Typography>
              <Button variant="contained" size="large" href="/magaza"
                sx={{ bgcolor: '#A9876D', color: 'white', px: 5, py: 1.75, borderRadius: 2, '&:hover': { bgcolor: '#8B6950' } }}>
                Ürünleri İncele
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box component="img" src="https://images.pexels.com/photos/3997990/pexels-photo-3997990.jpeg"
                alt="Klinik Atölye" sx={{ width: '100%', height: 400, objectFit: 'cover', borderRadius: 4, boxShadow: '0 24px 80px rgba(0,0,0,0.4)' }} />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography sx={{ fontFamily: 'Jost, Arial, sans-serif', fontSize: { xs: 26, md: 36 }, fontWeight: 700, color: '#000000' }}>
            Neler Sunuyoruz?
          </Typography>
          <Typography sx={{ fontSize: 15, color: '#5E564D', mt: 1 }}>
            Profesyoneller için özel üretilen klinik kalite malzemeler
          </Typography>
        </Box>
        <Grid container spacing={4}>
          {features.map((f, i) => (
            <Grid size={{ xs: 12, md: 4 }} key={i}>
              <Card sx={{ height: '100%', borderRadius: 3, border: '1px solid rgba(201,149,106,0.15)', p: 3, textAlign: 'center' }}>
                <Box sx={{ width: 64, height: 64, borderRadius: '50%', bgcolor: '#EED2BC', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2, color: '#A9876D' }}>
                  {f.icon}
                </Box>
                <Typography sx={{ fontFamily: 'Jost, Arial, sans-serif', fontWeight: 700, fontSize: 18, color: '#000000', mb: 1.5 }}>
                  {f.title}
                </Typography>
                <Typography sx={{ fontSize: 14, color: '#000000', lineHeight: 1.7 }}>
                  {f.desc}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Stats */}
      <Box sx={{ bgcolor: '#000000', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {[
              { num: '15+', label: 'Yıllık Tecrübe' },
              { num: '500+', label: 'Akademi İşbirliği' },
              { num: '10K+', label: 'Mutlu Profesyonel' },
              { num: '%100', label: 'Memnuniyet Garantisi' },
            ].map(s => (
              <Grid size={{ xs: 6, md: 3 }} key={s.label}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography sx={{ fontFamily: 'Jost, Arial, sans-serif', fontSize: { xs: 28, md: 42 }, fontWeight: 700, color: '#A9876D' }}>{s.num}</Typography>
                  <Typography sx={{ fontSize: 13, color: '#5E564D', mt: 0.5 }}>{s.label}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* About */}
      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 }, textAlign: 'center' }}>
        <Typography sx={{ fontFamily: 'Jost, Arial, sans-serif', fontSize: { xs: 24, md: 32 }, fontWeight: 700, color: '#000000', mb: 3 }}>
          Hakkımızda
        </Typography>
        <Typography sx={{ fontSize: 15, color: '#000000', lineHeight: 2, mb: 4 }}>
          Naillabs, 2009 yılından beri profesyonel tırnak bakım ve sanat alanında 
          eğitim materyalleri üretmektedir. Misyonumuz, tırnak sağlığı ve estetiğini bir araya getirerek 
          profesyonellere en yüksek kalitede araçlar sunmaktır. Akademilerle yaptığımız işbirlikleriyle 
          eğitimde standartları yükseltiyor ve sektörün gelişimine katkıda bulunuyoruz.
        </Typography>
        <Button variant="outlined" href="/iletisim" sx={{ borderColor: '#A9876D', color: '#A9876D', px: 4, py: 1.5, borderRadius: 2 }}>
          Bizimle İletişime Geçin
        </Button>
      </Container>
    </Box>
  );
}
