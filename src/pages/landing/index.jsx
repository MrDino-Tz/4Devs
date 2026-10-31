import { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid2';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

// icons
import {
  ApiOutlined,
  ArrowRightOutlined,
  FilePdfOutlined,
  FontSizeOutlined,
  GithubOutlined,
  KeyOutlined,
  LockOutlined,
  PictureOutlined,
  SearchOutlined,
  SwapOutlined,
  ThunderboltOutlined,
  WifiOutlined,
  SunOutlined,
  MoonOutlined
} from '@ant-design/icons';

// project imports
import { useThemeMode } from 'contexts/ThemeContext';
import ALL_TOOLS from 'data/tools';
import logo from 'assets/images/logo.png';
import CommandPaletteDemo from './CommandPaletteDemo';

const CATEGORY_META = {
  'Text Tools': { icon: <FontSizeOutlined />, blurb: 'Copy, ASCII art & emoji' },
  'Conversion Tools': { icon: <SwapOutlined />, blurb: 'Formats, colors & encodings' },
  CryptOK: { icon: <KeyOutlined />, blurb: 'Passwords, keys & signatures' },
  'Image/Video': { icon: <PictureOutlined />, blurb: 'Fast media edits' },
  OpenDoc: { icon: <FilePdfOutlined />, blurb: 'PDF page surgery' },
  'Dev Gun': { icon: <ApiOutlined />, blurb: 'Everyday developer utilities' },
  'WiFi Shark': { icon: <WifiOutlined />, blurb: 'Networks & wireless' }
};

const HERO_FEATURES = [
  {
    icon: <LockOutlined />,
    title: 'Private by architecture',
    text: 'Files and passwords are processed inside your browser tab. Nothing is uploaded.'
  },
  {
    icon: <ThunderboltOutlined />,
    title: 'No install, no account',
    text: 'Open a tool and get to work. Every page is lazy-loaded so the app stays snappy.'
  },
  {
    icon: <SearchOutlined />,
    title: 'Keyboard-first',
    text: 'Hit Ctrl + K / Cmd + K to search all tools, jump between them, and stay in flow.'
  },
  // {
  //   icon: <GithubOutlined />,
  //   title: 'Open source, MIT',
  //   text: 'Every line is public. Audit the crypto, fork the UI, or contribute a new tool.'
  // }
];

const GITHUB_URL = 'https://github.com/MrDino-Tz/4Devs';

const sectionAnchor = {
  scrollMarginTop: 88
};

function Header() {
  const theme = useTheme();
  const { mode, toggleTheme } = useThemeMode();

  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundColor: alpha(theme.palette.background.default, 0.82),
        backdropFilter: 'blur(14px)'
      }}
    >
      <Container maxWidth="lg" sx={{ height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
        <Stack component={RouterLink} to="/" direction="row" alignItems="center" spacing={1.5} sx={{ textDecoration: 'none' }}>
          <Box component="img" src={logo} alt="4Devs" sx={{ width: 36, height: 36, borderRadius: 1.5 }} />
          <Box>
            <Typography variant="h5" fontWeight={800} color="text.primary" sx={{ lineHeight: 1.1 }}>
              4Devs
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.2 }}>
              Developer Tools
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={1}>
          <Stack direction="row" spacing={2.5} sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}>
            <Button href="#features" color="inherit" size="small" sx={{ color: 'text.secondary' }}>
              Why 4Devs
            </Button>
            <Button href="#tools" color="inherit" size="small" sx={{ color: 'text.secondary' }}>
              Tools
            </Button>
            <Button
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              size="small"
              sx={{ color: 'text.secondary' }}
            >
              GitHub
            </Button>
          </Stack>

          <Tooltip title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
            <IconButton onClick={toggleTheme} size="small" aria-label="Toggle color mode">
              {mode === 'dark' ? <SunOutlined /> : <MoonOutlined />}
            </IconButton>
          </Tooltip>

          <Button component={RouterLink} to="/app" variant="contained" size="small" endIcon={<ArrowRightOutlined />} sx={{ px: 2.5 }}>
            Launch app
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

