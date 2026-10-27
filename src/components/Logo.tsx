import { Box, Typography } from '@mui/material';

const LOGO_URL = 'https://github.com/ugurhan6161/naillabs/blob/main/logoooooooo.jpeg/screen.png?raw=true';

type Props = { size?: number; onDark?: boolean; showTagline?: boolean };

export default function Logo({ size = 28, onDark = false, showTagline = false }: Props) {
  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.35 }}>
      <Box
        component="img"
        src={LOGO_URL}
        alt="Naillabs"
        sx={{ width: size, height: size, objectFit: 'contain', flexShrink: 0 }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <Typography sx={{
          fontFamily: 'Jost, Arial, sans-serif',
          fontWeight: 600,
          fontSize: size * 0.58,
          letterSpacing: '0.02em',
          color: onDark ? '#F9F1EC' : '#000000',
          lineHeight: 1,
        }}>
          Naillabs
        </Typography>
        {showTagline && (
          <Typography sx={{
            fontFamily: 'Jost, Arial, sans-serif',
            fontWeight: 400,
            fontSize: size * 0.2,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: onDark ? 'rgba(249,241,236,0.7)' : '#5E564D',
            mt: size * 0.1,
          }}>
            Profesyonel Tırnak Ürünleri
          </Typography>
        )}
      </Box>
    </Box>
  );
}
