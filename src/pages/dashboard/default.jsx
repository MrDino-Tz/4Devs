import { Link, useSearchParams } from 'react-router-dom';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// icons
import { ArrowLeftOutlined, ArrowRightOutlined, LayoutOutlined } from '@ant-design/icons';

// project imports
import { ALL_CATEGORIES, getCategoryBySlug } from 'data/categories';
import ALL_TOOLS from 'data/tools';
import UiGallery from 'pages/ui/gallery';
import { UI_COMPONENTS } from 'ui-registry';

const UI_CATEGORY_SLUG = 'user-interface';

const toolsForCategory = (categoryName) => ALL_TOOLS.filter((tool) => tool.category === categoryName);

const cardSx = {
  textDecoration: 'none',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: 3,
  border: '1px solid',
  borderColor: 'divider',
  boxShadow: 'none',
  transition: 'transform .2s ease, border-color .2s ease, box-shadow .2s ease'
};

function CategoryCard({ category, theme }) {
  const Icon = category.icon;
  const accent = theme.palette[category.color]?.main || theme.palette.primary.main;
  const isUiCategory = category.slug === UI_CATEGORY_SLUG;
  const count = isUiCategory ? UI_COMPONENTS.length : toolsForCategory(category.name).length;
  const itemLabel = isUiCategory ? (count === 1 ? 'component' : 'components') : count === 1 ? 'tool' : 'tools';

  return (
    <Card
      component={Link}
      to={`/app?category=${category.slug}`}
      elevation={0}
      sx={{
        ...cardSx,
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: accent,
          boxShadow: theme.customShadows?.z2 || 4
        }
      }}
    >
      <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: 2,
              display: 'grid',
              placeItems: 'center',
              bgcolor: alpha(accent, 0.12),
              color: accent,
              fontSize: 24
            }}
          >
            <Icon />
          </Box>
          <Chip label={`${count} ${itemLabel}`} size="small" variant="outlined" color={category.color} />
        </Stack>

        <Typography variant="h5" fontWeight={700} color="text.primary" sx={{ mt: 2.5 }}>
          {category.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, flexGrow: 1 }}>
          {category.blurb}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={0.75} sx={{ mt: 2.5, color: accent, fontWeight: 600 }}>
          <Typography variant="body2" fontWeight={600}>
            {isUiCategory ? 'Browse components' : 'Browse category'}
          </Typography>
          <ArrowRightOutlined style={{ fontSize: 12 }} />
        </Stack>
      </CardContent>
    </Card>
  );
}

function ToolCard({ tool, category, theme }) {
  const Icon = category.icon;
  const accent = theme.palette[category.color]?.main || theme.palette.primary.main;

  return (
    <Card
      component={Link}
      to={tool.path}
      elevation={0}
      sx={{
        ...cardSx,
        '&:hover': {
          transform: 'translateY(-3px)',
          borderColor: accent,
          boxShadow: theme.customShadows?.z2 || 4
        }
      }}
    >
      <CardContent sx={{ p: 2.5, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: 1.5,
              display: 'grid',
              placeItems: 'center',
              bgcolor: alpha(accent, 0.12),
              color: accent,
              fontSize: 17,
              flexShrink: 0
            }}
          >
            <Icon />
          </Box>
          <Typography variant="h6" color="text.primary" fontWeight={600} sx={{ lineHeight: 1.25 }}>
            {tool.name}
          </Typography>
        </Stack>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5, flexGrow: 1 }}>
          {tool.desc}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 2, color: accent }}>
          <Typography variant="body2" fontWeight={600}>
            Open tool
          </Typography>
          <ArrowRightOutlined style={{ fontSize: 11 }} />
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function DashboardDefault() {
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const activeCategory = getCategoryBySlug(searchParams.get('category'));

  if (activeCategory) {
    const Icon = activeCategory.icon;
    const accent = theme.palette[activeCategory.color]?.main || theme.palette.primary.main;
    const isUiCategory = activeCategory.slug === UI_CATEGORY_SLUG;
    const tools = toolsForCategory(activeCategory.name);
    const itemCount = isUiCategory ? UI_COMPONENTS.length : tools.length;
    const itemLabel = isUiCategory ? (itemCount === 1 ? 'component' : 'components') : itemCount === 1 ? 'tool' : 'tools';

    return (
      <Grid container rowSpacing={3}>
        <Grid size={12}>
          <Button component={Link} to="/app" size="small" color="inherit" startIcon={<ArrowLeftOutlined />} sx={{ mb: 2 }}>
            All categories
          </Button>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'flex-start', sm: 'center' }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 2,
                display: 'grid',
                placeItems: 'center',
                bgcolor: alpha(accent, 0.12),
                color: accent,
                fontSize: 26,
                flexShrink: 0
              }}
            >
              <Icon />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Stack direction="row" alignItems="center" spacing={1.25} flexWrap="wrap" useFlexGap sx={{ mb: 0.5 }}>
                <Chip label={`${itemCount} ${itemLabel}`} size="small" color={activeCategory.color} variant="outlined" />
              </Stack>
              <Typography variant="subtitle1" color="text.secondary">
                {activeCategory.blurb}
              </Typography>
            </Box>
          </Stack>
        </Grid>

        <Grid size={12}>
          {isUiCategory ? (
            <UiGallery />
          ) : tools.length > 0 ? (
            <Grid container spacing={2.5}>
              {tools.map((tool) => (
                <Grid key={tool.path} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <ToolCard tool={tool} category={activeCategory} theme={theme} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Card elevation={0} sx={{ ...cardSx, borderStyle: 'dashed' }}>
              <CardContent sx={{ p: { xs: 4, sm: 6 }, textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    mx: 'auto',
                    mb: 2,
                    borderRadius: 2,
                    display: 'grid',
                    placeItems: 'center',
                    bgcolor: alpha(accent, 0.1),
                    color: accent,
                    fontSize: 28
                  }}
                >
                  <LayoutOutlined />
                </Box>
                <Typography variant="h5" fontWeight={700}>
                  No tools assigned yet
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: 420, mx: 'auto' }}>
                  The {activeCategory.name} category is reserved for future tools. Everything available today lives in the categories on the
                  dashboard.
                </Typography>
                <Button component={Link} to="/app" variant="contained" startIcon={<ArrowLeftOutlined />} sx={{ mt: 3 }}>
                  Back to categories
                </Button>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container rowSpacing={3} columnSpacing={2.75}>
      <Grid size={12}>
        <Typography variant="h4" fontWeight={700} sx={{ mb: 2.5 }}>
          Browse by category
        </Typography>
        <Grid container spacing={2.5}>
          {ALL_CATEGORIES.map((category) => (
            <Grid key={category.slug} size={{ xs: 12, sm: 6, lg: 4 }}>
              <CategoryCard category={category} theme={theme} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
