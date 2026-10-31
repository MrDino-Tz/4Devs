import { Link } from 'react-router-dom';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// icons
import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined';

// project imports
import { UI_COMPONENTS } from 'ui-registry';

function ComponentCard({ component, theme }) {
  const Icon = component.icon;
  const accent = theme.palette.primary.main;

  return (
    <Card
      component={Link}
      to={`/app/ui/${component.slug}`}
      elevation={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        transition: 'transform .2s ease, border-color .2s ease, box-shadow .2s ease',
        '&:hover': {
          transform: 'translateY(-3px)',
          borderColor: accent,
          boxShadow: theme.customShadows?.z2 || 4
        }
      }}
    >
      <CardContent sx={{ p: 2.5, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Stack direction="row" alignItems="flex-start" justifyContent="space-between" spacing={1}>
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 1.5,
              display: 'grid',
              placeItems: 'center',
              bgcolor: alpha(accent, 0.12),
              color: accent,
              fontSize: 19,
              flexShrink: 0
            }}
          >
            <Icon />
          </Box>
          <Chip label={component.group} size="small" variant="outlined" />
        </Stack>

        <Typography variant="h6" color="text.primary" fontWeight={600} sx={{ mt: 2 }}>
          {component.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, flexGrow: 1 }}>
          {component.description}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 2, color: accent }}>
          <Typography variant="body2" fontWeight={600}>
            View component
          </Typography>
          <ArrowRightOutlined style={{ fontSize: 11 }} />
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function UiGallery() {
  const theme = useTheme();

  return (
    <Grid container spacing={2.5}>
      {UI_COMPONENTS.map((component) => (
        <Grid key={component.slug} size={{ xs: 12, sm: 6, md: 4 }}>
          <ComponentCard component={component} theme={theme} />
        </Grid>
      ))}
    </Grid>
  );
}
