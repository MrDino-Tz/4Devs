import SearchOutlined from '@ant-design/icons/SearchOutlined';

import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

export default function InputShowcase() {
  return (
    <Stack spacing={2.5} sx={{ maxWidth: 420 }}>
      <TextField label="Full name" placeholder="Jane Doe" fullWidth />
      <TextField label="Email address" type="email" placeholder="jane@example.com" helperText="We will never share your email." fullWidth />
      <TextField label="Password" type="password" placeholder="Enter your password" fullWidth />
      <TextField
        label="Search"
        placeholder="Search components..."
        fullWidth
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size="small" aria-label="search">
                  <SearchOutlined />
                </IconButton>
              </InputAdornment>
            )
          }
        }}
      />
    </Stack>
  );
}
