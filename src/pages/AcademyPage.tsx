import { useState, useEffect } from 'react';
import {
  Box, Typography, Container, Grid, Button, Card, CardContent, Chip
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { supabase } from '../lib/supabase';
import type { AcademyCourse } from '../lib/supabase';

const instructors = [
  { name: 'Dr. Ayşe Kaya', title: 'Tırnak Anatomisi Uzmanı', img: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg' },
  { name: 'Uzm. Fatma Demir', title: 'Jel & Akrilik Master', img: 'https://images.pexels.com/photos/5214958/pexels-photo-5214958.jpeg' },
  { name: 'Selin Arslan', title: 'Nail Art Tasarımcısı', img: 'https://images.pexels.com/photos/5214996/pexels-photo-5214996.jpeg' },
  { name: 'Dr. Mehmet Yılmaz', title: 'Klinik Tırnak Uzmanı', img: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg' },
];

export default function AcademyPage() {
  const [courses, setCourses] = useState<AcademyCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('academy_courses').select('*').eq('is_active', true).order('created_at', { ascending: false }).then(({ data }) => {
      setCourses(data || []);
      setLoading(false);
    });
  }, []);

  return (
    <Box sx={{ bgcolor: '#FFFFFF' }}>
      {/* Hero */}
      <Box sx={{
        background: 'linear-gradient(135deg, #000000 0%, #4A2A1C 60%, #A9876D 100%)',
        py: { xs: 8, md: 12 }, textAlign: 'center',
      }}>
        <Container maxWidth="md">
          <Chip label="Naillabs" sx={{ bgcolor: 'rgba(201,149,106,0.2)', color: '#EED2BC', mb: 2, border: '1px solid rgba(201,149,106,0.4)' }} />
          <Typography sx={{ fontFamily: 'Jost, Arial, sans-serif', fontSize: { xs: 32, md: 48 }, fontWeight: 700, color: '#FFFFFF', mb: 2, lineHeight: 1.2 }}>
            Profesyonel Tırnak Eğitimleri
          </Typography>
          <Typography sx={{ fontSize: 16, color: '#5E564D', maxWidth: 520, mx: 'auto', lineHeight: 1.8 }}>
            Uzman eğitmenlerle sertifikalı kurslar. Kariyerinizi bir üst seviyeye taşıyın.
          </Typography>
        </Container>
      </Box>

      {/* Courses */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography sx={{ fontSize: 12, color: '#A9876D', fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', mb: 1 }}>
            Kurs Programları
          </Typography>
          <Typography sx={{ fontFamily: 'Jost, Arial, sans-serif', fontSize: { xs: 26, md: 36 }, fontWeight: 700, color: '#000000' }}>
            Eğitimlerimiz
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {loading ? (
            <Box sx={{ width: '100%', textAlign: 'center', py: 8 }}><Typography color="#5E564D">Yükleniyor...</Typography></Box>
          ) : (
            courses.map(course => (
              <Grid size={{ xs: 12, md: 6 }} key={course.id}>
                <Card sx={{
                  display: 'flex', flexDirection: { xs: 'column', sm: 'row' },
                  borderRadius: 3, overflow: 'hidden',
                  border: '1px solid rgba(201,149,106,0.15)',
                  transition: 'all 0.3s',
                  '&:hover': { boxShadow: '0 12px 40px rgba(44,24,16,0.12)', transform: 'translateY(-4px)' },
                }}>
                  <Box component="img" src={course.image_url} alt={course.title}
                    sx={{ width: { xs: '100%', sm: 180 }, height: { xs: 160, sm: 'auto' }, objectFit: 'cover', flexShrink: 0 }} />
                  <CardContent sx={{ flex: 1, p: 3 }}>
                    <Box sx={{ display: 'flex', gap: 1, mb: 1.5, flexWrap: 'wrap' }}>
                      <Chip label={course.level} size="small" sx={{ bgcolor: '#EED2BC', color: '#A9876D', fontSize: 11, fontWeight: 600, height: 22 }} />
                      <Chip icon={<AccessTimeIcon sx={{ fontSize: 14 }} />} label={course.duration} size="small" variant="outlined"
                        sx={{ fontSize: 11, borderColor: 'rgba(201,149,106,0.3)', color: '#000000', height: 22 }} />
                    </Box>
                    <Typography sx={{ fontFamily: 'Jost, Arial, sans-serif', fontWeight: 700, fontSize: 17, color: '#000000', mb: 1, lineHeight: 1.3 }}>
                      {course.title}
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: '#5E564D', mb: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.6 }}>
                      {course.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <PersonOutlineIcon sx={{ fontSize: 16, color: '#A9876D' }} />
                        <Typography sx={{ fontSize: 12, color: '#000000' }}>{course.instructor}</Typography>
                      </Box>
                      <Typography sx={{ fontFamily: 'Jost, Arial, sans-serif', fontWeight: 700, fontSize: 18, color: '#000000' }}>
                        {course.price.toLocaleString('tr-TR')} ₺
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>

      {/* Instructors */}
      <Box id="egitmenler" sx={{ bgcolor: '#F5F0EB', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography sx={{ fontSize: 12, color: '#A9876D', fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', mb: 1 }}>
              Eğitmen Kadromuz
            </Typography>
            <Typography sx={{ fontFamily: 'Jost, Arial, sans-serif', fontSize: { xs: 26, md: 36 }, fontWeight: 700, color: '#000000' }}>
              Alanında Uzman Eğitmenler
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {instructors.map(inst => (
              <Grid size={{ xs: 6, md: 3 }} key={inst.name}>
                <Box sx={{ textAlign: 'center' }}>
                  <Box component="img" src={inst.img} alt={inst.name}
                    sx={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover', mb: 2, border: '3px solid #A9876D' }} />
                  <Typography sx={{ fontFamily: 'Jost, Arial, sans-serif', fontWeight: 700, fontSize: 15, color: '#000000' }}>{inst.name}</Typography>
                  <Typography sx={{ fontSize: 12, color: '#5E564D', mt: 0.5 }}>{inst.title}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Certificate */}
      <Box id="sertifika" sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <StarBorderIcon sx={{ fontSize: 48, color: '#A9876D' }} />
          <Typography sx={{ fontFamily: 'Jost, Arial, sans-serif', fontSize: { xs: 26, md: 36 }, fontWeight: 700, color: '#000000', my: 2 }}>
            Sertifikalı Eğitim
          </Typography>
          <Typography sx={{ fontSize: 15, color: '#000000', lineHeight: 1.8, mb: 4 }}>
            Tüm kurslarımızı tamamlayan katılımcılara Naillabs sertifikası verilmektedir. 
            Sertifikalar ulusal akreditasyona sahiptir ve sektörde geçerlidir.
          </Typography>
          <Button variant="contained" sx={{ bgcolor: '#000000', color: 'white', px: 5, py: 1.75, borderRadius: 2, '&:hover': { bgcolor: '#A9876D' } }}>
            Hemen Başvur
          </Button>
        </Container>
      </Box>
    </Box>
  );
}
