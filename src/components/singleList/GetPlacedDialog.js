import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Chip, InputAdornment, makeStyles, OutlinedInput, TextField } from '@material-ui/core';
import { useData } from '../../context';

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

export default function GetPlacedDialog({ getPlacedDialog, getPlacedClose, _id }) {
  const classes = useStyles();
  const [packagee, setpackage] = React.useState('');
  const [details, setdetails] = React.useState('');
  const [error, seterror] = React.useState('');
  const { updateData } = useData();

  const getPlaced = () => {
    if (isNaN(packagee)) {
      seterror('Package must be a number.');
    } else if (packagee) {
      seterror('');
      updateData({
        _id,
        type: 'getPlaced',
        res: { status: true, package: packagee, details },
      });
      getPlacedClose();
    } else {
      seterror('Package is required !');
    }
  };

  return (
    <Dialog open={getPlacedDialog} onClose={getPlacedClose} className={classes.root}>
      <DialogTitle id="alert-dialog-title">🎉 Congratulations 🎉</DialogTitle>
      <DialogContent>
        <OutlinedInput
          id="outlined-adornment-amount"
          placeholder="Package"
          value={packagee}
          onChange={(e) => setpackage(e.target.value)}
          required
          endAdornment={
            <InputAdornment position="end">
              <Chip size="small" label="L/A" />
            </InputAdornment>
          }
        />
        <br />
        <TextField
          id="outlined-multiline-static"
          placeholder="placement details (Optional)"
          multiline
          rows={3}
          value={details}
          onChange={(e) => setdetails(e.target.value)}
          helperText={error}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={getPlaced} color="primary" autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
