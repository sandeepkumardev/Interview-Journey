import { IconButton, MenuItem } from '@material-ui/core';
import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import Menu from '@material-ui/core/Menu';
import RejectedDialog from './RejectedDialog';
import InterviewDialog from './InterviewDialog';
import GetPlacedDialog from './GetPlacedDialog';

export default function AddProperty({ shortlisted, _id, interview_round }) {
  const [anchorEl, setAnchorEl] = React.useState(false);
  const [rejectedDialog, setrejectedDialog] = React.useState(false);
  const [interviewDialog, setinterviewDialog] = React.useState(false);
  const [getPlacedDialog, setGetPlacedDialog] = React.useState(false);

  //   Menu list
  const MenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const MenuClose = () => {
    setAnchorEl(null);
  };
  //...........
  //    open rejectd dialog
  const Rejected = () => {
    setrejectedDialog(true);
    setAnchorEl(null);
  };
  const rejectedDialogClose = () => {
    setrejectedDialog(false);
  };
  //..................
  //    open interview dialog
  const interviewRound = () => {
    setinterviewDialog(true);
    setAnchorEl(null);
  };
  const interviewRoundClose = () => {
    setinterviewDialog(false);
  };
  //..................
  //     getplaced dialog
  const getPlaced = () => {
    setGetPlacedDialog(true);
    setAnchorEl(null);
  };
  const getPlacedClose = () => {
    setGetPlacedDialog(false);
  };
  //....................
  return (
    <>
      <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={MenuOpen}>
        <AddIcon />
      </IconButton>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={MenuClose}
      >
        {shortlisted.resolve ? (
          <div>
            <MenuItem onClick={interviewRound}>
              Interview Round {interview_round.length + 1}
            </MenuItem>
            <MenuItem onClick={getPlaced}>Get Placed 🚀</MenuItem>
            <MenuItem onClick={Rejected}>Rejected 😒</MenuItem>
          </div>
        ) : (
          <MenuItem onClick={Rejected}>Rejected 😒</MenuItem>
        )}
      </Menu>

      {/* rejectedDialog  */}
      <RejectedDialog
        rejectedDialog={rejectedDialog}
        rejectedDialogClose={rejectedDialogClose}
        _id={_id}
      />

      {/* interviewDialog  */}
      <InterviewDialog
        interviewDialog={interviewDialog}
        interviewRoundClose={interviewRoundClose}
        _id={_id}
      />

      {/* interviewDialog  */}
      <GetPlacedDialog
        getPlacedDialog={getPlacedDialog}
        getPlacedClose={getPlacedClose}
        _id={_id}
      />
    </>
  );
}
