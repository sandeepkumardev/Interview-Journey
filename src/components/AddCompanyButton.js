import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import DialogContent from '@material-ui/core/DialogContent';
import { useData } from '../context';
import { v4 as uuidv4 } from 'uuid';

import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiFab-root': {
      height: '40px',
      width: '40px',
    },
  },
  dialog: {
    '& .MuiDialog-paper': {
      width: '300px',
    },
    '& .MuiFormControl-root': {
      width: '100%',
    },
    '& .MuiFormHelperText-root': {
      color: '#f44336',
    },
  },
}));

function AddCompanyButton() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box p={2} className={classes.root}>
      <Fab aria-label="add" onClick={handleClickOpen}>
        <AddIcon />
      </Fab>

      {/* Dialog Box  */}
      <NewDialog open={open} handleClose={handleClose} />
    </Box>
  );
}

export default AddCompanyButton;

function NewDialog({ open, handleClose }) {
  const classes = useStyles();
  const { addData } = useData();

  const [Cname, setCname] = React.useState('');
  const [Rname, setRname] = React.useState('');
  const [desc, setdesc] = React.useState('');
  const [error, seterror] = React.useState('');

  const SaveHandler = () => {
    let biaData = {
      _id: uuidv4(),
      company_name: Cname,
      refrence_name: Rname,
      description: desc,
      shortlisted: { reject: false, resolve: false },
      interview_round: [],
      get_placed: { status: false, summary: '' },
      rejected: { status: false, reason: '' },
    };
    if (Cname) {
      seterror('');
      addData(biaData);
      setCname('');
      setRname('');
      setdesc('');
      handleClose();
    } else {
      seterror('Enter Company Name!');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} className={classes.dialog}>
      <DialogTitle>Add Company Name</DialogTitle>
      <DialogContent>
        <TextField
          id="standard-basic1"
          label="Company name"
          value={Cname}
          onChange={(e) => setCname(e.target.value)}
          helperText={error}
          required
        />
        <br />
        <TextField
          id="standard-basic2"
          label="Refrence (Optional)"
          value={Rname}
          onChange={(e) => setRname(e.target.value)}
        />
        <br />
        <TextField
          id="outlined-multiline-static"
          placeholder="Company description (Optional)"
          multiline
          minRows={5}
          value={desc}
          onChange={(e) => setdesc(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
        <Button onClick={SaveHandler} variant="contained" size="small" color="primary" autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
