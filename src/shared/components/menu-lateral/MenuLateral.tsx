import { List, Avatar, Divider, Drawer, Icon, ListItemButton, ListItemIcon, ListItemText, useTheme, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import { deepOrange } from '@mui/material/colors';
import { useAppThemeContext, useDrawerContext } from '../../contexts';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';

interface IListItemLinkProps {
  to: string;
  label: string;
  icon: string;
  onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({ to, label, icon, onClick }) => {
  const navigate = useNavigate();

  //Configuração para reconhecer a opção de menu selecionada
  const resolvePath = useResolvedPath(to);
  const match = useMatch({ path: resolvePath.pathname, end: false });

  const handleClick = () => {
    navigate(to);
    if (onClick) onClick();
  };

  return (
    <ListItemButton selected={!!match} onClick={handleClick}>
      <ListItemIcon>
        <Icon>{icon}</Icon>
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItemButton>
  );
};

interface IMenuLateral {
  children: React.ReactNode
}
export const MenuLateral: React.FC<IMenuLateral> = ({ children }) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm')); // Monioramento do tamanho da tela

  const { isDrawerOpen, toggleDrawerOpen, drawerOptions } = useDrawerContext();

  const { toggleTheme } = useAppThemeContext();

  return (
    <>
      <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
        <Box width={theme.spacing(28)} height="100%" display="flex" flexDirection="column" >

          <Box width="100%" height={theme.spacing(20)} display="flex" alignItems='center' justifyContent="center">
            <Avatar sx={{ height: theme.spacing(12), width: theme.spacing(12), bgcolor: deepOrange[500] }}>D</Avatar>
          </Box>

          <Divider />

          <Box flex={1}>
            <List component='nav'>
              {drawerOptions.map(drawerOption => (
                <ListItemLink
                  to={drawerOption.path}
                  key={drawerOption.path}
                  icon={drawerOption.icon}
                  label={drawerOption.label}
                  onClick={smDown ? toggleDrawerOpen : undefined}
                />
              ))}
            </List>
          </Box>

          <Box>
            <List component='nav'>
              <ListItemButton onClick={toggleTheme}>
                <ListItemIcon>
                  <Icon>dark_mode</Icon>
                </ListItemIcon>
                <ListItemText primary='Alterar tema' />
              </ListItemButton>
            </List>
          </Box>

        </Box>
      </Drawer>
      <Box height='100vh' marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </>
  );
};