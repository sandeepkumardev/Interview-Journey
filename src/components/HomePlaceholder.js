import { Fab, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const HomePlaceholder = () => {
  return (
    <div
      style={{
        height: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
      }}
    >
      <Typography variant="h5" gutterBottom color="textSecondary">
        Add new item by clicking{' '}
        <Fab aria-label="add" size="small" disabled>
          <AddIcon />
        </Fab>
      </Typography>
    </div>
  );
};

export default HomePlaceholder;
