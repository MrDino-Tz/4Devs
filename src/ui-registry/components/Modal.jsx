import { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

export default function ModalShowcase() {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap">
        <Button variant="contained" color="error" onClick={() => setConfirmOpen(true)}>
          Delete project
        </Button>
        <Button variant="outlined" onClick={() => setFormOpen(true)}>
          Invite teammate
        </Button>
      </Stack>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Delete project?</DialogTitle>
        <DialogContent>
          <DialogContentText>This will permanently delete the project and all of its data. This action cannot be undone.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={() => setConfirmOpen(false)}>
            Cancel
          </Button>
          <Button color="error" variant="contained" onClick={() => setConfirmOpen(false)}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={formOpen} onClose={() => setFormOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Invite teammate</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Email address" type="email" fullWidth variant="outlined" />
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={() => setFormOpen(false)}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => setFormOpen(false)}>
            Send invite
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
