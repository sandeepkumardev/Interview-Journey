import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';
import { useData } from '../../context';
import { REJECTED } from '../../constants';

export default function RejectedDialog({ rejectedDialog, rejectedDialogClose, _id }) {
  const [text, settext] = React.useState('');
  const { updateData } = useData();

  const reason = () => {
    updateData({ _id, type: REJECTED, res: { status: true, reason: text } });
    rejectedDialogClose();
  };

  return (
    <div>
      <Dialog open={rejectedDialog} onClose={rejectedDialogClose}>
        <DialogTitle id="alert-dialog-title">Do you want to add any reason?</DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-multiline-static"
            placeholder="Optional"
            multiline
            minRows={3}
            value={text}
            onChange={(e) => settext(e.target.value)}
            style={{ width: '100%' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={reason} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
