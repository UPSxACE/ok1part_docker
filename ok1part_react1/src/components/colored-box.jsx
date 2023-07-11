import themeConfig from '@/theme-config';
import { Box } from '@mui/material';

export default function ColoredBox({ children, ...props }) {
  return (
    <Box
      {...props}
      sx={{
        background: `linear-gradient(${themeConfig.palette.primary.gradientAngle}deg, ${themeConfig.palette.primary.special1} 0%, ${themeConfig.palette.primary.special2} 100%)`,
        backgroundColor: 'primary.components2',
        ...props.sx,
      }}
    >
      {children}
    </Box>
  );
}
