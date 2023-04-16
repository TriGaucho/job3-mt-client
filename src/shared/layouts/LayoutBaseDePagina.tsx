import { ReactNode } from 'react';
import { Icon, IconButton, Typography, useTheme, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import { useDrawerContext } from '../contexts';

interface ILayoutBaseDePaginaProps {
  titulo: string
  barraDeFerramentas?: ReactNode
  children: React.ReactNode
}
export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({ children, titulo, barraDeFerramentas }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm')); // Monioramento do tamanho da tela para quando menor que SM
  const mdDown = useMediaQuery(theme.breakpoints.down('md')); // Monioramento do tamanho da tela para quando menor que MD
  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Box height="100%" display='flex' flexDirection="column" gap={1}>
      <Box padding={1} display='flex' alignItems='center' gap={1} height={theme.spacing(smDown ? 6 : mdDown ? 8 : 12)} >
        {smDown && (
          <IconButton onClick={toggleDrawerOpen}>
            <Icon>menu</Icon>
          </IconButton>
        )}

        <Typography
          variant={smDown ? 'h5' : mdDown ? 'h4' : 'h3'}
          overflow='hidden' //não quebra o texto
          whiteSpace='nowrap' //não quebra linha
          textOverflow='ellipsis' //coloca tras pontinhos ao final do texto
        >
          {titulo}
        </Typography>
      </Box>

      {barraDeFerramentas && (
        <Box>
          {barraDeFerramentas}
        </Box>
      )}

      {/* flex={1} ocupa todo resto do BOX / overflow='auto' controle de rolagem */}
      <Box flex={1} overflow='auto'>
        {children}
      </Box>
    </Box>
  );
};