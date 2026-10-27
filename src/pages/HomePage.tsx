import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Container, Grid, Stack } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { supabase } from '../lib/supabase';
import type { Product } from '../lib/supabase';
import ProductCard from '../components/ProductCard';
import NailFormIllustration from '../components/NailFormIllustration';
import {
  demoProduct, PRODUCT_NAME, PRODUCT_DESCRIPTION, KIT_CONTENT, BENEFITS, FAQ, NAIL_FORMS,
} from '../lib/productContent';

export default function HomePage() {
  const [product, setProduct] = useState<Product>(demoProduct);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('products').select('*').eq('is_active', true).eq('name', PRODUCT_NAME).maybeSingle()
      .then(({ data }) => { if (data) setProduct(data); setLoading(false); });
  }, []);

  return (
    <Box sx={{ bgcolor: '#F9F1EC' }}>
      {/* Hero */}
      <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 8 }, pb: { xs: 6, md: 12 } }}>
        <Grid container spacing={{ xs: 5, md: 8 }} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="overline" sx={{ color: '#60432E', mb: 2, display: 'block' }}>
              Naillabs™ Profesyonel Tırnak Ürünleri
            </Typography>
            <Typography variant="h1" sx={{ fontSize: { xs: '1.9rem', md: '2.75rem' }, lineHeight: 1.2, mb: 2 }}>
              Profesyonel tırnak bakımında doğru ekipman her şeydir.
            </Typography>
            <Typography sx={{ color: '#5E564D', fontSize: '1.05rem', lineHeight: 1.7, mb: 3, maxWidth: 520 }}>
              Eğitim kitleri, freze ekipmanları ve manikür malzemeleri. Naillabs ile salon kalitesinde çalışın.
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                component={Link}
                to="/magaza"
                endIcon={<ArrowForwardIcon />}
                sx={{ bgcolor: '#000000', color: '#F9F1EC', '&:hover': { bgcolor: '#8B6950' } }}
              >
                Mağazayı keşfet
              </Button>
              <Button
                variant="outlined"
                component={Link}
                to="/urun/naillabs-profesyonel-egitim-kiti-ornek"
                sx={{ borderColor: '#8B6950', color: '#60432E', '&:hover': { borderColor: '#60432E', bgcolor: '#EED2BC' } }}
              >
                Ürünü incele
              </Button>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ display: 'grid', placeItems: 'center', py: { xs: 2, md: 4 } }}>
              <Box sx={{ position: 'relative', width: { xs: 260, sm: 340, md: 420 }, aspectRatio: '1 / 1' }}>
                <Box sx={{
                  position: 'absolute', inset: 0, borderRadius: '50%',
                  border: '2px solid', borderColor: '#A9876D',
                  animation: 'ringReveal 700ms ease-out both',
                }} />
                <Box sx={{
                  position: 'absolute', inset: '8%', borderRadius: '50%',
                  bgcolor: '#EAE1D7', display: 'grid', placeItems: 'center', p: 4, textAlign: 'center',
                }}>
                  <Box>
                    <Typography sx={{ fontWeight: 300, fontSize: { xs: '1.1rem', md: '1.4rem' }, color: '#000000', lineHeight: 1.3 }}>
                      Naillabs<br />Profesyonel<br />Eğitim Kiti
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#5E564D', mt: 1.5, display: 'block' }}>
                      Ürün fotoğrafı admin panelinden eklenecek
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Neden Naillabs */}
      <Box sx={{ bgcolor: '#EAE1D7', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, mb: 4 }}>
            Neden Naillabs?
          </Typography>
          <Grid container spacing={4}>
            {BENEFITS.map((b) => (
              <Grid size={{ xs: 12, md: 4 }} key={b.title}>
                <Typography variant="h3" sx={{ fontSize: '1.2rem', mb: 1.5, color: '#60432E' }}>
                  {b.title}
                </Typography>
                <Typography sx={{ color: '#5E564D', lineHeight: 1.7 }}>
                  {b.text}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Kit içeriği */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, mb: 1 }}>
          Kit içeriği
        </Typography>
        <Typography sx={{ color: '#5E564D', mb: 4, maxWidth: 600 }}>
          {PRODUCT_DESCRIPTION}
        </Typography>
        <Grid container spacing={3}>
          {KIT_CONTENT.map((item) => (
            <Grid size={{ xs: 12, md: 4 }} key={item.title}>
              <Box sx={{ p: 3, bgcolor: '#FFFFFF', border: '1px solid #DBCEC2', borderRadius: 2, height: '100%' }}>
                <Typography variant="h3" sx={{ fontSize: '1.1rem', mb: 1.5, color: '#000000' }}>
                  {item.title}
                </Typography>
                <Typography sx={{ color: '#5E564D', lineHeight: 1.7, fontSize: '0.9rem' }}>
                  {item.text}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 5 }}>
          <Typography variant="h3" sx={{ fontSize: '1.1rem', mb: 2, color: '#60432E' }}>
            Değiştirilebilir tırnak formları
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            {NAIL_FORMS.map((form) => (
              <Box key={form.name} sx={{ flex: 1, p: 2, bgcolor: '#FFFFFF', border: '1px solid #DBCEC2', borderRadius: 2 }}>
                <NailFormIllustration {...form} />
              </Box>
            ))}
          </Stack>
        </Box>
      </Container>

      {/* Ürün satış CTA */}
      <Box sx={{ bgcolor: '#EAE1D7', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', md: '2.1rem' }, mb: 2, lineHeight: 1.3 }}>
                Hemen sipariş verin, işinizi büyütün.
              </Typography>
              <Typography sx={{ color: '#5E564D', lineHeight: 1.7, mb: 3, maxWidth: 540 }}>
                Naillabs Profesyonel Eğitim Kiti, tırnak eğitmenlerinin derslerini daha uygulamalı ve sistematik şekilde yürütmesine yardımcı olmak amacıyla geliştirilmiştir.
              </Typography>
              <Button
                variant="contained"
                component={Link}
                to="/magaza"
                sx={{ bgcolor: '#000000', color: '#F9F1EC', '&:hover': { bgcolor: '#8B6950' } }}
              >
                Mağazaya git
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              {!loading && <ProductCard product={product} />}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* SSS */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Typography variant="h2" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, mb: 4 }}>
          Sık sorulanlar
        </Typography>
        <Stack spacing={3}>
          {FAQ.map((item) => (
            <Box key={item.q}>
              <Typography variant="h3" sx={{ fontSize: '1.05rem', mb: 0.75 }}>
                {item.q}
              </Typography>
              <Typography sx={{ color: '#5E564D', lineHeight: 1.7 }}>
                {item.a}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
