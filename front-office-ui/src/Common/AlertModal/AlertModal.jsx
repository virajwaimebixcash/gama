import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { CheckCircle, Error } from '@mui/icons-material';
import '../../css/CustomAlert.css';
import { useModal } from './ModalContext';

const GlobalModal = () => {
    const {open, onClose, onCancelButton, onConfirmButton, showCancelButton, text, icon, confirmButtonText, cancelButtonText, allowOutsideClick, width } = useModal();

    if (!open) return null;
  return (
    <Dialog
      open={open}
      onClose={allowOutsideClick ? onClose : null}
      PaperProps={{ className: 'custom-alert-dialog', style: { width: width || '30vw' } }}
    >
      <DialogTitle className="custom-alert-title">
        {icon === 'error' ? (
          <Error color="error" style={{ fontSize: '40px' }} />
        ) : (
          <CheckCircle color="success" style={{ fontSize: '40px' }} />
        )}
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6" className='infortext'>{text}</Typography>
      </DialogContent>
      <DialogActions className='justify-content-center' sx={{justifyContent:'center'}}>
        {showCancelButton && (
          <Button
            onClick={onCancelButton || onClose}
            className="custom-alert-button cancel"
            variant="contained"
            color="secondary"

          >
            {cancelButtonText || 'Cancel'}
          </Button>
        )}

        <Button
          onClick={onConfirmButton || onClose}
          className="custom-alert-button"
          variant="contained"
          color="primary"
        >
          {confirmButtonText || 'Ok'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GlobalModal;
