import PlusOutlined from '@ant-design/icons/PlusOutlined';
import ArrowRightOutlined from '@ant-design/icons/ArrowRightOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

export default function ButtonShowcase() {
  return (
    <Stack direction="row" spacing={2} useFlexGap flexWrap="wrap" alignItems="center">
      <Button variant="contained">Primary</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
      <Button variant="contained" color="success">
        Success
      </Button>
      <Button variant="contained" startIcon={<PlusOutlined />}>
        Create
      </Button>
      <Button variant="outlined" endIcon={<ArrowRightOutlined />}>
        Continue
      </Button>
      <IconButton color="primary" aria-label="delete">
        <DeleteOutlined />
      </IconButton>
    </Stack>
  );
}
