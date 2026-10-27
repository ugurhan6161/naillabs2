import { useEffect, useState } from 'react';
import { Container, Box, Typography, Grid, Button } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import ProductCard from '../components/ProductCard';
import { supabase } from '../lib/supabase';
import type { Product } from '../lib/supabase';
import { demoProduct, PRODUCT_NAME } from '../lib/productContent';

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([demoProduct]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('products').select('*').eq('is_active', true).eq('name', PRODUCT_NAME).maybeSingle()
      .then(({ data }) => {
        setProducts([data || demoProduct]);
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ bgcolor: '#F9F1EC', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 6 }, pb: { xs: 6, md: 10 } }}>
        <Typography variant="overline" sx={{ color: '#60432E' }}>Naillabs / Mağaza</Typography>
        <Typography variant="h1" sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' }, mt: 0.5, mb: 1 }}>
          Profesyonel seçkiler.
        </Typography>
        <Typography sx={{ color: '#5E564D', mb: 5, maxWidth: 520 }}>
          Salon kalitesinde tırnak ürünleri. Eğitim kitleri, freze ekipmanları ve manikür malzemeleri.
        </Typography>

        {loading ? (
          <Typography color="text.secondary">Yükleniyor…</Typography>
        ) : products.length > 0 ? (
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ py: 10, textAlign: 'center' }}>
            <SearchOffIcon sx={{ fontSize: 40, color: '#DBCEC2' }} />
            <Typography sx={{ mt: 1, color: '#5E564D' }}>Henüz ürün yayınlanmadı.</Typography>
            <Button component="a" href="/" sx={{ mt: 2, color: '#60432E' }}>Ana sayfaya dön</Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}
