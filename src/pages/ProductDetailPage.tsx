import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Alert, Box, Button, Chip, CircularProgress, Container, Grid,
  IconButton, Snackbar, Stack, Tab, Tabs, Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { supabase } from '../lib/supabase';
import type { Product } from '../lib/supabase';
import { useCart } from '../context/CartContext';
import NailFormIllustration from '../components/NailFormIllustration';
import {
  demoProduct, PRODUCT_NAME, PRODUCT_DESCRIPTION, KIT_CONTENT, FAQ, NAIL_FORMS,
} from '../lib/productContent';

function ProductVisual({ imageUrl }: { imageUrl: string }) {
  return (
    <Box sx={{
      aspectRatio: '1 / 1', bgcolor: '#EAE1D7', borderRadius: 2, overflow: 'hidden',
      display: 'grid', placeItems: 'center', position: 'relative',
    }}>
      {imageUrl ? (
        <Box component="img" src={imageUrl} alt={PRODUCT_NAME} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <Box sx={{ position: 'relative', width: '78%', aspectRatio: '1 / 1' }}>
          <Box sx={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            border: '2px solid #A9876D', animation: 'ringReveal 700ms ease-out both',
          }} />
          <Box sx={{
            position: 'absolute', inset: '8%', borderRadius: '50%', bgcolor: '#F9F1EC',
            display: 'grid', placeItems: 'center', p: 3, textAlign: 'center',
          }}>
            <Typography variant="caption" sx={{ color: '#60432E', lineHeight: 1.5 }}>
              Ürün fotoğrafı<br />admin panelinden<br />eklenecek
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState(0);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (!id) return;
    if (id === demoProduct.id) { setProduct(demoProduct); setLoading(false); return; }
    supabase.from('products').select('*').eq('id', id).maybeSingle().then(({ data }) => {
      setProduct(data ? { ...data, name: data.name || PRODUCT_NAME, description: PRODUCT_DESCRIPTION } : null);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return <Box sx={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}><CircularProgress sx={{ color: '#A9876D' }} /></Box>;
  }
  if (!product) {
    return (
      <Container sx={{ py: 12 }}>
        <Typography variant="h2" sx={{ fontSize: '1.5rem', mb: 1 }}>Ürün bulunamadı.</Typography>
        <Button component={Link} to="/magaza" sx={{ color: '#60432E' }}>Mağazaya dön</Button>
      </Container>
    );
  }

  const canBuy = product.price > 0 && product.stock > 0;
  const handleAdd = () => { if (!canBuy) return; addToCart(product, quantity); setToast(true); };

  return (
    <Box sx={{ bgcolor: '#F9F1EC', pb: { xs: 9, md: 0 } }}>
      <Container maxWidth="lg" sx={{ py: { xs: 3, md: 6 } }}>
        <Typography variant="body2" sx={{ color: '#5E564D', mb: 3 }}>
          <Link to="/">Ana sayfa</Link> / <Link to="/magaza">Mağaza</Link> / {product.name}
        </Typography>

        <Grid container spacing={{ xs: 4, md: 8 }} alignItems="start">
          <Grid size={{ xs: 12, md: 6 }}>
            <ProductVisual imageUrl={product.image_url} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Chip
              label="PROFESYONEL EĞİTİM KİTİ"
              variant="outlined"
              sx={{ borderColor: '#8B6950', color: '#60432E', mb: 2 }}
            />
            <Typography variant="h1" sx={{ fontSize: { xs: '1.9rem', md: '2.6rem' }, lineHeight: 1.15, mb: 2 }}>
              {PRODUCT_NAME}
            </Typography>
            <Typography sx={{ color: '#5E564D', fontSize: '1rem', lineHeight: 1.7, mb: 3 }}>
              {PRODUCT_DESCRIPTION}
            </Typography>

            <Box sx={{ py: 2, borderTop: '1px solid #DBCEC2', borderBottom: '1px solid #DBCEC2', mb: 3 }}>
              {canBuy ? (
                <Typography variant="h2" sx={{ fontSize: '1.75rem' }}>
                  {product.price.toLocaleString('tr-TR')} ₺
                </Typography>
              ) : (
                <Typography sx={{ color: '#60432E', fontWeight: 500 }}>
                  Fiyat ve stok bilgisi admin panelinden girilecek.
                </Typography>
              )}
              <Typography variant="caption" sx={{ color: '#5E564D' }}>KDV dahil</Typography>
            </Box>

            <Stack direction="row" spacing={1.5} sx={{ mb: 1.5 }}>
              {canBuy && (
                <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #8B6950', borderRadius: 999 }}>
                  <IconButton aria-label="Adedi azalt" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  <Typography sx={{ minWidth: 32, textAlign: 'center', fontWeight: 500 }}>{quantity}</Typography>
                  <IconButton aria-label="Adedi artır" onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}>
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>
              )}
              <Button
                variant="contained"
                size="large"
                fullWidth
                disabled={!canBuy}
                startIcon={<ShoppingBagOutlinedIcon />}
                onClick={handleAdd}
                sx={{ bgcolor: '#000000', color: '#F9F1EC', '&:hover': { bgcolor: '#8B6950' } }}
              >
                {canBuy ? 'Sepete ekle' : 'Admin panelinden tamamlanacak'}
              </Button>
            </Stack>

            <Stack direction="row" spacing={1.5} sx={{ mt: 3, color: '#5E564D' }} alignItems="center">
              <LocalShippingOutlinedIcon sx={{ fontSize: 18 }} />
              <Typography variant="body2">1.500 ₺ üzeri ücretsiz kargo. 2-4 iş gününde teslim.</Typography>
            </Stack>
          </Grid>
        </Grid>

        <Box sx={{ mt: { xs: 6, md: 9 } }}>
          <Tabs
            value={tab}
            onChange={(_, v: number) => setTab(v)}
            sx={{
              borderBottom: '1px solid #DBCEC2',
              '& .MuiTabs-indicator': { bgcolor: '#A9876D' },
              '& .MuiTab-root': { color: '#5E564D' },
              '& .Mui-selected': { color: '#000000' },
            }}
          >
            <Tab label="Kit içeriği" />
            <Tab label="Tırnak formları" />
            <Tab label="Sık sorulanlar" />
          </Tabs>

          <Box sx={{ py: 4 }}>
            {tab === 0 && (
              <Grid container spacing={2}>
                {KIT_CONTENT.map((item) => (
                  <Grid size={{ xs: 12, md: 4 }} key={item.title}>
                    <Box sx={{ p: 2.5, border: '1px solid #DBCEC2', borderRadius: 2, height: '100%' }}>
                      <Typography variant="h3" sx={{ fontSize: '1.1rem', mb: 1 }}>{item.title}</Typography>
                      <Typography sx={{ color: '#5E564D', lineHeight: 1.7, fontSize: '0.9rem' }}>{item.text}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            )}
            {tab === 1 && (
              <Box>
                <Typography sx={{ color: '#5E564D', mb: 3 }}>
                  Kit, aşağıdaki dört değiştirilebilir tırnak formunun tamamını içerir.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  {NAIL_FORMS.map((form) => (
                    <Box key={form.name} sx={{ flex: 1, p: 2, border: '1px solid #DBCEC2', borderRadius: 2 }}>
                      <NailFormIllustration {...form} />
                    </Box>
                  ))}
                </Stack>
              </Box>
            )}
            {tab === 2 && (
              <Stack spacing={3} sx={{ maxWidth: 720 }}>
                {FAQ.map((item) => (
                  <Box key={item.q}>
                    <Typography variant="h3" sx={{ fontSize: '1.05rem', mb: 0.75 }}>{item.q}</Typography>
                    <Typography sx={{ color: '#5E564D', lineHeight: 1.7 }}>{item.a}</Typography>
                  </Box>
                ))}
              </Stack>
            )}
          </Box>
        </Box>

        <Box sx={{ mt: 4, p: { xs: 3, md: 5 }, bgcolor: '#EAE1D7', borderRadius: 2 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '1.4rem', md: '1.9rem' }, mb: 1.5 }}>
            Naillabs ile salon kalitesinde çalışın.
          </Typography>
          <Typography sx={{ color: '#5E564D', maxWidth: 640, lineHeight: 1.7 }}>
            Naillabs Profesyonel Eğitim Kiti, profesyonel tırnak uygulamalarında doğru ekipmanla çalışmak isteyenler için geliştirilmiştir.
          </Typography>
        </Box>
      </Container>

      <Box sx={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        display: { xs: 'flex', md: 'none' }, p: 1.5,
        bgcolor: '#FFFFFF', borderTop: '1px solid #DBCEC2', zIndex: 10,
      }}>
        <Button variant="contained" fullWidth disabled={!canBuy} onClick={handleAdd}>
          {canBuy ? 'Sepete ekle' : 'Fiyat bekleniyor'}
        </Button>
      </Box>

      <Snackbar open={toast} autoHideDuration={2200} onClose={() => setToast(false)}>
        <Alert severity="success" onClose={() => setToast(false)}>Ürün sepete eklendi.</Alert>
      </Snackbar>
    </Box>
  );
}
