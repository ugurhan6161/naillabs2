import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Container, Divider, Grid, IconButton, Paper, Stack, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { useCart } from '../context/CartContext';

const FREE_SHIPPING_THRESHOLD = 1500;

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, subtotal, shippingCost, total, itemCount } = useCart();
  const navigate = useNavigate();

  if (!items.length) {
    return (
      <Box sx={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#FFFFFF', mt: 8 }}>
        <Box sx={{ textAlign: 'center', px: 2 }}>
          <Box sx={{ width: 100, height: 100, borderRadius: '50%', bgcolor: '#F9F1EC', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
            <ShoppingBagOutlinedIcon sx={{ color: '#A9876D', fontSize: 42 }} />
          </Box>
          <Typography sx={{ fontFamily: 'Jost, Arial, sans-serif', fontSize: { xs: 28, md: 36 }, fontWeight: 700, color: '#000000' }}>
            Sepetiniz Boş
          </Typography>
          <Typography sx={{ color: '#5E564D', mt: 1, mb: 4 }}>Henüz bir ürün eklemediniz.</Typography>
          <Button component={Link} to="/magaza" variant="contained" size="large"
            sx={{ bgcolor: '#000000', color: 'white', borderRadius: 50, px: 4, '&:hover': { bgcolor: '#A9876D' } }}>
            Mağazaya Git
          </Button>
        </Box>
      </Box>
    );
  }

  const remaining = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <Box sx={{ minHeight: '75vh', py: { xs: 3, md: 6 }, bgcolor: '#FFFFFF', mt: 8 }}>
      <Container maxWidth="lg">
        <Typography sx={{ fontFamily: 'Jost, Arial, sans-serif', fontSize: { xs: 28, md: 40 }, fontWeight: 700, color: '#000000', mb: 3 }}>
          Sepetim <Box component="span" sx={{ color: '#5E564D', fontFamily: 'Jost, sans-serif', fontSize: '1rem', fontWeight: 500 }}>({itemCount} ürün)</Box>
        </Typography>

        <Box sx={{ mb: 3, p: 2, display: 'flex', gap: 1.5, alignItems: 'center', bgcolor: remaining > 0 ? '#F5EDE5' : '#DCEFE4', color: remaining > 0 ? '#8B6950' : '#2E7455', borderRadius: 2 }}>
          <LocalShippingOutlinedIcon />
          <Typography sx={{ fontWeight: 600, fontSize: 14 }}>
            {remaining > 0 ? `${remaining.toLocaleString('tr-TR')} ₺ daha harcayın, ücretsiz kargo kazanın!` : 'Ücretsiz kargo avantajınız aktif!'}
          </Typography>
        </Box>

        <Grid container spacing={3} alignItems="flex-start">
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper sx={{ overflow: 'hidden', borderRadius: 3, border: '1px solid rgba(11,11,13,0.08)' }}>
              {items.map((item, index) => (
                <Box key={item.product.id}>
                  <Box sx={{ p: { xs: 1.5, sm: 2.5 }, display: 'flex', gap: 1.5, alignItems: 'center' }}>
                    <Box component="img" src={item.product.image_url} alt={item.product.name}
                      sx={{ width: { xs: 72, sm: 100 }, height: { xs: 72, sm: 100 }, objectFit: 'cover', borderRadius: 2, bgcolor: '#F9F1EC' }} />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography component={Link} to={`/urun/${item.product.id}`}
                        sx={{ fontFamily: 'Jost, Arial, sans-serif', fontWeight: 700, fontSize: 15, color: '#000000', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.product.name}
                      </Typography>
                      <Typography sx={{ fontSize: 12, color: '#5E564D' }}>{item.product.price.toLocaleString('tr-TR')} ₺ / adet</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, mt: 1.5, flexWrap: 'wrap' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(11,11,13,0.15)', borderRadius: 50 }}>
                          <IconButton size="small" onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                            <RemoveIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                          <Typography sx={{ px: 1.5, fontWeight: 700 }}>{item.quantity}</Typography>
                          <IconButton size="small" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                            <AddIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                        </Box>
                        <Typography sx={{ fontWeight: 700, fontSize: 16, color: '#000000' }}>
                          {(item.product.price * item.quantity).toLocaleString('tr-TR')} ₺
                        </Typography>
                      </Box>
                    </Box>
                    <IconButton onClick={() => removeFromCart(item.product.id)} sx={{ color: '#5E564D', '&:hover': { color: '#D64545' } }}>
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Box>
                  {index < items.length - 1 && <Divider />}
                </Box>
              ))}
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3, position: { md: 'sticky' }, top: 100, borderRadius: 3, border: '1px solid rgba(11,11,13,0.08)' }}>
              <Typography sx={{ fontFamily: 'Jost, Arial, sans-serif', fontSize: 20, fontWeight: 700, color: '#000000', mb: 3 }}>
                Sipariş Özeti
              </Typography>
              <Stack spacing={1.5}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontSize: 14, color: '#5E564D' }}>Ara toplam</Typography>
                  <Typography sx={{ fontSize: 14, fontWeight: 600 }}>{subtotal.toLocaleString('tr-TR')} ₺</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontSize: 14, color: '#5E564D' }}>Kargo</Typography>
                  <Typography sx={{ fontSize: 14, fontWeight: 600, color: shippingCost === 0 ? '#3DA56F' : 'inherit' }}>
                    {shippingCost === 0 ? 'Ücretsiz' : `${shippingCost.toLocaleString('tr-TR')} ₺`}
                  </Typography>
                </Box>
              </Stack>
              <Divider sx={{ my: 2.5 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <Typography sx={{ fontFamily: 'Jost, Arial, sans-serif', fontSize: 18, fontWeight: 700, color: '#000000' }}>Toplam</Typography>
                <Typography sx={{ fontFamily: 'Jost, Arial, sans-serif', fontSize: 22, fontWeight: 700, color: '#000000' }}>
                  {total.toLocaleString('tr-TR')} ₺
                </Typography>
              </Box>
              <Button fullWidth variant="contained" size="large" endIcon={<ArrowForwardIcon />}
                onClick={() => navigate('/odeme')}
                sx={{ bgcolor: '#000000', color: 'white', borderRadius: 50, '&:hover': { bgcolor: '#A9876D' } }}>
                Ödemeye Geç
              </Button>
              <Button component={Link} to="/magaza" fullWidth sx={{ mt: 1.5, color: '#5E564D', '&:hover': { bgcolor: 'transparent', color: '#000000' } }}>
                Alışverişe Devam Et
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
