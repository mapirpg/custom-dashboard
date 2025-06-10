import { useDialog } from '@/hooks/useRedux';
import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useTranslation } from 'react-i18next';

const DialogModal = () => {
  const { t } = useTranslation();
  const { isOpen, closeDialog, title, content, onConfirm } = useDialog();

  return (
    <Dialog open={Boolean(isOpen)} onClose={closeDialog}>
      <AppBar elevation={0} position="static">
        <DialogTitle>{title}</DialogTitle>
      </AppBar>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="inherit">
          {t('common.cancel')}
        </Button>
        <Button onClick={onConfirm} color="primary" variant="contained">
          {t('common.confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogModal;
