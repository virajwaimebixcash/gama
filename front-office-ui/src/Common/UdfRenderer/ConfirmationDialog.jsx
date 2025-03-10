import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ConfirmationDialog = ({ open, onClose, actionType }) => {
    const navigate = useNavigate();

    const handleOk = () => {
        onClose();
        navigate('/');
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            slotProps={{
                backdrop: {
                    style: {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)'
                    }
                }
            }}
            disableEscapeKeyDown={true}
        >
            <DialogTitle id="confirmation-dialog-title">
                {actionType === 'edit' ? 'Update Successful' : 'Submission Successful'}
            </DialogTitle>
            <DialogContent dividers>
                {actionType === 'edit' ? 'The data has been updated successfully.' : 'The data has been submitted successfully.'}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleOk} color="primary">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;
