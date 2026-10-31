// project imports

import { useState } from 'react';
import Navigation from './Navigation';
import SimpleBar from 'components/third-party/SimpleBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { BulbOutlined } from '@ant-design/icons';
import SuggestDialog from 'components/SuggestDialog';
import { useGetMenuMaster } from 'api/menu';

// ==============================|| DRAWER CONTENT ||============================== //

export default function DrawerContent() {
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;
  const [suggestOpen, setSuggestOpen] = useState(false);

  return (
    <>
      <SimpleBar
        sx={{
          height: '100%',
          '& .simplebar-content': { display: 'flex', flexDirection: 'column', minHeight: '100%' }
        }}
      >
        <Navigation />

        <Box
          sx={{
            mt: 'auto',
            p: drawerOpen ? 2 : 1,
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Tooltip title={drawerOpen ? '' : 'Suggest a feature'} placement="right">
            <Button
              variant="contained"
              color="warning"
              onClick={() => setSuggestOpen(true)}
              fullWidth={drawerOpen}
              aria-label="Suggest a feature"
              startIcon={drawerOpen ? <BulbOutlined /> : null}
              sx={
                drawerOpen
                  ? undefined
                  : {
                      minWidth: 0,
                      width: 40,
                      height: 40,
                      p: 0,
                      borderRadius: 2,
                      fontSize: 18,
                      '& .MuiButton-startIcon': { m: 0 }
                    }
              }
            >
              {drawerOpen ? 'Suggest' : <BulbOutlined />}
            </Button>
          </Tooltip>
        </Box>
      </SimpleBar>

      <SuggestDialog open={suggestOpen} onClose={() => setSuggestOpen(false)} />
    </>
  );
}
