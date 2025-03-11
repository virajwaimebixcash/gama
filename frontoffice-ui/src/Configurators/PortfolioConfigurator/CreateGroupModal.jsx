
import React, { useEffect, useState } from 'react';
import { Button, Box, TextField, Modal, MenuItem } from '@mui/material';

const CreateGroupModal = ({ setAlertOpen, data = {}, edit, showCreateGroupModal, setShowCreateGroupModal = () => { }, handleSave = () => { } }) => {

  const [createData, setCreateData] = useState(data)

  useEffect(() => {
    setCreateData({ isHide: false,pvGroupId:"0",...data })
  }, [data])
  const onHandleChange = (e) => {
    setCreateData((data) => ({ ...data, [e.target.name]: e.target.value === 'Yes' ? true : e.target.value === 'No' ? false : e.target.value }))
  }

  const handleClose = (event, reason) => {

    if (reason === 'backdropClick') return;
    setShowCreateGroupModal(false);
  };



  return (
    <Modal open={showCreateGroupModal} onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          maxHeight: '80vh', // Set max height
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          overflowY: 'auto', // Enable vertical scrolling
        }} mt={2}>

          <TextField
            label="Group Name"
            size='small'
            sx={{ marginTop: 2 }}
            placeholder={'Enter the Group name'}
            value={createData?.groupName}
            name="groupName"
            disabled={createData.dataGroup || edit}
            onChange={onHandleChange}
            inputProps={{ maxLength: 50 }}
            // inputProps={{ maxLength: 40 }}

            fullWidth
          />
          <TextField
            label="Group Name Header"
            size='small'
            sx={{ marginTop: 2 }}
            inputProps={{ maxLength: 50 }}
            name='groupHeader'
            value={createData?.groupHeader || ''}
            placeholder={'Enter the Group Name Header'}
            onChange={onHandleChange}

            fullWidth
          />
          <TextField
            select
            size="small"
            sx={{ marginTop: 2 }}
            label={"Group Hide"}
            name='isHide'
            onChange={onHandleChange}
            value={(createData.isHide ? "Yes" : 'No') || ""}
            fullWidth
          >
            {["Yes", "No"].map((hide, idx) => (
              <MenuItem key={idx} value={hide}>
                {hide}
              </MenuItem>
            ))}
          </TextField>
          {/* <TextField
            select
            size="small"
            sx={{ marginTop: 2 }}
            label={"View Type"}
            disabled={createData.dataGroup}
            value={createData?.groupViewType || ''}
            name='groupViewType'
            onChange={onHandleChange}
            fullWidth
          >
            {["List", "Grid"].map((hide, id) => (
              <MenuItem key={id} value={hide}>
                {hide}
              </MenuItem>
            ))}
          </TextField> */}
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="contained" color="primary" onClick={() => {
              if (!createData.groupName?.trim()) {
                setAlertOpen({ show: true, msg: "Group name is required.", type: "error" })
                return
              }

              handleSave(createData, setCreateData)

            }}>{edit ? 'Update' : 'Save'}</Button>
            <Button variant="contained" color="secondary" onClick={handleClose}>Cancel</Button>
          </Box>
        </Box>


      </>
    </Modal>

  );
};

export default CreateGroupModal;
