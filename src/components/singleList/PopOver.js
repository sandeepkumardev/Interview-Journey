import { Popover, Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import React from 'react';
import Button from '@material-ui/core/Button';

export default function PopOver({ name, text, color, btnName }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

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
      <Typography variant="subtitle2" style={{ color: color ? '#f44336' : '#1976d2' }}>
        {name}
      </Typography>
      {text && (
        <Button onClick={handleClick} style={{ fontSize: '13px' }}>
          {btnName}
        </Button>
      )}
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
          <Typography>{text}</Typography>
        </Box>
      </Popover>
    </>
  );
}
