import { Chip, Popover, Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiChip-root': {
      backgroundColor: '#388e3c',
      color: '#fff',
      fontWeight: 'bold',
    },
    backgroundColor: '#81c784',
    borderRadius: '10px',
    padding: '6px 8px',
    color: '#000fff',
  },
}));

export default function GetPlaced({ packagee, details }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const badge = `${packagee} L/A`;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <>
      <div className={classes.root}>
        <Typography variant="subtitle2">Congrats 🚀🎉</Typography>
        <div>
          <Chip size="small" label={badge} />
          {details && (
            <Button onClick={handleClick} style={{ fontSize: '13px' }}>
              Details
            </Button>
          )}
        </div>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box p={1}>
          <Typography>{details}</Typography>
        </Box>
      </Popover>
    </>
  );
}
