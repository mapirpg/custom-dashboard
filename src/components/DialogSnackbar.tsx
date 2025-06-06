import { useDialog } from '@/hooks/useRedux';
import { Dialog } from '@mui/material';

const DialogSnackbar = () => {
  const { closeDialog, isOpen } = useDialog();

  return <Dialog open={isOpen} onClose={closeDialog}></Dialog>;
};

export default DialogSnackbar;
