import { useState } from 'react';

import AppstoreOutlined from '@ant-design/icons/AppstoreOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

export default function TabsShowcase() {
  const [value, setValue] = useState(0);

  return (
    <Box>
      <Tabs value={value} onChange={(event, newValue) => setValue(newValue)} aria-label="basic tabs">
        <Tab label="Overview" />
        <Tab label="Activity" />
        <Tab label="Settings" />
      </Tabs>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
        Showing the {value === 0 ? 'overview' : value === 1 ? 'activity' : 'settings'} panel.
      </Typography>

      <Tabs value={value} onChange={(event, newValue) => setValue(newValue)} aria-label="icon tabs" sx={{ mt: 3 }}>
        <Tab icon={<AppstoreOutlined />} iconPosition="start" label="Dashboard" />
        <Tab icon={<UserOutlined />} iconPosition="start" label="Profile" />
        <Tab icon={<SettingOutlined />} iconPosition="start" label="Preferences" />
      </Tabs>
    </Box>
  );
}
