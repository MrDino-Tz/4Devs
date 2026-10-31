import PropTypes from 'prop-types';

// material-ui
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';

// project import
import NavItem from './NavItem';
import { useGetMenuMaster } from 'api/menu';

export default function NavGroup({ item }) {
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  // A group with a URL is a single top-level navigation link (no dropdown).
  if (item.url) {
    return (
      <Box>
        <NavItem item={item} level={1} />
      </Box>
    );
  }

  const navItems = item.children?.map((menuItem) => {
    switch (menuItem.type) {
      case 'item':
        return <NavItem key={menuItem.id} item={menuItem} level={1} />;
      default:
        return (
          <Typography key={menuItem.id} variant="h6" color="error" align="center">
            Fix - Group Collapse or Items
          </Typography>
        );
    }
  });

  return (
    <List sx={{ mb: drawerOpen ? 1.5 : 0, py: 0, zIndex: 0 }}>
      {drawerOpen && item.title && (
        <Box sx={{ px: 2.5, pt: 1.5, pb: 0.5 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>
            {item.title}
          </Typography>
        </Box>
      )}
      {navItems}
    </List>
  );
}

NavGroup.propTypes = { item: PropTypes.object };
