import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// icons
import {
  ApiOutlined,
  FilePdfOutlined,
  FontSizeOutlined,
  KeyOutlined,
  PictureOutlined,
  SearchOutlined,
  SwapOutlined,
  WifiOutlined
} from '@ant-design/icons';

// project imports
import ALL_TOOLS from 'data/tools';

const FEATURED_NAMES = ['Password Generator', 'Markdown to HTML', 'Subnet Calculator', 'PDF Editor'];
const SEARCH_TERM = 'pdf';

const CATEGORY_ICONS = {
  'Text Tools': <FontSizeOutlined />,
  'Conversion Tools': <SwapOutlined />,
  CryptOK: <KeyOutlined />,
  'Image/Video': <PictureOutlined />,
  OpenDoc: <FilePdfOutlined />,
  'Dev Gun': <ApiOutlined />,
  'WiFi Shark': <WifiOutlined />
};

const FEATURED_TOOLS = FEATURED_NAMES.map((name) => ALL_TOOLS.find((tool) => tool.name === name)).filter(Boolean);

const rowTransition = { duration: 0.22, ease: 'easeOut' };

// ==============================|| LANDING - COMMAND PALETTE DEMO ||============================== //

export default function CommandPaletteDemo() {
  const theme = useTheme();
  const paperRef = useRef(null);
  const inView = useInView(paperRef, { amount: 0.35 });
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const [phase, setPhase] = useState('idle');
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);

  const pausedRef = useRef(true);

  useEffect(() => {
    pausedRef.current = !inView || hovered || tabHidden || reducedMotion;
  }, [inView, hovered, tabHidden, reducedMotion]);

  useEffect(() => {
    const handleVisibility = () => setTabHidden(document.hidden);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Continuous demo loop. Pauses when offscreen, hovered, hidden, or reduced motion is requested.
  useEffect(() => {
    if (reducedMotion) return undefined;

    let cancelled = false;
    let timer = null;

    const wait = (ms) =>
      new Promise((resolve) => {
        let remaining = ms;
        let last = performance.now();

        const tick = () => {
          if (cancelled) {
            resolve(false);
            return;
          }

          const now = performance.now();
          if (!pausedRef.current) remaining -= now - last;
          last = now;

          if (remaining <= 0) {
            resolve(true);
            return;
          }

          timer = setTimeout(tick, 60);
        };

        timer = setTimeout(tick, 60);
      });

    const run = async () => {
      while (!cancelled) {
        setPhase('idle');
        setQuery('');
        setSelectedIndex(0);
        if (!(await wait(1000))) return;

        setPhase('typing');
        for (let i = 1; i <= SEARCH_TERM.length; i += 1) {
          setQuery(SEARCH_TERM.slice(0, i));
          if (!(await wait(120))) return;
        }

        setPhase('selected');
        setSelectedIndex(0);
        if (!(await wait(1400))) return;

        setSelectedIndex(1);
        if (!(await wait(1400))) return;

        setPhase('clearing');
        setQuery('');
        if (!(await wait(1500))) return;
      }
    };

    run();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [reducedMotion]);

  const effectiveQuery = reducedMotion ? SEARCH_TERM : query;
  const effectivePhase = reducedMotion ? 'selected' : phase;

  const results = useMemo(() => {
    const q = effectiveQuery.trim().toLowerCase();
    if (!q) return FEATURED_TOOLS;
    return ALL_TOOLS.filter((tool) => `${tool.name} ${tool.desc} ${tool.category}`.toLowerCase().includes(q)).slice(0, 4);
  }, [effectiveQuery]);

  const selected = Math.min(selectedIndex, Math.max(results.length - 1, 0));
  const showCaret = !reducedMotion && effectivePhase !== 'selected';
  const footerLabel = effectiveQuery.trim()
    ? `${results.length} ${results.length === 1 ? 'match' : 'matches'}`
    : `${ALL_TOOLS.length} tools loaded`;

  return (
    <Paper
      ref={paperRef}
      elevation={0}
      aria-hidden="true"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      sx={{
        position: 'relative',
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        boxShadow: theme.customShadows?.z8 || 8,
        overflow: 'hidden'
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ px: 2, py: 1.25, borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'action.hover' }}
      >
        {['#ff5f56', '#ffbd2e', '#27c93f'].map((color) => (
          <Box key={color} sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: color, opacity: 0.85 }} />
        ))}
        <Typography variant="caption" color="text.secondary" sx={{ ml: 1, fontFamily: 'monospace' }}>
          4devs — command palette
        </Typography>
        <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <Box
            component="kbd"
            sx={{
              px: 0.75,
              py: 0.15,
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper',
              color: 'text.secondary',
              fontFamily: 'monospace',
              fontSize: 10,
              lineHeight: 1.6
            }}
          >
            Ctrl K
          </Box>
        </Box>
      </Stack>

      <Box sx={{ p: { xs: 2.5, sm: 3.5 }, fontFamily: 'monospace' }}>
        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 2, minHeight: 24 }}>
          <Typography variant="body2" component="span" sx={{ fontFamily: 'inherit', color: 'success.main' }}>
            $
          </Typography>
          <Typography
            variant="body2"
            component="span"
            sx={{ fontFamily: 'inherit', color: effectiveQuery ? 'text.primary' : 'text.secondary' }}
          >
            {effectiveQuery || 'search tools'}
          </Typography>
          {showCaret && (
            <Box
              component="span"
              sx={{
                display: 'inline-block',
                width: 8,
                height: 16,
                ml: 0.25,
                verticalAlign: 'middle',
                bgcolor: 'primary.main',
                animation: 'paletteCaretBlink 1.1s steps(1) infinite',
                '@keyframes paletteCaretBlink': { '50%': { opacity: 0 } }
              }}
            />
          )}
        </Stack>

        <Stack spacing={1}>
          <AnimatePresence initial={false} mode="popLayout">
            {results.map((tool, index) => {
              const isSelected = index === selected;

              return (
                <motion.div
                  key={tool.path}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={rowTransition}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{
                      px: 1.5,
                      py: 1.1,
                      borderRadius: 1.5,
                      border: '1px solid',
                      borderColor: isSelected ? 'primary.main' : 'divider',
                      bgcolor: isSelected ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                      transition: 'border-color 0.2s ease, background-color 0.2s ease'
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1.25}>
                      <Box
                        sx={{
                          width: 22,
                          height: 22,
                          borderRadius: 1,
                          display: 'grid',
                          placeItems: 'center',
                          bgcolor: alpha(theme.palette.primary.main, 0.12),
                          color: 'primary.main',
                          fontSize: 12
                        }}
                      >
                        {CATEGORY_ICONS[tool.category] || <SearchOutlined />}
                      </Box>
                      <Typography variant="body2" sx={{ fontFamily: 'inherit', fontWeight: isSelected ? 700 : 500 }}>
                        {tool.name}
                      </Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={1}>
                      {isSelected && effectivePhase === 'selected' && (
                        <motion.span
                          animate={reducedMotion ? undefined : { opacity: [0.35, 1, 0.35] }}
                          transition={reducedMotion ? undefined : { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                          style={{ color: theme.palette.text.secondary, fontSize: 11, fontFamily: 'monospace' }}
                        >
                          ↵
                        </motion.span>
                      )}
                      <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'inherit' }}>
                        {tool.category === 'Conversion Tools' ? 'Conversion' : tool.category}
                      </Typography>
                    </Stack>
                  </Stack>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </Stack>

        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2.5, fontFamily: 'inherit' }}>
          ✓ {footerLabel} · 0 requests to a server
        </Typography>
      </Box>
    </Paper>
  );
}
