import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, TextField } from '@material-ui/core';
import { useData } from '../../context';
import { v4 as uuidv4 } from 'uuid';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiDialog-paper': {
      width: '300px',
    },
    '& .MuiFormHelperText-root': {
      color: '#f44336',
    },
    '& .MuiFormControl-root': {
      width: '100%',
    },
  },
}));

export default function InterviewDialog({ interviewDialog, interviewRoundClose, _id }) {
  const classes = useStyles();
  const [name, setname] = React.useState('');
  const [text, settext] = React.useState('');
  const [error, seterror] = React.useState('');
  const { updateData } = useData();

  const interviewDetail = () => {
    if (name && text) {
      seterror('');
      updateData({
        _id,
        type: 'interviewUpdate',
        res: { id: uuidv4(), name, response: text },
      });
      interviewRoundClose();
    } else {
      seterror('All feilds are required!');
    }
  };

  return (
    <Dialog open={interviewDialog} onClose={interviewRoundClose} className={classes.root}>
      <DialogTitle id="alert-dialog-title">Interview Details</DialogTitle>
      <DialogContent>
        <TextField
          id="standard-basic"
          label="Interview Name"
          value={name}
          onChange={(e) => setname(e.target.value)}
          required
        />
        <br />
        <TextField
          id="outlined-multiline-static"
          placeholder="How's going your iinterview."
          multiline
          rows={3}
          value={text}
          onChange={(e) => settext(e.target.value)}
          helperText={error}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={interviewDetail} color="primary" autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
