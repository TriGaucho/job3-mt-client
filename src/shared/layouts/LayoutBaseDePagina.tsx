import { Icon, IconButton, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import { useDrawerContext } from '../contexts';

interface ILayoutBaseDePaginaProps {
  titulo: string
  children: React.ReactNode
}
export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({ children, titulo }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm')); // Monioramento do tamanho da tela para quando menor que SM
  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box height="100%" display='flex' flexDirection="column" gap={1}>
      <Box padding={1} display='flex' alignItems='center' height={theme.spacing(12)} gap={1}>
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}

        <Typography variant='h5'>
          {titulo}
        </Typography>
      </Box>

      <Box>
        Barra de Ferramentas
      </Box>

      <Box>
        {children}
      </Box>
    </Box>
  );
};