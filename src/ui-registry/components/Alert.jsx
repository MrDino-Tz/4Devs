import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export default function AlertShowcase() {
  return (
    <Stack spacing={2}>
      <Alert severity="success">
        <AlertTitle>Saved</AlertTitle>
        Your changes have been saved successfully.
      </Alert>
      <Alert severity="info">A new version is available. Refresh to update.</Alert>
      <Alert severity="warning">This action will affect all connected services.</Alert>
      <Alert severity="error">We could not connect to the server. Please try again.</Alert>
    </Stack>
  );
}
