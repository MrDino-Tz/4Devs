import { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

// icons
import ArrowLeftOutlined from '@ant-design/icons/ArrowLeftOutlined';
import CheckOutlined from '@ant-design/icons/CheckOutlined';
import CopyOutlined from '@ant-design/icons/CopyOutlined';

// project imports
import { getUIComponentBySlug } from 'ui-registry';

function copyWithFallback(text) {
  if (navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text);
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  return Promise.resolve();
}

export default function UiComponentDetail() {
  const theme = useTheme();
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const component = getUIComponentBySlug(slug);
  const initialTab = searchParams.get('tab') === 'code' ? 1 : 0;

  const [tab, setTab] = useState(initialTab);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setTab(initialTab);
    setCopied(false);
  }, [slug, initialTab]);

  useEffect(() => {
    if (!copied) return undefined;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  if (!component) {
    return (
      <Card variant="outlined" sx={{ p: { xs: 4, sm: 6 }, textAlign: 'center' }}>
        <Typography variant="h5" fontWeight={700}>
          Component not found
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          The component you are looking for does not exist yet.
        </Typography>
        <Button component={Link} to="/app?category=user-interface" variant="contained" startIcon={<ArrowLeftOutlined />} sx={{ mt: 3 }}>
          Back to components
        </Button>
      </Card>
    );
  }

  const Icon = component.icon;
  const Preview = component.preview;

  const handleCopy = () => {
    copyWithFallback(component.code)
      .then(() => setCopied(true))
      .catch(() => setCopied(false));
  };

  return (
    <Grid container rowSpacing={3}>
      <Grid size={12}>
        <Button component={Link} to="/app?category=user-interface" size="small" color="inherit" startIcon={<ArrowLeftOutlined />}>
          All components
        </Button>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ xs: 'flex-start', sm: 'center' }} sx={{ mt: 2 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 2,
              display: 'grid',
              placeItems: 'center',
              bgcolor: alpha(theme.palette.primary.main, 0.12),
              color: 'primary.main',
              fontSize: 26,
              flexShrink: 0
            }}
          >
            <Icon />
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
              <Typography variant="subtitle1" fontWeight={600}>
                {component.group}
              </Typography>
              <Chip label="MUI" size="small" variant="outlined" color="primary" />
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {component.description}
            </Typography>
          </Box>
        </Stack>
      </Grid>

      <Grid size={12}>
        <Card variant="outlined">
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ xs: 'stretch', sm: 'center' }}
            justifyContent="space-between"
            sx={{ px: 2, pt: 1, borderBottom: '1px solid', borderColor: 'divider' }}
          >
            <Tabs value={tab} onChange={(event, value) => setTab(value)} aria-label="component preview and code">
              <Tab label="Preview" />
              <Tab label="Code" />
            </Tabs>

            <Button
              size="small"
              variant="outlined"
              color={copied ? 'success' : 'primary'}
              startIcon={copied ? <CheckOutlined /> : <CopyOutlined />}
              onClick={handleCopy}
              sx={{ mb: { xs: 1.5, sm: 0 } }}
            >
              {copied ? 'Copied' : 'Copy code'}
            </Button>
          </Stack>

          {tab === 0 ? (
            <Box sx={{ p: { xs: 2, sm: 3.5 }, bgcolor: 'background.default', minHeight: 240 }}>
              <Preview />
            </Box>
          ) : (
            <Box
              component="pre"
              sx={{
                m: 0,
                p: { xs: 2, sm: 3 },
                maxHeight: 560,
                overflow: 'auto',
                bgcolor: 'grey.900',
                color: 'grey.100',
                fontFamily: '"Courier New", Courier, monospace',
                fontSize: '0.82rem',
                lineHeight: 1.65,
                whiteSpace: 'pre'
              }}
            >
              <code>{component.code}</code>
            </Box>
          )}
        </Card>
      </Grid>

      <Grid size={12}>
        <Alert severity="info" variant="outlined">
          Copy the snippet into your project and install its dependencies: <strong>{component.dependencies.join(', ')}</strong>. The code
          uses the MUI theme from your app, so colors and spacing adapt automatically.
        </Alert>
      </Grid>
    </Grid>
  );
}