function Hero() {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundImage: `radial-gradient(ellipse 70% 60% at 50% -10%, ${alpha(theme.palette.primary.main, 0.18)}, transparent 65%)`
      }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 8, md: 12 } }}>
        <Grid container spacing={{ xs: 6, md: 8 }} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Chip label="Free · Open source · No sign-up" size="small" color="primary" variant="outlined" sx={{ mb: 3, fontWeight: 600 }} />
            <Typography
              component="h1"
              variant="h1"
              fontWeight={800}
              sx={{ fontSize: { xs: '2.4rem', sm: '3.2rem', lg: '3.8rem' }, letterSpacing: -1.5, lineHeight: 1.08, mb: 3 }}
            >
              The toolbox that
              <Box component="span" sx={{ color: 'primary.main' }}>
                {' '}
                never leaves your browser.
              </Box>
            </Typography>
            <Typography variant="h6" color="text.secondary" fontWeight={400} sx={{ mb: 4, maxWidth: 560, lineHeight: 1.6 }}>
              {ALL_TOOLS.length} carefully crafted developer utilities — passwords, converters, PDFs, networks and more — in one fast,
              private, offline-friendly workspace.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 5 }}>
              <Button component={RouterLink} to="/app" variant="contained" size="large" endIcon={<ArrowRightOutlined />} sx={{ px: 3.5 }}>
                Open the toolbox
              </Button>
              <Button href="#tools" variant="outlined" size="large" sx={{ px: 3.5 }}>
                Explore {ALL_TOOLS.length} tools
              </Button>
            </Stack>

            <Stack direction="row" spacing={{ xs: 2, sm: 4 }} flexWrap="wrap" useFlexGap>
              {[
                ['100%', 'client-side'],
                ['0', 'uploads'],
                // ['MIT', 'licensed']
              ].map(([value, label]) => (
                <Box key={label}>
                  <Typography variant="h5" fontWeight={800} color="text.primary">
                    {value}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 0.8 }}>
                    {label}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <CommandPaletteDemo />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function Features() {
  return (
    <Box component="section" id="features" sx={{ ...sectionAnchor, py: { xs: 8, md: 11 } }}>
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: 700, mb: { xs: 5, md: 7 } }}>
          <Typography variant="overline" color="primary.main" fontWeight={700} letterSpacing={1.5}>
            Built for focus
          </Typography>
          <Typography component="h2" variant="h3" fontWeight={800} sx={{ mb: 2, letterSpacing: -0.5 }}>
            Less friction. More flow.
          </Typography>
          <Typography color="text.secondary" variant="body1" sx={{ fontSize: 18 }}>
            4Devs is a single workspace for the small tasks that break your concentration — designed to be fast, private and pleasant to use
            every day.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {HERO_FEATURES.map((feature) => (
            <Grid key={feature.title} size={{ xs: 12, sm: 6, lg: 3 }}>
              <Paper
                elevation={0}
                sx={{
                  height: '100%',
                  p: 3,
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'transform .2s ease, border-color .2s ease',
                  '&:hover': { transform: 'translateY(-4px)', borderColor: 'primary.main' }
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 2,
                    display: 'grid',
                    placeItems: 'center',
                    color: 'primary.main',
                    bgcolor: 'action.hover',
                    fontSize: 20,
                    mb: 2.5
                  }}
                >
                  {feature.icon}
                </Box>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {feature.text}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

function ToolsShowcase() {
  const theme = useTheme();

  const groups = useMemo(() => {
    const map = new Map();
    ALL_TOOLS.forEach((tool) => {
      if (!map.has(tool.category)) map.set(tool.category, []);
      map.get(tool.category).push(tool);
    });
    return Array.from(map.entries());
  }, []);

  return (
    <Box
      component="section"
      id="tools"
      sx={{ ...sectionAnchor, py: { xs: 8, md: 11 }, borderTop: '1px solid', borderColor: 'divider', bgcolor: 'action.hover' }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', sm: 'flex-end' }}
          spacing={2}
          sx={{ mb: { xs: 5, md: 7 } }}
        >
          <Box sx={{ maxWidth: 640 }}>
            <Typography variant="overline" color="primary.main" fontWeight={700} letterSpacing={1.5}>
              The collection
            </Typography>
            <Typography component="h2" variant="h3" fontWeight={800} sx={{ mb: 2, letterSpacing: -0.5 }}>
              Everything in one place
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: 18 }}>
              Seven categories, {ALL_TOOLS.length} tools, zero context switches. Pick a category and dive in.
            </Typography>
          </Box>
          <Button component={RouterLink} to="/app" variant="outlined" endIcon={<ArrowRightOutlined />}>
            Open full app
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {groups.map(([category, tools]) => {
            const meta = CATEGORY_META[category] || { icon: <SearchOutlined />, blurb: '' };
            return (
              <Grid key={category} size={{ xs: 12, md: 6, lg: 4 }}>
                <Paper
                  elevation={0}
                  sx={{
                    height: '100%',
                    p: 3,
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: 'background.paper'
                  }}
                >
                  <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 0.5 }}>
                    <Box
                      sx={{
                        width: 38,
                        height: 38,
                        borderRadius: 2,
                        display: 'grid',
                        placeItems: 'center',
                        color: 'primary.main',
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        fontSize: 18
                      }}
                    >
                      {meta.icon}
                    </Box>
                    <Box>
                      <Typography variant="h6" fontWeight={700} sx={{ lineHeight: 1.2 }}>
                        {category}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {meta.blurb}
                      </Typography>
                    </Box>
                    <Chip label={tools.length} size="small" sx={{ ml: 'auto' }} />
                  </Stack>

                  <Divider sx={{ my: 2 }} />

                  <Stack spacing={0.75}>
                    {tools.map((tool) => (
                      <Stack
                        key={tool.path}
                        component={RouterLink}
                        to={tool.path}
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        spacing={1}
                        sx={{
                          textDecoration: 'none',
                          px: 1,
                          py: 0.9,
                          mx: -1,
                          borderRadius: 1.5,
                          color: 'text.primary',
                          transition: 'background-color .15s ease',
                          '&:hover': { bgcolor: 'action.hover', color: 'primary.main' },
                          '&:hover .tool-arrow': { opacity: 1, transform: 'translateX(0)' }
                        }}
                      >
                        <Typography variant="body2" fontWeight={500} noWrap>
                          {tool.name}
                        </Typography>
                        <ArrowRightOutlined
                          className="tool-arrow"
                          style={{ fontSize: 12, opacity: 0, transform: 'translateX(-4px)', transition: 'all .15s ease' }}
                        />
                      </Stack>
                    ))}
                  </Stack>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}

function ClosingCta() {
  const theme = useTheme();

  return (
    <Box component="section" sx={{ py: { xs: 8, md: 11 } }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 4,
            px: { xs: 3, md: 8 },
            py: { xs: 6, md: 8 },
            textAlign: 'center',
            color: theme.palette.primary.contrastText,
            background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 55%, ${theme.palette.secondary.main} 100%)`
          }}
        >
          <Typography variant="overline" sx={{ letterSpacing: 2, opacity: 0.85 }}>
            Ready when you are
          </Typography>
          <Typography component="h2" variant="h3" fontWeight={800} sx={{ mb: 2, letterSpacing: -0.5 }}>
            Stop tab-hopping. Start shipping.
          </Typography>
          <Typography sx={{ maxWidth: 620, mx: 'auto', mb: 4, opacity: 0.9 }}>
            No sign-up, no paywall, no data collection. Just {ALL_TOOLS.length} tools that load instantly and respect your privacy.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
            <Button
              component={RouterLink}
              to="/app"
              size="large"
              endIcon={<ArrowRightOutlined />}
              sx={{ px: 3.5, bgcolor: 'common.white', color: 'primary.dark', '&:hover': { bgcolor: 'grey.100' } }}
            >
              Launch 4Devs
            </Button>
            <Button
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              size="large"
              startIcon={<GithubOutlined />}
              sx={{ px: 3.5, color: 'inherit', borderColor: alpha('#fff', 0.55), '&:hover': { borderColor: '#fff' } }}
              variant="outlined"
            >
              Star on GitHub
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

function Footer() {
  return (
    <Box component="footer" sx={{ borderTop: '1px solid', borderColor: 'divider', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack
              component={RouterLink}
              to="/"
              direction="row"
              alignItems="center"
              spacing={1.25}
              sx={{ textDecoration: 'none', mb: 1.5 }}
            >
              <Box component="img" src={logo} alt="4Devs" sx={{ width: 30, height: 30, borderRadius: 1 }} />
              <Typography variant="h6" fontWeight={800} color="text.primary">
                4Devs
              </Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 320 }}>
              A free, open-source, client-side utility suite for developers, designers and security professionals.
            </Typography>
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5 }}>
              Product
            </Typography>
            <Stack spacing={1}>
              <Button
                component={RouterLink}
                to="/app"
                size="small"
                color="inherit"
                sx={{ justifyContent: 'flex-start', p: 0, color: 'text.secondary' }}
              >
                Launch app
              </Button>
              <Button href="#tools" size="small" color="inherit" sx={{ justifyContent: 'flex-start', p: 0, color: 'text.secondary' }}>
                All tools
              </Button>
              <Button href="#features" size="small" color="inherit" sx={{ justifyContent: 'flex-start', p: 0, color: 'text.secondary' }}>
                Why 4Devs
              </Button>
            </Stack>
          </Grid>

          <Grid size={{ xs: 6, sm: 4, md: 2 }}>
            <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5 }}>
              Community
            </Typography>
            <Stack spacing={1}>
              <Button
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                color="inherit"
                sx={{ justifyContent: 'flex-start', p: 0, color: 'text.secondary' }}
              >
                GitHub
              </Button>
              <Button
                href={`${GITHUB_URL}/issues`}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                color="inherit"
                sx={{ justifyContent: 'flex-start', p: 0, color: 'text.secondary' }}
              >
                Report an issue
              </Button>
              <Button
                href={`${GITHUB_URL}/blob/main/LICENSE`}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                color="inherit"
                sx={{ justifyContent: 'flex-start', p: 0, color: 'text.secondary' }}
              >
                License
              </Button>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} justifyContent="space-between" alignItems={{ sm: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            © 2026 DTC Team · Released For Developers, By Developers
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Built for developers, by developers.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

// ==============================|| LANDING PAGE ||============================== //

export default function LandingPage() {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Header />
      <Box component="main">
        <Hero />
        <Features />
        <ToolsShowcase />
        <ClosingCta />
      </Box>
      <Footer />
    </Box>
  );
}
