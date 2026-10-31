import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function CardShowcase() {
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2.5} useFlexGap flexWrap="wrap">
      <Card variant="outlined" sx={{ maxWidth: 280 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Project status
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Track milestones and keep your team aligned with a simple summary card.
          </Typography>
          <Chip label="On track" color="success" size="small" />
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ maxWidth: 280 }}>
        <CardContent>
          <Typography variant="overline" color="text.secondary">
            Monthly users
          </Typography>
          <Typography variant="h3" fontWeight={700} sx={{ mt: 1 }}>
            12.4k
          </Typography>
          <Typography variant="body2" color="success.main" sx={{ mt: 0.5 }}>
            +18% from last month
          </Typography>
        </CardContent>
      </Card>

      <Card variant="outlined" sx={{ maxWidth: 280 }}>
        <CardContent>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Avatar sx={{ bgcolor: 'primary.main' }}>JD</Avatar>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="subtitle2">Jane Doe</Typography>
              <Typography variant="caption" color="text.secondary">
                Product designer
              </Typography>
            </Box>
          </Stack>
          <Button size="small" endIcon={<ArrowRightOutlined />} sx={{ mt: 2 }}>
            View profile
          </Button>
        </CardContent>
      </Card>
    </Stack>
  );
}
