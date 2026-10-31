// material-ui
import { DashboardOutlined, LayoutOutlined } from '@ant-design/icons';

// project imports
import { USER_INTERFACE_CATEGORY } from 'data/categories';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  items: [
    {
      id: 'devops-tools',
      title: 'DevOps Tools',
      type: 'group',
      url: '/app',
      icon: DashboardOutlined
    },
    {
      id: 'user-interface',
      title: USER_INTERFACE_CATEGORY.name,
      type: 'group',
      url: `/app?category=${USER_INTERFACE_CATEGORY.slug}`,
      icon: LayoutOutlined
    }
  ]
};

export default menuItems;
